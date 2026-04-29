import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import Card from "../components/Card";
import Button from "../components/Button";
import BackButton from "../components/BackButton";
import SubscribeButton from "../components/SubscribeButton";
import { isPremium } from "../lib/premium";
import { useSession } from "../contexts/SessionContext";
import { getOracleRitualRecommendation, type OracleFocus, type OracleIntensity, type OracleTone } from "../lib/oracleToneSync";
import type { WeatherState } from "../lib/weatherPair";

const DAY_KEY = "sacredpath-oracle-reco-day";

function toState(value: string | undefined): WeatherState | undefined {
  if (!value) return undefined;
  if (["sunny", "warm", "electric", "foggy", "frozen", "stormy"].includes(value)) return value as WeatherState;
  return undefined;
}

export default function Oracle() {
  const hasPremium = isPremium();
  const { state } = useSession();
  const [tone, setTone] = useState<OracleTone>("romantic");
  const [focus, setFocus] = useState<OracleFocus>("bonding");
  const [intensity, setIntensity] = useState<OracleIntensity | "auto">("auto");
  const [notice, setNotice] = useState("");
  const [seed, setSeed] = useState(0);

  const weatherA = toState(state.youWeather);
  const weatherB = toState(state.partnerWeather);
  const today = new Date().toISOString().slice(0, 10);

  const recommendation = useMemo(
    () =>
      getOracleRitualRecommendation({
        tone,
        focus,
        intensity: intensity === "auto" ? undefined : intensity,
        weatherA,
        weatherB,
        isPremium: hasPremium,
      }),
    [tone, focus, intensity, weatherA, weatherB, hasPremium, seed],
  );

  const reveal = () => {
    if (!hasPremium && typeof window !== "undefined") {
      const opened = window.localStorage.getItem(DAY_KEY);
      if (opened === today) {
        setNotice("Your free Oracle recommendation for today is already open.");
        return;
      }
      window.localStorage.setItem(DAY_KEY, today);
    }
    setNotice("");
    setSeed((v) => v + 1);
  };

  const saveToJourney = () => {
    if (typeof window === "undefined") return;
    const key = "sacredpath-journey-oracle";
    const prev = JSON.parse(window.localStorage.getItem(key) ?? "[]") as any[];
    const next = [
      {
        ritualId: recommendation.ritual.id,
        title: recommendation.ritual.title,
        tone,
        focus,
        savedAt: new Date().toISOString(),
      },
      ...prev,
    ].slice(0, 100);
    window.localStorage.setItem(key, JSON.stringify(next));
    setNotice("Saved to Journey.");
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-6">
        <BackButton fallbackPath="/" />
        <header className="text-center">
          <h1 className="font-serif text-4xl md:text-5xl">Intimacy Oracle</h1>
          <p className="text-muted mt-2">Align your emotional tone before choosing intensity.</p>
        </header>

        <Card>
          <p className="text-xs uppercase tracking-[0.16em] text-accent mb-2">Choose emotional tone</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {(["romantic", "playful", "healing", "erotic", "devotional"] as const).map((item) => (
              <button
                key={item}
                onClick={() => setTone(item)}
                className={`rounded-full border px-3 py-2 text-sm font-semibold capitalize ${
                  tone === item ? "border-accent/80 bg-accent/15" : "border-white/20 bg-white/5"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </Card>

        <Card>
          <p className="text-xs uppercase tracking-[0.16em] text-accent mb-2">Choose tonight’s focus</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {(["bonding", "attraction", "repair", "growth"] as const).map((item) => (
              <button
                key={item}
                onClick={() => setFocus(item)}
                className={`rounded-full border px-3 py-2 text-sm font-semibold capitalize ${
                  focus === item ? "border-accent/80 bg-accent/15" : "border-white/20 bg-white/5"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </Card>

        <Card>
          <p className="text-xs uppercase tracking-[0.16em] text-accent mb-2">Optional intensity</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {(["auto", "gentle", "medium", "deep"] as const).map((item) => (
              <button
                key={item}
                onClick={() => setIntensity(item)}
                className={`rounded-full border px-3 py-2 text-sm font-semibold capitalize ${
                  intensity === item ? "border-accent/80 bg-accent/15" : "border-white/20 bg-white/5"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </Card>

        <Button onClick={reveal}>Reveal tonight’s ritual</Button>

        <Card className="space-y-3">
          <p className="text-[11px] uppercase tracking-[0.2em] text-accent">Oracle tone sync</p>
          <h2 className="font-serif text-2xl">{recommendation.ritual.title}</h2>
          <p className="text-sm text-muted">{recommendation.ritual.subtitle}</p>
          <p className="text-xs text-muted">
            {tone} · {focus} · {recommendation.intensity} · {recommendation.ritual.category} · {recommendation.ritual.durationMinutes} min
          </p>
          <p className="text-sm">{recommendation.reason}</p>

          <div className="space-y-2">
            {(hasPremium ? recommendation.ritual.steps : recommendation.ritual.steps.slice(0, 3)).map((step, idx) => (
              <p key={idx} className="text-sm">
                <span className="text-accent font-semibold mr-2">{idx + 1}.</span>
                {step}
              </p>
            ))}
          </div>

          {!hasPremium && recommendation.ritual.tier === "premium" ? <SubscribeButton source="oracle" mode="navigate" /> : null}

          <div className="grid gap-2 sm:grid-cols-2">
            <Link
              to={`/voice?ritualId=${encodeURIComponent(recommendation.ritual.id)}`}
              className="rounded-full border border-white/15 bg-white/5 px-4 py-3 text-center font-semibold hover:bg-white/10"
            >
              Play this with Sacred Voice
            </Link>
            {hasPremium ? (
              <Button variant="secondary" onClick={saveToJourney}>
                Save to Journey
              </Button>
            ) : (
              <SubscribeButton source="oracle" mode="navigate" />
            )}
          </div>
        </Card>

        {notice ? <p className="text-center text-xs text-muted">{notice}</p> : null}
      </div>
    </Layout>
  );
}

