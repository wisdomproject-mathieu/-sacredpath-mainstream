import Layout from "../components/Layout";
import Card from "../components/Card";
import Button from "../components/Button";

export default function Journey() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-6">
        <header className="text-center">
          <h1 className="font-serif text-4xl md:text-5xl">Intimacy Journey</h1>
          <p className="text-muted mt-2">Shared progress, streaks, saved rituals, and milestones for both partners.</p>
        </header>
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <p className="text-[11px] uppercase tracking-[0.2em] text-accent mb-2">Daily streak</p>
            <p className="font-serif text-3xl">7 days</p>
          </Card>
          <Card>
            <p className="text-[11px] uppercase tracking-[0.2em] text-accent mb-2">Completed rituals</p>
            <p className="font-serif text-3xl">24</p>
          </Card>
          <Card>
            <p className="text-[11px] uppercase tracking-[0.2em] text-accent mb-2">Saved moments</p>
            <p className="font-serif text-3xl">12</p>
          </Card>
        </div>
        <Card>
          <p className="text-sm text-muted">
            Premium unlocks deeper history, combination insights, repair milestones, and your shared relationship dashboard.
          </p>
          <Button className="mt-4">Unlock full Journey for both of you</Button>
        </Card>
      </div>
    </Layout>
  );
}
