import { Link, useLocation } from "react-router-dom";
import Layout from "../components/Layout";
import Card from "../components/Card";
import Button from "../components/Button";

export default function Voice() {
  const location = useLocation();
  const title = (location.state as { title?: string } | null)?.title ?? "Sacred Voice";

  return (
    <Layout>
      <div className="mx-auto max-w-md">
        <Card className="space-y-4 text-center">
          <p className="sp-eyebrow">Sacred Voice Preview</p>
          <h2 className="font-display text-4xl text-amber-100">{title}</h2>
          <p className="text-sm leading-7 text-slate-300">
            This is a stub for your guided audio experience. Connect this screen to your
            existing Sacred Voice / TTS pipeline or uploaded audio tracks.
          </p>
          <Button variant="glow">▶︎ Play sample (stub)</Button>
          <p className="text-xs leading-6 text-slate-500">
            In production, this button would stream a Sacred Voice session for the
            selected ritual.
          </p>
          <Link to="/ritual" className="block text-xs text-slate-400 underline">
            Back to tonight&apos;s ritual
          </Link>
        </Card>
      </div>
    </Layout>
  );
}
