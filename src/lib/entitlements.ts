import { PREMIUM_STORAGE_KEY } from "./premium";

export const ENTITLEMENT_ID = "premium";
export const IOS_MONTHLY_PRODUCT_ID = "com.sacredpathforcouples.premium.monthly";
export const IOS_YEARLY_PRODUCT_ID = "com.sacredpathforcouples.premium.yearly";

// TEMPORARY DEV PREMIUM STATE — replace with StoreKit / RevenueCat entitlement validation before production.
const DEV_UNLOCK_FLAG = "VITE_ENABLE_DEV_PREMIUM_UNLOCK";

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

type RevenueCatBridge = {
  purchasePackage?: (packageId?: string) => Promise<{ customerInfo?: RevenueCatCustomerInfoLike }>;
  restorePurchases?: () => Promise<{ customerInfo?: RevenueCatCustomerInfoLike }>;
  getCustomerInfo?: () => Promise<RevenueCatCustomerInfoLike>;
};

declare global {
  interface Window {
    RevenueCatBridge?: RevenueCatBridge;
  }
}

function readDevFlag(): boolean {
  return import.meta.env.DEV || String(import.meta.env[DEV_UNLOCK_FLAG] ?? "").toLowerCase() === "true";
}

export function isDevPremiumUnlockAllowed(): boolean {
  return readDevFlag() && !import.meta.env.PROD;
}

function setLocalPremium(active: boolean): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PREMIUM_STORAGE_KEY, active ? "true" : "false");
}

function hasActiveEntitlement(customerInfo: RevenueCatCustomerInfoLike | undefined): boolean {
  if (!customerInfo?.entitlements?.active) return false;
  return Boolean(customerInfo.entitlements.active[ENTITLEMENT_ID]);
}

function getBridge(): RevenueCatBridge | undefined {
  if (typeof window === "undefined") return undefined;
  return window.RevenueCatBridge;
}

export async function refreshEntitlement(): Promise<PremiumStatus> {
  const bridge = getBridge();

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

export async function purchasePremium(packageId = IOS_YEARLY_PRODUCT_ID): Promise<PurchaseResult> {
  const bridge = getBridge();

  if (bridge?.purchasePackage) {
    try {
      const result = await bridge.purchasePackage(packageId);
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
    message:
      "In-app purchase is not available in this build yet. Connect StoreKit / RevenueCat before App Store submission.",
  };
}

export async function restorePurchases(): Promise<PurchaseResult> {
  const bridge = getBridge();

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
    message:
      "Restore is not available in this build yet. Connect StoreKit / RevenueCat restore before App Store submission.",
  };
}
