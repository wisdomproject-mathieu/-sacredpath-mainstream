import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.sacredpathforcouples.app", // Verify against App Store Connect bundle ID before release.
  appName: "Sacred Path for Couples",
  webDir: "dist",
  bundledWebRuntime: false,
};

export default config;
