import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Layout from "../components/Layout";
import Card from "../components/Card";
import Button from "../components/Button";
import BackButton from "../components/BackButton";
import SubscribeButton from "../components/SubscribeButton";
import { isPremium } from "../lib/premium";
import { useSession } from "../contexts/SessionContext";
import { getDailyFreeRitual, getRitualById, getTonightRitual } from "../lib/ritualResolver";
import type { WeatherState } from "../lib/weatherPair";
import {
  pauseVoice,
  resumeVoice,
  speakRitualGuide,
  stopVoice,
  type VoicePacing,
  type VoiceStyle,
} from "../lib/voiceEngine";

function toState(value: string | undefined): WeatherState | undefined {
  if (!value) return undefined;
  if (["sunny", "warm", "electric", "foggy", "frozen", "stormy"].includes(value)) return value as WeatherState;
  return undefined;
}

const pacingLabel: Record<VoicePacing, string> = {
  quick: "Quick guidance",
  standard: "Standard guidance",
  slow: "Slow integration",
};

export default function Voice() {
  const hasPremium = isPremium();
  const { state } = useSession();
  const [search] = useSearchParams();
  const [voiceStyle, setVoiceStyle] = useState<VoiceStyle>("warm");
  const [pacing, setPacing] = useState<VoicePacing>("standard");
  const [status, setStatus] = useState<"idle" | "playing" | "paused">("idle");
  const [notice, setNotice] = useState("");

  const you = toState(state.youWeather) ?? "warm";
  const partner = toState(state.partnerWeather) ?? "foggy";
  const ritualId = search.get("ritualId");
  const queryRitual = ritualId ? getRitualById(ritualId) : null;
  const tonightRitual = getTonightRitual(you, partner);
  const freeDaily = getDailyFreeRitual(new Date(), you, partner);
  const activeRitual = queryRitual ?? (hasPremium ? tonightRitual : freeDaily);

  const guidedSummary = useMemo(() => {
    if (pacing === "quick") return "Shorter pauses between steps";
    if (pacing === "slow") return "Long reflective pauses between steps";
    return "Balanced pacing with space to feel each step";
  }, [pacing]);

  const onPlay = async () => {
    setNotice("");
    try {
      const result = await speakRitualGuide(
        activeRitual,
        { voiceStyle, pacing, includeIntro: true, includeClosing: true },
        setStatus,
      );
      if (result.usingFallback) {
        setNotice("Using device voice for this session.");
      }
    } catch {
      setNotice("Using device voice for this session.");
    }
  };

  const onPause = () => {
    pauseVoice();
    setStatus("paused");
  };
  const onResume = () => {
    resumeVoice();
    setStatus("playing");
  };
  const onStop = () => {
    stopVoice();
    setStatus("idle");
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-6">
        <BackButton fallbackPath="/" />
        <header className="text-center">
          <h1 className="font-serif text-4xl md:text-5xl">Sacred Voice</h1>
          <p className="text-muted mt-2">Let the ritual be spoken slowly, with space between each step.</p>
        </header>

        <Card className="space-y-3">
          <p className="text-[11px] uppercase tracking-[0.2em] text-accent">
            {hasPremium ? "Guided ritual" : "Today’s free guided ritual"}
          </p>
          <h2 className="font-serif text-2xl">{activeRitual.title}</h2>
          <p className="text-sm text-muted">{activeRitual.subtitle}</p>
          <p className="text-xs text-muted">Level {activeRitual.level} · {activeRitual.category}</p>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <p className="text-xs uppercase tracking-[0.16em] text-accent mb-2">Voice style</p>
            <div className="grid grid-cols-2 gap-2">
              {(["calm", "warm", "deep", "soft"] as const).map((style) => (
                <button
                  key={style}
                  onClick={() => setVoiceStyle(style)}
                  className={`rounded-full border px-3 py-2 text-sm font-semibold capitalize ${
                    voiceStyle === style ? "border-accent/80 bg-accent/15" : "border-white/20 bg-white/5"
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </Card>

          <Card>
            <p className="text-xs uppercase tracking-[0.16em] text-accent mb-2">Pacing</p>
            <div className="grid gap-2">
              {(["quick", "standard", "slow"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setPacing(mode)}
                  className={`rounded-full border px-3 py-2 text-sm font-semibold ${
                    pacing === mode ? "border-accent/80 bg-accent/15" : "border-white/20 bg-white/5"
                  }`}
                >
                  {pacingLabel[mode]}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-muted">{guidedSummary}</p>
          </Card>
        </div>

        <Card>
          <div className="grid gap-2 sm:grid-cols-2">
            <Button onClick={onPlay}>Play guided ritual</Button>
            <Button variant="secondary" onClick={status === "paused" ? onResume : onPause}>
              {status === "paused" ? "Resume" : "Pause"}
            </Button>
          </div>
          <Button className="mt-2" variant="secondary" onClick={onStop}>
            Stop
          </Button>
          <p className="text-xs text-muted mt-3">
            {status === "playing" && "Playing"}
            {status === "paused" && "Paused"}
            {status === "idle" && "Ready"}
          </p>
          {notice ? <p className="text-xs text-muted mt-2">{notice}</p> : null}
        </Card>

        {!hasPremium ? (
          <Card>
            <p className="text-sm text-muted mb-3">
              Keep the full guidance, alternatives, and deeper sessions unlocked for both of you.
            </p>
            <SubscribeButton source="voice" mode="navigate" />
          </Card>
        ) : (
          <Card>
            <div className="grid gap-2 sm:grid-cols-2">
              <Link
                to={`/ritual?ritualId=${encodeURIComponent(activeRitual.id)}`}
                className="rounded-full border border-white/15 bg-white/5 px-4 py-3 text-center font-semibold hover:bg-white/10"
              >
                Open ritual details
              </Link>
              <Link
                to="/journey"
                className="rounded-full border border-white/15 bg-white/5 px-4 py-3 text-center font-semibold hover:bg-white/10"
              >
                Save to Journey
              </Link>
            </div>
          </Card>
        )}
      </div>
    </Layout>
  );
}
