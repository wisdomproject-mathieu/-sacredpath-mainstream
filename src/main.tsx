import React, { useMemo, useState } from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./index.css";

type WeatherKey = "stormy" | "cloudy" | "warm" | "electric" | "radiant";

type WeatherOption = {
  key: WeatherKey;
  icon: string;
  title: string;
  text: string;
  note: string;
  tone: string;
};

type RitualContent = {
  title: string;
  subtitle: string;
  meta: string;
  steps: string[];
  deeperTitle: string;
  origin: string;
  tantra: string;
  tao: string;
  retention: string;
  valley: string;
};

type HomeCard = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  path: string;
  teacher: string;
  linkLabel: string;
};

const weatherOptions: WeatherOption[] = [
  {
    key: "stormy",
    icon: "⛈",
    title: "Stormy",
    text: "Tense, charged, unresolved.",
    note: "Needs grounding, repair, and truth.",
    tone: "tone-stormy",
  },
  {
    key: "cloudy",
    icon: "☁",
    title: "Cloudy",
    text: "Tender, quiet, low energy.",
    note: "Needs warmth, reassurance, and softness.",
    tone: "tone-cloudy",
  },
  {
    key: "warm",
    icon: "☀",
    title: "Warm",
    text: "Open, affectionate, available.",
    note: "Ready for closeness, touch, and heart-led intimacy.",
    tone: "tone-warm",
  },
  {
    key: "electric",
    icon: "⚡",
    title: "Electric",
    text: "Erotic, playful, alive.",
    note: "Ready for teasing, polarity, and spark.",
    tone: "tone-electric",
  },
  {
    key: "radiant",
    icon: "🌕",
    title: "Radiant",
    text: "Sacred, luminous, devotional.",
    note: "Ready for ritual, reverence, and expanded connection.",
    tone: "tone-radiant",
  },
];

const homeCards: HomeCard[] = [
  {
    id: "tantra",
    eyebrow: "Today’s doorway",
    title: "Learn tantra, tao and more",
    body:
      "A calmer way into the app: begin with one meaningful direction, then let weather and ritual guide the rest of the evening.",
    path: "Daily learning",
    teacher: "Sacred Path",
    linkLabel: "Explore now",
  },
  {
    id: "ritual",
    eyebrow: "Today’s ritual",
    title: "One ritual, one path",
    body:
      "The home screen now leads into one clear next step instead of duplicate setup prompts, so the app feels more like guidance and less like admin.",
    path: "Daily ritual",
    teacher: "Couples practice",
    linkLabel: "Open ritual",
  },
  {
    id: "wisdom",
    eyebrow: "Today’s teaching",
    title: "Lineage and learning",
    body:
      "Bring together sacred sexuality, relationship repair, softer pacing, polarity, and deeper presence in one more coherent first experience.",
    path: "Wisdom path",
    teacher: "Lineage",
    linkLabel: "Continue",
  },
];

const ritualMap: Record<string, RitualContent> = {
  "warm-electric": {
    title: "Breath, Gaze, and One Spoken Desire",
    subtitle:
      "Soft affection meets erotic spark. This ritual lets the body open slowly, then turns honesty into heat. It should feel intimate, confident, and deeply alive for both partners.",
    meta: "medium intimacy · connection + erotic attunement",
    steps: [
      "Sit facing each other and let your breath slow down together.",
      "Hold eye contact for five breaths and feel the charge build without rushing it.",
      "Each partner speaks one honest desire for tonight in simple, sensual language.",
      "Place one hand on your own heart and one on your partner’s body.",
      "End with a long embrace and choose the next touch deliberately.",
    ],
    deeperTitle: "The Art of Building Heat Without Losing Presence",
    origin:
      "This ritual draws from modern relational ritual, sacred sexuality practice, and the older idea that desire becomes more powerful when it is witnessed slowly instead of discharged immediately.",
    tantra:
      "In tantra, intimacy is not reduced to orgasm or performance. Breath, attention, devotion, and sensation matter just as much. For beginners, tantra can simply mean slowing down enough to feel the whole body, not only the genitals.",
    tao:
      "In Taoist sexual practice, sexual energy is often approached as life force that can be circulated, softened, and refined through breath, relaxation, and pacing. The goal is not tension for its own sake but fuller vitality through awareness.",
    retention:
      "Semen retention can be explored here as choice and energy management, not pressure or denial. For men, the sensual tone should be strong: stay aroused, stay present, let pleasure spread through the chest, belly, spine, and breath instead of always racing toward one finish.",
    valley:
      "Valley orgasm is often described as a deeper, wave-like, full-body pleasure state that can arise when arousal is sustained without rushing ejaculation. For some men, this means backing away from the edge, relaxing the pelvic floor, and letting pleasure pulse through the body rather than spike and collapse.",
  },
  "stormy-cloudy": {
    title: "Repair Before Touch",
    subtitle:
      "One partner is activated, the other is tender. This ritual softens the nervous system first, so closeness becomes possible without force.",
    meta: "low intensity · repair + reassurance",
    steps: [
      "Sit side by side instead of face to face.",
      "Take three long breaths while keeping one point of contact.",
      "Each partner names one thing they need to feel safe tonight.",
      "Reflect back what you heard without fixing or defending.",
      "Close with a forehead touch and one gentle thank you.",
    ],
    deeperTitle: "Safety Before Seduction",
    origin:
      "This ritual comes from the understanding that erotic connection becomes stronger when repair happens before touch. Many traditional and modern intimacy frameworks begin by regulating emotion first.",
    tantra:
      "Tantra at a beginner level includes presence, honesty, and slowing down enough to stop treating intimacy like a goal. In moments of tension, tantra begins with awareness and care.",
    tao:
      "Taoist approaches often emphasize conserving energy by not pushing when the body is closed. Soft pacing and restoration come first.",
    retention:
      "For men, retention in a ritual like this is less about control and more about refusing to use stimulation to escape discomfort. Stay open, steady, and embodied.",
    valley:
      "Valley-style pleasure is usually not the first step in a stormy moment. First create safety, then let the body rediscover pleasure naturally.",
  },
  "cloudy-warm": {
    title: "Soft Landing",
    subtitle:
      "This is comfort, tenderness, and emotional closeness. It invites the body to melt, not perform.",
    meta: "gentle intimacy · soothing + closeness",
    steps: [
      "Dim the lights and sit shoulder to shoulder.",
      "Wrap a blanket around both of you if that feels good.",
      "Share one thing that felt heavy today.",
      "Offer one minute of gentle, unhurried touch.",
      "End with a long hug and no pressure for more.",
    ],
    deeperTitle: "Tenderness as Foreplay",
    origin:
      "Many couples discover that emotional safety is not separate from desire. This ritual honors the softer doorway into intimacy.",
    tantra:
      "Tantra can begin with breath, warmth, and receptive attention. It does not need to be dramatic to be sacred.",
    tao:
      "Taoist sexual cultivation often values softness, conserving effort, and allowing arousal to grow from relaxation rather than friction alone.",
    retention:
      "For men, this can be profoundly sensual because the emphasis moves from chasing climax to inhabiting subtle pleasure and emotional contact.",
    valley:
      "Valley orgasm ideas fit here when pleasure is allowed to spread gently and continuously instead of being pushed hard and fast.",
  },
  "radiant-radiant": {
    title: "Sacred Mirror Ritual",
    subtitle:
      "Both of you are open to reverence and devotion. This ritual deepens love through stillness, praise, and slow sensual presence.",
    meta: "sacred intimacy · reverence + expansion",
    steps: [
      "Light a candle or imagine one between you.",
      "Take turns naming what you honor in the other.",
      "Place both hands together over the heart space.",
      "Sit in silence for one full minute.",
      "Seal the ritual with a kiss, bow, or embrace.",
    ],
    deeperTitle: "Reverence as Erotic Energy",
    origin:
      "Rituals of mirrored presence appear across devotional, meditative, and sacred sexuality traditions where attention itself becomes transformative.",
    tantra:
      "Tantra here means giving the moment full awareness. Sensuality becomes richer when it includes awe, not only stimulation.",
    tao:
      "Taoist teachings often support harmonious exchange, softness, and circulation of energy through the whole body rather than tension locked in one place.",
    retention:
      "For men, retention can feel less like restraint and more like refinement when arousal is allowed to become expansive, devotional, and full-bodied.",
    valley:
      "Valley orgasm language fits this atmosphere well because the pleasure is gradual, deep, and spread across the whole system.",
  },
};

function getDailyHomeCard() {
  const today = new Date();
  const seed = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return homeCards[hash % homeCards.length];
}

function getRitualContent(yourWeather: WeatherKey, partnerWeather: WeatherKey): RitualContent {
  const directKey = `${yourWeather}-${partnerWeather}`;
  const reverseKey = `${partnerWeather}-${yourWeather}`;

  return (
    ritualMap[directKey] ||
    ritualMap[reverseKey] || {
      title: "Attunement Ritual",
      subtitle:
        "This combination asks for presence first. Match breath, name the mood, and let desire build with patience instead of force.",
      meta: "adaptive intimacy · attunement + connection",
      steps: [
        "Sit together and take five slow breaths.",
        "Each partner names their current mood in one sentence.",
        "Choose one kind of touch that feels welcome tonight.",
        "Stay with that touch for one full minute.",
        "Ask what would feel good next instead of assuming.",
      ],
      deeperTitle: "Attunement Before Intensity",
      origin:
        "This ritual comes from a simple principle found in many intimacy practices: desire becomes more alive when both partners feel seen and matched.",
      tantra:
        "Tantra for beginners is often less about exotic technique and more about breath, attention, and whole-body awareness.",
      tao:
        "Taoist sexual ideas often emphasize circulation, ease, and conserving vitality rather than burning through it quickly.",
      retention:
        "For men, semen retention can be approached as pacing and choice. The key is not suppression but learning to stay turned on, relaxed, and connected.",
      valley:
        "Valley orgasm refers to a more diffuse, wave-like pleasure state that some men explore through breath, relaxation, and non-rushing arousal.",
    }
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-shell">
      <div className="app-bg" />
      <div className="app-side-glow left" />
      <div className="app-side-glow right" />
      {children}
    </div>
  );
}

function HomeArt() {
  return (
    <div className="hero-art-card">
      <div className="hero-art-inner">
        <div className="hero-art-glow" />
        <div className="hero-art-beam" />
        <div className="hero-art-symbol hero-art-symbol-fallback">✦</div>
        <div className="hero-art-caption">
          <div className="caption-card">
            <p className="eyebrow">Tonight Starts Here</p>
            <p className="caption-text">
              One weather. One ritual. One stronger night together.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeaturePill({ title, text }: { title: string; text: string }) {
  return (
    <div className="feature-card compact-card">
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

function WeatherChoiceCard({
  option,
  active,
  onClick,
}: {
  option: WeatherOption;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={`weather-choice-card ${option.tone} ${active ? "active" : ""}`}
      onClick={onClick}
      aria-pressed={active}
    >
      <div className="weather-choice-top">
        <div className="weather-choice-icon" aria-hidden="true">
          <span>{option.icon}</span>
        </div>
        <div className="weather-choice-copy">
          <h3>{option.title}</h3>
          <p>{option.text}</p>
        </div>
      </div>
      <div className="weather-choice-note">{option.note}</div>
    </button>
  );
}

function WeatherSection({
  label,
  selectedWeather,
  onSelect,
}: {
  label: string;
  selectedWeather: WeatherKey;
  onSelect: (weather: WeatherKey) => void;
}) {
  const selectedOption = weatherOptions.find((item) => item.key === selectedWeather);

  return (
    <section className="weather-block">
      <div className="weather-block-header">
        <p className="weather-block-label">{label}</p>
        <div className="weather-selected-pill">
          <span className="weather-selected-dot" />
          <span>{selectedOption?.title} selected</span>
        </div>
      </div>
      <div className="weather-choice-grid">
        {weatherOptions.map((option) => (
          <WeatherChoiceCard
            key={`${label}-${option.key}`}
            option={option}
            active={option.key === selectedWeather}
            onClick={() => onSelect(option.key)}
          />
        ))}
      </div>
    </section>
  );
}

function Home() {
  const card = useMemo(() => getDailyHomeCard(), []);

  return (
    <Shell>
      <main className="screen">
        <section className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow hero-brand">Sacred Path for Couples</p>
            <h1 className="hero-title hero-title-left">
              Ancient wisdom for modern couples.
            </h1>
            <p className="hero-body hero-body-tight stronger-copy">
              Men want to make love more often and last longer. Women want more softness,
              presence, slower touch, and a man who feels truly attuned.
            </p>

            <div className="feature-grid feature-grid-tight">
              <FeaturePill
                title="For men"
                text="Stay present, hold charge, last longer, and bring steadier masculine depth."
              />
              <FeaturePill
                title="For women"
                text="Receive slower touch, more safety, emotional attunement, and softer pacing."
              />
              <FeaturePill
                title="For the couple"
                text="Use weather, ritual, and deeper teachings to meet each other better."
              />
            </div>

            <div className="cta-row hero-entry-actions">
              <Link to="/weather" className="btn btn-primary">
                Begin with tonight’s weather
              </Link>
              <Link to="/paywall" className="btn btn-secondary">
                See premium for both of you
              </Link>
            </div>
          </div>

          <div className="hero-visual">
            <HomeArt />
          </div>
        </section>

        <section className="panel home-insight-panel">
          <div className="weather-hero-head">
            <p className="eyebrow">{card.eyebrow}</p>
            <h2 className="section-title section-title-left">{card.title}</h2>
            <p className="section-body">{card.body}</p>
          </div>

          <div className="feature-grid premium-grid">
            <div className="feature-card compact-card">
              <h3>{card.path}</h3>
              <p>A clearer daily doorway into practice, not just inspiration.</p>
            </div>
            <div className="feature-card compact-card">
              <h3>{card.teacher}</h3>
              <p>Teachings shaped by sacred sexuality, polarity, repair, and presence.</p>
            </div>
            <div className="feature-card compact-card">
              <h3>{card.linkLabel}</h3>
              <p>Move from learning into one grounded action for tonight.</p>
            </div>
          </div>
        </section>
      </main>
    </Shell>
  );
}

function Weather() {
  const navigate = useNavigate();
  const [yourWeather, setYourWeather] = useState<WeatherKey>("warm");
  const [partnerWeather, setPartnerWeather] = useState<WeatherKey>("electric");

  const ritual = useMemo(
    () => getRitualContent(yourWeather, partnerWeather),
    [yourWeather, partnerWeather]
  );

  const yourWeatherTitle =
    weatherOptions.find((item) => item.key === yourWeather)?.title || "Warm";
  const partnerWeatherTitle =
    weatherOptions.find((item) => item.key === partnerWeather)?.title || "Electric";

  return (
    <Shell>
      <main className="screen narrow weather-remastered-screen">
        <div className="back-row">
          <Link to="/" className="back-link">
            ← Home
          </Link>
        </div>

        <section className="panel weather-premium-panel">
          <div className="weather-hero-head">
            <p className="eyebrow">Intimacy Weather</p>
            <h2 className="section-title section-title-left weather-main-title">
              Choose tonight’s chemistry.
            </h2>
            <p className="section-body weather-main-body">
              First choose your energy. Then choose your partner’s. One combination
              unlocks one beautiful ritual for tonight.
            </p>
          </div>

          <div className="weather-oracle-strip">
            <div className="oracle-chip">
              <span aria-hidden="true">☀</span>
              <span>Warmth and closeness</span>
            </div>
            <div className="oracle-chip">
              <span aria-hidden="true">⚡</span>
              <span>Spark and polarity</span>
            </div>
            <div className="oracle-chip">
              <span aria-hidden="true">🌕</span>
              <span>One ritual for tonight</span>
            </div>
          </div>

          <WeatherSection
            label="Your weather"
            selectedWeather={yourWeather}
            onSelect={setYourWeather}
          />

          <WeatherSection
            label="Partner weather"
            selectedWeather={partnerWeather}
            onSelect={setPartnerWeather}
          />

          <div className="weather-result-band">
            <div>
              <p className="weather-result-label">Tonight’s blend</p>
              <h3>
                {yourWeatherTitle} + {partnerWeatherTitle}
              </h3>
              <p>{ritual.subtitle}</p>
            </div>
            <button
              onClick={() =>
                navigate("/ritual", {
                  state: {
                    yourWeather,
                    partnerWeather,
                    ritual,
                  },
                })
              }
              className="btn btn-primary"
            >
              Reveal tonight’s ritual
            </button>
          </div>
        </section>
      </main>
    </Shell>
  );
}

function Ritual() {
  const location = useLocation();
  const state = location.state as
    | {
        yourWeather?: WeatherKey;
        partnerWeather?: WeatherKey;
        ritual?: RitualContent;
      }
    | undefined;

  const yourWeather = state?.yourWeather ?? "warm";
  const partnerWeather = state?.partnerWeather ?? "electric";
  const ritual = state?.ritual ?? getRitualContent(yourWeather, partnerWeather);

  const yourTitle =
    weatherOptions.find((item) => item.key === yourWeather)?.title || "Warm";
  const partnerTitle =
    weatherOptions.find((item) => item.key === partnerWeather)?.title || "Electric";

  return (
    <Shell>
      <main className="screen narrow">
        <div className="back-row">
          <Link to="/weather" className="back-link">
            ← Back
          </Link>
        </div>

        <section className="panel">
          <p className="eyebrow">Tonight Path</p>
          <h2 className="section-title section-title-left">
            {yourTitle} + {partnerTitle}
          </h2>
          <p className="section-body">{ritual.subtitle}</p>

          <div className="ritual-card">
            <p className="eyebrow">Free Ritual Card</p>
            <h3>{ritual.title}</h3>
            <p className="ritual-meta">{ritual.meta}</p>
            <ol>
              {ritual.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>

          <div className="cta-row">
            <Link
              to="/deeper"
              state={{ yourWeather, partnerWeather, ritual }}
              className="btn btn-primary"
            >
              Go deeper
            </Link>
            <Link to="/paywall" className="btn btn-secondary">
              Unlock more rituals + Sacred Voice
            </Link>
            <Link to="/voice" className="btn btn-secondary">
              Preview Sacred Voice
            </Link>
          </div>
        </section>
      </main>
    </Shell>
  );
}

function DeeperRitual() {
  const location = useLocation();
  const state = location.state as
    | {
        yourWeather?: WeatherKey;
        partnerWeather?: WeatherKey;
        ritual?: RitualContent;
      }
    | undefined;

  const yourWeather = state?.yourWeather ?? "warm";
  const partnerWeather = state?.partnerWeather ?? "electric";
  const ritual = state?.ritual ?? getRitualContent(yourWeather, partnerWeather);

  const yourTitle =
    weatherOptions.find((item) => item.key === yourWeather)?.title || "Warm";
  const partnerTitle =
    weatherOptions.find((item) => item.key === partnerWeather)?.title || "Electric";

  return (
    <Shell>
      <main className="screen narrow">
        <div className="back-row">
          <Link
            to="/ritual"
            state={{ yourWeather, partnerWeather, ritual }}
            className="back-link"
          >
            ← Back
          </Link>
        </div>

        <section className="panel">
          <p className="eyebrow">Deeper Ritual</p>
          <h2 className="section-title section-title-left">{ritual.deeperTitle}</h2>
          <p className="section-body">
            {yourTitle} + {partnerTitle} opens a slower, fuller style of intimacy:
            less performance, more sensation, more breath, and more conscious erotic charge.
          </p>

          <div className="ritual-card">
            <p className="eyebrow">Origin</p>
            <h3>{ritual.title}</h3>
            <p className="ritual-meta">{ritual.origin}</p>
          </div>

          <div className="ritual-card">
            <p className="eyebrow">Beginner Tantra</p>
            <p>{ritual.tantra}</p>
          </div>

          <div className="ritual-card">
            <p className="eyebrow">Beginner Tao</p>
            <p>{ritual.tao}</p>
          </div>

          <div className="ritual-card">
            <p className="eyebrow">Semen Retention</p>
            <p>{ritual.retention}</p>
          </div>

          <div className="ritual-card">
            <p className="eyebrow">Valley Orgasm</p>
            <p>{ritual.valley}</p>
          </div>

          <div className="cta-row">
            <Link
              to="/ritual"
              state={{ yourWeather, partnerWeather, ritual }}
              className="btn btn-secondary"
            >
              Back to ritual
            </Link>
          </div>
        </section>
      </main>
    </Shell>
  );
}

function Paywall() {
  return (
    <Shell>
      <main className="screen narrow">
        <section className="panel">
          <p className="eyebrow">Premium</p>
          <h2 className="section-title section-title-left">Go deeper than one card.</h2>
          <p className="section-body">
            Unlock deeper support for both partners: more presence and erotic steadiness
            for men, more softness, safety, and attuned intimacy for women, plus richer
            rituals and shared practices for the couple together.
          </p>

          <div className="feature-grid premium-grid">
            <div className="feature-card compact-card">
              <h3>For men</h3>
              <p>
                Learn how to stay present, last longer, hold more charge, and bring
                steadier masculine depth into intimacy.
              </p>
            </div>

            <div className="feature-card compact-card">
              <h3>For women</h3>
              <p>
                Open into slower touch, greater safety, emotional attunement, softer
                pacing, and the kind of intimacy the body can actually trust.
              </p>
            </div>

            <div className="feature-card compact-card">
              <h3>For the couple</h3>
              <p>
                Get richer rituals, Sacred Voice, deeper teachings, and shared practices
                that help both partners meet each other better.
              </p>
            </div>
          </div>

          <div className="cta-row">
            <button className="btn btn-primary">Start subscription</button>
            <Link to="/ritual" className="btn btn-secondary">
              Back to ritual
            </Link>
          </div>
        </section>
      </main>
    </Shell>
  );
}

function Voice() {
  return (
    <Shell>
      <main className="screen narrow">
        <section className="panel">
          <p className="eyebrow">Sacred Voice</p>
          <h2 className="section-title section-title-left">Guided ritual playback.</h2>
          <p className="section-body">
            A calm spoken experience for slower breath, clearer pacing, and more
            connected intimacy.
          </p>

          <div className="voice-player">
            <div>
              <p className="voice-title">Breath, Gaze, and One Spoken Desire</p>
              <p className="voice-subtitle">Sacred Voice preview stub</p>
            </div>
            <button className="btn btn-primary">Play</button>
          </div>

          <div className="cta-row">
            <Link to="/paywall" className="btn btn-secondary">
              Back to premium
            </Link>
          </div>
        </section>
      </main>
    </Shell>
  );
}

function ConnectRedirect() {
  return <Navigate to="/weather" replace />;
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/connect" element={<ConnectRedirect />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/ritual" element={<Ritual />} />
        <Route path="/deeper" element={<DeeperRitual />} />
        <Route path="/paywall" element={<Paywall />} />
        <Route path="/voice" element={<Voice />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);