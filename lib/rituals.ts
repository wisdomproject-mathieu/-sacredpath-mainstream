export type IntimacyLevel = "soft" | "deep" | "intense";

export type Weather = "stormy" | "cloudy" | "warm" | "electric" | "radiant";

export interface Ritual {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  duration?: number;
  intimacyLevel: IntimacyLevel;
  primaryNeed: "reconnect" | "repair" | "play" | "passion" | "soothe";
  theme?: string;
  ritualSteps: string[];
  sourceCategory:
    | "MoreRitualsForTwo"
    | "TonightPath"
    | "TantricWisdom"
    | "Tao"
    | "Deida"
    | "Repair"
    | "Touch"
    | "Breath"
    | "Massage"
    | "Union";
  sourceTraditions: string[];
  sourceAuthors: string[];
  sourceConcepts: string[];
  weatherTags: string[];
  premium: boolean;
  hasVoice: boolean;
}

export const allRituals: Ritual[] = [
  {
    id: "arrive-together-soft-warm",
    title: "The Arrival",
    subtitle: "Arrive here, in this room, in this body, together.",
    description:
      "A simple soft landing for nights when you are both a little tired but still want to feel close.",
    duration: 10,
    intimacyLevel: "soft",
    primaryNeed: "reconnect",
    theme: "presence",
    ritualSteps: [
      "Sit facing each other, close enough that your knees can touch.",
      "Place your hands anywhere that feels natural.",
      "Close your eyes for one minute and feel that this person is here with you.",
      "Open your eyes and simply look at each other in silence for a few minutes.",
      "Each name one small thing you are grateful for in the other tonight.",
    ],
    sourceCategory: "TonightPath",
    sourceTraditions: ["Tantra", "Presence"],
    sourceAuthors: [],
    sourceConcepts: ["arrival", "presence", "soft landing"],
    weatherTags: ["warm:warm", "cloudy:warm", "warm:cloudy"],
    premium: false,
    hasVoice: true,
  },
  {
    id: "shared-breath-cloudy",
    title: "Shared Breath",
    subtitle: "Two spines, one breath.",
    description:
      "A Tao-inspired back-to-back breathing practice to reconnect without needing to explain everything first.",
    duration: 12,
    intimacyLevel: "soft",
    primaryNeed: "soothe",
    theme: "nervous system",
    ritualSteps: [
      "Sit back to back, with your spines touching.",
      "Notice the rise and fall of each other's breath.",
      "Match your breathing: inhale together for four, exhale together for six.",
      "If stories appear in the mind, let them pass and return to the feeling of the other body breathing.",
      "When you feel more settled, rest your heads gently against each other for a final minute.",
    ],
    sourceCategory: "MoreRitualsForTwo",
    sourceTraditions: ["Tao"],
    sourceAuthors: [],
    sourceConcepts: ["shared breath", "chi circulation"],
    weatherTags: ["cloudy:cloudy", "stormy:cloudy", "cloudy:stormy"],
    premium: false,
    hasVoice: true,
  },
  {
    id: "edge-of-surrender-electric",
    title: "Edge of Surrender",
    subtitle: "One holds steady, one softens.",
    description:
      "A polarity practice where one partner anchors deep presence so the other can relax their guard.",
    duration: 18,
    intimacyLevel: "deep",
    primaryNeed: "passion",
    theme: "polarity",
    ritualSteps: [
      "Decide who will take the grounding role and who will take the expressive role.",
      "Grounding partner: find a posture that feels stable and open.",
      "Expressive partner: move around your partner in any way that feels honest — playful, intense, testing, affectionate.",
      "Grounding partner: stay rooted and present. Receive without collapsing or going numb.",
      "When a shift from testing into trust appears, move into a simple embrace and stay there in stillness.",
    ],
    sourceCategory: "Deida",
    sourceTraditions: ["Deida"],
    sourceAuthors: ["David Deida"],
    sourceConcepts: ["polarity", "presence", "surrender"],
    weatherTags: ["electric:warm", "warm:electric", "electric:radiant"],
    premium: true,
    hasVoice: true,
  },
  {
    id: "quiet-touch-radiant",
    title: "Quiet Hands",
    subtitle: "Slow, exploratory touch with nowhere to go.",
    description:
      "A slow-touch massage ritual for nights when you are already close and want to melt even deeper.",
    duration: 25,
    intimacyLevel: "intense",
    primaryNeed: "play",
    theme: "touch",
    ritualSteps: [
      "Decide who will receive first.",
      "Receiver lies down comfortably while giver warms their hands.",
      "Giver: trace slow lines with your fingertips along the back and shoulders.",
      "Linger where the body softens or sighs.",
      "Swap roles when it feels complete, or end lying side by side in silence.",
    ],
    sourceCategory: "Massage",
    sourceTraditions: ["Tantra", "Somatic"],
    sourceAuthors: [],
    sourceConcepts: ["touch", "massage", "slow"],
    weatherTags: ["radiant:radiant", "warm:radiant", "radiant:warm"],
    premium: true,
    hasVoice: false,
  },
];

export function resolveFreeRitual(you: Weather, partner: Weather): Ritual | undefined {
  const key = `${you}:${partner}`;
  const direct = allRituals.find((r) => !r.premium && r.weatherTags.includes(key));
  if (direct) return direct;

  const symmetricKey = `${partner}:${you}`;
  const symmetric = allRituals.find((r) => !r.premium && r.weatherTags.includes(symmetricKey));
  if (symmetric) return symmetric;

  return allRituals.find((r) => !r.premium);
}

export function resolvePremiumForWeather(
  you: Weather,
  partner: Weather
): Ritual[] {
  const combos = new Set<string>([`${you}:${partner}`, `${partner}:${you}`]);
  return allRituals.filter(
    (r) => r.premium && r.weatherTags.some((tag) => combos.has(tag))
  );
}
