export type MusicTrack = "tantra" | "meditation";

type MusicState = {
  isPlaying: boolean;
  track: MusicTrack;
  volume: number;
  ready: boolean;
  error: string;
};

const STORAGE_KEY = "sp-music-settings";
const listeners = new Set<(state: MusicState) => void>();

let audioContext: AudioContext | null = null;
let masterGain: GainNode | null = null;
let ambienceGain: GainNode | null = null;
let droneOscA: OscillatorNode | null = null;
let droneOscB: OscillatorNode | null = null;
let pulseTimer: number | null = null;
let modulationTimer: number | null = null;

const state: MusicState = {
  isPlaying: false,
  track: "tantra",
  volume: 0.7,
  ready: false,
  error: "",
};

function emit(): void {
  for (const listener of listeners) listener({ ...state });
}

function persist(): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ track: state.track, volume: state.volume }),
  );
}

function applyVolume(): void {
  if (!masterGain) return;
  const safeVolume = Math.max(0.05, Math.min(1, state.volume));
  masterGain.gain.setTargetAtTime(safeVolume, audioContext?.currentTime ?? 0, 0.08);
}

function stopTimers(): void {
  if (pulseTimer !== null) {
    window.clearInterval(pulseTimer);
    pulseTimer = null;
  }
  if (modulationTimer !== null) {
    window.clearInterval(modulationTimer);
    modulationTimer = null;
  }
}

function stopNodes(): void {
  stopTimers();
  const now = audioContext?.currentTime ?? 0;
  if (droneOscA) {
    droneOscA.stop(now + 0.05);
    droneOscA.disconnect();
    droneOscA = null;
  }
  if (droneOscB) {
    droneOscB.stop(now + 0.05);
    droneOscB.disconnect();
    droneOscB = null;
  }
  if (ambienceGain) {
    ambienceGain.disconnect();
    ambienceGain = null;
  }
}

function ensureContext(): boolean {
  if (typeof window === "undefined") return false;
  if (audioContext) return true;
  const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctx) {
    state.error = "Audio is not supported on this device.";
    emit();
    return false;
  }
  audioContext = new Ctx();
  masterGain = audioContext.createGain();
  masterGain.gain.value = state.volume;
  masterGain.connect(audioContext.destination);
  state.ready = true;
  state.error = "";
  return true;
}

function startTantra(): void {
  if (!audioContext || !masterGain) return;
  ambienceGain = audioContext.createGain();
  ambienceGain.gain.value = 0.38;
  ambienceGain.connect(masterGain);

  droneOscA = audioContext.createOscillator();
  droneOscA.type = "sine";
  droneOscA.frequency.value = 196;
  droneOscA.connect(ambienceGain);
  droneOscA.start();

  droneOscB = audioContext.createOscillator();
  droneOscB.type = "sine";
  droneOscB.frequency.value = 294;
  droneOscB.connect(ambienceGain);
  droneOscB.start();

  modulationTimer = window.setInterval(() => {
    if (!audioContext || !ambienceGain) return;
    const next = 0.28 + Math.random() * 0.2;
    ambienceGain.gain.setTargetAtTime(next, audioContext.currentTime, 1.6);
  }, 2400);
}

function playBell(frequency: number, duration = 1.2): void {
  if (!audioContext || !masterGain) return;
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  osc.type = "sine";
  osc.frequency.value = frequency;
  gain.gain.value = 0;
  osc.connect(gain);
  gain.connect(masterGain);

  const now = audioContext.currentTime;
  gain.gain.linearRampToValueAtTime(0.2, now + 0.04);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
  osc.start(now);
  osc.stop(now + duration + 0.05);
}

function startMeditation(): void {
  if (!audioContext || !masterGain) return;
  ambienceGain = audioContext.createGain();
  ambienceGain.gain.value = 0.3;
  ambienceGain.connect(masterGain);

  droneOscA = audioContext.createOscillator();
  droneOscA.type = "sine";
  droneOscA.frequency.value = 220;
  droneOscA.connect(ambienceGain);
  droneOscA.start();

  droneOscB = audioContext.createOscillator();
  droneOscB.type = "sine";
  droneOscB.frequency.value = 329.63;
  droneOscB.connect(ambienceGain);
  droneOscB.start();

  pulseTimer = window.setInterval(() => {
    playBell(528, 1.4);
  }, 6500);
}

function startTrack(track: MusicTrack): void {
  stopNodes();
  state.track = track;
  if (track === "tantra") {
    startTantra();
  } else {
    startMeditation();
  }
}

export function initMusicState(): void {
  if (typeof window === "undefined") return;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw) as { track?: MusicTrack; volume?: number };
    if (parsed.track === "tantra" || parsed.track === "meditation") {
      state.track = parsed.track;
    }
    if (typeof parsed.volume === "number" && parsed.volume >= 0 && parsed.volume <= 1) {
      state.volume = parsed.volume;
    }
  } catch {
    // ignore malformed local settings
  }
}

export function subscribeMusic(listener: (s: MusicState) => void): () => void {
  listeners.add(listener);
  listener({ ...state });
  return () => {
    listeners.delete(listener);
  };
}

export function getMusicState(): MusicState {
  return { ...state };
}

export async function toggleMusicPlayback(): Promise<void> {
  if (state.isPlaying) {
    stopMusic();
    return;
  }
  if (!ensureContext() || !audioContext) return;
  try {
    if (audioContext.state !== "running") {
      await audioContext.resume();
    }
  } catch {
    state.error = "Could not start audio. Please turn off silent mode and try again.";
    emit();
    return;
  }
  if (audioContext.state !== "running") {
    state.error = "Audio is blocked on this device. Tap play again after interacting with the screen.";
    emit();
    return;
  }
  startTrack(state.track);
  applyVolume();
  state.isPlaying = true;
  state.error = "";
  persist();
  emit();
}

export async function setMusicTrack(track: MusicTrack): Promise<void> {
  state.track = track;
  persist();
  if (state.isPlaying) {
    if (!ensureContext()) return;
    startTrack(track);
    applyVolume();
  }
  emit();
}

export function setMusicVolume(volume: number): void {
  state.volume = Math.max(0, Math.min(1, volume));
  persist();
  applyVolume();
  emit();
}

export function stopMusic(): void {
  stopNodes();
  state.isPlaying = false;
  emit();
}
