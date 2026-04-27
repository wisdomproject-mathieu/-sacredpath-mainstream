import {
  getRitualById as getMainstreamRitualById,
  getRitualsByIds as getMainstreamRitualsByIds,
  getWeatherRitualOutcome,
  type MainstreamRitual,
  type IntimacyWeather as CanonicalWeather,
} from "../utils/ritualEngine";
import { WEATHER_TONE_LABELS } from "./weatherAssets";

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
  category?: MainstreamRitual["category"];
  intensity?: MainstreamRitual["intensity"];
  polarity?: MainstreamRitual["polarity"];
  durationMinutes?: number;
  consentLevel?: MainstreamRitual["consentLevel"];
  premiumTier?: MainstreamRitual["premiumTier"];
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

function toLegacyWeather(weather: CanonicalWeather): IntimacyWeather {
  return weather.toLowerCase() as IntimacyWeather;
}

function mapRitual(ritual: MainstreamRitual): Ritual {
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
    sourceCategory: ritual.sourceSet === "tantric-kinky-100" ? "library" : "reserve",
    sourceTraditions: [],
    sourceAuthors: [],
    sourceConcepts: [],
    weatherTags: ritual.weatherTags.map(toLegacyWeather),
    premium: ritual.premiumTier === "premium",
    hasVoice: false,
    category: ritual.category,
    intensity: ritual.intensity,
    polarity: ritual.polarity,
    durationMinutes: ritual.durationMinutes,
    consentLevel: ritual.consentLevel,
    premiumTier: ritual.premiumTier,
    steps: ritual.steps,
    closing: ritual.closing,
  };
}

function mapRituals(ids: string[]): Ritual[] {
  return getMainstreamRitualsByIds(ids).map(mapRitual);
}

export function getRitualById(id: string): Ritual {
  return mapRitual(getMainstreamRitualById(id));
}

export function getRitualsByIds(ids: string[]): Ritual[] {
  return mapRituals(ids);
}

export function resolveWeatherRitual(you: IntimacyWeather, partner: IntimacyWeather): RitualResolution {
  const canonicalYou = normalizeWeather(you);
  const canonicalPartner = normalizeWeather(partner);

  if (!canonicalYou || !canonicalPartner) {
    const fallbackOutcome = getWeatherRitualOutcome("Foggy", "Foggy");
    const fallbackPrimary = getMainstreamRitualById(fallbackOutcome.primaryRitualId);
    const recommendedRituals = getMainstreamRitualsByIds(fallbackOutcome.recommendedRitualIds).map(mapRitual);
    const relatedRituals = getMainstreamRitualsByIds(fallbackOutcome.relatedRitualIds).map(mapRitual);
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
  const primary = getMainstreamRitualById(outcome.primaryRitualId);
  const recommendedRituals = getMainstreamRitualsByIds(outcome.recommendedRitualIds).map(mapRitual);
  const relatedRituals = getMainstreamRitualsByIds(outcome.relatedRitualIds).map(mapRitual);

  return {
    key: `${canonicalYou}|${canonicalPartner}`,
    archetype: outcome.tone,
    homeCard: {
      eyebrow: `${WEATHER_TONE_LABELS[toLegacyWeather(canonicalYou)]} + ${WEATHER_TONE_LABELS[toLegacyWeather(canonicalPartner)]}`,
      title: outcome.title,
      body: outcome.subtitle,
      cta: "Enter Tonight's Path",
    },
    freeRitual: mapRitual(primary),
    premiumRituals: recommendedRituals,
    recommendedRituals,
    relatedRituals,
    outcome,
  };
}
