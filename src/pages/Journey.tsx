import Layout from "../components/Layout";
import Card from "../components/Card";
import Button from "../components/Button";
import BackButton from "../components/BackButton";
import SubscribeButton from "../components/SubscribeButton";
import { isPremium } from "../lib/premium";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { ChangeEventHandler } from "react";

type DateEntry = {
  id: string;
  date: string;
  note: string;
};

type OracleEntry = {
  date: string;
  question: string;
  cardTitle: string;
  message: string;
  action: string;
  userWeather?: string | null;
  partnerWeather?: string | null;
};

export default function Journey() {
  const [searchParams] = useSearchParams();
  const hasPremium = isPremium();
  const [showDashboard, setShowDashboard] = useState(false);
  const [ritualInput, setRitualInput] = useState("");
  const [favoriteRituals, setFavoriteRituals] = useState<string[]>([]);
  const [photoItems, setPhotoItems] = useState<Array<{ id: string; src: string }>>([]);
  const [dateInput, setDateInput] = useState("");
  const [dateNoteInput, setDateNoteInput] = useState("");
  const [specialDates, setSpecialDates] = useState<DateEntry[]>([]);
  const [note, setNote] = useState("");
  const [savedNotes, setSavedNotes] = useState<string[]>([]);
  const [oracleEntries, setOracleEntries] = useState<OracleEntry[]>([]);
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const storedRituals = JSON.parse(window.localStorage.getItem("sp-journey-favorite-rituals") ?? "[]");
      const storedPhotos = JSON.parse(window.localStorage.getItem("sp-journey-photos") ?? "[]");
      const storedDates = JSON.parse(window.localStorage.getItem("sp-journey-dates") ?? "[]");
      const storedNotes = JSON.parse(window.localStorage.getItem("sp-journey-notes") ?? "[]");
      const storedOracle = JSON.parse(window.localStorage.getItem("sacredpath-journey-oracle") ?? "[]");
      setFavoriteRituals(Array.isArray(storedRituals) ? storedRituals : []);
      setSavedNotes(Array.isArray(storedNotes) ? storedNotes : []);
      setOracleEntries(Array.isArray(storedOracle) ? storedOracle : []);
      const normalizedPhotos = Array.isArray(storedPhotos)
        ? storedPhotos
            .map((item: unknown, index: number) =>
              typeof item === "string"
                ? { id: `legacy-${index}`, src: item }
                : (item as { id: string; src: string }),
            )
            .filter((item: { id?: string; src?: string }) => typeof item?.id === "string" && typeof item?.src === "string")
        : [];
      setPhotoItems(normalizedPhotos);

      const normalizedDates = Array.isArray(storedDates)
        ? storedDates
            .map((item: unknown, index: number) => {
              if (typeof item === "string") {
                return { id: `legacy-date-${index}`, date: item, note: "" };
              }
              const candidate = item as { id?: string; date?: string; note?: string };
              return {
                id: candidate.id ?? `date-${index}`,
                date: candidate.date ?? "",
                note: candidate.note ?? "",
              };
            })
            .filter((entry: DateEntry) => Boolean(entry.date))
        : [];
      setSpecialDates(normalizedDates);
    } catch {
      setFavoriteRituals([]);
      setPhotoItems([]);
      setSpecialDates([]);
      setSavedNotes([]);
      setOracleEntries([]);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const incoming = searchParams.get("incomingNote");
    if (!incoming) return;
    const decoded = decodeURIComponent(incoming);
    setNote((prev) => (prev ? `${prev}\n\n${decoded}` : decoded));
  }, [searchParams]);

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
    setToast("Saved to Favorite rituals.");
    window.setTimeout(() => setToast(""), 1800);
  };

  const addDate = () => {
    if (!dateInput) return;
    const entry: DateEntry = {
      id: `${dateInput}-${Date.now()}`,
      date: dateInput,
      note: dateNoteInput.trim(),
    };
    const exists = specialDates.some((item) => item.date === entry.date && item.note === entry.note);
    if (exists) return;
    const next = [...specialDates, entry].sort((a, b) => a.date.localeCompare(b.date));
    setSpecialDates(next);
    persist("sp-journey-dates", next);
    setDateInput("");
    setDateNoteInput("");
    setToast("Date saved.");
    window.setTimeout(() => setToast(""), 1800);
  };

  const onAddPhoto: ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const image = typeof reader.result === "string" ? reader.result : "";
      if (!image) return;
      const next = [{ id: `photo-${Date.now()}`, src: image }, ...photoItems].slice(0, 12);
      setPhotoItems(next);
      persist("sp-journey-photos", next);
      setToast("Picture saved.");
      window.setTimeout(() => setToast(""), 1800);
    };
    reader.readAsDataURL(file);
    event.currentTarget.value = "";
  };

  const deletePhoto = (id: string) => {
    const next = photoItems.filter((item) => item.id !== id);
    setPhotoItems(next);
    persist("sp-journey-photos", next);
    setToast("Picture removed.");
    window.setTimeout(() => setToast(""), 1800);
  };

  const removeDate = (id: string) => {
    const next = specialDates.filter((item) => item.id !== id);
    setSpecialDates(next);
    persist("sp-journey-dates", next);
    setToast("Date removed.");
    window.setTimeout(() => setToast(""), 1800);
  };

  const sendWhatsApp = () => {
    const message = note.trim()
      ? `Your beloved one is sending you this: "${note.trim()}". Click this link to save it to your dashboard together with pictures, important dates, and start browsing the larger intimacy repository ever built on SacredPath: ${window.location.origin}${import.meta.env.BASE_URL}journey?incomingNote=${encodeURIComponent(note.trim())}`
      : `Your beloved one is sending you a love note. Click this link to save it to your dashboard together with pictures, important dates, and start browsing the larger intimacy repository ever built on SacredPath: ${window.location.origin}${import.meta.env.BASE_URL}journey`;
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const saveWhisperNote = () => {
    const trimmed = note.trim();
    if (!trimmed) return;
    const next = [trimmed, ...savedNotes].slice(0, 40);
    setSavedNotes(next);
    persist("sp-journey-notes", next);
    setToast("Secret note saved.");
    window.setTimeout(() => setToast(""), 1800);
  };

  const removeSavedNote = (value: string) => {
    const next = savedNotes.filter((item) => item !== value);
    setSavedNotes(next);
    persist("sp-journey-notes", next);
    setToast("Secret note removed.");
    window.setTimeout(() => setToast(""), 1800);
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-6">
        {toast ? (
          <div className="fixed left-1/2 top-4 z-50 -translate-x-1/2 rounded-full border border-accent/40 bg-[#161126]/95 px-4 py-2 text-xs text-accent shadow-lg">
            {toast}
          </div>
        ) : null}
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
              : "Your Journey dashboard is personal: save rituals, prepare notes, store pictures, and remember key dates. Premium unlocks deeper insights and milestones."}
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
              <p className="text-sm text-muted">Prepare private notes here, then send them to your beloved one through WhatsApp.</p>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Write a whisper or gratitude note..."
                className="min-h-24 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
              />
              <Button variant="secondary" onClick={saveWhisperNote}>
                Add secret note
              </Button>
              <button
                type="button"
                onClick={sendWhatsApp}
                className="w-full rounded-full bg-gradient-to-br from-[#e6b980] to-[#eacda3] px-6 py-3 font-semibold text-[#130f08] transition-opacity hover:opacity-90"
              >
                WA your beloved one
              </button>
              <div className="space-y-2">
                {savedNotes.length === 0 ? (
                  <p className="text-sm text-muted">No saved secret notes yet.</p>
                ) : (
                  savedNotes.slice(0, 6).map((entry, index) => (
                    <div key={`${entry}-${index}`} className="flex items-start justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                      <p className="text-sm">{entry}</p>
                      <button
                        type="button"
                        onClick={() => removeSavedNote(entry)}
                        className="rounded-full border border-white/15 bg-white/5 px-2 py-1 text-xs hover:bg-white/10"
                      >
                        Delete
                      </button>
                    </div>
                  ))
                )}
              </div>
            </Card>

            <Card className="space-y-3 md:col-span-2">
              <h2 className="font-serif text-2xl">Saved Oracle guidance</h2>
              <p className="text-sm text-muted">
                Oracle cards saved from Intimacy Oracle appear here.
              </p>
              <div className="space-y-2">
                {oracleEntries.length === 0 ? (
                  <p className="text-sm text-muted">No Oracle guidance saved yet.</p>
                ) : (
                  oracleEntries.slice(0, 8).map((entry, index) => (
                    <div key={`${entry.cardTitle}-${entry.date}-${index}`} className="rounded-xl border border-white/10 bg-white/5 px-3 py-3">
                      <p className="text-xs uppercase tracking-[0.15em] text-accent">{entry.cardTitle}</p>
                      {entry.question ? <p className="mt-1 text-sm text-muted">Question: {entry.question}</p> : null}
                      <p className="mt-1 text-sm">{entry.message}</p>
                      <p className="mt-1 text-sm text-accent">Action: {entry.action}</p>
                    </div>
                  ))
                )}
              </div>
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
                  <div key={item.id} className="relative">
                    <img
                      src={item.src}
                      alt={`Journey memory ${index + 1}`}
                      className="aspect-square w-full rounded-lg object-cover border border-white/10"
                    />
                    <button
                      type="button"
                      onClick={() => deletePhoto(item.id)}
                      className="absolute right-1 top-1 inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/25 bg-black/60 text-xs text-white hover:bg-black/75"
                      aria-label="Delete picture"
                      title="Delete picture"
                    >
                      ×
                    </button>
                  </div>
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
                <input
                  type="text"
                  value={dateNoteInput}
                  onChange={(e) => setDateNoteInput(e.target.value)}
                  placeholder="What is this date about?"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
                />
                <Button variant="secondary" onClick={addDate}>Add</Button>
              </div>
              <div className="space-y-2">
                {specialDates.length === 0 ? (
                  <p className="text-sm text-muted">No dates added yet.</p>
                ) : (
                  specialDates.slice(0, 10).map((entry) => (
                    <div key={entry.id} className="flex items-start justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                      <p className="text-sm">
                        <span className="font-semibold">{entry.date}</span>
                        {entry.note ? ` — ${entry.note}` : ""}
                      </p>
                      <button
                        type="button"
                        onClick={() => removeDate(entry.id)}
                        className="rounded-full border border-white/15 bg-white/5 px-2 py-1 text-xs hover:bg-white/10"
                      >
                        Delete
                      </button>
                    </div>
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
