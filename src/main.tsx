import React, { useEffect, useMemo, useState } from "react";
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
  { key: "stormy", icon: "⛈", title: "Stormy", text: "Tense, charged, unresolved.", note: "Needs grounding, repair, and truth.", tone: "tone-stormy" },
  { key: "cloudy", icon: "☁", title: "Cloudy", text: "Tender, quiet, low energy.", note: "Needs warmth, reassurance, and softness.", tone: "tone-cloudy" },
  { key: "warm", icon: "☀", title: "Warm", text: "Open, affectionate, available.", note: "Ready for closeness, touch, and heart-led intimacy.", tone: "tone-warm" },
  { key: "electric", icon: "⚡", title: "Electric", text: "Erotic, playful, alive.", note: "Ready for teasing, polarity, and spark.", tone: "tone-electric" },
  { key: "radiant", icon: "🌕", title: "Radiant", text: "Sacred, luminous, devotional.", note: "Ready for ritual, reverence, and expanded connection.", tone: "tone-radiant" },
];

const homeCards: HomeCard[] = [
  {
    id: "tantra",
    eyebrow: "Today’s doorway",
    title: "Learn tantra, tao and more",
    body: "A calmer way into the app: begin with one meaningful direction, then let weather and ritual guide the rest of the evening.",
    path: "Daily learning",
    teacher: "Sacred Path",
    linkLabel: "Explore now",
  },
  {
    id: "ritual",
    eyebrow: "Today’s ritual",
    title: "One ritual, one path",
    body: "The home screen now leads into one clear next step instead of duplicate setup prompts, so the app feels more like guidance and less like admin.",
    path: "Daily ritual",
    teacher: "Couples practice",
    linkLabel: "Open ritual",
  },
  {
    id: "wisdom",
    eyebrow: "Today’s teaching",
    title: "Lineage and learning",
    body: "Bring together sacred sexuality, relationship repair, softer pacing, polarity, and deeper presence in one more coherent first experience.",
    path: "Wisdom path",
    teacher: "Lineage",
    linkLabel: "Continue",
  },
];

const ritualMap: Record<string, RitualContent> = {
  "warm-electric": {
    title: "Breath, Gaze, and One Spoken Desire",
    subtitle: "Soft affection meets erotic spark. This ritual lets the body open slowly, then turns honesty into heat. It should feel intimate, confident, and deeply alive for both partners.",
    meta: "medium intimacy · connection + erotic attunement",
    steps: [
      "Sit facing each other and let your breath slow down together.",
      "Hold eye contact for five breaths and feel the charge build without rushing it.",
      "Each partner speaks one honest desire for tonight in simple, sensual language.",
      "Place one hand on your own heart and one on your partner’s body.",
      "End with a long embrace and choose the next touch deliberately.",
    ],
    deeperTitle: "The Art of Building Heat Without Losing Presence",
    origin: "This ritual draws from modern relational ritual, sacred sexuality practice, and the older idea that desire becomes more powerful when it is witnessed slowly instead of discharged immediately.",
    tantra: "In tantra, intimacy is not reduced to orgasm or performance. Breath, attention, devotion, and sensation matter just as much. For beginners, tantra can simply mean slowing down enough to feel the whole body, not only the genitals.",
    tao: "In Taoist sexual practice, sexual energy is often approached as life force that can be circulated, softened, and refined through breath, relaxation, and pacing. The goal is not tension for its own sake but fuller vitality through awareness.",
    retention: "Semen retention can be explored here as choice and energy management, not pressure or denial. For men, the sensual tone should be strong: stay aroused, stay present, let pleasure spread through the chest, belly, spine, and breath instead of always racing toward one finish.",
    valley: "Valley orgasm is often described as a deeper, wave-like, full-body pleasure state that can arise when arousal is sustained without rushing ejaculation. For some men, this means backing away from the edge, relaxing the pelvic floor, and letting pleasure pulse through the body rather than spike and collapse.",
  },
};

function getDailyHomeCard() {
  const today = new Date();
  const seed = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  return homeCards[hash % homeCards.length];
}

function getRitualContent(yourWeather: WeatherKey, partnerWeather: WeatherKey): RitualContent {
  const directKey = `${yourWeather}-${partnerWeather}`;
  const reverseKey = `${partnerWeather}-${yourWeather}`;
  return ritualMap[directKey] || ritualMap[reverseKey] || {
    title: "Attunement Ritual",
    subtitle: "This combination asks for presence first. Match breath, name the mood, and let desire build with patience instead of force.",
    meta: "adaptive intimacy · attunement + connection",
    steps: [
      "Sit together and take five slow breaths.",
      "Each partner names their current mood in one sentence.",
      "Choose one kind of touch that feels welcome tonight.",
      "Stay with that touch for one full minute.",
      "Ask what would feel good next instead of assuming.",
    ],
    deeperTitle: "Attunement Before Intensity",
    origin: "This ritual comes from a simple principle found in many intimacy practices: desire becomes more alive when both partners feel seen and matched.",
    tantra: "Tantra for beginners is often less about exotic technique and more about breath, attention, and whole-body awareness.",
    tao: "Taoist sexual ideas often emphasize circulation, ease, and conserving vitality rather than burning through it quickly.",
    retention: "For men, semen retention can be approached as pacing and choice. The key is not suppression but learning to stay turned on, relaxed, and connected.",
    valley: "Valley orgasm refers to a more diffuse, wave-like pleasure state that some men explore through breath, relaxation, and non-rushing arousal.",
  };
}

function displayName(value: string, fallback: string) {
  return value.trim() || fallback;
}

function useCoupleNames() {
  const [yourName, setYourName] = useState<string>(() => localStorage.getItem("sp_you_name") || "");
  const [partnerName, setPartnerName] = useState<string>(() => localStorage.getItem("sp_partner_name") || "");

  useEffect(() => { localStorage.setItem("sp_you_name", yourName); }, [yourName]);
  useEffect(() => { localStorage.setItem("sp_partner_name", partnerName); }, [partnerName]);

  return { yourName, partnerName, setYourName, setPartnerName };
}

function InlineStyles() {
  return <style>{`
    .sp-screen-topbar{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-bottom:16px}
    .sp-couple-chip{display:inline-flex;align-items:center;gap:12px;padding:10px 14px 10px 10px;border-radius:999px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);backdrop-filter:blur(18px);max-width:100%}
    .sp-couple-chip-icon{width:46px;height:46px;padding:6px;border-radius:16px;background:rgba(255,255,255,.08);border:1px solid rgba(241,212,154,.18);flex:0 0 auto}
    .sp-couple-chip-icon svg{width:100%;height:100%;display:block}
    .sp-couple-chip-copy{display:flex;align-items:center;gap:8px;min-width:0;font-weight:700;color:#f6f0ff;line-height:1;flex-wrap:wrap}
    .sp-couple-chip-sep{color:#f1d49a}
    .sp-caption-eyebrow{margin-top:14px}
    .sp-route-note{margin-top:16px;display:inline-flex;align-items:center;gap:8px;border-radius:999px;padding:10px 14px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);color:rgba(246,240,255,.82);font-weight:600}
    .sp-premium-band{margin-top:24px;padding:22px;border-radius:26px;display:flex;align-items:center;justify-content:space-between;gap:18px;background:linear-gradient(135deg,rgba(241,212,154,.14),rgba(186,160,255,.16));border:1px solid rgba(255,255,255,.12)}
    .sp-premium-band h3{margin:0;font-size:clamp(1.35rem,2.4vw,2rem);line-height:1.08}
    .sp-premium-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;margin-top:22px}
    .sp-premium-spotlight{position:relative;overflow:hidden;min-height:100%;padding:22px;border-radius:28px;border:1px solid rgba(255,255,255,.12);box-shadow:0 24px 60px rgba(0,0,0,.24)}
    .sp-premium-spotlight h3{margin:0;font-family:Georgia,"Times New Roman",serif;font-size:clamp(1.7rem,2.7vw,2.5rem);line-height:1.02}
    .sp-premium-spotlight-body{margin:12px 0 16px;color:rgba(246,240,255,.9);font-weight:600;line-height:1.55}
    .sp-premium-list{margin:0;padding-left:18px;color:rgba(246,240,255,.82);line-height:1.65}
    .sp-premium-list li+li{margin-top:8px}
    .sp-premium-spotlight.men{background:radial-gradient(circle at top right,rgba(241,212,154,.16),transparent 36%),linear-gradient(180deg,rgba(54,38,20,.96),rgba(23,17,30,.98))}
    .sp-premium-spotlight.women{background:radial-gradient(circle at top right,rgba(235,145,210,.16),transparent 36%),linear-gradient(180deg,rgba(60,25,52,.96),rgba(23,17,30,.98))}
    .sp-premium-spotlight.couple{background:radial-gradient(circle at top right,rgba(160,137,255,.18),transparent 36%),linear-gradient(180deg,rgba(28,25,64,.96),rgba(23,17,30,.98))}
    @media (max-width:900px){.sp-screen-topbar,.sp-premium-band{flex-direction:column;align-items:flex-start}.sp-premium-grid{grid-template-columns:1fr}}
    @media (max-width:560px){.sp-couple-chip-sep{display:none}.sp-route-note{flex-wrap:wrap}}
  `}</style>;
}

function Shell({ children }: { children: React.ReactNode }) {
  return <div className="app-shell"><div className="app-bg" /><div className="app-side-glow left" /><div className="app-side-glow right" /><InlineStyles />{children}</div>;
}

function SacredPathIcon() {
  return <div className="sp-couple-chip-icon" aria-hidden="true"><svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="spGold" x1="10" y1="8" x2="86" y2="88" gradientUnits="userSpaceOnUse"><stop stopColor="#f5d99c" /><stop offset="1" stopColor="#c88cff" /></linearGradient></defs><path d="M32 24C20.954 24 12 32.954 12 44C12 55.046 20.954 64 32 64C41.687 64 49.764 57.12 51.615 48H60.385C62.236 57.12 70.313 64 80 64C91.046 64 100 55.046 100 44C100 32.954 91.046 24 80 24C70.313 24 62.236 30.88 60.385 40H51.615C49.764 30.88 41.687 24 32 24Z" stroke="url(#spGold)" strokeWidth="6" strokeLinecap="round" transform="translate(-8 4)" /><circle cx="48" cy="48" r="8" fill="url(#spGold)" /></svg></div>;
}

function CoupleChip({ yourName, partnerName }: { yourName: string; partnerName: string }) {
  return <div className="sp-couple-chip"><SacredPathIcon /><div className="sp-couple-chip-copy"><span>{displayName(yourName, "Your name")}</span><span className="sp-couple-chip-sep">•</span><span>{displayName(partnerName, "Partner name")}</span></div></div>;
}

function ScreenTopbar({ backTo, backLabel }: { backTo: string; backLabel: string }) {
  const { yourName, partnerName } = useCoupleNames();
  return <div className="sp-screen-topbar"><Link to={backTo} className="back-link">{backLabel}</Link><CoupleChip yourName={yourName} partnerName={partnerName} /></div>;
}

function HomeArt({ yourName, partnerName }: { yourName: string; partnerName: string }) {
  return <div className="hero-art-card"><div className="hero-art-inner"><div className="hero-art-glow" /><div className="hero-art-beam" /><div className="hero-art-symbol hero-art-symbol-fallback">✦</div><div className="hero-art-caption"><div className="caption-card"><CoupleChip yourName={yourName} partnerName={partnerName} /><p className="eyebrow sp-caption-eyebrow">Tonight Starts Here</p><p className="caption-text">One weather. One ritual. One stronger night together.</p></div></div></div></div>;
}

function FeaturePill({ title, text }: { title: string; text: string }) {
  return <div className="feature-card compact-card"><h3>{title}</h3><p>{text}</p></div>;
}

function WeatherChoiceCard({ option, active, onClick }: { option: WeatherOption; active: boolean; onClick: () => void; }) {
  return <button type="button" className={`weather-choice-card ${option.tone} ${active ? "active" : ""}`} onClick={onClick} aria-pressed={active}><div className="weather-choice-top"><div className="weather-choice-icon" aria-hidden="true"><span>{option.icon}</span></div><div className="weather-choice-copy"><h3>{option.title}</h3><p>{option.text}</p></div></div><div className="weather-choice-note">{option.note}</div></button>;
}

function WeatherSection({ label, selectedWeather, onSelect }: { label: string; selectedWeather: WeatherKey; onSelect: (weather: WeatherKey) => void; }) {
  const selectedOption = weatherOptions.find((item) => item.key === selectedWeather);
  return <section className="weather-block"><div className="weather-block-header"><p className="weather-block-label">{label}</p><div className="weather-selected-pill"><span className="weather-selected-dot" /><span>{selectedOption?.title} selected</span></div></div><div className="weather-choice-grid">{weatherOptions.map((option) => <WeatherChoiceCard key={`${label}-${option.key}`} option={option} active={option.key === selectedWeather} onClick={() => onSelect(option.key)} />)}</div></section>;
}

function PremiumSpotlight({ tone, eyebrow, title, body, bullets }: { tone: "men" | "women" | "couple"; eyebrow: string; title: string; body: string; bullets: string[]; }) {
  return <div className={`sp-premium-spotlight ${tone}`}><p className="eyebrow">{eyebrow}</p><h3>{title}</h3><p className="sp-premium-spotlight-body">{body}</p><ul className="sp-premium-list">{bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul></div>;
}

function Home() {
  const card = useMemo(() => getDailyHomeCard(), []);
  const { yourName, partnerName, setYourName, setPartnerName } = useCoupleNames();

  return <Shell><main className="screen"><section className="hero-grid"><div className="hero-copy"><p className="eyebrow hero-brand">Sacred Path for Couples</p><h1 className="hero-title hero-title-left">Ancient wisdom for modern couples.</h1><p className="hero-body hero-body-tight stronger-copy">Men want to make love more often and last longer. Women want more softness, presence, slower touch, and a man who feels truly attuned.</p><div className="name-entry-placeholder"><p className="name-entry-title">Add your names once. They will stay visible through weather, ritual, and premium.</p><div className="name-entry-grid"><label className="field"><span>Your name</span><input value={yourName} onChange={(e) => setYourName(e.target.value)} placeholder="e.g. Mathieu" /></label><label className="field"><span>Partner name</span><input value={partnerName} onChange={(e) => setPartnerName(e.target.value)} placeholder="e.g. Edita" /></label></div></div><div className="feature-grid feature-grid-tight"><FeaturePill title="For men" text="Stay present, hold charge, last longer, and bring steadier masculine depth." /><FeaturePill title="For women" text="Receive slower touch, more safety, emotional attunement, and softer pacing." /><FeaturePill title="For the couple" text="Use weather, ritual, and deeper teachings to meet each other better." /></div><div className="cta-row hero-entry-actions"><Link to="/weather" className="btn btn-primary">Begin with tonight’s weather</Link><Link to="/paywall" className="btn btn-secondary">See premium for both of you</Link></div></div><div className="hero-visual"><HomeArt yourName={yourName} partnerName={partnerName} /></div></section><section className="panel home-insight-panel"><div className="weather-hero-head"><p className="eyebrow">{card.eyebrow}</p><h2 className="section-title section-title-left">{card.title}</h2><p className="section-body">{card.body}</p></div><div className="feature-grid premium-grid"><div className="feature-card compact-card"><h3>{card.path}</h3><p>A clearer daily doorway into practice, not just inspiration.</p></div><div className="feature-card compact-card"><h3>{card.teacher}</h3><p>Teachings shaped by sacred sexuality, polarity, repair, and presence.</p></div><div className="feature-card compact-card"><h3>{card.linkLabel}</h3><p>Move from learning into one grounded action for tonight.</p></div></div></section></main></Shell>;
}

function Weather() {
  const navigate = useNavigate();
  const { yourName, partnerName } = useCoupleNames();
  const [yourWeather, setYourWeather] = useState<WeatherKey>("warm");
  const [partnerWeather, setPartnerWeather] = useState<WeatherKey>("electric");
  const ritual = useMemo(() => getRitualContent(yourWeather, partnerWeather), [yourWeather, partnerWeather]);
  const yourWeatherTitle = weatherOptions.find((item) => item.key === yourWeather)?.title || "Warm";
  const partnerWeatherTitle = weatherOptions.find((item) => item.key === partnerWeather)?.title || "Electric";

  return <Shell><main className="screen narrow weather-remastered-screen"><ScreenTopbar backTo="/" backLabel="← Home" /><section className="panel weather-premium-panel"><div className="weather-hero-head"><p className="eyebrow">Intimacy Weather</p><h2 className="section-title section-title-left weather-main-title">Choose tonight’s chemistry.</h2><p className="section-body weather-main-body">First choose your energy. Then choose your partner’s. One combination unlocks one beautiful ritual for tonight.</p></div><div className="weather-oracle-strip"><div className="oracle-chip"><span aria-hidden="true">☀</span><span>Warmth and closeness</span></div><div className="oracle-chip"><span aria-hidden="true">⚡</span><span>Spark and polarity</span></div><div className="oracle-chip"><span aria-hidden="true">🌕</span><span>One ritual for tonight</span></div></div><WeatherSection label={`${displayName(yourName, "You")}'s weather`} selectedWeather={yourWeather} onSelect={setYourWeather} /><WeatherSection label={`${displayName(partnerName, "Partner")}'s weather`} selectedWeather={partnerWeather} onSelect={setPartnerWeather} /><div className="weather-result-band"><div><p className="weather-result-label">Tonight’s blend</p><h3>{yourWeatherTitle} + {partnerWeatherTitle}</h3><p>{ritual.subtitle}</p></div><button onClick={() => navigate("/ritual", { state: { yourWeather, partnerWeather, ritual } })} className="btn btn-primary">Reveal tonight’s ritual</button></div></section></main></Shell>;
}

function Ritual() {
  const location = useLocation();
  const { yourName, partnerName } = useCoupleNames();
  const state = location.state as { yourWeather?: WeatherKey; partnerWeather?: WeatherKey; ritual?: RitualContent; } | undefined;
  const yourWeather = state?.yourWeather ?? "warm";
  const partnerWeather = state?.partnerWeather ?? "electric";
  const ritual = state?.ritual ?? getRitualContent(yourWeather, partnerWeather);
  const yourTitle = weatherOptions.find((item) => item.key === yourWeather)?.title || "Warm";
  const partnerTitle = weatherOptions.find((item) => item.key === partnerWeather)?.title || "Electric";

  return <Shell><main className="screen narrow"><ScreenTopbar backTo="/weather" backLabel="← Back" /><section className="panel"><p className="eyebrow">Tonight Path</p><h2 className="section-title section-title-left">{yourTitle} + {partnerTitle}</h2><p className="section-body">{ritual.subtitle}</p><div className="ritual-card"><p className="eyebrow">Free Ritual Card</p><h3>{ritual.title}</h3><p className="ritual-meta">{ritual.meta}</p><ol>{ritual.steps.map((step) => <li key={step}>{step}</li>)}</ol></div><div className="sp-route-note"><span>{displayName(yourName, "You")}</span><span>•</span><span>{displayName(partnerName, "Partner")}</span></div><div className="cta-row"><Link to="/deeper" state={{ yourWeather, partnerWeather, ritual }} className="btn btn-primary">Go deeper</Link><Link to="/paywall" className="btn btn-secondary">Unlock more rituals + Sacred Voice</Link><Link to="/voice" className="btn btn-secondary">Preview Sacred Voice</Link></div></section></main></Shell>;
}

function DeeperRitual() {
  const location = useLocation();
  const { yourName, partnerName } = useCoupleNames();
  const state = location.state as { yourWeather?: WeatherKey; partnerWeather?: WeatherKey; ritual?: RitualContent; } | undefined;
  const yourWeather = state?.yourWeather ?? "warm";
  const partnerWeather = state?.partnerWeather ?? "electric";
  const ritual = state?.ritual ?? getRitualContent(yourWeather, partnerWeather);
  const yourTitle = weatherOptions.find((item) => item.key === yourWeather)?.title || "Warm";
  const partnerTitle = weatherOptions.find((item) => item.key === partnerWeather)?.title || "Electric";

  return <Shell><main className="screen narrow"><ScreenTopbar backTo="/ritual" backLabel="← Back" /><section className="panel"><p className="eyebrow">Deeper Ritual</p><h2 className="section-title section-title-left">{ritual.deeperTitle}</h2><p className="section-body">{yourTitle} + {partnerTitle} opens a slower, fuller style of intimacy: less performance, more sensation, more breath, and more conscious erotic charge.</p><div className="sp-route-note"><span>{displayName(yourName, "You")}</span><span>•</span><span>{displayName(partnerName, "Partner")}</span></div><div className="ritual-card"><p className="eyebrow">Origin</p><h3>{ritual.title}</h3><p className="ritual-meta">{ritual.origin}</p></div><div className="ritual-card"><p className="eyebrow">Beginner Tantra</p><p>{ritual.tantra}</p></div><div className="ritual-card"><p className="eyebrow">Beginner Tao</p><p>{ritual.tao}</p></div><div className="ritual-card"><p className="eyebrow">Semen Retention</p><p>{ritual.retention}</p></div><div className="ritual-card"><p className="eyebrow">Valley Orgasm</p><p>{ritual.valley}</p></div><div className="cta-row"><Link to="/ritual" state={{ yourWeather, partnerWeather, ritual }} className="btn btn-secondary">Back to ritual</Link></div></section></main></Shell>;
}

function Paywall() {
  const { yourName, partnerName } = useCoupleNames();
  return <Shell><main className="screen narrow"><ScreenTopbar backTo="/ritual" backLabel="← Back to ritual" /><section className="panel"><p className="eyebrow">Premium</p><h2 className="section-title section-title-left">Go deeper than one card.</h2><p className="section-body">This is the mainstream upgrade: one fast ritual in under 30 seconds, then a more irresistible premium path for both of you. Men get help with presence, lasting longer, and semen retention as steadier erotic energy. Women get slower touch, conscious pacing, softness, and safer intimacy.</p><div className="sp-premium-band"><div><p className="eyebrow">One subscription for both partners</p><h3>Make premium feel worth it in one glance.</h3></div><CoupleChip yourName={yourName} partnerName={partnerName} /></div><div className="sp-premium-grid"><PremiumSpotlight tone="men" eyebrow="For men" title="Hold charge. Last longer." body="Presence, pacing, breath, and semen retention as steadier erotic energy." bullets={["Stay present under arousal instead of rushing the night.","Learn a calmer way to last longer without losing spark.","Use semen retention as depth and energy management, not pressure.","Feel more pleasure in the whole body, not only at the finish line."]} /><PremiumSpotlight tone="women" eyebrow="For women" title="Slow sex that feels safer." body="Softer pacing, conscious touch, more trust, and the kind of intimacy the body can actually open to." bullets={["Receive slower touch and clearer pacing.","Build emotional safety and erotic softness together.","Turn conscious touch into real desire instead of pressure.","Let intimacy feel nourishing, warm, and deeply attuned."]} /><PremiumSpotlight tone="couple" eyebrow="For the couple" title="Richer rituals for both of you." body="Shared practices, Sacred Voice, and a stronger reason to keep coming back together." bullets={["One subscription unlocks the premium path for both partners.","Get richer rituals, deeper teachings, and guided Sacred Voice.","Move from one free card into a real intimacy system.","Keep the mainstream simplicity while upgrading the depth."]} /></div><div className="cta-row"><button className="btn btn-primary">Start subscription</button><Link to="/ritual" className="btn btn-secondary">Back to ritual</Link></div></section></main></Shell>;
}

function Voice() {
  return <Shell><main className="screen narrow"><ScreenTopbar backTo="/paywall" backLabel="← Back to premium" /><section className="panel"><p className="eyebrow">Sacred Voice</p><h2 className="section-title section-title-left">Guided ritual playback.</h2><p className="section-body">A calm spoken experience for slower breath, clearer pacing, and more connected intimacy.</p><div className="voice-player"><div><p className="voice-title">Breath, Gaze, and One Spoken Desire</p><p className="voice-subtitle">Sacred Voice preview stub</p></div><button className="btn btn-primary">Play</button></div><div className="cta-row"><Link to="/paywall" className="btn btn-secondary">Back to premium</Link></div></section></main></Shell>;
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
