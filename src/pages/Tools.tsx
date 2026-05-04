import { useEffect, useMemo, useState } from "react";
import Layout from "../components/Layout";
import Card from "../components/Card";
import Button from "../components/Button";
import BackButton from "../components/BackButton";
import {
  getMusicState,
  initMusicState,
  subscribeMusic,
  toggleMusicPlayback,
} from "../lib/musicPlayer";

type ToolMode = "timer" | "breathing";
type BreathingMode = "box" | "478";

type BreathPhase = {
  label: string;
  seconds: number;
};

const DURATION_OPTIONS = [3, 5, 10] as const;
const BOX_CYCLE_SECONDS = 16;
const FOUR_SEVEN_EIGHT_SECONDS = 19;

const BREATHING_BACKGROUNDS = [
  { id: "candle", label: "Candle", gradient: "linear-gradient(135deg, #4f2c17 0%, #7a4a2b 35%, #2a1b14 100%)" },
  { id: "ocean", label: "Ocean", gradient: "linear-gradient(135deg, #123652 0%, #1f596c 40%, #0f2134 100%)" },
  { id: "forest", label: "Forest", gradient: "linear-gradient(135deg, #1b3b2c 0%, #2d5b3f 40%, #12231b 100%)" },
  { id: "night", label: "Night", gradient: "linear-gradient(135deg, #23183d 0%, #192646 45%, #0c101f 100%)" },
] as const;

function formatClock(totalSeconds: number) {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function getPhases(mode: BreathingMode): BreathPhase[] {
  if (mode === "box") {
    return [
      { label: "Inhale", seconds: 4 },
      { label: "Hold", seconds: 4 },
      { label: "Exhale", seconds: 4 },
      { label: "Hold", seconds: 4 },
    ];
  }
  return [
    { label: "Inhale", seconds: 4 },
    { label: "Hold", seconds: 7 },
    { label: "Exhale", seconds: 8 },
  ];
}

export default function Tools() {
  const [toolMode, setToolMode] = useState<ToolMode>("timer");
  const [durationMin, setDurationMin] = useState<(typeof DURATION_OPTIONS)[number]>(3);
  const [breathingMode, setBreathingMode] = useState<BreathingMode>("box");
  const [breathingBackgroundId, setBreathingBackgroundId] =
    useState<(typeof BREATHING_BACKGROUNDS)[number]["id"]>("candle");
  const [remainingSeconds, setRemainingSeconds] = useState(durationMin * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [phaseRemaining, setPhaseRemaining] = useState(getPhases("box")[0].seconds);
  const [musicState, setMusicState] = useState(getMusicState());

  const phases = useMemo(() => getPhases(breathingMode), [breathingMode]);
  const breathingBackground =
    BREATHING_BACKGROUNDS.find((background) => background.id === breathingBackgroundId) ??
    BREATHING_BACKGROUNDS[0];

  useEffect(() => {
    initMusicState();
    return subscribeMusic(setMusicState);
  }, []);

  useEffect(() => {
    setRemainingSeconds(durationMin * 60);
    setIsRunning(false);
    setPhaseIndex(0);
    setPhaseRemaining(phases[0].seconds);
  }, [durationMin, toolMode, breathingMode, phases]);

  useEffect(() => {
    if (!isRunning) return;

    const interval = window.setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          window.clearInterval(interval);
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });

      if (toolMode === "breathing") {
        setPhaseRemaining((prev) => {
          if (prev <= 1) {
            setPhaseIndex((current) => {
              const next = (current + 1) % phases.length;
              return next;
            });
            const nextIndex = (phaseIndex + 1) % phases.length;
            return phases[nextIndex].seconds;
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => window.clearInterval(interval);
  }, [isRunning, toolMode, phases, phaseIndex]);

  const activePhase = phases[phaseIndex];

  const boxProgressSeconds = (durationMin * 60 - remainingSeconds) % BOX_CYCLE_SECONDS;
  const boxSegment = Math.floor(boxProgressSeconds / 4);
  const boxSegmentProgress = (boxProgressSeconds % 4) / 4;
  const boxStart = { x: 30, y: 30 };
  const boxEnd = { x: 210, y: 210 };
  const boxCoords = (() => {
    if (boxSegment === 0) {
      return { x: boxStart.x + (boxEnd.x - boxStart.x) * boxSegmentProgress, y: boxStart.y };
    }
    if (boxSegment === 1) {
      return { x: boxEnd.x, y: boxStart.y + (boxEnd.y - boxStart.y) * boxSegmentProgress };
    }
    if (boxSegment === 2) {
      return { x: boxEnd.x - (boxEnd.x - boxStart.x) * boxSegmentProgress, y: boxEnd.y };
    }
    return { x: boxStart.x, y: boxEnd.y - (boxEnd.y - boxStart.y) * boxSegmentProgress };
  })();

  const onStart = () => {
    if (remainingSeconds <= 0) {
      setRemainingSeconds(durationMin * 60);
      setPhaseIndex(0);
      setPhaseRemaining(phases[0].seconds);
    }
    setIsRunning(true);
  };

  const onPause = () => setIsRunning(false);

  const onReset = () => {
    setIsRunning(false);
    setRemainingSeconds(durationMin * 60);
    setPhaseIndex(0);
    setPhaseRemaining(phases[0].seconds);
  };

  return (
    <Layout>
      <style>{`
        @keyframes breathe-478 {
          0% { transform: scale(0.72); opacity: 0.78; }
          21.05% { transform: scale(1.0); opacity: 1; }
          57.89% { transform: scale(1.0); opacity: 0.95; }
          100% { transform: scale(0.72); opacity: 0.82; }
        }
      `}</style>
      <div className="mx-auto max-w-4xl space-y-6">
        <BackButton fallbackPath="/" />

        <header className="space-y-2 text-center">
          <h1 className="font-serif text-4xl md:text-5xl">Tools</h1>
          <p className="text-muted">Simple timer and guided breathing for calming and reconnection.</p>
        </header>

        <Card className="space-y-4">
          <p className="text-[11px] uppercase tracking-[0.2em] text-accent">Choose tool</p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setToolMode("timer")}
              className={`rounded-xl border px-4 py-2 text-sm font-semibold ${
                toolMode === "timer" ? "border-accent bg-accent/15" : "border-white/10 bg-white/5"
              }`}
            >
              Timer
            </button>
            <button
              type="button"
              onClick={() => setToolMode("breathing")}
              className={`rounded-xl border px-4 py-2 text-sm font-semibold ${
                toolMode === "breathing" ? "border-accent bg-accent/15" : "border-white/10 bg-white/5"
              }`}
            >
              Breathing
            </button>
          </div>

          <p className="text-[11px] uppercase tracking-[0.2em] text-accent">Duration</p>
          <div className="grid grid-cols-3 gap-2">
            {DURATION_OPTIONS.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setDurationMin(opt)}
                className={`rounded-xl border px-4 py-2 text-sm font-semibold ${
                  durationMin === opt ? "border-accent bg-accent/15" : "border-white/10 bg-white/5"
                }`}
              >
                {opt} min
              </button>
            ))}
          </div>

          {toolMode === "breathing" ? (
            <>
              <p className="text-[11px] uppercase tracking-[0.2em] text-accent">Breathing mode</p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setBreathingMode("box")}
                  className={`rounded-xl border px-4 py-2 text-sm font-semibold ${
                    breathingMode === "box" ? "border-accent bg-accent/15" : "border-white/10 bg-white/5"
                  }`}
                >
                  Box
                </button>
                <button
                  type="button"
                  onClick={() => setBreathingMode("478")}
                  className={`rounded-xl border px-4 py-2 text-sm font-semibold ${
                    breathingMode === "478" ? "border-accent bg-accent/15" : "border-white/10 bg-white/5"
                  }`}
                >
                  4-7-8
                </button>
              </div>

              <p className="text-[11px] uppercase tracking-[0.2em] text-accent">Calm background</p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {BREATHING_BACKGROUNDS.map((background) => (
                  <button
                    key={background.id}
                    type="button"
                    onClick={() => setBreathingBackgroundId(background.id)}
                    className={`overflow-hidden rounded-xl border px-2 py-2 text-xs font-semibold ${
                      breathingBackgroundId === background.id
                        ? "border-accent ring-2 ring-accent/35"
                        : "border-white/10"
                    }`}
                    aria-label={`Select ${background.label} breathing background`}
                  >
                    <span
                      className="mb-2 block h-12 w-full rounded-lg"
                      style={{ background: background.gradient }}
                    />
                    <span className="text-white/90">{background.label}</span>
                  </button>
                ))}
              </div>
            </>
          ) : null}
        </Card>

        <Card className="space-y-4">
          <p className="text-[11px] uppercase tracking-[0.2em] text-accent">Ambient Music</p>
          <p className="text-sm text-muted">
            Soft background sound for breathing, rituals, and quiet connection.
          </p>
          {musicState.error ? <p className="text-xs text-red-300">{musicState.error}</p> : null}
          <Button onClick={() => void toggleMusicPlayback()}>
            {musicState.isPlaying ? "Pause" : "Play"}
          </Button>
        </Card>

        <Card className="space-y-4 text-center">
          <p className="text-[11px] uppercase tracking-[0.2em] text-accent">
            {toolMode === "timer" ? "Session timer" : "Guided breathing"}
          </p>
          <p className="font-serif text-6xl leading-none">{formatClock(remainingSeconds)}</p>

          {toolMode === "breathing" ? (
            <div className="space-y-1">
              <p className="text-xl font-semibold text-accent">{activePhase.label}</p>
              <p className="text-sm text-muted">{phaseRemaining}s</p>
            </div>
          ) : null}

          <div
            className="relative mx-auto h-60 w-60 overflow-hidden rounded-3xl border border-white/15"
            style={{ background: breathingBackground.gradient }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/12 via-black/20 to-black/42" />

            {toolMode === "breathing" && breathingMode === "box" ? (
              <div className="absolute inset-0 grid place-items-center">
                <svg viewBox="0 0 240 240" className="h-52 w-52">
                  <rect x="30" y="30" width="180" height="180" rx="16" fill="none" stroke="rgba(230,185,128,0.45)" strokeWidth="2" />
                  <circle
                    cx={boxCoords.x}
                    cy={boxCoords.y}
                    r="8"
                    fill="#e6b980"
                    stroke="rgba(19,15,8,0.75)"
                    strokeWidth="1.5"
                    opacity={isRunning ? 1 : 0.85}
                  />
                </svg>
              </div>
            ) : null}

            {toolMode === "breathing" && breathingMode === "478" ? (
              <div className="absolute inset-0 grid place-items-center">
                <div
                  className="h-36 w-36 rounded-full bg-gradient-to-br from-[#e6b980] to-[#f6c77d]"
                  style={{
                    animation: `breathe-478 ${FOUR_SEVEN_EIGHT_SECONDS}s ease-in-out infinite`,
                    animationPlayState: isRunning ? "running" : "paused",
                  }}
                />
              </div>
            ) : null}
          </div>

          <div className="grid grid-cols-3 gap-2">
            <Button onClick={onStart} disabled={isRunning}>Start</Button>
            <Button variant="secondary" onClick={onPause} disabled={!isRunning}>Pause</Button>
            <Button variant="secondary" onClick={onReset}>Reset</Button>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
