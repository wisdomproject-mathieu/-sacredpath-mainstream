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
const FREE_LIBRARY_MENU = [
  { title: "RECONNECT DAILY", desc: "Simple rituals for busy days and softer check-ins." },
  { title: "REPAIR TENSION", desc: "Calm practices for emotional safety and listening." },
  { title: "DEEPEN CLOSENESS", desc: "Warm practices for trust, tenderness, and presence." },
  { title: "PLAY TOGETHER", desc: "Light, consent-forward practices for shared joy." },
  { title: "SLOW DOWN", desc: "Grounding rituals that reduce overwhelm and pressure." },
  { title: "TALK HONESTLY", desc: "Conversation practices to feel understood and supported." },
];
export default function Rituals() {
  const { state } = useSession();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [favoriteSet, setFavoriteSet] = useState<Set<string>>(new Set());
  const [toast, setToast] = useState("");
  const [premiumIntensityFilter, setPremiumIntensityFilter] = useState<"all" | "gentle" | "medium" | "deep">("all");
  const [premiumCategoryFilter, setPremiumCategoryFilter] = useState<
    "all" | "repair" | "desire" | "conversation" | "connection" | "touch" | "journey" | "voice"
  >("all");
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
  const freePreviewList = useMemo(() => list.filter((r) => r.id !== freeToday.id).slice(0, 48), [list, freeToday.id]);
  const dailyBackgrounds = useMemo(
    () => [
      `${import.meta.env.BASE_URL}assets/weather-mainstream/electric.png`,
      `${import.meta.env.BASE_URL}assets/weather-mainstream/foggy.png`,
      `${import.meta.env.BASE_URL}assets/weather-mainstream/frozen.png`,
      `${import.meta.env.BASE_URL}assets/weather-mainstream/warm.png`,
      `${import.meta.env.BASE_URL}assets/weather-mainstream/sunny.png`,
      `${import.meta.env.BASE_URL}assets/weather-mainstream/stormy.png`,
    ],
    [],
  );
  const dayKey = useMemo(() => Math.floor(new Date(new Date().setHours(0, 0, 0, 0)).getTime() / 86400000), []);
  const freeDailyImage = useMemo(() => dailyBackgrounds[dayKey % dailyBackgrounds.length], [dailyBackgrounds, dayKey]);
  const premiumFilteredList = useMemo(() => {
    return list.filter((ritual) => {
      if (ritual.id === freeToday.id) return false;
      if (premiumIntensityFilter !== "all" && ritual.intensity !== premiumIntensityFilter) return false;
      if (premiumCategoryFilter !== "all" && ritual.category !== premiumCategoryFilter) return false;
      return true;
    });
  }, [list, freeToday.id, premiumIntensityFilter, premiumCategoryFilter]);
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
          <h1 className="font-serif text-4xl md:text-5xl">A complete connection library for the two of you.</h1>
          <p className="text-muted max-w-3xl mx-auto">
            One daily practice is free. Unlock <span className="text-accent font-semibold">400+ rituals</span>, guided voice, gentle oracle prompts, and shared journey tools for both partners, with new practices added regularly.
          </p>
        </header>

        <section className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
          <div className="space-y-3">
            <p className="text-[11px] uppercase tracking-[0.2em] text-accent">TODAY&apos;S FREE PRACTICE</p>
            <p className="text-sm text-muted">A gentle daily ritual to help you feel closer.</p>
            <RitualCard
              ritual={freeToday}
              selected={selected?.id === freeToday.id}
              locked={false}
              isFreeToday={true}
              showImage
              imageSrcOverride={freeDailyImage}
              statusLabel="FREE TODAY"
              onClick={() => toggleSelected(freeToday.id)}
            />
            {selected?.id === freeToday.id ? renderInlineDetails(freeToday) : null}
          </div>

          {hasPremium ? (
            <div className="rounded-2xl border border-white/10 bg-card p-4 space-y-3 h-fit">
              <p className="text-[11px] uppercase tracking-[0.16em] text-accent">Sort & filter</p>
              <p className="text-xs text-muted">Use filters to navigate the full ritual library faster.</p>
              <label className="block text-xs text-muted">Intensity</label>
              <select
                value={premiumIntensityFilter}
                onChange={(e) => setPremiumIntensityFilter(e.target.value as "all" | "gentle" | "medium" | "deep")}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
              >
                <option value="all">All intensities</option>
                <option value="gentle">Gentle</option>
                <option value="medium">Medium</option>
                <option value="deep">Deep</option>
              </select>
              <label className="block text-xs text-muted">Category</label>
              <select
                value={premiumCategoryFilter}
                onChange={(e) =>
                  setPremiumCategoryFilter(
                    e.target.value as
                      | "all"
                      | "repair"
                      | "desire"
                      | "conversation"
                      | "connection"
                      | "touch"
                      | "journey"
                      | "voice",
                  )
                }
                className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
              >
                <option value="all">All categories</option>
                <option value="repair">Repair</option>
                <option value="desire">Desire</option>
                <option value="conversation">Conversation</option>
                <option value="connection">Connection</option>
                <option value="touch">Touch</option>
                <option value="journey">Journey</option>
                <option value="voice">Voice</option>
              </select>
              <p className="text-xs text-muted">
                Showing <span className="text-text font-semibold">{premiumFilteredList.length}</span> rituals.
              </p>
            </div>
          ) : null}
        </section>

        {selectedLocked ? (
          <section className="rounded-2xl border border-accent/30 bg-accent/10 p-4 md:p-5 space-y-3">
            <h3 className="font-serif text-2xl">Unlock this ritual</h3>
            <p className="text-sm text-muted">
              This practice is included in the full library for both of you.
            </p>
            <SubscribeButton source="rituals" mode="navigate" />
          </section>
        ) : null}
        {!hasPremium && selectedId === "premium-teaser" ? (
          <section className="rounded-2xl border border-accent/30 bg-accent/10 p-4 md:p-5 space-y-3">
            <h3 className="font-serif text-2xl">Unlock the complete library</h3>
            <p className="text-sm text-muted">
              One subscription opens deeper practices, full details, guided voice, and journey tools for both partners.
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
              {premiumFilteredList.map((ritual) => {
                const locked = !hasPremium && ritual.id !== freeToday.id && ritual.tier === "premium";
                return (
                  <div key={ritual.id} className="space-y-3">
                    <RitualCard
                      ritual={ritual}
                      selected={selected?.id === ritual.id}
                      locked={locked}
                      isFreeToday={ritual.id === freeToday.id}
                      showImage={false}
                      statusLabel={locked ? "UNLOCK" : "AVAILABLE"}
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
              <p className="text-[11px] uppercase tracking-[0.2em] text-accent">MORE PRACTICES TO EXPLORE</p>
              <p className="text-sm text-muted">A small preview from the full library.</p>
              <div className="flex gap-3 overflow-x-auto pb-1">
                {starterRituals.map((ritual) => (
                  <div key={ritual.id} className="min-w-[280px] flex-1 space-y-2">
                    <RitualCard
                      ritual={ritual}
                      selected={selected?.id === ritual.id}
                      locked={false}
                      isFreeToday={false}
                      showImage
                      statusLabel="PREVIEW"
                      onClick={() => toggleSelected(ritual.id)}
                    />
                    {selected?.id === ritual.id ? renderInlineDetails(ritual) : null}
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-3">
              <p className="text-[11px] uppercase tracking-[0.2em] text-accent">LIBRARY CONTENT</p>
              <div className="grid gap-3 md:grid-cols-2">
                {FREE_LIBRARY_MENU.map((tile) => (
                  <button
                    key={tile.title}
                    onClick={() => toggleSelected("premium-teaser")}
                    className="rounded-2xl border border-white/10 bg-card p-4 text-left hover:bg-white/10 transition"
                  >
                    <p className="text-[11px] uppercase tracking-[0.16em] text-accent">Included in full library</p>
                    <h3 className="font-serif text-2xl mt-1">{tile.title}</h3>
                    <p className="text-sm text-muted mt-1">{tile.desc}</p>
                    <p className="text-xs text-muted mt-2">Unlock full practice</p>
                  </button>
                ))}
              </div>
            </section>

            <section className="space-y-3">
              <p className="text-[11px] uppercase tracking-[0.2em] text-accent">Library preview</p>
              <p className="text-sm text-muted">
                Showing <strong>{freePreviewList.length}</strong> ritual cards from <strong>{rituals.length}</strong>. Premium unlocks full details for locked practices.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {freePreviewList.map((ritual) => {
                  const locked = ritual.tier === "premium";
                  return (
                    <div key={ritual.id} className="space-y-3">
                      <RitualCard
                        ritual={ritual}
                        selected={selected?.id === ritual.id}
                        locked={locked}
                        isFreeToday={false}
                        showImage={false}
                        statusLabel={locked ? "UNLOCK" : "AVAILABLE"}
                        onClick={() => toggleSelected(ritual.id)}
                      />
                      {selected?.id === ritual.id ? renderInlineDetails(ritual) : null}
                    </div>
                  );
                })}
              </div>
            </section>
          </>
        )}

      </div>
      {toast ? (
        <div className="fixed left-1/2 top-4 z-50 -translate-x-1/2 rounded-full border border-accent/40 bg-[#161126]/95 px-4 py-2 text-xs text-accent shadow-lg">
          {toast}
        </div>
      ) : null}
    </Layout>
  );
}
