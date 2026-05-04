import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import BrandHeader from "./BrandHeader";
import FloatingMusicButton from "./FloatingMusicButton";

interface LayoutProps {
  children: ReactNode;
  showHeader?: boolean;
  className?: string;
}

export default function Layout({ children, showHeader = true, className = "" }: LayoutProps) {
  return (
    <div className={`sp-page ${className}`.trim()}>
      <div
        className="sp-container"
        style={{ paddingBottom: "calc(14rem + env(safe-area-inset-bottom))" }}
      >
        {showHeader ? <BrandHeader className="mb-8" /> : null}
        <main>{children}</main>
        <FloatingMusicButton />
        <nav
          className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-[#0f0d1b]/95 px-3 pb-[calc(env(safe-area-inset-bottom)+0.6rem)] pt-2 backdrop-blur md:px-4"
          aria-label="Primary navigation"
        >
          <div className="mx-auto grid max-w-3xl grid-cols-5 gap-2 rounded-2xl border border-white/10 bg-white/5 p-2">
          {[
            { to: "/", label: "Home" },
            { to: "/rituals", label: "Rituals" },
            { to: "/oracle", label: "Oracle" },
            { to: "/journey", label: "Journey" },
            { to: "/tools", label: "Tools" },
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-xl px-3 py-2 text-center text-xs sm:text-sm transition ${
                  isActive ? "bg-accent text-[#130f08] font-semibold" : "text-muted hover:bg-white/10"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          </div>
        </nav>
      </div>
    </div>
  );
}
