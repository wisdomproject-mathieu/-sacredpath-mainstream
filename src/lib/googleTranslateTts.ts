export function buildGoogleTranslateTtsUrl(text: string, lang = "en"): string {
  const cleaned = text.replace(/\s+/g, " ").trim();
  const url = new URL("https://translate.google.com/translate_tts");
  url.searchParams.set("ie", "UTF-8");
  url.searchParams.set("client", "tw-ob");
  url.searchParams.set("tl", lang);
  url.searchParams.set("q", cleaned);
  return url.toString();
}

export async function playGoogleTranslateSegment(
  text: string,
  options?: {
    lang?: string;
    rate?: number;
    onEnded?: () => void;
    onError?: () => void;
  },
): Promise<HTMLAudioElement> {
  const audio = new Audio(buildGoogleTranslateTtsUrl(text, options?.lang ?? "en"));
  audio.preload = "auto";
  audio.playbackRate = options?.rate ?? 0.86;
  audio.preservesPitch = true;
  audio.onended = () => options?.onEnded?.();
  audio.onerror = () => options?.onError?.();
  await audio.play();
  return audio;
}
