import Layout from "../components/Layout";
import Card from "../components/Card";
import Button from "../components/Button";

export default function Journey() {
  const hasPremium = typeof window !== "undefined" && window.localStorage.getItem("sacredpath-premium") === "true";

  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-6">
        <header className="text-center">
          <h1 className="font-serif text-4xl md:text-5xl">Intimacy Journey</h1>
          <p className="text-muted mt-2">
            A shared progress layer for the couple: streaks, completed rituals, saved reflections, and repair milestones.
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <p className="text-[11px] uppercase tracking-[0.2em] text-accent mb-2">Streak</p>
            <p className="font-serif text-3xl">{hasPremium ? "21" : "7"}</p>
          </Card>
          <Card>
            <p className="text-[11px] uppercase tracking-[0.2em] text-accent mb-2">Completed</p>
            <p className="font-serif text-3xl">{hasPremium ? "58" : "24"}</p>
          </Card>
          <Card>
            <p className="text-[11px] uppercase tracking-[0.2em] text-accent mb-2">Saved reflections</p>
            <p className="font-serif text-3xl">{hasPremium ? "34" : "8"}</p>
          </Card>
          <Card>
            <p className="text-[11px] uppercase tracking-[0.2em] text-accent mb-2">Repair milestones</p>
            <p className="font-serif text-3xl">{hasPremium ? "9" : "2"}</p>
          </Card>
        </div>

        <Card>
          <p className="text-sm text-muted">
            {hasPremium
              ? "Premium active for both partners. Shared dashboard, history, and milestones are unlocked."
              : "Premium unlocks the full shared dashboard for both connected partners with progress map, milestones, and deeper history."}
          </p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <Button>{hasPremium ? "Open shared dashboard" : "Unlock full Journey for both of you"}</Button>
            <Button variant="secondary">{hasPremium ? "Export memory timeline" : "See premium benefits"}</Button>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
