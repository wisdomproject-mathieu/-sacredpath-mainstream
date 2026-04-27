import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import Card from "../components/Card";
import Button from "../components/Button";

export default function Paywall() {
  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl mb-4">Go deeper than one card.</h1>
          <p className="text-lg text-muted max-w-3xl mx-auto">
            This is the mainstream upgrade: one fast ritual in under 30 seconds, then a more irresistible premium path for both of you. 
            Men get help with presence, lasting longer, and steadier erotic energy. Women get slower touch, conscious pacing, softness, and safer intimacy.
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
        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
          <Button variant="glow">Start subscription</Button>
          <Button variant="secondary" onClick={() => window.history.back()}>Back to ritual</Button>
        </div>

      </div>
    </Layout>
  );
}