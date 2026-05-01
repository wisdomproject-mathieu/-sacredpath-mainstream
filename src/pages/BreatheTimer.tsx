import { useEffect, useMemo, useState } from "react";
import Layout from "../components/Layout";
import Card from "../components/Card";
import Button from "../components/Button";
import BackButton from "../components/BackButton";

type ToolMode = "timer" | "breathing";
type BreathingMode = "box" | "478";

type BreathPhase = {
  label: string;
  seconds: number;
};

const DURATION_OPTIONS = [3, 5, 10] as const;

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

export default function BreatheTimer() {
  const [toolMode, setToolMode] = useState<ToolMode>("timer");
  const [durationMin, setDurationMin] = useState<(typeof DURATION_OPTIONS)[number]>(3);
  const [breathingMode, setBreathingMode] = useState<BreathingMode>("box");
  const [remainingSeconds, setRemainingSeconds] = useState(durationMin * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [phaseRemaining, setPhaseRemaining] = useState(getPhases("box")[0].seconds);

  const phases = useMemo(() => getPhases(breathingMode), [breathingMode]);

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
      <div className="mx-auto max-w-4xl space-y-6">
        <BackButton fallbackPath="/" />

        <header className="text-center space-y-2">
          <h1 className="font-serif text-4xl md:text-5xl">Breathing & Timer</h1>
          <p className="text-muted">Simple guided time tools for regulation, grounding, and reconnection.</p>
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
            </>
          ) : null}
        </Card>

        <Card className="text-center space-y-4">
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
