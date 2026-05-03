import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import "./index.css";

import AppHome from "./pages/AppHome";
import Weather from "./pages/Weather";
import Ritual from "./pages/Ritual";
import Rituals from "./pages/Rituals";
import RitualSaved from "./pages/RitualSaved";
import Deeper from "./pages/Deeper";
import Paywall from "./pages/Paywall";
import Voice from "./pages/Voice";
import IntimacyOracle from "./pages/IntimacyOracle";
import Journey from "./pages/Journey";
import Connect from "./pages/Connect";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Support from "./pages/Support";
import Tools from "./pages/Tools";
import { SessionProvider } from "./contexts/SessionContext";
import FloatingMusicButton from "./components/FloatingMusicButton";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SessionProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <ScrollToTop />

        <Routes>
          <Route path="/" element={<AppHome />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/ritual" element={<Ritual />} />
          <Route path="/rituals" element={<Rituals />} />
          <Route path="/ritual/saved" element={<RitualSaved />} />
          <Route path="/deeper" element={<Deeper />} />
          <Route path="/paywall" element={<Paywall />} />
          <Route path="/voice" element={<Voice />} />
          <Route path="/oracle" element={<IntimacyOracle />} />
          <Route path="/intimacy-oracle" element={<IntimacyOracle />} />
          <Route path="/journey" element={<Journey />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/connect" element={<Connect />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/support" element={<Support />} />
        </Routes>

        <FloatingMusicButton />
      </BrowserRouter>
    </SessionProvider>
  </React.StrictMode>
);