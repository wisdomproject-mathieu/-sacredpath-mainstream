import { Link, useNavigate } from "react-router-dom";
import CoupleTopbar from "../components/CoupleTopbar";
import { useSession } from "../contexts/SessionContext";
import { resolveWeatherRitual } from "../lib/ritualRegistry";
import {
  WEATHER_TONE_COPY,
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

function formatCompletedAt(iso?: string) {
  if (!iso) return "Just now";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "Just now";
  return date.toLocaleString([], {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

const featureCards = [
  {
    title: "115 rituals",
    description: "Unlock a larger sacred library for different moods, needs, and phases of the relationship.",
  },
  {
    title: "Sacred Voice",
    description: "Guided sessions with a softer pace, spoken cues, and an anchored delivery for both partners.",
  },
  {
    title: "Oracle wisdom",
    description: "Receive symbolic prompts and reflection cards that help you sense what tonight is asking of you.",
  },
  {
    title: "Journey together",
    description: "Move through selected experiences as a shared path instead of two separate tracks.",
  },
  {
    title: "Altar memory",
    description: "Save the moments that mattered so your relationship keeps a living record of growth.",
  },
  {
    title: "Sacred repair",
    description: "Return to gentle guidance when conflict, distance, or tension needs a softer entry point.",
  },
] as const;

export default function RitualSaved() {
  const { state } = useSession();
  const navigate = useNavigate();

  if (!state.youWeather || !state.partnerWeather) {
    return (
      <div className="min-h-screen bg-sp-bg text-slate-100 flex items-center justify-center px-6">
        <p>No saved ritual available yet.</p>
      </div>
    );
  }

  const result = resolveWeatherRitual(state.youWeather, state.partnerWeather);
  const ritual = result?.freeRitual;
  const youTone = state.youWeatherTone ?? fallbackTone(state.youWeather);
  const partnerTone = state.partnerWeatherTone ?? fallbackTone(state.partnerWeather);
  const saved = state.savedRitual;
  const elapsed = saved ? formatElapsed(saved.elapsedSeconds) : "00:00";
  const completedAt = formatCompletedAt(saved?.completedAt);
  const heroTitle = ritual?.title ?? "Tonight's ritual";
  const heroDescription = ritual?.description ?? "A shared practice for presence, touch, and repair.";
  const heroSteps = ritual?.ritualSteps.slice(0, 2) ?? [];

  return (
    <main className="ritual-saved-page">
      <div className="ritual-saved-shell">
        <CoupleTopbar />

        <header className="ritual-saved-header">
          <p className="ritual-saved-kicker">Ritual saved</p>
          <h1>Your shared memory is now held.</h1>
          <p>
            Completed in <strong>{elapsed}</strong>. Saved on <strong>{completedAt}</strong>.
          </p>
        </header>

        <section className="ritual-saved-hero">
          <div className="ritual-saved-mini-ritual">
            <div className="ritual-saved-mini-media">
              <div className="ritual-saved-mini-side">
                <img src={getWeatherImageUrlByTone("shiva", youTone)} alt={`${WEATHER_TONE_LABELS[youTone]} Shiva`} />
              </div>
              <div className="ritual-saved-mini-core">
                <span className="ritual-saved-mini-pill">Original ritual</span>
                <h2>{heroTitle}</h2>
                <p>{heroDescription}</p>
                {heroSteps.length > 0 ? (
                  <ol>
                    {heroSteps.map((step, index) => (
                      <li key={step}>
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <p>{step}</p>
                      </li>
                    ))}
                  </ol>
                ) : null}
              </div>
              <div className="ritual-saved-mini-side">
                <img src={getWeatherImageUrlByTone("shakti", partnerTone)} alt={`${WEATHER_TONE_LABELS[partnerTone]} Shakti`} />
              </div>
            </div>
          </div>

          <div className="ritual-saved-summary">
            <article className="ritual-saved-summary-card">
              <p>Completed ritual</p>
              <h3>{elapsed}</h3>
              <span>{completedAt}</span>
            </article>
            <article className="ritual-saved-summary-card">
              <p>Weather pair</p>
              <h3>{WEATHER_TONE_LABELS[youTone]} + {WEATHER_TONE_LABELS[partnerTone]}</h3>
              <span>{WEATHER_TONE_COPY[youTone]}</span>
            </article>
          </div>
        </section>

        <section className="ritual-saved-features">
          {featureCards.map((feature) => (
            <article key={feature.title} className="ritual-saved-feature-card">
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </section>

        <footer className="ritual-saved-actions">
          <button type="button" className="ritual-saved-close" onClick={() => navigate("/ritual")}>
            Close
          </button>
          <Link to="/paywall" className="ritual-saved-premium">
            Explore premium
          </Link>
        </footer>
      </div>
    </main>
  );
}
