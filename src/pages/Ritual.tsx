import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Card from "../components/Card";
import Button from "../components/Button";
import { useSession } from "../contexts/SessionContext";
import { resolveWeatherRitual } from "../lib/ritualRegistry";
import {
  WEATHER_TONE_LABELS,
  getWeatherImageUrlByTone,
  type WeatherVisualKey,
} from "../lib/weatherAssets";

function fallbackTone(weather: string | undefined): WeatherVisualKey {
  if (weather === "stormy") return "stormy";
  if (weather === "cloudy") return "foggy";
  if (weather === "warm") return "warm";
  if (weather === "electric") return "electric";
  return "sunny";
}

export default function Ritual() {
  const { state } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state.youWeather || !state.partnerWeather) navigate("/weather");
  }, [state.youWeather, state.partnerWeather, navigate]);

  if (!state.youWeather || !state.partnerWeather) return null;

  const result = resolveWeatherRitual(state.youWeather, state.partnerWeather);
  if (!result || !result.freeRitual) {
    return (
      <Layout>
        <div className="max-w-lg mx-auto text-center">
          <p className="text-muted">No ritual found. Try a different combination.</p>
          <Button variant="secondary" onClick={() => navigate("/weather")} className="mt-4">
            Back to weather selection
          </Button>
        </div>
      </Layout>
    );
  }

  const { freeRitual } = result;
  const youTone = state.youWeatherTone ?? fallbackTone(state.youWeather);
  const partnerTone = state.partnerWeatherTone ?? fallbackTone(state.partnerWeather);
  const youName = state.youName?.trim() || "You";
  const partnerName = state.partnerName?.trim() || "Partner";
  const youTitle = `${WEATHER_TONE_LABELS[youTone]} ${youName}`;
  const partnerTitle = `${WEATHER_TONE_LABELS[partnerTone]} ${partnerName}`;
  const ritualSteps = freeRitual.ritualSteps.slice(0, 3);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="text-center mb-10">
          <h1 className="font-serif text-4xl md:text-5xl mb-3">Sacred Rituals for Coupled Presence</h1>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Explore practices to cultivate deeper connection, flow, and energetic awareness.
          </p>
        </div>

        {/* Three Column Grid - Same structure as Weather for alignment */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px_1fr] gap-8 items-start">
          
          {/* Left Panel */}
          <aside>
            <Card className="aspect-[3/4] p-0 overflow-hidden">
              <img 
                src={getWeatherImageUrlByTone("shiva", youTone)} 
                alt={youTitle} 
                className="w-full h-full object-cover"
              />
            </Card>
            <div className="mt-4 text-center">
              <h2 className="font-serif text-xl">{youTitle}</h2>
            </div>
          </aside>

          {/* Center Panel */}
          <section className="flex flex-col gap-4 sticky top-8">
            <Link to="/deeper" className="w-full py-3 px-6 rounded-full bg-card border border-white/10 text-center hover:bg-white/5 transition-colors">
              Go deeper
            </Link>

            <Link to="/paywall" className="w-full py-3 px-6 rounded-full bg-gradient-to-br from-[#e6b980] to-[#eacda3] text-[#130f08] text-center font-medium hover:opacity-90 transition-opacity">
              See premium for both of you
            </Link>

            <Button variant="secondary" onClick={() => navigate("/weather")}>
              Swap Shiva ↔ Shakti
            </Button>

            <Card>
              <p className="text-[11px] uppercase tracking-widest text-accent mb-3">Straight steps</p>
              <h3 className="font-serif text-2xl mb-4">{freeRitual.title}</h3>
              
              <div className="space-y-3">
                {ritualSteps.length > 0 ? ritualSteps.map((step, index) => (
                  <div key={index} className="flex gap-3 items-start">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 text-accent text-sm flex items-center justify-center font-medium">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm leading-relaxed">{step}</p>
                  </div>
                )) : (
                  <div className="flex gap-3 items-start">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 text-accent text-sm flex items-center justify-center font-medium">01</span>
                    <p className="text-sm leading-relaxed">Begin with presence and let the body slow down together.</p>
                  </div>
                )}
              </div>
            </Card>
          </section>

          {/* Right Panel */}
          <aside>
            <Card className="aspect-[3/4] p-0 overflow-hidden">
              <img 
                src={getWeatherImageUrlByTone("shakti", partnerTone)} 
                alt={partnerTitle} 
                className="w-full h-full object-cover"
              />
            </Card>
            <div className="mt-4 text-center">
              <h2 className="font-serif text-xl">{partnerTitle}</h2>
            </div>
          </aside>

        </div>
      </div>
    </Layout>
  );
}