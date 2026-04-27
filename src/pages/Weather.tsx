import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CoupleTopbar from "../components/CoupleTopbar";
import { useSession } from "../contexts/SessionContext";
import type { IntimacyWeather } from "../lib/ritualRegistry";
import {
  getWeatherImageUrlByTone,
  getDisplayName,
  getWeatherForTitle,
  getWeatherVisualKey,
  getWeatherTitle,
  type WeatherVisualKey,
} from "../lib/weatherAssets";

type WeatherRole = "shiva" | "shakti";
type WeatherField = "youWeather" | "partnerWeather";

type WeatherOption = {
  key: WeatherVisualKey;
  id: IntimacyWeather;
  title: string;
  subtitle: string;
  toneClass: string;
  cloudyVariant?: "foggy" | "frozen";
};

const WEATHER_OPTIONS: WeatherOption[] = [
  { key: "stormy", id: "stormy", title: "Stormy", subtitle: "Heavy, tumultuous...", toneClass: "weather-ref-stormy" },
  { key: "foggy", id: "cloudy", title: "Foggy", subtitle: "Detached, confused...", toneClass: "weather-ref-foggy", cloudyVariant: "foggy" },
  { key: "frozen", id: "cloudy", title: "Frozen", subtitle: "Numb, tired, shut down...", toneClass: "weather-ref-frozen", cloudyVariant: "frozen" },
  { key: "warm", id: "warm", title: "Warm", subtitle: "Soft, tender...", toneClass: "weather-ref-warm" },
  { key: "electric", id: "electric", title: "Electric", subtitle: "Crackling, awake...", toneClass: "weather-ref-electric" },
  { key: "sunny", id: "radiant", title: "Sunny", subtitle: "Clear, light...", toneClass: "weather-ref-sunny" },
];

const TOP_OPTIONS = WEATHER_OPTIONS.slice(0, 3);
const BOTTOM_OPTIONS = WEATHER_OPTIONS.slice(3);

function toneForWeather(weather: IntimacyWeather | undefined, explicitTone?: WeatherVisualKey): WeatherVisualKey {
  if (explicitTone) return explicitTone;
  return getWeatherVisualKey(weather);
}

function WeatherOptionCard({
  role,
  option,
  selected,
  onClick,
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
      aria-pressed={selected}
      onClick={onClick}
      className={`weather-ref-option-card ${option.toneClass} ${selected ? "is-selected" : ""}`}
    >
      <span className="weather-ref-option-art" style={{ backgroundImage: `url(${image})` }} aria-hidden="true" />
      <span className="weather-ref-option-overlay" aria-hidden="true" />
      <span className="weather-ref-option-content">
        <span className="weather-ref-option-title">{option.title}.</span>
        <span className="weather-ref-option-subtitle">{option.subtitle}</span>
        <span className="weather-ref-select-chip">Select</span>
      </span>
    </button>
  );
}

function WeatherPreviewCard({
  role,
  tone,
  displayName,
}: {
  role: WeatherRole;
  tone: WeatherVisualKey;
  displayName: string;
}) {
  const image = getWeatherImageUrlByTone(role, tone);
  const title = getWeatherForTitle(tone, displayName);

  return (
    <div className={`weather-ref-preview-card ${role === "shiva" ? "weather-ref-preview-shiva" : "weather-ref-preview-shakti"}`}>
      <div className="weather-ref-preview-media">
        <img src={image} alt={`${tone} weather`} />
        <div className="weather-ref-preview-badge">{title}</div>
      </div>
    </div>
  );
}

function WeatherPanel({
  role,
  label,
  selectedTone,
  displayName,
  onSelect,
}: {
  role: WeatherRole;
  label: string;
  selectedTone: WeatherVisualKey;
  displayName: string;
  onSelect: (option: WeatherOption) => void;
}) {
  return (
    <aside className={`weather-ref-panel ${role === "shiva" ? "weather-ref-panel-shiva" : "weather-ref-panel-shakti"}`}>
      <p className="weather-ref-side-label">{label}</p>

      <div className="weather-ref-option-row">
        {TOP_OPTIONS.map((option) => (
          <WeatherOptionCard
            key={`top-${role}-${option.key}`}
            role={role}
            option={option}
            selected={selectedTone === option.key}
            onClick={() => onSelect(option)}
          />
        ))}
      </div>

      <WeatherPreviewCard role={role} tone={selectedTone} displayName={displayName} />

      <div className="weather-ref-option-row">
        {BOTTOM_OPTIONS.map((option) => (
          <WeatherOptionCard
            key={`bottom-${role}-${option.key}`}
            role={role}
            option={option}
            selected={selectedTone === option.key}
            onClick={() => onSelect(option)}
          />
        ))}
      </div>
    </aside>
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

  const swapWeather = () => {
    setState({
      ...state,
      weatherSidesSwapped: !state.weatherSidesSwapped,
    });
  };

  const canContinue = Boolean(state.youWeather && state.partnerWeather);
  const leftTone = toneForWeather(state.youWeather, state.youWeatherTone);
  const rightTone = toneForWeather(state.partnerWeather, state.partnerWeatherTone);
  const leftIsShakti = Boolean(state.weatherSidesSwapped);
  const leftRole: WeatherRole = leftIsShakti ? "shakti" : "shiva";
  const rightRole: WeatherRole = leftIsShakti ? "shiva" : "shakti";
  const leftDisplayName = leftIsShakti ? partnerName : myName;
  const rightDisplayName = leftIsShakti ? myName : partnerName;
  const leftSelectedTone = leftIsShakti ? rightTone : leftTone;
  const rightSelectedTone = leftIsShakti ? leftTone : rightTone;
  const leftSelectedWeather = leftIsShakti ? state.partnerWeather : state.youWeather;
  const rightSelectedWeather = leftIsShakti ? state.youWeather : state.partnerWeather;
  const leftPanelTitle = getWeatherTitle(leftSelectedTone, leftDisplayName);
  const rightPanelTitle = getWeatherTitle(rightSelectedTone, rightDisplayName);

  return (
    <div className="weather-ref-page">
      <div className="weather-ref-shell">
        <div className="weather-ref-topbar">
          <CoupleTopbar />

          <div className="weather-ref-heading">
            <h1>Your shared intimacy weather</h1>
            <p>
              Take a moment. Breathe. Share your current state, then welcome your partner&apos;s weather with love, respect, and curiosity.
            </p>
          </div>
        </div>

        <section className="weather-ref-grid">
          <WeatherPanel
            role={leftRole}
            label={leftDisplayName}
            selectedTone={leftSelectedTone}
            displayName={leftDisplayName}
            onSelect={(option) => setWeather(leftIsShakti ? "partnerWeather" : "youWeather", option.id, option.cloudyVariant)}
          />

          <div className="weather-ref-center">
            <button type="button" onClick={swapWeather} className="weather-ref-swap-pill">
              Swap Shiva ↔ Shakti
            </button>

            <button
              type="button"
              disabled={!canContinue}
              onClick={() => canContinue && navigate("/ritual")}
              className="weather-ref-sacred-button"
            >
              <span>SACRED RITUALS FOR COUPLED PRESENCE</span>
            </button>

            <div className="weather-ref-guidance-card weather-ref-ritual-note">
              <p>
                The secret to these rituals isn&apos;t &quot;doing them perfectly.&quot; It&apos;s the intention you bring.
                If you find yourself rushing, stop, take a breath, and reset. Intimacy is a garden—water it daily,
                and watch it bloom.
              </p>
            </div>

            <button type="button" onClick={() => navigate("/paywall")} className="weather-ref-premium-button">
              <span>See premium for both of you</span>
            </button>
          </div>

          <WeatherPanel
            role={rightRole}
            label={rightDisplayName}
            selectedTone={rightSelectedTone}
            displayName={rightDisplayName}
            onSelect={(option) => setWeather(leftIsShakti ? "youWeather" : "partnerWeather", option.id, option.cloudyVariant)}
          />
        </section>
      </div>
    </div>
  );
}
