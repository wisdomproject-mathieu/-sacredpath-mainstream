import { useRouter } from "next/router";
import { WEATHER_OPTIONS } from "../lib/weather";
import type { Weather } from "../lib/rituals";
import { useState } from "react";

export default function WeatherPage() {
  const router = useRouter();
  const { you, partner } = router.query;
  const [yourWeather, setYourWeather] = useState<Weather | null>(null);
  const [partnerWeather, setPartnerWeather] = useState<Weather | null>(null);

  const handleContinue = () => {
    if (!yourWeather || !partnerWeather) return;
    const params = new URLSearchParams();
    params.set("yw", yourWeather);
    params.set("pw", partnerWeather);
    if (typeof you === "string") params.set("you", you);
    if (typeof partner === "string") params.set("partner", partner);
    router.push(`/ritual?${params.toString()}`);
  };

  return (
    <div className="card">
      <div className="card-header">
        <span className="chip">Step 2 · Intimacy Weather</span>
        <h1 className="title">How does tonight feel?</h1>
        <p className="subtitle">
          Each of you choose your inner weather. No explanations. Just a tiny truth about how
          you arrive.
        </p>
      </div>
      <div className="field-group">
        <div className="label">You</div>
        <div className="weather-pills-row">
          {WEATHER_OPTIONS.map((w) => (
            <button
              type="button"
              key={w.id}
              className={`weather-pill ${yourWeather === w.id ? "selected" : ""}`}
              onClick={() => setYourWeather(w.id)}
            >
              {w.label}
            </button>
          ))}
        </div>
      </div>
      <div className="field-group">
        <div className="label">Partner</div>
        <div className="weather-pills-row">
          {WEATHER_OPTIONS.map((w) => (
            <button
              type="button"
              key={w.id}
              className={`weather-pill ${partnerWeather === w.id ? "selected" : ""}`}
              onClick={() => setPartnerWeather(w.id)}
            >
              {w.label}
            </button>
          ))}
        </div>
      </div>
      <button
        type="button"
        className="primary-button"
        disabled={!yourWeather || !partnerWeather}
        onClick={handleContinue}
      >
        Reveal tonight&apos;s ritual
      </button>
      <p className="footer-note">
        Weather pairing never labels either of you — it simply chooses one gentle doorway.
      </p>
    </div>
  );
}
