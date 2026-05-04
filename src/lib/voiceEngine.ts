import type { SacredPathRitual } from "../data/sacredPathRituals";
import { synthesizeGuidedVoiceAudio } from "./guidedVoiceTts";

export type VoiceStyle = "warm" | "calm" | "deep" | "soft";
export type VoicePacing = "quick" | "standard" | "slow";

export type VoiceSegment = {
  id: string;
  label: "title" | "subtitle" | "setup" | "step" | "closing" | "reflection";
  text: string;
  pauseAfterMs: number;
};

export type VoiceBuildOptions = {
  voiceStyle: VoiceStyle;
  pacing: VoicePacing;
  includeIntro?: boolean;
  includeClosing?: boolean;
};

type VoiceStatus = "idle" | "playing" | "paused";

type SpeakResult = {
  usingFallback: boolean;
};

const PACING = {
  quick: {
    title: 3000,
    subtitle: 3000,
    setup: 8000,
    step: 15000,
    closing: 8000,
  },
  standard: {
    title: 5000,
    subtitle: 5000,
    setup: 12000,
    step: 25000,
    closing: 12000,
  },
  slow: {
    title: 7000,
    subtitle: 7000,
    setup: 18000,
    step: 30000,
    closing: 15000,
  },
} as const;

const GEMINI_VOICE_MODEL = import.meta.env.VITE_ORACLE_GEMINI_TTS_MODEL || "gemini-2.5-flash-preview-tts";
const GEMINI_VOICE_NAME = import.meta.env.VITE_ORACLE_GEMINI_VOICE_NAME || "Sulafat";
const ELEVENLABS_VOICE_ID = import.meta.env.VITE_ORACLE_ELEVENLABS_VOICE_ID || import.meta.env.VITE_ELEVENLABS_VOICE_ID || "";

let queue: VoiceSegment[] = [];
let queueIndex = 0;
let speaking = false;
let paused = false;
let stopped = false;
let pauseTimer: number | null = null;
let activeAudio: HTMLAudioElement | null = null;
let activeSessionId = "";
let activeVoiceStyle: VoiceStyle = "warm";
let onStatus: ((status: VoiceStatus) => void) | undefined;

function setStatus(status: VoiceStatus) {
  onStatus?.(status);
}

function clearPauseTimer() {
  if (pauseTimer !== null) {
    window.clearTimeout(pauseTimer);
    pauseTimer = null;
  }
}

function scheduleNextAudio(sessionId: string, voiceStyle: VoiceStyle): void {
  if (stopped || paused) return;
  if (queueIndex >= queue.length) {
    speaking = false;
    setStatus("idle");
    return;
  }

  const segment = queue[queueIndex];
  void (async () => {
    try {
      // Try Gemini first, fall back to ElevenLabs if configured.
      const result = await synthesizeGuidedVoiceAudio({
        sessionId: `${sessionId}-${segment.id}`,
        text: segment.text,
        provider: "gemini",
        voiceStyle,
        voiceName: GEMINI_VOICE_NAME,
        speakingRate: 0.84,
        pitch: -1.2,
        model: GEMINI_VOICE_MODEL,
        format: "wav",
      }).catch(async (geminiErr) => {
        if (!ELEVENLABS_VOICE_ID) throw geminiErr;
        return synthesizeGuidedVoiceAudio({
          sessionId: `${sessionId}-${segment.id}-elevenlabs`,
          text: segment.text,
          provider: "elevenlabs",
          voiceStyle,
          voiceId: ELEVENLABS_VOICE_ID,
          speakingRate: 0.84,
          pitch: -1.2,
          format: "mp3",
        });
      });

      if (stopped) return;
      const audio = new Audio(result.audioUrl);
      activeAudio = audio;

      audio.onended = () => {
        if (stopped) return;
        clearPauseTimer();
        pauseTimer = window.setTimeout(() => {
          if (stopped || paused) return;
          queueIndex += 1;
          scheduleNextAudio(sessionId, voiceStyle);
        }, segment.pauseAfterMs);
      };

      audio.onerror = () => {
        console.warn("[Guided Voice] Audio playback error, stopping.");
        speaking = false;
        setStatus("idle");
      };

      await audio.play();
    } catch (error) {
      if (stopped) return;
      console.warn("[Guided Voice] AI voice synthesis failed:", error);
      speaking = false;
      setStatus("idle");
    }
  })();
}

export function buildVoiceSegmentsFromRitual(
  ritual: SacredPathRitual,
  options: VoiceBuildOptions,
): VoiceSegment[] {
  const pace = PACING[options.pacing];
  const includeClosing = options.includeClosing ?? true;
  const includeIntro = options.includeIntro ?? true;

  const segments: VoiceSegment[] = [];
  if (includeIntro) {
    segments.push({
      id: `${ritual.id}-title`,
      label: "title",
      text: ritual.title,
      pauseAfterMs: pace.title,
    });
    segments.push({
      id: `${ritual.id}-subtitle`,
      label: "subtitle",
      text: ritual.subtitle,
      pauseAfterMs: pace.subtitle,
    });
  }

  segments.push({
    id: `${ritual.id}-setup`,
    label: "setup",
    text: ritual.setup.join(" "),
    pauseAfterMs: pace.setup,
  });

  ritual.steps.forEach((step, index) => {
    segments.push({
      id: `${ritual.id}-step-${index + 1}`,
      label: "step",
      text: `Step ${index + 1}. ${step}`,
      pauseAfterMs: pace.step,
    });
  });

  if (includeClosing) {
    segments.push({
      id: `${ritual.id}-closing`,
      label: "closing",
      text: ritual.closing,
      pauseAfterMs: pace.closing,
    });
    segments.push({
      id: `${ritual.id}-reflection`,
      label: "reflection",
      text: ritual.reflectionPrompt,
      pauseAfterMs: pace.closing,
    });
  }

  return segments;
}

export async function speakRitualGuide(
  ritual: SacredPathRitual,
  options: VoiceBuildOptions,
  statusCb?: (s: VoiceStatus) => void,
): Promise<SpeakResult> {
  const segments = buildVoiceSegmentsFromRitual(ritual, options);
  if (typeof window === "undefined") {
    throw new Error("Voice is only available in browser contexts.");
  }

  stopVoice();
  onStatus = statusCb;
  queue = segments;
  queueIndex = 0;
  speaking = true;
  paused = false;
  stopped = false;
  activeSessionId = `${ritual.id}-${Date.now()}`;
  activeVoiceStyle = options.voiceStyle;
  setStatus("playing");

  scheduleNextAudio(activeSessionId, activeVoiceStyle);
  return { usingFallback: false };
}

export function pauseVoice() {
  if (!speaking) return;
  paused = true;
  clearPauseTimer();

  if (activeAudio) {
    activeAudio.pause();
  }

  setStatus("paused");
}

export function resumeVoice() {
  if (!speaking || !paused) return;
  paused = false;

  if (activeAudio && activeAudio.paused) {
    void activeAudio.play();
    setStatus("playing");
    return;
  }

  scheduleNextAudio(activeSessionId, activeVoiceStyle);
  setStatus("playing");
}

export function stopVoice() {
  stopped = true;
  paused = false;
  speaking = false;
  clearPauseTimer();

  if (activeAudio) {
    activeAudio.pause();
    activeAudio.currentTime = 0;
    activeAudio = null;
  }

  setStatus("idle");
}
