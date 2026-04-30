# Sacred Voice Provider Mapping

## Active provider in original app (`sacredpathforcouples`)

The active Sacred Voice backend is the Supabase Edge Function:

- Endpoint: `supabase/functions/sacred-voice-tts/index.ts`
- Function name: `sacred-voice-tts`

### Actual provider behavior

Current production logic is:

1. **Google TTS path first** (Google Translate TTS endpoint, MP3 response)
2. Optional ElevenLabs path only when explicitly requested and configured
3. Browser speech synthesis fallback in frontend voice service when backend audio is unavailable

Returned response header includes:

- `x-tts-provider: google` or `x-tts-provider: elevenlabs`

Returned media type is audio (`audio/mpeg`) as raw bytes.

## Frontend endpoint contract

Frontend calls:

- `VITE_SACRED_VOICE_TTS_URL` (if provided), otherwise
- `${VITE_SUPABASE_URL}/functions/v1/sacred-voice-tts`

Headers:

- `Content-Type: application/json`
- `apikey: ${VITE_SUPABASE_PUBLISHABLE_KEY}`

Payload:

```json
{
  "text": "...",
  "provider": "auto",
  "lang": "en",
  "voiceStyle": "warm"
}
```

## Environment variables

### Required for Supabase invocation

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

### Optional backend provider vars

- `ELEVENLABS_API_KEY`
- `ELEVENLABS_VOICE_ID`

No client-side secret keys are used.

## Mainstream app alignment (`sacredpath-mainstream`)

Mainstream Intimacy Oracle guided mode now uses the same provider path via:

- `src/lib/guidedVoiceTts.ts`
- `src/lib/voiceEngine.ts`

It reads `x-tts-provider` from backend response, supports per-segment synthesis, and falls back to device voice if backend synthesis fails.

## Fallback behavior

If backend synthesis fails for any segment:

- Guided mode switches to device speech synthesis
- UI can show: "Using device voice for this session."

## Production TODO

- Replace temporary/local entitlement checks with StoreKit/RevenueCat verification.
- Move from Google Translate TTS endpoint to a fully managed production TTS provider path if policy/compliance requires it.
- Add backend-side segment pre-render/cache for lower latency on long rituals.
