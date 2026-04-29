import type { Ritual } from "../data/ritualLibrary";

type RitualCardProps = {
  ritual: Ritual;
  selected: boolean;
  locked: boolean;
  isFreeToday: boolean;
  onClick: () => void;
};

export default function RitualCard({ ritual, selected, locked, isFreeToday, onClick }: RitualCardProps) {
  const imageSrc = `${import.meta.env.BASE_URL}assets/weather-mainstream/${ritual.imageMood}.png`;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative text-left rounded-3xl border overflow-hidden transition ${
        selected ? "border-accent bg-white/10" : "border-white/10 bg-card hover:bg-white/10"
      }`}
    >
      <img src={imageSrc} alt={ritual.title} className="w-full h-32 object-cover opacity-90" />
      <div className="absolute inset-0 h-32 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
      <div className="p-4">
        <p className="text-[11px] uppercase tracking-[0.2em] text-accent">
          {isFreeToday ? "Free today" : locked ? "Premium" : "Unlocked"}
        </p>
        <p className="mt-2 text-lg font-semibold">{ritual.title}</p>
        <p className="text-sm text-muted mt-1">{ritual.subtitle}</p>
        <p className="text-xs text-muted mt-2">{ritual.durationMinutes} min · {ritual.intensity} · {ritual.category}</p>
      </div>
      {locked ? (
        <div className="absolute inset-0 bg-black/45 grid place-items-center">
          <span className="rounded-full border border-accent/60 bg-black/60 px-3 py-1 text-xs tracking-wide">Locked</span>
        </div>
      ) : null}
    </button>
  );
}
