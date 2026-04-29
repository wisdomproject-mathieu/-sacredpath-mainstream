import { useNavigate } from "react-router-dom";
import { PREMIUM_STORAGE_KEY, goToPaywall } from "../lib/premium";

interface SubscribeButtonProps {
  source: string;
  mode?: "navigate" | "purchase";
  className?: string;
  fullWidth?: boolean;
  onSubscribed?: () => void;
}

export default function SubscribeButton({
  source,
  mode = "navigate",
  className = "",
  fullWidth = true,
  onSubscribed,
}: SubscribeButtonProps) {
  const navigate = useNavigate();

  const onClick = () => {
    if (mode === "purchase") {
      // TEMPORARY DEV UNLOCK — replace with StoreKit / RevenueCat subscription purchase before production.
      if (typeof window !== "undefined") {
        window.localStorage.setItem(PREMIUM_STORAGE_KEY, "true");
      }
      onSubscribed?.();
      return;
    }
    goToPaywall(navigate, source);
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Subscribe to upgrade your intimate life"
      className={`${fullWidth ? "w-full" : ""} min-h-[58px] rounded-full bg-gradient-to-br from-[#e6b980] to-[#eacda3] px-6 py-3 font-semibold text-[#130f08] transition-opacity hover:opacity-90 ${className}`.trim()}
    >
      Subscribe to upgrade your intimate life
    </button>
  );
}
