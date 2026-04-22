import { useRouter } from "next/router";
import Link from "next/link";

export default function PaywallPage() {
  const router = useRouter();
  const { yw, pw, you, partner } = router.query;

  const premiumLink = {
    pathname: "/ritual",
    query: { yw, pw, you, partner, premium: "1" },
  } as const;

  return (
    <div className="card">
      <div className="card-header">
        <span className="chip">Sacred Path Premium</span>
        <h1 className="title">Go deeper tonight.</h1>
        <p className="subtitle">
          Free always gives you one soft ritual. Premium unlocks the full field for this exact
          weather: more depth, more choice, and Sacred Voice guiding you.
        </p>
      </div>
      <div className="premium-strip">
        <div className="label">What you unlock</div>
        <ul className="ritual-steps">
          <li>All premium rituals for tonight&apos;s weather pairing.</li>
          <li>Sacred Voice audio journeys that speak you through each step.</li>
          <li>A calmer, more guided way to meet each other after long days.</li>
        </ul>
      </div>
      <button
        className="primary-button"
        type="button"
        onClick={() => router.push(premiumLink)}
      >
        Continue with Premium
      </button>
      <Link
        href={{ pathname: "/ritual", query: { yw, pw, you, partner } }}
        className="secondary-button"
        style={{ display: "inline-block", textAlign: "center" }}
      >
        Stay with free ritual
      </Link>
      <p className="footer-note">
        Subscription and billing integration plugs in here — this screen is a focused entry
        point, not a menu.
      </p>
    </div>
  );
}
