import { PREMIUM_STORAGE_KEY } from "./premium";

export const ENTITLEMENT_ID = import.meta.env.VITE_REVENUECAT_ENTITLEMENT_ID || "premium";
export const OFFERING_ID = import.meta.env.VITE_REVENUECAT_OFFERING_ID || "default";
export const IOS_MONTHLY_PRODUCT_ID =
  import.meta.env.VITE_IAP_MONTHLY_PRODUCT_ID || "com.sacredpathforcouples.premium.monthly";
export const IOS_YEARLY_PRODUCT_ID =
  import.meta.env.VITE_IAP_YEARLY_PRODUCT_ID || "com.sacredpathforcouples.premium.yearly";

const REVENUECAT_IOS_API_KEY = import.meta.env.VITE_REVENUECAT_IOS_API_KEY;

let revenueCatConfigured = false;
let cachedPackages: SubscriptionPackage[] = [];
const cachedNativePackageByProductId = new Map<string, unknown>();

export type SubscriptionPackage = {
  id: string;
  productId: string;
  title: string;
  priceString: string;
  period?: string;
};

type PurchaseStatus =
  | "purchased"
  | "restored"
  | "no-active-subscription"
  | "cancelled"
  | "unavailable"
  | "error";

export type PurchaseResult = {
  ok: boolean;
  status: PurchaseStatus;
  message: string;
};

export type PremiumStatus = {
  active: boolean;
  source: "revenuecat" | "dev" | "none";
};

type RevenueCatCustomerInfoLike = {
  entitlements?: {
    active?: Record<string, unknown>;
  };
};

type RevenueCatOfferingsLike = {
  current?: {
    identifier?: string;
    availablePackages?: Array<{
      identifier?: string;
      packageType?: string;
      product?: {
        identifier?: string;
        title?: string;
        priceString?: string;
        subscriptionPeriod?: string;
      };
      storeProduct?: {
        identifier?: string;
        title?: string;
        priceString?: string;
        subscriptionPeriod?: string;
      };
    }>;
  };
  all?: Record<string, {
    identifier?: string;
    availablePackages?: Array<{
      identifier?: string;
      packageType?: string;
      product?: {
        identifier?: string;
        title?: string;
        priceString?: string;
        subscriptionPeriod?: string;
      };
      storeProduct?: {
        identifier?: string;
        title?: string;
        priceString?: string;
        subscriptionPeriod?: string;
      };
    }>;
  }>;
};

type RevenueCatBridge = {
  configure?: (args: { apiKey: string }) => Promise<void> | void;
  getOfferings?: () => Promise<RevenueCatOfferingsLike>;
  getCustomerInfo?: () => Promise<RevenueCatCustomerInfoLike>;
  purchasePackage?: (args: { aPackage: unknown }) => Promise<{ customerInfo?: RevenueCatCustomerInfoLike }>;
  restorePurchases?: () => Promise<{ customerInfo?: RevenueCatCustomerInfoLike }>;
};

declare global {
  interface Window {
    RevenueCatBridge?: RevenueCatBridge;
  }
}

export function isDevPremiumUnlockAllowed(): boolean {
  return import.meta.env.DEV;
}

export function isNativeIosRuntime(): boolean {
  if (typeof window === "undefined") return false;
  const capacitor = (window as { Capacitor?: { isNativePlatform?: () => boolean; getPlatform?: () => string } })
    .Capacitor;
  return Boolean(capacitor?.isNativePlatform?.() && capacitor?.getPlatform?.() === "ios");
}

function setLocalPremium(active: boolean): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PREMIUM_STORAGE_KEY, active ? "true" : "false");
}

function hasActiveEntitlement(customerInfo: RevenueCatCustomerInfoLike | undefined): boolean {
  if (!customerInfo?.entitlements?.active) return false;
  return Boolean(customerInfo.entitlements.active[ENTITLEMENT_ID]);
}

async function getNativeRevenueCatBridge(): Promise<RevenueCatBridge | null> {
  if (!isNativeIosRuntime()) return null;

  try {
    const module = (await import("@revenuecat/purchases-capacitor")) as {
      Purchases?: RevenueCatBridge;
    };

    if (!module.Purchases) return null;

    if (!revenueCatConfigured) {
      if (!REVENUECAT_IOS_API_KEY) {
        throw new Error("Missing VITE_REVENUECAT_IOS_API_KEY");
      }
      await module.Purchases.configure?.({ apiKey: REVENUECAT_IOS_API_KEY });
      revenueCatConfigured = true;
    }

    return module.Purchases;
  } catch {
    return null;
  }
}

function getLegacyWindowBridge(): RevenueCatBridge | null {
  if (typeof window === "undefined") return null;
  return window.RevenueCatBridge ?? null;
}

function normalizePackagesFromOffering(offerings: RevenueCatOfferingsLike | undefined): SubscriptionPackage[] {
  const allOfferings = offerings?.all ?? {};
  const selectedOffering =
    allOfferings[OFFERING_ID] ??
    offerings?.current ??
    Object.values(allOfferings)[0];

  const packages = selectedOffering?.availablePackages ?? [];

  return packages
    .map((pkg) => {
      const product = pkg.storeProduct ?? pkg.product;
      const productId = product?.identifier ?? "";
      if (!productId) return null;
      return {
        id: pkg.identifier || pkg.packageType || productId,
        productId,
        title: product?.title || (productId === IOS_YEARLY_PRODUCT_ID ? "Yearly" : "Monthly"),
        priceString: product?.priceString || "",
        period: product?.subscriptionPeriod,
      } satisfies SubscriptionPackage;
    })
    .filter((item): item is SubscriptionPackage => Boolean(item));
}

async function getBridge(): Promise<RevenueCatBridge | null> {
  const native = await getNativeRevenueCatBridge();
  if (native) return native;
  return getLegacyWindowBridge();
}

export async function getAvailablePackages(): Promise<SubscriptionPackage[]> {
  const bridge = await getBridge();
  if (!bridge?.getOfferings) return [];

  try {
    const offerings = await bridge.getOfferings();
    cachedNativePackageByProductId.clear();
    const allOfferings = offerings?.all ?? {};
    const selectedOffering =
      allOfferings[OFFERING_ID] ??
      offerings?.current ??
      Object.values(allOfferings)[0];
    const rawPackages = selectedOffering?.availablePackages ?? [];
    for (const pkg of rawPackages) {
      const product = pkg.storeProduct ?? pkg.product;
      const productId = product?.identifier;
      if (productId) {
        cachedNativePackageByProductId.set(productId, pkg as unknown);
      }
    }

    const packages = normalizePackagesFromOffering(offerings);
    cachedPackages = packages;
    return packages;
  } catch {
    return [];
  }
}

export function getSubscriptionsUnavailableMessage(): string {
  if (isNativeIosRuntime() && !REVENUECAT_IOS_API_KEY) {
    return "Subscriptions are temporarily unavailable. Please try again later.";
  }
  return "Subscriptions are temporarily unavailable. Please try again later.";
}

export async function refreshEntitlement(): Promise<PremiumStatus> {
  const bridge = await getBridge();

  if (bridge?.getCustomerInfo) {
    try {
      const info = await bridge.getCustomerInfo();
      const active = hasActiveEntitlement(info);
      setLocalPremium(active);
      return { active, source: active ? "revenuecat" : "none" };
    } catch {
      return { active: false, source: "none" };
    }
  }

  if (isDevPremiumUnlockAllowed()) {
    if (typeof window === "undefined") return { active: false, source: "none" };
    return {
      active: window.localStorage.getItem(PREMIUM_STORAGE_KEY) === "true",
      source: "dev",
    };
  }

  setLocalPremium(false);
  return { active: false, source: "none" };
}

export async function getPremiumStatus(): Promise<PremiumStatus> {
  return refreshEntitlement();
}

function findPackageForProductId(productId: string): SubscriptionPackage | null {
  return cachedPackages.find((pkg) => pkg.productId === productId || pkg.id === productId) ?? null;
}

export async function purchasePremium(productId = IOS_YEARLY_PRODUCT_ID): Promise<PurchaseResult> {
  const bridge = await getBridge();

  if (bridge?.purchasePackage) {
    try {
      if (cachedPackages.length === 0) {
        await getAvailablePackages();
      }

      const selected = findPackageForProductId(productId);
      if (!selected) {
        return {
          ok: false,
          status: "unavailable",
          message: "Subscription package is unavailable right now. Please try again shortly.",
        };
      }

      const nativePackage = cachedNativePackageByProductId.get(selected.productId);
      if (!nativePackage) {
        return {
          ok: false,
          status: "unavailable",
          message: "Subscription package metadata is unavailable right now. Please try again.",
        };
      }

      const result = await bridge.purchasePackage({ aPackage: nativePackage });
      const active = hasActiveEntitlement(result.customerInfo);
      setLocalPremium(active);

      if (active) {
        return {
          ok: true,
          status: "purchased",
          message: "Premium access is now active.",
        };
      }

      return {
        ok: false,
        status: "cancelled",
        message: "Purchase was cancelled or did not activate premium.",
      };
    } catch {
      return {
        ok: false,
        status: "error",
        message: "Purchase could not be completed. Please try again.",
      };
    }
  }

  if (isDevPremiumUnlockAllowed()) {
    // TEMPORARY DEV UNLOCK — replace with StoreKit / RevenueCat purchase before production.
    setLocalPremium(true);
    return {
      ok: true,
      status: "purchased",
      message: "Premium unlocked for local testing.",
    };
  }

  return {
    ok: false,
    status: "unavailable",
    message: getSubscriptionsUnavailableMessage(),
  };
}

export async function restorePurchases(): Promise<PurchaseResult> {
  const bridge = await getBridge();

  if (bridge?.restorePurchases) {
    try {
      const result = await bridge.restorePurchases();
      const active = hasActiveEntitlement(result.customerInfo);
      setLocalPremium(active);

      if (active) {
        return {
          ok: true,
          status: "restored",
          message: "Your premium access has been restored.",
        };
      }

      return {
        ok: false,
        status: "no-active-subscription",
        message: "No active subscription was found for this Apple ID.",
      };
    } catch {
      return {
        ok: false,
        status: "error",
        message: "Restore could not be completed. Please try again or contact support.",
      };
    }
  }

  if (isDevPremiumUnlockAllowed()) {
    const active = typeof window !== "undefined" && window.localStorage.getItem(PREMIUM_STORAGE_KEY) === "true";

    return {
      ok: active,
      status: active ? "restored" : "no-active-subscription",
      message: active
        ? "Premium is active in local test mode."
        : "No active test subscription found in local mode.",
    };
  }

  return {
    ok: false,
    status: "unavailable",
    message: "Restore is temporarily unavailable. Please try again later.",
  };
}
