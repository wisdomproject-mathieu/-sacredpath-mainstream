import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import CoupleTopbar from "../components/CoupleTopbar";
import { useSession } from "../contexts/SessionContext";
import { resolveWeatherRitual } from "../lib/ritualRegistry";

const PREVIEW_PREMIUM_UNLOCKED = true;

export default function Ritual() {
  const { state } = useSession();
  const navigate = useNavigate();
  const logoSrc = `${import.meta.env.BASE_URL}sacred-path-mark.png`;

  useEffect(() => {
    if (!state.youWeather || !state.partnerWeather) navigate("/weather");
  }, [state.youWeather, state.partnerWeather, navigate]);

  if (!state.youWeather || !state.partnerWeather) return null;

  const result = resolveWeatherRitual(state.youWeather, state.partnerWeather);
  if (!result || !result.freeRitual) {
    return (
      <div className="min-h-screen bg-sp-bg text-slate-100 flex items-center justify-center">
        <p>No ritual found. Try a different combination.</p>
      </div>
    );
  }

  const { homeCard, freeRitual, premiumRituals } = result;

  return (
    <div className="min-h-screen bg-sp-bg text-slate-100 px-6 py-10">
      <div className="max-w-xl mx-auto space-y-6">
        <CoupleTopbar />
        <div className="flex justify-center">
          <img src={logoSrc} alt="Sacred Path" className="w-24 h-24 mb-2" />
        </div>

        <div className="text-xs tracking-[0.25em] uppercase text-sp-gold">{homeCard.eyebrow}</div>
        <h2 className="screen-title text-amber-100">{homeCard.title}</h2>
        <p className="screen-body">{homeCard.body}</p>

        <div className="bg-sp-card border border-slate-800 rounded-3xl p-5 space-y-3">
          <p className="text-xs uppercase tracking-wide text-sp-gold font-bold">Tonight&apos;s ritual</p>
          <h3 className="text-xl font-bold text-amber-50">{freeRitual.title}</h3>
          <p className="text-xs text-slate-400">{freeRitual.duration} · {freeRitual.intimacyLevel} · {freeRitual.primaryNeed}</p>
          <p className="text-sm text-slate-200">{freeRitual.description}</p>
          <ol className="mt-3 space-y-2 text-sm text-slate-100 list-decimal list-inside">
            {freeRitual.ritualSteps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>

        <Link to="/deeper" className="block w-full py-3 rounded-full bg-sp-gold text-black font-bold text-center">
          Go deeper tonight
        </Link>

        {premiumRituals.length > 0 && (
          <div className="space-y-3 bg-sp-card border border-slate-800 rounded-3xl p-5">
            <p className="text-xs uppercase tracking-wide text-sp-gold font-bold">
              {PREVIEW_PREMIUM_UNLOCKED ? "Premium unlocked for preview" : "Premium paths"}
            </p>
            <ul className="space-y-2 text-sm text-slate-200">
              {premiumRituals.slice(0, 3).map((r) => (
                <li key={r.id} className="flex items-center justify-between">
                  <span>{r.title}</span>
                  <span className="text-xs text-slate-500">{r.duration}</span>
                </li>
              ))}
            </ul>
            {PREVIEW_PREMIUM_UNLOCKED ? (
              <Link to="/deeper" className="block w-full py-3 rounded-full border border-sp-gold text-sp-gold font-bold text-center">
                Continue with full access
              </Link>
            ) : (
              <Link to="/paywall" className="block w-full py-3 rounded-full border border-sp-gold text-sp-gold font-bold text-center">
                Unlock more rituals
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
