import { useMemo, useRef, useState } from "react";
import Layout from "../components/Layout";
import Card from "../components/Card";
import Button from "../components/Button";
import BackButton from "../components/BackButton";
import SubscribeButton from "../components/SubscribeButton";
import { isPremium } from "../lib/premium";

const PREMIUM_MODES = [
  { label: "3 min", detail: "Quick reset", value: 3 },
  { label: "5 min", detail: "Deeper guidance", value: 5 },
] as const;

const VOICE_STYLE_TEXT = {
  calm: "Speak slowly with long pauses and soft tone.",
  warm: "Speak with gentle warmth, closeness, and reassurance.",
  deep: "Speak low, steady, and grounded.",
} as const;

const FREE_PREVIEW_SCRIPT =
  "Tonight, pause before reaching for each other. Breathe together for three slow rounds. Let your body soften first, then speak one honest sentence. I am here with you.";

const buildPremiumScript = (minutes: 3 | 5, style: keyof typeof VOICE_STYLE_TEXT) =>
  `${VOICE_STYLE_TEXT[style]} Begin now. Sit facing each other and place one hand on your heart. Inhale slowly for four counts, exhale for six. Repeat this breath twelve times. ` +
  (minutes === 5
    ? "Then take turns sharing one truth, one need, and one appreciation. End with a full-body embrace and one clear invitation for tonight."
    : "Then share one truth and one appreciation. End with a long embrace and gratitude.");

export default function Voice() {
  const hasPremium = isPremium();
  const [mode, setMode] = useState<3 | 5>(3);
  const [style, setStyle] = useState<keyof typeof VOICE_STYLE_TEXT>("calm");
  const [status, setStatus] = useState<"idle" | "preview" | "playing" | "paused">("idle");
  const [showUpgradeBanner, setShowUpgradeBanner] = useState(false);
  const previewTimeoutRef = useRef<number | null>(null);

  const previewScript = useMemo(() => FREE_PREVIEW_SCRIPT, []);

  const stopSpeech = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    if (previewTimeoutRef.current) {
      window.clearTimeout(previewTimeoutRef.current);
      previewTimeoutRef.current = null;
    }
  };

  const speak = (text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return false;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.94;
    utterance.pitch = 1;
    utterance.onend = () => {
      if (status !== "paused") setStatus("idle");
    };
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    return true;
  };

  const onPlayPreview = () => {
    const started = speak(previewScript);
    if (!started) return;
    setStatus("preview");
    setShowUpgradeBanner(false);
    // Free preview is limited to 10 seconds.
    previewTimeoutRef.current = window.setTimeout(() => {
      stopSpeech();
      setStatus("idle");
      setShowUpgradeBanner(true);
    }, 10000);
  };

  const onPlayPremium = () => {
    const started = speak(buildPremiumScript(mode, style));
    if (!started) return;
    setStatus("playing");
    setShowUpgradeBanner(false);
  };

  const onPause = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.pause();
    setStatus("paused");
  };

  const onResume = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.resume();
    setStatus("playing");
  };

  const onStop = () => {
    stopSpeech();
    setStatus("idle");
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-6">
        <BackButton fallbackPath="/" />
        <header className="text-center">
          <h1 className="font-serif text-4xl md:text-5xl">Sacred Voice</h1>
          <p className="text-muted mt-2">Guided audio that reads rituals in a calm, intimate, app-native way.</p>
        </header>

        <div className="grid gap-4 md:grid-cols-2">
          {PREMIUM_MODES.map((item) => (
            <Card key={item.label} className={mode === item.value ? "ring-2 ring-accent/70" : ""}>
              <p className="text-[11px] uppercase tracking-[0.2em] text-accent mb-2">{item.label}</p>
              <p className="font-semibold">{item.detail}</p>
              <p className="text-sm text-muted mt-2">{hasPremium ? "Voice guidance enabled" : "3 min preview available"}</p>
              {hasPremium && (
                <button
                  onClick={() => setMode(item.value)}
                  className="mt-3 w-full rounded-full border border-white/20 bg-white/5 px-3 py-2 text-xs font-semibold"
                >
                  {mode === item.value ? "Selected" : "Choose"}
                </button>
              )}
            </Card>
          ))}
        </div>

        <Card>
          <h2 className="font-serif text-2xl mb-2">Tonight&apos;s guided ritual</h2>
          <p className="text-sm text-muted">
            {hasPremium
              ? "Choose voice style, session duration, and play full narration."
              : "Play a 10-second preview from the 3-minute guidance, then subscribe to unlock full Sacred Voice."}
          </p>
          {hasPremium && (
            <div className="mt-4 mb-4">
              <p className="text-xs uppercase tracking-[0.16em] text-accent mb-2">Voice style</p>
              <div className="grid gap-2 sm:grid-cols-3">
                {(["calm", "warm", "deep"] as const).map((voiceStyle) => (
                  <button
                    key={voiceStyle}
                    onClick={() => setStyle(voiceStyle)}
                    className={`rounded-full border px-3 py-2 text-sm font-semibold capitalize ${
                      style === voiceStyle ? "border-accent/80 bg-accent/15" : "border-white/20 bg-white/5"
                    }`}
                  >
                    {voiceStyle}
                  </button>
                ))}
              </div>
            </div>
          )}
          <p className="text-xs text-muted mb-4">
            {status === "preview" && "Preview playing (10 seconds)"}
            {status === "playing" && "Full guidance playing"}
            {status === "paused" && "Paused"}
            {status === "idle" && "Ready"}
          </p>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {!hasPremium ? (
              <>
                <Button onClick={onPlayPreview} aria-label="Play 10-second preview">Play 10s preview</Button>
                <SubscribeButton source="voice" mode="navigate" />
              </>
            ) : (
              <>
                <Button onClick={onPlayPremium} aria-label="Play full narration">Play full narration</Button>
                <Button variant="secondary" onClick={status === "paused" ? onResume : onPause} aria-label="Pause or resume narration">
                  {status === "paused" ? "Resume" : "Pause"}
                </Button>
              </>
            )}
          </div>
          {hasPremium && (
            <Button className="mt-2" variant="secondary" onClick={onStop} aria-label="Stop narration">
              Stop
            </Button>
          )}
          {showUpgradeBanner && !hasPremium && (
            <div className="mt-5 rounded-2xl border border-[#e7b881]/40 bg-gradient-to-r from-[#1b1410] via-[#261b14] to-[#1a130f] p-4">
              <p className="text-base font-semibold text-[#f6d3a6]">Want to hear more?</p>
              <p className="text-sm text-[#efd8bc] mt-1">Subscribe for two, only $29 per year.</p>
              <SubscribeButton source="voice" mode="navigate" className="mt-3" />
            </div>
          )}
        </Card>
      </div>
    </Layout>
  );
}
