import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSession } from "../contexts/SessionContext";
import { resolveWeatherRitual } from "../lib/ritualRegistry";

const PREVIEW_PREMIUM_UNLOCKED = false;

const weatherLabels: Record<string, { title: string; subtitle: string }> = {
  stormy: { title: "Stormy", subtitle: "Tense, charged, or carrying something unspoken." },
  cloudy: { title: "Cloudy", subtitle: "Unclear, drifting, and not quite settled." },
  warm: { title: "Warm", subtitle: "Soft, tender, and wanting closeness." },
  electric: { title: "Electric", subtitle: "Crackling, awake, and drawn to one another." },
  radiant: { title: "Sunny", subtitle: "Clear, light, and easy with each other today." },
};

function weatherTag(weather: string | undefined) {
  if (!weather) return "Unknown";
  return weatherLabels[weather]?.title ?? weather;
}

function weatherCopy(weather: string | undefined) {
  if (!weather) return "Not yet set.";
  return weatherLabels[weather]?.subtitle ?? "A shared weather state.";
}

function shortTag(name: string | undefined, fallback: string) {
  const value = name?.trim();
  if (!value) return fallback;
  return value.split(/\s+/)[0].slice(0, 3).toUpperCase();
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

  const { freeRitual, premiumRituals } = result;
  const firstStep = freeRitual.ritualSteps[0];
  const secondStep = freeRitual.ritualSteps[1];
  const originTraditions = freeRitual.sourceTraditions?.slice(0, 3) ?? [];
  const originAuthors = freeRitual.sourceAuthors?.slice(0, 3) ?? [];
  const originConcepts = freeRitual.sourceConcepts?.slice(0, 4) ?? [];
  const previewRitual = premiumRituals[0];
  const youTag = shortTag(state.youName, "MAT");
  const partnerTag = shortTag(state.partnerName, "ED");

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
              <img src={`${import.meta.env.BASE_URL}weather-shiva-side.png`} alt="Shiva" />
            </div>
            <div className="ritual-v2-state-card">
              <h2>My Current State ({youTag})</h2>
              <p>{weatherCopy(state.youWeather)}</p>
            </div>
            <div className="ritual-v2-side-footer">
              <span className="ritual-v2-footer-icon" aria-hidden="true">🧘</span>
              <div>
                <p>Active</p>
                <span>{weatherTag(state.youWeather)}</span>
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
              <p className="ritual-v2-practice-kicker">Explore Tantric Practices</p>
              <div className="ritual-v2-practice-image">
                <img src={logoSrc} alt="Sacred Path" />
              </div>
              <h3>{freeRitual.title}</h3>
              <p className="ritual-v2-practice-copy">{freeRitual.description}</p>
              <button className="ritual-v2-practice-btn" onClick={() => navigate("/deeper")}>
                Begin Embrace
              </button>
            </div>

            <div className="ritual-v2-practice-card">
              <div className="ritual-v2-mini-visual ritual-v2-mini-eyes" />
              <h3>The Divine Embrace</h3>
              <p className="ritual-v2-practice-copy">
                A shared stillness honoring polarity, contact, and emotional safety.
              </p>
              <button className="ritual-v2-practice-btn" onClick={() => navigate("/ritual")}>
                {firstStep || "Begin ritual"}
              </button>
            </div>

            <div className="ritual-v2-practice-card">
              <div className="ritual-v2-mini-visual ritual-v2-mini-breath" />
              <h3>Synchronized Breath</h3>
              <p className="ritual-v2-practice-copy">
                {previewRitual?.description || secondStep || "Harmonize your breath to fuse energy fields."}
              </p>
              <button
                className="ritual-v2-practice-btn"
                onClick={() => navigate(PREVIEW_PREMIUM_UNLOCKED ? "/deeper" : "/paywall")}
              >
                {PREVIEW_PREMIUM_UNLOCKED ? "Continue" : "View premium path"}
              </button>
            </div>

            <div className="ritual-v2-origin-card">
              <p className="ritual-v2-origin-kicker">Origin of this ritual</p>
              <h3>Where this practice comes from</h3>
              <p>
                This ritual is adapted for modern couples from traditional intimacy teachings, focused on emotional safety and embodied connection.
              </p>
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
              <img src={`${import.meta.env.BASE_URL}weather-shakti-side.png`} alt="Shakti" />
            </div>
            <div className="ritual-v2-state-card">
              <h2>My Current State ({partnerTag})</h2>
              <p>{weatherCopy(state.partnerWeather)}</p>
            </div>
            <div className="ritual-v2-side-footer">
              <span className="ritual-v2-footer-icon" aria-hidden="true">🧘</span>
              <div>
                <p>Active</p>
                <span>{weatherTag(state.partnerWeather)}</span>
              </div>
              <span className="ritual-v2-footer-ready" aria-hidden="true">☉</span>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
