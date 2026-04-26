export default function CoupleTopbar() {
  const logoSrc = `${import.meta.env.BASE_URL}sacred-path-mark.png`;

  return (
    <div className="sacred-brand-card">
      <span className="sacred-brand-mark">
        <img src={logoSrc} alt="" />
      </span>
      <span className="sacred-brand-copy">
        <span className="sacred-brand-kicker">SACRED PATH</span>
        <span className="sacred-brand-title">for Couples</span>
      </span>
      <span className="sacred-brand-note">
        Ancient wisdom for modern love. Home for orientation, Sacred Library for insight,
        Sacred Temple for embodied shared practice.
      </span>
    </div>
  );
}
