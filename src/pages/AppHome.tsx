import { Link } from "react-router-dom";
import { useMemo } from "react";
import Layout from "../components/Layout";
import { useSession } from "../contexts/SessionContext";
import { getWeatherImageUrlByTone, type WeatherVisualKey } from "../lib/weatherAssets";
import BrandHeader from "../components/BrandHeader";
import { getTonightPath } from "../lib/tonightPath";

export default function Home() {
  const { state } = useSession();
  const myName = state.youName?.trim() || "Me";
  const partnerName = state.partnerName?.trim() || "Partner";
  const myWeather = state.youWeather;
  const partnerWeather = state.partnerWeather;
  const hasWeatherPair = Boolean(myWeather && partnerWeather);
  const isConnected = Boolean(state.partnerName?.trim());
  const hasPremium = typeof window !== "undefined" && window.localStorage.getItem("sacredpath-premium") === "true";

  const ritual = useMemo(() => getTonightPath(myWeather, partnerWeather), [myWeather, partnerWeather]);
  const activeRitual = ritual?.freeRitual;
  const steps = (activeRitual?.ritualSteps ?? []).slice(0, 4);
  const dominantWeather = useMemo<WeatherVisualKey>(() => {
    const tones: WeatherVisualKey[] = ["stormy", "frozen", "foggy", "warm", "electric", "sunny"];
    const pair = [myWeather, partnerWeather].filter(Boolean) as WeatherVisualKey[];
    return tones.find((tone) => pair.includes(tone)) ?? "warm";
  }, [myWeather, partnerWeather]);

  const weatherIcon = dominantWeather === "sunny"
    ? "☀"
    : dominantWeather === "warm"
      ? "♡"
      : dominantWeather === "electric"
        ? "⚡"
        : dominantWeather === "foggy"
          ? "〰"
          : dominantWeather === "frozen"
            ? "❄"
            : "⛈";
  const outcomeImage = getWeatherImageUrlByTone("me", dominantWeather);

  return (
    <Layout showHeader={false}>
      <div className="max-w-6xl mx-auto space-y-6 md:space-y-8">
        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
          <BrandHeader className="md:mb-0" />
          <div className="md:ml-auto">
            {isConnected ? (
              <span className="inline-flex items-center rounded-full border border-emerald-300/30 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-100">
                Connected · {myName} + {partnerName}
              </span>
            ) : (
              <Link to="/connect" className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-muted hover:bg-white/10">
                Invite partner
              </Link>
            )}
          </div>
        </div>

        <header className="text-center space-y-3">
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl leading-[1.02]">
            Understand the mood
            <br />
            between you in seconds.
          </h1>
          <p className="text-base md:text-lg text-muted leading-relaxed max-w-3xl mx-auto">
            Choose your intimacy weather, receive one practice for today, and reconnect without pressure.
          </p>
        </header>

        {!hasWeatherPair ? (
          <section className="bg-card rounded-[24px] border border-accent/40 p-6 space-y-4 text-center">
            <p className="text-[11px] uppercase tracking-[0.22em] text-accent">Start your check-in</p>
            <h2 className="font-serif text-3xl md:text-4xl">How are you and your partner feeling right now?</h2>
            <p className="text-muted max-w-2xl mx-auto">
              Complete the two-step weather check-in to generate your Tonight&apos;s Path ritual.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
              <Link
                to="/weather"
                className="flex-1 bg-gradient-to-br from-[#e6b980] to-[#eacda3] text-[#130f08] rounded-full px-6 py-3.5 font-semibold text-center hover:opacity-90 transition-opacity"
              >
                Start weather check-in
              </Link>
              <Link to="/connect" className="flex-1 bg-white/5 border border-white/10 rounded-full px-6 py-3.5 text-center hover:bg-white/10 transition-colors">
                Connect partner
              </Link>
            </div>
          </section>
        ) : (
          <section className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-accent">Me</p>
              <p className="font-semibold mt-1">{myName}</p>
              <p className="text-sm text-muted mt-1">{myWeather}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-accent">Partner</p>
              <p className="font-semibold mt-1">{partnerName}</p>
              <p className="text-sm text-muted mt-1">{partnerWeather}</p>
            </div>
          </section>
        )}

        {hasWeatherPair && ritual ? (
        <section className="bg-card rounded-[24px] border border-accent/40 p-5 md:p-6 space-y-4">
          <p className="text-[11px] uppercase tracking-[0.22em] text-accent">{ritual.homeCard.eyebrow}</p>
          <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr]">
            <div className="relative rounded-[28px] overflow-hidden border border-white/10">
              <img src={outcomeImage} alt={`${dominantWeather} intimacy weather`} className="w-full h-full min-h-[260px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent" />
              <div className="absolute left-5 right-5 bottom-5 text-white">
                <p className="text-2xl mb-2">{weatherIcon}</p>
                <p className="text-sm uppercase tracking-[0.2em]">{dominantWeather}</p>
                <h2 className="font-serif text-2xl mt-1">{ritual.homeCard.title}</h2>
              </div>
            </div>
            <div>
              <h2 className="font-serif text-3xl md:text-4xl">{ritual.homeCard.title}</h2>
              <p className="text-muted max-w-3xl mt-2">{ritual.homeCard.body}</p>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4 mt-4">
                <p className="text-xs uppercase tracking-[0.16em] text-accent">Today&apos;s Path</p>
                <p className="text-sm font-semibold mt-1">{activeRitual?.title ?? "Tonight's Path"}</p>
                <p className="text-sm text-muted mt-1">{activeRitual?.subtitle ?? ritual.homeCard.body}</p>
                {activeRitual?.duration ? (
                  <p className="text-xs text-muted mt-2">{activeRitual.duration}</p>
                ) : null}
                <ol className="mt-3 space-y-2">
                  {steps.map((step, idx) => (
                    <li key={idx} className="text-sm">
                      <span className="text-accent font-semibold mr-2">{idx + 1}.</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/ritual"
              className="flex-1 bg-gradient-to-br from-[#e6b980] to-[#eacda3] text-[#130f08] rounded-full px-6 py-3.5 font-semibold text-center hover:opacity-90 transition-opacity"
            >
              Open Tonight&apos;s Path
            </Link>
            <Link to="/weather" className="flex-1 bg-white/5 border border-white/10 rounded-full px-6 py-3.5 text-center hover:bg-white/10 transition-colors">
              Update our weather
            </Link>
          </div>
        </section>
        ) : null}

        {!hasPremium ? (
          <section className="rounded-2xl border border-accent/30 bg-accent/10 p-5">
            <p className="text-sm">
              Unlock the full intimacy library for both of you - $29/year. One subscription. Two partners. 300+ rituals,
              Sacred Voice, oracle prompts, and your shared journey.
            </p>
            <div className="mt-4 flex gap-3">
              <Link to="/paywall" className="rounded-full bg-gradient-to-br from-[#e6b980] to-[#eacda3] text-[#130f08] px-5 py-2.5 font-semibold">
                Unlock for both of us
              </Link>
              <Link to="/rituals" className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 hover:bg-white/10">
                View full library
              </Link>
            </div>
          </section>
        ) : null}
      </div>
    </Layout>
  );
}
