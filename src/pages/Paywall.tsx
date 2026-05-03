import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Layout from "../components/Layout";
import Card from "../components/Card";
import Button from "../components/Button";
import BackButton from "../components/BackButton";
import SubscribeButton from "../components/SubscribeButton";
import { isPremium } from "../lib/premium";
import {
  IOS_YEARLY_PRODUCT_ID,
  getAvailablePackages,
  getSubscriptionsUnavailableMessage,
  purchasePremium,
  refreshEntitlement,
  restorePurchases,
  type SubscriptionPackage,
} from "../lib/entitlements";

export default function Paywall() {
  const [searchParams] = useSearchParams();
  const [hasPremium, setHasPremium] = useState(isPremium());
  const [purchaseMessage, setPurchaseMessage] = useState("");
  const [purchaseBusy, setPurchaseBusy] = useState(false);
  const [restoreBusy, setRestoreBusy] = useState(false);
  const [restoreMessage, setRestoreMessage] = useState("");
  const [packages, setPackages] = useState<SubscriptionPackage[]>([]);
  const [selectedProductId, setSelectedProductId] = useState(IOS_YEARLY_PRODUCT_ID);
  const [offeringsMessage, setOfferingsMessage] = useState("");
  const source = searchParams.get("source");
  const heading = useMemo(() => {
    if (source === "home") return "Unlock the full Sacred Path for both of you.";
    if (source === "ritual") return "Unlock deeper rituals for both of you.";
    if (source === "rituals") return "Unlock the complete intimacy library.";
    if (source === "voice") return "Unlock Sacred Voice for both of you.";
    if (source === "oracle") return "Unlock unlimited Intimacy Oracle.";
    if (source === "journey" || source === "journey-benefits") return "Unlock your full shared Journey.";
    if (source === "deeper") return "Go deeper together with the full premium path.";
    if (source === "saved") return "Keep building your shared memory.";
    return "Unlock the full Sacred Path for both of you.";
  }, [source]);

  useEffect(() => {
    let active = true;

    void (async () => {
      const status = await refreshEntitlement();
      if (!active) return;
      setHasPremium(status.active);

      const available = await getAvailablePackages();
      if (!active) return;
      setPackages(available);
      if (available.length > 0) {
        setSelectedProductId(available[0].productId);
      } else {
        setOfferingsMessage(getSubscriptionsUnavailableMessage());
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  const onPurchase = async () => {
    if (purchaseBusy) return;
    setPurchaseBusy(true);
    setPurchaseMessage("");
    try {
      const result = await purchasePremium(selectedProductId);
      setPurchaseMessage(result.message);
      const status = await refreshEntitlement();
      setHasPremium(status.active);
    } finally {
      setPurchaseBusy(false);
    }
  };

  const onRestore = async () => {
    if (restoreBusy) return;
    setRestoreBusy(true);
    setRestoreMessage("");
    try {
      const result = await restorePurchases();
      setRestoreMessage(result.message);
      const status = await refreshEntitlement();
      setHasPremium(status.active);
    } finally {
      setRestoreBusy(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <BackButton fallbackPath="/" />
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl mb-4">{heading}</h1>
          <p className="text-lg text-muted max-w-3xl mx-auto">
            Unlock the full intimacy library for both of you - $29.99 per year. One subscription. Two partners.
            Daily rituals, guided voice, oracle prompts, and your shared journey.
          </p>
          <p className="text-sm text-muted max-w-3xl mx-auto mt-3">
            One subscription unlocks the full path for both connected partners: 300+ rituals, Sacred Voice, Intimacy Oracle, shared Journey, saved reflections, repair milestones, and deeper weather-based recommendations.
          </p>
        </div>

        <div className="mb-10">
          <p className="text-[11px] uppercase tracking-widest text-accent bg-white/5 inline-block px-4 py-2 rounded-full border border-white/10">
            One subscription for both partners
          </p>
          <h2 className="font-serif text-3xl mt-6 text-center">Make premium feel worth it in one glance.</h2>
        </div>

        {/* Three Column Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          <Card>
            <p className="text-[11px] uppercase tracking-widest text-accent font-semibold mb-2">For Men</p>
            <h3 className="font-serif text-2xl mb-4">Hold charge.<br/>Last longer.</h3>
            <p className="text-sm text-muted mb-6">Presence, pacing, breath, and steadier erotic energy.</p>
            <ul className="text-sm space-y-3 text-text/90 list-disc pl-5">
              <li>Stay present under arousal instead of rushing the night.</li>
              <li>Learn a calmer way to last longer without losing spark.</li>
              <li>Use semen retention as depth and energy management.</li>
              <li>Feel more pleasure in the whole body.</li>
            </ul>
          </Card>

          <Card>
            <p className="text-[11px] uppercase tracking-widest text-accent font-semibold mb-2">For Women</p>
            <h3 className="font-serif text-2xl mb-4">Slow sex that<br/>feels safer.</h3>
            <p className="text-sm text-muted mb-6">Softer pacing, conscious touch, more trust.</p>
            <ul className="text-sm space-y-3 text-text/90 list-disc pl-5">
              <li>Receive slower touch and clearer pacing.</li>
              <li>Build emotional safety and erotic softness together.</li>
              <li>Turn conscious touch into real desire.</li>
              <li>Let intimacy feel nourishing and warm.</li>
            </ul>
          </Card>

          <Card>
            <p className="text-[11px] uppercase tracking-widest text-accent font-semibold mb-2">For The Couple</p>
            <h3 className="font-serif text-2xl mb-4">Richer rituals<br/>for both of you.</h3>
            <p className="text-sm text-muted mb-6">Shared practices, Sacred Voice, stronger bond.</p>
            <ul className="text-sm space-y-3 text-text/90 list-disc pl-5">
              <li>One subscription unlocks the premium path.</li>
              <li>Get richer rituals and deeper teachings.</li>
              <li>Move from one card into a real intimacy system.</li>
              <li>Keep simplicity while upgrading the depth.</li>
            </ul>
          </Card>

        </div>

        {/* Action Buttons */}
        <div className="max-w-xl mx-auto space-y-4">
          {!hasPremium ? (
            <SubscribeButton source="paywall" mode="purchase" onSubscribed={onPurchase} disabled={purchaseBusy} />
          ) : (
            <Button variant="secondary" disabled>
              Premium active for both of you
            </Button>
          )}
          <Card>
            <p className="text-sm">
              Sacred Path Premium unlocks the full ritual library, Sacred Voice, Intimacy Oracle, Journey tools, and deeper practices for both partners.
            </p>
            <p className="text-sm mt-3">Yearly subscription: $29.99 per year.</p>
            <p className="text-sm">Monthly subscription: $2.99 per month.</p>
            <p className="text-sm mt-3">
              Payment will be charged to your Apple ID account at confirmation of purchase. Subscription automatically renews unless canceled at least 24 hours before the end of the current period. Your account will be charged for renewal within 24 hours before the end of the current period. You can manage or cancel your subscription in your App Store account settings.
            </p>
            <p className="text-sm mt-3">
              By subscribing, you agree to our{" "}
              <Link to="/terms" className="underline">
                Terms of Use
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="underline">
                Privacy Policy
              </Link>
              .
            </p>
          </Card>
          <p className="text-center text-xs text-muted">
            Payment and subscription management are handled by the App Store.
          </p>
          <Card>
            <p className="text-sm">
              <strong>Product:</strong> Sacred Path Premium
            </p>
            <p className="text-sm">
              <strong>Price:</strong> $29.99 per year
            </p>
            <p className="text-sm">
              <strong>Access:</strong> One subscription unlocks the premium path for both connected partners.
            </p>
            <ul className="text-sm mt-3 space-y-1 text-muted">
              <li>300+ rituals</li>
              <li>Sacred Voice guided audio</li>
              <li>Intimacy Oracle</li>
              <li>Shared Journey dashboard</li>
              <li>Saved reflections</li>
              <li>Repair milestones</li>
              <li>Weather-based recommendations</li>
            </ul>
            {packages.length > 0 ? (
              <div className="mt-4 space-y-2">
                <p className="text-xs uppercase tracking-[0.14em] text-accent">Available subscriptions</p>
                {packages.map((pkg) => (
                  <button
                    key={pkg.productId}
                    type="button"
                    onClick={() => setSelectedProductId(pkg.productId)}
                    className={`w-full rounded-xl border px-3 py-2 text-left text-sm transition ${
                      selectedProductId === pkg.productId
                        ? "border-accent bg-accent/10"
                        : "border-white/10 bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <p className="font-semibold">{pkg.title || pkg.productId}</p>
                    <p className="text-xs text-muted">{pkg.priceString || pkg.productId}</p>
                  </button>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-xs text-muted">{offeringsMessage || "Loading subscription options..."}</p>
            )}
          </Card>
          <div className="grid gap-2 sm:grid-cols-2">
            <Button variant="secondary" onClick={onRestore} disabled={restoreBusy}>
              {restoreBusy ? "Restoring..." : "Restore purchases"}
            </Button>
            <Link to="/terms" className="block">
              <Button variant="secondary">Terms of Use</Button>
            </Link>
            <Link to="/privacy" className="block">
              <Button variant="secondary">Privacy Policy</Button>
            </Link>
            <Link to="/support" className="block sm:col-span-2">
              <Button variant="secondary">Support</Button>
            </Link>
          </div>
          {purchaseMessage ? <p className="text-xs text-muted text-center">{purchaseMessage}</p> : null}
          {restoreMessage ? <p className="text-xs text-muted text-center">{restoreMessage}</p> : null}
          <p className="text-center text-xs text-muted">
            If subscriptions are unavailable, please try again later.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
          <Button variant="secondary" onClick={() => window.history.back()}>Back to ritual</Button>
          </div>
        </div>

      </div>
    </Layout>
  );
}
