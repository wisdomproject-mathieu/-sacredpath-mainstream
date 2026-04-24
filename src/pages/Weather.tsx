import { useNavigate } from "react-router-dom";
import CoupleTopbar from "../components/CoupleTopbar";
import { useSession } from "../contexts/SessionContext";
import type { IntimacyWeather } from "../lib/ritualRegistry";

const options: { id: IntimacyWeather; label: string; icon: string; toneClass: string }[] = [
  { id: "stormy", label: "Need Repair", icon: "⛈", toneClass: "weather-tone-stormy" },
  { id: "cloudy", label: "Need Tenderness", icon: "☁", toneClass: "weather-tone-cloudy" },
  { id: "warm", label: "Open Heart", icon: "☀", toneClass: "weather-tone-warm" },
  { id: "electric", label: "Want You", icon: "⚡", toneClass: "weather-tone-electric" },
  { id: "radiant", label: "Deeply Connected", icon: "🌕", toneClass: "weather-tone-radiant" },
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
          <h2 className="screen-title text-amber-100">Meet each other here tonight.</h2>
          <p className="screen-body">Choose the mood. Follow the path.</p>
        </div>

        <div className="space-y-3 weather-section">
          <p className="weather-section-title">You</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setWeather("youWeather", opt.id)}
                className={`weather-door-card ${opt.toneClass} ${state.youWeather === opt.id ? "weather-door-card-active" : ""}`}
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
          <p className="weather-section-title">Partner</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setWeather("partnerWeather", opt.id)}
                className={`weather-door-card ${opt.toneClass} ${state.partnerWeather === opt.id ? "weather-door-card-active" : ""}`}
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
          <p className="weather-summary-sub">A softer beginning opens deeper connection.</p>
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
