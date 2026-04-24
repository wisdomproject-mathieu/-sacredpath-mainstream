import { useNavigate } from "react-router-dom";
import CoupleTopbar from "../components/CoupleTopbar";
import { useSession } from "../contexts/SessionContext";
import type { IntimacyWeather } from "../lib/ritualRegistry";

const options: { id: IntimacyWeather; label: string; icon: string }[] = [
  { id: "stormy", label: "Need Gentle Repair", icon: "⛈" },
  { id: "cloudy", label: "Hold Me Close", icon: "☁" },
  { id: "warm", label: "Open To Love", icon: "☀" },
  { id: "electric", label: "I Want You", icon: "⚡" },
  { id: "radiant", label: "Ready For Us", icon: "🌕" },
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
      <div className="max-w-3xl mx-auto space-y-5">
        <CoupleTopbar />
        <div className="weather-headline-strip">
          <p className="weather-kicker">Intimacy weather</p>
          <h2 className="screen-title text-amber-100">Choose how you arrive tonight.</h2>
          <p className="screen-body">One tap each. The app finds the ritual that fits the mood between you.</p>
        </div>

        <div className="space-y-3 weather-section">
          <p className="text-xs uppercase tracking-wide text-amber-200/90">You</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setWeather("youWeather", opt.id)}
                className={`weather-door-card ${state.youWeather === opt.id ? "weather-door-card-active" : ""}`}
              >
                <span className="weather-door-bg-icon">{opt.icon}</span>
                <div className="weather-door-content">
                  <p className="weather-door-label">{opt.label}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3 weather-section">
          <p className="text-xs uppercase tracking-wide text-amber-200/90">Partner</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setWeather("partnerWeather", opt.id)}
                className={`weather-door-card ${state.partnerWeather === opt.id ? "weather-door-card-active" : ""}`}
              >
                <span className="weather-door-bg-icon">{opt.icon}</span>
                <div className="weather-door-content">
                  <p className="weather-door-label">{opt.label}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="weather-summary-card">
          <p className="weather-kicker">Tonight&apos;s mood</p>
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
