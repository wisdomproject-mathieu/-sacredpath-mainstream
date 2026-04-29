import { useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Layout from "../components/Layout";
import Card from "../components/Card";
import Button from "../components/Button";
import BackButton from "../components/BackButton";
import SubscribeButton from "../components/SubscribeButton";
import { useSession } from "../contexts/SessionContext";
import { getTonightPath } from "../lib/tonightPath";
import { getRitualById as getCanonicalRitualById } from "../lib/ritualResolver";
import { isPremium } from "../lib/premium";
import {
  WEATHER_TONE_LABELS,
  WEATHER_TONE_COPY,
  getWeatherImageUrlByTone,
  type WeatherVisualKey,
} from "../lib/weatherAssets";

function fallbackTone(weather: string | undefined): WeatherVisualKey {
  if (weather === "stormy") return "stormy";
  if (weather === "foggy" || weather === "cloudy") return "foggy";
  if (weather === "frozen") return "frozen";
  if (weather === "warm") return "warm";
  if (weather === "electric") return "electric";
  return "sunny";
}

export default function Ritual() {
  const { state } = useSession();
  const navigate = useNavigate();
  const [search] = useSearchParams();
  const hasPremium = isPremium();

  useEffect(() => {
    if (!state.youWeather || !state.partnerWeather) navigate("/weather");
  }, [state.youWeather, state.partnerWeather, navigate]);

  if (!state.youWeather || !state.partnerWeather) return null;

  const result = getTonightPath(state.youWeather, state.partnerWeather);
  if (!result || !result.freeRitual) {
    return (
      <Layout>
        <div className="max-w-lg mx-auto text-center">
          <p className="text-muted">No ritual found. Try a different combination.</p>
          <Button variant="secondary" onClick={() => navigate("/weather")} className="mt-4">
            Back to weather selection
          </Button>
        </div>
      </Layout>
    );
  }

  const { freeRitual } = result;
  const overrideRitual = search.get("ritualId") ? getCanonicalRitualById(search.get("ritualId") as string) : null;
  const ritualTitle = overrideRitual?.title ?? freeRitual.title;
  const ritualStepsSource = overrideRitual?.steps ?? freeRitual.ritualSteps;
  const youTone = state.youWeatherTone ?? fallbackTone(state.youWeather);
  const partnerTone = state.partnerWeatherTone ?? fallbackTone(state.partnerWeather);
  const youName = state.youName?.trim() || "You";
  const partnerName = state.partnerName?.trim() || "Partner";
  const youTitle = `${WEATHER_TONE_LABELS[youTone]} ${youName}`;
  const partnerTitle = `${WEATHER_TONE_LABELS[partnerTone]} ${partnerName}`;
  const ritualSteps = ritualStepsSource.slice(0, 3);
  const weatherPairLabel = `${WEATHER_TONE_LABELS[youTone]} + ${WEATHER_TONE_LABELS[partnerTone]}`;

  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-5 md:space-y-7">
        <BackButton fallbackPath="/" />
        <div className="text-center">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl mb-2">Sacred Rituals for Coupled Presence</h1>
          <p className="text-sm sm:text-base text-muted">
            Tonight&apos;s shared path based on your two weather choices.
          </p>
          <p className="text-xs uppercase tracking-[0.18em] text-accent mt-3">{weatherPairLabel}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 md:gap-5">
          <Card className="p-3 md:p-4">
            <img
              src={getWeatherImageUrlByTone("me", youTone)}
              alt={youTitle}
              className="w-full aspect-[3/4] object-cover rounded-xl border border-white/10"
            />
            <h2 className="font-serif text-base sm:text-lg mt-3 text-center">{youTitle}</h2>
            <p className="text-xs sm:text-sm text-muted text-center mt-1">{WEATHER_TONE_COPY[youTone]}</p>
          </Card>

          <Card className="p-3 md:p-4">
            <img
              src={getWeatherImageUrlByTone("partner", partnerTone)}
              alt={partnerTitle}
              className="w-full aspect-[3/4] object-cover rounded-xl border border-white/10"
            />
            <h2 className="font-serif text-base sm:text-lg mt-3 text-center">{partnerTitle}</h2>
            <p className="text-xs sm:text-sm text-muted text-center mt-1">{WEATHER_TONE_COPY[partnerTone]}</p>
          </Card>
        </div>

        <Card>
          <p className="text-[11px] uppercase tracking-[0.2em] text-accent mb-2">Ritual in 3 steps</p>
          <h3 className="font-serif text-2xl mb-4">{ritualTitle}</h3>
          <div className="space-y-3">
            {ritualSteps.map((step, index) => (
              <div key={index} className="flex gap-3 items-start">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 text-accent text-sm flex items-center justify-center font-medium">
                  {index + 1}
                </span>
                <p className="text-sm sm:text-base leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="space-y-4">
          <Button variant="secondary" onClick={() => navigate("/deeper")}>
            Go deeper
          </Button>
          <Link
            to={`/voice?ritualId=${encodeURIComponent(overrideRitual?.id ?? freeRitual.id)}`}
            className="block w-full rounded-full bg-white/5 border border-white/10 text-center py-3 px-6 font-semibold hover:bg-white/10 transition-colors"
          >
            Play with Sacred Voice
          </Link>
          <p className="text-sm sm:text-base text-muted leading-relaxed">
            Slow down, breathe together, and reconnect with intention.
            Presence over performance creates deeper trust, safety, and closeness in your shared path.
          </p>
          {!hasPremium ? <SubscribeButton source="ritual" mode="navigate" /> : <p className="text-sm text-muted">Premium active for both of you.</p>}
          <Link
            to="/rituals"
            className="block w-full rounded-full bg-white/5 border border-white/10 text-center py-3 px-6 font-semibold hover:bg-white/10 transition-colors"
          >
            More rituals for two
          </Link>
        </Card>
      </div>
    </Layout>
  );
}
