import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Button from "../components/Button";
import BackButton from "../components/BackButton";

export default function Connect() {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const inviteLink = useMemo(() => {
    if (typeof window === "undefined") return "https://sacredpath.app/invite";
    return `${window.location.origin}${import.meta.env.BASE_URL}weather`;
  }, []);

  const copyInviteLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopied(true);
    } catch {
      // no-op fallback; page remains usable even if clipboard fails
    }
  };

  return (
    <Layout showHeader={true}>
      <div className="max-w-md mx-auto">
        <BackButton fallbackPath="/" />
        <div className="text-center mb-10">
          <p className="text-[11px] uppercase tracking-widest text-accent mb-3">Sacred Path</p>
          <h1 className="font-serif text-3xl mb-3">Connect your partner</h1>
          <p className="text-sm text-muted">
            One subscription unlocks the path for both of you.
          </p>
        </div>

        <div className="space-y-4">
          <Button variant="secondary" onClick={copyInviteLink}>
            Copy invite link
          </Button>
          {copied ? <p className="text-sm text-muted text-center">Invite link copied.</p> : null}
          <Button variant="glow" onClick={() => navigate("/weather")}>
            Continue as couple
          </Button>
        </div>
      </div>
    </Layout>
  );
}
