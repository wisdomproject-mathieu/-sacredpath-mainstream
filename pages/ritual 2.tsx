import { useRouter } from "next/router";
import Link from "next/link";
import { resolveFreeRitual, resolvePremiumForWeather, type Weather } from "../lib/rituals";

export default function RitualPage() {
  const router = useRouter();
  const { yw, pw, you, partner, premium } = router.query;

  if (!yw || !pw || typeof yw !== "string" || typeof pw !== "string") {
    return (
      <div className="card">
        <div className="card-header">
          <span className="chip">Ritual</span>
          <h1 className="title">Almost there.</h1>
          <p className="subtitle">
            Choose your intimacy weather first, then we will reveal a ritual for tonight.
          </p>
        </div>
        <Link
          href="/weather"
          className="primary-button"
          style={{ display: "inline-block", textAlign: "center" }}
        >
          Choose Intimacy Weather
        </Link>
      </div>
    );
  }

  const youWeather = yw as Weather;
  const partnerWeather = pw as Weather;
  const freeRitual = resolveFreeRitual(youWeather, partnerWeather);
  const premiumRituals = resolvePremiumForWeather(youWeather, partnerWeather);
  const isPremium = typeof premium === "string";

  if (!freeRitual) {
    return (
      <div className="card">
        <div className="card-header">
          <span className="chip">Ritual</span>
          <h1 className="title">No ritual found.</h1>
          <p className="subtitle">We could not find a ritual for this weather combination yet.</p>
        </div>
      </div>
    );
  }

  const namesLine =
    typeof you === "string" || typeof partner === "string"
      ? `${typeof you === "string" ? you : "You"} · ${
          typeof partner === "string" ? partner : "Partner"
        }`
      : "Two people · One ritual";

  return (
    <div className="card">
      <div className="card-header">
        <span className="chip">Tonight&apos;s Ritual</span>
        <h1 className="title">{freeRitual.title}</h1>
        <p className="subtitle">{freeRitual.subtitle}</p>
      </div>
      <div className="ritual-meta-row">
        <span>{namesLine}</span>
        <span>
          {freeRitual.duration ? `${freeRitual.duration} min` : "Short"} · {freeRitual.intimacyLevel}
        </span>
      </div>
      <div className="ritual-body">
        <p>{freeRitual.description}</p>
        <ol className="ritual-steps">
          {freeRitual.ritualSteps.map((step, idx) => (
            <li key={idx}>{step}</li>
          ))}
        </ol>
      </div>
      {!isPremium && premiumRituals.length > 0 && (
        <div className="premium-strip">
          <div className="label">With Sacred Path Premium</div>
          <p style={{ marginTop: 4 }}>
            Unlock deeper rituals for this exact weather, plus Sacred Voice guided sessions to be
            led step by step together.
          </p>
          <div className="pill-row-inline">
            {premiumRituals.map((r) => (
              <span key={r.id} className="mini-pill">
                {r.title}
              </span>
            ))}
          </div>
          <Link
            href={{
              pathname: "/paywall",
              query: { yw, pw, you, partner },
            }}
            className="primary-button"
            style={{ display: "inline-block", textAlign: "center", marginTop: 12 }}
          >
            See Premium Path
          </Link>
        </div>
      )}
      {isPremium && premiumRituals.length > 0 && (
        <div className="premium-strip">
          <div className="label">Premium unlocked</div>
          <p style={{ marginTop: 4 }}>
            Tonight you have access to every ritual for this weather, plus Sacred Voice audio
            guidance.
          </p>
          <div className="pill-row-inline">
            {premiumRituals.map((r) => (
              <span key={r.id} className="mini-pill">
                {r.title}
              </span>
            ))}
          </div>
          {premiumRituals.find((r) => r.hasVoice) && (
            <Link
              href={{ pathname: "/voice", query: { yw, pw, you, partner } }}
              className="secondary-button"
              style={{ display: "inline-block", textAlign: "center", marginTop: 10 }}
            >
              Listen with Sacred Voice
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
