import { useNavigate } from "react-router-dom";
import { useSession } from "../contexts/SessionContext";
import type { IntimacyWeather } from "../lib/ritualRegistry";

const options: {
  id: IntimacyWeather;
  label: string;
  subtitle: string;
}[] = [
  {
    id: "stormy",
    label: "Stormy",
    subtitle: "Tense, charged, something unsaid",
  },
  {
    id: "cloudy",
    label: "Cloudy",
    subtitle: "Heavy, low energy, tender",
  },
  {
    id: "warm",
    label: "Warm",
    subtitle: "Soft, open, affectionate",
  },
  {
    id: "electric",
    label: "Electric",
    subtitle: "Playful, charged, erotic",
  },
  {
    id: "radiant",
    label: "Radiant",
    subtitle: "Blessed, devotional, luminous",
  },
];

export function Weather() {
  const { state, setState } = useSession();
  const navigate = useNavigate();

  const setWeather = (
    field: "youWeather" | "partnerWeather",
    value: IntimacyWeather
  ) => {
    setState({ ...state, [field]: value });
  };

  const canContinue = state.youWeather && state.partnerWeather;

  return (
    <div className="min-h-screen bg-sp-bg text-slate-100 px-6 py-10">
      <div className="max-w-xl mx-auto space-y-8">
        <div className="flex justify-center">
          <img
            src="/sacred-path-mark.png"
            alt="Sacred Path symbol"
            className="w-28 h-28 mb-4"
          />
        </div>

        <h2 className="text-2xl font-serif text-amber-100">
          Sense tonight&apos;s intimacy weather
        </h2>
        <p className="text-sm text-slate-300">
          First, feel into your own body. Then gently sense your partner&apos;s
          weather, without fixing or judging. The ritual will meet you both
          where you are.
        </p>

        {/* Your weather */}
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-wide text-slate-400">
            Your inner weather
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {options.map((opt) => {
              const selected = state.youWeather === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setWeather("youWeather", opt.id)}
                  className={`rounded-2xl border text-left p-4 transition ${
                    selected
                      ? "border-sp-gold bg-sp-card"
                      : "border-slate-800 bg-sp-card/60 hover:border-sp-gold/70"
                  }`}
                >
                  <p className="text-sm font-medium text-amber-50">
                    {opt.label}
                  </p>
                  <p className="text-[11px] text-slate-200/80">
                    {opt.subtitle}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Partner weather */}
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-wide text-slate-400">
            Your partner&apos;s weather (sense, don&apos;t assume)
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {options.map((opt) => {
              const selected = state.partnerWeather === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setWeather("partnerWeather", opt.id)}
                  className={`rounded-2xl border text-left p-4 transition ${
                    selected
                      ? "border-sp-gold bg-sp-card"
                      : "border-slate-800 bg-sp-card/60 hover:border-sp-gold/70"
                  }`}
                >
                  <p className="text-sm font-medium text-amber-50">
                    {opt.label}
                  </p>
                  <p className="text-[11px] text-slate-200/80">
                    {opt.subtitle}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        <button
          disabled={!canContinue}
          onClick={() => canContinue && navigate("/ritual")}
          className="mt-2 w-full py-3 rounded-full bg-sp-gold text-black font-medium disabled:opacity-40"
        >
          Show tonight&apos;s ritual
        </button>
      </div>
    </div>
  );
}
