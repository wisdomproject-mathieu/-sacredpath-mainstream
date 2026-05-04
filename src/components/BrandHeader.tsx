import type { ReactNode } from "react";
import BrandMark from "./BrandMark";

export type BrandHeaderProps = {
  className?: string;
  variant?: "compact" | "wide";
  withNote?: boolean;
  note?: ReactNode;
};

export default function BrandHeader({
  className = "",
  variant = "compact",
  withNote = true,
  note = "Ancient wisdom for modern couples.",
}: BrandHeaderProps) {
  const variantClassName = variant === "wide" ? "sp-brand-wide" : "sp-brand-compact";

  return (
    <div className={`sp-brand ${variantClassName} ${className}`.trim()}>
      <div className="sp-brand-logo-wrap">
        <BrandMark />
      </div>

      <div>
        <div className="sp-brand-kicker">THE TWO OF US</div>
        <div className="sp-brand-title">For Couples</div>
        {withNote ? <p className="sp-brand-subtitle">{note}</p> : null}
      </div>
    </div>
  );
}
