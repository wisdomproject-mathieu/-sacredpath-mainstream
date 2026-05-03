import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import BrandHeader from "../components/BrandHeader";
import SubscribeButton from "../components/SubscribeButton";
import { useSession } from "../contexts/SessionContext";
import { getTonightPath } from "../lib/tonightPath";
import { isPremium, setPremiumForTesting } from "../lib/premium";
import type { IntimacyWeather } from "../lib/ritualRegistry";
import {
  getDisplayName,
  getWeatherImageUrlByTone,
  getWeatherImagePosition,
  getWeatherVisualKey,
  WEATHER_TONE_COPY,
  WEATHER_TONE_LABELS,
  type WeatherVisualKey,
} from "../lib/weatherAssets";

type HomeCheckinStage = "me" | "meSelected" | "partner" | "complete";

const WEATHER_OPTIONS: Array<{ id: IntimacyWeather; subtitle: string }> = [
  { id: "sunny", subtitle: "Desire, heat, hunger" },
  { id: "warm", subtitle: "Soft, tender, wanting closeness" },
  { id: "electric", subtitle: "Curious, playful, adventurous" },
  { id: "foggy", subtitle: "Unclear, distant, uncertain" },
  { id: "frozen", subtitle: "Numb, shut down, tired" },
  { id: "stormy", subtitle: "Charged, tense, friction" },
];

function SmallWeatherCard({
  role,
  tone,
  subtitle,
  selected,
  onClick,
}: {
  role: "me" | "partner";
  tone: WeatherVisualKey;
  subtitle: string;
  selected?: boolean;
  onClick: () => void;
}) {
  const image = getWeatherImageUrlByTone(role, tone);
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative overflow-hidden rounded-2xl border transition ${
        selected ? "border-accent ring-2 ring-accent/40" : "border-white/10 hover:border-white/25"
      }`}
    >
      <img
        src={image}
        alt={WEATHER_TONE_LABELS[tone]}
        className="h-28 w-full object-cover md:h-32"
        style={{ objectPosition: getWeatherImagePosition(tone) }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/28 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-2 text-left">
        <p className="text-sm font-semibold text-white">{WEATHER_TONE_LABELS[tone]}</p>
        <p className="text-[11px] leading-tight text-white/80">{subtitle}</p>
      </div>
    </button>
  );
}

export default function AppHome() {
  const { state, setState } = useSession();
  const navigate = useNavigate();
  const [hasPremium, setHasPremium] = useState(isPremium());
  const didResetRef = useRef(false);
  const showDevPremiumToggle = import.meta.env?.VITE_ENABLE_DEV_PREMIUM_TOGGLE === "true";

  const [stage, setStage] = useState<HomeCheckinStage>("me");

  useEffect(() => {
    if (didResetRef.current) return;
    didResetRef.current = true;
    setState({
      ...state,
      youWeather: undefined,
      partnerWeather: undefined,
      youWeatherTone: undefined,
      partnerWeatherTone: undefined,
    });
    setStage("me");
  }, [setState, state]);

  const myName = getDisplayName(state.youName, "Me");
  const partnerName = getDisplayName(state.partnerName, "Partner");

  const meTone = state.youWeatherTone ?? getWeatherVisualKey(state.youWeather);
  const partnerTone = state.partnerWeatherTone ?? getWeatherVisualKey(state.partnerWeather);

  const tonightPath = useMemo(
    () => getTonightPath(state.youWeather, state.partnerWeather),
    [state.youWeather, state.partnerWeather],
  );

  const selectMeWeather = (weather: IntimacyWeather) => {
    setState({
      ...state,
      youWeather: weather,
      youWeatherTone: weather,
    });
    setStage("meSelected");
  };

  const selectPartnerWeather = (weather: IntimacyWeather) => {
    setState({
      ...state,
      partnerWeather: weather,
      partnerWeatherTone: weather,
    });
    setStage("complete");
  };

  const togglePremiumMode = () => {
    const next = !hasPremium;
    setPremiumForTesting(next);
    setHasPremium(next);
  };

  return (
    <Layout showHeader={false}>
      <div className="mx-auto max-w-6xl space-y-6 md:space-y-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
          <BrandHeader className="md:mb-0" />
        </div>

        <header className="space-y-3 text-center">
          <h1 className="font-serif text-4xl leading-[1.02] sm:text-5xl md:text-6xl">
            Understand the mood
            <br />
            between you in seconds.
          </h1>
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-muted md:text-lg">
            Choose your intimacy weather, receive one practice for tonight, and reconnect without pressure.
          </p>
        </header>

        <section className="grid gap-3 md:grid-cols-3">
          <button
            type="button"
            onClick={() => navigate("/weather")}
            className="rounded-2xl border border-white/10 bg-card p-4 text-left transition hover:bg-white/10"
          >
            <p className="font-serif text-2xl">Check our weather</p>
            <p className="mt-1 text-sm text-muted">Match a ritual to how you both feel.</p>
          </button>
          <button
            type="button"
            onClick={() => navigate("/oracle")}
            className="rounded-2xl border border-white/10 bg-card p-4 text-left transition hover:bg-white/10"
          >
            <p className="font-serif text-2xl">Ask the Intimacy Oracle</p>
            <p className="mt-1 text-sm text-muted">Choose what you need tonight and get a guided ritual.</p>
          </button>
          <button
            type="button"
            onClick={() => navigate("/rituals")}
            className="rounded-2xl border border-white/10 bg-card p-4 text-left transition hover:bg-white/10"
          >
            <p className="font-serif text-2xl">Browse rituals</p>
            <p className="mt-1 text-sm text-muted">Explore the library by time, mood, and focus.</p>
          </button>
        </section>

        {showDevPremiumToggle ? (
          <section className="rounded-2xl border border-white/10 bg-card p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-accent">Testing mode</p>
            <p className="mt-1 text-sm text-muted">
              Current access: <span className="font-semibold text-text">{hasPremium ? "Premium" : "Free"}</span>
            </p>
            <button
              type="button"
              onClick={togglePremiumMode}
              className="mt-3 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold hover:bg-white/10"
            >
              Switch to {hasPremium ? "Free" : "Premium"}
            </button>
          </section>
        ) : null}

        <section className="rounded-[22px] border border-white/10 bg-card p-4 md:p-5">
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="space-y-2">
              <input
                value={state.youName ?? ""}
                onChange={(e) => setState({ ...state, youName: e.target.value })}
                aria-label="Your name"
                placeholder="Me"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-text outline-none transition focus:border-accent/60"
              />
            </label>
            <label className="space-y-2">
              <input
                value={state.partnerName ?? ""}
                onChange={(e) => setState({ ...state, partnerName: e.target.value })}
                aria-label="Partner name"
                placeholder="Partner"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-text outline-none transition focus:border-accent/60"
              />
            </label>
          </div>
        </section>

        {stage === "me" ? (
          <section className="space-y-4">
            <div className="space-y-2 text-center">
              <h2 className="font-serif text-3xl md:text-4xl">How are you arriving today?</h2>
              <p className="mx-auto max-w-2xl text-muted">
                Choose the weather that best describes your body and mood right now.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {WEATHER_OPTIONS.map((option) => (
                <SmallWeatherCard
                  key={`me-${option.id}`}
                  role="me"
                  tone={option.id}
                  subtitle={option.subtitle}
                  onClick={() => selectMeWeather(option.id)}
                />
              ))}
            </div>
          </section>
        ) : null}

        {stage === "meSelected" ? (
          <section className="space-y-4">
            <div className="mx-auto max-w-2xl overflow-hidden rounded-[28px] border border-accent/40 bg-card">
              <img
                src={getWeatherImageUrlByTone("me", meTone)}
                alt={`Me ${WEATHER_TONE_LABELS[meTone]}`}
                className="h-[340px] w-full bg-[#151126] object-contain p-2 md:h-[420px]"
              />
            </div>
            <div className="mx-auto flex max-w-2xl flex-col gap-3">
              <button
                type="button"
                onClick={() => setStage("partner")}
                className="w-full rounded-full bg-gradient-to-br from-[#e6b980] to-[#eacda3] px-6 py-3.5 font-semibold text-[#130f08] transition-opacity hover:opacity-90"
              >
                Now, sense your beloved partner&apos;s weather
              </button>
              <button
                type="button"
                onClick={() => setStage("me")}
                className="text-sm text-muted hover:text-text"
              >
                Change my weather
              </button>
            </div>
          </section>
        ) : null}

        {stage === "partner" ? (
          <section className="space-y-4">
            <div className="space-y-2 text-center">
              <h2 className="font-serif text-3xl md:text-4xl">Now sense your beloved partner&apos;s weather</h2>
              <p className="mx-auto max-w-2xl text-muted">
                Choose the weather you feel from your partner with care, curiosity, and respect.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {WEATHER_OPTIONS.map((option) => (
                <SmallWeatherCard
                  key={`partner-${option.id}`}
                  role="partner"
                  tone={option.id}
                  subtitle={option.subtitle}
                  onClick={() => selectPartnerWeather(option.id)}
                />
              ))}
            </div>
          </section>
        ) : null}

        {stage === "complete" && state.youWeather && state.partnerWeather && tonightPath?.freeRitual ? (
          <section className="space-y-4 rounded-[24px] border border-accent/40 bg-card p-5 md:p-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="overflow-hidden rounded-2xl border border-white/10">
                <img
                  src={getWeatherImageUrlByTone("me", meTone)}
                  alt={`${WEATHER_TONE_LABELS[meTone]} Me`}
                  className="h-64 w-full bg-[#151126] object-contain p-2"
                />
              </div>
              <div className="overflow-hidden rounded-2xl border border-white/10">
                <img
                  src={getWeatherImageUrlByTone("partner", partnerTone)}
                  alt={`${WEATHER_TONE_LABELS[partnerTone]} Partner`}
                  className="h-64 w-full bg-[#151126] object-contain p-2"
                />
              </div>
            </div>

            <div className="space-y-2 rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-accent">{tonightPath.homeCard.eyebrow}</p>
              <h3 className="font-serif text-3xl">{tonightPath.homeCard.title}</h3>
              <p className="text-muted">{tonightPath.homeCard.body}</p>
              <p className="pt-1 text-sm">
                <span className="text-muted">Free ritual:</span>{" "}
                <span className="font-semibold">{tonightPath.freeRitual.title}</span>
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => navigate("/ritual")}
                className="flex-1 rounded-full bg-gradient-to-br from-[#e6b980] to-[#eacda3] px-6 py-3.5 font-semibold text-[#130f08] transition-opacity hover:opacity-90"
              >
                Open tonight&apos;s ritual
              </button>
              <button
                type="button"
                onClick={() => setStage("me")}
                className="flex-1 rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-center transition-colors hover:bg-white/10"
              >
                Update our weather
              </button>
            </div>
          </section>
        ) : null}

        {!hasPremium ? (
          <section className="rounded-2xl border border-accent/30 bg-accent/10 p-5">
            <p className="text-sm">
              Unlock the full intimacy library for both of you - $29.99 per year. One subscription. Two partners. 300+ rituals,
              Sacred Voice, oracle prompts, and your shared journey.
            </p>
            <div className="mt-4 flex gap-3">
              <SubscribeButton source="home" mode="navigate" />
            </div>
          </section>
        ) : null}
      </div>
    </Layout>
  );
}
