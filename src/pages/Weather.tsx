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

const weatherVisuals: Record<IntimacyWeather, { weatherIcon: string; sacredIcon: string; tone: string }> = {
  stormy: { weatherIcon: "⛈", sacredIcon: "◈", tone: "Storm release" },
  cloudy: { weatherIcon: "☁️", sacredIcon: "◍", tone: "Soft restoration" },
  warm: { weatherIcon: "☀️", sacredIcon: "✿", tone: "Open-hearted" },
  electric: { weatherIcon: "⚡", sacredIcon: "✦", tone: "Magnetic pulse" },
  radiant: { weatherIcon: "🌕", sacredIcon: "◎", tone: "Devotional glow" },
};

export default function Weather() {
  const { state, setState } = useSession();
  const navigate = useNavigate();

  const setWeather = (field: "youWeather" | "partnerWeather", value: IntimacyWeather) => {
    setState({ ...state, [field]: value });
  };

  const canContinue = state.youWeather && state.partnerWeather;

  return (
    <div className="min-h-screen bg-sp-bg text-slate-100 px-6 py-10">
      <div className="max-w-3xl mx-auto space-y-5">
        <CoupleTopbar />
        <div className="weather-headline-strip">
          <p className="weather-kicker">Intimacy weather</p>
          <h2 className="screen-title text-amber-100">How are you both arriving tonight?</h2>
          <p className="screen-body">Pick one state for you and one for your partner. We&apos;ll match a practical ritual for tonight.</p>
        </div>

        <div className="space-y-3 weather-section">
          <p className="text-xs uppercase tracking-wide text-amber-200/90">Your inner weather</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setWeather("youWeather", opt.id)}
                className={`weather-option-card ${state.youWeather === opt.id ? "weather-option-card-active" : ""}`}
              >
                <div className="weather-option-head">
                  <span className="weather-symbol">{weatherVisuals[opt.id].weatherIcon}</span>
                  <span className="weather-symbol weather-symbol-sacred">{weatherVisuals[opt.id].sacredIcon}</span>
                  <span className="weather-premium-chip">🔒 Premium</span>
                </div>
                <p className="weather-option-title">{opt.label}</p>
                <p className="weather-option-subtitle">{opt.subtitle}</p>
                <p className="weather-option-tone">{weatherVisuals[opt.id].tone}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3 weather-section">
          <p className="text-xs uppercase tracking-wide text-amber-200/90">Your partner&apos;s weather</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setWeather("partnerWeather", opt.id)}
                className={`weather-option-card ${state.partnerWeather === opt.id ? "weather-option-card-active" : ""}`}
              >
                <div className="weather-option-head">
                  <span className="weather-symbol">{weatherVisuals[opt.id].weatherIcon}</span>
                  <span className="weather-symbol weather-symbol-sacred">{weatherVisuals[opt.id].sacredIcon}</span>
                  <span className="weather-premium-chip">🔒 Premium</span>
                </div>
                <p className="weather-option-title">{opt.label}</p>
                <p className="weather-option-subtitle">{opt.subtitle}</p>
                <p className="weather-option-tone">{weatherVisuals[opt.id].tone}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="weather-summary-card">
          <p className="weather-kicker">Tonight&apos;s match preview</p>
          <p className="weather-summary-line">
            You: <strong>{state.youWeather ? options.find((o) => o.id === state.youWeather)?.label : "Not selected"}</strong>
            {" · "}
            Partner: <strong>{state.partnerWeather ? options.find((o) => o.id === state.partnerWeather)?.label : "Not selected"}</strong>
          </p>
          <p className="weather-summary-sub">Card-based guidance appears right after you continue.</p>
        </div>

        <button
          disabled={!canContinue}
          onClick={() => canContinue && navigate("/ritual")}
          className="w-full py-3 rounded-full bg-sp-gold text-black font-bold disabled:opacity-40 weather-continue-btn"
        >
          Show tonight&apos;s ritual
        </button>
      </div>
    </div>
  );
}
