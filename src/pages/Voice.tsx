import { useLocation } from "react-router-dom";
import Layout from "../components/Layout";
import Button from "../components/Button";
import Card from "../components/Card";
import { Link } from "react-router-dom";

export default function Voice() {
  const location = useLocation();
  const title = (location.state as { title?: string } | null)?.title ?? "Sacred Voice";

  return (
    <Layout>
      <div className="max-w-md mx-auto">
        <Card>
          <p className="text-[11px] uppercase tracking-widest text-accent text-center mb-4">Sacred Voice Preview</p>
          <h2 className="font-serif text-2xl text-center mb-4">{title}</h2>
          <p className="text-sm text-muted text-center mb-6">
            This is a stub for your guided audio experience. Connect this screen to your existing Sacred Voice pipeline.
          </p>
          <Button variant="primary">▶︎ Play sample (stub)</Button>
          <p className="text-xs text-muted text-center mt-3">
            In production, this would stream a Sacred Voice session for the selected ritual.
          </p>
          <div className="text-center mt-6">
            <Link to="/ritual" className="text-sm text-muted underline">Back to tonight's ritual</Link>
          </div>
        </Card>
      </div>
    </Layout>
  );
}