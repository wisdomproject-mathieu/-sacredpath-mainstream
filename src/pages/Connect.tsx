import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "../contexts/SessionContext";

export function Connect() {
  const { state, setState } = useSession();
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate("/weather");
  };

  return (
    <div className="min-h-screen bg-sp-bg text-slate-100 px-6 py-10">
      <div className="max-w-xl mx-auto space-y-6">
        <div className="flex justify-center">
          <img
            src="/sacred-path-mark.png"
            alt="Sacred Path symbol"
            className="w-32 h-32 mb-4"
          />
        </div>

        <h2 className="text-2xl font-serif text-amber-100">
          Connect with your beloved
        </h2>
        <p className="text-sm text-slate-300">
          Begin your shared journey to deeper intimacy. Names simply anchor
          tonight&apos;s ritual to the two of you and the weather between you.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs uppercase tracking-wide text-slate-400">
              Your name
            </label>
            <input
              value={state.youName}
              onChange={(e) => setState({ ...state, youName: e.target.value })}
              className="w-full rounded-full bg-sp-card border border-slate-700 px-4 py-2 text-sm focus:outline-none focus:border-sp-gold"
              placeholder="e.g. Alex"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs uppercase tracking-wide text-slate-400">
              Partner name
            </label>
            <input
              value={state.partnerName}
              onChange={(e) =>
                setState({ ...state, partnerName: e.target.value })
              }
              className="w-full rounded-full bg-sp-card border border-slate-700 px-4 py-2 text-sm focus:outline-none focus:border-sp-gold"
              placeholder="e.g. Maya"
            />
          </div>
          <button
            type="submit"
            className="mt-4 w-full py-3 rounded-full bg-sp-gold text-black font-medium"
          >
            Continue to intimacy weather
          </button>
        </form>
      </div>
    </div>
  );
}
