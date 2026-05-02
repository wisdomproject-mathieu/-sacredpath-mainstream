export type VoiceProvider = "google" | "gemini" | "edge" | "elevenlabs" | "polly" | "browser";

export type TtsResult = {
  provider: VoiceProvider;
  audioUrl: string;
  fromCache: boolean;
};

const FUNCTION_NAME = "sacred-voice-tts";
const audioCache = new Map<string, { provider: VoiceProvider; audioUrl: string }>();

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
  const currentEnv = typeof import.meta !== "undefined" ? import.meta.env : undefined;
  const publishable =
    typeof currentEnv?.VITE_SUPABASE_PUBLISHABLE_KEY === "string"
      ? currentEnv.VITE_SUPABASE_PUBLISHABLE_KEY.trim()
      : "";
  const anon = typeof currentEnv?.VITE_SUPABASE_ANON_KEY === "string" ? currentEnv.VITE_SUPABASE_ANON_KEY.trim() : "";
  return publishable || anon;
}

export function getVoiceProviderFromHeader(response: Response): VoiceProvider {
  const header = response.headers.get("x-tts-provider")?.toLowerCase();
  if (header === "google") return "google";
  if (header === "gemini") return "gemini";
  if (header === "edge") return "edge";
  if (header === "elevenlabs") return "elevenlabs";
  if (header === "polly") return "polly";
  return "gemini";
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
  for (const cached of audioCache.values()) {
    URL.revokeObjectURL(cached.audioUrl);
  }
  audioCache.clear();
}

export async function synthesizeGuidedVoiceAudio({
  sessionId,
  text,
  voiceStyle,
  provider = "gemini",
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
  format?: "mp3" | "ogg_vorbis" | "pcm" | "wav";
}): Promise<TtsResult> {
  const cleanedText = text.replace(/\s+/g, " ").trim();
  if (!cleanedText) {
    throw new Error("Guided voice needs non-empty text.");
  }

  const cacheKey = buildCacheKey(sessionId, voiceStyle);
  const cached = audioCache.get(cacheKey);
  if (cached) {
    return { provider: cached.provider, audioUrl: cached.audioUrl, fromCache: true };
  }

  const endpoint = getTtsEndpoint();
  const publishableKey = getSupabasePublishableKey();
  if (!endpoint) {
    throw new Error("Guided voice backend is not configured. Set VITE_SUPABASE_URL or VITE_SACRED_VOICE_TTS_URL.");
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // Supabase Edge Functions commonly require both apikey and Authorization when JWT verification is enabled.
  if (publishableKey) {
    headers.apikey = publishableKey;
    headers.Authorization = `Bearer ${publishableKey}`;
  }

  const bodyPayload: Record<string, unknown> = {
    text: cleanedText,
    provider,
    lang: "en",
    voiceStyle,
    voiceName,
    speakingRate,
    pitch,
    engine: provider === "google" ? "wavenet" : provider === "polly" ? "neural" : undefined,
    model,
    voiceId,
    format,
  };

  if (provider === "polly") {
    // Compatibility aliases for earlier Codex attempts. The new backend safely maps unsupported Polly calls.
    bodyPayload.ttsProvider = "polly";
    bodyPayload.awsVoiceId = voiceId;
    bodyPayload.languageCode = "en-US";
    bodyPayload.outputFormat = format ?? "mp3";
    bodyPayload.polly = {
      voiceId,
      engine: "neural",
      languageCode: "en-US",
      outputFormat: format ?? "mp3",
    };
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers,
    body: JSON.stringify(bodyPayload),
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
  if (!blob.size) {
    throw new Error("Guided voice returned an empty audio file.");
  }

  const audioUrl = URL.createObjectURL(blob);
  const resolvedProvider = getVoiceProviderFromHeader(response);
  audioCache.set(cacheKey, { provider: resolvedProvider, audioUrl });

  return {
    provider: resolvedProvider,
    audioUrl,
    fromCache: false,
  };
}
