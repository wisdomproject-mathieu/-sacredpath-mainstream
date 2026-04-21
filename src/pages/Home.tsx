import { Link } from "react-router-dom";

export function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-sp-bg text-slate-100">
      <div className="max-w-lg text-center space-y-6">
        <p className="text-xs tracking-[0.2em] uppercase text-sp-gold">
          Sacred Path
        </p>
        <h1 className="text-4xl font-serif text-amber-100">
          Sacred Path for Couples
        </h1>
        <p className="text-sm text-slate-300">
          Tonight, receive one guided ritual aligned with your shared intimacy weather.
          No scrolling, no overwhelm — just one path for two.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-4">
          <Link
            to="/connect"
            className="px-6 py-3 rounded-full bg-sp-gold text-black font-medium"
          >
            Connect with Partner
          </Link>
          <Link
            to="/weather"
            className="px-6 py-3 rounded-full border border-slate-600 text-slate-100"
          >
            Continue without names
          </Link>
        </div>
      </div>
    </div>
  );
}
