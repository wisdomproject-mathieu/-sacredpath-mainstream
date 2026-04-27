import { Link } from "react-router-dom";
import Layout from "../components/Layout";

export default function Home() {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        {/* Hero Section - Split layout */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          
          {/* Left Side - Text & Inputs */}
          <div className="space-y-8">
            <h1 className="font-serif text-5xl md:text-6xl leading-tight">
              Deep connection &amp;
              <br />
              renewed intimacy
              <br />
              for every couple.
            </h1>

            <p className="text-lg text-muted leading-relaxed max-w-lg">
              Understand your unique needs and desires. Bring deep presence, safe touch, 
              and renewed closeness into your relationship. Start your journey together.
            </p>

            {/* Name Inputs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/connect" 
                className="flex-1 bg-white/5 border border-white/10 rounded-full px-6 py-4 hover:bg-white/10 transition-colors text-center"
              >
                <span className="block text-sm font-medium">Enter Your Names</span>
                <span className="block text-xs text-muted mt-1">To personalize rituals</span>
              </Link>
              
              <Link 
                to="/weather" 
                className="flex-1 bg-gradient-to-br from-[#e6b980] to-[#eacda3] text-[#130f08] rounded-full px-6 py-4 font-medium hover:opacity-90 transition-opacity text-center"
              >
                Skip Names, Go Direct
              </Link>
            </div>

            {/* Value Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8">
              <article className="bg-card rounded-[18px] border border-white/5 p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-32 h-32 bg-accent/10 blur-3xl -translate-x-1/2 -translate-y-1/2" />
                <p className="text-[10px] uppercase tracking-widest text-accent mb-2">For Men</p>
                <h3 className="font-serif text-xl mb-3">Focus: Presence.</h3>
                <p className="text-sm text-muted">Learn to hold stable and present space for your partner.</p>
              </article>

              <article className="bg-card rounded-[18px] border border-white/5 p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-32 h-32 bg-accent/10 blur-3xl -translate-x-1/2 -translate-y-1/2" />
                <p className="text-[10px] uppercase tracking-widest text-accent mb-2">For Women</p>
                <h3 className="font-serif text-xl mb-3">Focus: Softness.</h3>
                <p className="text-sm text-muted">Experience deeply respected and gentle touch.</p>
              </article>

              <article className="bg-card rounded-[18px] border border-white/5 p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-32 h-32 bg-accent/10 blur-3xl -translate-x-1/2 -translate-y-1/2" />
                <p className="text-[10px] uppercase tracking-widest text-accent mb-2">For Couples</p>
                <h3 className="font-serif text-xl mb-3">Focus: Rituals.</h3>
                <p className="text-sm text-muted">Build deep affection with shared, mindful practices.</p>
              </article>
            </div>
          </div>

          {/* Right Side - Preview Card */}
          <aside className="relative">
            <div className="sticky top-8">
              <div className="bg-card rounded-[24px] border border-white/5 shadow-soft p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-48 h-48 bg-accent/10 blur-[80px] pointer-events-none" />
                
                <div className="mb-6">
                  <img 
                    src="/assets/home/home-premium-union.png" 
                    alt="Sacred Union" 
                    className="w-full rounded-xl border border-white/5 aspect-square object-cover"
                  />
                </div>
                
                <div className="text-center space-y-3">
                  <p className="text-[11px] uppercase tracking-widest text-accent">Tonight starts here</p>
                  <p className="text-lg font-medium leading-snug">
                    One simple ritual. More closeness, more softness, one stronger night together.
                  </p>
                </div>
              </div>
            </div>
          </aside>

        </section>
      </div>
    </Layout>
  );
}