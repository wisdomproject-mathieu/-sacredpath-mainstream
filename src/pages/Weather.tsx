import { useNavigate } from "react-router-dom";
import CoupleTopbar from "../components/CoupleTopbar";
import { useSession } from "../contexts/SessionContext";
import type { IntimacyWeather } from "../lib/ritualRegistry";

const options: { id: IntimacyWeather; label: string; subtitle: string }[] = [
  { id: "stormy", label: "Stormy", subtitle: "Tense, charged, something unsaid" },
  { id: "cloudy", label: "Cloudy", subtitle: "Heavy, low energy, tender" },
  { id: "warm", label: "Warm", subtitle: "Soft, open, affectionate" },
  { id: "electric", label: "Electric", subtitle: "Playful, charged, erotic" },
  { id: "radiant", label: "Radiant", subtitle: "Blessed, devotional, luminous" },
];

export default function Weather() {
  const { state, setState } = useSession();
  const navigate = useNavigate();
  const logoSrc = `${import.meta.env.BASE_URL}sacred-path-mark.png`;

  const setWeather = (field: "youWeather" | "partnerWeather", value: IntimacyWeather) => {
    setState({ ...state, [field]: value });
  };

  const canContinue = state.youWeather && state.partnerWeather;

  return (
    <div className="min-h-screen bg-sp-bg text-slate-100 px-6 py-10">
      <div className="max-w-xl mx-auto space-y-8">
        <CoupleTopbar />
        <div className="flex justify-center">
          <img src={logoSrc} alt="Sacred Path" className="w-24 h-24 mb-2" />
        </div>

        <div className="text-center">
          <h2 className="screen-title text-amber-100">Sense tonight&apos;s weather</h2>
          <p className="screen-body">Feel into your body. Then sense your partner&apos;s. The ritual will meet you both.</p>
        </div>

        <div className="space-y-3">
          <p className="text-xs uppercase tracking-wide text-slate-400">Your inner weather</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setWeather("youWeather", opt.id)}
                className={`rounded-2xl border text-left p-4 transition ${state.youWeather === opt.id ? "border-sp-gold bg-sp-card" : "border-slate-800 bg-sp-card/60 hover:border-sp-gold/70"}`}
              >
                <p className="text-sm font-bold text-amber-50">{opt.label}</p>
                <p className="text-[11px] text-slate-300">{opt.subtitle}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-xs uppercase tracking-wide text-slate-400">Your partner&apos;s weather</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setWeather("partnerWeather", opt.id)}
                className={`rounded-2xl border text-left p-4 transition ${state.partnerWeather === opt.id ? "border-sp-gold bg-sp-card" : "border-slate-800 bg-sp-card/60 hover:border-sp-gold/70"}`}
              >
                <p className="text-sm font-bold text-amber-50">{opt.label}</p>
                <p className="text-[11px] text-slate-300">{opt.subtitle}</p>
              </button>
            ))}
          </div>
        </div>

        <button
          disabled={!canContinue}
          onClick={() => canContinue && navigate("/ritual")}
          className="w-full py-3 rounded-full bg-sp-gold text-black font-bold disabled:opacity-40"
        >
          Show tonight&apos;s ritual
        </button>
      </div>
    </div>
  );
}
