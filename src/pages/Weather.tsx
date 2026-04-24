import { useNavigate } from "react-router-dom";
import CoupleTopbar from "../components/CoupleTopbar";
import { useSession } from "../contexts/SessionContext";
import type { IntimacyWeather } from "../lib/ritualRegistry";

const options: { id: IntimacyWeather; label: string; icon: string; toneClass: string }[] = [
  { id: "stormy", label: "Need Repair", icon: "⛈", toneClass: "weather-tone-stormy" },
  { id: "cloudy", label: "Need Tenderness", icon: "☁", toneClass: "weather-tone-cloudy" },
  { id: "warm", label: "Open Heart", icon: "☀", toneClass: "weather-tone-warm" },
  { id: "electric", label: "Magnetic Desire", icon: "⚡", toneClass: "weather-tone-electric" },
  { id: "radiant", label: "Deeply Connected", icon: "🌕", toneClass: "weather-tone-radiant" },
];

const leftOrbits = [
  "weather-v2-orbit-l0",
  "weather-v2-orbit-l1",
  "weather-v2-orbit-l2",
  "weather-v2-orbit-l3",
  "weather-v2-orbit-l4",
];

const rightOrbits = [
  "weather-v2-orbit-r0",
  "weather-v2-orbit-r1",
  "weather-v2-orbit-r2",
  "weather-v2-orbit-r3",
  "weather-v2-orbit-r4",
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
      <div className="max-w-[1320px] mx-auto space-y-7">
        <CoupleTopbar />

        <header className="weather-v2-header">
          <p className="weather-kicker">Intimacy weather</p>
          <h1 className="weather-v2-title">Intimacy Weather</h1>
          <p className="weather-v2-subtitle">
            Choose calmly. Sense honestly. Ask gently. Let your partner choose with respect.
          </p>
        </header>

        <section className="weather-v2-polarity">
          <div className="weather-v2-side weather-v2-side-left">
            <div className="weather-v2-side-head">
              <p className="weather-v2-side-kicker">Shiva</p>
              <h3 className="weather-v2-side-title">Grounded Presence</h3>
            </div>
            <div className="weather-v2-orbit-field">
              {options.map((opt, idx) => (
                <button
                  key={opt.id}
                  onClick={() => setWeather("youWeather", opt.id)}
                  className={`value-card weather-v2-card weather-v2-card-left ${opt.toneClass} ${leftOrbits[idx]} ${state.youWeather === opt.id ? "weather-v2-card-active" : ""}`}
                >
                  <span className="weather-v2-card-icon">{opt.icon}</span>
                  <p className="value-kicker">Your weather</p>
                  <h2>{opt.label}</h2>
                </button>
              ))}
            </div>
          </div>

          <div className="weather-v2-center">
            <div className="home-visual-card weather-v2-center-card">
              <div className="home-visual-glow" />
              <div className="home-visual-beam" />
              <div className="home-visual-icon-area">
                <img src={logoSrc} alt="Sacred Path" className="home-shiny-icon" />
              </div>
              <div className="home-couple-panel weather-v2-center-panel">
                <p className="panel-kicker">Two energies. One path.</p>
                <p className="panel-text">
                  Pause. Feel. Choose your truth, then welcome your partner&apos;s weather with respect.
                </p>
              </div>
            </div>

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

          <div className="weather-v2-side weather-v2-side-right">
            <div className="weather-v2-side-head">
              <p className="weather-v2-side-kicker">Shakti</p>
              <h3 className="weather-v2-side-title">Flowing Radiance</h3>
            </div>
            <div className="weather-v2-orbit-field">
              {options.map((opt, idx) => (
                <button
                  key={opt.id}
                  onClick={() => setWeather("partnerWeather", opt.id)}
                  className={`value-card weather-v2-card weather-v2-card-right ${opt.toneClass} ${rightOrbits[idx]} ${state.partnerWeather === opt.id ? "weather-v2-card-active" : ""}`}
                >
                  <span className="weather-v2-card-icon">{opt.icon}</span>
                  <p className="value-kicker">Partner weather</p>
                  <h2>{opt.label}</h2>
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
