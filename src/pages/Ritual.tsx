import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSession } from "../contexts/SessionContext";
import { resolveWeatherRitual } from "../lib/ritualRegistry";

export function Ritual() {
  const { state } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state.youWeather || !state.partnerWeather) {
      navigate("/weather");
    }
  }, [state.youWeather, state.partnerWeather, navigate]);

  if (!state.youWeather || !state.partnerWeather) return null;

  const result = resolveWeatherRitual(state.youWeather, state.partnerWeather);
  if (!result || !result.freeRitual) {
    return (
      <div className="min-h-screen bg-sp-bg text-slate-100 flex items-center justify-center">
        <p>No ritual found for this weather. Try a different combination.</p>
      </div>
    );
  }

  const { homeCard, freeRitual, premiumRituals } = result;

  return (
    <div className="min-h-screen bg-sp-bg text-slate-100 px-6 py-10">
      <div className="max-w-xl mx-auto space-y-6">
        <div className="text-xs tracking-[0.25em] uppercase text-sp-gold">
          {homeCard.eyebrow}
        </div>
        <h2 className="text-3xl font-serif text-amber-100">{homeCard.title}</h2>
        <p className="text-sm text-slate-300">{homeCard.body}</p>

        <div className="bg-sp-card border border-slate-800 rounded-3xl p-5 space-y-3">
          <p className="text-xs uppercase tracking-wide text-sp-gold">
            Tonight’s free ritual
          </p>
          <h3 className="text-xl font-serif text-amber-50">{freeRitual.title}</h3>
          <p className="text-xs text-slate-400">
            {freeRitual.duration} · {freeRitual.intimacyLevel} · {freeRitual.primaryNeed}
          </p>
          <p className="text-sm text-slate-200">{freeRitual.description}</p>
          <ol className="mt-3 space-y-2 text-sm text-slate-100 list-decimal list-inside">
            {freeRitual.ritualSteps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </div>

        {premiumRituals.length > 0 && (
          <div className="space-y-3">
            <p className="text-sm text-slate-300">
              Premium opens more ritual paths aligned with tonight’s weather, plus Sacred
              Voice guidance.
            </p>
            <ul className="space-y-2 text-sm text-slate-200">
              {premiumRituals.slice(0, 3).map((r) => (
                <li key={r.id} className="flex items-center justify-between">
                  <span>{r.title}</span>
                  <span className="text-xs text-slate-500">{r.duration}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/paywall"
              className="inline-flex justify-center w-full py-3 rounded-full bg-sp-gold text-black font-medium"
            >
              Unlock more rituals & Sacred Voice
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
