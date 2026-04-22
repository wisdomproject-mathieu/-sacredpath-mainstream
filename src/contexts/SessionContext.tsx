import { createContext, useContext, useState, ReactNode } from "react";
import type { IntimacyWeather } from "../lib/ritualRegistry";

interface SessionState {
  youName: string;
  partnerName: string;
  youWeather?: IntimacyWeather;
  partnerWeather?: IntimacyWeather;
}

const SessionContext = createContext<{
  state: SessionState;
  setState: (s: SessionState) => void;
} | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<SessionState>({ youName: "", partnerName: "" });
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

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type SessionContextType = {
  myName: string;
  partnerName: string;
  setMyName: (value: string) => void;
  setPartnerName: (value: string) => void;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [myName, setMyName] = useState<string>(() => localStorage.getItem("sp_my_name") || "");
  const [partnerName, setPartnerName] = useState<string>(
    () => localStorage.getItem("sp_partner_name") || ""
  );

  useEffect(() => {
    localStorage.setItem("sp_my_name", myName);
  }, [myName]);

  useEffect(() => {
    localStorage.setItem("sp_partner_name", partnerName);
  }, [partnerName]);

  const value = useMemo(
    () => ({
      myName,
      partnerName,
      setMyName,
      setPartnerName,
    }),
    [myName, partnerName]
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) {
    throw new Error("useSession must be used inside SessionProvider");
  }
  return ctx;
}
