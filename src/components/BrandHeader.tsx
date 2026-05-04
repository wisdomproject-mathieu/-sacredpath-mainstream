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
  withNote = false,
  note = "",
}: BrandHeaderProps) {
  const variantClassName = variant === "wide" ? "sp-brand-wide" : "sp-brand-compact";
  const logoSrc = `${import.meta.env.BASE_URL}assets/brand/the-two-of-us-logo.jpeg`;

  return (
    <div className={`sp-brand sp-brand-image ${variantClassName} ${className}`.trim()}>
      <img src={logoSrc} alt="The Two of Us" className="sp-brand-banner" />
      {withNote && note ? <p className="sp-brand-subtitle">{note}</p> : null}
    </div>
  );
}
