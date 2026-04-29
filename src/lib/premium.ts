export const PREMIUM_STORAGE_KEY = "sacredpath-premium";

export function isPremium(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(PREMIUM_STORAGE_KEY) === "true";
}

export function setPremiumForTesting(value: boolean): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PREMIUM_STORAGE_KEY, value ? "true" : "false");
}

export function goToPaywall(
  navigate: (to: string) => void,
  source: "voice" | "oracle" | "journey" | "rituals" | "premium-benefits" | "journey-benefits" | string,
): void {
  navigate(`/paywall?source=${encodeURIComponent(source)}`);
}

