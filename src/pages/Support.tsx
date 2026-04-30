import Layout from "../components/Layout";
import BackButton from "../components/BackButton";

export default function Support() {
  return (
    <Layout>
      <div className="mx-auto max-w-3xl space-y-6">
        <BackButton fallbackPath="/" />
        <header className="space-y-2">
          <h1 className="font-serif text-4xl">Support</h1>
          <p className="text-sm text-muted">Need help with Sacred Path for Couples?</p>
        </header>

        <section className="space-y-4 text-sm leading-relaxed text-muted">
          <p>
            For subscription issues, use “Restore purchases” on the Paywall screen first.
          </p>
          <p>
            For app support, provide: device model, iOS version, and the page where the issue happened.
          </p>
          <p>
            Recommended support contact (configure before release): support@sacredpath.app
          </p>
        </section>
      </div>
    </Layout>
  );
}
