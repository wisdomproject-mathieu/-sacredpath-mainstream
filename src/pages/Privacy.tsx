import Layout from "../components/Layout";
import BackButton from "../components/BackButton";

export default function Privacy() {
  return (
    <Layout>
      <div className="mx-auto max-w-4xl space-y-6">
        <BackButton fallbackPath="/paywall" />
        <header className="space-y-2">
          <h1 className="font-serif text-4xl">Privacy Policy</h1>
          <p className="text-sm text-muted">Last updated: April 30, 2026</p>
        </header>

        <section className="space-y-4 text-sm leading-relaxed text-muted">
          <p>
            The Two of Us may store relationship inputs such as names, weather selections, saved rituals,
            and notes on your device to power your experience.
          </p>
          <p>
            Voice and Oracle features may call backend services to generate guided responses or audio. Secrets are kept
            server-side and are not exposed in client code.
          </p>
          <p>
            You control what you share with your partner. Share actions are user-initiated.
          </p>
          <p>
            If account/cloud features are enabled in production, App Store privacy labels must be updated to match
            actual data collection, linkage, and tracking behavior.
          </p>
        </section>
      </div>
    </Layout>
  );
}
