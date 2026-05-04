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
  withNote = false,
  note = "",
}: BrandHeaderProps) {
  const widthClassName = variant === "wide" ? "max-w-none" : "max-w-[860px]";

  return (
    <div
      className={`w-full ${widthClassName} rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(230,185,128,0.14),transparent_52%),rgba(16,14,27,0.86)] p-4 shadow-[0_12px_40px_rgba(23,36,51,0.14)] backdrop-blur sm:p-5 ${className}`.trim()}
    >
      <div className="flex items-center gap-3 sm:gap-4">
        <BrandMark />
        <div className="min-w-0">
          <p className="font-serif text-xl leading-none tracking-[0.04em] text-[#f8f3ea] sm:text-3xl">
            THE TWO OF US
          </p>
          <p className="mt-1 text-xs text-[#d5c5a4] sm:text-sm">Ancient wisdom for modern couples</p>
          {withNote && note ? <p className="mt-2 text-sm text-muted">{note}</p> : null}
        </div>
      </div>
    </div>
  );
}
