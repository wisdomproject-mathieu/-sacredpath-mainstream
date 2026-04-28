import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "glow" | "secondary";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
}

const variantClass: Record<ButtonVariant, string> = {
  glow:
    "bg-gradient-to-br from-[#e6b980] to-[#eacda3] text-[#130f08] border border-transparent hover:opacity-90",
  secondary:
    "bg-card text-text border border-white/15 hover:bg-white/5",
};

export default function Button({
  children,
  variant = "secondary",
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled}
      className={`inline-flex items-center justify-center rounded-full px-6 py-3 font-medium transition-all disabled:cursor-not-allowed disabled:opacity-50 ${variantClass[variant]} ${className}`.trim()}
    >
      {children}
    </button>
  );
}

