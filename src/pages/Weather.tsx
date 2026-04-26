import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "../contexts/SessionContext";
import type { IntimacyWeather } from "../lib/ritualRegistry";
import {
  WEATHER_TONE_COPY,
  WEATHER_TONE_LABELS,
  getWeatherImageUrlByTone,
  getWeatherVisualKey,
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

function panelTitle(role: WeatherRole, tone: WeatherVisualKey) {
  if (role === "shiva") return `${WEATHER_TONE_LABELS[tone]} Shiva`;
  return "Partner Shakti";
}

function panelStrip(role: WeatherRole, tone: WeatherVisualKey) {
  if (role === "shiva") return `${WEATHER_TONE_LABELS[tone]} for Shiva`;
  return `${WEATHER_TONE_LABELS[tone]} for Shakti`;
}

function panelSubtitle(role: WeatherRole, tone: WeatherVisualKey) {
  if (role === "shiva") return WEATHER_TONE_COPY[tone];
  return WEATHER_TONE_COPY[tone];
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
        <span className="weather-ref-select-chip">SELECT</span>
      </span>
    </button>
  );
}

function WeatherPreviewCard({
  role,
  tone,
  title,
  subtitle,
}: {
  role: WeatherRole;
  tone: WeatherVisualKey;
  title: string;
  subtitle: string;
}) {
  const image = getWeatherImageUrlByTone(role, tone);

  return (
    <div className={`weather-ref-preview-card ${role === "shiva" ? "weather-ref-preview-shiva" : "weather-ref-preview-shakti"}`}>
      <div className="weather-ref-preview-media">
        <img src={image} alt={title} />
        <div className="weather-ref-preview-strip">{panelStrip(role, tone)}</div>
      </div>
      <div className="weather-ref-preview-copy">
        <h3>{title}</h3>
        <p>{subtitle}</p>
        <button type="button" className="weather-ref-preview-select">SELECT</button>
      </div>
    </div>
  );
}

function WeatherPanel({
  role,
  label,
  selectedWeather,
  selectedTone,
  onSelect,
}: {
  role: WeatherRole;
  label: string;
  selectedWeather: IntimacyWeather | undefined;
  selectedTone: WeatherVisualKey;
  onSelect: (option: WeatherOption) => void;
}) {
  const previewTitle = panelTitle(role, selectedTone);
  const previewSubtitle = panelSubtitle(role, selectedTone);

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

      <WeatherPreviewCard role={role} tone={selectedTone} title={previewTitle} subtitle={previewSubtitle} />

      <div className="weather-ref-preview-meta">
        <div className="weather-ref-preview-heading">{previewTitle}</div>
        <p className="weather-ref-preview-text">{previewSubtitle}</p>
        <button
          type="button"
          className={`weather-ref-preview-select weather-ref-preview-select-wide ${selectedWeather ? "" : "is-disabled"}`}
          disabled={!selectedWeather}
          onClick={() => selectedWeather && onSelect(WEATHER_OPTIONS.find((option) => option.key === selectedTone) ?? WEATHER_OPTIONS[5])}
        >
          SELECT
        </button>
      </div>

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
  const logoSrc = `${import.meta.env.BASE_URL}shiva-shakti-icon.png`;

  const setWeather = (field: WeatherField, value: IntimacyWeather, cloudyVariant?: "foggy" | "frozen") => {
    const toneField = field === "youWeather" ? "youWeatherTone" : "partnerWeatherTone";
    const tone = getWeatherVisualKey(value, cloudyVariant);
    setState({ ...state, [field]: value, [toneField]: tone });
  };

  const swapWeather = () => {
    setState({
      ...state,
      youWeather: state.partnerWeather,
      partnerWeather: state.youWeather,
      youWeatherTone: state.partnerWeatherTone,
      partnerWeatherTone: state.youWeatherTone,
    });
  };

  const canContinue = Boolean(state.youWeather && state.partnerWeather);
  const leftTone = toneForWeather(state.youWeather, state.youWeatherTone);
  const rightTone = toneForWeather(state.partnerWeather, state.partnerWeatherTone);

  return (
    <div className="weather-ref-page">
      <div className="weather-ref-shell">
        <div className="weather-ref-topbar">
          <div className="weather-ref-brand-card">
            <div className="weather-ref-brand-mark">
              <img src={logoSrc} alt="Sacred Path" />
            </div>
            <div className="weather-ref-brand-copy">
              <div className="weather-ref-brand-kicker">SACRED PATH</div>
              <div className="weather-ref-brand-title">for Couples</div>
            </div>
            <div className="weather-ref-brand-note">Ancient wisdom for modern love.</div>
          </div>

          <div className="weather-ref-heading">
            <h1>Your shared intimacy weather</h1>
            <p>
              Take a moment. Breathe. Share your current state and welcome your partner&apos;s weather with love and respect.
            </p>
          </div>
        </div>

        <section className="weather-ref-grid">
          <WeatherPanel
            role="shiva"
            label="You"
            selectedWeather={state.youWeather}
            selectedTone={leftTone}
            onSelect={(option) => setWeather("youWeather", option.id, option.cloudyVariant)}
          />

          <div className="weather-ref-center">
            <button type="button" onClick={swapWeather} className="weather-ref-swap-pill">
              Swap Shiva ↔ Shakti
            </button>

            <div className="weather-ref-guidance-card">
              <h2>
                TWO ENERGIES.
                <br />
                ONE PATH.
              </h2>
              <ol>
                <li>Pause. Feel. Choose your truth.</li>
                <li>Then welcome your partner&apos;s weather with love and respect.</li>
              </ol>
            </div>

            <div className="weather-ref-sacred-block">SACRED RITUALS FOR COUPLED PRESENCE</div>

            <button type="button" disabled={!canContinue} onClick={() => canContinue && navigate("/ritual")} className="weather-ref-primary-btn">
              Go to Sacred Rituals
            </button>

            <button type="button" onClick={() => navigate("/paywall")} className="weather-ref-secondary-btn">
              Explore premium features
            </button>
          </div>

          <WeatherPanel
            role="shakti"
            label="Partner"
            selectedWeather={state.partnerWeather}
            selectedTone={rightTone}
            onSelect={(option) => setWeather("partnerWeather", option.id, option.cloudyVariant)}
          />
        </section>
      </div>
    </div>
  );
}
