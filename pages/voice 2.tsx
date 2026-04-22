import { useRouter } from "next/router";

export default function VoicePage() {
  const router = useRouter();
  const { yw, pw, you, partner } = router.query;

  return (
    <div className="card">
      <div className="card-header">
        <span className="chip">Sacred Voice</span>
        <h1 className="title">Let the ritual be spoken.</h1>
        <p className="subtitle">
          Here Sacred Voice will softly guide the two of you through each step of tonight&apos;s
          ritual — eyes closed, bodies relaxed, no scrolling needed.
        </p>
      </div>
      <div className="premium-strip">
        <div className="label">Integration stub</div>
        <p style={{ marginTop: 4 }}>
          This screen is wired for an audio player. Connect it to your existing Sacred Voice
          text-to-speech pipeline, keyed by the selected ritual id and weather.
        </p>
      </div>
      <button
        className="secondary-button"
        type="button"
        onClick={() =>
          router.push({ pathname: "/ritual", query: { yw, pw, you, partner, premium: "1" } })
        }
      >
        Back to ritual card
      </button>
    </div>
  );
}
