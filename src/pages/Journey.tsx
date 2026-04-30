import Layout from "../components/Layout";
import Card from "../components/Card";
import Button from "../components/Button";
import BackButton from "../components/BackButton";
import SubscribeButton from "../components/SubscribeButton";
import { isPremium } from "../lib/premium";
import { useEffect, useState } from "react";

export default function Journey() {
  const hasPremium = isPremium();
  const [showDashboard, setShowDashboard] = useState(false);
  const [ritualInput, setRitualInput] = useState("");
  const [favoriteRituals, setFavoriteRituals] = useState<string[]>([]);
  const [photoItems, setPhotoItems] = useState<string[]>([]);
  const [dateInput, setDateInput] = useState("");
  const [specialDates, setSpecialDates] = useState<string[]>([]);
  const [note, setNote] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const storedRituals = JSON.parse(window.localStorage.getItem("sp-journey-favorite-rituals") ?? "[]");
      const storedPhotos = JSON.parse(window.localStorage.getItem("sp-journey-photos") ?? "[]");
      const storedDates = JSON.parse(window.localStorage.getItem("sp-journey-dates") ?? "[]");
      setFavoriteRituals(Array.isArray(storedRituals) ? storedRituals : []);
      setPhotoItems(Array.isArray(storedPhotos) ? storedPhotos : []);
      setSpecialDates(Array.isArray(storedDates) ? storedDates : []);
    } catch {
      setFavoriteRituals([]);
      setPhotoItems([]);
      setSpecialDates([]);
    }
  }, []);

  const persist = (key: string, value: unknown) => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  const addFavoriteRitual = () => {
    const value = ritualInput.trim();
    if (!value) return;
    const next = [value, ...favoriteRituals].slice(0, 30);
    setFavoriteRituals(next);
    persist("sp-journey-favorite-rituals", next);
    setRitualInput("");
  };

  const addDate = () => {
    if (!dateInput) return;
    if (specialDates.includes(dateInput)) return;
    const next = [...specialDates, dateInput].sort();
    setSpecialDates(next);
    persist("sp-journey-dates", next);
    setDateInput("");
  };

  const onAddPhoto: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const image = typeof reader.result === "string" ? reader.result : "";
      if (!image) return;
      const next = [image, ...photoItems].slice(0, 12);
      setPhotoItems(next);
      persist("sp-journey-photos", next);
    };
    reader.readAsDataURL(file);
    event.currentTarget.value = "";
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
              : "Shared dashboard is available to all couples for ritual and memory saving. Premium unlocks deeper insights and milestones."}
          </p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <Button onClick={() => setShowDashboard((v) => !v)}>
              {showDashboard ? "Hide shared dashboard" : "Open shared dashboard"}
            </Button>
            {!hasPremium ? <SubscribeButton source="journey" mode="navigate" /> : null}
          </div>
        </Card>

        {showDashboard ? (
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="space-y-3">
              <h2 className="font-serif text-2xl">Favorite rituals</h2>
              <div className="flex gap-2">
                <input
                  value={ritualInput}
                  onChange={(e) => setRitualInput(e.target.value)}
                  placeholder="Add ritual title..."
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
                />
                <Button variant="secondary" onClick={addFavoriteRitual}>Save</Button>
              </div>
              <div className="space-y-2">
                {favoriteRituals.length === 0 ? (
                  <p className="text-sm text-muted">No saved rituals yet.</p>
                ) : (
                  favoriteRituals.slice(0, 8).map((item, index) => (
                    <p key={`${item}-${index}`} className="text-sm">• {item}</p>
                  ))
                )}
              </div>
            </Card>

            <Card className="space-y-3">
              <h2 className="font-serif text-2xl">Whisper and gratitude notes</h2>
              <p className="text-sm text-muted">Placeholder for shared couple notes (full feature coming next).</p>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Write a whisper or gratitude note..."
                className="min-h-24 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
              />
            </Card>

            <Card className="space-y-3">
              <h2 className="font-serif text-2xl">Pictures in our Journey</h2>
              <p className="text-sm text-muted">Free and premium users can add photos here.</p>
              <input
                type="file"
                accept="image/*"
                onChange={onAddPhoto}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm file:mr-3 file:rounded-full file:border-0 file:bg-accent file:px-3 file:py-1 file:text-xs file:font-semibold file:text-[#130f08]"
              />
              <div className="grid grid-cols-3 gap-2">
                {photoItems.slice(0, 6).map((item, index) => (
                  <img
                    key={`${item.slice(0, 18)}-${index}`}
                    src={item}
                    alt={`Journey memory ${index + 1}`}
                    className="aspect-square w-full rounded-lg object-cover border border-white/10"
                  />
                ))}
              </div>
              {photoItems.length === 0 ? <p className="text-sm text-muted">No pictures yet.</p> : null}
            </Card>

            <Card className="space-y-3">
              <h2 className="font-serif text-2xl">Calendar placeholders</h2>
              <p className="text-sm text-muted">Add key dates for your relationship journey.</p>
              <div className="flex gap-2">
                <input
                  type="date"
                  value={dateInput}
                  onChange={(e) => setDateInput(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
                />
                <Button variant="secondary" onClick={addDate}>Add</Button>
              </div>
              <div className="space-y-2">
                {specialDates.length === 0 ? (
                  <p className="text-sm text-muted">No dates added yet.</p>
                ) : (
                  specialDates.slice(0, 10).map((date) => (
                    <p key={date} className="text-sm">• {date}</p>
                  ))
                )}
              </div>
            </Card>
          </div>
        ) : null}
      </div>
    </Layout>
  );
}
