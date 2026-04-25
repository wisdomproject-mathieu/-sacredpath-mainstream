import type { IntimacyWeather } from "./ritualRegistry";

export type WeatherVisualKey = "stormy" | "foggy" | "frozen" | "warm" | "electric" | "sunny";
export type WeatherRole = "shiva" | "shakti";

export const WEATHER_IMAGE_MAP: Record<WeatherRole, Record<WeatherVisualKey, string>> = {
  shiva: {
    stormy: "/assets/weather/shiva-stormy.png",
    foggy: "/assets/weather/shiva-foggy.png",
    frozen: "/assets/weather/shiva-frozen.png",
    warm: "/assets/weather/shiva-warm.png",
    electric: "/assets/weather/shiva-electric.png",
    sunny: "/assets/weather/shiva-sunny.png",
  },
  shakti: {
    stormy: "/assets/weather/shakti-stormy.png",
    foggy: "/assets/weather/shakti-foggy.png",
    frozen: "/assets/weather/shakti-frozen.png",
    warm: "/assets/weather/shakti-warm.png",
    electric: "/assets/weather/shakti-electric.png",
    sunny: "/assets/weather/shakti-sunny.png",
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
