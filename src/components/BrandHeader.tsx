import type { ReactNode } from "react";

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
  const logoSrc = `${import.meta.env.BASE_URL}sacred-path-mark.png`;

  return (
    <div className={`sp-brand ${variantClassName} ${className}`.trim()}>
      <div className="sp-brand-logo-wrap">
        <img src={logoSrc} alt="Sacred Path" className="sp-brand-logo" />
      </div>

      <div>
        <div className="sp-brand-kicker">Sacred Path</div>
        <div className="sp-brand-title">For Couples</div>
        {withNote ? <p className="sp-brand-subtitle">{note}</p> : null}
      </div>
    </div>
  );
}
