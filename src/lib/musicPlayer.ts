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

const TRACK_URLS: Record<MusicTrack, string> = {
  tantra: "/assets/audio/ambient-tantra.wav",
  meditation: "/assets/audio/ambient-meditation.wav",
};

let audioEl: HTMLAudioElement | null = null;

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

function ensureAudioElement(): boolean {
  if (typeof window === "undefined") return false;
  if (audioEl) return true;

  const el = new Audio(TRACK_URLS[state.track]);
  el.loop = true;
  el.preload = "auto";
  el.volume = state.volume;
  el.addEventListener("ended", () => {
    state.isPlaying = false;
    emit();
  });
  el.addEventListener("error", () => {
    state.error = "Ambient music could not load on this device.";
    state.isPlaying = false;
    emit();
  });
  audioEl = el;
  state.ready = true;
  return true;
}

async function playCurrentTrack(): Promise<void> {
  if (!ensureAudioElement() || !audioEl) return;
  audioEl.src = TRACK_URLS[state.track];
  audioEl.volume = state.volume;
  audioEl.currentTime = 0;
  await audioEl.play();
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

  try {
    await playCurrentTrack();
    state.isPlaying = true;
    state.error = "";
    persist();
    emit();
  } catch {
    state.error = "Could not start music. Please tap play again after interacting with the screen.";
    state.isPlaying = false;
    emit();
  }
}

export async function setMusicTrack(track: MusicTrack): Promise<void> {
  state.track = track;
  persist();

  if (state.isPlaying && audioEl) {
    try {
      await playCurrentTrack();
      state.error = "";
    } catch {
      state.error = "Could not switch track right now.";
      state.isPlaying = false;
    }
  }

  emit();
}

export function setMusicVolume(volume: number): void {
  state.volume = Math.max(0, Math.min(1, volume));
  if (audioEl) {
    audioEl.volume = state.volume;
  }
  persist();
  emit();
}

export function stopMusic(): void {
  if (audioEl) {
    audioEl.pause();
    audioEl.currentTime = 0;
  }
  state.isPlaying = false;
  emit();
}
