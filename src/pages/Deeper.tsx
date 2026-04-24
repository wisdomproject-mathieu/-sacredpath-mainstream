import { Link } from "react-router-dom";
import CoupleTopbar from "../components/CoupleTopbar";

export default function Deeper() {
  const logoSrc = `${import.meta.env.BASE_URL}sacred-path-mark.png`;

  return (
    <div className="min-h-screen bg-sp-bg text-slate-100 px-6 py-10">
      <div className="max-w-xl mx-auto space-y-6">
        <CoupleTopbar />
        <div className="flex justify-center">
          <img src={logoSrc} alt="Sacred Path" className="w-24 h-24 mb-2" />
        </div>

        <div className="text-xs tracking-[0.25em] uppercase text-sp-gold font-bold">Go deeper</div>
        <h2 className="screen-title text-amber-100">A deeper teaser for men and couples</h2>
        <p className="screen-body">A practical introduction to semen retention and tantric pacing to build steadier desire, longer lovemaking, and more frequent intimacy over time.</p>

        <div className="bg-sp-card border border-slate-800 rounded-3xl p-5 space-y-3">
          <p className="text-xs uppercase tracking-wide text-sp-gold font-bold">Teaser: semen retention</p>
          <h3 className="text-xl font-bold text-amber-50">Use arousal as fuel, not pressure</h3>
          <p className="text-sm text-slate-300">Semen retention in this app means better pacing, stronger breath control, and less rush to finish. The goal is not suppression, it is choice and stamina.</p>
          <p className="text-sm text-slate-300">When pace is steadier, women usually feel safer, touch becomes more responsive, and couples naturally create more moments of lovemaking week to week.</p>
        </div>

        <div className="bg-sp-card border border-slate-800 rounded-3xl p-5 space-y-3">
          <p className="text-xs uppercase tracking-wide text-sp-gold font-bold">Micro-practice</p>
          <ol className="space-y-2 text-sm text-slate-100 list-decimal list-inside">
            <li>Breathe slowly for six rounds before escalation.</li>
            <li>Pause at 70% arousal and reconnect through touch.</li>
            <li>Resume only when both partners feel fully present.</li>
            <li>Track how this changes quality and frequency this week.</li>
          </ol>
        </div>

        <Link to="/ritual" className="block w-full py-3 rounded-full bg-sp-gold text-black font-bold text-center">
          Back to tonight&apos;s ritual
        </Link>

        <div className="text-center">
          <Link to="/paywall" className="text-xs text-slate-400 underline">Open subscription page</Link>
        </div>
      </div>
    </div>
  );
}
