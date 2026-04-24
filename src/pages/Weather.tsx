import { useNavigate } from "react-router-dom";
import { useSession } from "../contexts/SessionContext";
import type { IntimacyWeather } from "../lib/ritualRegistry";

<<<<<<< Updated upstream
const options: { id: IntimacyWeather; label: string }[] = [
  { id: "stormy", label: "Stormy" },
  { id: "cloudy", label: "Cloudy" },
  { id: "warm", label: "Warm" },
  { id: "electric", label: "Electric" },
  { id: "radiant", label: "Radiant" },
=======
const options: { id: IntimacyWeather; label: string; subtitle: string }[] = [
  { id: "stormy", label: "Stormy", subtitle: "Tense, charged, something unsaid" },
  { id: "cloudy", label: "Cloudy", subtitle: "Heavy, low energy, tender" },
  { id: "warm", label: "Warm", subtitle: "Soft, open, affectionate" },
  { id: "electric", label: "Electric", subtitle: "Playful, charged, erotic" },
  { id: "radiant", label: "Radiant", subtitle: "Blessed, devotional, luminous" },
>>>>>>> Stashed changes
];

export default function Weather() {
  const { state, setState } = useSession();
  const navigate = useNavigate();

  const setWeather = (field: "youWeather" | "partnerWeather", value: IntimacyWeather) => {
    setState({ ...state, [field]: value });
  };

  const canContinue = state.youWeather && state.partnerWeather;

  return (
    <div className="min-h-screen bg-sp-bg text-slate-100 px-6 py-10">
<<<<<<< Updated upstream
      <div className="max-w-xl mx-auto space-y-6">
        <h2 className="text-2xl font-serif text-amber-100">
          What is the intimacy weather tonight?
        </h2>
        <p className="text-sm text-slate-300">
          First, feel into your body. Then choose the weather that best matches your
          inner climate.
        </p>

        <div className="grid grid-cols-5 gap-2">
          {options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setWeather("youWeather", opt.id)}
              className={`py-2 rounded-full text-xs ${
                state.youWeather === opt.id
                  ? "bg-sp-gold text-black"
                  : "bg-sp-card text-slate-200 border border-slate-700"
              }`}
            >
              You · {opt.label}
            </button>
          ))}
        </div>

        <p className="text-sm text-slate-300 mt-4">
          Now, gently sense your partner’s weather.
        </p>
        <div className="grid grid-cols-5 gap-2">
          {options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setWeather("partnerWeather", opt.id)}
              className={`py-2 rounded-full text-xs ${
                state.partnerWeather === opt.id
                  ? "bg-sp-gold text-black"
                  : "bg-sp-card text-slate-200 border border-slate-700"
              }`}
            >
              Beloved · {opt.label}
            </button>
          ))}
=======
      <div className="max-w-xl mx-auto space-y-8">
        <div className="flex justify-center">
          <img src="/sacred-path-mark.png" alt="Sacred Path" className="w-24 h-24 mb-2" />
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
>>>>>>> Stashed changes
        </div>

        <button
          disabled={!canContinue}
          onClick={() => canContinue && navigate("/ritual")}
<<<<<<< Updated upstream
          className="mt-6 w-full py-3 rounded-full bg-sp-gold text-black font-medium disabled:opacity-40"
=======
          className="w-full py-3 rounded-full bg-sp-gold text-black font-bold disabled:opacity-40"
>>>>>>> Stashed changes
        >
          Show tonight’s ritual
        </button>
      </div>
    </div>
  );
}