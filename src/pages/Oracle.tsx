import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Card from "../components/Card";
import Button from "../components/Button";
import BackButton from "../components/BackButton";
import { isPremium } from "../lib/premium";
import { useSession } from "../contexts/SessionContext";
import {
  buildOracleReason,
  normalizeWeatherName,
  selectOracleCard,
} from "../lib/intimacyOracle";
import { intimacyOracleCards } from "../data/intimacyOracle";
import { synthesizeGuidedVoiceAudio } from "../lib/guidedVoiceTts";

const DAILY_KEY = "sacredpath-oracle-daily";
const RECENT_KEY = "sacredpath-oracle-recent";
const JOURNEY_KEY = "sacredpath-journey-oracle";

const QUESTION_HELPER =
  "Try: How can I reconnect tonight? What should I understand about my partner? What is blocking intimacy between us?";
const QUESTION_SUGGESTIONS = [
  "How can we reconnect tonight without pressure?",
  "What does my partner need from me emotionally right now?",
  "What is quietly blocking intimacy between us today?",
  "How can we repair tension and feel close again tonight?",
  "What one action would help us feel safer together tonight?",
];

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

export default function Oracle() {
  const navigate = useNavigate();
  const { state } = useSession();
  const hasPremium = isPremium();

  const [question, setQuestion] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [notice, setNotice] = useState("");
  const [revealedCardId, setRevealedCardId] = useState<string | null>(null);
  const [showQuestionPrompt, setShowQuestionPrompt] = useState(false);
  const [suggestedQuestion, setSuggestedQuestion] = useState(QUESTION_SUGGESTIONS[0]);
  const [voiceStatus, setVoiceStatus] = useState<"idle" | "playing" | "paused">("idle");
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const userWeather = normalizeWeatherName(state.youWeatherTone ?? state.youWeather);
  const partnerWeather = normalizeWeatherName(state.partnerWeatherTone ?? state.partnerWeather);

  const recentIds = useMemo(() => {
    if (typeof window === "undefined") return [] as string[];
    try {
      const parsed = JSON.parse(window.localStorage.getItem(RECENT_KEY) ?? "[]") as string[];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [] as string[];
    }
  }, [revealed]);

  const candidateCard = useMemo(
    () =>
      selectOracleCard({
      question,
      userWeather,
      partnerWeather,
      recentOracleCardIds: recentIds,
      isPremium: hasPremium,
    }),
    [question, userWeather, partnerWeather, recentIds, hasPremium],
  );

  const selectedCard = useMemo(() => {
    if (!revealedCardId) return candidateCard;
    return intimacyOracleCards.find((card) => card.id === revealedCardId) ?? candidateCard;
  }, [candidateCard, revealedCardId]);

  const reason = useMemo(
    () => buildOracleReason(selectedCard, question, userWeather, partnerWeather),
    [selectedCard, question, userWeather, partnerWeather],
  );

  const revealPath = () => {
    const trimmedQuestion = question.trim();
    if (!trimmedQuestion) {
      const pick = QUESTION_SUGGESTIONS[Math.floor(Math.random() * QUESTION_SUGGESTIONS.length)];
      setSuggestedQuestion(pick);
      setShowQuestionPrompt(true);
      return;
    }

    if (typeof window === "undefined") {
      setRevealed(true);
      return;
    }

    if (!hasPremium) {
      const raw = window.localStorage.getItem(DAILY_KEY);
      const parsed = raw ? (JSON.parse(raw) as { date: string; cardId: string; question: string } | null) : null;
      const today = todayKey();

      if (parsed && parsed.date === today) {
        setRevealedCardId(parsed.cardId);
        setNotice("Your free Oracle answer for today is already open.");
        setRevealed(true);
        return;
      }

      const chosen = selectOracleCard({
        question,
        userWeather,
        partnerWeather,
        recentOracleCardIds: recentIds,
      });

      window.localStorage.setItem(
        DAILY_KEY,
        JSON.stringify({
          date: today,
          cardId: chosen.id,
          question,
        }),
      );

      const nextRecent = [...recentIds.filter((id) => id !== chosen.id), chosen.id].slice(-10);
      window.localStorage.setItem(RECENT_KEY, JSON.stringify(nextRecent));
      setRevealedCardId(chosen.id);
    } else {
      const nextRecent = [...recentIds.filter((id) => id !== selectedCard.id), selectedCard.id].slice(-10);
      window.localStorage.setItem(RECENT_KEY, JSON.stringify(nextRecent));
      setRevealedCardId(selectedCard.id);
    }

    setNotice("");
    setRevealed(true);
  };

  const saveToJourney = () => {
    if (typeof window === "undefined") return;
    const payload = {
      date: new Date().toISOString(),
      question: question.trim(),
      cardTitle: selectedCard.title,
      message: selectedCard.message,
      action: selectedCard.action,
      userWeather: userWeather ?? null,
      partnerWeather: partnerWeather ?? null,
    };

    try {
      const existing = JSON.parse(window.localStorage.getItem(JOURNEY_KEY) ?? "[]") as Array<Record<string, unknown>>;
      const next = [payload, ...(Array.isArray(existing) ? existing : [])].slice(0, 100);
      window.localStorage.setItem(JOURNEY_KEY, JSON.stringify(next));
      setNotice("Saved to Our Journey.");
    } catch {
      window.localStorage.setItem(JOURNEY_KEY, JSON.stringify([payload]));
      setNotice("Saved to Our Journey.");
    }
  };

  const shareWithPartner = async () => {
    const text = `Our Intimacy Oracle today: ${selectedCard.title}. Tonight's action: ${selectedCard.action}`;
    if (typeof navigator === "undefined") return;

    if (navigator.share) {
      try {
        await navigator.share({ title: "Intimacy Oracle", text });
        setNotice("Shared with partner.");
        return;
      } catch {
        // user cancel or unsupported branch
      }
    }

    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      setNotice("Oracle message copied. Share it with your partner.");
      return;
    }

    setNotice("Sharing is not available right now.");
  };

  const openPaywall = () => navigate("/paywall?source=oracle");

  const summarizeQuestion = (raw: string) => {
    const words = raw.trim().split(/\s+/).filter(Boolean).slice(0, 8);
    if (!words.length) return "your question";
    return words.join(" ");
  };

  const stopOracleVoice = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    utteranceRef.current = null;
    setVoiceStatus("idle");
  };

  const startOracleVoice = async () => {
    if (typeof window === "undefined") {
      setNotice("Sacred Voice is not available right now. You can still read the ritual together.");
      return;
    }
    stopOracleVoice();
    setVoiceStatus("playing");

    const promptSummary = summarizeQuestion(question);
    const fullText = [
      "Hello love.",
      "Thank you for coming to the Intimacy Oracle.",
      `I can feel the heart of your question about ${promptSummary}.`,
      `I found a good ritual to practice with your partner. It is called ${selectedCard.title}.`,
      selectedCard.meaning,
      selectedCard.message,
      "Please sit comfortably now.",
      "Take one slow breath in, and a slower breath out.",
      `For you: ${selectedCard.forYou}`,
      `For your partner: ${selectedCard.forPartner}`,
      `Tonight's action: ${selectedCard.action}`,
      "Move slowly, and pause where it matters most.",
    ].join(" ... ");

    try {
      const tts = await synthesizeGuidedVoiceAudio({
        sessionId: `oracle-${selectedCard.id}-${Date.now()}`,
        text: fullText,
        voiceStyle: "calm",
      });
      const audio = new Audio(tts.audioUrl);
      audioRef.current = audio;
      audio.onended = () => setVoiceStatus("idle");
      audio.onerror = () => {
        setNotice("Sacred Voice is not available right now. You can still read the ritual together.");
        setVoiceStatus("idle");
      };
      await audio.play();
      return;
    } catch {
      // fallback below
    }

    if (!("speechSynthesis" in window)) {
      setNotice("Sacred Voice is not available right now. You can still read the ritual together.");
      setVoiceStatus("idle");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(fullText);
    utteranceRef.current = utterance;
    utterance.rate = 0.78;
    utterance.pitch = 0.95;
    utterance.volume = 1;
    const voices = window.speechSynthesis.getVoices();
    const preferred = ["Samantha", "Google UK English Female", "Karen", "Ava", "Google US English"];
    const selected = preferred
      .map((name) => voices.find((voice) => voice.name === name))
      .find(Boolean) ?? voices.find((voice) => voice.lang?.toLowerCase().startsWith("en"));
    if (selected) utterance.voice = selected;
    utterance.onend = () => setVoiceStatus("idle");
    utterance.onerror = () => {
      setNotice("Sacred Voice is not available right now. You can still read the ritual together.");
      setVoiceStatus("idle");
    };
    window.speechSynthesis.speak(utterance);
  };

  const pauseOracleVoice = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setVoiceStatus("paused");
      return;
    }
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.pause();
    setVoiceStatus("paused");
  };

  const resumeOracleVoice = () => {
    if (audioRef.current) {
      void audioRef.current.play();
      setVoiceStatus("playing");
      return;
    }
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    setVoiceStatus("playing");
    window.speechSynthesis.resume();
  };

  useEffect(() => () => stopOracleVoice(), []);

  return (
    <Layout>
      <div className="mx-auto max-w-4xl space-y-6">
        <BackButton fallbackPath="/" />

        <header className="text-center space-y-2">
          <h1 className="font-serif text-4xl md:text-5xl">Intimacy Oracle</h1>
          <p className="text-lg text-white/90">Ask what your relationship needs today.</p>
          <p className="text-sm text-muted">
            Receive one symbolic card, one clear message, and one simple action for reconnection.
          </p>
        </header>

        <Card className="space-y-3">
          <label htmlFor="oracle-question" className="text-xs uppercase tracking-[0.2em] text-accent">
            Your question
          </label>
          <textarea
            id="oracle-question"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="What do you want guidance on?"
            className="min-h-24 w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm outline-none ring-0 placeholder:text-white/50 focus:border-accent/60"
          />
          <p className="text-xs text-muted">{QUESTION_HELPER}</p>
          <Button onClick={revealPath}>Reveal Our Path</Button>
        </Card>

        {revealed ? (
          <Card className="space-y-4 border border-accent/30 bg-gradient-to-br from-[#f2c46d1f] to-[#e9826524]">
            <p className="text-[11px] uppercase tracking-[0.2em] text-accent">Oracle card</p>
            <h2 className="font-serif text-3xl">{selectedCard.title}</h2>
            <p className="text-sm text-muted">{selectedCard.meaning}</p>
            <p className="text-sm leading-relaxed">{selectedCard.message}</p>

            <div className="grid gap-3 md:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <p className="text-xs uppercase tracking-[0.18em] text-accent">For you</p>
                <p className="mt-1 text-sm">{selectedCard.forYou}</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <p className="text-xs uppercase tracking-[0.18em] text-accent">For your partner</p>
                <p className="mt-1 text-sm">{selectedCard.forPartner}</p>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-black/20 p-3">
              <p className="text-xs uppercase tracking-[0.18em] text-accent">Tonight&apos;s action</p>
              <p className="mt-1 text-sm leading-relaxed">{selectedCard.action}</p>
            </div>

            <p className="text-xs text-muted">{reason}</p>

            {!hasPremium ? (
              <div className="rounded-2xl border border-accent/30 bg-accent/10 p-4 space-y-3">
                <h3 className="font-serif text-2xl">Unlock the full ritual for both of you</h3>
                <p className="text-sm text-muted">
                  One subscription opens the deeper path for both partners: full ritual, Sacred Voice guidance, partner sharing, Journey saving, and deeper interpretation.
                </p>
                <button
                  type="button"
                  onClick={openPaywall}
                  className="w-full rounded-full bg-gradient-to-br from-[#e6b980] to-[#eacda3] px-6 py-3 font-semibold text-[#130f08] transition-opacity hover:opacity-90"
                >
                  Unlock Premium
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {selectedCard.premiumRitual ? (
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-2">
                    <p className="text-xs uppercase tracking-[0.18em] text-accent">Full ritual</p>
                    <p className="font-semibold">{selectedCard.premiumRitual.title}</p>
                    <div className="space-y-1 text-sm">
                      {selectedCard.premiumRitual.steps.map((step, idx) => (
                        <p key={idx}>
                          <span className="mr-2 text-accent font-semibold">{idx + 1}.</span>
                          {step}
                        </p>
                      ))}
                    </div>
                  </div>
                ) : null}

                <div className="grid gap-2 sm:grid-cols-2">
                  <Link
                    to="/ritual"
                    className="rounded-full border border-white/15 bg-white/5 px-4 py-3 text-center text-sm font-semibold hover:bg-white/10"
                  >
                    Start Full Ritual
                  </Link>
                  <button
                    type="button"
                    onClick={startOracleVoice}
                    className="rounded-full border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold hover:bg-white/10"
                  >
                    Listen with Sacred Voice
                  </button>
                  <button
                    type="button"
                    onClick={shareWithPartner}
                    className="rounded-full border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold hover:bg-white/10"
                  >
                    Share with Partner
                  </button>
                  <button
                    type="button"
                    onClick={saveToJourney}
                    className="rounded-full border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold hover:bg-white/10"
                  >
                    Save to Our Journey
                  </button>
                </div>
                <div className="grid gap-2 sm:grid-cols-3">
                  <button
                    type="button"
                    onClick={pauseOracleVoice}
                    disabled={voiceStatus !== "playing"}
                    className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold disabled:opacity-50"
                  >
                    Pause
                  </button>
                  <button
                    type="button"
                    onClick={resumeOracleVoice}
                    disabled={voiceStatus !== "paused"}
                    className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold disabled:opacity-50"
                  >
                    Resume
                  </button>
                  <button
                    type="button"
                    onClick={stopOracleVoice}
                    disabled={voiceStatus === "idle"}
                    className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold disabled:opacity-50"
                  >
                    Stop
                  </button>
                </div>
                <p className="text-xs text-muted">
                  Guided mode uses a calm voice with pauses between sentences.
                </p>
              </div>
            )}
          </Card>
        ) : null}

        {notice ? <p className="text-center text-xs text-muted">{notice}</p> : null}

        {showQuestionPrompt ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
            <div className="w-full max-w-lg rounded-3xl border border-white/15 bg-[#171224] p-5 shadow-2xl">
              <h3 className="font-serif text-2xl">No inspiration?</h3>
              <p className="mt-2 text-sm text-muted">
                Here is a suggestion for you:
              </p>
              <p className="mt-2 rounded-xl border border-white/10 bg-white/5 p-3 text-sm leading-relaxed">
                “{suggestedQuestion}”
              </p>
              <p className="mt-3 text-sm text-white/90">Ask Intimacy Oracle?</p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => {
                    setQuestion(suggestedQuestion);
                    setShowQuestionPrompt(false);
                  }}
                  className="rounded-full bg-gradient-to-br from-[#e6b980] to-[#eacda3] px-5 py-3 text-sm font-semibold text-[#130f08] hover:opacity-90"
                >
                  Use this question
                </button>
                <button
                  type="button"
                  onClick={() => setShowQuestionPrompt(false)}
                  className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold hover:bg-white/10"
                >
                  I&apos;ll write my own
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </Layout>
  );
}
