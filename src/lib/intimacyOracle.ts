import { getAllRituals } from "./ritualResolver";
import type { SacredPathRitual } from "../data/sacredPathRituals";
import type { WeatherState } from "./weatherPair";

export type OracleNeed =
  | "feel-close"
  | "repair-tension"
  | "desire"
  | "playful"
  | "slow-down"
  | "honest-talk";

export type OracleEnergy = "low" | "medium" | "high";
export type OracleTime = "5" | "15" | "30" | "longer";

type OracleInput = {
  need: OracleNeed;
  energy: OracleEnergy;
  time: OracleTime;
  weatherA?: WeatherState;
  weatherB?: WeatherState;
  isPremium: boolean;
};

const NEED_TERMS: Record<OracleNeed, string[]> = {
  "feel-close": ["close", "connect", "heart", "gaze", "hug", "breath", "homecoming"],
  "repair-tension": ["repair", "pause", "conversation", "storm", "aftercare", "truth", "soften"],
  desire: ["desire", "pleasure", "sensual", "kiss", "touch", "invitation", "slow sex"],
  playful: ["play", "tease", "laughter", "date", "spark", "flirt", "surprise"],
  "slow-down": ["slow", "stillness", "ground", "calm", "rest", "breath", "soft"],
  "honest-talk": ["talk", "conversation", "agreement", "maps", "review", "yes", "no"],
};

function weatherNeedsGentle(a?: WeatherState, b?: WeatherState) {
  const values = [a, b];
  return values.includes("stormy") || values.includes("frozen") || values.includes("foggy");
}

function supportsDuration(ritual: SacredPathRitual, time: OracleTime) {
  if (time === "5") return ritual.durationMinutes <= 5;
  if (time === "15") return ritual.durationMinutes <= 15;
  if (time === "30") return ritual.durationMinutes <= 30;
  return ritual.durationMinutes >= 12;
}

function supportsEnergy(ritual: SacredPathRitual, energy: OracleEnergy) {
  if (energy === "low") return ritual.intensity === "gentle";
  if (energy === "medium") return ritual.intensity === "gentle" || ritual.intensity === "medium";
  return true;
}

function score(ritual: SacredPathRitual, input: OracleInput) {
  const text = `${ritual.title} ${ritual.subtitle} ${ritual.bestFor.join(" ")}`.toLowerCase();
  const terms = NEED_TERMS[input.need];
  let points = 0;
  terms.forEach((term) => {
    if (text.includes(term)) points += 3;
  });

  if (supportsDuration(ritual, input.time)) points += 3;
  if (supportsEnergy(ritual, input.energy)) points += 3;
  if (input.need === "repair-tension" && ritual.category === "repair") points += 4;
  if (input.need === "honest-talk" && ritual.category === "conversation") points += 4;
  if ((input.need === "feel-close" || input.need === "slow-down") && ritual.category === "connection") points += 3;
  if ((input.need === "desire" || input.need === "playful") && ritual.category === "desire") points += 3;

  return points;
}

export function getIntimacyOracleRecommendation(input: OracleInput): {
  ritual: SacredPathRitual;
  reason: string;
  locked: boolean;
  alternatives: SacredPathRitual[];
} {
  const all = getAllRituals();
  const gentleOverride = weatherNeedsGentle(input.weatherA, input.weatherB);

  const pool = all.filter((ritual) => {
    if (!input.isPremium && ritual.tier === "premium") return false;
    if (gentleOverride && ritual.intensity === "deep") return false;
    if (input.need === "desire" && gentleOverride) {
      return ritual.category === "repair" || ritual.intensity === "gentle";
    }
    return true;
  });

  const ranked = pool
    .map((ritual) => ({ ritual, score: score(ritual, input) }))
    .sort((a, b) => b.score - a.score);

  const best = ranked[0]?.ritual ?? all[0];
  const alternatives = ranked.slice(1, 4).map((r) => r.ritual);
  const locked = !input.isPremium && best.tier === "premium";

  let reason = "Selected for your need, available energy, and tonight’s time window.";
  if (gentleOverride) {
    reason = "Because one of you is in a lower-capacity weather, this recommendation prioritizes gentleness, safety, and reconnection.";
  } else if (input.need === "repair-tension") {
    reason = "This practice helps lower friction and rebuild emotional safety before intensity.";
  } else if (input.need === "desire") {
    reason = "This practice supports desire while keeping both partners attuned and present.";
  }

  return { ritual: best, reason, locked, alternatives };
}
