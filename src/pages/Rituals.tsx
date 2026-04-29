import { useMemo, useState } from "react";
import Layout from "../components/Layout";
import { getPremiumRituals, getDailyFreeRitual, rituals, type WeatherState } from "../data/ritualLibrary";

const WEATHER_FILTERS: Array<WeatherState | "all"> = ["all", "sunny", "warm", "electric", "foggy", "frozen", "stormy"];

export default function Rituals() {
  const [weather, setWeather] = useState<WeatherState | "all">("all");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const hasPremium = typeof window !== "undefined" && window.localStorage.getItem("sacredpath-premium") === "true";

  const freeToday = useMemo(() => getDailyFreeRitual(new Date(), "warm", "sunny"), []);
  const premium = useMemo(() => getPremiumRituals({ weather, query }), [weather, query]);

  const list = useMemo(() => {
    const all = [freeToday, ...premium.filter((r) => r.id !== freeToday.id)];
    return all;
  }, [premium, freeToday]);

  const selected = list.find((r) => r.id === selectedId) ?? list[0] ?? rituals[0];
  const selectedIsLocked = !hasPremium && selected.id !== freeToday.id && selected.tier === "premium";

  const imageFor = (mood: WeatherState) => `${import.meta.env.BASE_URL}assets/weather-mainstream/${mood}.png`;

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="text-center space-y-3">
          <h1 className="font-serif text-4xl md:text-5xl">A complete intimacy library for the two of you.</h1>
          <p className="text-muted mt-3 max-w-3xl mx-auto">
            One daily practice is free. Unlock 300+ rituals, guided voice, oracle prompts, and shared journey tools for both partners.
          </p>
        </header>

        <section className="rounded-2xl border border-accent/30 bg-accent/10 p-5">
          <p className="text-[11px] uppercase tracking-[0.2em] text-accent">Free today</p>
          <h2 className="font-serif text-2xl mt-2">{freeToday.title}</h2>
          <p className="text-sm text-muted mt-1">{freeToday.subtitle}</p>
          <p className="text-xs text-muted mt-2">{freeToday.durationMinutes} min · {freeToday.category}</p>
        </section>

        <section className="rounded-2xl border border-white/10 bg-card p-4 grid gap-3 md:grid-cols-[220px_1fr]">
          <select
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2"
            value={weather}
            onChange={(e) => setWeather(e.target.value as WeatherState | "all")}
          >
            {WEATHER_FILTERS.map((item) => (
              <option key={item} value={item}>
                {item === "all" ? "All weather" : `${item[0].toUpperCase()}${item.slice(1)}`}
              </option>
            ))}
          </select>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2"
            placeholder="Search rituals..."
          />
        </section>

        <section className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <div className="grid gap-3 sm:grid-cols-2">
            {list.slice(0, 120).map((ritual) => (
              <button key={ritual.id} onClick={() => setSelectedId(ritual.id)} className={`relative text-left rounded-2xl border overflow-hidden transition ${
                selected?.id === ritual.id ? "border-accent bg-white/10" : "border-white/10 bg-card hover:bg-white/10"
              }`}>
                <img src={imageFor(ritual.imageMood)} alt={ritual.title} className="w-full h-32 object-cover opacity-85" />
                <div className="absolute inset-0 h-32 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="p-4">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-accent">{ritual.id === freeToday.id ? "Free today" : ritual.tier === "premium" ? "Premium" : "Library"}</p>
                  <p className="mt-2 text-lg font-semibold">{ritual.title}</p>
                  <p className="text-sm text-muted mt-1">{ritual.subtitle}</p>
                  <p className="text-xs text-muted mt-2">{ritual.durationMinutes} min · {ritual.category}</p>
                </div>
                {!hasPremium && ritual.id !== freeToday.id && ritual.tier === "premium" ? (
                  <div className="absolute inset-0 bg-black/45 grid place-items-center">
                    <span className="rounded-full border border-accent/60 bg-black/60 px-3 py-1 text-xs tracking-wide">Locked</span>
                  </div>
                ) : null}
              </button>
            ))}
          </div>

          {selected && (
            <aside className="rounded-2xl border border-white/10 bg-card p-5 h-max">
              <h2 className="text-2xl font-serif">{selected.title}</h2>
              <p className="text-muted mt-1">{selected.subtitle}</p>
              {selectedIsLocked ? (
                <div className="mt-4 rounded-xl border border-accent/30 bg-accent/10 p-4">
                  <p className="text-sm">
                    Unlock the full library for both of you - $29/year. One subscription gives both partners access to 300+ rituals, Sacred Voice, Oracle, and Journey.
                  </p>
                </div>
              ) : (
                <div className="mt-4 space-y-2">
                  {selected.steps.slice(0, 6).map((step, index) => (
                    <p key={index} className="text-sm">
                      <span className="text-accent font-semibold mr-2">{index + 1}.</span>
                      {step}
                    </p>
                  ))}
                </div>
              )}
            </aside>
          )}
        </section>
      </div>
    </Layout>
  );
}
