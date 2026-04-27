export type IntimacyWeather =
  | "Stormy"
  | "Frozen"
  | "Foggy"
  | "Warm"
  | "Electric"
  | "Sunny";

export type RitualIntensity = "soft" | "medium" | "high";

export type RitualPolarity =
  | "shiva-led"
  | "shakti-led"
  | "mutual"
  | "receiver-led";

export type RitualCategory =
  | "arrival"
  | "breath"
  | "gaze"
  | "touch"
  | "appreciation"
  | "devotional"
  | "sensual"
  | "kink-lite"
  | "bdsm-inspired"
  | "repair"
  | "aftercare"
  | "choice"
  | "play"
  | "body-worship"
  | "anticipation"
  | "rest";

export interface MainstreamRitual {
  id: string;
  sourceSet: "tantric-kinky-100" | "sensual-touch-100";
  sourceNumber: number;
  title: string;
  shortTitle: string;
  subtitle: string;
  category: RitualCategory;
  intensity: RitualIntensity;
  polarity: RitualPolarity;
  durationMinutes: number;
  weatherTags: IntimacyWeather[];
  bestFor: string[];
  avoidWhen?: string[];
  consentLevel: "standard" | "explicit-check-in" | "power-dynamic";
  premiumTier: "free" | "premium";
  steps: string[];
  closing: string;
}

export const CONSENT_NOTE =
  "Begin with a clear yes, a pause word, and full permission from both partners. Stop immediately if either partner feels uncertain, uncomfortable, or emotionally overwhelmed.";

export const mainstreamRituals200: MainstreamRitual[] = [
  {
    "id": "tk001",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 1,
    "title": "Candle Arrival",
    "shortTitle": "Candle Arrival",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "free",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore candle arrival without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk002",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 2,
    "title": "Palm Pressing",
    "shortTitle": "Palm Pressing",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "free",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore palm pressing without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk003",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 3,
    "title": "Three-Minute Gaze",
    "shortTitle": "Three-Minute Gaze",
    "subtitle": "A soft eye-contact practice for presence, honesty, and emotional attunement.",
    "category": "gaze",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "free",
    "steps": [
      "Prepare the space so the ritual feels calm, simple, and unhurried.",
      "Breathe together slowly and let the body arrive before adding words or touch.",
      "Practice three-minute gaze with full attention for a few quiet minutes.",
      "End with one word each about what shifted in the body or heart."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk004",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 4,
    "title": "Clothed Shoulder Worship",
    "shortTitle": "Clothed Shoulder Worship",
    "subtitle": "A reverent couple ritual for tenderness, gratitude, and sacred presence.",
    "category": "devotional",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Warm",
      "Electric",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Face each other and take one slow breath before speaking.",
      "Offer one sincere sentence of appreciation, reverence, or care.",
      "Let the receiver simply breathe and receive without needing to answer immediately.",
      "Switch roles, then close with a hand squeeze, hug, or forehead touch."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk005",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 5,
    "title": "Breath Matching",
    "shortTitle": "Breath Matching",
    "subtitle": "A breath-led practice to regulate the nervous system and reconnect without pressure.",
    "category": "breath",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Stormy",
      "Frozen",
      "Foggy"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "free",
    "steps": [
      "Prepare the space so the ritual feels calm, simple, and unhurried.",
      "Breathe together slowly and let the body arrive before adding words or touch.",
      "Practice breath matching with full attention for a few quiet minutes.",
      "End with one word each about what shifted in the body or heart."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk006",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 6,
    "title": "The Yes-No-Maybe Ritual",
    "shortTitle": "The Yes-No-Maybe Ritual",
    "subtitle": "A choice-based ritual that protects sovereignty and lets the smallest clear yes lead.",
    "category": "choice",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Stormy",
      "Frozen",
      "Foggy"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "free",
    "steps": [
      "Sit close enough to feel present, but far enough that both partners feel free.",
      "Each partner names one honest feeling without debating or fixing it.",
      "Choose one small gesture of care that feels like a clear yes for both.",
      "Close by thanking each other for the honesty and the restraint."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk007",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 7,
    "title": "Hand Kiss Ceremony",
    "shortTitle": "Hand Kiss Ceremony",
    "subtitle": "A slow sensual ritual built around anticipation, consent, and embodied closeness.",
    "category": "sensual",
    "intensity": "medium",
    "polarity": "mutual",
    "durationMinutes": 8,
    "weatherTags": [
      "Warm",
      "Electric",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore hand kiss ceremony without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk008",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 8,
    "title": "Blindfolded Fragrance Guess",
    "shortTitle": "Blindfolded Fragrance Guess",
    "subtitle": "A symbolic edge ritual using clear consent, pause words, and reversible intensity.",
    "category": "kink-lite",
    "intensity": "high",
    "polarity": "receiver-led",
    "durationMinutes": 8,
    "weatherTags": [
      "Electric",
      "Sunny",
      "Warm"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "power-dynamic",
    "premiumTier": "premium",
    "steps": [
      "Begin by naming the boundary, the intention, and a clear pause word.",
      "Ask for an explicit yes before starting, and keep the ritual slow enough to stop at any moment.",
      "Explore blindfolded fragrance guess only within the agreed limits, watching breath, tone, and body language.",
      "Close with reassurance, water, stillness, or a short aftercare check-in."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk009",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 9,
    "title": "Silk on Skin",
    "shortTitle": "Silk on Skin",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore silk on skin without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk010",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 10,
    "title": "Appreciation Kneeling",
    "shortTitle": "Appreciation Kneeling",
    "subtitle": "A spoken devotion ritual to help each partner feel seen, wanted, and valued.",
    "category": "appreciation",
    "intensity": "high",
    "polarity": "receiver-led",
    "durationMinutes": 8,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "explicit-check-in",
    "premiumTier": "premium",
    "steps": [
      "Begin by naming the boundary, the intention, and a clear pause word.",
      "Ask for an explicit yes before starting, and keep the ritual slow enough to stop at any moment.",
      "Explore appreciation kneeling only within the agreed limits, watching breath, tone, and body language.",
      "Close with reassurance, water, stillness, or a short aftercare check-in."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk011",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 11,
    "title": "Warm Towel Offering",
    "shortTitle": "Warm Towel Offering",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore warm towel offering without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk012",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 12,
    "title": "Collar of Intention",
    "shortTitle": "Collar of Intention",
    "subtitle": "A symbolic edge ritual using clear consent, pause words, and reversible intensity.",
    "category": "kink-lite",
    "intensity": "high",
    "polarity": "receiver-led",
    "durationMinutes": 8,
    "weatherTags": [
      "Electric",
      "Sunny",
      "Warm"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "power-dynamic",
    "premiumTier": "premium",
    "steps": [
      "Begin by naming the boundary, the intention, and a clear pause word.",
      "Ask for an explicit yes before starting, and keep the ritual slow enough to stop at any moment.",
      "Explore collar of intention only within the agreed limits, watching breath, tone, and body language.",
      "Close with reassurance, water, stillness, or a short aftercare check-in."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk013",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 13,
    "title": "Forehead Connection",
    "shortTitle": "Forehead Connection",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "free",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore forehead connection without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk014",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 14,
    "title": "Slow Wrist Tracing",
    "shortTitle": "Slow Wrist Tracing",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore slow wrist tracing without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk015",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 15,
    "title": "Guided Receiving",
    "shortTitle": "Guided Receiving",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore guided receiving without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk016",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 16,
    "title": "Praise Whisper",
    "shortTitle": "Praise Whisper",
    "subtitle": "A spoken devotion ritual to help each partner feel seen, wanted, and valued.",
    "category": "appreciation",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Face each other and take one slow breath before speaking.",
      "Offer one sincere sentence of appreciation, reverence, or care.",
      "Let the receiver simply breathe and receive without needing to answer immediately.",
      "Switch roles, then close with a hand squeeze, hug, or forehead touch."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk017",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 17,
    "title": "Mirror Touch",
    "shortTitle": "Mirror Touch",
    "subtitle": "A slow sensual ritual built around anticipation, consent, and embodied closeness.",
    "category": "sensual",
    "intensity": "medium",
    "polarity": "mutual",
    "durationMinutes": 8,
    "weatherTags": [
      "Warm",
      "Electric",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore mirror touch without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk018",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 18,
    "title": "Consent Check-In Bell",
    "shortTitle": "Consent Check-In Bell",
    "subtitle": "A choice-based ritual that protects sovereignty and lets the smallest clear yes lead.",
    "category": "choice",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Stormy",
      "Frozen",
      "Foggy"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "free",
    "steps": [
      "Sit close enough to feel present, but far enough that both partners feel free.",
      "Each partner names one honest feeling without debating or fixing it.",
      "Choose one small gesture of care that feels like a clear yes for both.",
      "Close by thanking each other for the honesty and the restraint."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk019",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 19,
    "title": "Ankle Adoration",
    "shortTitle": "Ankle Adoration",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore ankle adoration without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk020",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 20,
    "title": "Eye Contact and Command",
    "shortTitle": "Eye Contact and Command",
    "subtitle": "A symbolic edge ritual using clear consent, pause words, and reversible intensity.",
    "category": "kink-lite",
    "intensity": "high",
    "polarity": "receiver-led",
    "durationMinutes": 8,
    "weatherTags": [
      "Electric",
      "Sunny",
      "Warm"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "power-dynamic",
    "premiumTier": "premium",
    "steps": [
      "Begin by naming the boundary, the intention, and a clear pause word.",
      "Ask for an explicit yes before starting, and keep the ritual slow enough to stop at any moment.",
      "Explore eye contact and command only within the agreed limits, watching breath, tone, and body language.",
      "Close with reassurance, water, stillness, or a short aftercare check-in."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk021",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 21,
    "title": "Shared Oil Drop",
    "shortTitle": "Shared Oil Drop",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore shared oil drop without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk022",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 22,
    "title": "Blanket Nest",
    "shortTitle": "Blanket Nest",
    "subtitle": "A restorative ritual where rest, safety, and low-effort closeness become intimacy.",
    "category": "rest",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Stormy",
      "Frozen",
      "Foggy"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "free",
    "steps": [
      "Prepare the space so the ritual feels calm, simple, and unhurried.",
      "Breathe together slowly and let the body arrive before adding words or touch.",
      "Practice blanket nest with full attention for a few quiet minutes.",
      "End with one word each about what shifted in the body or heart."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk023",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 23,
    "title": "The Slow Bow",
    "shortTitle": "The Slow Bow",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore the slow bow without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk024",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 24,
    "title": "Finger-by-Finger Kiss",
    "shortTitle": "Finger-by-Finger Kiss",
    "subtitle": "A slow sensual ritual built around anticipation, consent, and embodied closeness.",
    "category": "sensual",
    "intensity": "medium",
    "polarity": "mutual",
    "durationMinutes": 8,
    "weatherTags": [
      "Warm",
      "Electric",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore finger-by-finger kiss without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk025",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 25,
    "title": "Temperature Play Lite",
    "shortTitle": "Temperature Play Lite",
    "subtitle": "A light, playful ritual for curiosity, flirtation, and joyful connection.",
    "category": "play",
    "intensity": "medium",
    "polarity": "mutual",
    "durationMinutes": 8,
    "weatherTags": [
      "Electric",
      "Sunny",
      "Warm"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore temperature play lite without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk026",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 26,
    "title": "Name the Desire",
    "shortTitle": "Name the Desire",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore name the desire without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk027",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 27,
    "title": "Hair Brushing Ritual",
    "shortTitle": "Hair Brushing Ritual",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore hair brushing ritual without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk028",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 28,
    "title": "Guided Blind Walk",
    "shortTitle": "Guided Blind Walk",
    "subtitle": "A symbolic edge ritual using clear consent, pause words, and reversible intensity.",
    "category": "kink-lite",
    "intensity": "high",
    "polarity": "receiver-led",
    "durationMinutes": 8,
    "weatherTags": [
      "Electric",
      "Sunny",
      "Warm"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "power-dynamic",
    "premiumTier": "premium",
    "steps": [
      "Begin by naming the boundary, the intention, and a clear pause word.",
      "Ask for an explicit yes before starting, and keep the ritual slow enough to stop at any moment.",
      "Explore guided blind walk only within the agreed limits, watching breath, tone, and body language.",
      "Close with reassurance, water, stillness, or a short aftercare check-in."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk029",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 29,
    "title": "Sacred Seat Offering",
    "shortTitle": "Sacred Seat Offering",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore sacred seat offering without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk030",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 30,
    "title": "Boundary Bracelet",
    "shortTitle": "Boundary Bracelet",
    "subtitle": "A symbolic edge ritual using clear consent, pause words, and reversible intensity.",
    "category": "kink-lite",
    "intensity": "high",
    "polarity": "receiver-led",
    "durationMinutes": 8,
    "weatherTags": [
      "Electric",
      "Sunny",
      "Warm"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "power-dynamic",
    "premiumTier": "premium",
    "steps": [
      "Begin by naming the boundary, the intention, and a clear pause word.",
      "Ask for an explicit yes before starting, and keep the ritual slow enough to stop at any moment.",
      "Explore boundary bracelet only within the agreed limits, watching breath, tone, and body language.",
      "Close with reassurance, water, stillness, or a short aftercare check-in."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk031",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 31,
    "title": "Heartbeat Hold",
    "shortTitle": "Heartbeat Hold",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "free",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore heartbeat hold without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk032",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 32,
    "title": "Compliment Countdown",
    "shortTitle": "Compliment Countdown",
    "subtitle": "A spoken devotion ritual to help each partner feel seen, wanted, and valued.",
    "category": "appreciation",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Face each other and take one slow breath before speaking.",
      "Offer one sincere sentence of appreciation, reverence, or care.",
      "Let the receiver simply breathe and receive without needing to answer immediately.",
      "Switch roles, then close with a hand squeeze, hug, or forehead touch."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk033",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 33,
    "title": "The Slow Sip",
    "shortTitle": "The Slow Sip",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore the slow sip without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk034",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 34,
    "title": "Back-of-Hand Caress",
    "shortTitle": "Back-of-Hand Caress",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore back-of-hand caress without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk035",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 35,
    "title": "Whispered Fantasy Mood",
    "shortTitle": "Whispered Fantasy Mood",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore whispered fantasy mood without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk036",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 36,
    "title": "Floor Breathing",
    "shortTitle": "Floor Breathing",
    "subtitle": "A breath-led practice to regulate the nervous system and reconnect without pressure.",
    "category": "breath",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Stormy",
      "Frozen",
      "Foggy"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "free",
    "steps": [
      "Prepare the space so the ritual feels calm, simple, and unhurried.",
      "Breathe together slowly and let the body arrive before adding words or touch.",
      "Practice floor breathing with full attention for a few quiet minutes.",
      "End with one word each about what shifted in the body or heart."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk037",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 37,
    "title": "Leather and Lace Contrast",
    "shortTitle": "Leather and Lace Contrast",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore leather and lace contrast without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk038",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 38,
    "title": "The Listening Throne",
    "shortTitle": "The Listening Throne",
    "subtitle": "A repair ritual for listening, emotional safety, and returning to each other gently.",
    "category": "repair",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Stormy",
      "Frozen",
      "Foggy"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Sit close enough to feel present, but far enough that both partners feel free.",
      "Each partner names one honest feeling without debating or fixing it.",
      "Choose one small gesture of care that feels like a clear yes for both.",
      "Close by thanking each other for the honesty and the restraint."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk039",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 39,
    "title": "Devotional Lotioning",
    "shortTitle": "Devotional Lotioning",
    "subtitle": "A reverent couple ritual for tenderness, gratitude, and sacred presence.",
    "category": "devotional",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Warm",
      "Electric",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Face each other and take one slow breath before speaking.",
      "Offer one sincere sentence of appreciation, reverence, or care.",
      "Let the receiver simply breathe and receive without needing to answer immediately.",
      "Switch roles, then close with a hand squeeze, hug, or forehead touch."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk040",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 40,
    "title": "Countdown Undressing Pause",
    "shortTitle": "Countdown Undressing Pause",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore countdown undressing pause without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk041",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 41,
    "title": "The Ritual of Titles",
    "shortTitle": "The Ritual of Titles",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore the ritual of titles without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk042",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 42,
    "title": "Shoulder-to-Shoulder Sway",
    "shortTitle": "Shoulder-to-Shoulder Sway",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore shoulder-to-shoulder sway without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk043",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 43,
    "title": "Eye Mask Rest",
    "shortTitle": "Eye Mask Rest",
    "subtitle": "A restorative ritual where rest, safety, and low-effort closeness become intimacy.",
    "category": "rest",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Stormy",
      "Frozen",
      "Foggy"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Prepare the space so the ritual feels calm, simple, and unhurried.",
      "Breathe together slowly and let the body arrive before adding words or touch.",
      "Practice eye mask rest with full attention for a few quiet minutes.",
      "End with one word each about what shifted in the body or heart."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk044",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 44,
    "title": "The Red-Yellow-Green Ritual",
    "shortTitle": "The Red-Yellow-Green Ritual",
    "subtitle": "A symbolic edge ritual using clear consent, pause words, and reversible intensity.",
    "category": "kink-lite",
    "intensity": "high",
    "polarity": "receiver-led",
    "durationMinutes": 8,
    "weatherTags": [
      "Electric",
      "Sunny",
      "Warm"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "power-dynamic",
    "premiumTier": "premium",
    "steps": [
      "Begin by naming the boundary, the intention, and a clear pause word.",
      "Ask for an explicit yes before starting, and keep the ritual slow enough to stop at any moment.",
      "Explore the red-yellow-green ritual only within the agreed limits, watching breath, tone, and body language.",
      "Close with reassurance, water, stillness, or a short aftercare check-in."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk045",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 45,
    "title": "Hand-Led Dance",
    "shortTitle": "Hand-Led Dance",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore hand-led dance without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk046",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 46,
    "title": "Temple Massage",
    "shortTitle": "Temple Massage",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore temple massage without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk047",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 47,
    "title": "Secret Signal Ritual",
    "shortTitle": "Secret Signal Ritual",
    "subtitle": "A symbolic edge ritual using clear consent, pause words, and reversible intensity.",
    "category": "kink-lite",
    "intensity": "high",
    "polarity": "receiver-led",
    "durationMinutes": 8,
    "weatherTags": [
      "Electric",
      "Sunny",
      "Warm"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "power-dynamic",
    "premiumTier": "premium",
    "steps": [
      "Begin by naming the boundary, the intention, and a clear pause word.",
      "Ask for an explicit yes before starting, and keep the ritual slow enough to stop at any moment.",
      "Explore secret signal ritual only within the agreed limits, watching breath, tone, and body language.",
      "Close with reassurance, water, stillness, or a short aftercare check-in."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk048",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 48,
    "title": "Pillow Lap Rest",
    "shortTitle": "Pillow Lap Rest",
    "subtitle": "A restorative ritual where rest, safety, and low-effort closeness become intimacy.",
    "category": "rest",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Stormy",
      "Frozen",
      "Foggy"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Prepare the space so the ritual feels calm, simple, and unhurried.",
      "Breathe together slowly and let the body arrive before adding words or touch.",
      "Practice pillow lap rest with full attention for a few quiet minutes.",
      "End with one word each about what shifted in the body or heart."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk049",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 49,
    "title": "Ribbons of Choice",
    "shortTitle": "Ribbons of Choice",
    "subtitle": "A choice-based ritual that protects sovereignty and lets the smallest clear yes lead.",
    "category": "choice",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Stormy",
      "Frozen",
      "Foggy"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Sit close enough to feel present, but far enough that both partners feel free.",
      "Each partner names one honest feeling without debating or fixing it.",
      "Choose one small gesture of care that feels like a clear yes for both.",
      "Close by thanking each other for the honesty and the restraint."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk050",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 50,
    "title": "The Doorway Pause",
    "shortTitle": "The Doorway Pause",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "free",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore the doorway pause without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk051",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 51,
    "title": "Knee Touch Check-In",
    "shortTitle": "Knee Touch Check-In",
    "subtitle": "A slow sensual ritual built around anticipation, consent, and embodied closeness.",
    "category": "sensual",
    "intensity": "medium",
    "polarity": "mutual",
    "durationMinutes": 8,
    "weatherTags": [
      "Warm",
      "Electric",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore knee touch check-in without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk052",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 52,
    "title": "Ribbon Restraint Lite",
    "shortTitle": "Ribbon Restraint Lite",
    "subtitle": "A symbolic edge ritual using clear consent, pause words, and reversible intensity.",
    "category": "kink-lite",
    "intensity": "high",
    "polarity": "receiver-led",
    "durationMinutes": 8,
    "weatherTags": [
      "Electric",
      "Sunny",
      "Warm"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "power-dynamic",
    "premiumTier": "premium",
    "steps": [
      "Begin by naming the boundary, the intention, and a clear pause word.",
      "Ask for an explicit yes before starting, and keep the ritual slow enough to stop at any moment.",
      "Explore ribbon restraint lite only within the agreed limits, watching breath, tone, and body language.",
      "Close with reassurance, water, stillness, or a short aftercare check-in."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk053",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 53,
    "title": "Scented Letter Reading",
    "shortTitle": "Scented Letter Reading",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore scented letter reading without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk054",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 54,
    "title": "Chosen Music Ritual",
    "shortTitle": "Chosen Music Ritual",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore chosen music ritual without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk055",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 55,
    "title": "Praise and Pause",
    "shortTitle": "Praise and Pause",
    "subtitle": "A spoken devotion ritual to help each partner feel seen, wanted, and valued.",
    "category": "appreciation",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Face each other and take one slow breath before speaking.",
      "Offer one sincere sentence of appreciation, reverence, or care.",
      "Let the receiver simply breathe and receive without needing to answer immediately.",
      "Switch roles, then close with a hand squeeze, hug, or forehead touch."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk056",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 56,
    "title": "Seated Straddle Hug",
    "shortTitle": "Seated Straddle Hug",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore seated straddle hug without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk057",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 57,
    "title": "The One-Inch Rule",
    "shortTitle": "The One-Inch Rule",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore the one-inch rule without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk058",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 58,
    "title": "Soft Command Exchange",
    "shortTitle": "Soft Command Exchange",
    "subtitle": "A symbolic edge ritual using clear consent, pause words, and reversible intensity.",
    "category": "kink-lite",
    "intensity": "high",
    "polarity": "receiver-led",
    "durationMinutes": 8,
    "weatherTags": [
      "Electric",
      "Sunny",
      "Warm"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "power-dynamic",
    "premiumTier": "premium",
    "steps": [
      "Begin by naming the boundary, the intention, and a clear pause word.",
      "Ask for an explicit yes before starting, and keep the ritual slow enough to stop at any moment.",
      "Explore soft command exchange only within the agreed limits, watching breath, tone, and body language.",
      "Close with reassurance, water, stillness, or a short aftercare check-in."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk059",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 59,
    "title": "Shared Silence Bathing Prep",
    "shortTitle": "Shared Silence Bathing Prep",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore shared silence bathing prep without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk060",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 60,
    "title": "Breath at the Neck",
    "shortTitle": "Breath at the Neck",
    "subtitle": "A breath-led practice to regulate the nervous system and reconnect without pressure.",
    "category": "breath",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Stormy",
      "Frozen",
      "Foggy"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Prepare the space so the ritual feels calm, simple, and unhurried.",
      "Breathe together slowly and let the body arrive before adding words or touch.",
      "Practice breath at the neck with full attention for a few quiet minutes.",
      "End with one word each about what shifted in the body or heart."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk061",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 61,
    "title": "The Choice Card Ritual",
    "shortTitle": "The Choice Card Ritual",
    "subtitle": "A choice-based ritual that protects sovereignty and lets the smallest clear yes lead.",
    "category": "choice",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Stormy",
      "Frozen",
      "Foggy"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Sit close enough to feel present, but far enough that both partners feel free.",
      "Each partner names one honest feeling without debating or fixing it.",
      "Choose one small gesture of care that feels like a clear yes for both.",
      "Close by thanking each other for the honesty and the restraint."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk062",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 62,
    "title": "Grounding with Pressure",
    "shortTitle": "Grounding with Pressure",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore grounding with pressure without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk063",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 63,
    "title": "The Ritual of Asking Twice",
    "shortTitle": "The Ritual of Asking Twice",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "high",
    "polarity": "receiver-led",
    "durationMinutes": 8,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "explicit-check-in",
    "premiumTier": "premium",
    "steps": [
      "Begin by naming the boundary, the intention, and a clear pause word.",
      "Ask for an explicit yes before starting, and keep the ritual slow enough to stop at any moment.",
      "Explore the ritual of asking twice only within the agreed limits, watching breath, tone, and body language.",
      "Close with reassurance, water, stillness, or a short aftercare check-in."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk064",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 64,
    "title": "Belly Breathing Hold",
    "shortTitle": "Belly Breathing Hold",
    "subtitle": "A breath-led practice to regulate the nervous system and reconnect without pressure.",
    "category": "breath",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Stormy",
      "Frozen",
      "Foggy"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Prepare the space so the ritual feels calm, simple, and unhurried.",
      "Breathe together slowly and let the body arrive before adding words or touch.",
      "Practice belly breathing hold with full attention for a few quiet minutes.",
      "End with one word each about what shifted in the body or heart."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk065",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 65,
    "title": "Teasing by Delay",
    "shortTitle": "Teasing by Delay",
    "subtitle": "A light, playful ritual for curiosity, flirtation, and joyful connection.",
    "category": "play",
    "intensity": "medium",
    "polarity": "mutual",
    "durationMinutes": 8,
    "weatherTags": [
      "Electric",
      "Sunny",
      "Warm"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore teasing by delay without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk066",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 66,
    "title": "Sensation Menu",
    "shortTitle": "Sensation Menu",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore sensation menu without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk067",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 67,
    "title": "Mantle of Care",
    "shortTitle": "Mantle of Care",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore mantle of care without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk068",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 68,
    "title": "The Receiving Chair",
    "shortTitle": "The Receiving Chair",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore the receiving chair without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk069",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 69,
    "title": "Slow Zipper Ritual",
    "shortTitle": "Slow Zipper Ritual",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore slow zipper ritual without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk070",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 70,
    "title": "Sensual Object Offering",
    "shortTitle": "Sensual Object Offering",
    "subtitle": "A slow sensual ritual built around anticipation, consent, and embodied closeness.",
    "category": "sensual",
    "intensity": "medium",
    "polarity": "mutual",
    "durationMinutes": 8,
    "weatherTags": [
      "Warm",
      "Electric",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore sensual object offering without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk071",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 71,
    "title": "Breath and Restraint Dialogue",
    "shortTitle": "Breath and Restraint Dialogue",
    "subtitle": "A symbolic edge ritual using clear consent, pause words, and reversible intensity.",
    "category": "kink-lite",
    "intensity": "high",
    "polarity": "receiver-led",
    "durationMinutes": 8,
    "weatherTags": [
      "Electric",
      "Sunny",
      "Warm"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "power-dynamic",
    "premiumTier": "premium",
    "steps": [
      "Begin by naming the boundary, the intention, and a clear pause word.",
      "Ask for an explicit yes before starting, and keep the ritual slow enough to stop at any moment.",
      "Explore breath and restraint dialogue only within the agreed limits, watching breath, tone, and body language.",
      "Close with reassurance, water, stillness, or a short aftercare check-in."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk072",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 72,
    "title": "The Turn-Toward Ritual",
    "shortTitle": "The Turn-Toward Ritual",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore the turn-toward ritual without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk073",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 73,
    "title": "Nape-of-Neck Touch",
    "shortTitle": "Nape-of-Neck Touch",
    "subtitle": "A slow sensual ritual built around anticipation, consent, and embodied closeness.",
    "category": "sensual",
    "intensity": "medium",
    "polarity": "mutual",
    "durationMinutes": 8,
    "weatherTags": [
      "Warm",
      "Electric",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore nape-of-neck touch without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk074",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 74,
    "title": "Guided Words Only",
    "shortTitle": "Guided Words Only",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore guided words only without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk075",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 75,
    "title": "Soft Bite Fantasy Talk",
    "shortTitle": "Soft Bite Fantasy Talk",
    "subtitle": "A symbolic edge ritual using clear consent, pause words, and reversible intensity.",
    "category": "kink-lite",
    "intensity": "high",
    "polarity": "receiver-led",
    "durationMinutes": 8,
    "weatherTags": [
      "Electric",
      "Sunny",
      "Warm"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "power-dynamic",
    "premiumTier": "premium",
    "steps": [
      "Begin by naming the boundary, the intention, and a clear pause word.",
      "Ask for an explicit yes before starting, and keep the ritual slow enough to stop at any moment.",
      "Explore soft bite fantasy talk only within the agreed limits, watching breath, tone, and body language.",
      "Close with reassurance, water, stillness, or a short aftercare check-in."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk076",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 76,
    "title": "Kiss Map",
    "shortTitle": "Kiss Map",
    "subtitle": "A slow sensual ritual built around anticipation, consent, and embodied closeness.",
    "category": "sensual",
    "intensity": "medium",
    "polarity": "mutual",
    "durationMinutes": 8,
    "weatherTags": [
      "Warm",
      "Electric",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore kiss map without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk077",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 77,
    "title": "The Sacred No",
    "shortTitle": "The Sacred No",
    "subtitle": "A choice-based ritual that protects sovereignty and lets the smallest clear yes lead.",
    "category": "choice",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Stormy",
      "Frozen",
      "Foggy"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "free",
    "steps": [
      "Sit close enough to feel present, but far enough that both partners feel free.",
      "Each partner names one honest feeling without debating or fixing it.",
      "Choose one small gesture of care that feels like a clear yes for both.",
      "Close by thanking each other for the honesty and the restraint."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk078",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 78,
    "title": "Feet-to-Feet Rest",
    "shortTitle": "Feet-to-Feet Rest",
    "subtitle": "A restorative ritual where rest, safety, and low-effort closeness become intimacy.",
    "category": "rest",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Stormy",
      "Frozen",
      "Foggy"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Prepare the space so the ritual feels calm, simple, and unhurried.",
      "Breathe together slowly and let the body arrive before adding words or touch.",
      "Practice feet-to-feet rest with full attention for a few quiet minutes.",
      "End with one word each about what shifted in the body or heart."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk079",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 79,
    "title": "The Service Minute",
    "shortTitle": "The Service Minute",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore the service minute without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk080",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 80,
    "title": "Curtain Reveal",
    "shortTitle": "Curtain Reveal",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore curtain reveal without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk081",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 81,
    "title": "The Tender Countdown",
    "shortTitle": "The Tender Countdown",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore the tender countdown without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk082",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 82,
    "title": "Cuff of Trust",
    "shortTitle": "Cuff of Trust",
    "subtitle": "A symbolic edge ritual using clear consent, pause words, and reversible intensity.",
    "category": "kink-lite",
    "intensity": "high",
    "polarity": "receiver-led",
    "durationMinutes": 8,
    "weatherTags": [
      "Electric",
      "Sunny",
      "Warm"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "power-dynamic",
    "premiumTier": "premium",
    "steps": [
      "Begin by naming the boundary, the intention, and a clear pause word.",
      "Ask for an explicit yes before starting, and keep the ritual slow enough to stop at any moment.",
      "Explore cuff of trust only within the agreed limits, watching breath, tone, and body language.",
      "Close with reassurance, water, stillness, or a short aftercare check-in."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk083",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 83,
    "title": "Gratitude on Skin",
    "shortTitle": "Gratitude on Skin",
    "subtitle": "A spoken devotion ritual to help each partner feel seen, wanted, and valued.",
    "category": "appreciation",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Face each other and take one slow breath before speaking.",
      "Offer one sincere sentence of appreciation, reverence, or care.",
      "Let the receiver simply breathe and receive without needing to answer immediately.",
      "Switch roles, then close with a hand squeeze, hug, or forehead touch."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk084",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 84,
    "title": "The Long Embrace",
    "shortTitle": "The Long Embrace",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "free",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore the long embrace without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk085",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 85,
    "title": "Pause Before Pleasure",
    "shortTitle": "Pause Before Pleasure",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore pause before pleasure without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk086",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 86,
    "title": "Moonlight Sit",
    "shortTitle": "Moonlight Sit",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore moonlight sit without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk087",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 87,
    "title": "Guided Worship Words",
    "shortTitle": "Guided Worship Words",
    "subtitle": "A reverent couple ritual for tenderness, gratitude, and sacred presence.",
    "category": "devotional",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Warm",
      "Electric",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Face each other and take one slow breath before speaking.",
      "Offer one sincere sentence of appreciation, reverence, or care.",
      "Let the receiver simply breathe and receive without needing to answer immediately.",
      "Switch roles, then close with a hand squeeze, hug, or forehead touch."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk088",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 88,
    "title": "Safe Word Practice Scene",
    "shortTitle": "Safe Word Practice Scene",
    "subtitle": "A symbolic edge ritual using clear consent, pause words, and reversible intensity.",
    "category": "kink-lite",
    "intensity": "high",
    "polarity": "receiver-led",
    "durationMinutes": 8,
    "weatherTags": [
      "Electric",
      "Sunny",
      "Warm"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "power-dynamic",
    "premiumTier": "premium",
    "steps": [
      "Begin by naming the boundary, the intention, and a clear pause word.",
      "Ask for an explicit yes before starting, and keep the ritual slow enough to stop at any moment.",
      "Explore safe word practice scene only within the agreed limits, watching breath, tone, and body language.",
      "Close with reassurance, water, stillness, or a short aftercare check-in."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk089",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 89,
    "title": "The Edge of Touch",
    "shortTitle": "The Edge of Touch",
    "subtitle": "A slow sensual ritual built around anticipation, consent, and embodied closeness.",
    "category": "sensual",
    "intensity": "medium",
    "polarity": "mutual",
    "durationMinutes": 8,
    "weatherTags": [
      "Warm",
      "Electric",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore the edge of touch without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk090",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 90,
    "title": "Two-Handed Face Hold",
    "shortTitle": "Two-Handed Face Hold",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore two-handed face hold without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk091",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 91,
    "title": "Sensual Reading Aloud",
    "shortTitle": "Sensual Reading Aloud",
    "subtitle": "A slow sensual ritual built around anticipation, consent, and embodied closeness.",
    "category": "sensual",
    "intensity": "medium",
    "polarity": "mutual",
    "durationMinutes": 8,
    "weatherTags": [
      "Warm",
      "Electric",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore sensual reading aloud without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk092",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 92,
    "title": "Weighted Blanket Reassurance",
    "shortTitle": "Weighted Blanket Reassurance",
    "subtitle": "A restorative ritual where rest, safety, and low-effort closeness become intimacy.",
    "category": "rest",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Stormy",
      "Frozen",
      "Foggy"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "free",
    "steps": [
      "Prepare the space so the ritual feels calm, simple, and unhurried.",
      "Breathe together slowly and let the body arrive before adding words or touch.",
      "Practice weighted blanket reassurance with full attention for a few quiet minutes.",
      "End with one word each about what shifted in the body or heart."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk093",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 93,
    "title": "The Ritual of Choice",
    "shortTitle": "The Ritual of Choice",
    "subtitle": "A choice-based ritual that protects sovereignty and lets the smallest clear yes lead.",
    "category": "choice",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Stormy",
      "Frozen",
      "Foggy"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "free",
    "steps": [
      "Sit close enough to feel present, but far enough that both partners feel free.",
      "Each partner names one honest feeling without debating or fixing it.",
      "Choose one small gesture of care that feels like a clear yes for both.",
      "Close by thanking each other for the honesty and the restraint."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk094",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 94,
    "title": "Open-Palm Offering",
    "shortTitle": "Open-Palm Offering",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "free",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore open-palm offering without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk095",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 95,
    "title": "Shower of Praise",
    "shortTitle": "Shower of Praise",
    "subtitle": "A spoken devotion ritual to help each partner feel seen, wanted, and valued.",
    "category": "appreciation",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Face each other and take one slow breath before speaking.",
      "Offer one sincere sentence of appreciation, reverence, or care.",
      "Let the receiver simply breathe and receive without needing to answer immediately.",
      "Switch roles, then close with a hand squeeze, hug, or forehead touch."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk096",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 96,
    "title": "The Return Touch",
    "shortTitle": "The Return Touch",
    "subtitle": "A slow sensual ritual built around anticipation, consent, and embodied closeness.",
    "category": "sensual",
    "intensity": "medium",
    "polarity": "mutual",
    "durationMinutes": 8,
    "weatherTags": [
      "Warm",
      "Electric",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore the return touch without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk097",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 97,
    "title": "Soft Restraint Conversation",
    "shortTitle": "Soft Restraint Conversation",
    "subtitle": "A symbolic edge ritual using clear consent, pause words, and reversible intensity.",
    "category": "kink-lite",
    "intensity": "high",
    "polarity": "receiver-led",
    "durationMinutes": 8,
    "weatherTags": [
      "Electric",
      "Sunny",
      "Warm"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "power-dynamic",
    "premiumTier": "premium",
    "steps": [
      "Begin by naming the boundary, the intention, and a clear pause word.",
      "Ask for an explicit yes before starting, and keep the ritual slow enough to stop at any moment.",
      "Explore soft restraint conversation only within the agreed limits, watching breath, tone, and body language.",
      "Close with reassurance, water, stillness, or a short aftercare check-in."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk098",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 98,
    "title": "Devotional Cleanup",
    "shortTitle": "Devotional Cleanup",
    "subtitle": "A closing ritual to help both partners settle, integrate, and feel cared for.",
    "category": "aftercare",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore devotional cleanup without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk099",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 99,
    "title": "Three Breaths Before Goodbye",
    "shortTitle": "Three Breaths Before Goodbye",
    "subtitle": "A breath-led practice to regulate the nervous system and reconnect without pressure.",
    "category": "breath",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Stormy",
      "Frozen",
      "Foggy"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "free",
    "steps": [
      "Prepare the space so the ritual feels calm, simple, and unhurried.",
      "Breathe together slowly and let the body arrive before adding words or touch.",
      "Practice three breaths before goodbye with full attention for a few quiet minutes.",
      "End with one word each about what shifted in the body or heart."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "tk100",
    "sourceSet": "tantric-kinky-100",
    "sourceNumber": 100,
    "title": "Weekly Reconnection Vow",
    "shortTitle": "Weekly Reconnection Vow",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore weekly reconnection vow without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs001",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 1,
    "title": "Mouth-to-Mouth Breathing Pause",
    "shortTitle": "Mouth-to-Mouth Breathing Pause",
    "subtitle": "A breath-led practice to regulate the nervous system and reconnect without pressure.",
    "category": "breath",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Stormy",
      "Frozen",
      "Foggy"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "free",
    "steps": [
      "Prepare the space so the ritual feels calm, simple, and unhurried.",
      "Breathe together slowly and let the body arrive before adding words or touch.",
      "Practice mouth-to-mouth breathing pause with full attention for a few quiet minutes.",
      "End with one word each about what shifted in the body or heart."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs002",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 2,
    "title": "The Long First Kiss",
    "shortTitle": "The Long First Kiss",
    "subtitle": "A slow sensual ritual built around anticipation, consent, and embodied closeness.",
    "category": "sensual",
    "intensity": "medium",
    "polarity": "mutual",
    "durationMinutes": 8,
    "weatherTags": [
      "Warm",
      "Electric",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "free",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore the long first kiss without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs003",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 3,
    "title": "Chest-to-Chest Stillness",
    "shortTitle": "Chest-to-Chest Stillness",
    "subtitle": "A slow sensual ritual built around anticipation, consent, and embodied closeness.",
    "category": "sensual",
    "intensity": "medium",
    "polarity": "mutual",
    "durationMinutes": 8,
    "weatherTags": [
      "Warm",
      "Electric",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "free",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore chest-to-chest stillness without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs004",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 4,
    "title": "Neck and Breath Ritual",
    "shortTitle": "Neck and Breath Ritual",
    "subtitle": "A breath-led practice to regulate the nervous system and reconnect without pressure.",
    "category": "breath",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Stormy",
      "Frozen",
      "Foggy"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Prepare the space so the ritual feels calm, simple, and unhurried.",
      "Breathe together slowly and let the body arrive before adding words or touch.",
      "Practice neck and breath ritual with full attention for a few quiet minutes.",
      "End with one word each about what shifted in the body or heart."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs005",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 5,
    "title": "Kiss Trail on the Shoulder",
    "shortTitle": "Kiss Trail on the Shoulder",
    "subtitle": "A slow sensual ritual built around anticipation, consent, and embodied closeness.",
    "category": "sensual",
    "intensity": "medium",
    "polarity": "mutual",
    "durationMinutes": 8,
    "weatherTags": [
      "Warm",
      "Electric",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore kiss trail on the shoulder without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs006",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 6,
    "title": "Lap Invitation",
    "shortTitle": "Lap Invitation",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore lap invitation without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs007",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 7,
    "title": "Tongue-Free Makeout Ritual",
    "shortTitle": "Tongue-Free Makeout Ritual",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore tongue-free makeout ritual without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs008",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 8,
    "title": "The Slow Waist Hold",
    "shortTitle": "The Slow Waist Hold",
    "subtitle": "A slow sensual ritual built around anticipation, consent, and embodied closeness.",
    "category": "sensual",
    "intensity": "medium",
    "polarity": "mutual",
    "durationMinutes": 8,
    "weatherTags": [
      "Warm",
      "Electric",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore the slow waist hold without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs009",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 9,
    "title": "Ear Whisper and Kiss",
    "shortTitle": "Ear Whisper and Kiss",
    "subtitle": "A slow sensual ritual built around anticipation, consent, and embodied closeness.",
    "category": "sensual",
    "intensity": "medium",
    "polarity": "mutual",
    "durationMinutes": 8,
    "weatherTags": [
      "Warm",
      "Electric",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore ear whisper and kiss without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs010",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 10,
    "title": "Seated Straddle Stillness",
    "shortTitle": "Seated Straddle Stillness",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore seated straddle stillness without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs011",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 11,
    "title": "Slow Hip Sway",
    "shortTitle": "Slow Hip Sway",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore slow hip sway without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs012",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 12,
    "title": "Bare Arm Worship",
    "shortTitle": "Bare Arm Worship",
    "subtitle": "A reverent couple ritual for tenderness, gratitude, and sacred presence.",
    "category": "devotional",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Warm",
      "Electric",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Face each other and take one slow breath before speaking.",
      "Offer one sincere sentence of appreciation, reverence, or care.",
      "Let the receiver simply breathe and receive without needing to answer immediately.",
      "Switch roles, then close with a hand squeeze, hug, or forehead touch."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs013",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 13,
    "title": "Pillow Pinning Lite",
    "shortTitle": "Pillow Pinning Lite",
    "subtitle": "A symbolic edge ritual using clear consent, pause words, and reversible intensity.",
    "category": "kink-lite",
    "intensity": "high",
    "polarity": "receiver-led",
    "durationMinutes": 8,
    "weatherTags": [
      "Electric",
      "Sunny",
      "Warm"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "power-dynamic",
    "premiumTier": "premium",
    "steps": [
      "Begin by naming the boundary, the intention, and a clear pause word.",
      "Ask for an explicit yes before starting, and keep the ritual slow enough to stop at any moment.",
      "Explore pillow pinning lite only within the agreed limits, watching breath, tone, and body language.",
      "Close with reassurance, water, stillness, or a short aftercare check-in."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs014",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 14,
    "title": "Mirror Undressing",
    "shortTitle": "Mirror Undressing",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "high",
    "polarity": "receiver-led",
    "durationMinutes": 8,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "explicit-check-in",
    "premiumTier": "premium",
    "steps": [
      "Begin by naming the boundary, the intention, and a clear pause word.",
      "Ask for an explicit yes before starting, and keep the ritual slow enough to stop at any moment.",
      "Explore mirror undressing only within the agreed limits, watching breath, tone, and body language.",
      "Close with reassurance, water, stillness, or a short aftercare check-in."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs015",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 15,
    "title": "Lip Brush Tease",
    "shortTitle": "Lip Brush Tease",
    "subtitle": "A light, playful ritual for curiosity, flirtation, and joyful connection.",
    "category": "play",
    "intensity": "medium",
    "polarity": "mutual",
    "durationMinutes": 8,
    "weatherTags": [
      "Electric",
      "Sunny",
      "Warm"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore lip brush tease without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs016",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 16,
    "title": "The Back of the Neck Kiss",
    "shortTitle": "The Back of the Neck Kiss",
    "subtitle": "A slow sensual ritual built around anticipation, consent, and embodied closeness.",
    "category": "sensual",
    "intensity": "medium",
    "polarity": "mutual",
    "durationMinutes": 8,
    "weatherTags": [
      "Warm",
      "Electric",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore the back of the neck kiss without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs017",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 17,
    "title": "Thigh Over Clothing Touch",
    "shortTitle": "Thigh Over Clothing Touch",
    "subtitle": "A slow sensual ritual built around anticipation, consent, and embodied closeness.",
    "category": "sensual",
    "intensity": "high",
    "polarity": "receiver-led",
    "durationMinutes": 8,
    "weatherTags": [
      "Warm",
      "Electric",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "explicit-check-in",
    "premiumTier": "premium",
    "steps": [
      "Begin by naming the boundary, the intention, and a clear pause word.",
      "Ask for an explicit yes before starting, and keep the ritual slow enough to stop at any moment.",
      "Explore thigh over clothing touch only within the agreed limits, watching breath, tone, and body language.",
      "Close with reassurance, water, stillness, or a short aftercare check-in."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs018",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 18,
    "title": "Guided Kiss Map",
    "shortTitle": "Guided Kiss Map",
    "subtitle": "A slow sensual ritual built around anticipation, consent, and embodied closeness.",
    "category": "sensual",
    "intensity": "medium",
    "polarity": "mutual",
    "durationMinutes": 8,
    "weatherTags": [
      "Warm",
      "Electric",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore guided kiss map without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs019",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 19,
    "title": "Shirt Hem Tease",
    "shortTitle": "Shirt Hem Tease",
    "subtitle": "A light, playful ritual for curiosity, flirtation, and joyful connection.",
    "category": "play",
    "intensity": "high",
    "polarity": "receiver-led",
    "durationMinutes": 8,
    "weatherTags": [
      "Electric",
      "Sunny",
      "Warm"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "explicit-check-in",
    "premiumTier": "premium",
    "steps": [
      "Begin by naming the boundary, the intention, and a clear pause word.",
      "Ask for an explicit yes before starting, and keep the ritual slow enough to stop at any moment.",
      "Explore shirt hem tease only within the agreed limits, watching breath, tone, and body language.",
      "Close with reassurance, water, stillness, or a short aftercare check-in."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs020",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 20,
    "title": "Full-Body Hug at the Wall",
    "shortTitle": "Full-Body Hug at the Wall",
    "subtitle": "A slow sensual ritual built around anticipation, consent, and embodied closeness.",
    "category": "sensual",
    "intensity": "medium",
    "polarity": "mutual",
    "durationMinutes": 8,
    "weatherTags": [
      "Warm",
      "Electric",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore full-body hug at the wall without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs021",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 21,
    "title": "Palm on Lower Back",
    "shortTitle": "Palm on Lower Back",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore palm on lower back without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs022",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 22,
    "title": "Wet Lips Ritual",
    "shortTitle": "Wet Lips Ritual",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore wet lips ritual without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs023",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 23,
    "title": "Hair Pull Communication Ritual",
    "shortTitle": "Hair Pull Communication Ritual",
    "subtitle": "A symbolic edge ritual using clear consent, pause words, and reversible intensity.",
    "category": "kink-lite",
    "intensity": "high",
    "polarity": "receiver-led",
    "durationMinutes": 8,
    "weatherTags": [
      "Electric",
      "Sunny",
      "Warm"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "power-dynamic",
    "premiumTier": "premium",
    "steps": [
      "Begin by naming the boundary, the intention, and a clear pause word.",
      "Ask for an explicit yes before starting, and keep the ritual slow enough to stop at any moment.",
      "Explore hair pull communication ritual only within the agreed limits, watching breath, tone, and body language.",
      "Close with reassurance, water, stillness, or a short aftercare check-in."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs024",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 24,
    "title": "Mouth on Wrist",
    "shortTitle": "Mouth on Wrist",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore mouth on wrist without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs025",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 25,
    "title": "Guided Hands",
    "shortTitle": "Guided Hands",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore guided hands without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs026",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 26,
    "title": "Lying Face-to-Face",
    "shortTitle": "Lying Face-to-Face",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore lying face-to-face without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs027",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 27,
    "title": "Collarbone Devotion",
    "shortTitle": "Collarbone Devotion",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore collarbone devotion without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs028",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 28,
    "title": "The Breath-Loaded Kiss",
    "shortTitle": "The Breath-Loaded Kiss",
    "subtitle": "A breath-led practice to regulate the nervous system and reconnect without pressure.",
    "category": "breath",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Stormy",
      "Frozen",
      "Foggy"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Prepare the space so the ritual feels calm, simple, and unhurried.",
      "Breathe together slowly and let the body arrive before adding words or touch.",
      "Practice the breath-loaded kiss with full attention for a few quiet minutes.",
      "End with one word each about what shifted in the body or heart."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs029",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 29,
    "title": "Bare Back Tracing",
    "shortTitle": "Bare Back Tracing",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore bare back tracing without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs030",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 30,
    "title": "The Almost-Touch Ritual",
    "shortTitle": "The Almost-Touch Ritual",
    "subtitle": "A slow sensual ritual built around anticipation, consent, and embodied closeness.",
    "category": "sensual",
    "intensity": "medium",
    "polarity": "mutual",
    "durationMinutes": 8,
    "weatherTags": [
      "Warm",
      "Electric",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore the almost-touch ritual without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs031",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 31,
    "title": "Deep Kiss and Restraint Pause",
    "shortTitle": "Deep Kiss and Restraint Pause",
    "subtitle": "A symbolic edge ritual using clear consent, pause words, and reversible intensity.",
    "category": "kink-lite",
    "intensity": "high",
    "polarity": "receiver-led",
    "durationMinutes": 8,
    "weatherTags": [
      "Electric",
      "Sunny",
      "Warm"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "power-dynamic",
    "premiumTier": "premium",
    "steps": [
      "Begin by naming the boundary, the intention, and a clear pause word.",
      "Ask for an explicit yes before starting, and keep the ritual slow enough to stop at any moment.",
      "Explore deep kiss and restraint pause only within the agreed limits, watching breath, tone, and body language.",
      "Close with reassurance, water, stillness, or a short aftercare check-in."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs032",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 32,
    "title": "Warm Oil Shoulder Slide",
    "shortTitle": "Warm Oil Shoulder Slide",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore warm oil shoulder slide without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs033",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 33,
    "title": "Inner Arm Kiss Line",
    "shortTitle": "Inner Arm Kiss Line",
    "subtitle": "A slow sensual ritual built around anticipation, consent, and embodied closeness.",
    "category": "sensual",
    "intensity": "medium",
    "polarity": "mutual",
    "durationMinutes": 8,
    "weatherTags": [
      "Warm",
      "Electric",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore inner arm kiss line without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs034",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 34,
    "title": "The Guided Lean-In",
    "shortTitle": "The Guided Lean-In",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore the guided lean-in without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs035",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 35,
    "title": "Tongue Tease at the Kiss Edge",
    "shortTitle": "Tongue Tease at the Kiss Edge",
    "subtitle": "A slow sensual ritual built around anticipation, consent, and embodied closeness.",
    "category": "sensual",
    "intensity": "medium",
    "polarity": "mutual",
    "durationMinutes": 8,
    "weatherTags": [
      "Warm",
      "Electric",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore tongue tease at the kiss edge without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs036",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 36,
    "title": "Behind-the-Back Hold",
    "shortTitle": "Behind-the-Back Hold",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore behind-the-back hold without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs037",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 37,
    "title": "The Bedside Crawl",
    "shortTitle": "The Bedside Crawl",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore the bedside crawl without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs038",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 38,
    "title": "Forearm Pin and Kiss",
    "shortTitle": "Forearm Pin and Kiss",
    "subtitle": "A symbolic edge ritual using clear consent, pause words, and reversible intensity.",
    "category": "kink-lite",
    "intensity": "high",
    "polarity": "receiver-led",
    "durationMinutes": 8,
    "weatherTags": [
      "Electric",
      "Sunny",
      "Warm"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "power-dynamic",
    "premiumTier": "premium",
    "steps": [
      "Begin by naming the boundary, the intention, and a clear pause word.",
      "Ask for an explicit yes before starting, and keep the ritual slow enough to stop at any moment.",
      "Explore forearm pin and kiss only within the agreed limits, watching breath, tone, and body language.",
      "Close with reassurance, water, stillness, or a short aftercare check-in."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs039",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 39,
    "title": "Lower Belly Hold",
    "shortTitle": "Lower Belly Hold",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore lower belly hold without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs040",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 40,
    "title": "The Devotional Unbuttoning",
    "shortTitle": "The Devotional Unbuttoning",
    "subtitle": "A reverent couple ritual for tenderness, gratitude, and sacred presence.",
    "category": "devotional",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Warm",
      "Electric",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Face each other and take one slow breath before speaking.",
      "Offer one sincere sentence of appreciation, reverence, or care.",
      "Let the receiver simply breathe and receive without needing to answer immediately.",
      "Switch roles, then close with a hand squeeze, hug, or forehead touch."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs041",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 41,
    "title": "Slow Kissing Countdown",
    "shortTitle": "Slow Kissing Countdown",
    "subtitle": "A slow sensual ritual built around anticipation, consent, and embodied closeness.",
    "category": "sensual",
    "intensity": "medium",
    "polarity": "mutual",
    "durationMinutes": 8,
    "weatherTags": [
      "Warm",
      "Electric",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore slow kissing countdown without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs042",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 42,
    "title": "The Couch Pull-In",
    "shortTitle": "The Couch Pull-In",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore the couch pull-in without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs043",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 43,
    "title": "Shoulder Bite Talk",
    "shortTitle": "Shoulder Bite Talk",
    "subtitle": "A symbolic edge ritual using clear consent, pause words, and reversible intensity.",
    "category": "kink-lite",
    "intensity": "high",
    "polarity": "receiver-led",
    "durationMinutes": 8,
    "weatherTags": [
      "Electric",
      "Sunny",
      "Warm"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "power-dynamic",
    "premiumTier": "premium",
    "steps": [
      "Begin by naming the boundary, the intention, and a clear pause word.",
      "Ask for an explicit yes before starting, and keep the ritual slow enough to stop at any moment.",
      "Explore shoulder bite talk only within the agreed limits, watching breath, tone, and body language.",
      "Close with reassurance, water, stillness, or a short aftercare check-in."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs044",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 44,
    "title": "Breath Between Kisses",
    "shortTitle": "Breath Between Kisses",
    "subtitle": "A breath-led practice to regulate the nervous system and reconnect without pressure.",
    "category": "breath",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Stormy",
      "Frozen",
      "Foggy"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Prepare the space so the ritual feels calm, simple, and unhurried.",
      "Breathe together slowly and let the body arrive before adding words or touch.",
      "Practice breath between kisses with full attention for a few quiet minutes.",
      "End with one word each about what shifted in the body or heart."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs045",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 45,
    "title": "Hands Under the Shirt",
    "shortTitle": "Hands Under the Shirt",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore hands under the shirt without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs046",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 46,
    "title": "Nape Hold and Whisper",
    "shortTitle": "Nape Hold and Whisper",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore nape hold and whisper without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs047",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 47,
    "title": "Bare Leg Trace",
    "shortTitle": "Bare Leg Trace",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore bare leg trace without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs048",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 48,
    "title": "Seated Grind in Stillness",
    "shortTitle": "Seated Grind in Stillness",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "high",
    "polarity": "receiver-led",
    "durationMinutes": 8,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "explicit-check-in",
    "premiumTier": "premium",
    "steps": [
      "Begin by naming the boundary, the intention, and a clear pause word.",
      "Ask for an explicit yes before starting, and keep the ritual slow enough to stop at any moment.",
      "Explore seated grind in stillness only within the agreed limits, watching breath, tone, and body language.",
      "Close with reassurance, water, stillness, or a short aftercare check-in."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs049",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 49,
    "title": "The Lick-Sip-Kiss Ritual",
    "shortTitle": "The Lick-Sip-Kiss Ritual",
    "subtitle": "A slow sensual ritual built around anticipation, consent, and embodied closeness.",
    "category": "sensual",
    "intensity": "medium",
    "polarity": "mutual",
    "durationMinutes": 8,
    "weatherTags": [
      "Warm",
      "Electric",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore the lick-sip-kiss ritual without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs050",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 50,
    "title": "Wrist Hold Against the Wall",
    "shortTitle": "Wrist Hold Against the Wall",
    "subtitle": "A symbolic edge ritual using clear consent, pause words, and reversible intensity.",
    "category": "kink-lite",
    "intensity": "high",
    "polarity": "receiver-led",
    "durationMinutes": 8,
    "weatherTags": [
      "Electric",
      "Sunny",
      "Warm"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "power-dynamic",
    "premiumTier": "premium",
    "steps": [
      "Begin by naming the boundary, the intention, and a clear pause word.",
      "Ask for an explicit yes before starting, and keep the ritual slow enough to stop at any moment.",
      "Explore wrist hold against the wall only within the agreed limits, watching breath, tone, and body language.",
      "Close with reassurance, water, stillness, or a short aftercare check-in."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs051",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 51,
    "title": "The Slow Crawl of Fingertips",
    "shortTitle": "The Slow Crawl of Fingertips",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore the slow crawl of fingertips without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs052",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 52,
    "title": "Kissing with Hands Behind the Back",
    "shortTitle": "Kissing with Hands Behind the Back",
    "subtitle": "A symbolic edge ritual using clear consent, pause words, and reversible intensity.",
    "category": "kink-lite",
    "intensity": "high",
    "polarity": "receiver-led",
    "durationMinutes": 8,
    "weatherTags": [
      "Electric",
      "Sunny",
      "Warm"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "power-dynamic",
    "premiumTier": "premium",
    "steps": [
      "Begin by naming the boundary, the intention, and a clear pause word.",
      "Ask for an explicit yes before starting, and keep the ritual slow enough to stop at any moment.",
      "Explore kissing with hands behind the back only within the agreed limits, watching breath, tone, and body language.",
      "Close with reassurance, water, stillness, or a short aftercare check-in."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs053",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 53,
    "title": "Lingerie or Fabric Reveal",
    "shortTitle": "Lingerie or Fabric Reveal",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "high",
    "polarity": "receiver-led",
    "durationMinutes": 8,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "explicit-check-in",
    "premiumTier": "premium",
    "steps": [
      "Begin by naming the boundary, the intention, and a clear pause word.",
      "Ask for an explicit yes before starting, and keep the ritual slow enough to stop at any moment.",
      "Explore lingerie or fabric reveal only within the agreed limits, watching breath, tone, and body language.",
      "Close with reassurance, water, stillness, or a short aftercare check-in."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs054",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 54,
    "title": "The Tension at the Zipper",
    "shortTitle": "The Tension at the Zipper",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "high",
    "polarity": "receiver-led",
    "durationMinutes": 8,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "explicit-check-in",
    "premiumTier": "premium",
    "steps": [
      "Begin by naming the boundary, the intention, and a clear pause word.",
      "Ask for an explicit yes before starting, and keep the ritual slow enough to stop at any moment.",
      "Explore the tension at the zipper only within the agreed limits, watching breath, tone, and body language.",
      "Close with reassurance, water, stillness, or a short aftercare check-in."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs055",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 55,
    "title": "Lower Lip Kiss",
    "shortTitle": "Lower Lip Kiss",
    "subtitle": "A slow sensual ritual built around anticipation, consent, and embodied closeness.",
    "category": "sensual",
    "intensity": "medium",
    "polarity": "mutual",
    "durationMinutes": 8,
    "weatherTags": [
      "Warm",
      "Electric",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore lower lip kiss without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs056",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 56,
    "title": "Side-of-the-Breast or Chest Reverence",
    "shortTitle": "Side-of-the-Breast or Chest Reverence",
    "subtitle": "A slow sensual ritual built around anticipation, consent, and embodied closeness.",
    "category": "sensual",
    "intensity": "high",
    "polarity": "receiver-led",
    "durationMinutes": 8,
    "weatherTags": [
      "Warm",
      "Electric",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "explicit-check-in",
    "premiumTier": "premium",
    "steps": [
      "Begin by naming the boundary, the intention, and a clear pause word.",
      "Ask for an explicit yes before starting, and keep the ritual slow enough to stop at any moment.",
      "Explore side-of-the-breast or chest reverence only within the agreed limits, watching breath, tone, and body language.",
      "Close with reassurance, water, stillness, or a short aftercare check-in."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs057",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 57,
    "title": "Knees Apart Invitation",
    "shortTitle": "Knees Apart Invitation",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "high",
    "polarity": "receiver-led",
    "durationMinutes": 8,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "explicit-check-in",
    "premiumTier": "premium",
    "steps": [
      "Begin by naming the boundary, the intention, and a clear pause word.",
      "Ask for an explicit yes before starting, and keep the ritual slow enough to stop at any moment.",
      "Explore knees apart invitation only within the agreed limits, watching breath, tone, and body language.",
      "Close with reassurance, water, stillness, or a short aftercare check-in."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs058",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 58,
    "title": "The Guided Removal",
    "shortTitle": "The Guided Removal",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "high",
    "polarity": "receiver-led",
    "durationMinutes": 8,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "explicit-check-in",
    "premiumTier": "premium",
    "steps": [
      "Begin by naming the boundary, the intention, and a clear pause word.",
      "Ask for an explicit yes before starting, and keep the ritual slow enough to stop at any moment.",
      "Explore the guided removal only within the agreed limits, watching breath, tone, and body language.",
      "Close with reassurance, water, stillness, or a short aftercare check-in."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs059",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 59,
    "title": "Breath at the Sternum",
    "shortTitle": "Breath at the Sternum",
    "subtitle": "A breath-led practice to regulate the nervous system and reconnect without pressure.",
    "category": "breath",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Stormy",
      "Frozen",
      "Foggy"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Prepare the space so the ritual feels calm, simple, and unhurried.",
      "Breathe together slowly and let the body arrive before adding words or touch.",
      "Practice breath at the sternum with full attention for a few quiet minutes.",
      "End with one word each about what shifted in the body or heart."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs060",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 60,
    "title": "The Soft Dom Voice",
    "shortTitle": "The Soft Dom Voice",
    "subtitle": "A symbolic edge ritual using clear consent, pause words, and reversible intensity.",
    "category": "kink-lite",
    "intensity": "high",
    "polarity": "receiver-led",
    "durationMinutes": 8,
    "weatherTags": [
      "Electric",
      "Sunny",
      "Warm"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "power-dynamic",
    "premiumTier": "premium",
    "steps": [
      "Begin by naming the boundary, the intention, and a clear pause word.",
      "Ask for an explicit yes before starting, and keep the ritual slow enough to stop at any moment.",
      "Explore the soft dom voice only within the agreed limits, watching breath, tone, and body language.",
      "Close with reassurance, water, stillness, or a short aftercare check-in."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs061",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 61,
    "title": "Ribs and Waist Hold",
    "shortTitle": "Ribs and Waist Hold",
    "subtitle": "A slow sensual ritual built around anticipation, consent, and embodied closeness.",
    "category": "sensual",
    "intensity": "medium",
    "polarity": "mutual",
    "durationMinutes": 8,
    "weatherTags": [
      "Warm",
      "Electric",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore ribs and waist hold without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs062",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 62,
    "title": "The Moan Permission Ritual",
    "shortTitle": "The Moan Permission Ritual",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore the moan permission ritual without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs063",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 63,
    "title": "Wet Skin Towel Ritual",
    "shortTitle": "Wet Skin Towel Ritual",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore wet skin towel ritual without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs064",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 64,
    "title": "Face Hold with Thumb on Lip",
    "shortTitle": "Face Hold with Thumb on Lip",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore face hold with thumb on lip without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs065",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 65,
    "title": "The Slow Turnaround",
    "shortTitle": "The Slow Turnaround",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore the slow turnaround without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs066",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 66,
    "title": "Mattress Edge Ritual",
    "shortTitle": "Mattress Edge Ritual",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore mattress edge ritual without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs067",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 67,
    "title": "Bare Chest Rest",
    "shortTitle": "Bare Chest Rest",
    "subtitle": "A restorative ritual where rest, safety, and low-effort closeness become intimacy.",
    "category": "rest",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Stormy",
      "Frozen",
      "Foggy"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Prepare the space so the ritual feels calm, simple, and unhurried.",
      "Breathe together slowly and let the body arrive before adding words or touch.",
      "Practice bare chest rest with full attention for a few quiet minutes.",
      "End with one word each about what shifted in the body or heart."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs068",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 68,
    "title": "Throat and Jawline Worship",
    "shortTitle": "Throat and Jawline Worship",
    "subtitle": "A reverent couple ritual for tenderness, gratitude, and sacred presence.",
    "category": "devotional",
    "intensity": "high",
    "polarity": "receiver-led",
    "durationMinutes": 8,
    "weatherTags": [
      "Warm",
      "Electric",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "explicit-check-in",
    "premiumTier": "premium",
    "steps": [
      "Begin by naming the boundary, the intention, and a clear pause word.",
      "Ask for an explicit yes before starting, and keep the ritual slow enough to stop at any moment.",
      "Explore throat and jawline worship only within the agreed limits, watching breath, tone, and body language.",
      "Close with reassurance, water, stillness, or a short aftercare check-in."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs069",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 69,
    "title": "The Gentle Push Back",
    "shortTitle": "The Gentle Push Back",
    "subtitle": "A symbolic edge ritual using clear consent, pause words, and reversible intensity.",
    "category": "kink-lite",
    "intensity": "high",
    "polarity": "receiver-led",
    "durationMinutes": 8,
    "weatherTags": [
      "Electric",
      "Sunny",
      "Warm"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "power-dynamic",
    "premiumTier": "premium",
    "steps": [
      "Begin by naming the boundary, the intention, and a clear pause word.",
      "Ask for an explicit yes before starting, and keep the ritual slow enough to stop at any moment.",
      "Explore the gentle push back only within the agreed limits, watching breath, tone, and body language.",
      "Close with reassurance, water, stillness, or a short aftercare check-in."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs070",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 70,
    "title": "Hands Pinned to the Chest",
    "shortTitle": "Hands Pinned to the Chest",
    "subtitle": "A symbolic edge ritual using clear consent, pause words, and reversible intensity.",
    "category": "kink-lite",
    "intensity": "high",
    "polarity": "receiver-led",
    "durationMinutes": 8,
    "weatherTags": [
      "Electric",
      "Sunny",
      "Warm"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "power-dynamic",
    "premiumTier": "premium",
    "steps": [
      "Begin by naming the boundary, the intention, and a clear pause word.",
      "Ask for an explicit yes before starting, and keep the ritual slow enough to stop at any moment.",
      "Explore hands pinned to the chest only within the agreed limits, watching breath, tone, and body language.",
      "Close with reassurance, water, stillness, or a short aftercare check-in."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs071",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 71,
    "title": "The Back Arch Invitation",
    "shortTitle": "The Back Arch Invitation",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "high",
    "polarity": "receiver-led",
    "durationMinutes": 8,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "explicit-check-in",
    "premiumTier": "premium",
    "steps": [
      "Begin by naming the boundary, the intention, and a clear pause word.",
      "Ask for an explicit yes before starting, and keep the ritual slow enough to stop at any moment.",
      "Explore the back arch invitation only within the agreed limits, watching breath, tone, and body language.",
      "Close with reassurance, water, stillness, or a short aftercare check-in."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs072",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 72,
    "title": "Ice and Warmth Lite",
    "shortTitle": "Ice and Warmth Lite",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore ice and warmth lite without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs073",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 73,
    "title": "The Slow Climb Onto the Bed",
    "shortTitle": "The Slow Climb Onto the Bed",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore the slow climb onto the bed without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs074",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 74,
    "title": "Open Shirt Chest Kissing",
    "shortTitle": "Open Shirt Chest Kissing",
    "subtitle": "A slow sensual ritual built around anticipation, consent, and embodied closeness.",
    "category": "sensual",
    "intensity": "medium",
    "polarity": "mutual",
    "durationMinutes": 8,
    "weatherTags": [
      "Warm",
      "Electric",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore open shirt chest kissing without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs075",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 75,
    "title": "The Devotional Between-the-Legs Position",
    "shortTitle": "The Devotional Between-the-Legs Position",
    "subtitle": "A reverent couple ritual for tenderness, gratitude, and sacred presence.",
    "category": "devotional",
    "intensity": "high",
    "polarity": "receiver-led",
    "durationMinutes": 8,
    "weatherTags": [
      "Warm",
      "Electric",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "explicit-check-in",
    "premiumTier": "premium",
    "steps": [
      "Begin by naming the boundary, the intention, and a clear pause word.",
      "Ask for an explicit yes before starting, and keep the ritual slow enough to stop at any moment.",
      "Explore the devotional between-the-legs position only within the agreed limits, watching breath, tone, and body language.",
      "Close with reassurance, water, stillness, or a short aftercare check-in."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs076",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 76,
    "title": "Breathy Praise at the Ear",
    "shortTitle": "Breathy Praise at the Ear",
    "subtitle": "A breath-led practice to regulate the nervous system and reconnect without pressure.",
    "category": "breath",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Stormy",
      "Frozen",
      "Foggy"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Prepare the space so the ritual feels calm, simple, and unhurried.",
      "Breathe together slowly and let the body arrive before adding words or touch.",
      "Practice breathy praise at the ear with full attention for a few quiet minutes.",
      "End with one word each about what shifted in the body or heart."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs077",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 77,
    "title": "The Over-the-Hip Hold",
    "shortTitle": "The Over-the-Hip Hold",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore the over-the-hip hold without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs078",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 78,
    "title": "Sensual Shower Entry",
    "shortTitle": "Sensual Shower Entry",
    "subtitle": "A slow sensual ritual built around anticipation, consent, and embodied closeness.",
    "category": "sensual",
    "intensity": "medium",
    "polarity": "mutual",
    "durationMinutes": 8,
    "weatherTags": [
      "Warm",
      "Electric",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore sensual shower entry without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs079",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 79,
    "title": "The Devouring Kiss",
    "shortTitle": "The Devouring Kiss",
    "subtitle": "A slow sensual ritual built around anticipation, consent, and embodied closeness.",
    "category": "sensual",
    "intensity": "medium",
    "polarity": "mutual",
    "durationMinutes": 8,
    "weatherTags": [
      "Warm",
      "Electric",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore the devouring kiss without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs080",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 80,
    "title": "The One-Handed Pin",
    "shortTitle": "The One-Handed Pin",
    "subtitle": "A symbolic edge ritual using clear consent, pause words, and reversible intensity.",
    "category": "kink-lite",
    "intensity": "high",
    "polarity": "receiver-led",
    "durationMinutes": 8,
    "weatherTags": [
      "Electric",
      "Sunny",
      "Warm"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "power-dynamic",
    "premiumTier": "premium",
    "steps": [
      "Begin by naming the boundary, the intention, and a clear pause word.",
      "Ask for an explicit yes before starting, and keep the ritual slow enough to stop at any moment.",
      "Explore the one-handed pin only within the agreed limits, watching breath, tone, and body language.",
      "Close with reassurance, water, stillness, or a short aftercare check-in."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs081",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 81,
    "title": "Kneeling Between Thighs",
    "shortTitle": "Kneeling Between Thighs",
    "subtitle": "A slow sensual ritual built around anticipation, consent, and embodied closeness.",
    "category": "sensual",
    "intensity": "high",
    "polarity": "receiver-led",
    "durationMinutes": 8,
    "weatherTags": [
      "Warm",
      "Electric",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "explicit-check-in",
    "premiumTier": "premium",
    "steps": [
      "Begin by naming the boundary, the intention, and a clear pause word.",
      "Ask for an explicit yes before starting, and keep the ritual slow enough to stop at any moment.",
      "Explore kneeling between thighs only within the agreed limits, watching breath, tone, and body language.",
      "Close with reassurance, water, stillness, or a short aftercare check-in."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs082",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 82,
    "title": "The Back Press",
    "shortTitle": "The Back Press",
    "subtitle": "A symbolic edge ritual using clear consent, pause words, and reversible intensity.",
    "category": "kink-lite",
    "intensity": "high",
    "polarity": "receiver-led",
    "durationMinutes": 8,
    "weatherTags": [
      "Electric",
      "Sunny",
      "Warm"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "power-dynamic",
    "premiumTier": "premium",
    "steps": [
      "Begin by naming the boundary, the intention, and a clear pause word.",
      "Ask for an explicit yes before starting, and keep the ritual slow enough to stop at any moment.",
      "Explore the back press only within the agreed limits, watching breath, tone, and body language.",
      "Close with reassurance, water, stillness, or a short aftercare check-in."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs083",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 83,
    "title": "Open-Mouthed Neck Kiss",
    "shortTitle": "Open-Mouthed Neck Kiss",
    "subtitle": "A slow sensual ritual built around anticipation, consent, and embodied closeness.",
    "category": "sensual",
    "intensity": "high",
    "polarity": "receiver-led",
    "durationMinutes": 8,
    "weatherTags": [
      "Warm",
      "Electric",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "explicit-check-in",
    "premiumTier": "premium",
    "steps": [
      "Begin by naming the boundary, the intention, and a clear pause word.",
      "Ask for an explicit yes before starting, and keep the ritual slow enough to stop at any moment.",
      "Explore open-mouthed neck kiss only within the agreed limits, watching breath, tone, and body language.",
      "Close with reassurance, water, stillness, or a short aftercare check-in."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs084",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 84,
    "title": "The Guided Spread of Touch",
    "shortTitle": "The Guided Spread of Touch",
    "subtitle": "A slow sensual ritual built around anticipation, consent, and embodied closeness.",
    "category": "sensual",
    "intensity": "medium",
    "polarity": "mutual",
    "durationMinutes": 8,
    "weatherTags": [
      "Warm",
      "Electric",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore the guided spread of touch without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs085",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 85,
    "title": "Bare Skin Under Blanket",
    "shortTitle": "Bare Skin Under Blanket",
    "subtitle": "A restorative ritual where rest, safety, and low-effort closeness become intimacy.",
    "category": "rest",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Stormy",
      "Frozen",
      "Foggy"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Prepare the space so the ritual feels calm, simple, and unhurried.",
      "Breathe together slowly and let the body arrive before adding words or touch.",
      "Practice bare skin under blanket with full attention for a few quiet minutes.",
      "End with one word each about what shifted in the body or heart."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs086",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 86,
    "title": "The Wall Kiss with Lifted Chin",
    "shortTitle": "The Wall Kiss with Lifted Chin",
    "subtitle": "A symbolic edge ritual using clear consent, pause words, and reversible intensity.",
    "category": "kink-lite",
    "intensity": "high",
    "polarity": "receiver-led",
    "durationMinutes": 8,
    "weatherTags": [
      "Electric",
      "Sunny",
      "Warm"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "power-dynamic",
    "premiumTier": "premium",
    "steps": [
      "Begin by naming the boundary, the intention, and a clear pause word.",
      "Ask for an explicit yes before starting, and keep the ritual slow enough to stop at any moment.",
      "Explore the wall kiss with lifted chin only within the agreed limits, watching breath, tone, and body language.",
      "Close with reassurance, water, stillness, or a short aftercare check-in."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs087",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 87,
    "title": "Fingertips at the Waistband",
    "shortTitle": "Fingertips at the Waistband",
    "subtitle": "A slow sensual ritual built around anticipation, consent, and embodied closeness.",
    "category": "sensual",
    "intensity": "high",
    "polarity": "receiver-led",
    "durationMinutes": 8,
    "weatherTags": [
      "Warm",
      "Electric",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "explicit-check-in",
    "premiumTier": "premium",
    "steps": [
      "Begin by naming the boundary, the intention, and a clear pause word.",
      "Ask for an explicit yes before starting, and keep the ritual slow enough to stop at any moment.",
      "Explore fingertips at the waistband only within the agreed limits, watching breath, tone, and body language.",
      "Close with reassurance, water, stillness, or a short aftercare check-in."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs088",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 88,
    "title": "The Grazing Nails Ritual",
    "shortTitle": "The Grazing Nails Ritual",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore the grazing nails ritual without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs089",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 89,
    "title": "The Slow Lie-Back Command",
    "shortTitle": "The Slow Lie-Back Command",
    "subtitle": "A symbolic edge ritual using clear consent, pause words, and reversible intensity.",
    "category": "kink-lite",
    "intensity": "high",
    "polarity": "receiver-led",
    "durationMinutes": 8,
    "weatherTags": [
      "Electric",
      "Sunny",
      "Warm"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "power-dynamic",
    "premiumTier": "premium",
    "steps": [
      "Begin by naming the boundary, the intention, and a clear pause word.",
      "Ask for an explicit yes before starting, and keep the ritual slow enough to stop at any moment.",
      "Explore the slow lie-back command only within the agreed limits, watching breath, tone, and body language.",
      "Close with reassurance, water, stillness, or a short aftercare check-in."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs090",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 90,
    "title": "Cupped Heat at the Inner Thigh Over Clothing",
    "shortTitle": "Cupped Heat at the Inner Thigh Over Clothing",
    "subtitle": "A slow sensual ritual built around anticipation, consent, and embodied closeness.",
    "category": "sensual",
    "intensity": "high",
    "polarity": "receiver-led",
    "durationMinutes": 8,
    "weatherTags": [
      "Warm",
      "Electric",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "explicit-check-in",
    "premiumTier": "premium",
    "steps": [
      "Begin by naming the boundary, the intention, and a clear pause word.",
      "Ask for an explicit yes before starting, and keep the ritual slow enough to stop at any moment.",
      "Explore cupped heat at the inner thigh over clothing only within the agreed limits, watching breath, tone, and body language.",
      "Close with reassurance, water, stillness, or a short aftercare check-in."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs091",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 91,
    "title": "The Lip-to-Lip Hover",
    "shortTitle": "The Lip-to-Lip Hover",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore the lip-to-lip hover without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs092",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 92,
    "title": "Reverent Button-Closing",
    "shortTitle": "Reverent Button-Closing",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore reverent button-closing without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs093",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 93,
    "title": "Side Body Worship",
    "shortTitle": "Side Body Worship",
    "subtitle": "A slow sensual ritual built around anticipation, consent, and embodied closeness.",
    "category": "sensual",
    "intensity": "medium",
    "polarity": "mutual",
    "durationMinutes": 8,
    "weatherTags": [
      "Warm",
      "Electric",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore side body worship without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs094",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 94,
    "title": "The Hold-Still Request",
    "shortTitle": "The Hold-Still Request",
    "subtitle": "A symbolic edge ritual using clear consent, pause words, and reversible intensity.",
    "category": "kink-lite",
    "intensity": "high",
    "polarity": "receiver-led",
    "durationMinutes": 8,
    "weatherTags": [
      "Electric",
      "Sunny",
      "Warm"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "power-dynamic",
    "premiumTier": "premium",
    "steps": [
      "Begin by naming the boundary, the intention, and a clear pause word.",
      "Ask for an explicit yes before starting, and keep the ritual slow enough to stop at any moment.",
      "Explore the hold-still request only within the agreed limits, watching breath, tone, and body language.",
      "Close with reassurance, water, stillness, or a short aftercare check-in."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs095",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 95,
    "title": "Rain of Kisses",
    "shortTitle": "Rain of Kisses",
    "subtitle": "A slow sensual ritual built around anticipation, consent, and embodied closeness.",
    "category": "sensual",
    "intensity": "medium",
    "polarity": "mutual",
    "durationMinutes": 8,
    "weatherTags": [
      "Warm",
      "Electric",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore rain of kisses without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs096",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 96,
    "title": "Guided Grinding Against the Hand",
    "shortTitle": "Guided Grinding Against the Hand",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "high",
    "polarity": "receiver-led",
    "durationMinutes": 8,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "explicit-check-in",
    "premiumTier": "premium",
    "steps": [
      "Begin by naming the boundary, the intention, and a clear pause word.",
      "Ask for an explicit yes before starting, and keep the ritual slow enough to stop at any moment.",
      "Explore guided grinding against the hand only within the agreed limits, watching breath, tone, and body language.",
      "Close with reassurance, water, stillness, or a short aftercare check-in."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs097",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 97,
    "title": "The Bath Edge Kiss",
    "shortTitle": "The Bath Edge Kiss",
    "subtitle": "A slow sensual ritual built around anticipation, consent, and embodied closeness.",
    "category": "sensual",
    "intensity": "medium",
    "polarity": "mutual",
    "durationMinutes": 8,
    "weatherTags": [
      "Warm",
      "Electric",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore the bath edge kiss without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs098",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 98,
    "title": "Barefoot Between the Legs",
    "shortTitle": "Barefoot Between the Legs",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore barefoot between the legs without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs099",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 99,
    "title": "The Come-Here Finger",
    "shortTitle": "The Come-Here Finger",
    "subtitle": "A gentle touch ritual focused on sensation, consent, and loving attention.",
    "category": "touch",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore the come-here finger without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  },
  {
    "id": "vs100",
    "sourceSet": "sensual-touch-100",
    "sourceNumber": 100,
    "title": "The Afterglow Hold",
    "shortTitle": "The Afterglow Hold",
    "subtitle": "A closing ritual to help both partners settle, integrate, and feel cared for.",
    "category": "aftercare",
    "intensity": "soft",
    "polarity": "mutual",
    "durationMinutes": 5,
    "weatherTags": [
      "Foggy",
      "Warm",
      "Sunny"
    ],
    "bestFor": [
      "presence",
      "consent",
      "reconnection"
    ],
    "avoidWhen": [
      "Either partner feels pressured, unsafe, emotionally overwhelmed, or unable to give a clear yes."
    ],
    "consentLevel": "standard",
    "premiumTier": "premium",
    "steps": [
      "Ask what kind of touch, pace, or closeness is welcome tonight.",
      "Begin slowly and keep the first minute simple, predictable, and attentive.",
      "Explore the afterglow hold without rushing, checking for comfort through words and body language.",
      "Close with stillness, reassurance, and one sentence about what felt most intimate."
    ],
    "closing": "Close the ritual slowly. Thank each other for the presence, honesty, and care brought into the space."
  }
] as MainstreamRitual[];

export const mainstreamRitualsById: Record<string, MainstreamRitual> =
  mainstreamRituals200.reduce((acc, ritual) => {
    acc[ritual.id] = ritual;
    return acc;
  }, {} as Record<string, MainstreamRitual>);
