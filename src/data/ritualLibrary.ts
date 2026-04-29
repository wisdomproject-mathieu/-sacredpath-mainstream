import {
  mainstreamRituals200,
  type MainstreamRitual,
  type IntimacyWeather,
} from "./mainstreamRituals200";

export type WeatherState = "sunny" | "warm" | "electric" | "foggy" | "frozen" | "stormy";
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

function toLowerWeather(value: IntimacyWeather): WeatherState {
  return value.toLowerCase() as WeatherState;
}

function toRitualCategory(category: MainstreamRitual["category"]): RitualCategory {
  if (category === "sensual" || category === "body-worship" || category === "anticipation") return "desire";
  if (category === "touch") return "touch";
  if (category === "repair" || category === "aftercare") return "repair";
  if (category === "gaze" || category === "choice" || category === "appreciation") return "conversation";
  if (category === "breath" || category === "arrival" || category === "rest" || category === "devotional") return "connection";
  if (category === "play" || category === "kink-lite" || category === "bdsm-inspired") return "journey";
  return "connection";
}

function toDuration(value: number): 3 | 5 | 8 | 12 | 20 {
  if (value <= 4) return 3;
  if (value <= 6) return 5;
  if (value <= 9) return 8;
  if (value <= 16) return 12;
  return 20;
}

function toIntensity(value: MainstreamRitual["intensity"]): "gentle" | "medium" | "deep" {
  if (value === "soft") return "gentle";
  if (value === "high") return "deep";
  return "medium";
}

export const rituals: Ritual[] = mainstreamRituals200.map((ritual) => {
  const weather = ritual.weatherTags.map(toLowerWeather);
  return {
    id: ritual.id,
    title: ritual.title,
    subtitle: ritual.subtitle,
    category: toRitualCategory(ritual.category),
    weather,
    durationMinutes: toDuration(ritual.durationMinutes),
    intensity: toIntensity(ritual.intensity),
    tier: ritual.premiumTier === "free" ? "free-daily" : "premium",
    imageMood: weather[0] ?? "warm",
    intro: ritual.subtitle,
    steps: ritual.steps,
    closing: ritual.closing,
    tags: ritual.bestFor,
  };
});

const ritualById = new Map(rituals.map((ritual) => [ritual.id, ritual]));

export function getDailyFreeRitual(date: Date, weatherA: WeatherState, weatherB: WeatherState) {
  const seed = `${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDate()}-${weatherA}-${weatherB}`;
  const hash = Array.from(seed).reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) >>> 0, 17);
  const candidates = rituals.filter(
    (ritual) => ritual.tier === "free-daily" && (ritual.weather.includes(weatherA) || ritual.weather.includes(weatherB)),
  );
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
