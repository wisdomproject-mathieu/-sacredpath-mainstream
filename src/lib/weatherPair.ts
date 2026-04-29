export type WeatherState = "sunny" | "warm" | "electric" | "foggy" | "frozen" | "stormy";

const WEATHER_ORDER: WeatherState[] = ["stormy", "frozen", "foggy", "warm", "electric", "sunny"];

export function normalizeWeatherPair(a: WeatherState, b: WeatherState): `${WeatherState}_${WeatherState}` {
  return [a, b]
    .sort((x, y) => WEATHER_ORDER.indexOf(x) - WEATHER_ORDER.indexOf(y))
    .join("_") as `${WeatherState}_${WeatherState}`;
}

export function isOpenWeather(weather: WeatherState): boolean {
  return weather === "sunny" || weather === "warm" || weather === "electric";
}

export function isClosedWeather(weather: WeatherState): boolean {
  return weather === "foggy" || weather === "frozen";
}

export function isStormPair(a: WeatherState, b: WeatherState): boolean {
  return a === "stormy" || b === "stormy";
}

export function getWeatherTerritory(a: WeatherState, b: WeatherState): "open" | "mixed" | "closed" | "storm" {
  if (isStormPair(a, b)) return "storm";
  if (isClosedWeather(a) && isClosedWeather(b)) return "closed";
  if (isOpenWeather(a) && isOpenWeather(b)) return "open";
  return "mixed";
}

export function isSafeRitualForPair(
  ritual: { tone: string; intensity: string; avoidWhen?: WeatherState[] },
  a: WeatherState,
  b: WeatherState,
): boolean {
  const pairTerritory = getWeatherTerritory(a, b);
  if (ritual.avoidWhen && (ritual.avoidWhen.includes(a) || ritual.avoidWhen.includes(b))) return false;

  if (pairTerritory === "storm" && (ritual.tone === "kink-lite" || ritual.intensity === "deep")) return false;
  if (pairTerritory === "closed" && ritual.intensity === "deep") return false;
  if (pairTerritory === "mixed" && a === "electric" && b === "frozen" && ritual.tone === "kink-lite") return false;
  if (pairTerritory === "mixed" && a === "frozen" && b === "electric" && ritual.tone === "kink-lite") return false;

  return true;
}

