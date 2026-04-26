import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { IntimacyWeather } from "../lib/ritualRegistry";
import type { WeatherVisualKey } from "../lib/weatherAssets";

interface SavedRitualSession {
  completedAt: string;
  elapsedSeconds: number;
}

interface SessionState {
  youName: string;
  partnerName: string;
  youWeather?: IntimacyWeather;
  partnerWeather?: IntimacyWeather;
  youWeatherTone?: WeatherVisualKey;
  partnerWeatherTone?: WeatherVisualKey;
  weatherSidesSwapped?: boolean;
  savedRitual?: SavedRitualSession;
}

const SessionContext = createContext<{
  state: SessionState;
  setState: (s: SessionState) => void;
} | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<SessionState>(() => {
    if (typeof window === "undefined") {
      return { youName: "", partnerName: "" };
    }

    try {
      const raw = window.localStorage.getItem("sacredpath-session");
      if (!raw) return { youName: "", partnerName: "" };
      const parsed = JSON.parse(raw) as SessionState;
      return {
        youName: parsed.youName ?? "",
        partnerName: parsed.partnerName ?? "",
        youWeather: parsed.youWeather,
        partnerWeather: parsed.partnerWeather,
        youWeatherTone: parsed.youWeatherTone,
        partnerWeatherTone: parsed.partnerWeatherTone,
        weatherSidesSwapped: parsed.weatherSidesSwapped,
        savedRitual: parsed.savedRitual,
      };
    } catch {
      return { youName: "", partnerName: "" };
    }
  });

  useEffect(() => {
    window.localStorage.setItem("sacredpath-session", JSON.stringify(state));
  }, [state]);

  return (
    <SessionContext.Provider value={{ state, setState }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession must be used inside SessionProvider");
  return ctx;
}
