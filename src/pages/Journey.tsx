import Layout from "../components/Layout";
import Card from "../components/Card";
import Button from "../components/Button";
import BackButton from "../components/BackButton";
import SubscribeButton from "../components/SubscribeButton";
import { isPremium } from "../lib/premium";
import { useState } from "react";

export default function Journey() {
  const hasPremium = isPremium();
  const [showDashboard, setShowDashboard] = useState(false);

  const exportTimeline = () => {
    if (typeof window === "undefined") return;
    const payload = {
      exportedAt: new Date().toISOString(),
      streak: 21,
      completedRituals: 58,
      reflections: 34,
      milestones: 9,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sacred-path-journey-timeline.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-6">
        <BackButton fallbackPath="/" />
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
          {hasPremium ? (
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <Button onClick={() => setShowDashboard((v) => !v)}>
                {showDashboard ? "Hide shared dashboard" : "Open shared dashboard"}
              </Button>
              <Button variant="secondary" onClick={exportTimeline}>Export memory timeline</Button>
            </div>
          ) : (
            <div className="mt-4">
              <SubscribeButton source="journey" mode="navigate" />
            </div>
          )}
        </Card>

        {hasPremium && showDashboard ? (
          <Card>
            <h2 className="font-serif text-2xl">Shared dashboard</h2>
            <p className="text-sm text-muted mt-2">
              Your shared rhythm, saved reflections, and milestones are available in premium mode.
            </p>
          </Card>
        ) : null}
      </div>
    </Layout>
  );
}
