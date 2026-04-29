import { useMemo, useState } from "react";
import Layout from "../components/Layout";
import Card from "../components/Card";
import Button from "../components/Button";
import BackButton from "../components/BackButton";
import SubscribeButton from "../components/SubscribeButton";
import { isPremium } from "../lib/premium";

const ORACLE_DAY_KEY = "sacredpath-oracle-day";
const ORACLE_CARD_KEY = "sacredpath-oracle-card";

const promptDeck = [
  "What do I need most from you tonight to feel safe and close?",
  "What are we avoiding saying that could soften us if spoken gently?",
  "What small signal tells you I am truly present with you?",
  "What pace would help us both feel connected right now?",
  "What one sentence could repair tension between us tonight?",
];

export default function Oracle() {
  const hasPremium = isPremium();
  const [index, setIndex] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const today = new Date().toISOString().slice(0, 10);

  const currentPrompt = useMemo(() => {
    if (index === null) return null;
    return promptDeck[index % promptDeck.length];
  }, [index]);

  const drawCard = () => {
    if (hasPremium) {
      const next = Math.floor(Math.random() * promptDeck.length);
      setIndex(next);
      setMessage("");
      return;
    }

    const savedDay = typeof window !== "undefined" ? window.localStorage.getItem(ORACLE_DAY_KEY) : null;
    const savedIndexRaw = typeof window !== "undefined" ? window.localStorage.getItem(ORACLE_CARD_KEY) : null;

    if (savedDay === today && savedIndexRaw !== null) {
      setIndex(Number(savedIndexRaw));
      setMessage("Your free oracle card for today is already open.");
      return;
    }

    const next = Math.floor(Math.random() * promptDeck.length);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(ORACLE_DAY_KEY, today);
      window.localStorage.setItem(ORACLE_CARD_KEY, String(next));
    }
    setIndex(next);
    setMessage("");
  };

  const savePromptForPartner = () => {
    if (!currentPrompt || typeof window === "undefined") return;
    const key = "sacredpath-partner-prompts";
    const prev = JSON.parse(window.localStorage.getItem(key) ?? "[]") as string[];
    window.localStorage.setItem(key, JSON.stringify([currentPrompt, ...prev].slice(0, 50)));
    setMessage("Saved for your partner space.");
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-6">
        <BackButton fallbackPath="/" />
        <header className="text-center">
          <h1 className="font-serif text-4xl md:text-5xl">Intimacy Oracle</h1>
          <p className="text-muted mt-2">
            A reflective prompt engine that helps couples understand what is happening emotionally.
          </p>
        </header>

        <Card>
          <p className="text-[11px] uppercase tracking-[0.2em] text-accent mb-4">Daily card</p>
          <div className="space-y-3">
            {currentPrompt ? <p className="text-base">{currentPrompt}</p> : <p className="text-sm text-muted">Draw a card to receive your prompt.</p>}
          </div>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <Button onClick={drawCard}>{hasPremium ? "Draw personalized oracle card" : "Draw limited daily card"}</Button>
            {hasPremium ? <Button variant="secondary" onClick={savePromptForPartner}>Send prompt to partner</Button> : <SubscribeButton source="oracle" mode="navigate" />}
          </div>
          {message ? <p className="mt-3 text-xs text-muted">{message}</p> : null}
        </Card>
      </div>
    </Layout>
  );
}

