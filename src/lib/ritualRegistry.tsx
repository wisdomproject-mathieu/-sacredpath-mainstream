import weatherMatrix from "../data/sacred_path_weather_matrix_25.json";
import ritualLibrary from "../data/sacred_path_ritual_library_55.json";
import ritualReserve from "../data/sacred_path_ritual_reserve_30.json";

export type IntimacyWeather = "stormy" | "cloudy" | "warm" | "electric" | "radiant";

export interface Ritual {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  duration?: string;
  intimacyLevel?: string;
  primaryNeed?: string;
  theme?: string;
  ritualSteps: string[];
  sourceCategory?: "library" | "reserve";
  sourceTraditions?: string[];
  sourceAuthors?: string[];
  sourceConcepts?: string[];
  weatherTags?: IntimacyWeather[];
  premium: boolean;
  hasVoice: boolean;
}

type WeatherKey = `${IntimacyWeather}|${IntimacyWeather}`;

interface WeatherEntry {
  archetype: string;
  main: string;
  alternates: string[];
  homeCard: {
    eyebrow: string;
    title: string;
    body: string;
    cta: string;
  };
}

const libraryById = new Map<string, Ritual>();
const reserveById = new Map<string, Ritual>();

(ritualLibrary as any[]).forEach((r) => {
  libraryById.set(r.id, {
    id: r.id,
    title: r.title,
    subtitle: r.subtitle,
    description: r.description,
    duration: r.duration,
    intimacyLevel: r.intimacyLevel,
    primaryNeed: r.primaryNeed,
    theme: r.theme,
    ritualSteps: r.ritualSteps ?? [],
    sourceCategory: "library",
    sourceTraditions: r.sourceTraditions ?? [],
    sourceAuthors: r.sourceAuthors ?? [],
    sourceConcepts: r.sourceConcepts ?? [],
    premium: false,
    hasVoice: false,
  });
});

(ritualReserve as any[]).forEach((r) => {
  reserveById.set(r.id, {
    id: r.id,
    title: r.title,
    subtitle: r.subtitle,
    description: r.description,
    duration: r.duration,
    intimacyLevel: r.intimacyLevel,
    primaryNeed: r.primaryNeed,
    theme: r.theme,
    ritualSteps: r.ritualSteps ?? [],
    sourceCategory: "reserve",
    sourceTraditions: [],
    sourceAuthors: [],
    sourceConcepts: [],
    premium: true,
    hasVoice: false,
  });
});

Object.values(weatherMatrix as Record<WeatherKey, WeatherEntry>).forEach((entry) => {
  entry.alternates.forEach((id) => {
    const ritual = libraryById.get(id);
    if (ritual) ritual.premium = true;
  });
});

export function getRitualById(id: string): Ritual | undefined {
  return libraryById.get(id) ?? reserveById.get(id);
}

export function normalizeWeatherKey(
  you: IntimacyWeather,
  partner: IntimacyWeather
): WeatherKey {
  const order: IntimacyWeather[] = ["stormy", "cloudy", "warm", "electric", "radiant"];
  const [a, b] = [you, partner].sort((x, y) => order.indexOf(x) - order.indexOf(y));
  return `${a}|${b}` as WeatherKey;
}

export function resolveWeatherRitual(you: IntimacyWeather, partner: IntimacyWeather) {
  const key = normalizeWeatherKey(you, partner);
  const entry = (weatherMatrix as Record<WeatherKey, WeatherEntry>)[key];
  if (!entry) return null;

  const freeRitual = getRitualById(entry.main);
  const premiumRituals = entry.alternates
    .map((id) => getRitualById(id))
    .filter((r): r is Ritual => Boolean(r));

  return {
    key,
    archetype: entry.archetype,
    homeCard: entry.homeCard,
    freeRitual,
    premiumRituals,
  };
}
