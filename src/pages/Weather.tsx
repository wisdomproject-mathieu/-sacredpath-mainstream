import { useNavigate } from "react-router-dom";
import { useSession } from "../contexts/SessionContext";
import type { IntimacyWeather } from "../lib/ritualRegistry";

const options: { id: IntimacyWeather; label: string }[] = [
  { id: "stormy", label: "Stormy" },
  { id: "cloudy", label: "Cloudy" },
  { id: "warm", label: "Warm" },
  { id: "electric", label: "Electric" },
  { id: "radiant", label: "Radiant" },
];

export function Weather() {
  const { state, setState } = useSession();
  const navigate = useNavigate();

  const setWeather = (field: "youWeather" | "partnerWeather", value: IntimacyWeather) => {
    setState({ ...state, [field]: value });
  };

  const canContinue = state.youWeather && state.partnerWeather;

  return (
    <div className="min-h-screen bg-sp-bg text-slate-100 px-6 py-10">
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
        </div>

        <button
          disabled={!canContinue}
          onClick={() => canContinue && navigate("/ritual")}
          className="mt-6 w-full py-3 rounded-full bg-sp-gold text-black font-medium disabled:opacity-40"
        >
          Show tonight’s ritual
        </button>
      </div>
    </div>
  );
}
