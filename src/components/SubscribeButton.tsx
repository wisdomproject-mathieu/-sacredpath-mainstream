import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { goToPaywall } from "../lib/premium";
import { purchasePremium } from "../lib/entitlements";

interface SubscribeButtonProps {
  source: string;
  mode?: "navigate" | "purchase";
  className?: string;
  fullWidth?: boolean;
  onSubscribed?: () => void;
  disabled?: boolean;
}

export default function SubscribeButton({
  source,
  mode = "navigate",
  className = "",
  fullWidth = true,
  onSubscribed,
  disabled = false,
}: SubscribeButtonProps) {
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);

  const onClick = async () => {
    if (mode === "purchase") {
      if (onSubscribed) {
        onSubscribed();
        return;
      }
      if (busy || disabled) return;
      setBusy(true);
      try {
        const result = await purchasePremium();
        if (result.ok) onSubscribed?.();
      } finally {
        setBusy(false);
      }
      return;
    }
    goToPaywall(navigate, source);
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={busy || disabled}
      aria-label="Subscribe to upgrade your intimate life"
      className={`${fullWidth ? "w-full" : ""} min-h-[58px] rounded-full bg-gradient-to-br from-[#e6b980] to-[#eacda3] px-6 py-3 font-semibold text-[#130f08] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70 ${className}`.trim()}
    >
      {busy || disabled ? "Processing..." : "Subscribe to upgrade your intimate life"}
    </button>
  );
}
