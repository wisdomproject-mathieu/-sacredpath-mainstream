import Layout from "../components/Layout";
import BackButton from "../components/BackButton";

export default function Terms() {
  return (
    <Layout>
      <div className="mx-auto max-w-4xl space-y-6">
        <BackButton fallbackPath="/paywall" />
        <header className="space-y-2">
          <h1 className="font-serif text-4xl">Terms of Use</h1>
          <p className="text-sm text-muted">Last updated: April 30, 2026</p>
        </header>

        <section className="space-y-4 text-sm leading-relaxed text-muted">
          <p>
            Sacred Path for Couples provides relationship reflection tools, rituals, guided audio, and partner practices.
            It is not medical, psychiatric, legal, or crisis support.
          </p>
          <p>
            Use the app only in consensual, respectful ways. Stop any practice immediately if either partner feels
            pressured, unsafe, uncertain, or emotionally overwhelmed.
          </p>
          <p>
            Subscription terms: Sacred Path Premium is offered as an annual subscription. Payment and subscription
            management are handled by Apple through your App Store account, including renewals and cancellations.
          </p>
          <p>
            We may update these terms over time. Continued use of the app after updates means you accept the revised
            terms.
          </p>
          <p>
            For support: visit the Support page in-app or contact your support channel listed in App Store Connect.
          </p>
        </section>
      </div>
    </Layout>
  );
}
