import type { IntimacyWeather } from "./mainstreamRituals200";

export type WeatherOutcomeTone =
  | "repair"
  | "grounding"
  | "clarity"
  | "warming"
  | "sensual"
  | "electric"
  | "playful"
  | "devotional";

export interface WeatherRitualOutcome {
  shivaWeather: IntimacyWeather;
  shaktiWeather: IntimacyWeather;
  title: string;
  subtitle: string;
  emotionalTheme: string;
  primaryRitualId: string;
  recommendedRitualIds: string[];
  relatedRitualIds: string[];
  tone: WeatherOutcomeTone;
}

export const WEATHER_ORDER: IntimacyWeather[] = [
  "Stormy",
  "Frozen",
  "Foggy",
  "Warm",
  "Electric",
  "Sunny"
];

export function createWeatherKey(a: IntimacyWeather, b: IntimacyWeather): string {
  return [a, b]
    .sort((x, y) => WEATHER_ORDER.indexOf(x) - WEATHER_ORDER.indexOf(y))
    .join("_");
}

type MatrixEntry = Omit<WeatherRitualOutcome, "shivaWeather" | "shaktiWeather">;

export const fallbackWeatherRitualOutcome: MatrixEntry = {
  title: "Return to Presence",
  subtitle: "Begin with breath, consent, and one small gesture of care.",
  emotionalTheme: "safe reconnection",
  primaryRitualId: "tk005",
  recommendedRitualIds: ["tk005", "tk013", "tk018", "tk031", "tk084"],
  relatedRitualIds: ["tk001", "tk022", "tk094", "tk099"],
  tone: "grounding"
};

export const weatherRitualMatrix: Record<string, MatrixEntry> = {
  "Stormy_Stormy": {
    "title": "Return from the Storm",
    "subtitle": "Tonight is not about passion. It is about lowering the charge, listening, and becoming safe again.",
    "emotionalTheme": "repair after emotional charge",
    "primaryRitualId": "tk038",
    "recommendedRitualIds": [
      "tk038",
      "tk006",
      "tk018",
      "tk044",
      "tk050",
      "tk077",
      "tk088",
      "tk098"
    ],
    "relatedRitualIds": [
      "tk001",
      "tk005",
      "tk051",
      "tk099"
    ],
    "tone": "repair"
  },
  "Stormy_Frozen": {
    "title": "Do Not Push the Door",
    "subtitle": "One partner is charged, the other is closed. Begin with space, breath, and a small consent-based reconnection.",
    "emotionalTheme": "de-escalation and safety",
    "primaryRitualId": "tk077",
    "recommendedRitualIds": [
      "tk077",
      "tk006",
      "tk018",
      "tk038",
      "tk044",
      "tk050",
      "tk063",
      "tk094"
    ],
    "relatedRitualIds": [
      "tk001",
      "tk005",
      "tk022",
      "tk099"
    ],
    "tone": "repair"
  },
  "Stormy_Foggy": {
    "title": "Clear the Air Gently",
    "subtitle": "There is emotional charge and uncertainty. Slow down before trying to solve anything.",
    "emotionalTheme": "clarity after emotional noise",
    "primaryRitualId": "tk051",
    "recommendedRitualIds": [
      "tk051",
      "tk006",
      "tk018",
      "tk038",
      "tk050",
      "tk063",
      "tk072",
      "tk093"
    ],
    "relatedRitualIds": [
      "tk001",
      "tk005",
      "tk077",
      "tk098"
    ],
    "tone": "clarity"
  },
  "Stormy_Warm": {
    "title": "Warmth After the Storm",
    "subtitle": "One partner may be ready for closeness, but the storm must first be respected and softened.",
    "emotionalTheme": "repair before sensuality",
    "primaryRitualId": "tk085",
    "recommendedRitualIds": [
      "tk085",
      "tk006",
      "tk018",
      "tk038",
      "tk051",
      "tk077",
      "tk084",
      "vs003"
    ],
    "relatedRitualIds": [
      "tk013",
      "tk031",
      "tk067",
      "tk098"
    ],
    "tone": "warming"
  },
  "Stormy_Electric": {
    "title": "Contain the Fire",
    "subtitle": "This combination carries high charge. Use structure, consent, and clear pause signals before any intensity.",
    "emotionalTheme": "regulated intensity",
    "primaryRitualId": "tk044",
    "recommendedRitualIds": [
      "tk044",
      "tk047",
      "tk058",
      "tk063",
      "tk071",
      "tk088",
      "tk097",
      "vs060"
    ],
    "relatedRitualIds": [
      "tk006",
      "tk018",
      "tk077",
      "vs034"
    ],
    "tone": "electric"
  },
  "Stormy_Sunny": {
    "title": "Let Light Meet the Storm",
    "subtitle": "One partner brings lightness, the other may still feel charged. Let warmth help repair without dismissing the storm.",
    "emotionalTheme": "lightness with emotional respect",
    "primaryRitualId": "tk072",
    "recommendedRitualIds": [
      "tk072",
      "tk038",
      "tk051",
      "tk055",
      "tk084",
      "tk095",
      "tk098",
      "tk099"
    ],
    "relatedRitualIds": [
      "tk001",
      "tk016",
      "tk067",
      "tk077"
    ],
    "tone": "repair"
  },
  "Frozen_Frozen": {
    "title": "Return to Safety",
    "subtitle": "Tonight is not about intensity. It is about becoming safe enough to feel each other again.",
    "emotionalTheme": "grounding and emotional safety",
    "primaryRitualId": "tk001",
    "recommendedRitualIds": [
      "tk001",
      "tk005",
      "tk013",
      "tk018",
      "tk022",
      "tk036",
      "tk084",
      "tk092"
    ],
    "relatedRitualIds": [
      "tk031",
      "tk050",
      "tk077",
      "tk099"
    ],
    "tone": "grounding"
  },
  "Frozen_Foggy": {
    "title": "Find Each Other Slowly",
    "subtitle": "One partner is closed, the other unclear. Begin with breath, simple choices, and no expectation.",
    "emotionalTheme": "gentle orientation",
    "primaryRitualId": "tk093",
    "recommendedRitualIds": [
      "tk093",
      "tk001",
      "tk005",
      "tk018",
      "tk022",
      "tk051",
      "tk061",
      "tk094"
    ],
    "relatedRitualIds": [
      "tk013",
      "tk031",
      "tk077",
      "tk099"
    ],
    "tone": "clarity"
  },
  "Frozen_Warm": {
    "title": "Warmth at the Edge",
    "subtitle": "Desire is present, but one body still needs reassurance. Begin with care before sensuality.",
    "emotionalTheme": "safety before desire",
    "primaryRitualId": "tk031",
    "recommendedRitualIds": [
      "tk031",
      "tk005",
      "tk013",
      "tk015",
      "tk021",
      "tk067",
      "tk085",
      "vs003"
    ],
    "relatedRitualIds": [
      "tk011",
      "tk022",
      "tk084",
      "vs001"
    ],
    "tone": "warming"
  },
  "Frozen_Electric": {
    "title": "Slow the Charge",
    "subtitle": "One partner is highly charged while the other is closed or unsure. Start with consent, not escalation.",
    "emotionalTheme": "regulating polarity",
    "primaryRitualId": "tk044",
    "recommendedRitualIds": [
      "tk044",
      "tk006",
      "tk018",
      "tk047",
      "tk063",
      "tk077",
      "tk088",
      "tk097"
    ],
    "relatedRitualIds": [
      "tk050",
      "tk071",
      "tk085",
      "tk094"
    ],
    "tone": "repair"
  },
  "Frozen_Sunny": {
    "title": "Let Sunshine Melt the Ice",
    "subtitle": "Joy can help, but only if it stays patient. Let the frozen partner choose the first small yes.",
    "emotionalTheme": "patient warmth",
    "primaryRitualId": "tk094",
    "recommendedRitualIds": [
      "tk094",
      "tk001",
      "tk005",
      "tk013",
      "tk033",
      "tk061",
      "tk084",
      "tk095"
    ],
    "relatedRitualIds": [
      "tk022",
      "tk031",
      "tk067",
      "tk099"
    ],
    "tone": "grounding"
  },
  "Foggy_Foggy": {
    "title": "Choose One Small Door",
    "subtitle": "When both partners feel unclear, the path should be simple, kind, and easy to follow.",
    "emotionalTheme": "clarity through simplicity",
    "primaryRitualId": "tk061",
    "recommendedRitualIds": [
      "tk061",
      "tk005",
      "tk018",
      "tk033",
      "tk049",
      "tk051",
      "tk093",
      "tk094"
    ],
    "relatedRitualIds": [
      "tk001",
      "tk038",
      "tk050",
      "tk099"
    ],
    "tone": "clarity"
  },
  "Foggy_Warm": {
    "title": "Warmth Gives Direction",
    "subtitle": "One partner feels available while the other needs clarity. Use simple sensual choices, not pressure.",
    "emotionalTheme": "gentle sensual clarity",
    "primaryRitualId": "tk066",
    "recommendedRitualIds": [
      "tk066",
      "tk015",
      "tk021",
      "tk026",
      "tk049",
      "tk061",
      "vs001",
      "vs003"
    ],
    "relatedRitualIds": [
      "tk051",
      "tk085",
      "vs002",
      "vs030"
    ],
    "tone": "warming"
  },
  "Foggy_Electric": {
    "title": "Name the Charge",
    "subtitle": "Electricity mixed with uncertainty needs words first. Clarify desire, boundaries, and pace before touch.",
    "emotionalTheme": "clear consent before intensity",
    "primaryRitualId": "tk006",
    "recommendedRitualIds": [
      "tk006",
      "tk018",
      "tk044",
      "tk047",
      "tk063",
      "tk071",
      "tk088",
      "tk097"
    ],
    "relatedRitualIds": [
      "tk035",
      "tk058",
      "tk085",
      "vs034"
    ],
    "tone": "clarity"
  },
  "Foggy_Sunny": {
    "title": "Light the Path",
    "subtitle": "Sunny energy can help the fog lift when the ritual stays playful, simple, and kind.",
    "emotionalTheme": "playful clarity",
    "primaryRitualId": "tk049",
    "recommendedRitualIds": [
      "tk049",
      "tk033",
      "tk045",
      "tk054",
      "tk061",
      "tk070",
      "tk093",
      "tk095"
    ],
    "relatedRitualIds": [
      "tk016",
      "tk051",
      "tk084",
      "vs099"
    ],
    "tone": "playful"
  },
  "Warm_Warm": {
    "title": "Mutual Warmth",
    "subtitle": "Both partners are available for sensual closeness. Let warmth become presence before it becomes passion.",
    "emotionalTheme": "shared sensuality",
    "primaryRitualId": "vs002",
    "recommendedRitualIds": [
      "vs002",
      "vs001",
      "vs003",
      "vs004",
      "vs007",
      "vs010",
      "vs026",
      "vs028"
    ],
    "relatedRitualIds": [
      "tk057",
      "tk065",
      "vs027",
      "vs044"
    ],
    "tone": "sensual"
  },
  "Warm_Electric": {
    "title": "Warmth Meets Fire",
    "subtitle": "There is enough desire here for intensity, but the ritual must keep both partners fully attuned.",
    "emotionalTheme": "charged sensuality",
    "primaryRitualId": "vs034",
    "recommendedRitualIds": [
      "vs034",
      "tk044",
      "tk058",
      "tk065",
      "vs015",
      "vs031",
      "vs060",
      "vs091"
    ],
    "relatedRitualIds": [
      "tk047",
      "tk085",
      "vs028",
      "vs079"
    ],
    "tone": "electric"
  },
  "Warm_Sunny": {
    "title": "Golden Warmth",
    "subtitle": "This is a beautiful state for affection, devotion, sensuality, and shared gratitude.",
    "emotionalTheme": "joyful sensual devotion",
    "primaryRitualId": "tk090",
    "recommendedRitualIds": [
      "tk090",
      "tk007",
      "tk016",
      "tk055",
      "tk087",
      "tk095",
      "vs002",
      "vs027"
    ],
    "relatedRitualIds": [
      "tk021",
      "tk039",
      "vs003",
      "vs100"
    ],
    "tone": "devotional"
  },
  "Electric_Electric": {
    "title": "Sacred Fire",
    "subtitle": "Both partners are charged. Keep it playful, negotiated, and consciously held.",
    "emotionalTheme": "high-charge intimacy",
    "primaryRitualId": "vs060",
    "recommendedRitualIds": [
      "vs060",
      "tk044",
      "tk047",
      "tk052",
      "tk058",
      "tk088",
      "vs031",
      "vs079"
    ],
    "relatedRitualIds": [
      "tk020",
      "tk082",
      "vs034",
      "vs091"
    ],
    "tone": "electric"
  },
  "Electric_Sunny": {
    "title": "Electric Joy",
    "subtitle": "This combination can be playful, magnetic, and alive. Keep it clear, consensual, and beautifully teasing.",
    "emotionalTheme": "playful erotic charge",
    "primaryRitualId": "tk058",
    "recommendedRitualIds": [
      "tk058",
      "tk041",
      "tk044",
      "tk047",
      "tk061",
      "tk088",
      "vs022",
      "vs099"
    ],
    "relatedRitualIds": [
      "tk020",
      "tk052",
      "vs034",
      "vs060"
    ],
    "tone": "playful"
  },
  "Sunny_Sunny": {
    "title": "Sacred Joy",
    "subtitle": "Both partners are open, light, and connected. Let the ritual celebrate love, play, and devotion.",
    "emotionalTheme": "shared joy and devotion",
    "primaryRitualId": "tk095",
    "recommendedRitualIds": [
      "tk095",
      "tk007",
      "tk016",
      "tk023",
      "tk055",
      "tk070",
      "tk090",
      "vs100"
    ],
    "relatedRitualIds": [
      "tk032",
      "tk045",
      "tk054",
      "vs002"
    ],
    "tone": "devotional"
  }
} as Record<string, MatrixEntry>;
