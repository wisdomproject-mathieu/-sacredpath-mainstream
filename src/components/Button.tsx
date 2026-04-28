import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "glow";
  children: ReactNode;
  className?: string;
}

export default function Button({
  variant = "primary",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "sp-button w-full outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-sp-gold/60";
  const variants = {
    primary: "sp-button-primary",
    secondary: "sp-button-secondary",
    glow: "sp-button-primary shadow-[0_0_20px_rgba(230,185,128,0.4)] hover:shadow-[0_0_30px_rgba(230,185,128,0.6)]",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`.trim()} {...props}>
      {children}
    </button>
  );
}
