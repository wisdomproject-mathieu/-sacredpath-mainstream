import Layout from "../components/Layout";
import Card from "../components/Card";
import Button from "../components/Button";

const modes = [
  { label: "3 min", detail: "Quick reset" },
  { label: "8 min", detail: "Balanced guidance" },
  { label: "20 min", detail: "Deep session" },
];

export default function Voice() {
  const hasPremium = typeof window !== "undefined" && window.localStorage.getItem("sacredpath-premium") === "true";

  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-6">
        <header className="text-center">
          <h1 className="font-serif text-4xl md:text-5xl">Sacred Voice</h1>
          <p className="text-muted mt-2">Guided audio that reads rituals in a calm, intimate, app-native way.</p>
        </header>

        <div className="grid gap-4 md:grid-cols-3">
          {modes.map((mode) => (
            <Card key={mode.label}>
              <p className="text-[11px] uppercase tracking-[0.2em] text-accent mb-2">{mode.label}</p>
              <p className="font-semibold">{mode.detail}</p>
              <p className="text-sm text-muted mt-2">{hasPremium ? "Voice guidance enabled" : "Preview available"}</p>
            </Card>
          ))}
        </div>

        <Card>
          <h2 className="font-serif text-2xl mb-2">Tonight&apos;s guided ritual</h2>
          <p className="text-sm text-muted">
            {hasPremium
              ? "Choose voice style, session duration, and play full narration. Save this ritual to Journey when complete."
              : "Play a short preview now. Unlock full guided sessions, voice selection, and save-to-journey flow with premium."}
          </p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <Button>{hasPremium ? "Play full narration" : "Play short preview"}</Button>
            <Button variant="secondary">{hasPremium ? "Save to Journey" : "Unlock full Sacred Voice"}</Button>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
