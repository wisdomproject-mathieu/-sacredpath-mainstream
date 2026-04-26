import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSession } from "../contexts/SessionContext";
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

function formatElapsed(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export default function Ritual() {
  const { state, setState } = useSession();
  const navigate = useNavigate();
  const [timerOpen, setTimerOpen] = useState(false);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    if (!state.youWeather || !state.partnerWeather) navigate("/weather");
  }, [state.youWeather, state.partnerWeather, navigate]);

  useEffect(() => {
    if (!timerOpen || startedAt === null) return undefined;
    const interval = window.setInterval(() => {
      setElapsedSeconds(Math.max(0, Math.floor((Date.now() - startedAt) / 1000)));
    }, 1000);
    return () => window.clearInterval(interval);
  }, [timerOpen, startedAt]);

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
  const ritualSteps = freeRitual.ritualSteps.slice(0, 3);
  const ritualDuration = useMemo(() => formatElapsed(elapsedSeconds), [elapsedSeconds]);

  const openTimer = () => {
    setStartedAt(Date.now());
    setElapsedSeconds(0);
    setTimerOpen(true);
  };

  const closeTimer = () => {
    setTimerOpen(false);
    setStartedAt(null);
    setElapsedSeconds(0);
  };

  const saveTimer = () => {
    setState({
      ...state,
      savedRitual: {
        completedAt: new Date().toISOString(),
        elapsedSeconds,
      },
    });
    setTimerOpen(false);
    setStartedAt(null);
    navigate("/ritual/saved");
  };

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
              <button className="ritual-v2-practice-btn ritual-v2-practice-btn-sm" onClick={openTimer}>
                Timer
              </button>
            </div>

            <div className="ritual-v2-actions mt-auto">
              <Link to="/deeper" className="ritual-v2-action-primary ritual-v2-action-primary-sm">
                Go deeper,
              </Link>
              <Link to="/paywall" className="ritual-v2-action-secondary">
                See premium for both of you
              </Link>
            </div>
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

      {timerOpen ? (
        <div className="ritual-timer-overlay" role="dialog" aria-modal="true" aria-label="Ritual timer">
          <div className="ritual-timer-modal">
            <div className="ritual-timer-head">
              <div className="ritual-timer-mark" aria-hidden="true">
                <img src={`${import.meta.env.BASE_URL}shiva-shakti-icon.png`} alt="" />
              </div>
              <div className="ritual-timer-copy">
                <p className="ritual-timer-kicker">Ritual in progress</p>
                <h2>{freeRitual.title}</h2>
                <p>{`${youTitle} + ${partnerTitle}`}</p>
              </div>
            </div>

            <div className="ritual-timer-ring">
              <span>{ritualDuration}</span>
              <small>Completed in</small>
            </div>

            <div className="ritual-timer-actions">
              <button type="button" className="ritual-timer-close" onClick={closeTimer}>
                Close
              </button>
              <button type="button" className="ritual-timer-save" onClick={saveTimer}>
                Save
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
