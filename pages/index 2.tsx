import Link from "next/link";

export default function HomePage() {
  return (
    <div className="card">
      <div className="card-header">
        <span className="chip">Sacred Path</span>
        <h1 className="title">Tonight, one ritual for two.</h1>
        <p className="subtitle">
          A lighter Sacred Path — choose your intimacy weather and receive one gentle ritual
          for tonight. Unlock more when you are ready.
        </p>
      </div>
      <Link
        href="/connect"
        className="primary-button"
        style={{ display: "inline-block", textAlign: "center" }}
      >
        Begin together
      </Link>
      <p className="footer-note">
        No accounts, no timelines — just one simple doorway into each other.
      </p>
    </div>
  );
}
