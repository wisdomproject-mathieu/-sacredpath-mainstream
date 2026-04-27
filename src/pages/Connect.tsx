import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "../contexts/SessionContext";
import Layout from "../components/Layout";
import Card from "../components/Card";
import Button from "../components/Button";

export default function Connect() {
  const { state, setState } = useSession();
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate("/weather");
  };

  return (
    <Layout>
      <div className="mx-auto max-w-xl space-y-6">
        <h2 className="font-display text-4xl text-amber-100">Connect with Partner</h2>
        <p className="text-sm leading-7 text-slate-300">
          Names stay on this device only. They simply help the guidance feel more intimate.
        </p>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="sp-eyebrow block text-xs tracking-[0.2em] text-slate-400">
                Your name
              </label>
              <input
                value={state.youName}
                onChange={(e) => setState({ ...state, youName: e.target.value })}
                className="sp-input min-h-[58px] rounded-[20px] text-sm normal-case"
                placeholder="e.g. Alex"
              />
            </div>
            <div className="space-y-2">
              <label className="sp-eyebrow block text-xs tracking-[0.2em] text-slate-400">
                Partner name
              </label>
              <input
                value={state.partnerName}
                onChange={(e) => setState({ ...state, partnerName: e.target.value })}
                className="sp-input min-h-[58px] rounded-[20px] text-sm normal-case"
                placeholder="e.g. Maya"
              />
            </div>
            <Button type="submit">Continue to intimacy weather</Button>
          </form>
        </Card>
      </div>
    </Layout>
  );
}
