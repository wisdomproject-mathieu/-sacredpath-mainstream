import Layout from "../components/Layout";
import Card from "../components/Card";
import Button from "../components/Button";

const promptDeck = [
  "What do I need most from you tonight to feel safe and close?",
  "What are we avoiding saying that could soften us if spoken gently?",
  "What small signal tells you I am truly present with you?",
];

export default function Oracle() {
  const hasPremium = typeof window !== "undefined" && window.localStorage.getItem("sacredpath-premium") === "true";

  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-6">
        <header className="text-center">
          <h1 className="font-serif text-4xl md:text-5xl">Intimacy Oracle</h1>
          <p className="text-muted mt-2">
            A reflective prompt engine that helps couples understand what is happening emotionally.
          </p>
        </header>

        <Card>
          <p className="text-[11px] uppercase tracking-[0.2em] text-accent mb-4">Daily card</p>
          <div className="space-y-3">
            {promptDeck.map((prompt) => (
              <p key={prompt} className="text-sm">{prompt}</p>
            ))}
          </div>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <Button>{hasPremium ? "Draw personalized oracle card" : "Draw limited daily card"}</Button>
            <Button variant="secondary">{hasPremium ? "Send prompt to partner" : "Unlock unlimited oracle"}</Button>
          </div>
        </Card>

        {hasPremium ? (
          <Card>
            <p className="text-sm text-muted">
              Premium unlocked: unlimited prompts, partner reflection questions, and weather-based recommendations.
            </p>
          </Card>
        ) : null}
      </div>
    </Layout>
  );
}
