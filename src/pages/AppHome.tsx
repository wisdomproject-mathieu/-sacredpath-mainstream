import { useNavigate } from "react-router-dom";
import { useSession } from "../contexts/SessionContext";
import CoupleTopbar from "../components/CoupleTopbar";
import { resolveWeatherRitual } from "../lib/ritualRegistry";

export default function AppHome() {
  const navigate = useNavigate();
  const { state, setState } = useSession();
  const heroArtSrc = `${import.meta.env.BASE_URL}assets/home/home-premium-union.png`;
  const yourName = state.youName;
  const partnerName = state.partnerName;
  const weatherResolution =
    state.youWeather && state.partnerWeather
      ? resolveWeatherRitual(state.youWeather, state.partnerWeather)
      : null;
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
                <span className="value-card-art value-card-art-men" aria-hidden="true" />
                <p className="value-kicker">Card for men</p>
                <h2>
                  Focus:
                  <br />
                  Presence.
                </h2>
                <p className="value-body">Learn to hold a stable and present space for your partner.</p>
              </article>

              <article className="value-card value-women">
                <span className="value-card-art value-card-art-women" aria-hidden="true" />
                <p className="value-kicker">Card for women</p>
                <h2>
                  Focus:
                  <br />
                  Softness.
                </h2>
                <p className="value-body">Experience deeply respected and gentle touch.</p>
              </article>

              <article className="value-card value-couple">
                <span className="value-card-art value-card-art-couple" aria-hidden="true" />
                <p className="value-kicker">Card for couple</p>
                <h2>
                  Focus:
                  <br />
                  Rituals.
                </h2>
                <p className="value-body">Build deep affection with shared, mindful practices.</p>
              </article>
            </div>

            <section className="mt-8 overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-5 shadow-[0_18px_45px_rgba(0,0,0,0.45)] backdrop-blur-xl">
              <p className="text-[0.72rem] font-black uppercase tracking-[0.32em] text-sp-gold">
                {weatherResolution?.homeCard.eyebrow ?? "Tonight's path"}
              </p>
              <div className="mt-4 grid gap-5 lg:grid-cols-[1.3fr_1fr]">
                <div>
                  <h2 className="font-display text-[clamp(2rem,3vw,3.5rem)] leading-[0.95] text-sp-text">
                    {weatherResolution?.homeCard.title ?? "Choose both weather states"}
                  </h2>
                  <p className="mt-3 max-w-xl text-sm leading-7 text-slate-300">
                    {weatherResolution?.homeCard.body ??
                      "Pick your weather and your partner's weather to reveal the shared ritual outcome for tonight."}
                  </p>

                  {weatherResolution?.freeRitual ? (
                    <div className="mt-5 rounded-[24px] border border-white/10 bg-black/20 p-4">
                      <p className="text-[0.68rem] font-black uppercase tracking-[0.28em] text-sp-gold">
                        {weatherResolution.freeRitual.title}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-200">
                        {weatherResolution.freeRitual.subtitle}
                      </p>
                      <ol className="mt-4 space-y-2 text-sm leading-6 text-slate-300">
                        {weatherResolution.freeRitual.ritualSteps.slice(0, 4).map((step, index) => (
                          <li key={step} className="flex gap-3">
                            <span className="inline-flex h-6 w-6 flex-none items-center justify-center rounded-full border border-white/10 bg-white/5 text-[0.68rem] font-black text-sp-gold">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  ) : null}
                </div>

                <div className="flex flex-col justify-between gap-4 rounded-[24px] border border-white/10 bg-black/20 p-4">
                  <div>
                    <p className="text-[0.68rem] font-black uppercase tracking-[0.28em] text-sp-gold">
                      Weather pair
                    </p>
                    <p className="mt-2 text-lg font-bold text-sp-text">
                      {state.youWeather && state.partnerWeather
                        ? `${state.youWeather} + ${state.partnerWeather}`
                        : "Not connected yet"}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      {state.youWeather && state.partnerWeather
                        ? "The new 6-weather engine turns this pair into tonight's ritual."
                        : "Connect both weather states to reveal the full ritual path and shared outcome."}
                    </p>
                  </div>
                  <button
                    className="inline-flex min-h-[56px] items-center justify-center rounded-full bg-gradient-to-r from-sp-gold to-sp-gold2 px-6 text-sm font-black text-sp-darkGold shadow-sp-gold transition hover:-translate-y-0.5"
                    onClick={() => navigate("/ritual")}
                    disabled={!state.youWeather || !state.partnerWeather}
                    type="button"
                  >
                    Enter Tonight&apos;s Path
                  </button>
                </div>
              </div>
            </section>

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
                  src={heroArtSrc}
                  alt="Sacred Path for Couples"
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
