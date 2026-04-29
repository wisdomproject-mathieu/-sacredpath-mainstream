import { sacredPathRituals, sacredPathRitualsById, type SacredPathRitual, type WeatherState } from "../data/sacredPathRituals";
import { normalizeWeatherPair, isSafeRitualForPair } from "./weatherPair";

function daySeed(date: Date, pair: string): number {
  const seed = `${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDate()}-${pair}`;
  return Array.from(seed).reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) >>> 0, 17);
}

export function getAllRituals(): SacredPathRitual[] {
  return sacredPathRituals;
}

export function getRitualById(id: string): SacredPathRitual | null {
  return sacredPathRitualsById[id] ?? null;
}

export function getRitualsByIds(ids: string[]): SacredPathRitual[] {
  return ids.map((id) => sacredPathRitualsById[id]).filter(Boolean);
}

export function getRitualsForPair(a: WeatherState, b: WeatherState): SacredPathRitual[] {
  const pair = normalizeWeatherPair(a, b);
  return sacredPathRituals.filter((ritual) => ritual.pairings.includes(pair) && isSafeRitualForPair(ritual, a, b));
}

export function getDailyFreeRitual(date: Date, a: WeatherState, b: WeatherState): SacredPathRitual {
  const pool = getRitualsForPair(a, b).filter((ritual) => ritual.tier === "free-daily");
  const fallback = sacredPathRituals.filter((ritual) => ritual.tier === "free-daily");
  const selectedPool = pool.length ? pool : fallback;
  const idx = daySeed(date, normalizeWeatherPair(a, b)) % selectedPool.length;
  return selectedPool[idx];
}

export function getPremiumRituals(filters?: {
  weather?: WeatherState | "all";
  duration?: SacredPathRitual["durationMinutes"] | "all";
  intensity?: SacredPathRitual["intensity"] | "all";
  category?: SacredPathRitual["category"] | "all";
  query?: string;
}): SacredPathRitual[] {
  return sacredPathRituals.filter((ritual) => {
    if (filters?.weather && filters.weather !== "all" && !ritual.weather.includes(filters.weather)) return false;
    if (filters?.duration && filters.duration !== "all" && ritual.durationMinutes !== filters.duration) return false;
    if (filters?.intensity && filters.intensity !== "all" && ritual.intensity !== filters.intensity) return false;
    if (filters?.category && filters.category !== "all" && ritual.category !== filters.category) return false;
    if (filters?.query) {
      const q = filters.query.trim().toLowerCase();
      const hay = `${ritual.title} ${ritual.subtitle} ${ritual.bestFor.join(" ")}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}

export function getTonightRitual(a: WeatherState, b: WeatherState, date = new Date()): SacredPathRitual {
  const pairPool = getRitualsForPair(a, b);
  const freePool = pairPool.filter((r) => r.tier === "free-daily");
  if (freePool.length > 0) {
    return freePool[daySeed(date, normalizeWeatherPair(a, b)) % freePool.length];
  }
  return getDailyFreeRitual(date, a, b);
}

export function getVoiceRitual(a: WeatherState, b: WeatherState, duration: 3 | 5): SacredPathRitual {
  const pool = getRitualsForPair(a, b).filter((r) => r.durationMinutes <= (duration === 3 ? 8 : 20));
  if (pool.length) return pool[0];
  return getTonightRitual(a, b);
}

export function getJourneyEligibleRituals(): SacredPathRitual[] {
  return sacredPathRituals.filter((r) => r.tier === "premium" || r.level !== "L1");
}

export function getOracleRecommendedRitual(categoryOrWeather: string): SacredPathRitual | null {
  const byCategory = sacredPathRituals.find((r) => r.category === categoryOrWeather);
  if (byCategory) return byCategory;
  const byWeather = sacredPathRituals.find((r) => r.weather.includes(categoryOrWeather as WeatherState));
  return byWeather ?? null;
}

