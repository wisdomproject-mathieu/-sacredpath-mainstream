import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import CoupleTopbar from "../components/CoupleTopbar";
import { useSession } from "../contexts/SessionContext";
import { resolveWeatherRitual } from "../lib/ritualRegistry";

const PREVIEW_PREMIUM_UNLOCKED = false;

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
  const firstStep = freeRitual.ritualSteps[0];
  const originTraditions = freeRitual.sourceTraditions?.slice(0, 3) ?? [];
  const originAuthors = freeRitual.sourceAuthors?.slice(0, 3) ?? [];
  const originConcepts = freeRitual.sourceConcepts?.slice(0, 4) ?? [];

  return (
    <div className="min-h-screen bg-sp-bg text-slate-100 px-6 py-10">
      <div className="max-w-xl mx-auto space-y-6">
        <CoupleTopbar />
        <div className="flex justify-center">
          <img src={logoSrc} alt="Sacred Path" className="w-24 h-24 mb-2" />
        </div>

        <div className="ritual-headline-strip">
          <div className="text-xs tracking-[0.25em] uppercase text-sp-gold">{homeCard.eyebrow}</div>
          <h2 className="screen-title text-amber-100">{homeCard.title}</h2>
          <p className="screen-body">{homeCard.body}</p>
        </div>

        <div className="ritual-main-card space-y-3">
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

        {firstStep ? (
          <div className="ritual-first-action-card space-y-2">
            <p className="text-xs uppercase tracking-wide text-sp-gold font-bold">First action</p>
            <p className="text-lg font-semibold text-amber-50">{firstStep}</p>
          </div>
        ) : null}

        <div className="ritual-origin-card">
          <p className="text-xs uppercase tracking-[0.22em] text-sp-gold font-bold">Origin of this ritual</p>
          <h3 className="mt-2 text-2xl font-bold text-amber-50">Where this practice comes from</h3>
          <p className="mt-2 text-sm text-slate-200">
            This ritual is adapted for modern couples from traditional intimacy teachings, focused on emotional safety and embodied connection.
          </p>
          {originTraditions.length > 0 ? (
            <p className="mt-3 text-sm text-slate-200">
              <strong className="text-amber-100">Traditions:</strong> {originTraditions.join(", ")}
            </p>
          ) : null}
          {originAuthors.length > 0 ? (
            <p className="mt-2 text-sm text-slate-200">
              <strong className="text-amber-100">Teachers:</strong> {originAuthors.join(", ")}
            </p>
          ) : null}
          {originConcepts.length > 0 ? (
            <p className="mt-2 text-sm text-slate-200">
              <strong className="text-amber-100">Core ideas:</strong> {originConcepts.join(", ")}
            </p>
          ) : null}
        </div>

        <Link to="/deeper" className="block w-full py-3 rounded-full bg-sp-gold text-black font-bold text-center">
          Go deeper tonight
        </Link>

        <Link to="/paywall" className="block w-full py-3 rounded-full border border-sp-gold text-sp-gold font-bold text-center">
          See premium for both of you
        </Link>

        {premiumRituals.length > 0 && (
          <div className="ritual-premium-card space-y-3">
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
                Start subscription
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
