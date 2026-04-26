import type { IntimacyWeather } from "./ritualRegistry";

export type WeatherVisualKey = "stormy" | "foggy" | "frozen" | "warm" | "electric" | "sunny";
export type WeatherRole = "shiva" | "shakti";

function assetPath(file: string) {
  return `${import.meta.env.BASE_URL}assets/weather/${file}`;
}

export const WEATHER_IMAGE_MAP: Record<WeatherRole, Record<WeatherVisualKey, string>> = {
  shiva: {
    stormy: assetPath("shiva-stormy.png"),
    foggy: assetPath("shiva-foggy.png"),
    frozen: assetPath("shiva-frozen.png"),
    warm: assetPath("shiva-warm.png"),
    electric: assetPath("shiva-electric.png"),
    sunny: assetPath("shiva-sunny.png"),
  },
  shakti: {
    stormy: assetPath("shakti-stormy.png"),
    foggy: assetPath("shakti-foggy.png"),
    frozen: assetPath("shakti-frozen.png"),
    warm: assetPath("shakti-warm.png"),
    electric: assetPath("shakti-electric.png"),
    sunny: assetPath("shakti-sunny.png"),
  },
};

export const WEATHER_TONE_LABELS: Record<WeatherVisualKey, string> = {
  stormy: "Stormy",
  foggy: "Foggy",
  frozen: "Frozen",
  warm: "Warm",
  electric: "Electric",
  sunny: "Sunny",
};

export const WEATHER_TONE_COPY: Record<WeatherVisualKey, string> = {
  stormy: "Tense, charged, and carrying something unspoken.",
  foggy: "Unclear, drifting, and still finding shape.",
  frozen: "Numb, tired, and shut down in the body.",
  warm: "Soft, tender, and wanting closeness.",
  electric: "Crackling, awake, and drawn to one another.",
  sunny: "Clear, light, and easy with each other today.",
};

export function getDisplayName(name: string | undefined, fallback: string) {
  const value = name?.trim();
  return value || fallback;
}

export function getWeatherTitle(tone: WeatherVisualKey, displayName: string) {
  return `${WEATHER_TONE_LABELS[tone]} ${displayName}`;
}

export function getWeatherForTitle(tone: WeatherVisualKey, displayName: string) {
  return `${WEATHER_TONE_LABELS[tone]} for ${displayName}`;
}

export function getWeatherVisualKey(
  weather: IntimacyWeather | undefined,
  cloudyVariant?: "foggy" | "frozen"
): WeatherVisualKey {
  if (weather === "stormy") return "stormy";
  if (weather === "warm") return "warm";
  if (weather === "electric") return "electric";
  if (weather === "cloudy") return cloudyVariant === "frozen" ? "frozen" : "foggy";
  return "sunny";
}

export function getWeatherImageUrl(
  role: WeatherRole,
  weather: IntimacyWeather | undefined,
  cloudyVariant?: "foggy" | "frozen"
) {
  return WEATHER_IMAGE_MAP[role][getWeatherVisualKey(weather, cloudyVariant)];
}

export function getWeatherImageUrlByTone(role: WeatherRole, tone: WeatherVisualKey) {
  return WEATHER_IMAGE_MAP[role][tone];
}
