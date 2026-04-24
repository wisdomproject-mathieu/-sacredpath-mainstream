import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";

import AppHome from "./pages/AppHome";
import Weather from "./pages/Weather";
import Ritual from "./pages/Ritual";
import Deeper from "./pages/Deeper";
import Paywall from "./pages/Paywall";
import { SessionProvider } from "./contexts/SessionContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SessionProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <Routes>
          <Route path="/" element={<AppHome />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/ritual" element={<Ritual />} />
          <Route path="/deeper" element={<Deeper />} />
          <Route path="/paywall" element={<Paywall />} />
        </Routes>
      </BrowserRouter>
    </SessionProvider>
  </React.StrictMode>
);
