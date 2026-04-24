import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AppHome() {
  const navigate = useNavigate();
  const [yourName, setYourName] = useState("Mathieu");
  const [partnerName, setPartnerName] = useState("Edita");

  return (
    <main className="min-h-screen bg-sp-bg text-slate-100">
      <div className="home-shell">
        {/* Top bar */}
        <div className="home-topbar">
          <span className="home-topbar-label">Sacred Path for Couples</span>
          <div className="home-couple-chip-mini">
            <span className="badge-mini">
              <img src="/sacred-path-mark.png" alt="" />
            </span>
            <span>
              {yourName || "Mathieu"} <span className="dot">•</span>{" "}
              {partnerName || "Edita"}
            </span>
          </div>
        </div>

        <section className="home-hero">
          <div className="home-left">
            <h1 className="home-title">
              Ancient wisdom
              <br />
              for modern
              <br />
              couples.
            </h1>

            <p className="home-subtitle">
              Men want to get closer every day and last longer. Women want soft,
              conscious touch, real presence, and to feel deeply respected.
              Sacred Path brings that into your lives.
            </p>

            <div className="home-name-row">
              <label className="home-field-minimal">
                <span>Your name</span>
                <input
                  value={yourName}
                  onChange={(e) => setYourName(e.target.value)}
                />
              </label>
              <label className="home-field-minimal">
                <span>Partner name</span>
                <input
                  value={partnerName}
                  onChange={(e) => setPartnerName(e.target.value)}
                />
              </label>
            </div>

            <div className="home-value-grid">
              <article className="value-card value-men">
                <p className="value-kicker">For men</p>
                <h2>
                  Hold charge.
                  <br />
                  Last longer.
                </h2>
                <p className="value-body">
                  Presence, pacing, breath, and steadier erotic energy. Stay
                  present under arousal instead of rushing the night.
                </p>
                <ul>
                  <li>Learn a calmer way to last longer without losing spark.</li>
                  <li>Use energy as depth and management, not pressure.</li>
                  <li>Feel more pleasure in the whole body.</li>
                </ul>
              </article>

              <article className="value-card value-women">
                <p className="value-kicker">For women</p>
                <h2>
                  Slow touch
                  <br />
                  that feels safer.
                </h2>
                <p className="value-body">
                  Softer pacing, conscious touch, more trust, and the kind of
                  intimacy the body can actually open to.
                </p>
                <ul>
                  <li>Receive slower touch and clearer pacing.</li>
                  <li>Build emotional safety and erotic softness together.</li>
                  <li>Let intimacy feel nourishing, warm, deeply attuned.</li>
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
                  <li>One path unlocks the premium experience for both.</li>
                  <li>Get richer rituals, deeper teachings, guided voice.</li>
                  <li>Move from one free card into a real intimacy system.</li>
                </ul>
              </article>
            </div>

            <div className="home-cta-row">
              <button
                className="home-btn home-btn-gold"
                onClick={() => navigate("/weather")}
              >
                Intimacy weather
              </button>
              <button
                className="home-btn home-btn-ghost"
                onClick={() => navigate("/paywall")}
              >
                See premium for both of you
              </button>
            </div>
          </div>

          <aside className="home-visual-wrap">
            <div className="home-visual-card">
              <div className="home-visual-glow" />
              <div className="home-visual-beam" />
              <div className="home-visual-icon-area">
                <img
                  src="/sacred-path-mark.png"
                  alt="Sacred Path"
                  className="home-shiny-icon"
                />
              </div>
              <div className="home-couple-panel">
                <div className="home-couple-chip">
                  <span className="badge">
                    <img src="/sacred-path-mark.png" alt="" />
                  </span>
                  <span>
                    {yourName || "Mathieu"} <span className="dot">•</span>{" "}
                    {partnerName || "Edita"}
                  </span>
                </div>
                <p className="panel-kicker">Tonight starts here</p>
                <p className="panel-text">
                  One simple ritual. More closeness, more softness, one stronger
                  night together.
                </p>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}