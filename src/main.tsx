import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles.css";
import { SessionProvider } from "./contexts/SessionContext";
import { Home } from "./pages/Home";
import { Connect } from "./pages/Connect";
import { Weather } from "./pages/Weather";
import { Ritual } from "./pages/Ritual";
import { Paywall } from "./pages/Paywall";
import { Voice } from "./pages/Voice";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <SessionProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/connect" element={<Connect />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/ritual" element={<Ritual />} />
          <Route path="/paywall" element={<Paywall />} />
          <Route path="/voice" element={<Voice />} />
        </Routes>
      </SessionProvider>
    </BrowserRouter>
  </React.StrictMode>
);
