import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

export default function ConnectPage() {
  const router = useRouter();
  const [yourName, setYourName] = useState("");
  const [partnerName, setPartnerName] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (yourName) params.set("you", yourName);
    if (partnerName) params.set("partner", partnerName);
    router.push(`/weather?${params.toString()}`);
  };

  return (
    <div className="card">
      <div className="card-header">
        <span className="chip">Step 1 · Connection</span>
        <h1 className="title">Who is here tonight?</h1>
        <p className="subtitle">
          Names are optional. What matters is that the two of you arrive here together, on
          purpose.
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="field-group">
          <label className="label">You</label>
          <div className="input">
            <input
              value={yourName}
              onChange={(e) => setYourName(e.target.value)}
              placeholder="Leave blank if you prefer"
            />
          </div>
        </div>
        <div className="field-group">
          <label className="label">Partner</label>
          <div className="input">
            <input
              value={partnerName}
              onChange={(e) => setPartnerName(e.target.value)}
              placeholder="Leave blank if you prefer"
            />
          </div>
        </div>
        <button type="submit" className="primary-button">
          Continue to Intimacy Weather
        </button>
      </form>
      <p className="footer-note">Your answers stay on this device only.</p>
    </div>
  );
}
