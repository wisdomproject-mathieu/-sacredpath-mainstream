type VoiceProvider = "gemini" | "elevenlabs" | "google" | "polly" | "edge" | "browser";

type TtsRequestBody = {
  text?: string;
  provider?: VoiceProvider | string;
  ttsProvider?: VoiceProvider | string;
  lang?: string;
  voiceStyle?: "warm" | "calm" | "deep" | "soft";
  voiceName?: string;
  voiceId?: string;
  model?: string;
  speakingRate?: number;
  pitch?: number;
  format?: "mp3" | "wav" | "pcm" | "ogg_vorbis";
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const GEMINI_TTS_MODEL = Deno.env.get("GEMINI_TTS_MODEL") || "gemini-2.5-flash-preview-tts";
const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY") || Deno.env.get("GOOGLE_API_KEY") || "";
const ELEVENLABS_API_KEY = Deno.env.get("ELEVENLABS_API_KEY") || "";
const ELEVENLABS_VOICE_ID = Deno.env.get("ELEVENLABS_VOICE_ID") || "";
const ELEVENLABS_MODEL_ID = Deno.env.get("ELEVENLABS_MODEL_ID") || "eleven_multilingual_v2";

function jsonResponse(payload: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
}

function audioResponse(bytes: Uint8Array, contentType: string, provider: VoiceProvider) {
  return new Response(bytes, {
    status: 200,
    headers: {
      ...corsHeaders,
      "Content-Type": contentType,
      "x-tts-provider": provider,
      "Cache-Control": "public, max-age=3600",
    },
  });
}

function normalizeProvider(provider: unknown): VoiceProvider {
  const value = typeof provider === "string" ? provider.toLowerCase() : "";
  if (value === "elevenlabs") return "elevenlabs";
  if (value === "google") return "google";
  if (value === "edge") return "edge";
  if (value === "browser") return "browser";

  // Earlier Codex attempts used Polly even though this project has no AWS Polly backend.
  // Treat Polly as Gemini so existing frontend calls do not fail with unsupported-provider errors.
  if (value === "polly") return "gemini";

  return "gemini";
}

function sanitizeText(text: unknown): string {
  if (typeof text !== "string") return "";
  return text.replace(/\s+/g, " ").trim().slice(0, 4500);
}

function pickGeminiVoice(style?: TtsRequestBody["voiceStyle"], voiceName?: string): string {
  if (voiceName?.trim()) return voiceName.trim();
  if (style === "deep") return "Charon";
  if (style === "soft") return "Leda";
  if (style === "calm") return "Sulafat";
  return "Sulafat";
}

function buildGeminiPrompt(text: string, style?: TtsRequestBody["voiceStyle"]): string {
  const styleInstruction =
    style === "deep"
      ? "Speak in a grounded, slow, masculine-neutral meditation voice."
      : style === "soft"
        ? "Speak softly, gently, with tenderness and emotional safety."
        : style === "calm"
          ? "Speak calmly, slowly, and reassuringly, with spacious pauses."
          : "Speak warmly, intimately, and slowly, with a premium guided-ritual tone.";

  return `${styleInstruction}\n\nRead exactly this guided ritual text. Do not add extra commentary.\n\n${text}`;
}

function base64ToUint8Array(base64: string): Uint8Array {
  const binary = atob(base64.replace(/\s/g, ""));
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}

function writeAscii(view: DataView, offset: number, text: string) {
  for (let index = 0; index < text.length; index += 1) {
    view.setUint8(offset + index, text.charCodeAt(index));
  }
}

function pcmToWav(pcm: Uint8Array, sampleRate = 24000, channels = 1, bitsPerSample = 16): Uint8Array {
  const headerSize = 44;
  const wav = new Uint8Array(headerSize + pcm.length);
  const view = new DataView(wav.buffer);
  const byteRate = sampleRate * channels * bitsPerSample / 8;
  const blockAlign = channels * bitsPerSample / 8;

  writeAscii(view, 0, "RIFF");
  view.setUint32(4, 36 + pcm.length, true);
  writeAscii(view, 8, "WAVE");
  writeAscii(view, 12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, channels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitsPerSample, true);
  writeAscii(view, 36, "data");
  view.setUint32(40, pcm.length, true);
  wav.set(pcm, headerSize);
  return wav;
}

function extractSampleRate(mimeType: string | undefined): number {
  const match = mimeType?.match(/rate=(\d+)/i);
  return match ? Number(match[1]) : 24000;
}

async function synthesizeWithGemini(body: TtsRequestBody, text: string): Promise<Response> {
  if (!GEMINI_API_KEY) {
    throw new Error("Missing GEMINI_API_KEY or GOOGLE_API_KEY Supabase secret.");
  }

  const model = body.model?.trim() || GEMINI_TTS_MODEL;
  const voiceName = pickGeminiVoice(body.voiceStyle, body.voiceName);
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(GEMINI_API_KEY)}`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        {
          role: "user",
          parts: [{ text: buildGeminiPrompt(text, body.voiceStyle) }],
        },
      ],
      generationConfig: {
        responseModalities: ["AUDIO"],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName },
          },
        },
      },
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`Gemini TTS failed (${response.status}): ${detail.slice(0, 500)}`);
  }

  const payload = await response.json();
  const part = payload?.candidates?.[0]?.content?.parts?.find(
    (candidatePart: { inlineData?: { data?: string }; inline_data?: { data?: string } }) =>
      candidatePart?.inlineData?.data || candidatePart?.inline_data?.data,
  );
  const inlineData = part?.inlineData ?? part?.inline_data;
  const audioBase64 = inlineData?.data;
  const mimeType = inlineData?.mimeType ?? inlineData?.mime_type ?? "audio/L16;codec=pcm;rate=24000";

  if (!audioBase64 || typeof audioBase64 !== "string") {
    throw new Error("Gemini TTS returned no inline audio data.");
  }

  const pcm = base64ToUint8Array(audioBase64);
  const wav = pcmToWav(pcm, extractSampleRate(mimeType));
  return audioResponse(wav, "audio/wav", "gemini");
}

async function synthesizeWithElevenLabs(body: TtsRequestBody, text: string): Promise<Response> {
  if (!ELEVENLABS_API_KEY) {
    throw new Error("Missing ELEVENLABS_API_KEY Supabase secret.");
  }

  const voiceId = body.voiceId?.trim() || ELEVENLABS_VOICE_ID;
  if (!voiceId) {
    throw new Error("Missing ElevenLabs voice id. Send voiceId or set ELEVENLABS_VOICE_ID.");
  }

  const endpoint = `https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(voiceId)}?output_format=mp3_44100_128`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "xi-api-key": ELEVENLABS_API_KEY,
      Accept: "audio/mpeg",
    },
    body: JSON.stringify({
      text,
      model_id: ELEVENLABS_MODEL_ID,
      voice_settings: {
        stability: body.voiceStyle === "deep" ? 0.58 : 0.68,
        similarity_boost: 0.8,
        style: body.voiceStyle === "soft" ? 0.2 : 0.35,
        use_speaker_boost: true,
      },
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`ElevenLabs TTS failed (${response.status}): ${detail.slice(0, 500)}`);
  }

  const bytes = new Uint8Array(await response.arrayBuffer());
  return audioResponse(bytes, "audio/mpeg", "elevenlabs");
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed. Use POST." }, 405);
  }

  try {
    const body = (await req.json().catch(() => ({}))) as TtsRequestBody;
    const text = sanitizeText(body.text);
    if (!text) {
      return jsonResponse({ error: "Missing text for Sacred Voice TTS." }, 400);
    }

    const provider = normalizeProvider(body.provider ?? body.ttsProvider);

    if (provider === "elevenlabs") {
      return await synthesizeWithElevenLabs(body, text);
    }

    try {
      return await synthesizeWithGemini(body, text);
    } catch (geminiError) {
      if (ELEVENLABS_API_KEY && ELEVENLABS_VOICE_ID) {
        console.warn("[sacred-voice-tts] Gemini failed, trying ElevenLabs fallback", geminiError);
        return await synthesizeWithElevenLabs(body, text);
      }
      throw geminiError;
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown Sacred Voice error";
    console.error("[sacred-voice-tts]", message);
    return jsonResponse({ error: message }, 500);
  }
});
