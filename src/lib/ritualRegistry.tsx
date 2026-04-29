import {
  getWeatherRitualOutcome,
  type IntimacyWeather as CanonicalWeather,
} from "../utils/ritualEngine";
import { WEATHER_TONE_LABELS } from "./weatherAssets";
import {
  getRitualById as getCanonicalRitualById,
  getRitualsByIds as getCanonicalRitualsByIds,
  getTonightRitual,
  type WeatherState,
} from "./ritualResolver";

export type IntimacyWeather =
  | "stormy"
  | "frozen"
  | "foggy"
  | "warm"
  | "electric"
  | "sunny";

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
  sourceCategory?: "library" | "reserve" | "matrix";
  sourceTraditions?: string[];
  sourceAuthors?: string[];
  sourceConcepts?: string[];
  weatherTags?: IntimacyWeather[];
  premium: boolean;
  hasVoice: boolean;
  category?: string;
  intensity?: "gentle" | "medium" | "deep";
  polarity?: "shiva-led" | "shakti-led" | "mutual" | "receiver-led";
  durationMinutes?: number;
  consentLevel?: "standard" | "explicit-check-in" | "power-dynamic";
  premiumTier?: "free" | "premium";
  steps?: string[];
  closing?: string;
}

type WeatherKey = `${IntimacyWeather}|${IntimacyWeather}`;

export interface RitualResolution {
  key: string;
  archetype: string;
  homeCard: {
    eyebrow: string;
    title: string;
    body: string;
    cta: string;
  };
  freeRitual?: Ritual;
  premiumRituals: Ritual[];
  recommendedRituals: Ritual[];
  relatedRituals: Ritual[];
  outcome: ReturnType<typeof getWeatherRitualOutcome>;
}

function normalizeWeather(value: string | undefined): CanonicalWeather | undefined {
  if (!value) return undefined;
  const normalized = value.trim().toLowerCase();

  switch (normalized) {
    case "stormy":
      return "Stormy";
    case "frozen":
      return "Frozen";
    case "foggy":
    case "cloudy":
      return "Foggy";
    case "warm":
      return "Warm";
    case "electric":
      return "Electric";
    case "sunny":
    case "radiant":
      return "Sunny";
    default:
      return undefined;
  }
}

function toLegacyWeather(weather: CanonicalWeather | WeatherState): IntimacyWeather {
  return String(weather).toLowerCase() as IntimacyWeather;
}

function mapRitual(ritual: NonNullable<ReturnType<typeof getCanonicalRitualById>>): Ritual {
  return {
    id: ritual.id,
    title: ritual.title,
    subtitle: ritual.subtitle,
    description: ritual.subtitle,
    duration: `${ritual.durationMinutes} min`,
    intimacyLevel: ritual.intensity,
    primaryNeed: ritual.bestFor[0],
    theme: ritual.category,
    ritualSteps: ritual.steps,
    sourceCategory: ritual.sourceFamily === "sensual-kink" ? "reserve" : "library",
    sourceTraditions: [],
    sourceAuthors: [],
    sourceConcepts: [],
    weatherTags: ritual.weather.map(toLegacyWeather),
    premium: ritual.tier === "premium",
    hasVoice: false,
    category: ritual.category as any,
    intensity: ritual.intensity,
    polarity: "mutual",
    durationMinutes: ritual.durationMinutes,
    consentLevel: ritual.consentNote ? "explicit-check-in" : "standard",
    premiumTier: ritual.tier === "premium" ? "premium" : "free",
    steps: ritual.steps,
    closing: ritual.closing,
  };
}

function mapRituals(ids: string[]): Ritual[] {
  return getCanonicalRitualsByIds(ids).map(mapRitual);
}

export function getRitualById(id: string): Ritual {
  const ritual = getCanonicalRitualById(id);
  if (!ritual) throw new Error(`Missing ritual: ${id}`);
  return mapRitual(ritual);
}

export function getRitualsByIds(ids: string[]): Ritual[] {
  return mapRituals(ids);
}

export function resolveWeatherRitual(you: IntimacyWeather, partner: IntimacyWeather): RitualResolution {
  const canonicalYou = normalizeWeather(you);
  const canonicalPartner = normalizeWeather(partner);

  if (!canonicalYou || !canonicalPartner) {
    const fallbackOutcome = getWeatherRitualOutcome("Foggy", "Foggy");
    const fallbackPrimary =
      getCanonicalRitualById(fallbackOutcome.primaryRitualId) ??
      getTonightRitual("foggy", "foggy");
    const recommendedRituals = getCanonicalRitualsByIds(fallbackOutcome.recommendedRitualIds).map(mapRitual);
    const relatedRituals = getCanonicalRitualsByIds(fallbackOutcome.relatedRitualIds).map(mapRitual);
    return {
      key: "Foggy_Foggy",
    archetype: "safe reconnection",
      homeCard: {
        eyebrow: "Foggy + Foggy",
        title: fallbackOutcome.title,
        body: fallbackOutcome.subtitle,
        cta: "Enter Tonight's Path",
      },
      freeRitual: mapRitual(fallbackPrimary),
      premiumRituals: recommendedRituals,
      recommendedRituals,
      relatedRituals,
      outcome: fallbackOutcome,
    };
  }

  const outcome = getWeatherRitualOutcome(canonicalYou, canonicalPartner);
  const recommendedRituals = getCanonicalRitualsByIds(outcome.recommendedRitualIds).map(mapRitual);
  const relatedRituals = getCanonicalRitualsByIds(outcome.relatedRitualIds).map(mapRitual);
  const tonightRitual = getTonightRitual(
    toLegacyWeather(canonicalYou) as WeatherState,
    toLegacyWeather(canonicalPartner) as WeatherState,
  );

  return {
    key: `${canonicalYou}|${canonicalPartner}`,
    archetype: outcome.tone,
    homeCard: {
      eyebrow: `${WEATHER_TONE_LABELS[toLegacyWeather(canonicalYou)]} + ${WEATHER_TONE_LABELS[toLegacyWeather(canonicalPartner)]}`,
      title: outcome.title,
      body: outcome.subtitle,
      cta: "Enter Tonight's Path",
    },
    freeRitual: mapRitual(tonightRitual),
    premiumRituals: recommendedRituals,
    recommendedRituals,
    relatedRituals,
    outcome,
  };
}
