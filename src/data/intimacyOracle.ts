export type WeatherState = "Stormy" | "Frozen" | "Foggy" | "Warm" | "Electric" | "Sunny" | "Hot";

export type OracleCard = {
  id: string;
  title: string;
  meaning: string;
  message: string;
  forYou: string;
  forPartner: string;
  action: string;
  premiumRitual?: {
    title: string;
    steps: string[];
  };
  tags: string[];
  recommendedForWeather?: WeatherState[];
};

export const intimacyOracleCards: OracleCard[] = [
  {
    id: "presence",
    title: "Presence",
    meaning: "Slow down. Your partner needs to feel you are emotionally here.",
    message:
      "Tonight, the path is not to do more, say more, or prove more. The path is to arrive. Let your body soften, let your eyes become kind, and let your partner feel that you are truly here.",
    forYou: "Lead with your nervous system first. If you are rushed, take three slower breaths before you speak.",
    forPartner: "Ask for simple presence instead of perfect words. Let closeness begin with calm attention.",
    action:
      "Sit close for three minutes. No phone. No fixing. One partner says: ‘I am here with you.’ The other answers: ‘I feel you.’",
    premiumRitual: {
      title: "Arrival Breath Ritual",
      steps: [
        "Sit face-to-face and place one hand on your own heart.",
        "Take six slow breaths together without speaking.",
        "Each person shares one sentence: ‘What I most need tonight is…’",
        "Close with a soft hug and one clear yes for the evening pace.",
      ],
    },
    tags: ["reconnection", "arrival", "grounding"],
    recommendedForWeather: ["Frozen", "Foggy", "Stormy"],
  },
  {
    id: "repair",
    title: "Repair",
    meaning: "Something small needs to be acknowledged before closeness can return.",
    message:
      "Before intimacy can open, something may need to be gently repaired. This is not about blame. It is about making the emotional space safe again.",
    forYou: "Name one concrete moment instead of retelling the whole conflict.",
    forPartner: "Receive first. You can respond after your partner feels heard.",
    action:
      "Each partner completes one sentence: ‘One small thing I want to repair between us is…’ The other answers only: ‘Thank you for telling me.’",
    premiumRitual: {
      title: "Soft Repair Dialogue",
      steps: [
        "Set a 5-minute timer for each partner.",
        "Speaker shares impact using ‘I felt… when…’ language.",
        "Listener mirrors back the core feeling in one sentence.",
        "Agree one repair action for tonight and one follow-up action for this week.",
      ],
    },
    tags: ["repair", "conflict", "trust"],
    recommendedForWeather: ["Stormy", "Foggy", "Frozen"],
  },
  {
    id: "desire",
    title: "Desire",
    meaning: "Attraction grows when there is playfulness, not pressure.",
    message:
      "Desire does not like pressure. It opens through curiosity, warmth, and small moments of aliveness. Tonight, invite play before expectation.",
    forYou: "Share invitations, not demands. Keep your tone warm and optional.",
    forPartner: "Name what would feel inviting, then let your body choose the pace.",
    action:
      "Each partner shares one thing that would feel inviting tonight. Keep it light. No demand. No obligation. Just curiosity.",
    premiumRitual: {
      title: "Spark Without Pressure",
      steps: [
        "Take turns naming one sensory desire and one boundary.",
        "Choose one shared yes for tonight.",
        "Stay with that one yes for ten minutes before deciding to continue.",
        "End with appreciation regardless of what happened physically.",
      ],
    },
    tags: ["desire", "spark", "attraction"],
    recommendedForWeather: ["Warm", "Electric", "Sunny", "Hot"],
  },
  {
    id: "listening",
    title: "Listening",
    meaning: "Do not solve. Listen first.",
    message:
      "Tonight, the path is not to convince, fix, or explain. Your partner may need to feel emotionally heard before they can open again.",
    forYou: "Slow your response and reflect what you heard before adding your perspective.",
    forPartner: "Speak from feelings and needs, not from accusation.",
    action:
      "Sit facing each other. One partner says: ‘What I wish you understood is…’ The other answers only: ‘I hear you.’ No debate. No correction.",
    premiumRitual: {
      title: "Deep Listening Container",
      steps: [
        "Choose one speaker and one listener for the first round.",
        "Speaker gets four uninterrupted minutes.",
        "Listener mirrors feelings and asks, ‘Did I get that right?’",
        "Swap roles and close with one practical next step each.",
      ],
    },
    tags: ["communication", "clarity", "empathy"],
    recommendedForWeather: ["Foggy", "Stormy", "Frozen"],
  },
  {
    id: "soft-courage",
    title: "Soft Courage",
    meaning: "Say the thing you avoid saying, but with tenderness.",
    message:
      "There is something unsaid between you. Not because love is absent, but because both hearts are protecting themselves. Tonight, speak gently.",
    forYou: "Lead with vulnerability, not criticism.",
    forPartner: "Receive without interrupting and ask one clarifying question.",
    action:
      "Hold hands for two minutes. Each partner completes: ‘What I need more of from us is…’ Speak without blaming.",
    premiumRitual: {
      title: "Tender Truth Ritual",
      steps: [
        "Take two grounding breaths together.",
        "Each partner names one truth they avoided this week.",
        "After each share, the other says: ‘Thank you for trusting me.’",
        "Choose one tiny commitment to support this truth.",
      ],
    },
    tags: ["truth", "vulnerability", "growth"],
    recommendedForWeather: ["Foggy", "Warm", "Stormy"],
  },
  {
    id: "patience",
    title: "Patience",
    meaning: "The connection is not broken; it needs space and safety.",
    message:
      "Not every distance means something is wrong. Sometimes love needs room to breathe. Tonight, choose safety over urgency.",
    forYou: "Release timelines. Focus on safety signals, not quick results.",
    forPartner: "Let your no, yes, or not-yet be clear. Honesty is closeness.",
    action:
      "Spend five quiet minutes together. No pushing for answers. End by saying: ‘There is no rush. I am still here.’",
    premiumRitual: {
      title: "No-Rush Reconnection",
      steps: [
        "Sit side-by-side and breathe quietly for two minutes.",
        "Each partner names one thing that helps them feel safe.",
        "Agree to one low-pressure connection act for tonight.",
        "Close by thanking each other for patience.",
      ],
    },
    tags: ["safety", "slow", "nervous-system"],
    recommendedForWeather: ["Frozen", "Stormy", "Foggy"],
  },
  {
    id: "warmth",
    title: "Warmth",
    meaning: "Small tenderness matters more than big declarations.",
    message:
      "The relationship may not need a dramatic conversation tonight. It may need warmth, softness, and one loving gesture that says: I still choose us.",
    forYou: "Offer care in a way your partner can actually receive right now.",
    forPartner: "Name one gentle gesture that would help you feel closer.",
    action:
      "Offer one small act of care: tea, touch, a compliment, a blanket, a message. Let it be simple and sincere.",
    premiumRitual: {
      title: "Tender Care Exchange",
      steps: [
        "Each partner asks: ‘How can I care for you tonight?’",
        "Choose one concrete gesture each.",
        "Give and receive with full attention.",
        "End with one sentence of gratitude each.",
      ],
    },
    tags: ["tenderness", "care", "affection"],
    recommendedForWeather: ["Warm", "Frozen", "Sunny", "Hot"],
  },
  {
    id: "boundaries",
    title: "Boundaries",
    meaning: "Closeness becomes safer when limits are respected.",
    message:
      "Love deepens when both partners feel free to say yes, no, and not yet. Tonight, respect the boundary and you protect the bond.",
    forYou: "Ask for consent in clear language before escalating emotional or physical intensity.",
    forPartner: "State your boundary simply; you do not need to justify it.",
    action:
      "Each partner completes: ‘One thing that helps me feel safe is…’ The other answers: ‘I will respect that.’",
    premiumRitual: {
      title: "Consent & Closeness Map",
      steps: [
        "Name one yes, one no, and one maybe for tonight.",
        "Repeat each other’s boundaries to confirm understanding.",
        "Choose one shared yes from the overlap.",
        "Close with a check-in phrase: ‘Still good?’ every few minutes.",
      ],
    },
    tags: ["consent", "boundaries", "safety"],
    recommendedForWeather: ["Stormy", "Foggy", "Electric", "Frozen"],
  },
  {
    id: "play",
    title: "Play",
    meaning: "The relationship needs lightness.",
    message:
      "Not every path to intimacy must be serious. Sometimes the door opens through laughter, teasing, dancing, or a shared moment of silliness.",
    forYou: "Let fun come before performance.",
    forPartner: "Follow what feels alive and easy, not forced.",
    action:
      "Choose one playful action: dance for one song, ask a funny question, or share one memory that still makes you smile.",
    premiumRitual: {
      title: "Playful Connection Sprint",
      steps: [
        "Pick a playful prompt each (tease, memory, mini challenge).",
        "Take turns for five minutes each.",
        "Notice when laughter softens tension.",
        "End with one affectionate gesture chosen together.",
      ],
    },
    tags: ["play", "fun", "spark"],
    recommendedForWeather: ["Electric", "Warm", "Sunny", "Hot"],
  },
  {
    id: "devotion",
    title: "Devotion",
    meaning: "Love grows through consistent attention.",
    message:
      "Devotion is not intensity. It is the quiet decision to keep showing up. Tonight, make your partner feel chosen in a simple, visible way.",
    forYou: "Choose one act of attention and follow through.",
    forPartner: "Receive appreciation without minimizing it.",
    action:
      "Say one sentence clearly: ‘One thing I deeply appreciate about you is…’ Then let the words land.",
    premiumRitual: {
      title: "Chosen Again Ritual",
      steps: [
        "Look at each other for three slow breaths.",
        "Each partner names one quality they choose in the other.",
        "Each names one way they will show up this week.",
        "Seal with a long embrace and one clear intention for tomorrow.",
      ],
    },
    tags: ["devotion", "appreciation", "commitment"],
    recommendedForWeather: ["Warm", "Sunny", "Hot", "Electric"],
  },
];
