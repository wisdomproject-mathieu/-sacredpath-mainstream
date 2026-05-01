import type { SacredPathRitual } from "../data/sacredPathRituals";
import { playGoogleTranslateSegment } from "./googleTranslateTts";
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

let queue: VoiceSegment[] = [];
let queueIndex = 0;
let speaking = false;
let paused = false;
let stopped = false;
let pauseTimer: number | null = null;
let activeAudio: HTMLAudioElement | null = null;
let fallbackMode = false;
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
      const audio = await playGoogleTranslateSegment(segment.text, {
        lang: "en",
        rate: 0.82,
        onEnded: () => {
          if (stopped) return;
          clearPauseTimer();
          pauseTimer = window.setTimeout(() => {
            if (stopped || paused) return;
            queueIndex += 1;
            scheduleNextAudio(sessionId, voiceStyle);
          }, segment.pauseAfterMs);
        },
      });
      activeAudio = audio;
      return;
    } catch {
      // Continue to backend chain.
    }

    try {
      const result = await synthesizeGuidedVoiceAudio({
        sessionId: `${sessionId}-${segment.id}`,
        text: segment.text,
        voiceStyle,
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
        // Trigger fallback by stopping this chain.
        throw new Error("Audio playback failed");
      };

      await audio.play();
    } catch (error) {
      if (stopped) return;
      console.warn("[Guided Voice] backend segment failed, switching to device voice", error);
      fallbackMode = true;
      void speakWithBrowserFallback(queue, onStatus, queueIndex);
    }
  })();
}

function pickFallbackVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  const preferred = [
    "Samantha",
    "Google UK English Female",
    "Karen",
    "Moira",
    "Ava",
    "Google US English",
  ];

  for (const name of preferred) {
    const found = voices.find((v) => v.name === name);
    if (found) return found;
  }

  const enVoice = voices.find((v) => v.lang?.toLowerCase().startsWith("en"));
  return enVoice ?? voices[0] ?? null;
}

function scheduleNextFallback() {
  if (stopped || paused) return;
  if (queueIndex >= queue.length) {
    speaking = false;
    setStatus("idle");
    return;
  }

  const segment = queue[queueIndex];
  const utterance = new SpeechSynthesisUtterance(segment.text);
  const voices = window.speechSynthesis.getVoices();
  const picked = pickFallbackVoice(voices);
  if (picked) utterance.voice = picked;
  utterance.rate = 0.82;
  utterance.pitch = 0.95;
  utterance.volume = 1;

  utterance.onend = () => {
    if (stopped) return;
    clearPauseTimer();
    pauseTimer = window.setTimeout(() => {
      if (stopped || paused) return;
      queueIndex += 1;
      scheduleNextFallback();
    }, segment.pauseAfterMs);
  };

  window.speechSynthesis.speak(utterance);
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

export async function speakWithBrowserFallback(
  segments: VoiceSegment[],
  statusCb?: (s: VoiceStatus) => void,
  startIndex = 0,
) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    throw new Error("Speech synthesis unavailable on this device");
  }

  onStatus = statusCb;
  stopVoice();
  queue = segments;
  queueIndex = startIndex;
  speaking = true;
  paused = false;
  stopped = false;
  setStatus("playing");
  scheduleNextFallback();
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
  fallbackMode = false;
  activeSessionId = `${ritual.id}-${Date.now()}`;
  activeVoiceStyle = options.voiceStyle;
  setStatus("playing");

  try {
    scheduleNextAudio(activeSessionId, activeVoiceStyle);
    return { usingFallback: false };
  } catch (error) {
    console.warn("[Guided Voice] backend unavailable, using device voice", error);
    fallbackMode = true;
    await speakWithBrowserFallback(segments, statusCb);
    return { usingFallback: true };
  }
}

export function pauseVoice() {
  if (!speaking) return;
  paused = true;
  clearPauseTimer();

  if (fallbackMode && typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.pause();
  } else if (activeAudio) {
    activeAudio.pause();
  }

  setStatus("paused");
}

export function resumeVoice() {
  if (!speaking || !paused) return;
  paused = false;

  if (fallbackMode && typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.resume();
    setStatus("playing");
    return;
  }

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

  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }

  if (activeAudio) {
    activeAudio.pause();
    activeAudio.currentTime = 0;
    activeAudio = null;
  }

  setStatus("idle");
}
