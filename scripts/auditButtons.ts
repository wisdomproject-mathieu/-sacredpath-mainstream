import fg from "fast-glob";
import fs from "node:fs/promises";

async function run() {
  const files = await fg(["src/**/*.{ts,tsx}"], { absolute: true });

  let totalButtons = 0;
  let buttonWithoutOnClick = 0;
  let deadHref = 0;
  let consoleOnly = 0;
  let oldPremiumCopy = 0;
  let voiceNavHits = 0;
  let applePayHits = 0;

  const findings: string[] = [];

  const oldPhrases = [
    "Subscribe with Apple Pay",
    "Unlock for both of us",
    "Premium for 2",
    "Explore premium",
    "See premium benefits",
    "Open subscription page",
    "Unlock full Sacred Voice",
    "Unlock unlimited oracle",
  ];

  for (const file of files) {
    const source = await fs.readFile(file, "utf8");
    const buttonTags = source.match(/<button\b/gi) ?? [];
    totalButtons += buttonTags.length;

    const lines = source.split("\n");
    lines.forEach((line, index) => {
      if (line.includes("<button") && !line.includes("onClick=") && !line.includes('type="submit"')) {
        buttonWithoutOnClick += 1;
        findings.push(`${file}:${index + 1} button without onClick`);
      }
      if (line.includes('href="#"')) {
        deadHref += 1;
        findings.push(`${file}:${index + 1} href="#"`);
      }
      if (line.includes("console.log(")) {
        consoleOnly += 1;
        findings.push(`${file}:${index + 1} console.log found`);
      }
      if (line.includes('to="/voice"')) {
        voiceNavHits += 1;
      }
      if (line.toLowerCase().includes("apple pay")) {
        applePayHits += 1;
      }
      oldPhrases.forEach((phrase) => {
        if (line.includes(phrase)) {
          oldPremiumCopy += 1;
          findings.push(`${file}:${index + 1} old premium copy: ${phrase}`);
        }
      });
    });
  }

  console.log("Button audit summary");
  console.log(`- Files scanned: ${files.length}`);
  console.log(`- <button> tags: ${totalButtons}`);
  console.log(`- Buttons missing onClick (line check): ${buttonWithoutOnClick}`);
  console.log(`- href=\"#\" occurrences: ${deadHref}`);
  console.log(`- console.log occurrences: ${consoleOnly}`);
  console.log(`- Old premium phrase hits: ${oldPremiumCopy}`);
  console.log(`- Nav links to /voice: ${voiceNavHits}`);
  console.log(`- Apple Pay wording hits: ${applePayHits}`);

  if (findings.length) {
    console.log("\nFindings:");
    findings.slice(0, 200).forEach((finding) => console.log(`  • ${finding}`));
  }
}

void run();
