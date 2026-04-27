import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "../contexts/SessionContext";
import Layout from "../components/Layout";
import Button from "../components/Button";

export default function Connect() {
  const { state, setState } = useSession();
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate("/weather");
  };

  return (
    <Layout showHeader={true}>
      <div className="max-w-md mx-auto">
        <div className="text-center mb-10">
          <p className="text-[11px] uppercase tracking-widest text-accent mb-3">Sacred Path</p>
          <h1 className="font-serif text-3xl mb-3">Connect with Partner</h1>
          <p className="text-sm text-muted">
            Names stay on this device only. They simply help the guidance feel more intimate.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-xs uppercase tracking-wide text-muted">Your name</label>
            <input
              value={state.youName || ""}
              onChange={(e) => setState({ ...state, youName: e.target.value })}
              className="w-full rounded-full bg-card border border-white/10 px-5 py-3 text-text focus:outline-none focus:border-accent transition-colors"
              placeholder="e.g. Alex"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-xs uppercase tracking-wide text-muted">Partner name</label>
            <input
              value={state.partnerName || ""}
              onChange={(e) => setState({ ...state, partnerName: e.target.value })}
              className="w-full rounded-full bg-card border border-white/10 px-5 py-3 text-text focus:outline-none focus:border-accent transition-colors"
              placeholder="e.g. Maya"
            />
          </div>
          
          <Button variant="glow" type="submit">
            Continue to intimacy weather
          </Button>
          
          <div className="text-center pt-4">
            <button 
              type="button"
              onClick={() => navigate("/weather")}
              className="text-sm text-muted hover:text-text transition-colors"
            >
              Skip names, continue as guest
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}