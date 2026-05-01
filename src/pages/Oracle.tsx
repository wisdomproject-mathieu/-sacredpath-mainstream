import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { playGoogleTranslateSegment } from "../lib/googleTranslateTts";

const DAILY_KEY = "sacredpath-oracle-daily";
const RECENT_KEY = "sacredpath-oracle-recent";
const JOURNEY_KEY = "sacredpath-journey-oracle";
type OracleBackendProvider = "gemini" | "polly" | "google";
const ORACLE_PRIMARY_PROVIDER = (import.meta.env.VITE_ORACLE_PRIMARY_TTS_PROVIDER || "gemini").toLowerCase() as OracleBackendProvider;
const ORACLE_POLLY_VOICE_ID = import.meta.env.VITE_ORACLE_POLLY_VOICE_ID || "Kimberly";
const ORACLE_WAVENET_VOICE = import.meta.env.VITE_ORACLE_WAVENET_VOICE || "en-US-Wavenet-F";
const ORACLE_GEMINI_FALLBACK_MODEL =
  import.meta.env.VITE_ORACLE_GEMINI_TTS_MODEL || "gemini-3.1-flash-tts-preview";

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
  const speechSegmentsRef = useRef<Array<{ text: string; pauseAfterMs: number }>>([]);
  const segmentIndexRef = useRef(0);
  const voiceModeRef = useRef<"none" | "google" | "backend" | "browser">("none");
  const queueTimerRef = useRef<number | null>(null);

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

    let chosenCardForVoice = selectedCard;

    if (!hasPremium) {
      const raw = window.localStorage.getItem(DAILY_KEY);
      const parsed = raw ? (JSON.parse(raw) as { date: string; cardId: string; question: string } | null) : null;
      const today = todayKey();

      if (parsed && parsed.date === today) {
        const existingCard = intimacyOracleCards.find((card) => card.id === parsed.cardId);
        setRevealedCardId(parsed.cardId);
        setNotice("Your free Oracle answer for today is already open.");
        setRevealed(true);
        if (existingCard) {
          window.setTimeout(() => {
            void startOracleVoice(existingCard, question);
          }, 120);
        }
        return;
      }

      const chosen = selectOracleCard({
        question,
        userWeather,
        partnerWeather,
        recentOracleCardIds: recentIds,
      });
      chosenCardForVoice = chosen;

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
      chosenCardForVoice = selectedCard;
    }

    setNotice("");
    setRevealed(true);
    window.setTimeout(() => {
      void startOracleVoice(chosenCardForVoice, question);
    }, 120);
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

  const humanizeForVoice = (text: string) =>
    text
      .replace(/\s+/g, " ")
      .replace(/:\s*/g, ". ")
      .replace(/\.\s+/g, ". ... ")
      .trim();

  const stopOracleVoice = () => {
    if (queueTimerRef.current !== null) {
      window.clearTimeout(queueTimerRef.current);
      queueTimerRef.current = null;
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    utteranceRef.current = null;
    speechSegmentsRef.current = [];
    segmentIndexRef.current = 0;
    voiceModeRef.current = "none";
    setVoiceStatus("idle");
  };

  const getOracleSegments = (card = selectedCard, inputQuestion = question) => {
    const promptSummary = summarizeQuestion(inputQuestion);
    const baseSegments = [
      { text: "Hello love.", pauseAfterMs: 2800 },
      { text: "Thank you for coming to the Intimacy Oracle.", pauseAfterMs: 3200 },
      { text: `I can feel the heart of your question about ${promptSummary}.`, pauseAfterMs: 2600 },
      { text: `I found a good ritual to practice with your partner. It is called ${card.title}.`, pauseAfterMs: 4200 },
      { text: card.meaning, pauseAfterMs: 3800 },
      { text: card.message, pauseAfterMs: 5200 },
      { text: "Please sit comfortably now.", pauseAfterMs: 3000 },
      { text: "Take one slow breath in, and a slower breath out.", pauseAfterMs: 4200 },
      { text: `For you: ${card.forYou}`, pauseAfterMs: 3600 },
      { text: `For your partner: ${card.forPartner}`, pauseAfterMs: 3600 },
      { text: `Tonight's action: ${card.action}`, pauseAfterMs: 4200 },
    ];

    if (hasPremium && card.premiumRitual) {
      const ritualSegments = [
        { text: "Now we gently transition into your full ritual.", pauseAfterMs: 3000 },
        { text: `Full ritual: ${card.premiumRitual.title}.`, pauseAfterMs: 3200 },
        ...card.premiumRitual.steps.map((step, index) => ({
          text: `Step ${index + 1}. ${step}`,
          pauseAfterMs: 4200,
        })),
      ];
      return [
        ...baseSegments,
        ...ritualSegments,
        { text: "Move slowly, and pause where it matters most.", pauseAfterMs: 3200 },
      ];
    }

    return [
      ...baseSegments,
      { text: "If you want the full ritual guidance, you can unlock premium and continue together.", pauseAfterMs: 3200 },
      { text: "Move slowly, and pause where it matters most.", pauseAfterMs: 3200 },
    ];
  };

  const nextProvider = (provider: OracleBackendProvider): OracleBackendProvider | null => {
    if (provider === "gemini") return "polly";
    if (provider === "polly") return "google";
    return null;
  };

  const playBackendSegment = async (
    card = selectedCard,
    provider: OracleBackendProvider = ORACLE_PRIMARY_PROVIDER,
  ) => {
    if (voiceModeRef.current !== "backend") return;
    const segment = speechSegmentsRef.current[segmentIndexRef.current];
    if (!segment) {
      setVoiceStatus("idle");
      voiceModeRef.current = "none";
      return;
    }
    try {
      const tts = await synthesizeGuidedVoiceAudio({
        sessionId: `oracle-${card.id}-${Date.now()}-${segmentIndexRef.current}`,
        text: segment.text,
        voiceStyle: "calm",
        provider,
        voiceName: provider === "gemini" ? ORACLE_POLLY_VOICE_ID : ORACLE_WAVENET_VOICE,
        speakingRate: 0.84,
        pitch: -1.2,
        model: provider === "gemini" ? ORACLE_GEMINI_FALLBACK_MODEL : undefined,
        voiceId: provider === "polly" ? ORACLE_POLLY_VOICE_ID : undefined,
        format: provider === "polly" ? "mp3" : undefined,
      });
      if (voiceModeRef.current !== "backend") return;
      const audio = new Audio(tts.audioUrl);
      audioRef.current = audio;
      audio.onended = () => {
        if (voiceModeRef.current !== "backend") return;
        queueTimerRef.current = window.setTimeout(() => {
          if (voiceModeRef.current !== "backend") return;
          segmentIndexRef.current += 1;
          void playBackendSegment(card);
        }, segment.pauseAfterMs);
      };
      audio.onerror = () => {
        setNotice("Sacred Voice is not available right now. You can still read the ritual together.");
        setVoiceStatus("idle");
        voiceModeRef.current = "none";
      };
      await audio.play();
    } catch {
      const fallback = nextProvider(provider);
      if (fallback) {
        void playBackendSegment(card, fallback);
        return;
      }
      voiceModeRef.current = "google";
      void playGoogleSegment(card);
    }
  };

  const playGoogleSegment = async (card = selectedCard) => {
    if (voiceModeRef.current !== "google") return;
    const segment = speechSegmentsRef.current[segmentIndexRef.current];
    if (!segment) {
      setVoiceStatus("idle");
      voiceModeRef.current = "none";
      return;
    }

    try {
      const audio = await playGoogleTranslateSegment(humanizeForVoice(segment.text), {
        lang: "en",
        rate: 0.82,
        onEnded: () => {
          if (voiceModeRef.current !== "google") return;
          queueTimerRef.current = window.setTimeout(() => {
            if (voiceModeRef.current !== "google") return;
            segmentIndexRef.current += 1;
            void playGoogleSegment(card);
          }, segment.pauseAfterMs);
        },
        onError: () => {
          if (voiceModeRef.current !== "google") return;
          if (typeof window !== "undefined" && "speechSynthesis" in window) {
            voiceModeRef.current = "browser";
            playBrowserSegment();
            return;
          }
          setNotice("Sacred Voice is not available right now. You can still read the ritual together.");
          setVoiceStatus("idle");
          voiceModeRef.current = "none";
        },
      });
      audioRef.current = audio;
    } catch {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        voiceModeRef.current = "browser";
        playBrowserSegment();
        return;
      }
      setNotice("Sacred Voice is not available right now. You can still read the ritual together.");
      setVoiceStatus("idle");
      voiceModeRef.current = "none";
    }
  };

  const playBrowserSegment = () => {
    if (voiceModeRef.current !== "browser") return;
    const segment = speechSegmentsRef.current[segmentIndexRef.current];
    if (!segment) {
      setVoiceStatus("idle");
      voiceModeRef.current = "none";
      return;
    }
    const utterance = new SpeechSynthesisUtterance(segment.text);
    utteranceRef.current = utterance;
    utterance.rate = 0.68;
    utterance.pitch = 0.9;
    utterance.volume = 1;
    const voices = window.speechSynthesis.getVoices();
    const preferred = ["Samantha", "Google UK English Female", "Karen", "Ava", "Google US English"];
    const selected = preferred
      .map((name) => voices.find((voice) => voice.name === name))
      .find(Boolean) ?? voices.find((voice) => voice.lang?.toLowerCase().startsWith("en"));
    if (selected) utterance.voice = selected;
    utterance.onend = () => {
      if (voiceModeRef.current !== "browser") return;
      queueTimerRef.current = window.setTimeout(() => {
        if (voiceModeRef.current !== "browser") return;
        segmentIndexRef.current += 1;
        playBrowserSegment();
      }, segment.pauseAfterMs);
    };
    utterance.onerror = () => {
      setNotice("Sacred Voice is not available right now. You can still read the ritual together.");
      setVoiceStatus("idle");
      voiceModeRef.current = "none";
    };
    window.speechSynthesis.speak(utterance);
  };

  const startOracleVoice = async (card = selectedCard, inputQuestion = question) => {
    if (typeof window === "undefined") {
      setNotice("Sacred Voice is not available right now. You can still read the ritual together.");
      return;
    }
    stopOracleVoice();
    setVoiceStatus("playing");
    speechSegmentsRef.current = getOracleSegments(card, inputQuestion);
    segmentIndexRef.current = 0;

    voiceModeRef.current = "backend";
    void playBackendSegment(card);
  };

  const pauseOracleVoice = () => {
    if (queueTimerRef.current !== null) {
      window.clearTimeout(queueTimerRef.current);
      queueTimerRef.current = null;
    }
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
    if (voiceModeRef.current === "backend" && !audioRef.current) {
      setVoiceStatus("playing");
      void playBackendSegment();
      return;
    }
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
                  <button
                    type="button"
                    onClick={() => void startOracleVoice(selectedCard, question)}
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
