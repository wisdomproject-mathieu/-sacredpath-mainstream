import { Link } from "react-router-dom";
import { useMemo } from "react";
import Layout from "../components/Layout";
import { useSession } from "../contexts/SessionContext";
import { resolveWeatherRitual } from "../lib/ritualRegistry";
import type { IntimacyWeather } from "../lib/ritualRegistry";
import { getDailyFreeRitual, type WeatherState } from "../data/ritualLibrary";

const WEATHER_OPTIONS: Array<{ id: IntimacyWeather; title: string; subtitle: string }> = [
  { id: "sunny", title: "Sunny", subtitle: "Clear, light, easy connection" },
  { id: "warm", title: "Warm", subtitle: "Soft, tender, wanting closeness" },
  { id: "electric", title: "Electric", subtitle: "Spark, chemistry, attraction" },
  { id: "foggy", title: "Foggy", subtitle: "Unclear, distant, uncertain" },
  { id: "frozen", title: "Frozen", subtitle: "Numb, shut down, tired" },
  { id: "stormy", title: "Stormy", subtitle: "Charged, tense, friction" },
];

export default function Home() {
  const { state, setState } = useSession();
  const myName = state.youName?.trim() || "Me";
  const partnerName = state.partnerName?.trim() || "Partner";
  const myWeather = state.youWeather ?? "warm";
  const partnerWeather = state.partnerWeather ?? "sunny";

  const ritual = useMemo(() => resolveWeatherRitual(myWeather, partnerWeather), [myWeather, partnerWeather]);
  const dailyFree = useMemo(
    () => getDailyFreeRitual(new Date(), myWeather as WeatherState, partnerWeather as WeatherState),
    [myWeather, partnerWeather],
  );
  const steps = dailyFree.steps.slice(0, 4);

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-6 md:space-y-8">
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

        <section className="grid gap-4 md:grid-cols-2">
          <div className="bg-card rounded-[22px] border border-white/10 p-5">
            <p className="text-sm font-semibold mb-3">My weather ({myName})</p>
            <div className="grid grid-cols-2 gap-2">
              {WEATHER_OPTIONS.map((option) => (
                <button
                  key={`me-${option.id}`}
                  type="button"
                  onClick={() => setState({ ...state, youWeather: option.id, youWeatherTone: option.id })}
                  className={`rounded-xl border p-3 text-left transition ${
                    myWeather === option.id ? "border-accent bg-white/10" : "border-white/10 bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <p className="font-semibold">{option.title}</p>
                  <p className="text-xs text-muted mt-1">{option.subtitle}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-[22px] border border-white/10 p-5">
            <p className="text-sm font-semibold mb-3">Partner weather ({partnerName})</p>
            <div className="grid grid-cols-2 gap-2">
              {WEATHER_OPTIONS.map((option) => (
                <button
                  key={`partner-${option.id}`}
                  type="button"
                  onClick={() => setState({ ...state, partnerWeather: option.id, partnerWeatherTone: option.id })}
                  className={`rounded-xl border p-3 text-left transition ${
                    partnerWeather === option.id ? "border-accent bg-white/10" : "border-white/10 bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <p className="font-semibold">{option.title}</p>
                  <p className="text-xs text-muted mt-1">{option.subtitle}</p>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-card rounded-[24px] border border-accent/40 p-5 md:p-6 space-y-4">
          <p className="text-[11px] uppercase tracking-[0.22em] text-accent">{ritual.homeCard.eyebrow}</p>
          <h2 className="font-serif text-3xl md:text-4xl">{ritual.homeCard.title}</h2>
          <p className="text-muted max-w-3xl">{ritual.homeCard.body}</p>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm font-semibold">{dailyFree.title}</p>
            <p className="text-sm text-muted mt-1">{dailyFree.subtitle}</p>
            <ol className="mt-3 space-y-2">
              {steps.map((step, idx) => (
                <li key={idx} className="text-sm">
                  <span className="text-accent font-semibold mr-2">{idx + 1}.</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/weather"
              className="flex-1 bg-gradient-to-br from-[#e6b980] to-[#eacda3] text-[#130f08] rounded-full px-6 py-3.5 font-semibold text-center hover:opacity-90 transition-opacity"
            >
              Enter Tonight&apos;s Path
            </Link>
            <Link
              to="/paywall"
              className="flex-1 bg-white/5 border border-white/10 rounded-full px-6 py-3.5 text-center hover:bg-white/10 transition-colors"
            >
                  Unlock the full library for both of you - $29/year
                </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}
