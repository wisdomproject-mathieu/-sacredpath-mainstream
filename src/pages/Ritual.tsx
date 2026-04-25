import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSession } from "../contexts/SessionContext";
import { resolveWeatherRitual } from "../lib/ritualRegistry";
import {
  WEATHER_TONE_LABELS,
  WEATHER_TONE_COPY,
  getWeatherImageUrlByTone,
  type WeatherVisualKey,
} from "../lib/weatherAssets";

function shortTag(name: string | undefined, fallback: string) {
  const value = name?.trim();
  if (!value) return fallback;
  return value.split(/\s+/)[0].slice(0, 3).toUpperCase();
}

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
  const logoSrc = `${import.meta.env.BASE_URL}shiva-shakti-icon.png`;

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
  const originTraditions = freeRitual.sourceTraditions?.slice(0, 3) ?? [];
  const originAuthors = freeRitual.sourceAuthors?.slice(0, 3) ?? [];
  const originConcepts = freeRitual.sourceConcepts?.slice(0, 4) ?? [];
  const youTag = shortTag(state.youName, "MAT");
  const partnerTag = shortTag(state.partnerName, "ED");
  const youTone = state.youWeatherTone ?? fallbackTone(state.youWeather);
  const partnerTone = state.partnerWeatherTone ?? fallbackTone(state.partnerWeather);
  const youTitle = WEATHER_TONE_LABELS[youTone];
  const partnerTitle = WEATHER_TONE_LABELS[partnerTone];
  const ritualSteps = freeRitual.ritualSteps.slice(0, 3);

  return (
    <main className="min-h-screen bg-sp-bg text-slate-100 ritual-v2-page">
      <div className="ritual-v2-shell">
        <header className="ritual-v2-header">
          <h1 className="ritual-v2-title">Sacred Rituals for Coupled Presence</h1>
          <p className="ritual-v2-subtitle">
            Explore practices to cultivate deeper connection, flow, and energetic awareness.
          </p>
        </header>

        <section className="ritual-v2-grid">
          <aside className="ritual-v2-side ritual-v2-side-left">
            <div className="ritual-v2-side-chip">{youTag}</div>
            <div className="ritual-v2-image-card ritual-v2-image-card-left">
              <img src={getWeatherImageUrlByTone("shiva", youTone)} alt={`${youTitle} Shiva`} />
              <div className="ritual-v2-image-caption">{`${youTitle} Shiva`}</div>
            </div>
            <div className="ritual-v2-state-card">
              <h2>{`${youTitle} Shiva`} ({youTag})</h2>
              <p>{WEATHER_TONE_COPY[youTone]}</p>
            </div>
            <div className="ritual-v2-side-footer">
              <span className="ritual-v2-footer-icon" aria-hidden="true">🧘</span>
              <div>
                <p>Active</p>
                <span>{youTitle}</span>
              </div>
              <span className="ritual-v2-footer-ready" aria-hidden="true">☉</span>
            </div>
          </aside>

          <section className="ritual-v2-center">
            <button
              type="button"
              onClick={() => navigate("/weather")}
              className="ritual-v2-swap-pill"
            >
              Swap Shiva ↔ Shakti
            </button>

            <div className="ritual-v2-practice-card ritual-v2-practice-card-hero">
              <p className="ritual-v2-practice-kicker">Yoga of Touch</p>
              <div className="ritual-v2-practice-image">
                <img src={logoSrc} alt="Sacred Path" />
              </div>
              <h3>Yoga of Touch</h3>
              <p className="ritual-v2-practice-copy">{freeRitual.description}</p>
              <button className="ritual-v2-practice-btn" onClick={() => navigate("/deeper")}>
                Begin Embrace
              </button>
            </div>

            <div className="ritual-v2-step-card">
              <div className="ritual-v2-step-card-head">
                <p className="ritual-v2-practice-kicker">Straight steps</p>
                <h3>Yoga of Touch process</h3>
              </div>
              <div className="ritual-v2-step-list">
                {ritualSteps.length > 0 ? ritualSteps.map((step, index) => (
                  <div key={step} className="ritual-v2-step-item">
                    <span className="ritual-v2-step-index">{String(index + 1).padStart(2, "0")}</span>
                    <p>{step}</p>
                  </div>
                )) : (
                  <div className="ritual-v2-step-item">
                    <span className="ritual-v2-step-index">01</span>
                    <p>Begin with presence and let the body slow down together.</p>
                  </div>
                )}
              </div>
              <button className="ritual-v2-practice-btn" onClick={() => navigate("/ritual")}>
                Begin ritual
              </button>
            </div>

            <div className="ritual-v2-origin-card">
              <p className="ritual-v2-origin-kicker">Origin of this ritual</p>
              <h3>Where this practice comes from</h3>
              <p>This ritual is adapted for modern couples from traditional intimacy teachings, focused on emotional safety and embodied connection.</p>
              {originTraditions.length > 0 ? (
                <p>
                  <strong>Traditions:</strong> {originTraditions.join(", ")}
                </p>
              ) : null}
              {originAuthors.length > 0 ? (
                <p>
                  <strong>Teachers:</strong> {originAuthors.join(", ")}
                </p>
              ) : null}
              {originConcepts.length > 0 ? (
                <p>
                  <strong>Core ideas:</strong> {originConcepts.join(", ")}
                </p>
              ) : null}
            </div>

            <div className="ritual-v2-actions">
              <Link to="/deeper" className="ritual-v2-action-primary">
                Go deeper tonight
              </Link>
              <Link to="/paywall" className="ritual-v2-action-secondary">
                See premium for both of you
              </Link>
            </div>
          </section>

          <aside className="ritual-v2-side ritual-v2-side-right">
            <div className="ritual-v2-side-chip">{partnerTag}</div>
            <div className="ritual-v2-image-card ritual-v2-image-card-right">
              <img src={getWeatherImageUrlByTone("shakti", partnerTone)} alt={`${partnerTitle} Shakti`} />
              <div className="ritual-v2-image-caption">{`${partnerTitle} Shakti`}</div>
            </div>
            <div className="ritual-v2-state-card">
              <h2>{`${partnerTitle} Shakti`} ({partnerTag})</h2>
              <p>{WEATHER_TONE_COPY[partnerTone]}</p>
            </div>
            <div className="ritual-v2-side-footer">
              <span className="ritual-v2-footer-icon" aria-hidden="true">🧘</span>
              <div>
                <p>Active</p>
                <span>{partnerTitle}</span>
              </div>
              <span className="ritual-v2-footer-ready" aria-hidden="true">☉</span>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
