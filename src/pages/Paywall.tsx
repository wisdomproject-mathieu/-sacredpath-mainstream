import { Link } from "react-router-dom";

export function Paywall() {
  return (
    <div className="min-h-screen bg-sp-bg text-slate-100 px-6 py-10">
      <div className="max-w-xl mx-auto space-y-6">
        <h2 className="text-3xl font-serif text-amber-100">Go deeper together</h2>
        <p className="text-sm text-slate-300">
          You’ve received tonight’s main ritual. Premium opens the full weather matrix:
          more rituals for each mood, plus Sacred Voice audio guidance.
        </p>
        <ul className="space-y-2 text-sm text-slate-200">
          <li>• Unlock all alternate rituals for every intimacy weather pairing.</li>
          <li>• Access Sacred Voice guided sessions for key practices.</li>
          <li>• Save your favourite rituals for quick access on charged nights.</li>
        </ul>
        <button className="w-full py-3 rounded-full bg-sp-gold text-black font-medium mt-2">
          Start Premium – Unlock tonight
        </button>
        <p className="text-xs text-slate-500 text-center mt-2">
          Subscription handling is not wired yet in this preview. Use this screen to
          integrate your billing provider.
        </p>
        <div className="text-center mt-4">
          <Link to="/ritual" className="text-xs text-slate-400 underline">
            Not now, return to tonight’s ritual
          </Link>
        </div>
      </div>
    </div>
  );
}
