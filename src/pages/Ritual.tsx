import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSession } from "../contexts/SessionContext";
import CoupleTopbar from "../components/CoupleTopbar";
import { resolveWeatherRitual } from "../lib/ritualRegistry";
import {
  WEATHER_TONE_LABELS,
  getWeatherImageUrlByTone,
  type WeatherVisualKey,
} from "../lib/weatherAssets";

function fallbackTone(weather: string | undefined): WeatherVisualKey {
  if (weather === "stormy") return "stormy";
  if (weather === "cloudy") return "foggy";
  if (weather === "warm") return "warm";
  if (weather === "electric") return "electric";
  return "sunny";
}

export default function Ritual() {
  const { state } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state.youWeather || !state.partnerWeather) navigate("/weather");
  }, [state.youWeather, state.partnerWeather, navigate]);

  if (!state.youWeather || !state.partnerWeather) return null;

  const result = resolveWeatherRitual(state.youWeather, state.partnerWeather);
  if (!result || !result.freeRitual) {
    return (
      <div className="min-h-screen bg-sp-bg text-slate-100 flex items-center justify-center px-6">
        <p>No ritual found. Try a different combination.</p>
      </div>
    );
  }

  const { freeRitual } = result;
  const youTone = state.youWeatherTone ?? fallbackTone(state.youWeather);
  const partnerTone = state.partnerWeatherTone ?? fallbackTone(state.partnerWeather);
  const youName = state.youName?.trim() || "You";
  const partnerName = state.partnerName?.trim() || "Partner";
  const youTitle = `${WEATHER_TONE_LABELS[youTone]} ${youName}`;
  const partnerTitle = `${WEATHER_TONE_LABELS[partnerTone]} ${partnerName}`;

  return (
    <main className="min-h-screen bg-sp-bg text-slate-100 ritual-v2-page">
      <div className="ritual-v2-shell">
        <header className="ritual-v2-header ritual-v2-header-split">
          <div className="ritual-v2-header-brand">
            <CoupleTopbar />
          </div>
          <div className="ritual-v2-header-copy">
            <h1 className="ritual-v2-title">Sacred Rituals for Coupled Presence</h1>
            <p className="ritual-v2-subtitle">
              Explore practices to cultivate deeper connection, flow, and energetic awareness.
            </p>
          </div>
        </header>

        <section className="ritual-v2-grid">
          <aside className="ritual-v2-side ritual-v2-side-left">
            <div className="ritual-v2-image-card ritual-v2-image-card-left">
              <img src={getWeatherImageUrlByTone("shiva", youTone)} alt={youTitle} />
            </div>
            <div className="ritual-v2-state-card">
              <h2>{youTitle}</h2>
            </div>
          </aside>

          <section className="ritual-v2-center">
            <button type="button" onClick={() => navigate("/weather")} className="ritual-v2-swap-pill">
              Swap Shiva ↔ Shakti
            </button>

            <Link to="/deeper" className="ritual-v2-action-primary ritual-v2-sacred-cta">
              SACRED RITUALS FOR COUPLED PRESENCE
            </Link>

            <div className="ritual-v2-guidance-card">
              <p className="ritual-v2-guidance-copy">
                The secret to these rituals isn&apos;t &quot;doing them perfectly.&quot; It&apos;s the intention you
                bring. If you find yourself rushing, stop, take a breath, and reset. Intimacy is a garden—water it
                daily, and watch it bloom.
              </p>
            </div>

            <Link to="/paywall" className="ritual-v2-action-secondary">
              See premium for both of you
            </Link>
          </section>

          <aside className="ritual-v2-side ritual-v2-side-right">
            <div className="ritual-v2-image-card ritual-v2-image-card-right">
              <img src={getWeatherImageUrlByTone("shakti", partnerTone)} alt={partnerTitle} />
            </div>
            <div className="ritual-v2-state-card">
              <h2>{partnerTitle}</h2>
            </div>
          </aside>
        </section>
      </div>

    </main>
  );
}
