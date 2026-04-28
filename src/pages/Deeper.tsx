import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import Card from "../components/Card";
import Button from "../components/Button";

const practicePoints = [
  "Remove Distractions: These rituals require 100% focus. Put your phones in another room.",
  "Create the Space: Dim the lights, use essential oils, or play ambient music.",
  "Release Expectations: Tantra is about the process, not the climax. If you feel awkward, laugh together.",
  "Commit to Consistency: Pick one ritual per week to start. Intimacy requires regular exercise.",
  "Remember: The goal isn't perfection; it's presence.",
];

export default function Deeper() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <header className="text-center mb-12">
          <p className="text-[11px] uppercase tracking-widest text-accent mb-3">Beyond the Physical</p>
          <h1 className="font-serif text-4xl md:text-5xl mb-4">Go deeper than one ritual</h1>
          <p className="text-lg text-muted">
            How Tantra Can Help Couples Reconnect with slowed-down presence, mindful touch, and a calmer way of meeting each other.
          </p>
        </header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          
          <Card>
            <h2 className="font-serif text-2xl mb-4">How Tantra Helps Couples Reconnect</h2>
            <div className="space-y-3 text-sm text-muted leading-relaxed">
              <p>In the hustle of modern life, the spark that once defined a relationship can often dim. Between work deadlines, household chores, and digital noise, intimacy gets relegated to the bottom of the to-do list.</p>
              <p>If you feel like you're drifting apart or want to deepen the bond you already share, you might be looking for a way to break the routine. Enter Tantra.</p>
              <p>While physical intimacy is a component, the true essence of Tantra is far more profound. At its core, Tantra is a spiritual practice of presence, intentionality, and connection.</p>
            </div>
          </Card>

          <Card>
            <h3 className="font-serif text-xl mb-3">The Art of Slowed-Down Presence</h3>
            <p className="text-sm text-muted leading-relaxed mb-4">
              In our day-to-day lives, we are constantly rushing. Tantra invites you to do the opposite: stop and breathe.
            </p>
            <h3 className="font-serif text-xl mb-3">Cultivating Mindful Touch</h3>
            <p className="text-sm text-muted leading-relaxed mb-4">
              Tantric touch is non-goal-oriented. Try conscious touch exercises where the goal is simply to feel and be felt.
            </p>
            <h3 className="font-serif text-xl mb-3">Energy Exchange: The Breath Connection</h3>
            <p className="text-sm text-muted leading-relaxed">
              Practice synchronized breathing. Sit facing each other and begin to breathe together to align your nervous systems.
            </p>
          </Card>

        </div>

        {/* Tips Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          
          <Card>
            <h3 className="font-serif text-xl mb-4">How to Start Today</h3>
            <ul className="text-sm space-y-4 text-text/90">
              <li><strong>The 5-Minute Eyegazing:</strong> Sit facing each other and just look into each other's eyes in silence.</li>
              <li><strong>Intentional Greeting:</strong> When you see each other at the end of the day, take 30 seconds for a full-body hug.</li>
            </ul>
          </Card>

          <Card>
            <h3 className="font-serif text-xl mb-4">Why It Matters</h3>
            <p className="text-sm text-muted leading-relaxed">
              The goal is not perfection; it is presence. When you stop "doing" and start "being" with your partner, the intimacy you seek can unfold naturally.
            </p>
          </Card>

        </div>

        {/* Practice Points */}
        <section className="mb-12">
          <h3 className="font-serif text-2xl mb-6 text-center">Practice Guidelines</h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {practicePoints.map((point, i) => (
              <span 
                key={i} 
                className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-muted hover:bg-white/10 transition-colors"
              >
                {point}
              </span>
            ))}
          </div>
        </section>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/ritual">
            <Button variant="glow">Back to tonight's ritual</Button>
          </Link>
          <Link to="/paywall">
            <Button variant="secondary">Open subscription page</Button>
          </Link>
        </div>

      </div>
    </Layout>
  );
}
