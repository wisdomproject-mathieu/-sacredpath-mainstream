import { intimacyOracleCards, type OracleCard, type WeatherState } from "../data/intimacyOracle";

export type OracleSelectionInput = {
  question: string;
  userWeather?: WeatherState;
  partnerWeather?: WeatherState;
  recentOracleCardIds?: string[];
  isPremium?: boolean;
};

type WeightMap = Map<string, number>;

const CONFLICT_WORDS = ["fight", "argument", "hurt", "angry", "conflict"];
const DISTANCE_WORDS = ["distant", "cold", "blocked", "shut down", "numb"];
const DESIRE_WORDS = ["desire", "passion", "spark", "play", "attraction"];
const LISTEN_WORDS = ["understand", "feelings", "listen", "communication"];

export function normalizeWeatherName(value?: string): WeatherState | undefined {
  if (!value) return undefined;
  const normalized = value.trim().toLowerCase();
  if (normalized === "stormy") return "Stormy";
  if (normalized === "frozen") return "Frozen";
  if (normalized === "foggy" || normalized === "cloudy") return "Foggy";
  if (normalized === "warm") return "Warm";
  if (normalized === "electric") return "Electric";
  if (normalized === "sunny") return "Sunny";
  if (normalized === "hot") return "Hot";
  return undefined;
}

function toWeatherKey(value?: WeatherState): string | undefined {
  if (!value) return undefined;
  return value.toLowerCase();
}

function bump(weights: WeightMap, ids: string[], value: number) {
  ids.forEach((id) => weights.set(id, (weights.get(id) ?? 0) + value));
}

function idsForTitles(titles: string[]) {
  const set = new Set(titles);
  return intimacyOracleCards.filter((card) => set.has(card.id)).map((card) => card.id);
}

function applyQuestionWeights(question: string, weights: WeightMap) {
  const q = question.toLowerCase();

  const has = (words: string[]) => words.some((word) => q.includes(word));

  if (has(CONFLICT_WORDS)) bump(weights, idsForTitles(["repair", "listening", "boundaries", "patience"]), 10);
  if (has(DISTANCE_WORDS)) bump(weights, idsForTitles(["presence", "patience", "warmth", "listening"]), 10);
  if (has(DESIRE_WORDS)) bump(weights, idsForTitles(["desire", "play", "warmth", "devotion"]), 10);
  if (has(LISTEN_WORDS)) bump(weights, idsForTitles(["listening", "soft-courage", "presence"]), 10);
}

function applyWeatherWeights(userWeather: WeatherState | undefined, partnerWeather: WeatherState | undefined, weights: WeightMap) {
  const userKey = toWeatherKey(userWeather);
  const partnerKey = toWeatherKey(partnerWeather);
  const keys = [userKey, partnerKey].filter((value): value is string => Boolean(value));

  if (keys.length === 0) return;

  // Strong safety overrides first.
  if (keys.includes("stormy")) {
    bump(weights, idsForTitles(["repair", "listening", "patience", "boundaries"]), 12);
    bump(weights, idsForTitles(["desire", "play"]), -10);
  }

  if (keys.includes("frozen")) {
    bump(weights, idsForTitles(["patience", "presence", "warmth", "listening"]), 10);
    bump(weights, idsForTitles(["desire", "play"]), -8);
  }

  if (keys.includes("foggy")) {
    bump(weights, idsForTitles(["listening", "soft-courage", "presence", "boundaries"]), 8);
    bump(weights, idsForTitles(["desire", "play"]), -5);
  }

  const pair = [userKey, partnerKey].sort().join("+");

  if (pair === "electric+warm") {
    bump(weights, idsForTitles(["desire", "play", "devotion", "warmth"]), 8);
  }
  if (pair === "electric+electric") {
    bump(weights, idsForTitles(["play", "desire", "boundaries", "devotion"]), 8);
  }
  if (pair === "hot+warm" || pair === "electric+hot" || pair === "hot+hot" || pair === "hot+sunny" || pair === "sunny+warm") {
    bump(weights, idsForTitles(["desire", "play", "devotion"]), 7);
  }
  if (pair === "frozen+stormy" || pair === "stormy+sunny" || pair === "hot+stormy") {
    bump(weights, idsForTitles(["patience", "listening", "boundaries", "presence"]), 9);
  }
  if (pair === "frozen+frozen") {
    bump(weights, idsForTitles(["presence", "patience", "warmth"]), 10);
  }
  if (pair === "stormy+stormy") {
    bump(weights, idsForTitles(["repair", "boundaries", "listening"]), 10);
  }
}

export function selectOracleCard({
  question,
  userWeather,
  partnerWeather,
  recentOracleCardIds = [],
}: OracleSelectionInput): OracleCard {
  const weights: WeightMap = new Map(intimacyOracleCards.map((card) => [card.id, 1]));

  applyQuestionWeights(question, weights);
  applyWeatherWeights(userWeather, partnerWeather, weights);

  // Mild relevance boost from card weather hints.
  intimacyOracleCards.forEach((card) => {
    const hints = card.recommendedForWeather ?? [];
    if (userWeather && hints.includes(userWeather)) {
      weights.set(card.id, (weights.get(card.id) ?? 0) + 2);
    }
    if (partnerWeather && hints.includes(partnerWeather)) {
      weights.set(card.id, (weights.get(card.id) ?? 0) + 2);
    }
  });

  const latest = recentOracleCardIds[recentOracleCardIds.length - 1];
  if (latest && intimacyOracleCards.length > 1) {
    weights.set(latest, (weights.get(latest) ?? 0) - 8);
  }

  const ranked = [...intimacyOracleCards]
    .map((card) => ({ card, score: weights.get(card.id) ?? 0 }))
    .sort((a, b) => b.score - a.score);

  return ranked[0]?.card ?? intimacyOracleCards[0];
}

export function buildOracleReason(
  card: OracleCard,
  question: string,
  userWeather?: WeatherState,
  partnerWeather?: WeatherState,
): string {
  const parts: string[] = [];
  if (question.trim()) {
    parts.push("This card matches the emotional pattern in your question.");
  }
  if (userWeather || partnerWeather) {
    parts.push(`It is also aligned with your current intimacy weather (${userWeather ?? "Unknown"} + ${partnerWeather ?? "Unknown"}).`);
  }
  if (parts.length === 0) {
    parts.push("This card was selected as a balanced relationship guidance prompt for today.");
  }
  if (card.id === "repair" || card.id === "listening" || card.id === "patience") {
    parts.push("Tonight’s focus is emotional safety first.");
  }
  return parts.join(" ");
}
