import { useEffect, useMemo, useState } from "react";
import Layout from "../components/Layout";
import RitualCard from "../components/RitualCard";
import BackButton from "../components/BackButton";
import SubscribeButton from "../components/SubscribeButton";
import { useSession } from "../contexts/SessionContext";
import { getDailyFreeRitual, rituals, type Ritual } from "../data/ritualLibrary";
import { isPremium } from "../lib/premium";
import { getTonightPath } from "../lib/tonightPath";

const STARTER_IDS = ["tk006", "sp203", "tk003", "tk005"];
const TERRITORY_TILES = [
  { title: "Daily anchors", desc: "Simple rituals for busy days.", count: 28, sample: ["Candle Arrival", "Daily Homecoming"] },
  { title: "Repair & storm clearing", desc: "De-escalation and reconnection.", count: 24, sample: ["The Sacred Pause", "Softened Startup"] },
  { title: "Deepening slow love", desc: "Presence, breath, and attunement.", count: 22, sample: ["Soul Gazing", "Heart Breathing"] },
  { title: "Erotic spark & play", desc: "Playful chemistry with consent.", count: 26, sample: ["Verbal Foreplay", "Truth or Tease"] },
  { title: "Grounding & care", desc: "Aftercare and nervous-system safety.", count: 18, sample: ["Shared Aftermath", "Held Breathing"] },
  { title: "Integration & long arc", desc: "Weekly anchors and relationship growth.", count: 19, sample: ["Weekly Repair Check", "Beloved Letter"] },
];

export default function Rituals() {
  const { state } = useSession();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [favoriteSet, setFavoriteSet] = useState<Set<string>>(new Set());
  const [toast, setToast] = useState("");
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

  const list = useMemo(() => [freeToday, ...rituals.filter((item) => item.id !== freeToday.id)], [freeToday]);
  const starterRituals = useMemo(
    () =>
      STARTER_IDS.map((id) => rituals.find((r) => r.id === id)).filter((r): r is Ritual => Boolean(r) && r.id !== freeToday.id).slice(0, 3),
    [freeToday.id],
  );
  const selected = selectedId ? list.find((item) => item.id === selectedId) ?? null : null;
  const selectedLocked = !!selected && !hasPremium && selected.id !== freeToday.id && selected.tier === "premium";

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = JSON.parse(window.localStorage.getItem("sp-journey-favorite-rituals") ?? "[]") as string[];
      setFavoriteSet(new Set(stored));
    } catch {
      setFavoriteSet(new Set());
    }
  }, []);

  const renderInlineDetails = (ritual: Ritual) => {
    const locked = !hasPremium && ritual.id !== freeToday.id && ritual.tier === "premium";
    if (locked) return null;
    const isSaved = favoriteSet.has(ritual.title);
    const toggleFavorite = () => {
      if (typeof window === "undefined") return;
      const key = "sp-journey-favorite-rituals";
      const previous = JSON.parse(window.localStorage.getItem(key) ?? "[]") as string[];
      const next = isSaved
        ? previous.filter((item) => item !== ritual.title)
        : [ritual.title, ...previous.filter((item) => item !== ritual.title)].slice(0, 30);
      window.localStorage.setItem(key, JSON.stringify(next));
      setFavoriteSet(new Set(next));
      setToast(isSaved ? "Removed from Favorite rituals." : "Saved to Favorite rituals.");
      window.setTimeout(() => setToast(""), 1800);
    };

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
        <div className="flex justify-end">
          <button
            type="button"
            onClick={toggleFavorite}
            aria-label={isSaved ? "Remove ritual from favorite rituals" : "Save ritual to favorite rituals in Intimacy Journey"}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full border text-lg leading-none transition ${
              isSaved
                ? "border-accent bg-accent text-[#130f08]"
                : "border-accent/50 bg-accent/10 text-accent hover:bg-accent/20"
            }`}
            title={isSaved ? "Remove from favorite rituals" : "Save to favorite rituals"}
          >
            {isSaved ? "♥" : "♡"}
          </button>
        </div>
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
        {!hasPremium && selectedId === "premium-teaser" ? (
          <section className="rounded-2xl border border-accent/30 bg-accent/10 p-4 md:p-5 space-y-3">
            <h3 className="font-serif text-2xl">Unlock the complete library</h3>
            <p className="text-sm text-muted">
              Premium opens all ritual territories, full details, Sacred Voice, Oracle depth, and Journey tools.
            </p>
            <SubscribeButton source="rituals" mode="navigate" />
          </section>
        ) : null}

        {hasPremium ? (
          <>
            <p className="text-sm text-muted">
              Showing <strong>{list.length}</strong> rituals from a library of <strong>{rituals.length}</strong>.
            </p>

            <section className="grid gap-3 sm:grid-cols-2">
              {list.slice(0, 160).filter((r) => r.id !== freeToday.id).map((ritual) => {
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
                  </div>
                );
              })}
            </section>
          </>
        ) : (
          <>
            <section className="space-y-3">
              <p className="text-[11px] uppercase tracking-[0.2em] text-accent">Start free</p>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {starterRituals.map((ritual) => (
                  <div key={ritual.id} className="space-y-2">
                    <RitualCard ritual={ritual} selected={selected?.id === ritual.id} locked={false} isFreeToday={false} onClick={() => toggleSelected(ritual.id)} />
                    {selected?.id === ritual.id ? renderInlineDetails(ritual) : null}
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-3">
              <p className="text-[11px] uppercase tracking-[0.2em] text-accent">Inside the full library</p>
              <div className="grid gap-3 md:grid-cols-2">
                {TERRITORY_TILES.map((tile) => (
                  <button
                    key={tile.title}
                    onClick={() => toggleSelected("premium-teaser")}
                    className="rounded-2xl border border-white/10 bg-card p-4 text-left hover:bg-white/10 transition"
                  >
                    <p className="text-[11px] uppercase tracking-[0.16em] text-accent">Premium territory</p>
                    <h3 className="font-serif text-2xl mt-1">{tile.title}</h3>
                    <p className="text-sm text-muted mt-1">{tile.desc}</p>
                    <p className="text-xs text-muted mt-2">{tile.count} rituals · {tile.sample.join(" · ")}</p>
                  </button>
                ))}
              </div>
            </section>
          </>
        )}

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
      {toast ? (
        <div className="fixed left-1/2 top-4 z-50 -translate-x-1/2 rounded-full border border-accent/40 bg-[#161126]/95 px-4 py-2 text-xs text-accent shadow-lg">
          {toast}
        </div>
      ) : null}
    </Layout>
  );
}
