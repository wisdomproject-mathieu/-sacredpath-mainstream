import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import Button from "../components/Button";
import Card from "../components/Card";
import { useSession } from "../contexts/SessionContext";
import type { IntimacyWeather } from "../lib/ritualRegistry";
import {
  getWeatherImageUrlByTone,
  getWeatherImagePosition,
  getDisplayName,
  getWeatherVisualKey,
  WEATHER_TONE_LABELS,
  type WeatherVisualKey,
} from "../lib/weatherAssets";

type WeatherRole = "me" | "partner";
type WeatherField = "youWeather" | "partnerWeather";
type SelectionStage = "you" | "transition" | "partner";

type WeatherOption = {
  key: WeatherVisualKey;
  id: IntimacyWeather;
  title: string;
  subtitle: string;
};

const WEATHER_OPTIONS: WeatherOption[] = [
  { key: "electric", id: "electric", title: "Electric", subtitle: "Curious · playful · alive" },
  { key: "foggy", id: "foggy", title: "Foggy", subtitle: "Unsure · distant · quiet" },
  { key: "frozen", id: "frozen", title: "Frozen", subtitle: "Numb · tired · shut down" },
  { key: "warm", id: "warm", title: "Warm", subtitle: "Open · soft · close" },
  { key: "sunny", id: "sunny", title: "Hot", subtitle: "Passionate · bold · magnetic" },
  { key: "stormy", id: "stormy", title: "Stormy", subtitle: "Tense · reactive · overloaded" },
];

const WEATHER_OVERLAY_CLASS: Record<WeatherVisualKey, string> = {
  electric: "from-[#2b185f]/84 via-[#2f3f8e]/42 to-transparent",
  foggy: "from-[#313748]/84 via-[#454d5f]/36 to-transparent",
  frozen: "from-[#1d2e4b]/86 via-[#325375]/42 to-transparent",
  warm: "from-[#4d321a]/82 via-[#7a5a31]/34 to-transparent",
  sunny: "from-[#632718]/86 via-[#9b4326]/42 to-transparent",
  stormy: "from-[#1a2c4a]/88 via-[#253e67]/45 to-transparent",
};

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
      <img
        src={image}
        alt={option.title}
        className="w-full aspect-[4/3] object-cover opacity-80 group-hover:opacity-100 transition-opacity"
        style={{ objectPosition: getWeatherImagePosition(option.key) }}
      />
      <div className={`absolute inset-0 bg-gradient-to-br ${WEATHER_OVERLAY_CLASS[option.key]}`} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent p-2 sm:p-3 flex flex-col justify-end">
        <p className="text-xs sm:text-sm font-semibold text-white">{option.title}</p>
        <p className="text-[11px] sm:text-xs text-white/85">{option.subtitle}</p>
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
      <img
        src={image}
        alt={`${tone} weather`}
        className="w-full aspect-[3/4] object-cover rounded-xl border border-white/5 mb-4"
        style={{ objectPosition: getWeatherImagePosition(tone) }}
      />
      <p className="font-serif text-lg sm:text-xl text-center">{title}</p>
    </Card>
  );
}

export default function Weather() {
  const { state, setState } = useSession();
  const navigate = useNavigate();
  const myName = getDisplayName(state.youName, "You");
  const partnerName = getDisplayName(state.partnerName, "Partner");
  const [stage, setStage] = useState<SelectionStage>("you");

  useEffect(() => {
    if (stage !== "transition") return;
    const timer = window.setTimeout(() => setStage("partner"), 2000);
    return () => window.clearTimeout(timer);
  }, [stage]);

  const setWeather = (field: WeatherField, value: IntimacyWeather, cloudyVariant?: "foggy" | "frozen") => {
    const toneField = field === "youWeather" ? "youWeatherTone" : "partnerWeatherTone";
    const tone = getWeatherVisualKey(value, cloudyVariant);
    setState({ ...state, [field]: value, [toneField]: tone });
  };

  const canSenseBeloved = Boolean(state.youWeather);
  const canRevealPath = Boolean(state.partnerWeather);
  const activeRole: WeatherRole = stage === "partner" ? "partner" : "me";
  const activeName = stage === "partner" ? partnerName : myName;
  const activeTone = stage === "partner" ? (state.partnerWeatherTone ?? "sunny") : (state.youWeatherTone ?? "stormy");
  const activeField: WeatherField = stage === "partner" ? "partnerWeather" : "youWeather";

  const handleSelect = (option: WeatherOption) => {
    setWeather(
      activeField,
      option.id,
      option.key === "foggy" || option.key === "frozen" ? option.key : undefined,
    );
    if (stage === "partner") {
      navigate("/ritual");
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6 md:mb-10">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl mb-3">How We Feel Today</h1>
          <p className="text-base md:text-lg text-muted max-w-2xl mx-auto">
            Share your connection weather, then your partner can do the same. We will suggest a gentle practice for your next shared moment.
          </p>
        </div>

        {stage === "transition" ? (
          <Card className="max-w-2xl mx-auto">
            <p className="text-base md:text-lg leading-relaxed text-center text-muted">
              The secret to these rituals isn't "doing them perfectly." It’s the intention you bring.
              If you find yourself rushing, stop, take a breath, and reset.
              Connection grows in small moments. Keep it gentle, and pause anytime you need.
            </p>
          </Card>
        ) : (
          <div className="max-w-3xl mx-auto space-y-4 md:space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
              {WEATHER_OPTIONS.map((option) => (
                <WeatherPill
                  key={`${activeRole}-${option.key}`}
                  role={activeRole}
                  option={option}
                  selected={activeTone === option.key}
                  onClick={() => handleSelect(option)}
                />
              ))}
            </div>

            <WeatherPreview role={activeRole} tone={activeTone} displayName={activeName} />

            {stage === "you" ? (
              <Button variant="primary" disabled={!canSenseBeloved} onClick={() => canSenseBeloved && setStage("transition")}>
                Now sense your partner&apos;s weather
              </Button>
            ) : (
              <Button variant="primary" disabled={!canRevealPath} onClick={() => canRevealPath && navigate("/ritual")}>
                Reveal your connection practice
              </Button>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
