import {
  mainstreamRituals200,
  type MainstreamRitual,
  type IntimacyWeather as LegacyWeather,
} from "./mainstreamRituals200";
import { normalizeWeatherPair, type WeatherState } from "../lib/weatherPair";

export type { WeatherState };
export type RitualTier = "free-daily" | "premium";
export type RitualLevel = "L1" | "L2" | "L3";
export type RitualTone =
  | "mainstream"
  | "tantric"
  | "repair"
  | "playful"
  | "sensual"
  | "kink-lite"
  | "relationship-science"
  | "devotional"
  | "daily";
export type RitualCategory =
  | "arrival"
  | "breath"
  | "touch"
  | "gaze"
  | "repair"
  | "conversation"
  | "desire"
  | "play"
  | "aftercare"
  | "body-awareness"
  | "devotion"
  | "journey"
  | "voice";

export interface SacredPathRitual {
  id: string;
  title: string;
  subtitle: string;
  level: RitualLevel;
  tier: RitualTier;
  tone: RitualTone;
  category: RitualCategory;
  durationMinutes: 3 | 5 | 8 | 12 | 20 | 30 | 45 | 60 | 90;
  intensity: "gentle" | "medium" | "deep";
  weather: WeatherState[];
  pairings: Array<`${WeatherState}_${WeatherState}`>;
  imageMood: WeatherState;
  bestFor: string[];
  avoidWhen?: WeatherState[];
  safetyNote?: string;
  consentNote?: string;
  setup: string[];
  steps: string[];
  closing: string;
  reflectionPrompt: string;
  voiceScript: string;
  sourceFamily:
    | "mainstream"
    | "expanded-practices"
    | "weather-full-library"
    | "sensual-kink"
    | "original-sacred-path";
}

function weatherToState(value: LegacyWeather): WeatherState {
  return value.toLowerCase() as WeatherState;
}

function toCategory(category: MainstreamRitual["category"]): RitualCategory {
  switch (category) {
    case "arrival":
      return "arrival";
    case "breath":
      return "breath";
    case "touch":
      return "touch";
    case "gaze":
      return "gaze";
    case "repair":
      return "repair";
    case "aftercare":
      return "aftercare";
    case "choice":
    case "appreciation":
      return "conversation";
    case "sensual":
    case "body-worship":
    case "anticipation":
      return "desire";
    case "play":
    case "kink-lite":
    case "bdsm-inspired":
      return "play";
    case "devotional":
      return "devotion";
    case "rest":
      return "body-awareness";
    default:
      return "journey";
  }
}

function toTone(category: MainstreamRitual["category"], intensity: MainstreamRitual["intensity"]): RitualTone {
  if (category === "repair" || category === "aftercare") return "repair";
  if (category === "kink-lite" || category === "bdsm-inspired") return "kink-lite";
  if (category === "sensual" || category === "anticipation" || category === "body-worship") return "sensual";
  if (category === "play") return "playful";
  if (category === "devotional") return "devotional";
  if (category === "choice" || category === "appreciation") return "relationship-science";
  if (intensity === "soft") return "daily";
  return "mainstream";
}

function toDuration(value: number): SacredPathRitual["durationMinutes"] {
  if (value <= 3) return 3;
  if (value <= 5) return 5;
  if (value <= 8) return 8;
  if (value <= 12) return 12;
  if (value <= 20) return 20;
  if (value <= 30) return 30;
  if (value <= 45) return 45;
  if (value <= 60) return 60;
  return 90;
}

function toIntensity(value: MainstreamRitual["intensity"]): SacredPathRitual["intensity"] {
  if (value === "soft") return "gentle";
  if (value === "high") return "deep";
  return "medium";
}

function toLevel(duration: SacredPathRitual["durationMinutes"], intensity: SacredPathRitual["intensity"]): RitualLevel {
  if (duration <= 5 && intensity === "gentle") return "L1";
  if (duration >= 20 || intensity === "deep") return "L3";
  return "L2";
}

const setupPool = [
  ["Put phones away and choose one uninterrupted window together.", "Set one shared agreement: no fixing, only listening and consent.", "Take two slow breaths before beginning."],
  ["Dim the lights or soften the room so it feels safe and private.", "Decide where each person sits and how close feels good.", "Name one intention for tonight in a single sentence."],
  ["Pause before touch and ask what pace feels supportive right now.", "Agree on a pause word either partner can use at any time.", "Choose whether this ritual is seated, standing, or lying down."],
  ["Take one minute in silence to notice body signals and emotional tone.", "Each partner names one boundary and one welcome.", "Confirm this can stay short and simple if needed."],
];

const closingPool = [
  "Close by naming one thing that helped you feel more connected and one small next step for tonight.",
  "End with one full breath together and a clear thank-you for the honesty and care you both brought.",
  "Seal the ritual with a gentle touch or hug and one sentence of appreciation each.",
  "Finish by checking if either partner needs aftercare, space, or continued closeness.",
  "Close slowly and decide together whether to rest, continue, or pause for the night.",
];

const reflectionPool = [
  "What shifted in your body between the first minute and the final minute?",
  "What action from your partner helped you feel most safe and open?",
  "What pace made this feel supportive rather than pressured?",
  "What would you repeat next time to deepen trust?",
  "What did you learn about your current weather tonight?",
];

function buildPairings(
  weather: WeatherState[],
  opts?: { category?: RitualCategory; tone?: RitualTone },
): Array<`${WeatherState}_${WeatherState}`> {
  const pairs = new Set<`${WeatherState}_${WeatherState}`>();
  const all: WeatherState[] = ["stormy", "frozen", "foggy", "warm", "electric", "sunny"];
  for (const anchor of weather) {
    for (const candidate of all) {
      pairs.add(normalizeWeatherPair(anchor, candidate));
    }
  }
  if (opts?.category === "repair" || opts?.tone === "repair") {
    for (const candidate of all) {
      pairs.add(normalizeWeatherPair("stormy", candidate));
    }
  }
  return Array.from(pairs);
}

function rewriteSteps(ritual: MainstreamRitual, weather: WeatherState[], i: number): string[] {
  const category = toCategory(ritual.category);
  if (category === "repair") {
    return [
      "Pause escalation and agree to speak one at a time for two minutes each.",
      "Each partner shares one feeling and one need using simple language, without blame.",
      "Reflect back what you heard before responding, then ask if it was understood correctly.",
      "Choose one repair action for tonight: a breath break, a hug, or a reset conversation in 20 minutes.",
    ];
  }
  if (category === "breath") {
    return [
      "Sit facing each other and match inhale and exhale for six rounds.",
      "Keep your shoulders soft and check if the pace feels calming for both.",
      "Add one hand-to-heart gesture while breathing to stabilize attention.",
      "After the final breath, share one word that describes your state now.",
    ];
  }
  if (category === "touch" || category === "body-awareness") {
    return [
      "Ask what kind of touch is welcome and what is not welcome right now.",
      "Begin with neutral touch (hands, shoulders, or back) at a slow predictable rhythm.",
      "Check in after one minute: continue, soften, pause, or change area.",
      "End with stillness and one sentence about what felt most regulating.",
    ];
  }
  if (category === "gaze") {
    return [
      "Sit at a comfortable distance and hold eye contact for 30 seconds at a time.",
      "Take a breath break between rounds so neither partner feels overloaded.",
      "Share one sentence: 'When I look at you now, I notice...'.",
      "Close by thanking each other for staying present without fixing anything.",
    ];
  }
  if (category === "desire" || category === "play") {
    const step4 =
      weather.includes("stormy") || weather.includes("frozen")
        ? "Choose a low-pressure version to keep nervous systems regulated."
        : "Choose one playful next move together and keep checking for full consent.";
    return [
      "Name one desire and one boundary before any escalation.",
      "Build anticipation slowly with pauses, eye contact, and explicit yes-checks.",
      "Keep communication active: ask 'more, less, same, or stop?' every few minutes.",
      step4,
    ];
  }
  if (category === "conversation") {
    return [
      "Use a timer: each partner gets 90 seconds to speak while the other only listens.",
      "Reflect back the key phrase you heard before adding your own response.",
      "Name one realistic request for tonight and one appreciation.",
      "Agree on one simple action you will do immediately after this ritual.",
    ];
  }
  return [
    ritual.steps[0] ?? "Arrive together with one slow breath.",
    ritual.steps[1] ?? "Name one feeling and one need.",
    ritual.steps[2] ?? "Choose one low-pressure connection practice.",
    ritual.steps[3] ?? "Close with gratitude and a clear next step.",
  ];
}

function rewriteSubtitle(ritual: MainstreamRitual, category: RitualCategory): string {
  const map: Record<RitualCategory, string> = {
    arrival: "A grounded entry ritual that helps you arrive in the same space before moving deeper.",
    breath: "A breath-led practice to regulate your nervous systems and reconnect without pressure.",
    touch: "A consent-led touch ritual that builds safety, warmth, and felt closeness.",
    gaze: "A gentle eye-contact ritual for presence, honesty, and attunement.",
    repair: "A repair-first practice for conflict, charge, and emotional reset.",
    conversation: "A structured conversation ritual for clarity, listening, and respectful truth.",
    desire: "A sensual practice guided by consent, pacing, and mutual choice.",
    play: "A playful connection ritual that keeps attraction alive while honoring boundaries.",
    aftercare: "A soft landing ritual to restore safety and tenderness after intensity.",
    "body-awareness": "A calming body check-in that reduces pressure and invites reconnection.",
    devotion: "A reverent appreciation ritual for gratitude and emotional warmth.",
    journey: "A relationship ritual that builds steady momentum over time.",
    voice: "A guided ritual designed to be supported by calm spoken cues.",
  };
  return map[category] ?? ritual.subtitle;
}

function buildVoiceScript(title: string, setup: string[], steps: string[], closing: string): string {
  return [
    `Welcome to ${title}.`,
    "Move slowly and stay with consent at every step.",
    ...setup.slice(0, 2),
    ...steps,
    closing,
  ].join(" ");
}

function customArrivalRituals(): SacredPathRitual[] {
  return [
    {
      id: "tk001",
      title: "Candle Arrival",
      subtitle: "A candlelit threshold ritual to settle your nervous systems and open the night with intention.",
      level: "L1",
      tier: "free-daily",
      tone: "daily",
      category: "arrival",
      durationMinutes: 5,
      intensity: "gentle",
      weather: ["foggy", "warm", "sunny"],
      pairings: ["foggy_foggy", "foggy_warm", "foggy_sunny", "warm_warm", "warm_sunny", "sunny_sunny"],
      imageMood: "warm",
      bestFor: ["arrival", "soft reset", "presence"],
      setup: [
        "Dim the room and place one candle where both of you can see it.",
        "Sit close enough to feel connected, with phones out of reach.",
        "Agree that either partner can pause at any time.",
      ],
      steps: [
        "Light the candle together and watch the flame for three breaths.",
        "Each partner says one word for how they are arriving right now.",
        "Share one sentence of intention for this evening.",
        "Take one synchronized breath while looking at each other softly.",
        "Decide whether to keep the candle as witness or blow it out together before continuing.",
      ],
      closing:
        "Close by thanking each other for arriving with honesty, then choose one gentle next step for tonight.",
      reflectionPrompt: "What changed in the room once you slowed down together?",
      voiceScript:
        "Welcome to Candle Arrival. Light one candle together and take three slow breaths. Each of you shares one arrival word, then one sentence of intention. Pause, breathe in sync once more, and choose your next step with care.",
      sourceFamily: "expanded-practices",
    },
    {
      id: "sp201",
      title: "The Arrival",
      subtitle: "A body-based arrival ritual without props, built for honesty and regulation.",
      level: "L1",
      tier: "free-daily",
      tone: "daily",
      category: "arrival",
      durationMinutes: 5,
      intensity: "gentle",
      weather: ["foggy", "frozen", "warm"],
      pairings: ["foggy_foggy", "foggy_frozen", "foggy_warm", "frozen_frozen", "frozen_warm", "warm_warm"],
      imageMood: "foggy",
      bestFor: ["body awareness", "arrival", "low pressure"],
      setup: [
        "Face each other seated or standing, with enough space to breathe freely.",
        "Place one hand on your own heart or belly.",
      ],
      steps: [
        "Take three long breaths while feeling your own body support.",
        "Each partner names their body state in one sentence, without explaining or fixing.",
        "Say aloud: 'I am here as I am.'",
        "Partner mirrors back: 'You are welcome as you are.'",
        "Choose one gentle action for the next five minutes: breathe, hold hands, or rest together.",
      ],
      closing: "Close with one nod of agreement and decide if you continue or simply rest.",
      reflectionPrompt: "What became easier once you named your real body state?",
      voiceScript:
        "Welcome to The Arrival. Place one hand on your heart and take three breaths. Name your body state. Say, I am here as I am. Let your partner mirror it back. End by choosing one gentle next action.",
      sourceFamily: "expanded-practices",
    },
    {
      id: "sp202",
      title: "Threshold Ritual",
      subtitle: "A clean opening-and-closing container that marks sacred time together.",
      level: "L2",
      tier: "premium",
      tone: "devotional",
      category: "arrival",
      durationMinutes: 8,
      intensity: "medium",
      weather: ["warm", "sunny", "electric"],
      pairings: ["warm_warm", "warm_sunny", "warm_electric", "sunny_sunny", "electric_sunny", "electric_electric"],
      imageMood: "sunny",
      bestFor: ["intentionality", "container", "deeper practices"],
      setup: [
        "Choose one opening gesture (bell, hand squeeze, or candle).",
        "Choose one closing phrase both partners agree to use.",
      ],
      steps: [
        "Begin with the opening gesture and say: 'We are entering shared ritual time.'",
        "Name one boundary and one welcome for this session.",
        "Practice your chosen ritual for five minutes with periodic check-ins.",
        "Pause and ask each other: 'Do you want to continue, soften, or close?'",
        "Close with your agreed phrase: 'We return with gratitude and respect.'",
      ],
      closing: "Mark the return to ordinary time clearly so both nervous systems can settle.",
      reflectionPrompt: "How did a clear opening and closing change your sense of safety?",
      voiceScript:
        "This is Threshold Ritual. Begin with your opening gesture, set one boundary and one welcome, and practice with check-ins. Close with your shared phrase and return gently to ordinary time.",
      sourceFamily: "expanded-practices",
    },
    {
      id: "sp203",
      title: "Daily Homecoming",
      subtitle: "A reconnection ritual for the first minutes after work, stress, or distance.",
      level: "L1",
      tier: "free-daily",
      tone: "mainstream",
      category: "arrival",
      durationMinutes: 5,
      intensity: "gentle",
      weather: ["stormy", "foggy", "warm"],
      pairings: ["stormy_stormy", "stormy_foggy", "stormy_warm", "foggy_foggy", "foggy_warm", "warm_warm"],
      imageMood: "warm",
      bestFor: ["after work reset", "repair readiness", "home transition"],
      setup: [
        "At the door, put phones away for five minutes.",
        "Stand face to face before discussing tasks or logistics.",
      ],
      steps: [
        "Make eye contact and breathe once together before speaking.",
        "Each partner shares one sentence: 'Today I am carrying...'.",
        "Offer one appreciation from today, even if small.",
        "If needed, name one repair request with soft language.",
        "Choose your next step: hug, tea together, or quiet decompression.",
      ],
      closing: "Close by confirming one supportive action for the next hour.",
      reflectionPrompt: "What helped you transition from stress into connection fastest?",
      voiceScript:
        "Welcome to Daily Homecoming. Pause at the doorway, put phones away, and breathe together. Share what you are carrying, name one appreciation, and choose one caring next action.",
      sourceFamily: "mainstream",
    },
    {
      id: "sp204",
      title: "Electric Grounding Countdown",
      subtitle: "A high-chemistry ritual that keeps desire playful while staying regulated and consensual.",
      level: "L1",
      tier: "free-daily",
      tone: "playful",
      category: "play",
      durationMinutes: 5,
      intensity: "medium",
      weather: ["electric", "warm", "sunny"],
      pairings: [
        "electric_electric",
        "electric_warm",
        "electric_sunny",
        "warm_warm",
        "warm_sunny",
        "sunny_sunny",
      ],
      imageMood: "electric",
      bestFor: ["chemistry", "play", "consent"],
      setup: [
        "Agree on one clear pause word and one clear yes signal.",
        "Stand facing each other with both feet grounded.",
      ],
      steps: [
        "Count down together from ten to one while breathing slowly.",
        "At each number, make one playful but consented gesture: eye contact, smile, hand touch, or pause.",
        "When you reach one, ask: 'Do we continue, soften, or stop here?'",
        "Choose one shared next action and keep verbal check-ins active.",
      ],
      closing: "End with one breath and one sentence of appreciation for each other’s clarity.",
      reflectionPrompt: "Did slowing down increase connection and safety while staying playful?",
      voiceScript:
        "Welcome to Electric Grounding Countdown. Begin with consent and a pause word. Count down from ten together, adding one playful gesture each round. At one, choose together whether to continue, soften, or stop.",
      sourceFamily: "mainstream",
    },
  ];
}

function buildRitual(ritual: MainstreamRitual, i: number): SacredPathRitual {
  const weather = ritual.weatherTags.map(weatherToState);
  const category = toCategory(ritual.category);
  const intensity = toIntensity(ritual.intensity);
  const duration = toDuration(ritual.durationMinutes);
  const setup = setupPool[i % setupPool.length];
  const steps = rewriteSteps(ritual, weather, i);
  const closing = closingPool[i % closingPool.length];
  const reflectionPrompt = reflectionPool[i % reflectionPool.length];
  const tone = toTone(ritual.category, ritual.intensity);
  const safetyNote =
    ritual.category === "kink-lite" || ritual.category === "bdsm-inspired"
      ? "Use explicit consent, a pause word, and stop immediately if either partner feels unsure."
      : undefined;
  const consentNote =
    ritual.consentLevel !== "standard"
      ? "Begin with a clear yes, a pause word, and full permission from both partners. Stop immediately if either partner feels uncertain or uncomfortable."
      : undefined;

  return {
    id: ritual.id,
    title: ritual.title,
    subtitle: rewriteSubtitle(ritual, category),
    level: toLevel(duration, intensity),
    tier: ritual.premiumTier === "free" ? "free-daily" : "premium",
    tone,
    category,
    durationMinutes: duration,
    intensity,
    weather,
    pairings: buildPairings(weather, { category, tone }),
    imageMood: weather[0] ?? "warm",
    bestFor: ritual.bestFor,
    avoidWhen: ritual.avoidWhen
      ? ritual.avoidWhen
          .map((v) => v.toLowerCase())
          .filter((v): v is WeatherState =>
            ["sunny", "warm", "electric", "foggy", "frozen", "stormy"].includes(v),
          )
      : undefined,
    safetyNote,
    consentNote,
    setup,
    steps,
    closing,
    reflectionPrompt,
    voiceScript: buildVoiceScript(ritual.title, setup, steps, closing),
    sourceFamily: ritual.sourceSet === "tantric-kinky-100" ? "sensual-kink" : "weather-full-library",
  };
}

const baseCanonical = mainstreamRituals200.map(buildRitual);
const customById = new Map(customArrivalRituals().map((r) => [r.id, r]));
const withOverrides = baseCanonical.map((r) => customById.get(r.id) ?? r);
const appended = withOverrides.concat(customArrivalRituals().filter((r) => !withOverrides.some((b) => b.id === r.id)));

export const sacredPathRituals: SacredPathRitual[] = appended;
export const sacredPathRitualsById = Object.fromEntries(sacredPathRituals.map((r) => [r.id, r]));
