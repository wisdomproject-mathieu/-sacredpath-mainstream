import { Link } from "react-router-dom";
import CoupleTopbar from "../components/CoupleTopbar";

const practicePoints = [
  "Remove Distractions: These rituals require 100% focus. Put your phones in another room.",
  "Create the Space: Dim the lights, use essential oils, or play ambient music to signal that this time is sacred.",
  "Release Expectations: Tantra is about the process, not the climax. If you feel awkward, that’s okay—laugh together and start again.",
  "Commit to Consistency: Pick one ritual per week to start. Intimacy is a muscle; it requires regular exercise to stay strong.",
  'Remember: The goal isn’t perfection; it’s presence. When you stop "doing" and start "being" with your partner, the intimacy you seek will naturally unfold.',
];

export default function Deeper() {
  return (
    <div className="min-h-screen bg-sp-bg text-slate-100 deeper-page">
      <div className="deeper-shell">
        <div className="deeper-brand-row">
          <CoupleTopbar />
        </div>

        <header className="deeper-header">
          <div className="deeper-kicker">Go deeper</div>
          <h1 className="deeper-title">Beyond the Physical</h1>
          <p className="deeper-subtitle">
            How Tantra Can Help Couples Reconnect with slowed-down presence, mindful touch, and a calmer way of meeting each other.
          </p>
        </header>

        <main className="deeper-grid">
          <article className="deeper-card deeper-card-feature">
            <h2>How Tantra Can Help Couples Reconnect</h2>
            <div className="deeper-copy">
              <p>
                In the hustle and bustle of modern life, the spark that once defined a relationship can often dim.
                Between work deadlines, household chores, and the endless digital noise, intimacy often gets relegated
                to the bottom of the to-do list.
              </p>
              <p>
                If you and your partner feel like you’re drifting apart or simply want to deepen the bond you already
                share, you might be looking for a way to break the routine. Enter Tantra.
              </p>
              <p>
                When most people hear the word "Tantra," they immediately think of sex. While physical intimacy is a
                component, the true essence of Tantra is far more profound. At its core, Tantra is a spiritual
                practice of presence, intentionality, and connection. It is a tool for seeing your partner not just
                as someone you share a life with, but as a sacred vessel of energy.
              </p>
              <p>
                Here is how incorporating Tantric principles can help you and your partner bridge the gap and
                reconnect on a soul level.
              </p>
            </div>
          </article>

          <section className="deeper-card deeper-card-steps">
            <h3>The Art of Slowed-Down Presence</h3>
            <p>
              In our day-to-day lives, we are constantly rushing. We eat while scrolling, talk while multitasking,
              and "connect" while distracted by notifications. Tantra invites you to do the opposite: stop and breathe.
            </p>
            <p>
              Practicing presence means setting aside time-even just ten minutes-where the focus is entirely on your
              partner. No phones, no talk of bills, no planning for tomorrow. When you look into each other’s eyes
              without needing to "do" anything, the nervous system begins to settle.
            </p>

            <h3>Cultivating Mindful Touch</h3>
            <p>
              Most of our touch in a long-term relationship becomes functional: a pat on the back, a quick hug
              goodbye, or sexual intimacy that follows a set script.
            </p>
            <p>
              Tantric touch is different. It is non-goal-oriented. Try conscious touch exercises: one partner sits
              while the other gently caresses their arms, hands, or face with total awareness. The goal isn’t to
              reach a climax or achieve a specific result; the goal is simply to feel and be felt.
            </p>

            <h3>Energy Exchange: The Breath Connection</h3>
            <p>
              In Tantra, the breath is considered the bridge between the physical and the spirit. Couples can
              reconnect by practicing synchronized breathing. Sit facing each other, place your hands on each other’s
              hearts or knees, and begin to breathe together.
            </p>
            <p>
              As you breathe in rhythm, you literally align your nervous systems. This practice can help resolve
              feelings of resentment or distance, allowing you to move out of the head space of analysis and into the
              heart space of empathy.
            </p>
          </section>

          <aside className="deeper-card deeper-card-tips">
            <h3>How to Start Today</h3>
            <ul>
              <li>
                <strong>The 5-Minute Eyegazing Practice:</strong> Sit comfortably facing each other and just look
                into each other’s eyes in silence for five minutes. Notice what comes up.
              </li>
              <li>
                <strong>Intentional Greeting:</strong> When you see each other at the end of the day, take a full 30
                seconds to hug. Not a quick one-handed squeeze, but a full-body embrace where you both breathe deeply.
              </li>
            </ul>

            <h3>Shifting from Performance to Play</h3>
            <p>
              One of the biggest killers of intimacy is the pressure to "perform." Tantra strips away these masks and
              encourages a sense of playfulness and curiosity.
            </p>
            <p>
              Instead of asking, "What do I need to do to satisfy my partner?" ask, "What is my partner feeling right
              now, and how can I honor that?" When you move from performance to exploration, what remains is genuine
              curiosity.
            </p>

            <h3>Honoring the Sacredness of the Everyday</h3>
            <p>
              Ultimately, Tantra teaches us that connection isn’t something you find; it’s something you curate. It’s
              in the way you pour your partner’s coffee, hold their hand while walking, or listen without preparing
              your rebuttal.
            </p>
          </aside>
        </main>

        <section className="deeper-notes">
          <div className="deeper-card deeper-card-note">
            <h3>A Note on Tantric Practice</h3>
            <p>
              The goal of these rituals is not to "achieve" a specific outcome. It is to show up. If you feel awkward,
              that’s okay. If you laugh, that’s okay. Tantra is about embracing whatever arises in the present moment
              with your partner.
            </p>
            <p>
              Choose one ritual to try this week. Approach it as an experiment, leave your expectations at the door,
              and watch how even a few minutes of intentional presence can transform the landscape of your
              relationship.
            </p>
          </div>

          <div className="deeper-card deeper-card-note">
            <h3>Why It Matters</h3>
            <p>
              The goal is not perfection; it is presence. When you stop "doing" and start "being" with your partner,
              the intimacy you seek can unfold naturally. Use these practices as a gentle way to return to each other
              with more breath, more patience, and more tenderness.
            </p>
          </div>
        </section>

        <section className="deeper-practice-grid">
          {practicePoints.map((point) => (
            <div key={point} className="deeper-practice-pill">
              {point}
            </div>
          ))}
        </section>

        <footer className="deeper-footer">
          <Link to="/ritual" className="deeper-primary-btn">
            Back to tonight&apos;s ritual
          </Link>
          <Link to="/paywall" className="deeper-secondary-btn">
            Open subscription page
          </Link>
        </footer>
      </div>
    </div>
  );
}
