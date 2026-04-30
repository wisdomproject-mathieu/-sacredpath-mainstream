import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import Card from "../components/Card";
import Button from "../components/Button";
import BackButton from "../components/BackButton";
import SubscribeButton from "../components/SubscribeButton";
import { isPremium } from "../lib/premium";
import { useSession } from "../contexts/SessionContext";
import { getIntimacyOracleRecommendation, type OracleEnergy, type OracleNeed } from "../lib/intimacyOracle";
import type { WeatherState } from "../lib/weatherPair";

const DAY_KEY = "sacredpath-oracle-reco-day";

const NEED_OPTIONS: Array<{ id: OracleNeed; label: string }> = [
  { id: "feel-close", label: "Feel close again" },
  { id: "repair-tension", label: "Repair tension" },
  { id: "desire", label: "Bring back desire" },
  { id: "playful", label: "Try something playful" },
  { id: "slow-down", label: "Slow down together" },
  { id: "honest-talk", label: "Talk honestly" },
];

const ENERGY_OPTIONS: Array<{ id: OracleEnergy; label: string }> = [
  { id: "low", label: "Low — keep it gentle" },
  { id: "medium", label: "Medium — we can be present" },
  { id: "high", label: "High — we want something deeper" },
];

function toState(value: string | undefined): WeatherState | undefined {
  if (!value) return undefined;
  if (["sunny", "warm", "electric", "foggy", "frozen", "stormy"].includes(value)) return value as WeatherState;
  return undefined;
}

export default function Oracle() {
  const hasPremium = isPremium();
  const { state } = useSession();
  const [need, setNeed] = useState<OracleNeed>("feel-close");
  const [energy, setEnergy] = useState<OracleEnergy>("medium");
  const [revealed, setRevealed] = useState(false);
  const [notice, setNotice] = useState("");

  const weatherA = toState(state.youWeather);
  const weatherB = toState(state.partnerWeather);
  const recommendation = useMemo(
    () =>
      getIntimacyOracleRecommendation({
        need,
        energy,
        time: "15",
        weatherA,
        weatherB,
        isPremium: hasPremium,
      }),
    [need, energy, weatherA, weatherB, hasPremium],
  );

  const reveal = () => {
    if (!hasPremium && typeof window !== "undefined") {
      const today = new Date().toISOString().slice(0, 10);
      const existing = window.localStorage.getItem(DAY_KEY);
      if (existing === today) {
        setNotice("Your free recommendation is already open for today.");
        setRevealed(true);
        return;
      }
      window.localStorage.setItem(DAY_KEY, today);
    }
    setNotice("");
    setRevealed(true);
  };

  const saveToJourney = () => {
    if (!hasPremium || typeof window === "undefined") return;
    const key = "sacredpath-journey-oracle";
    const previous = JSON.parse(window.localStorage.getItem(key) ?? "[]") as Array<Record<string, string>>;
    const entry = {
      savedAt: new Date().toISOString(),
      ritualId: recommendation.ritual.id,
      title: recommendation.ritual.title,
      need,
      energy,
      time: "15",
    };
    window.localStorage.setItem(key, JSON.stringify([entry, ...previous].slice(0, 120)));
    setNotice("Saved to Journey.");
  };

  return (
    <Layout>
      <div className="mx-auto max-w-5xl space-y-6">
        <BackButton fallbackPath="/" />
        <header className="text-center">
          <h1 className="font-serif text-4xl md:text-5xl">Intimacy Oracle</h1>
          <p className="mt-2 text-muted">
            Tell us what you need tonight. We&apos;ll suggest the right ritual and guide you through it.
          </p>
        </header>

        <Card className="space-y-3">
          <p className="text-xs uppercase tracking-[0.16em] text-accent">What do you want tonight?</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {NEED_OPTIONS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setNeed(item.id)}
                className={`rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition ${
                  need === item.id ? "border-accent/80 bg-accent/15" : "border-white/20 bg-white/5 hover:bg-white/10"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </Card>

        <Card className="space-y-3">
          <p className="text-xs uppercase tracking-[0.16em] text-accent">How much energy do you have?</p>
          <div className="grid gap-2 sm:grid-cols-3">
            {ENERGY_OPTIONS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setEnergy(item.id)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  energy === item.id ? "border-accent/80 bg-accent/15" : "border-white/20 bg-white/5 hover:bg-white/10"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </Card>

        <Button onClick={reveal}>Find our ritual</Button>

        {revealed ? (
          <Card className="space-y-4">
            <p className="text-xs uppercase tracking-[0.16em] text-accent">Oracle recommendation</p>
            <h2 className="font-serif text-3xl">{recommendation.ritual.title}</h2>
            <p className="text-muted">{recommendation.ritual.subtitle}</p>
            <p className="text-xs text-muted">
              level {recommendation.ritual.level} · {recommendation.ritual.category}
            </p>
            <p className="text-sm">{recommendation.reason}</p>

            <div className="space-y-2">
              {(hasPremium || recommendation.ritual.tier === "free-daily"
                ? recommendation.ritual.steps
                : recommendation.ritual.steps.slice(0, 3)
              ).map((step, idx) => (
                <p key={idx} className="text-sm leading-relaxed">
                  <span className="mr-2 font-semibold text-accent">{idx + 1}.</span>
                  {step}
                </p>
              ))}
            </div>

            {!hasPremium && recommendation.locked ? <SubscribeButton source="oracle" mode="navigate" /> : null}

            <div className="grid gap-2 sm:grid-cols-3">
              <Link
                to={`/voice?ritualId=${encodeURIComponent(recommendation.ritual.id)}`}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-3 text-center text-sm font-semibold hover:bg-white/10"
              >
                Start guided mode
              </Link>
              <Link
                to="/deeper"
                className="rounded-full border border-white/10 bg-white/5 px-4 py-3 text-center text-sm font-semibold hover:bg-white/10"
              >
                Go deeper
              </Link>
              {hasPremium ? (
                <Button variant="secondary" onClick={saveToJourney}>
                  Save to Journey
                </Button>
              ) : (
                <SubscribeButton source="oracle" mode="navigate" fullWidth={true} />
              )}
            </div>
          </Card>
        ) : null}

        {notice ? <p className="text-center text-xs text-muted">{notice}</p> : null}
      </div>
    </Layout>
  );
}
