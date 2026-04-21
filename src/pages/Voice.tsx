import { useLocation, Link } from "react-router-dom";

export function Voice() {
  const location = useLocation();
  const title = (location.state as { title?: string } | null)?.title ?? "Sacred Voice";

  return (
    <div className="min-h-screen bg-sp-bg text-slate-100 px-6 py-10 flex items-center justify-center">
      <div className="max-w-md w-full bg-sp-card border border-slate-800 rounded-3xl p-6 space-y-4 text-center">
        <p className="text-xs tracking-[0.2em] uppercase text-sp-gold">
          Sacred Voice Preview
        </p>
        <h2 className="text-2xl font-serif text-amber-100">{title}</h2>
        <p className="text-sm text-slate-300">
          This is a stub for your guided audio experience. Connect this screen to your
          existing Sacred Voice / TTS pipeline or uploaded audio tracks.
        </p>
        <button className="w-full py-3 rounded-full bg-sp-gold text-black font-medium">
          ▶︎ Play sample (stub)
        </button>
        <p className="text-xs text-slate-500">
          In production, this button would stream a Sacred Voice session for the
          selected ritual.
        </p>
        <Link to="/ritual" className="text-xs text-slate-400 underline">
          Back to tonight’s ritual
        </Link>
      </div>
    </div>
  );
}
