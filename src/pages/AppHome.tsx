import { useNavigate } from "react-router-dom";
import { useSession } from "../contexts/SessionContext";
import CoupleTopbar from "../components/CoupleTopbar";

export default function AppHome() {
  const navigate = useNavigate();
  const { state, setState } = useSession();
  const logoSrc = `${import.meta.env.BASE_URL}shiva-shakti-icon.png`;
  const yourName = state.youName;
  const partnerName = state.partnerName;
  const sendCodeToWhatsApp = () => {
    const message = encodeURIComponent(
      `Sacred Path for Couples: ${yourName || "I"} and ${partnerName || "my partner"} are ready for our shared intimacy weather.`
    );
    window.open(`https://wa.me/?text=${message}`, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="min-h-screen bg-sp-bg text-slate-100">
      <div className="home-shell">
        <section className="home-hero">
          <div className="home-left">
            <h1 className="home-title">
              Deep connection &amp;
              <br />
              renewed intimacy
              <br />
              for every couple.
            </h1>

            <p className="home-subtitle">
              Understand your unique needs and desires. Bring deep presence, safe
              touch, and renewed closeness into your relationship. Start your journey
              together.
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
                <p className="value-kicker">Card for men</p>
                <h2>
                  Focus:
                  <br />
                  Presence.
                </h2>
                <p className="value-body">Learn to hold a stable and present space for your partner.</p>
              </article>

              <article className="value-card value-women">
                <p className="value-kicker">Card for women</p>
                <h2>
                  Focus:
                  <br />
                  Softness.
                </h2>
                <p className="value-body">Experience deeply respected and gentle touch.</p>
              </article>

              <article className="value-card value-couple">
                <p className="value-kicker">Card for couple</p>
                <h2>
                  Focus:
                  <br />
                  Rituals.
                </h2>
                <p className="value-body">Build deep affection with shared, mindful practices.</p>
              </article>
            </div>

            <div className="home-cta-row">
              <button
                className="home-btn home-btn-gold"
                onClick={() => navigate("/weather")}
              >
                Sense both weather
              </button>
              <button
                className="home-btn home-btn-ghost"
                onClick={sendCodeToWhatsApp}
              >
                Send code on WhatsApp
              </button>
            </div>
          </div>

          <aside className="home-visual-wrap">
            <div className="home-visual-card">
              <div className="home-visual-brand">
                <CoupleTopbar />
              </div>
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
                  One simple ritual. More closeness, more softness, one stronger night together.
                </p>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
