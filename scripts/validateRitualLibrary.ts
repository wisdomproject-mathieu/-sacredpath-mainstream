import { sacredPathRituals } from "../src/data/sacredPathRituals";
import { normalizeWeatherPair, type WeatherState } from "../src/lib/weatherPair";

const WEATHER: WeatherState[] = ["stormy", "frozen", "foggy", "warm", "electric", "sunny"];

function countBy<T extends string>(items: T[]): Record<string, number> {
  return items.reduce<Record<string, number>>((acc, key) => {
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});
}

function normalizeText(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

const duplicateIds = sacredPathRituals
  .map((r) => r.id)
  .filter((id, idx, arr) => arr.indexOf(id) !== idx);
const duplicateTitles = sacredPathRituals
  .map((r) => normalizeText(r.title))
  .filter((title, idx, arr) => arr.indexOf(title) !== idx);

const shortSteps = sacredPathRituals.filter((r) => r.steps.length < 4).map((r) => r.id);
const missingFields = sacredPathRituals
  .filter(
    (r) =>
      !r.title ||
      !r.subtitle ||
      !r.setup?.length ||
      !r.steps?.length ||
      !r.closing ||
      !r.reflectionPrompt ||
      !r.voiceScript,
  )
  .map((r) => r.id);

const firstSteps = sacredPathRituals.map((r) => normalizeText(r.steps[0] ?? ""));
const closings = sacredPathRituals.map((r) => normalizeText(r.closing));
const subtitles = sacredPathRituals.map((r) => normalizeText(r.subtitle));
const voiceScripts = sacredPathRituals.map((r) => normalizeText(r.voiceScript));

const repeatedFirstSteps = Object.entries(countBy(firstSteps)).filter(([, count]) => count > 6);
const repeatedClosings = Object.entries(countBy(closings)).filter(([, count]) => count > 6);
const repeatedSubtitles = Object.entries(countBy(subtitles)).filter(([, count]) => count > 4);
const repeatedVoice = Object.entries(countBy(voiceScripts)).filter(([, count]) => count > 3);

const placeholderPatterns = [
  /explore \[title\]/i,
  /take turns practicing/i,
  /let this become part of your shared path/i,
  /close by naming one thing you noticed/i,
];
const placeholderHits = sacredPathRituals
  .filter((r) => placeholderPatterns.some((pattern) => pattern.test(`${r.steps.join(" ")} ${r.closing}`)))
  .map((r) => r.id);

const pairCoverage = new Map<string, { free: number; premium: number; repair: number; gentle: number; playful: number }>();
for (let i = 0; i < WEATHER.length; i++) {
  for (let j = i; j < WEATHER.length; j++) {
    const pair = normalizeWeatherPair(WEATHER[i], WEATHER[j]);
    pairCoverage.set(pair, { free: 0, premium: 0, repair: 0, gentle: 0, playful: 0 });
  }
}

for (const ritual of sacredPathRituals) {
  for (const pair of ritual.pairings) {
    const row = pairCoverage.get(pair);
    if (!row) continue;
    if (ritual.tier === "free-daily") row.free += 1;
    else row.premium += 1;
    if (ritual.category === "repair" || ritual.tone === "repair") row.repair += 1;
    if (ritual.intensity === "gentle" || ritual.category === "body-awareness") row.gentle += 1;
    if (ritual.tone === "playful" || ritual.category === "play" || ritual.category === "desire") row.playful += 1;
  }
}

const lowCoverage = Array.from(pairCoverage.entries()).filter(([, row]) => row.free < 3 || row.premium < 8);
const stormNeedsRepair = Array.from(pairCoverage.entries())
  .filter(([pair]) => pair.includes("stormy"))
  .filter(([, row]) => row.repair < 2);
const frozenNeedsGentle = Array.from(pairCoverage.entries())
  .filter(([pair]) => pair.includes("frozen"))
  .filter(([, row]) => row.gentle < 2);
const electricNeedsPlayful = Array.from(pairCoverage.entries())
  .filter(([pair]) => pair.includes("electric"))
  .filter(([, row]) => row.playful < 2);

const freeCount = sacredPathRituals.filter((r) => r.tier === "free-daily").length;
const premiumCount = sacredPathRituals.length - freeCount;

const issues: string[] = [];
if (duplicateIds.length) issues.push(`Duplicate IDs: ${duplicateIds.join(", ")}`);
if (duplicateTitles.length) issues.push(`Duplicate titles: ${duplicateTitles.slice(0, 8).join(", ")}`);
if (shortSteps.length) issues.push(`Rituals with <4 steps: ${shortSteps.join(", ")}`);
if (missingFields.length) issues.push(`Rituals with missing fields: ${missingFields.join(", ")}`);
if (placeholderHits.length) issues.push(`Placeholder language detected: ${placeholderHits.join(", ")}`);
if (lowCoverage.length) issues.push(`Low pair coverage count: ${lowCoverage.length} pairs`);
if (stormNeedsRepair.length) issues.push(`Storm pair repair coverage too low: ${stormNeedsRepair.length} pairs`);
if (frozenNeedsGentle.length) issues.push(`Frozen pair gentle coverage too low: ${frozenNeedsGentle.length} pairs`);
if (electricNeedsPlayful.length) issues.push(`Electric pair playful coverage too low: ${electricNeedsPlayful.length} pairs`);

console.log("Ritual library validation");
console.log(`Total rituals: ${sacredPathRituals.length}`);
console.log(`Free rituals: ${freeCount}`);
console.log(`Premium rituals: ${premiumCount}`);
console.log(`Top repeated subtitles:`, repeatedSubtitles.sort((a, b) => b[1] - a[1]).slice(0, 5));
console.log(`Top repeated closings:`, repeatedClosings.sort((a, b) => b[1] - a[1]).slice(0, 5));
console.log(`Top repeated first steps:`, repeatedFirstSteps.sort((a, b) => b[1] - a[1]).slice(0, 5));
console.log(`Repeated voice scripts:`, repeatedVoice.sort((a, b) => b[1] - a[1]).slice(0, 5));
console.log(`Pair coverage failures:`, lowCoverage.slice(0, 8));

if (issues.length) {
  console.error("FAIL");
  for (const issue of issues) console.error("-", issue);
  process.exit(1);
}

console.log("PASS");

