import {
  sacredPathRituals,
  type RitualCategory as CanonicalCategory,
  type SacredPathRitual,
  type WeatherState,
} from "./sacredPathRituals";
import { normalizeWeatherPair } from "../lib/weatherPair";

export type { WeatherState };
export type RitualTier = "free-daily" | "premium";
export type RitualCategory =
  | "repair"
  | "connection"
  | "desire"
  | "touch"
  | "conversation"
  | "voice"
  | "oracle"
  | "journey";

export interface Ritual {
  id: string;
  title: string;
  subtitle: string;
  category: RitualCategory;
  weather: WeatherState[];
  pairings?: Array<`${WeatherState}_${WeatherState}`>;
  durationMinutes: 3 | 5 | 8 | 12 | 20;
  intensity: "gentle" | "medium" | "deep";
  tier: RitualTier;
  imageMood: WeatherState;
  intro: string;
  steps: string[];
  closing: string;
  voiceScript?: string;
  tags: string[];
}

function toCategory(category: CanonicalCategory): RitualCategory {
  if (category === "repair" || category === "aftercare") return "repair";
  if (category === "touch" || category === "body-awareness") return "touch";
  if (category === "conversation" || category === "gaze") return "conversation";
  if (category === "desire" || category === "play" || category === "devotion") return "desire";
  if (category === "voice") return "voice";
  if (category === "journey") return "journey";
  return "connection";
}

function toDuration(value: SacredPathRitual["durationMinutes"]): 3 | 5 | 8 | 12 | 20 {
  if (value <= 3) return 3;
  if (value <= 5) return 5;
  if (value <= 8) return 8;
  if (value <= 12) return 12;
  return 20;
}

export const rituals: Ritual[] = sacredPathRituals.map((ritual) => ({
  id: ritual.id,
  title: ritual.title,
  subtitle: ritual.subtitle,
  category: toCategory(ritual.category),
  weather: ritual.weather,
  pairings: ritual.pairings,
  durationMinutes: toDuration(ritual.durationMinutes),
  intensity: ritual.intensity,
  tier: ritual.tier,
  imageMood: ritual.imageMood,
  intro: ritual.setup.join(" "),
  steps: ritual.steps,
  closing: ritual.closing,
  voiceScript: ritual.voiceScript,
  tags: ritual.bestFor,
}));

const ritualById = new Map(rituals.map((ritual) => [ritual.id, ritual]));

export function getDailyFreeRitual(date: Date, weatherA: WeatherState, weatherB: WeatherState) {
  const pair = normalizeWeatherPair(weatherA, weatherB);
  const seed = `${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDate()}-${pair}`;
  const hash = Array.from(seed).reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) >>> 0, 17);
  const candidates = rituals.filter((ritual) => ritual.tier === "free-daily" && ritual.pairings?.includes(pair));
  const pool = candidates.length ? candidates : rituals.filter((ritual) => ritual.tier === "free-daily");
  return pool[hash % pool.length] ?? rituals[0];
}

export function getPremiumRituals(filters?: {
  weather?: WeatherState | "all";
  category?: RitualCategory | "all";
  duration?: 3 | 5 | 8 | 12 | 20 | "all";
  intensity?: "gentle" | "medium" | "deep" | "all";
  query?: string;
}) {
  return rituals.filter((ritual) => {
    if (filters?.weather && filters.weather !== "all" && !ritual.weather.includes(filters.weather)) return false;
    if (filters?.category && filters.category !== "all" && ritual.category !== filters.category) return false;
    if (filters?.duration && filters.duration !== "all" && ritual.durationMinutes !== filters.duration) return false;
    if (filters?.intensity && filters.intensity !== "all" && ritual.intensity !== filters.intensity) return false;
    if (filters?.query) {
      const q = filters.query.trim().toLowerCase();
      const hay = `${ritual.title} ${ritual.subtitle} ${ritual.tags.join(" ")}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}

export function getRitualFromLibraryById(id: string) {
  return ritualById.get(id) ?? null;
}

