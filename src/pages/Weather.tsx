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
  const logoSrc = `${import.meta.env.BASE_URL}sacred-path-mark.png`;

  const setWeather = (field: "youWeather" | "partnerWeather", value: IntimacyWeather) => {
    setState({ ...state, [field]: value });
  };

  const canContinue = state.youWeather && state.partnerWeather;

  return (
    <div className="min-h-screen bg-sp-bg text-slate-100 px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-6">
        <CoupleTopbar />
        <div className="weather-headline-strip">
          <p className="weather-kicker">Intimacy weather</p>
          <h2 className="screen-title text-amber-100">Choose your energy tonight.</h2>
          <p className="screen-body">Presence on one side. Radiance on the other.</p>
        </div>

        <section className="weather-polarity-grid">
          <div className="weather-polarity-side weather-polarity-left">
            <div className="weather-side-head">
              <p className="weather-side-kicker">Shiva side</p>
              <h3 className="weather-side-title">Grounded presence</h3>
              <p className="weather-side-sub">You choose first</p>
            </div>
            <div className="weather-card-stack weather-card-stack-left">
              {options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setWeather("youWeather", opt.id)}
                  className={`weather-polarity-card weather-polarity-card-left ${opt.toneClass} ${state.youWeather === opt.id ? "weather-polarity-card-active" : ""}`}
                >
                  <span className="weather-card-icon">{opt.icon}</span>
                  <span className="weather-card-label">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="weather-center-anchor">
            <div className="weather-center-icon-wrap">
              <img src={logoSrc} alt="Sacred Path" className="weather-center-icon" />
            </div>
            <p className="weather-kicker">Sacred Path</p>
            <h3 className="weather-center-title">Two energies. One shared path.</h3>
            <p className="weather-center-sub">Choose your weather. Meet in the middle.</p>

            <div className="weather-summary-card">
              <p className="weather-kicker">Tonight&apos;s mood</p>
              <p className="weather-summary-line">
                You: <strong>{state.youWeather ? options.find((o) => o.id === state.youWeather)?.label : "Not selected"}</strong>
                {" · "}
                Partner: <strong>{state.partnerWeather ? options.find((o) => o.id === state.partnerWeather)?.label : "Not selected"}</strong>
              </p>
              <p className="weather-summary-sub">Your weather creates tonight&apos;s path.</p>
            </div>

            <button
              disabled={!canContinue}
              onClick={() => canContinue && navigate("/ritual")}
              className="w-full py-3 rounded-full bg-sp-gold text-black font-bold disabled:opacity-40 weather-continue-btn"
            >
              Show tonight&apos;s ritual
            </button>
          </div>

          <div className="weather-polarity-side weather-polarity-right">
            <div className="weather-side-head">
              <p className="weather-side-kicker">Shakti side</p>
              <h3 className="weather-side-title">Flowing radiance</h3>
              <p className="weather-side-sub">Partner chooses next</p>
            </div>
            <div className="weather-card-stack weather-card-stack-right">
              {options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setWeather("partnerWeather", opt.id)}
                  className={`weather-polarity-card weather-polarity-card-right ${opt.toneClass} ${state.partnerWeather === opt.id ? "weather-polarity-card-active" : ""}`}
                >
                  <span className="weather-card-icon">{opt.icon}</span>
                  <span className="weather-card-label">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
