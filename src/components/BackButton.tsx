import { useNavigate } from "react-router-dom";

interface BackButtonProps {
  className?: string;
  fallbackPath?: string;
}

export default function BackButton({ className = "", fallbackPath = "/" }: BackButtonProps) {
  const navigate = useNavigate();

  const onBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      navigate(-1);
      return;
    }
    navigate(fallbackPath);
  };

  return (
    <button
      type="button"
      onClick={onBack}
      className={`inline-flex min-h-[44px] items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-2.5 font-semibold text-text transition hover:bg-white/10 ${className}`.trim()}
    >
      Back
    </button>
  );
}

