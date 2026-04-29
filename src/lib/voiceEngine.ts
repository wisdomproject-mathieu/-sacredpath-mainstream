import type { SacredPathRitual } from "../data/sacredPathRituals";

export type VoiceStyle = "warm" | "calm" | "deep" | "soft";
export type VoicePacing = "quick" | "deep" | "silent";

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

const PACING = {
  quick: {
    title: 3000,
    subtitle: 3000,
    setup: 8000,
    step: 15000,
    closing: 8000,
  },
  deep: {
    title: 5000,
    subtitle: 5000,
    setup: 15000,
    step: 30000,
    closing: 15000,
  },
  silent: {
    title: 8000,
    subtitle: 8000,
    setup: 20000,
    step: 45000,
    closing: 20000,
  },
} as const;

let queue: VoiceSegment[] = [];
let queueIndex = 0;
let speaking = false;
let paused = false;
let stopped = false;
let pauseTimer: number | null = null;
let activeUtterance: SpeechSynthesisUtterance | null = null;
let onStatus: ((status: "idle" | "playing" | "paused") => void) | undefined;

function setStatus(status: "idle" | "playing" | "paused") {
  onStatus?.(status);
}

function scheduleNext() {
  if (stopped) return;
  if (queueIndex >= queue.length) {
    speaking = false;
    setStatus("idle");
    return;
  }

  const segment = queue[queueIndex];
  const utterance = new SpeechSynthesisUtterance(segment.text);
  activeUtterance = utterance;
  utterance.rate = 0.92;
  utterance.pitch = 1;
  utterance.onend = () => {
    if (stopped) return;
    pauseTimer = window.setTimeout(() => {
      if (stopped) return;
      queueIndex += 1;
      scheduleNext();
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

export async function speakWithGemini() {
  // TODO: connect Gemini TTS through secure server-side endpoint before production.
  throw new Error("Gemini TTS endpoint not configured");
}

export async function speakWithBrowserFallback(segments: VoiceSegment[], statusCb?: (s: "idle" | "playing" | "paused") => void) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  onStatus = statusCb;
  stopVoice();
  queue = segments;
  queueIndex = 0;
  speaking = true;
  paused = false;
  stopped = false;
  setStatus("playing");
  scheduleNext();
}

export async function speakRitualGuide(
  ritual: SacredPathRitual,
  options: VoiceBuildOptions,
  statusCb?: (s: "idle" | "playing" | "paused") => void,
) {
  const segments = buildVoiceSegmentsFromRitual(ritual, options);
  try {
    await speakWithGemini();
  } catch {
    await speakWithBrowserFallback(segments, statusCb);
  }
}

export function pauseVoice() {
  if (typeof window === "undefined" || !("speechSynthesis" in window) || !speaking) return;
  paused = true;
  window.speechSynthesis.pause();
  setStatus("paused");
}

export function resumeVoice() {
  if (typeof window === "undefined" || !("speechSynthesis" in window) || !speaking) return;
  paused = false;
  window.speechSynthesis.resume();
  setStatus("playing");
}

export function stopVoice() {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  stopped = true;
  paused = false;
  speaking = false;
  if (pauseTimer) {
    window.clearTimeout(pauseTimer);
    pauseTimer = null;
  }
  window.speechSynthesis.cancel();
  activeUtterance = null;
  setStatus("idle");
}

