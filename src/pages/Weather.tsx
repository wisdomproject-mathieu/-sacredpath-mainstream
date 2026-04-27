import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Button from "../components/Button";
import Card from "../components/Card";
import { useSession } from "../contexts/SessionContext";
import type { IntimacyWeather } from "../lib/ritualRegistry";
import {
  getWeatherImageUrlByTone,
  getDisplayName,
  getWeatherVisualKey,
  WEATHER_TONE_LABELS,
  type WeatherVisualKey,
} from "../lib/weatherAssets";

type WeatherRole = "shiva" | "shakti";
type WeatherField = "youWeather" | "partnerWeather";

type WeatherOption = {
  key: WeatherVisualKey;
  id: IntimacyWeather;
  title: string;
  subtitle: string;
};

const WEATHER_OPTIONS: WeatherOption[] = [
  { key: "stormy", id: "stormy", title: "Stormy", subtitle: "Heavy, tumultuous..." },
  { key: "foggy", id: "cloudy", title: "Foggy", subtitle: "Detached, confused..." },
  { key: "frozen", id: "cloudy", title: "Frozen", subtitle: "Numb, tired, shut down..." },
  { key: "warm", id: "warm", title: "Warm", subtitle: "Soft, tender..." },
  { key: "electric", id: "electric", title: "Electric", subtitle: "Crackling, awake..." },
  { key: "sunny", id: "radiant", title: "Sunny", subtitle: "Clear, light..." },
];

function WeatherPill({ 
  role, 
  option, 
  selected, 
  onClick 
}: { 
  role: WeatherRole; 
  option: WeatherOption; 
  selected: boolean; 
  onClick: () => void; 
}) {
  const image = getWeatherImageUrlByTone(role, option.key);
  
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative rounded-2xl overflow-hidden border transition-all ${selected ? "border-accent ring-2 ring-accent/30" : "border-white/10"}`}
    >
      <img src={image} alt={option.title} className="w-full aspect-[4/3] object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
      <div className="absolute inset-0 bg-black/60 p-3 flex flex-col justify-end">
        <p className="text-sm font-semibold text-text">{option.title}.</p>
        <p className="text-xs text-muted truncate">{option.subtitle}</p>
      </div>
    </button>
  );
}

function WeatherPreview({ 
  role, 
  tone, 
  displayName 
}: { 
  role: WeatherRole; 
  tone: WeatherVisualKey; 
  displayName: string 
}) {
  const image = getWeatherImageUrlByTone(role, tone);
  const title = `${WEATHER_TONE_LABELS[tone]} ${displayName}`;
  
  return (
    <Card>
      <img src={image} alt={`${tone} weather`} className="w-full aspect-[3/4] object-cover rounded-xl border border-white/5 mb-4" />
      <p className="font-serif text-xl text-center">{title}</p>
    </Card>
  );
}

export default function Weather() {
  const { state, setState } = useSession();
  const navigate = useNavigate();
  const myName = getDisplayName(state.youName, "You");
  const partnerName = getDisplayName(state.partnerName, "Partner");

  const setWeather = (field: WeatherField, value: IntimacyWeather, cloudyVariant?: "foggy" | "frozen") => {
    const toneField = field === "youWeather" ? "youWeatherTone" : "partnerWeatherTone";
    const tone = getWeatherVisualKey(value, cloudyVariant);
    setState({ ...state, [field]: value, [toneField]: tone });
  };

  const canContinue = Boolean(state.youWeather && state.partnerWeather);
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="text-center mb-10">
          <h1 className="font-serif text-4xl md:text-5xl mb-3">Your shared intimacy weather</h1>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Take a moment. Breathe. Share your current state, then welcome your partner's weather with love, respect, and curiosity.
          </p>
        </div>

        {/* Three Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px_1fr] gap-8 items-start">
          
          {/* Left Panel */}
          <aside>
            <p className="text-[11px] uppercase tracking-widest text-muted mb-4">Shiva Energy</p>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {WEATHER_OPTIONS.slice(0, 3).map((option) => (
                <WeatherPill
                  key={`top-left-${option.key}`}
                  role="shiva"
                  option={option}
                  selected={state.youWeatherTone === option.key}
                  onClick={() => setWeather("youWeather", option.id)}
                />
              ))}
            </div>
            <WeatherPreview role="shiva" tone={state.youWeatherTone ?? "stormy"} displayName={myName} />
            <div className="grid grid-cols-3 gap-3 mt-4">
              {WEATHER_OPTIONS.slice(3).map((option) => (
                <WeatherPill
                  key={`bottom-left-${option.key}`}
                  role="shiva"
                  option={option}
                  selected={state.youWeatherTone === option.key}
                  onClick={() => setWeather("youWeather", option.id)}
                />
              ))}
            </div>
          </aside>

          {/* Center Panel */}
          <section className="flex flex-col gap-4 sticky top-8">
            <button 
              type="button" 
              onClick={() => setState({ ...state, weatherSidesSwapped: !state.weatherSidesSwapped })}
              className="py-2 px-4 rounded-full bg-card border border-white/10 text-sm text-muted hover:bg-white/5 transition-colors"
            >
              Swap Shiva ↔ Shakti
            </button>

            <Card>
              <p className="text-sm text-muted leading-relaxed">
                The secret to these rituals isn't doing them perfectly. It's the intention you bring.
                If you feel rushed, pause, breathe, and reset. Intimacy is a garden—water it daily, and watch it bloom.
              </p>
            </Card>

            <Button 
              variant="glow" 
              disabled={!canContinue}
              onClick={() => canContinue && navigate("/ritual")}
            >
              SACRED RITUALS FOR COUPLED PRESENCE
            </Button>

            <Button 
              variant="secondary"
              onClick={() => navigate("/paywall")}
            >
              See premium for both of you
            </Button>
          </section>

          {/* Right Panel */}
          <aside>
            <p className="text-[11px] uppercase tracking-widest text-muted mb-4">Shakti Energy</p>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {WEATHER_OPTIONS.slice(0, 3).map((option) => (
                <WeatherPill
                  key={`top-right-${option.key}`}
                  role="shakti"
                  option={option}
                  selected={state.partnerWeatherTone === option.key}
                  onClick={() => setWeather("partnerWeather", option.id)}
                />
              ))}
            </div>
            <WeatherPreview role="shakti" tone={state.partnerWeatherTone ?? "sunny"} displayName={partnerName} />
            <div className="grid grid-cols-3 gap-3 mt-4">
              {WEATHER_OPTIONS.slice(3).map((option) => (
                <WeatherPill
                  key={`bottom-right-${option.key}`}
                  role="shakti"
                  option={option}
                  selected={state.partnerWeatherTone === option.key}
                  onClick={() => setWeather("partnerWeather", option.id)}
                />
              ))}
            </div>
          </aside>

        </div>
      </div>
    </Layout>
  );
}