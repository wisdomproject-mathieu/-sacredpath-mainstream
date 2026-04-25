import { createContext, useContext, useState, type ReactNode } from "react";
import type { IntimacyWeather } from "../lib/ritualRegistry";
import type { WeatherVisualKey } from "../lib/weatherAssets";

interface SessionState {
  youName: string;
  partnerName: string;
  youWeather?: IntimacyWeather;
  partnerWeather?: IntimacyWeather;
  youWeatherTone?: WeatherVisualKey;
  partnerWeatherTone?: WeatherVisualKey;
}

const SessionContext = createContext<{
  state: SessionState;
  setState: (s: SessionState) => void;
} | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<SessionState>({
    youName: "",
    partnerName: "",
  });

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
