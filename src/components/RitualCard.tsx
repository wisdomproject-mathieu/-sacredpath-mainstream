import type { Ritual } from "../data/ritualLibrary";
import { getWeatherImagePosition } from "../lib/weatherAssets";

type RitualCardProps = {
  ritual: Ritual;
  selected: boolean;
  locked: boolean;
  isFreeToday: boolean;
  onClick: () => void;
  showImage?: boolean;
  imageSrcOverride?: string;
  statusLabel?: string;
};

export default function RitualCard({
  ritual,
  selected,
  locked,
  isFreeToday,
  onClick,
  showImage = false,
  imageSrcOverride,
  statusLabel,
}: RitualCardProps) {
  const imageSrc = imageSrcOverride ?? `${import.meta.env.BASE_URL}assets/weather-mainstream/${ritual.imageMood}.png`;
  const imagePosition = getWeatherImagePosition(ritual.imageMood);

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${ritual.title} ${locked ? "Premium ritual. Tap to unlock." : "Unlocked ritual."}`}
      className={`relative text-left rounded-3xl border overflow-hidden transition ${
        selected ? "border-accent bg-white/10" : "border-white/10 bg-card hover:bg-white/10"
      }`}
    >
      {showImage ? (
        <>
          <img
            src={imageSrc}
            alt={ritual.title}
            className="w-full h-32 object-cover opacity-58 saturate-75"
            style={{ objectPosition: imagePosition }}
          />
          <div className="absolute inset-0 h-32 bg-gradient-to-t from-[#060710]/92 via-[#0b1020]/68 to-[#0e1530]/28" />
        </>
      ) : null}
      <div className="p-4">
        <p className="text-[11px] uppercase tracking-[0.2em] text-accent">
          {statusLabel ?? (isFreeToday ? "FREE TODAY" : locked ? "UNLOCK" : "AVAILABLE")}
        </p>
        <p className="mt-2 text-lg font-semibold">{ritual.title}</p>
        <p className="text-sm text-muted mt-1">{ritual.subtitle}</p>
        <p className="text-xs text-muted mt-2 capitalize">{ritual.intensity} · {ritual.category}</p>
      </div>
      {locked ? (
        <div className="absolute inset-0 bg-black/45 grid place-items-center text-center">
          <div className="rounded-2xl border border-accent/60 bg-black/60 px-4 py-2">
            <p className="text-xs tracking-wide font-semibold">Premium ritual</p>
            <p className="text-[11px] text-white/80 mt-1">Tap to unlock</p>
          </div>
        </div>
      ) : null}
    </button>
  );
}
