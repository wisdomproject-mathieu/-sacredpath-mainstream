import Layout from "../components/Layout";
import Card from "../components/Card";
import Button from "../components/Button";

const prompts = [
  "What does your body most need from me tonight?",
  "Where do you feel closest to me right now, and where do you feel far?",
  "What is one tiny thing we can do in the next 10 minutes to reconnect?",
];

export default function Oracle() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        <header className="text-center">
          <h1 className="font-serif text-4xl md:text-5xl">Intimacy Oracle</h1>
          <p className="text-muted mt-2">Reflective prompts and emotional insight cards for couples.</p>
        </header>
        <Card>
          <p className="text-[11px] uppercase tracking-[0.2em] text-accent mb-4">Daily insight</p>
          <div className="space-y-3">
            {prompts.map((prompt) => (
              <p key={prompt} className="text-sm">{prompt}</p>
            ))}
          </div>
          <Button variant="secondary" className="mt-5">Unlock unlimited oracle prompts</Button>
        </Card>
      </div>
    </Layout>
  );
}
