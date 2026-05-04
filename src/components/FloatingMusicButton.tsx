import { useEffect, useState } from "react";
import {
  getMusicState,
  initMusicState,
  subscribeMusic,
  toggleMusicPlayback,
} from "../lib/musicPlayer";

export default function FloatingMusicButton() {
  const [state, setState] = useState(getMusicState());

  useEffect(() => {
    initMusicState();
    return subscribeMusic(setState);
  }, []);

  return (
    <div className="fixed bottom-[calc(6.2rem+env(safe-area-inset-bottom))] right-4 z-50">
      <button
        type="button"
        aria-label={state.isPlaying ? "Pause ambient music" : "Play ambient music"}
        onClick={() => void toggleMusicPlayback()}
        className="grid h-14 w-14 place-items-center rounded-full border border-accent/55 bg-[#191628]/92 text-xl text-[#f6c77d] shadow-xl backdrop-blur"
      >
        {state.isPlaying ? "♫" : "♪"}
      </button>
      {state.error ? (
        <p className="mt-2 max-w-44 rounded-lg border border-red-300/25 bg-[#1a1628]/92 px-2 py-1 text-[10px] text-red-200">
          {state.error}
        </p>
      ) : null}
    </div>
  );
}
