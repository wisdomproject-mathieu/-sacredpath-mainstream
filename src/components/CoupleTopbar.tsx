export default function CoupleTopbar() {
  const logoSrc = `${import.meta.env.BASE_URL}sacred-path-mark.png`;

  return (
    <div className="sacred-brand-card">
      <span className="sacred-brand-mark">
        <img src={logoSrc} alt="" />
      </span>
      <span className="sacred-brand-copy">
        <span className="sacred-brand-title">Sacred Path for Couples</span>
        <span className="sacred-brand-note">Ancient wisdom for modern couples.</span>
      </span>
    </div>
  );
}
