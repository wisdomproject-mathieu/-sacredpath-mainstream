import type { ReactNode } from "react";
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
      </div>
    </div>
  );
}
