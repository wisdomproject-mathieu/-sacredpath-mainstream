import { Link } from "react-router-dom";

export default function Paywall() {
  return (
    <main className="min-h-screen bg-sp-bg text-slate-100">
      <div className="home-shell">
        <h1 className="paywall-title">Go deeper than one card.</h1>
        <p className="paywall-subtitle">
          This is the mainstream upgrade: one fast ritual in under 30 seconds,
          then a more irresistible premium path for both of you. Men get help
          with presence, lasting longer, and steadier erotic energy. Women get
          slower touch, conscious pacing, softness, and safer intimacy.
        </p>

        <div className="paywall-topbar">
          <span className="paywall-topbar-label">One subscription for both partners</span>
          <div className="home-couple-chip-mini">
            <span className="badge-mini">
              <img src="/sacred-path-mark.png" alt="" />
            </span>
            <span>Mathieu <span className="dot">•</span> Edita</span>
          </div>
        </div>

        <h2 className="paywall-headline">
          Make premium feel worth it in one glance.
        </h2>

        <div className="paywall-grid">
          <article className="value-card value-men">
            <p className="value-kicker">For men</p>
            <h2>
              Hold charge.
              <br />
              Last longer.
            </h2>
            <p className="value-body">
              Presence, pacing, breath, and semen retention as steadier erotic
              energy.
            </p>
            <ul>
              <li>Stay present under arousal instead of rushing the night.</li>
              <li>Learn a calmer way to last longer without losing spark.</li>
              <li>Use semen retention as depth and energy management, not pressure.</li>
              <li>Feel more pleasure in the whole body, not only at the finish line.</li>
            </ul>
          </article>

          <article className="value-card value-women">
            <p className="value-kicker">For women</p>
            <h2>
              Slow sex that
              <br />
              feels safer.
            </h2>
            <p className="value-body">
              Softer pacing, conscious touch, more trust, and the kind of
              intimacy the body can actually open to.
            </p>
            <ul>
              <li>Receive slower touch and clearer pacing.</li>
              <li>Build emotional safety and erotic softness together.</li>
              <li>Turn conscious touch into real desire instead of pressure.</li>
              <li>Let intimacy feel nourishing, warm, and deeply attuned.</li>
            </ul>
          </article>

          <article className="value-card value-couple">
            <p className="value-kicker">For the couple</p>
            <h2>
              Richer rituals
              <br />
              for both of you.
            </h2>
            <p className="value-body">
              Shared practices, Sacred Voice, and a stronger reason to keep
              coming back together.
            </p>
            <ul>
              <li>One subscription unlocks the premium path for both partners.</li>
              <li>Get richer rituals, deeper teachings, and guided Sacred Voice.</li>
              <li>Move from one free card into a real intimacy system.</li>
              <li>Keep the mainstream simplicity while upgrading the depth.</li>
            </ul>
          </article>
        </div>

        <div className="paywall-cta-row">
          <button className="home-btn home-btn-gold">Start subscription</button>
          <Link to="/ritual" className="home-btn home-btn-ghost">
            Back to ritual
          </Link>
        </div>
      </div>
    </main>
  );
}