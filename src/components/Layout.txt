import React from "react";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen text-[#f6f1e9] font-sans relative overflow-x-hidden">
      {/* Background stays locked across all pages */}
      <div className="fixed inset-0 z-[-1]" style={{ background: 'radial-gradient(circle at top, #161320 0, #050409 55%)' }} />
      
      {/* Container defines the global max-width (e.g., max-w-6xl for desktop) */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        
        {/* Global Header Badge - Now it's perfectly aligned on every page */}
        <header className="mb-12">
          <div className="inline-flex items-center gap-4 bg-[#111017] border border-white/10 rounded-2xl px-5 py-3 shadow-soft">
            <img src="/sacred-path-mark.png" alt="Logo" className="w-8 h-8" />
            <div>
              <p className="text-[10px] uppercase tracking-widest text-muted">Sacred Path</p>
              <h1 className="font-serif text-lg leading-tight">For Couples</h1>
            </div>
          </div>
        </header>

        {/* Page Content goes here */}
        <main>{children}</main>
        
      </div>
    </div>
  );
};