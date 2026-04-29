import { sacredPathRituals, type SacredPathRitual } from "../data/sacredPathRituals";
import type { WeatherState } from "../lib/weatherPair";

export type OracleTone = "romantic" | "playful" | "healing" | "erotic" | "devotional";
export type OracleFocus = "bonding" | "attraction" | "repair" | "growth";
export type OracleIntensity = "gentle" | "medium" | "deep";

type Input = {
  tone: OracleTone;
  focus: OracleFocus;
  intensity?: OracleIntensity;
  weatherA?: WeatherState;
  weatherB?: WeatherState;
  isPremium: boolean;
};

function inferIntensity(tone: OracleTone, focus: OracleFocus): OracleIntensity {
  if (tone === "healing" || focus === "repair") return "gentle";
  if (tone === "romantic" && focus === "bonding") return "medium";
  if (tone === "playful") return "medium";
  if (tone === "erotic" && focus === "attraction") return "deep";
  return "medium";
}

function unsafeErotic(weatherA?: WeatherState, weatherB?: WeatherState): boolean {
  const set = new Set([weatherA, weatherB]);
  return set.has("stormy") || set.has("frozen") || set.has("foggy");
}

function scoreRitual(ritual: SacredPathRitual, input: Required<Pick<Input, "tone" | "focus" | "intensity">>) {
  let score = 0;

  if (input.tone === "romantic" && ["arrival", "touch", "gaze", "devotion", "breath"].includes(ritual.category)) score += 4;
  if (input.tone === "playful" && ["play", "desire", "conversation"].includes(ritual.category)) score += 4;
  if (input.tone === "healing" && ["repair", "aftercare", "body-awareness", "breath"].includes(ritual.category)) score += 5;
  if (input.tone === "erotic" && ["desire", "play", "touch"].includes(ritual.category)) score += 4;
  if (input.tone === "devotional" && ["devotion", "gaze", "touch", "breath"].includes(ritual.category)) score += 4;

  if (input.focus === "bonding" && ["arrival", "breath", "touch", "devotion"].includes(ritual.category)) score += 4;
  if (input.focus === "attraction" && ["desire", "play", "touch"].includes(ritual.category)) score += 4;
  if (input.focus === "repair" && ["repair", "aftercare", "conversation"].includes(ritual.category)) score += 5;
  if (input.focus === "growth" && ["journey", "conversation", "devotion"].includes(ritual.category)) score += 3;

  if (ritual.intensity === input.intensity) score += 3;
  if (ritual.tier === "free-daily") score += 1;

  return score;
}

export function getOracleRitualRecommendation(input: Input): {
  ritual: SacredPathRitual;
  reason: string;
  intensity: OracleIntensity;
} {
  const intensity = input.intensity ?? inferIntensity(input.tone, input.focus);
  const forceGentle = input.tone === "healing" || input.focus === "repair" || unsafeErotic(input.weatherA, input.weatherB);
  const safeIntensity: OracleIntensity = forceGentle ? "gentle" : intensity;

  let pool = sacredPathRituals.filter((r) => (input.isPremium ? true : r.tier === "free-daily"));
  if (forceGentle) {
    pool = pool.filter((r) => r.intensity === "gentle" || r.category === "repair" || r.category === "aftercare");
  }

  const sorted = pool
    .map((ritual) => ({
      ritual,
      score: scoreRitual(ritual, { tone: input.tone, focus: input.focus, intensity: safeIntensity }),
    }))
    .sort((a, b) => b.score - a.score);

  const ritual = sorted[0]?.ritual ?? sacredPathRituals[0];
  const reason = forceGentle
    ? "Your current weather suggests a gentler path first, so this ritual prioritizes safety and connection."
    : `Selected for a ${input.tone} tone with a ${input.focus} focus at ${safeIntensity} intensity.`;

  return { ritual, reason, intensity: safeIntensity };
}

