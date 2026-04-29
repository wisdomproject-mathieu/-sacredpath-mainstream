import { resolveWeatherRitual, type IntimacyWeather } from "./ritualRegistry";

export function getTonightPath(
  youWeather?: IntimacyWeather,
  partnerWeather?: IntimacyWeather,
) {
  if (!youWeather || !partnerWeather) return null;
  return resolveWeatherRitual(youWeather, partnerWeather);
}

