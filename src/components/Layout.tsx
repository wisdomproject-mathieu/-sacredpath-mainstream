import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import BrandHeader from "./BrandHeader";

interface LayoutProps {
  children: ReactNode;
  showHeader?: boolean;
  className?: string;
}

export default function Layout({ children, showHeader = true, className = "" }: LayoutProps) {
  return (
    <div className={`sp-page ${className}`.trim()}>
      <div className="sp-container">
        {showHeader ? <BrandHeader className="mb-8" /> : null}
        <main>{children}</main>
        <nav className="mt-10 grid grid-cols-5 gap-2 rounded-2xl border border-white/10 bg-white/5 p-2">
          {[
            { to: "/", label: "Home" },
            { to: "/rituals", label: "Rituals" },
            { to: "/voice", label: "Voice" },
            { to: "/oracle", label: "Oracle" },
            { to: "/journey", label: "Journey" },
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
        </nav>
      </div>
    </div>
  );
}
