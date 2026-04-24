import { Link } from "react-router-dom";

export default function Deeper() {
  return (
    <div className="min-h-screen bg-sp-bg text-slate-100 px-6 py-10">
      <div className="max-w-xl mx-auto space-y-6">
        <div className="flex justify-center">
          <img src="/sacred-path-mark.png" alt="Sacred Path" className="w-24 h-24 mb-2" />
        </div>

        <div className="text-xs tracking-[0.25em] uppercase text-sp-gold font-bold">Go deeper</div>
        <h2 className="screen-title text-amber-100">Tonight&apos;s deeper teaching</h2>
        <p className="screen-body">Move from the ritual into the wisdom beneath it. One practice, one shift in how you meet each other.</p>

        <div className="bg-sp-card border border-slate-800 rounded-3xl p-5 space-y-3">
          <p className="text-xs uppercase tracking-wide text-sp-gold font-bold">Sacred Path teaching</p>
          <h3 className="text-xl font-bold text-amber-50">Presence before performance</h3>
          <p className="text-sm text-slate-300">Most couples rush toward the act. Tantra and Tao teach the opposite: slow down until presence becomes the whole point. When he breathes with her rhythm and she feels truly seen, the body opens on its own.</p>
          <p className="text-sm text-slate-300">Tonight, practice one minute of eye contact before touch. No speaking. No agenda. Just witness each other.</p>
        </div>

        <div className="bg-sp-card border border-slate-800 rounded-3xl p-5 space-y-3">
          <p className="text-xs uppercase tracking-wide text-sp-gold font-bold">Practice</p>
          <ol className="space-y-2 text-sm text-slate-100 list-decimal list-inside">
            <li>Sit facing each other, knees touching.</li>
            <li>Place one hand on your heart, one on your partner&apos;s.</li>
            <li>Breathe together for 60 seconds.</li>
            <li>Let the next moment arise, not be forced.</li>
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
