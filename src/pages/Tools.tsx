import { useEffect, useMemo, useState } from "react";
import type { ChangeEventHandler } from "react";
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

const FRAME_SIZES = [
  { id: "compact", label: "Compact", className: "h-60 w-60" },
  { id: "balanced", label: "Balanced", className: "h-72 w-72" },
  { id: "immersive", label: "Immersive", className: "h-80 w-80" },
] as const;

type FrameSizeId = (typeof FRAME_SIZES)[number]["id"];

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
  const [selectedPhotoId, setSelectedPhotoId] = useState<string>("");
  const [photoItems, setPhotoItems] = useState<Array<{ id: string; src: string }>>([]);
  const [frameSize, setFrameSize] = useState<FrameSizeId>("balanced");
  const [remainingSeconds, setRemainingSeconds] = useState(durationMin * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [phaseRemaining, setPhaseRemaining] = useState(getPhases("box")[0].seconds);
  const [musicState, setMusicState] = useState(getMusicState());

  const phases = useMemo(() => getPhases(breathingMode), [breathingMode]);
  const frameSizeClass = FRAME_SIZES.find((size) => size.id === frameSize)?.className ?? "h-72 w-72";
  const selectedPhoto = photoItems.find((item) => item.id === selectedPhotoId)?.src;

  useEffect(() => {
    initMusicState();
    return subscribeMusic(setMusicState);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const storedPhotos = JSON.parse(window.localStorage.getItem("sp-journey-photos") ?? "[]");
      const normalized = Array.isArray(storedPhotos)
        ? storedPhotos
            .map((item: unknown, index: number) =>
              typeof item === "string"
                ? { id: `legacy-${index}`, src: item }
                : (item as { id?: string; src?: string }),
            )
            .filter((item: { id?: string; src?: string }) => typeof item.id === "string" && typeof item.src === "string")
            .map((item: { id: string; src: string }) => ({ id: item.id, src: item.src }))
        : [];
      setPhotoItems(normalized.slice(0, 12));
      if (normalized[0]?.id) setSelectedPhotoId(normalized[0].id);
    } catch {
      setPhotoItems([]);
    }
  }, []);

  const onAddPhoto: ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const image = typeof reader.result === "string" ? reader.result : "";
      if (!image) return;
      const next = [{ id: `photo-${Date.now()}`, src: image }, ...photoItems].slice(0, 12);
      setPhotoItems(next);
      setSelectedPhotoId(next[0].id);
      if (typeof window !== "undefined") {
        window.localStorage.setItem("sp-journey-photos", JSON.stringify(next));
      }
    };
    reader.readAsDataURL(file);
    event.currentTarget.value = "";
  };

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

              <p className="text-[11px] uppercase tracking-[0.2em] text-accent">Picture selector</p>
              <input
                type="file"
                accept="image/*"
                onChange={onAddPhoto}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm file:mr-3 file:rounded-full file:border-0 file:bg-accent file:px-3 file:py-1 file:text-xs file:font-semibold file:text-[#130f08]"
              />
              <div className="grid grid-cols-3 gap-2">
                {photoItems.length === 0 ? (
                  <p className="col-span-3 text-sm text-muted">
                    Add a picture to personalize your breathing square.
                  </p>
                ) : null}
                {photoItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedPhotoId(item.id)}
                    className={`overflow-hidden rounded-xl border px-2 py-2 text-xs font-semibold ${
                      selectedPhotoId === item.id
                        ? "border-accent ring-2 ring-accent/35"
                        : "border-white/10"
                    }`}
                    aria-label="Select breathing picture"
                  >
                    <img
                      src={item.src}
                      alt="Breathing focus"
                      className="h-12 w-full rounded-lg object-cover"
                    />
                  </button>
                ))}
              </div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-accent">Frame size</p>
              <div className="grid grid-cols-3 gap-2">
                {FRAME_SIZES.map((size) => (
                  <button
                    key={size.id}
                    type="button"
                    onClick={() => setFrameSize(size.id)}
                    className={`rounded-xl border px-3 py-2 text-xs font-semibold ${
                      frameSize === size.id ? "border-accent bg-accent/15" : "border-white/10 bg-white/5"
                    }`}
                  >
                    {size.label}
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
            className={`relative mx-auto overflow-hidden rounded-3xl border border-white/15 ${frameSizeClass}`}
            style={{ background: "linear-gradient(135deg, #221934 0%, #101626 100%)" }}
          >
            {selectedPhoto ? (
              <img
                src={selectedPhoto}
                alt="Selected breathing focus"
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : null}
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
