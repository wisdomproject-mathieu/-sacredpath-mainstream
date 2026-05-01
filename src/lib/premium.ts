export const PREMIUM_STORAGE_KEY = "sacredpath-premium";
// TEMPORARY DEV PREMIUM STATE — replace with StoreKit / RevenueCat entitlement validation before production.

export function isPremium(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(PREMIUM_STORAGE_KEY) === "true";
}

function isDevPremiumWriteAllowed(): boolean {
  return import.meta.env.DEV || String(import.meta.env.VITE_ENABLE_DEV_PREMIUM_UNLOCK ?? "").toLowerCase() === "true";
}

export function setPremiumForTesting(value: boolean): void {
  if (typeof window === "undefined") return;
  if (!isDevPremiumWriteAllowed()) return;
  window.localStorage.setItem(PREMIUM_STORAGE_KEY, value ? "true" : "false");
}

export function clearPremiumForTesting(): void {
  if (typeof window === "undefined") return;
  if (!isDevPremiumWriteAllowed()) return;
  window.localStorage.removeItem(PREMIUM_STORAGE_KEY);
}

export function getPaywallUrl(source: string): string {
  return `/paywall?source=${encodeURIComponent(source)}`;
}

export function goToPaywall(
  navigate: (to: string) => void,
  source: string,
): void {
  navigate(getPaywallUrl(source));
}
