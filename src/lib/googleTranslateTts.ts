export function buildGoogleTranslateTtsUrl(text: string, lang = "en"): string {
  const cleaned = text.replace(/\s+/g, " ").trim();
  const url = new URL("https://translate.google.com/translate_tts");
  url.searchParams.set("ie", "UTF-8");
  url.searchParams.set("client", "tw-ob");
  url.searchParams.set("tl", lang);
  url.searchParams.set("q", cleaned);
  return url.toString();
}

export function splitTextForTts(text: string, maxChars = 160): string[] {
  const cleaned = text.replace(/\s+/g, " ").trim();
  if (!cleaned) return [];
  if (cleaned.length <= maxChars) return [cleaned];

  const sentenceParts = cleaned
    .split(/(?<=[.!?])\s+/)
    .map((part) => part.trim())
    .filter(Boolean);

  const chunks: string[] = [];
  let current = "";

  const pushChunk = () => {
    if (current.trim()) chunks.push(current.trim());
    current = "";
  };

  for (const sentence of sentenceParts) {
    if (!sentence) continue;
    if (!current) {
      if (sentence.length <= maxChars) {
        current = sentence;
        continue;
      }
      const words = sentence.split(" ");
      let line = "";
      for (const word of words) {
        const next = line ? `${line} ${word}` : word;
        if (next.length <= maxChars) {
          line = next;
        } else {
          if (line) chunks.push(line);
          line = word;
        }
      }
      if (line) chunks.push(line);
      continue;
    }

    const candidate = `${current} ${sentence}`;
    if (candidate.length <= maxChars) {
      current = candidate;
    } else {
      pushChunk();
      if (sentence.length <= maxChars) {
        current = sentence;
      } else {
        const words = sentence.split(" ");
        let line = "";
        for (const word of words) {
          const next = line ? `${line} ${word}` : word;
          if (next.length <= maxChars) {
            line = next;
          } else {
            if (line) chunks.push(line);
            line = word;
          }
        }
        if (line) chunks.push(line);
      }
    }
  }

  pushChunk();
  return chunks.length ? chunks : [cleaned];
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
