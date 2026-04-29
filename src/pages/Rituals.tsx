import { useMemo, useState } from "react";
import Layout from "../components/Layout";
import RitualCard from "../components/RitualCard";
import BackButton from "../components/BackButton";
import SubscribeButton from "../components/SubscribeButton";
import { useSession } from "../contexts/SessionContext";
import { getDailyFreeRitual, getPremiumRituals, rituals, type Ritual, type RitualCategory, type WeatherState } from "../data/ritualLibrary";
import { isPremium } from "../lib/premium";
import { getTonightPath } from "../lib/tonightPath";

type DurationFilter = 3 | 5 | 8 | 12 | 20 | "all";
type IntensityFilter = "gentle" | "medium" | "deep" | "all";
type GoalFilter = "all" | "reconnect" | "repair" | "desire" | "conversation" | "touch" | "calm" | "clarity";
type CategoryFilter = RitualCategory | "all";

const WEATHER_FILTERS: Array<WeatherState | "all"> = ["all", "sunny", "warm", "electric", "foggy", "frozen", "stormy"];
const DURATION_FILTERS: DurationFilter[] = ["all", 3, 5, 8, 12, 20];
const INTENSITY_FILTERS: IntensityFilter[] = ["all", "gentle", "medium", "deep"];
const GOAL_FILTERS: GoalFilter[] = ["all", "reconnect", "repair", "desire", "conversation", "touch", "calm", "clarity"];
const CATEGORY_FILTERS: CategoryFilter[] = ["all", "connection", "repair", "desire", "touch", "conversation", "voice", "oracle", "journey"];

function normalizeGoalMatch(ritual: Ritual, goal: GoalFilter) {
  if (goal === "all") return true;
  const hay = `${ritual.title} ${ritual.subtitle} ${ritual.intro} ${ritual.tags.join(" ")}`.toLowerCase();
  if (goal === "reconnect") return hay.includes("reconnect") || hay.includes("connection");
  if (goal === "repair") return hay.includes("repair") || ritual.category === "repair";
  if (goal === "desire") return hay.includes("desire") || ritual.category === "desire";
  if (goal === "conversation") return hay.includes("conversation") || ritual.category === "conversation";
  if (goal === "touch") return hay.includes("touch") || ritual.category === "touch";
  if (goal === "calm") return hay.includes("calm") || hay.includes("ground") || hay.includes("soft");
  if (goal === "clarity") return hay.includes("clarity") || hay.includes("clear");
  return true;
}

export default function Rituals() {
  const { state } = useSession();
  const [weather, setWeather] = useState<WeatherState | "all">("all");
  const [duration, setDuration] = useState<DurationFilter>("all");
  const [goal, setGoal] = useState<GoalFilter>("all");
  const [intensity, setIntensity] = useState<IntensityFilter>("all");
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const hasPremium = isPremium();
  const toggleSelected = (id: string) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  const tonightPath = useMemo(() => getTonightPath(state.youWeather, state.partnerWeather), [state.youWeather, state.partnerWeather]);
  const dailyDiscovery = useMemo(
    () => getDailyFreeRitual(new Date(), "warm", "sunny"),
    [],
  );
  const freeToday = useMemo(() => {
    if (tonightPath?.freeRitual) {
      const mapped = rituals.find((item) => item.id === tonightPath.freeRitual?.id);
      if (mapped) return mapped;
    }
    return dailyDiscovery;
  }, [dailyDiscovery, tonightPath]);

  const base = useMemo(
    () =>
      getPremiumRituals({
        weather,
        duration,
        intensity,
        category,
        query,
      }),
    [weather, duration, intensity, category, query],
  );

  const filtered = useMemo(
    () => base.filter((ritual) => normalizeGoalMatch(ritual, goal)),
    [base, goal],
  );

  const list = useMemo(() => [freeToday, ...filtered.filter((item) => item.id !== freeToday.id)], [freeToday, filtered]);
  const selected = selectedId ? list.find((item) => item.id === selectedId) ?? null : null;
  const selectedLocked = !!selected && !hasPremium && selected.id !== freeToday.id && selected.tier === "premium";

  const renderInlineDetails = (ritual: Ritual) => {
    const locked = !hasPremium && ritual.id !== freeToday.id && ritual.tier === "premium";
    if (locked) return null;
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3">
        <p className="text-sm">{ritual.intro}</p>
        <div className="space-y-2">
          {ritual.steps.slice(0, 7).map((step, index) => (
            <p key={index} className="text-sm">
              <span className="text-accent font-semibold mr-2">{index + 1}.</span>
              {step}
            </p>
          ))}
        </div>
        <p className="text-sm text-muted">{ritual.closing}</p>
      </div>
    );
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-6">
        <BackButton fallbackPath="/" />
        <header className="text-center space-y-3">
          <h1 className="font-serif text-4xl md:text-5xl">A complete intimacy library for the two of you.</h1>
          <p className="text-muted max-w-3xl mx-auto">
            One daily practice is free. Unlock 300+ rituals, guided voice, oracle prompts, and shared journey tools for both partners.
          </p>
        </header>

        <section className="space-y-3">
          <p className="text-[11px] uppercase tracking-[0.2em] text-accent">
            {tonightPath?.freeRitual ? "Tonight's Path (free)" : "Daily discovery"}
          </p>
          <RitualCard
            ritual={freeToday}
            selected={selected?.id === freeToday.id}
            locked={false}
            isFreeToday={true}
            onClick={() => toggleSelected(freeToday.id)}
          />
          {selected?.id === freeToday.id ? renderInlineDetails(freeToday) : null}
        </section>

        {selectedLocked ? (
          <section className="rounded-2xl border border-accent/30 bg-accent/10 p-4 md:p-5 space-y-3">
            <h3 className="font-serif text-2xl">Unlock this ritual</h3>
            <p className="text-sm text-muted">
              This practice is part of the full Sacred Path library for both of you.
            </p>
            <SubscribeButton source="rituals" mode="navigate" />
          </section>
        ) : null}

        <p className="text-sm text-muted">
          Showing <strong>{list.length}</strong> rituals from a library of <strong>{rituals.length}</strong>.
        </p>

        <section className="grid gap-3 sm:grid-cols-2">
            {list.slice(0, 160).filter((r) => r.id !== freeToday.id).map((ritual, index) => {
              const locked = !hasPremium && ritual.id !== freeToday.id && ritual.tier === "premium";
              return (
                <div key={ritual.id} className="space-y-3">
                  <RitualCard
                    ritual={ritual}
                    selected={selected?.id === ritual.id}
                    locked={locked}
                    isFreeToday={ritual.id === freeToday.id}
                    onClick={() => toggleSelected(ritual.id)}
                  />
                  {selected?.id === ritual.id ? renderInlineDetails(ritual) : null}
                  {!hasPremium && index === 4 ? (
                    <div className="rounded-2xl border border-accent/40 bg-accent/10 p-4">
                      <p className="text-sm">
                        Unlock the full library for both of you - $29/year. One subscription gives both connected partners access to 300+ rituals.
                      </p>
                      <SubscribeButton source="rituals" mode="navigate" className="mt-3" />
                    </div>
                  ) : null}
                </div>
              );
            })}
        </section>

        {!hasPremium ? (
          <section className="rounded-2xl border border-accent/40 bg-gradient-to-br from-[#e6b980]/25 to-[#eacda3]/20 p-6 text-center">
            <p className="font-serif text-2xl md:text-3xl leading-snug">
              Subscribe for two,
              <br />
              great Intimacy,
              <br />
              Deep connection.
              <br />
              only 29$ per year,
              <br />
              for both of you
            </p>
            <SubscribeButton source="rituals" mode="navigate" className="mt-5" />
          </section>
        ) : null}
      </div>
    </Layout>
  );
}
