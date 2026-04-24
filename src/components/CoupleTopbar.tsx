import { useSession } from "../contexts/SessionContext";

export default function CoupleTopbar() {
  const { state } = useSession();
  const logoSrc = `${import.meta.env.BASE_URL}sacred-path-mark.png`;
  const yourName = state.youName?.trim() || "Mathieu";
  const partnerName = state.partnerName?.trim() || "Edita";

  return (
    <div className="home-topbar">
      <span className="home-topbar-label">Sacred Path for Couples</span>
      <div className="home-couple-chip-mini">
        <span className="badge-mini">
          <img src={logoSrc} alt="" />
        </span>
        <span>
          {yourName} <span className="dot">•</span> {partnerName}
        </span>
      </div>
    </div>
  );
}
