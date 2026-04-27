import {
  CONSENT_NOTE,
  mainstreamRituals200,
  mainstreamRitualsById,
  type IntimacyWeather,
  type MainstreamRitual
} from "../data/mainstreamRituals200";

import {
  createWeatherKey,
  fallbackWeatherRitualOutcome,
  weatherRitualMatrix,
  WEATHER_ORDER,
  type WeatherRitualOutcome
} from "../data/weatherRitualMatrix";

export { CONSENT_NOTE, WEATHER_ORDER, createWeatherKey };
export type { IntimacyWeather, MainstreamRitual, WeatherRitualOutcome };

export function isValidWeather(value: string): value is IntimacyWeather {
  return (WEATHER_ORDER as string[]).includes(value);
}

export function getRitualById(id: string): MainstreamRitual {
  const ritual = mainstreamRitualsById[id];

  if (!ritual) {
    console.warn(`[ritualEngine] Missing ritual id: ${id}. Falling back to tk005.`);
    return mainstreamRitualsById["tk005"];
  }

  return ritual;
}

export function getRitualsByIds(ids: string[]): MainstreamRitual[] {
  return ids.map(getRitualById).filter(Boolean);
}

export function getWeatherRitualOutcome(
  shivaWeather: IntimacyWeather,
  shaktiWeather: IntimacyWeather
): WeatherRitualOutcome {
  const key = createWeatherKey(shivaWeather, shaktiWeather);
  const matrixEntry = weatherRitualMatrix[key] ?? fallbackWeatherRitualOutcome;

  if (!weatherRitualMatrix[key]) {
    console.warn(
      `[ritualEngine] Missing weather matrix key: ${key}. Using fallback outcome.`
    );
  }

  const idsToCheck = [
    matrixEntry.primaryRitualId,
    ...matrixEntry.recommendedRitualIds,
    ...matrixEntry.relatedRitualIds
  ];

  const missingIds = idsToCheck.filter((id) => !mainstreamRitualsById[id]);

  if (missingIds.length > 0) {
    console.warn(
      `[ritualEngine] Weather outcome ${key} references missing ritual ids: ${missingIds.join(", ")}`
    );

    return {
      shivaWeather,
      shaktiWeather,
      ...fallbackWeatherRitualOutcome
    };
  }

  return {
    shivaWeather,
    shaktiWeather,
    ...matrixEntry
  };
}

export function validateWeatherMatrix(): {
  isValid: boolean;
  missingMatrixKeys: string[];
  missingRitualIds: string[];
  ritualCount: number;
} {
  const missingMatrixKeys: string[] = [];
  const missingRitualIds = new Set<string>();

  for (let i = 0; i < WEATHER_ORDER.length; i++) {
    for (let j = i; j < WEATHER_ORDER.length; j++) {
      const a = WEATHER_ORDER[i];
      const b = WEATHER_ORDER[j];
      const key = createWeatherKey(a, b);

      if (!weatherRitualMatrix[key]) {
        missingMatrixKeys.push(key);
        continue;
      }

      const entry = weatherRitualMatrix[key];
      const ids = [
        entry.primaryRitualId,
        ...entry.recommendedRitualIds,
        ...entry.relatedRitualIds
      ];

      ids.forEach((id) => {
        if (!mainstreamRitualsById[id]) {
          missingRitualIds.add(id);
        }
      });
    }
  }

  return {
    isValid: missingMatrixKeys.length === 0 && missingRitualIds.size === 0,
    missingMatrixKeys,
    missingRitualIds: Array.from(missingRitualIds),
    ritualCount: mainstreamRituals200.length
  };
}

export function shouldShowConsentNote(ritual: MainstreamRitual): boolean {
  return (
    ritual.consentLevel === "explicit-check-in" ||
    ritual.consentLevel === "power-dynamic"
  );
}

export function getRitualPreviewSteps(
  ritual: MainstreamRitual,
  maxSteps: number = 4
): string[] {
  return ritual.steps.slice(0, maxSteps);
}

export function getRitualsByCategory(category: MainstreamRitual["category"]): MainstreamRitual[] {
  return mainstreamRituals200.filter((ritual) => ritual.category === category);
}

export function getFreeRituals(): MainstreamRitual[] {
  return mainstreamRituals200.filter((ritual) => ritual.premiumTier === "free");
}

export function getPremiumRituals(): MainstreamRitual[] {
  return mainstreamRituals200.filter((ritual) => ritual.premiumTier === "premium");
}
