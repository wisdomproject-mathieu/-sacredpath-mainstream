import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import CoupleTopbar from "../components/CoupleTopbar";
import { useSession } from "../contexts/SessionContext";
import type { IntimacyWeather } from "../lib/ritualRegistry";

const options: { id: IntimacyWeather; title: string; subtitle: string; toneClass: string }[] = [
  { id: "stormy", title: "Stormy", subtitle: "Tense, hurt, or charged with something unspoken.", toneClass: "weather-tone-stormy" },
  { id: "cloudy", title: "Foggy", subtitle: "Unclear, drifting, or frozen in the body.", toneClass: "weather-tone-cloudy" },
  { id: "warm", title: "Warm", subtitle: "Soft, tender, and wanting closeness.", toneClass: "weather-tone-warm" },
  { id: "electric", title: "Electric", subtitle: "Crackling, drawn, awake in the body.", toneClass: "weather-tone-electric" },
  { id: "radiant", title: "Sunny", subtitle: "Clear, light, easy with my partner today.", toneClass: "weather-tone-radiant" },
];

const leftOrbits = [
  "weather-v2-orbit-l0",
  "weather-v2-orbit-l1",
  "weather-v2-orbit-l2",
  "weather-v2-orbit-l3",
  "weather-v2-orbit-l4",
];

const rightOrbits = [
  "weather-v2-orbit-r0",
  "weather-v2-orbit-r1",
  "weather-v2-orbit-r2",
  "weather-v2-orbit-r3",
  "weather-v2-orbit-r4",
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

  return (
    <div className="min-h-screen bg-sp-bg text-slate-100 px-6 py-10">
      <div className="max-w-[1320px] mx-auto space-y-7">
        <CoupleTopbar />

        <header className="weather-v2-header">
          <p className="weather-kicker">Intimacy weather</p>
          <h1 className="weather-v2-title">Intimacy Weather</h1>
          <p className="weather-v2-subtitle">
            Choose calmly. Sense honestly. Ask gently. Let your partner choose with respect.
          </p>
        </header>

        <section className="weather-v2-polarity">
          <div className={`weather-v2-side ${leftSide.sideClass}`}>
            <div className="weather-v2-side-head">
              <p className="weather-v2-side-kicker">{leftSide.role}</p>
              <p className="weather-v2-side-name">{leftSide.name}</p>
            </div>
            <div className="weather-v2-orbit-field">
              {options.map((opt, idx) => (
                <button
                  key={opt.id}
                  onClick={() => setWeather(leftSide.field, opt.id)}
                  className={`value-card weather-v2-card weather-v2-card-left ${opt.toneClass} ${leftOrbits[idx]} ${leftSide.selected === opt.id ? "weather-v2-card-active" : ""}`}
                >
                  <span className="weather-v2-card-glow" />
                  <h2>{opt.title}</h2>
                  <p className="weather-v2-card-sub">{opt.subtitle}</p>
                </button>
              ))}
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
                <p className="panel-kicker">Two energies. One path.</p>
                <p className="panel-text">
                  Pause. Feel. Choose your truth, then welcome your partner&apos;s weather with respect.
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
              <p className="weather-v2-side-kicker">{rightSide.role}</p>
              <p className="weather-v2-side-name">{rightSide.name}</p>
            </div>
            <div className="weather-v2-orbit-field">
              {options.map((opt, idx) => (
                <button
                  key={opt.id}
                  onClick={() => setWeather(rightSide.field, opt.id)}
                  className={`value-card weather-v2-card weather-v2-card-right ${opt.toneClass} ${rightOrbits[idx]} ${rightSide.selected === opt.id ? "weather-v2-card-active" : ""}`}
                >
                  <span className="weather-v2-card-glow" />
                  <h2>{opt.title}</h2>
                  <p className="weather-v2-card-sub">{opt.subtitle}</p>
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
