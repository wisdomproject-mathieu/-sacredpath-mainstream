import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import CoupleTopbar from "../components/CoupleTopbar";
import { useSession } from "../contexts/SessionContext";
import type { IntimacyWeather } from "../lib/ritualRegistry";

const options: { key: string; id: IntimacyWeather; title: string; subtitle: string; toneClass: string; cloudyVariant?: "foggy" | "frozen" }[] = [
  { key: "stormy", id: "stormy", title: "Stormy", subtitle: "Tense, hurt, or charged with something unspoken.", toneClass: "weather-tone-stormy" },
  { key: "foggy", id: "cloudy", title: "Foggy", subtitle: "Unclear, drifting, not quite here.", toneClass: "weather-tone-foggy", cloudyVariant: "foggy" },
  { key: "frozen", id: "cloudy", title: "Frozen", subtitle: "Numb, tired, shut down in the body.", toneClass: "weather-tone-frozen", cloudyVariant: "frozen" },
  { key: "warm", id: "warm", title: "Warm", subtitle: "Soft, tender, and wanting closeness.", toneClass: "weather-tone-warm" },
  { key: "electric", id: "electric", title: "Electric", subtitle: "Crackling, drawn, awake in the body.", toneClass: "weather-tone-electric" },
  { key: "sunny", id: "radiant", title: "Sunny", subtitle: "Clear, light, easy with my partner today.", toneClass: "weather-tone-radiant" },
];

const masculineNames = new Set([
  "alex", "andrew", "antoine", "ben", "charles", "chris", "daniel", "david", "emile", "ethan",
  "felix", "gabriel", "george", "hugo", "james", "jean", "john", "joseph", "leo", "louis",
  "luc", "lucas", "marc", "mathieu", "max", "michael", "nicolas", "oliver", "pierre", "paul",
  "sam", "sebastien", "thomas", "vincent", "william",
]);

const feminineNames = new Set([
  "alice", "amelie", "ana", "anna", "bella", "camille", "charlotte", "claire", "diana", "edith",
  "edita", "elena", "emma", "eva", "gabrielle", "hannah", "isabella", "jade", "julia", "laura",
  "lea", "lina", "lucie", "maia", "maria", "marie", "maya", "mia", "nina", "olivia",
  "rose", "sara", "sophia", "victoria", "zoe",
]);

type Energy = "masculine" | "feminine" | "unknown";

function normalizeName(name: string) {
  return name.trim().toLowerCase().replace(/[^a-z]/g, "");
}

function guessEnergy(name: string): Energy {
  const n = normalizeName(name);
  if (!n) return "unknown";
  if (masculineNames.has(n)) return "masculine";
  if (feminineNames.has(n)) return "feminine";
  if (n.endsWith("a") || n.endsWith("ia") || n.endsWith("ie")) return "feminine";
  if (n.endsWith("o") || n.endsWith("an") || n.endsWith("on") || n.endsWith("el")) return "masculine";
  return "unknown";
}

export default function Weather() {
  const { state, setState } = useSession();
  const navigate = useNavigate();
  const logoSrc = `${import.meta.env.BASE_URL}sacred-path-mark.png`;
  const [manualSwap, setManualSwap] = useState(false);
  const [cloudyVariantByField, setCloudyVariantByField] = useState<{ youWeather?: "foggy" | "frozen"; partnerWeather?: "foggy" | "frozen" }>({});

  const setWeather = (field: "youWeather" | "partnerWeather", value: IntimacyWeather) => {
    setState({ ...state, [field]: value });
  };

  const canContinue = state.youWeather && state.partnerWeather;
  const youEnergy = useMemo(() => guessEnergy(state.youName), [state.youName]);
  const partnerEnergy = useMemo(() => guessEnergy(state.partnerName), [state.partnerName]);
  const inferredMasculineOnLeft = useMemo(() => {
    if (youEnergy === "masculine" && partnerEnergy === "feminine") return true;
    if (youEnergy === "feminine" && partnerEnergy === "masculine") return false;
    return true;
  }, [youEnergy, partnerEnergy]);

  useEffect(() => {
    setManualSwap(false);
  }, [state.youName, state.partnerName]);

  const isOptionActive = (
    selectedWeather: IntimacyWeather | undefined,
    field: "youWeather" | "partnerWeather",
    option: (typeof options)[number]
  ) => {
    if (selectedWeather !== option.id) return false;
    if (option.id !== "cloudy") return true;
    const variant = cloudyVariantByField[field] ?? "foggy";
    return option.cloudyVariant === variant;
  };

  const masculineOnLeft = manualSwap ? !inferredMasculineOnLeft : inferredMasculineOnLeft;
  const leftIsYou = masculineOnLeft ? youEnergy !== "feminine" : youEnergy === "feminine";
  const leftField: "youWeather" | "partnerWeather" = leftIsYou ? "youWeather" : "partnerWeather";
  const rightField: "youWeather" | "partnerWeather" = leftIsYou ? "partnerWeather" : "youWeather";

  const leftSide = {
    role: masculineOnLeft ? "Shiva" : "Shakti",
    field: leftField,
    selected: leftField === "youWeather" ? state.youWeather : state.partnerWeather,
    name: leftField === "youWeather" ? state.youName || "You" : state.partnerName || "Partner",
    sideClass: masculineOnLeft ? "weather-v2-side-masculine" : "weather-v2-side-feminine",
  };

  const rightSide = {
    role: masculineOnLeft ? "Shakti" : "Shiva",
    field: rightField,
    selected: rightField === "youWeather" ? state.youWeather : state.partnerWeather,
    name: rightField === "youWeather" ? state.youName || "You" : state.partnerName || "Partner",
    sideClass: masculineOnLeft ? "weather-v2-side-feminine" : "weather-v2-side-masculine",
  };

  const leftTop = options.slice(0, 3);
  const leftBottom = options.slice(3);
  const rightTop = options.slice(0, 3);
  const rightBottom = options.slice(3);
  const leftTopFloatClasses = ["weather-v2-float-a", "weather-v2-float-b", "weather-v2-float-c"];
  const leftBottomFloatClasses = ["weather-v2-float-d", "weather-v2-float-e", "weather-v2-float-f"];
  const rightTopFloatClasses = ["weather-v2-float-f", "weather-v2-float-e", "weather-v2-float-d"];
  const rightBottomFloatClasses = ["weather-v2-float-c", "weather-v2-float-b", "weather-v2-float-a"];

  return (
    <div className="min-h-screen bg-sp-bg text-slate-100 px-6 py-10">
      <div className="max-w-[1320px] mx-auto space-y-7">
        <CoupleTopbar showCoupleChip={false} />

        <header className="weather-v2-header">
          <h1 className="weather-v2-title">Intimacy Weather</h1>
          <p className="weather-v2-subtitle">
            Choose calmly. Sense honestly. Ask gently. Let your partner choose with respect.
          </p>
        </header>

        <section className="weather-v2-polarity">
          <div className={`weather-v2-side ${leftSide.sideClass}`}>
            <div className="weather-v2-side-head">
              <div className="weather-v2-side-pill">{leftSide.name}</div>
            </div>
            <div className="weather-v2-side-stack">
              <div className="weather-v2-card-row">
                {leftTop.map((opt, idx) => (
                  <button
                    key={`left-top-${opt.key}`}
                    onClick={() => {
                      setWeather(leftSide.field, opt.id);
                      if (opt.id === "cloudy" && opt.cloudyVariant) {
                        setCloudyVariantByField((prev) => ({ ...prev, [leftSide.field]: opt.cloudyVariant }));
                      }
                    }}
                    className={`value-card weather-v2-card weather-v2-card-left ${leftTopFloatClasses[idx]} ${opt.toneClass} ${isOptionActive(leftSide.selected, leftSide.field, opt) ? "weather-v2-card-active" : ""}`}
                  >
                    <span className="weather-v2-card-glow" />
                    <h2>{opt.title}</h2>
                    <p className="weather-v2-card-sub">{opt.subtitle}</p>
                  </button>
                ))}
              </div>
              <div className="weather-v2-side-figure weather-v2-side-figure-left" />
              <div className="weather-v2-card-row">
                {leftBottom.map((opt) => (
                  <button
                    key={`left-bottom-${opt.key}`}
                    onClick={() => {
                      setWeather(leftSide.field, opt.id);
                      if (opt.id === "cloudy" && opt.cloudyVariant) {
                        setCloudyVariantByField((prev) => ({ ...prev, [leftSide.field]: opt.cloudyVariant }));
                      }
                    }}
                    className={`value-card weather-v2-card weather-v2-card-left ${leftBottomFloatClasses[idx]} ${opt.toneClass} ${isOptionActive(leftSide.selected, leftSide.field, opt) ? "weather-v2-card-active" : ""}`}
                  >
                    <span className="weather-v2-card-glow" />
                    <h2>{opt.title}</h2>
                    <p className="weather-v2-card-sub">{opt.subtitle}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="weather-v2-center">
            <div className="home-visual-card weather-v2-center-card">
              <div className="home-visual-glow" />
              <div className="home-visual-beam" />
              <div className="home-visual-icon-area">
                <img src={logoSrc} alt="Sacred Path" className="home-shiny-icon" />
              </div>
              <div className="home-couple-panel weather-v2-center-panel">
                <p className="panel-kicker weather-center-kicker">TWO ENERGIES. ONE PATH.</p>
                <p className="panel-text">
                  USE ANCIENT WISDOM TO DISCOVER NEW DEPTH OF INTIMACY WITH YOUR BELOVED ONE
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setManualSwap((v) => !v)}
              className="weather-v2-swap-btn"
            >
              Swap Shiva ↔ Shakti
            </button>

            <button
              disabled={!canContinue}
              onClick={() => canContinue && navigate("/ritual")}
              className="w-full py-3 rounded-full bg-sp-gold text-black font-bold disabled:opacity-40 weather-continue-btn"
            >
              Show Rituals
            </button>
          </div>

          <div className={`weather-v2-side ${rightSide.sideClass}`}>
            <div className="weather-v2-side-head">
              <div className="weather-v2-side-pill">{rightSide.name}</div>
            </div>
            <div className="weather-v2-side-stack">
              <div className="weather-v2-card-row">
                {rightTop.map((opt, idx) => (
                  <button
                    key={`right-top-${opt.key}`}
                    onClick={() => {
                      setWeather(rightSide.field, opt.id);
                      if (opt.id === "cloudy" && opt.cloudyVariant) {
                        setCloudyVariantByField((prev) => ({ ...prev, [rightSide.field]: opt.cloudyVariant }));
                      }
                    }}
                    className={`value-card weather-v2-card weather-v2-card-right ${rightTopFloatClasses[idx]} ${opt.toneClass} ${isOptionActive(rightSide.selected, rightSide.field, opt) ? "weather-v2-card-active" : ""}`}
                  >
                    <span className="weather-v2-card-glow" />
                    <h2>{opt.title}</h2>
                    <p className="weather-v2-card-sub">{opt.subtitle}</p>
                  </button>
                ))}
              </div>
              <div className="weather-v2-side-figure weather-v2-side-figure-right" />
              <div className="weather-v2-card-row">
                {rightBottom.map((opt) => (
                  <button
                    key={`right-bottom-${opt.key}`}
                    onClick={() => {
                      setWeather(rightSide.field, opt.id);
                      if (opt.id === "cloudy" && opt.cloudyVariant) {
                        setCloudyVariantByField((prev) => ({ ...prev, [rightSide.field]: opt.cloudyVariant }));
                      }
                    }}
                    className={`value-card weather-v2-card weather-v2-card-right ${rightBottomFloatClasses[idx]} ${opt.toneClass} ${isOptionActive(rightSide.selected, rightSide.field, opt) ? "weather-v2-card-active" : ""}`}
                  >
                    <span className="weather-v2-card-glow" />
                    <h2>{opt.title}</h2>
                    <p className="weather-v2-card-sub">{opt.subtitle}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
