export type VoiceProvider = "google" | "gemini" | "edge" | "elevenlabs" | "polly" | "browser";

export type TtsResult = {
  provider: VoiceProvider;
  audioUrl: string;
  fromCache: boolean;
};

const FUNCTION_NAME = "sacred-voice-tts";
const audioCache = new Map<string, string>();

function buildCacheKey(sessionId: string, voiceStyle: string | undefined) {
  return `${sessionId}:${voiceStyle ?? "default"}`;
}

function getTtsEndpoint() {
  const envOverride =
    typeof import.meta !== "undefined" && typeof import.meta.env?.VITE_SACRED_VOICE_TTS_URL === "string"
      ? import.meta.env.VITE_SACRED_VOICE_TTS_URL.trim()
      : "";
  if (envOverride) return envOverride;

  const supabaseUrl =
    typeof import.meta !== "undefined" && typeof import.meta.env?.VITE_SUPABASE_URL === "string"
      ? import.meta.env.VITE_SUPABASE_URL.trim()
      : "";
  if (!supabaseUrl) return "";

  return `${supabaseUrl.replace(/\/+$/, "")}/functions/v1/${FUNCTION_NAME}`;
}

function getSupabasePublishableKey() {
  return typeof import.meta !== "undefined" && typeof import.meta.env?.VITE_SUPABASE_PUBLISHABLE_KEY === "string"
    ? import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY.trim()
    : "";
}

export function getVoiceProviderFromHeader(response: Response): VoiceProvider {
  const header = response.headers.get("x-tts-provider")?.toLowerCase();
  if (header === "google") return "google";
  if (header === "gemini") return "gemini";
  if (header === "edge") return "edge";
  if (header === "elevenlabs") return "elevenlabs";
  if (header === "polly") return "polly";
  return "google";
}

async function parseErrorMessage(response: Response) {
  const contentType = response.headers.get("content-type")?.toLowerCase() ?? "";
  if (contentType.includes("application/json")) {
    const payload = await response.json().catch(() => ({}));
    if (typeof payload?.error === "string") return payload.error;
    if (typeof payload?.detail === "string") return payload.detail;
    if (typeof payload?.message === "string") return payload.message;
  }
  const text = await response.text().catch(() => "");
  return text.slice(0, 240);
}

export function clearGuidedVoiceAudioCache() {
  for (const url of audioCache.values()) {
    URL.revokeObjectURL(url);
  }
  audioCache.clear();
}

export async function synthesizeGuidedVoiceAudio({
  sessionId,
  text,
  voiceStyle,
  provider = "google",
  voiceName,
  speakingRate,
  pitch,
  model,
  voiceId,
  format,
}: {
  sessionId: string;
  text: string;
  voiceStyle?: "warm" | "calm" | "deep" | "soft";
  provider?: VoiceProvider;
  voiceName?: string;
  speakingRate?: number;
  pitch?: number;
  model?: string;
  voiceId?: string;
  format?: "mp3" | "ogg_vorbis" | "pcm";
}): Promise<TtsResult> {
  const cacheKey = buildCacheKey(sessionId, voiceStyle);
  const cached = audioCache.get(cacheKey);
  if (cached) {
    return { provider: "google", audioUrl: cached, fromCache: true };
  }

  const endpoint = getTtsEndpoint();
  const publishableKey = getSupabasePublishableKey();
  if (!endpoint) {
    throw new Error("Guided voice backend is not configured.");
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  // Optional only: some deployments keep the function public and do not require apikey.
  if (publishableKey) headers.apikey = publishableKey;

  const response = await fetch(endpoint, {
    method: "POST",
    headers,
    body: JSON.stringify({
      text,
      provider,
      lang: "en",
      voiceStyle,
      voiceName,
      speakingRate,
      pitch,
      engine: provider === "google" ? "wavenet" : undefined,
      model,
      voiceId,
      format,
    }),
  });

  if (!response.ok) {
    const detail = await parseErrorMessage(response);
    throw new Error(detail ? `Guided voice failed (${response.status}): ${detail}` : `Guided voice failed (${response.status})`);
  }

  const contentType = response.headers.get("content-type")?.toLowerCase() ?? "";
  if (!contentType.includes("audio/")) {
    const detail = await parseErrorMessage(response);
    throw new Error(`Guided voice returned non-audio response${detail ? `: ${detail}` : ""}`);
  }

  const blob = await response.blob();
  const audioUrl = URL.createObjectURL(blob);
  audioCache.set(cacheKey, audioUrl);

  return {
    provider: getVoiceProviderFromHeader(response),
    audioUrl,
    fromCache: false,
  };
}
