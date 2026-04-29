import { useMemo, useState } from "react";
import Layout from "../components/Layout";
import { getPremiumRituals, getDailyFreeRitual, rituals, type WeatherState } from "../data/ritualLibrary";

const WEATHER_FILTERS: Array<WeatherState | "all"> = ["all", "sunny", "warm", "electric", "foggy", "frozen", "stormy"];

export default function Rituals() {
  const [weather, setWeather] = useState<WeatherState | "all">("all");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const freeToday = useMemo(() => getDailyFreeRitual(new Date(), "warm", "sunny"), []);
  const premium = useMemo(() => getPremiumRituals({ weather, query }), [weather, query]);

  const list = useMemo(() => {
    const all = [freeToday, ...premium.filter((r) => r.id !== freeToday.id)];
    return all;
  }, [premium, freeToday]);

  const selected = list.find((r) => r.id === selectedId) ?? list[0] ?? rituals[0];

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="text-center">
          <h1 className="font-serif text-4xl md:text-5xl">A complete intimacy library for the two of you.</h1>
          <p className="text-muted mt-3 max-w-3xl mx-auto">
            One daily practice is free. Unlock 300+ rituals, guided voice, oracle prompts, and shared journey tools for both partners.
          </p>
        </header>

        <section className="rounded-2xl border border-white/10 bg-card p-4 grid gap-3 md:grid-cols-[220px_1fr]">
          <select
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2"
            value={weather}
            onChange={(e) => setWeather(e.target.value as IntimacyWeather | "all")}
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
              <button
                key={ritual.id}
                onClick={() => setSelectedId(ritual.id)}
                className={`text-left rounded-2xl border p-4 transition ${
                  selected?.id === ritual.id ? "border-accent bg-white/10" : "border-white/10 bg-card hover:bg-white/10"
                }`}
              >
                  <p className="text-[11px] uppercase tracking-[0.2em] text-accent">{ritual.id === freeToday.id ? "Free today" : "Premium"}</p>
                <p className="mt-2 text-lg font-semibold">{ritual.title}</p>
                <p className="text-sm text-muted mt-1">{ritual.subtitle}</p>
                <p className="text-xs text-muted mt-2">{ritual.durationMinutes} min · {ritual.category}</p>
              </button>
            ))}
          </div>

          {selected && (
            <aside className="rounded-2xl border border-white/10 bg-card p-5 h-max">
              <h2 className="text-2xl font-serif">{selected.title}</h2>
              <p className="text-muted mt-1">{selected.subtitle}</p>
              <div className="mt-4 space-y-2">
                {selected.steps.slice(0, 6).map((step, index) => (
                  <p key={index} className="text-sm">
                    <span className="text-accent font-semibold mr-2">{index + 1}.</span>
                    {step}
                  </p>
                ))}
              </div>
            </aside>
          )}
        </section>
      </div>
    </Layout>
  );
}
