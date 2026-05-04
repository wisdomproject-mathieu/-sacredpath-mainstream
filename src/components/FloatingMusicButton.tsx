import { useEffect, useState } from "react";
import {
  getMusicState,
  initMusicState,
  setMusicTrack,
  setMusicVolume,
  subscribeMusic,
  toggleMusicPlayback,
  type MusicTrack,
} from "../lib/musicPlayer";

export default function FloatingMusicButton() {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState(getMusicState());

  useEffect(() => {
    initMusicState();
    return subscribeMusic(setState);
  }, []);

  return (
    <div className="fixed bottom-[calc(6.2rem+env(safe-area-inset-bottom))] right-4 z-50">
      {open ? (
        <div className="mb-3 w-72 rounded-2xl border border-white/15 bg-[#110e1f]/95 p-4 shadow-2xl backdrop-blur">
          <p className="text-[11px] uppercase tracking-[0.2em] text-accent">Ambient music</p>
          <p className="mt-1 text-sm text-muted">Keep browsing while tantra or meditation audio plays.</p>

          <div className="mt-3 grid grid-cols-2 gap-2">
            {(["tantra", "meditation"] as MusicTrack[]).map((track) => (
              <button
                key={track}
                type="button"
                onClick={() => void setMusicTrack(track)}
                className={`rounded-lg border px-3 py-2 text-xs font-semibold capitalize ${
                  state.track === track ? "border-accent bg-accent/15" : "border-white/10 bg-white/5"
                }`}
              >
                {track}
              </button>
            ))}
          </div>

          <label className="mt-3 block text-xs text-muted">
            Volume
            <input
              type="range"
              min={0}
              max={100}
              value={Math.round(state.volume * 100)}
              onChange={(e) => setMusicVolume(Number(e.target.value) / 100)}
              className="mt-2 w-full"
            />
          </label>

          {state.error ? <p className="mt-2 text-xs text-red-300">{state.error}</p> : null}

          <button
            type="button"
            onClick={() => void toggleMusicPlayback()}
            className="mt-3 w-full rounded-full bg-gradient-to-br from-[#e6b980] to-[#eacda3] px-4 py-2 text-sm font-semibold text-[#130f08]"
          >
            {state.isPlaying ? "Pause music" : "Play music"}
          </button>
        </div>
      ) : null}

      <button
        type="button"
        aria-label={state.isPlaying ? "Music controls (playing)" : "Music controls"}
        onClick={() => setOpen((v) => !v)}
        className="grid h-14 w-14 place-items-center rounded-full border border-accent/50 bg-[#1a1628]/95 text-xl shadow-xl"
      >
        {state.isPlaying ? "♫" : "♪"}
      </button>
    </div>
  );
}
