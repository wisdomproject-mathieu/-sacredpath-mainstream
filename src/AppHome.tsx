import { useMemo } from "react";

const cards = [
  {
    id: "tantra",
    title: "Learn tantra, tao and more",
    subtitle: "A calmer way to begin the day",
    body: "Open the app with one clear doorway instead of duplicate setup text. This version removes the Enter your Names block and focuses the home screen on one premium action.",
    path: "Daily learning",
    teacher: "Sacred Path",
    linkLabel: "Explore now",
  },
  {
    id: "ritual",
    title: "One ritual, one path",
    subtitle: "Less friction, more presence",
    body: "Use the home screen to guide the next step instead of repeating setup prompts. The layout is intentionally simple so it reads as a real product screen, not a placeholder.",
    path: "Daily ritual",
    teacher: "Couples practice",
    linkLabel: "Open ritual",
  },
  {
    id: "wisdom",
    title: "Lineage and learning",
    subtitle: "A better first impression",
    body: "The home now introduces the app with a teaching-oriented call to action. That makes the page feel aligned with tantra, tao, and deeper relationship learning.",
    path: "Wisdom path",
    teacher: "Lineage",
    linkLabel: "Continue",
  },
];

function pickCard() {
  const today = new Date();
  const seed = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  return cards[hash % cards.length];
}

export default function AppHome() {
  const card = useMemo(() => pickCard(), []);

  return (
    <main className="min-h-screen bg-background text-foreground px-4 py-8 md:py-10">
      <div className="mx-auto max-w-6xl space-y-6">
        <section className="overflow-hidden rounded-[28px] border border-border bg-card shadow-sm">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
            <div className="p-6 md:p-8 lg:p-10">
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.24em] text-primary">
                Sacred Path for Couples
              </p>
              <h1 className="mb-4 max-w-3xl text-3xl font-semibold leading-tight md:text-4xl lg:text-5xl">
                Daily Sacred Starter for Modern Couples
              </h1>
              <p className="mb-6 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                A cleaner home screen that removes duplicate name-entry text and replaces the weather CTA with a more
                intentional invitation.
              </p>

              <div className="flex flex-wrap gap-3">
                <button className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90">
                  Learn tantra, tao and more
                </button>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-border bg-background/70 p-4">
                  <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-primary">Removed</p>
                  <p className="text-sm font-medium text-foreground">Enter your Names</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    This duplication is no longer shown on the home screen.
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-background/70 p-4">
                  <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-primary">Action</p>
                  <p className="text-sm font-medium text-foreground">One clear CTA</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    The button now points to tantra, tao, and deeper learning.
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-background/70 p-4">
                  <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-primary">Mood</p>
                  <p className="text-sm font-medium text-foreground">Premium and calm</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    The home screen starts with guidance rather than setup clutter.
                  </p>
                </div>
              </div>
            </div>

            <aside className="border-t border-border bg-muted/20 p-6 md:p-8 lg:border-l lg:border-t-0 lg:p-10">
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.24em] text-primary">
                {card.title}
              </p>
              <div className="rounded-[24px] border border-border bg-background/90 p-5 md:p-6">
                <p className="mb-3 text-[11px] uppercase tracking-[0.18em] text-primary">Today&apos;s doorway</p>
                <h2 className="mb-3 text-2xl leading-tight md:text-3xl font-semibold text-foreground">
                  {card.subtitle}
                </h2>
                <p className="mb-5 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {card.body}
                </p>
                <div className="mb-5 flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-xs text-foreground">
                    {card.path}
                  </span>
                  <span className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-xs text-foreground">
                    {card.teacher}
                  </span>
                </div>
                <button className="inline-flex items-center justify-center rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition hover:bg-muted/40">
                  {card.linkLabel}
                </button>
              </div>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}
