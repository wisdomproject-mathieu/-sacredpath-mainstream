import { useNavigate } from "react-router-dom";
import CoupleTopbar from "../components/CoupleTopbar";
import { useSession } from "../contexts/SessionContext";

export default function AppHome() {
  const navigate = useNavigate();
  const { state, setState } = useSession();
  const logoSrc = `${import.meta.env.BASE_URL}sacred-path-mark.png`;
  const yourName = state.youName;
  const partnerName = state.partnerName;

  return (
    <main className="min-h-screen bg-sp-bg text-slate-100">
      <div className="home-shell">
        <CoupleTopbar />

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
                  onChange={(e) => setState({ ...state, youName: e.target.value })}
                />
              </label>
              <label className="home-field-minimal">
                <span>Partner name</span>
                <input
                  value={partnerName}
                  onChange={(e) => setState({ ...state, partnerName: e.target.value })}
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
              </article>

              <article className="value-card value-women">
                <p className="value-kicker">For women</p>
                <h2>
                  Slow touch
                  <br />
                  that feels safer.
                </h2>
              </article>

              <article className="value-card value-couple">
                <p className="value-kicker">For the couple</p>
                <h2>
                  Richer rituals
                  <br />
                  for both of you.
                </h2>
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
                  src={logoSrc}
                  alt="Sacred Path"
                  className="home-shiny-icon"
                />
              </div>
              <div className="home-couple-panel">
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
