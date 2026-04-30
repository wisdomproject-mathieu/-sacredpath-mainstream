import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Layout from "../components/Layout";
import Card from "../components/Card";
import Button from "../components/Button";
import BackButton from "../components/BackButton";
import SubscribeButton from "../components/SubscribeButton";

export default function Paywall() {
  const [searchParams] = useSearchParams();
  const [restoreMessage, setRestoreMessage] = useState("");
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

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <BackButton fallbackPath="/" />
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl mb-4">{heading}</h1>
          <p className="text-lg text-muted max-w-3xl mx-auto">
            Unlock the full intimacy library for both of you - $29/year. One subscription. Two partners.
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
          <SubscribeButton source="paywall" mode="purchase" />
          <p className="text-center text-xs text-muted">
            Payment and subscription management are handled by the App Store.
          </p>
          <Card>
            <p className="text-sm">
              <strong>Product:</strong> Sacred Path Premium
            </p>
            <p className="text-sm">
              <strong>Price:</strong> $29/year
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
          </Card>
          <div className="grid gap-2 sm:grid-cols-2">
            <Button
              variant="secondary"
              onClick={() =>
                setRestoreMessage("Restore check complete for testing. Connect StoreKit / RevenueCat restore before production.")
              }
            >
              Restore purchases
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
          {restoreMessage ? <p className="text-xs text-muted text-center">{restoreMessage}</p> : null}
          <p className="text-center text-xs text-muted">
            Premium unlocked for testing. Replace with StoreKit / RevenueCat before production.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
          <Button variant="secondary" onClick={() => window.history.back()}>Back to ritual</Button>
          </div>
        </div>

      </div>
    </Layout>
  );
}
