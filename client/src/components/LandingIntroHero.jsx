import React from 'react';

export default function LandingIntroHero({ onEnterApp, onNavigateTab }) {
  const handleNav = (tabKey = 'home') => {
    if (onNavigateTab) {
      onNavigateTab(tabKey);
    } else if (onEnterApp) {
      onEnterApp();
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-[hsl(330,60%,8%)] text-foreground font-[var(--font-body)] flex flex-col justify-between selection:bg-pink-400 selection:text-slate-950">
      {/* Fullscreen Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none opacity-90"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
      />

      {/* Luminous White-Pink Ambient Radial Background Layer */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none mix-blend-screen opacity-70"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.18) 0%, transparent 40%),
            radial-gradient(circle at 80% 70%, rgba(244, 114, 182, 0.25) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.15) 0%, transparent 60%)
          `
        }}
      />

      {/* Top Header (No Middle Menu, White-Pink Button Glows) */}
      <header className="relative z-10 w-full">
        <nav className="flex flex-row items-center justify-between px-6 sm:px-8 py-6 max-w-7xl mx-auto w-full">
          {/* Brand Logo with White-Pink Glow */}
          <div
            onClick={() => handleNav('intro')}
            className="flex items-center gap-2 text-2xl sm:text-3xl tracking-tight text-white cursor-pointer select-none drop-shadow-[0_0_15px_rgba(244,114,182,0.8)]"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            <span className="bg-gradient-to-r from-white via-pink-100 to-pink-300 bg-clip-text text-transparent font-extrabold">
              Kids English Agent
            </span>
            <sup className="text-xs text-pink-300 font-bold">®</sup>
          </div>

          {/* Quick Header CTA Button (English) */}
          <button
            onClick={() => handleNav('home')}
            className="btn-white-pink rounded-full px-5 sm:px-7 py-2.5 text-xs sm:text-sm font-black transition-all duration-300 cursor-pointer shadow-[0_0_20px_rgba(244,114,182,0.6)] hover:shadow-[0_0_30px_rgba(255,255,255,0.9)] active:scale-95"
          >
            Begin Journey 🚀
          </button>
        </nav>
      </header>

      {/* Cinematic Hero Section with White-Pink Glowing Text & Buttons (English) */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-20 sm:pt-28 pb-32 max-w-7xl mx-auto w-full flex-1">
        {/* Cinematic H1 Heading in English */}
        <h1
          className="text-4xl sm:text-6xl md:text-8xl leading-[0.95] tracking-[-2.46px] max-w-6xl font-normal text-white animate-fade-rise drop-shadow-xl"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Where{' '}
          <em className="not-italic text-pink-300 drop-shadow-[0_0_20px_rgba(244,114,182,0.9)] font-serif">
            dreams rise
          </em>{' '}
          through{' '}
          <em className="not-italic text-white drop-shadow-[0_0_18px_rgba(255,255,255,0.9)] font-serif">
            the silence.
          </em>
        </h1>

        {/* Subtext Paragraph in English */}
        <p className="text-pink-100/90 text-base sm:text-lg max-w-2xl mt-8 leading-relaxed animate-fade-rise-delay font-sans drop-shadow-md">
          We're designing tools for deep thinkers, bold creators, and young learners. An AI-powered English agent for 15 minutes of smart daily practice with spaced repetition, phonics coaching, and interactive paths.
        </p>

        {/* Big White-Pink Hero Main CTA Button in English */}
        <button
          onClick={() => handleNav('home')}
          className="btn-white-pink rounded-full px-10 sm:px-14 py-4 sm:py-5 text-base sm:text-lg font-black text-pink-950 mt-10 sm:mt-12 transition-all duration-300 cursor-pointer animate-fade-rise-delay-2 shadow-[0_0_35px_rgba(244,114,182,0.7),0_0_15px_rgba(255,255,255,0.9)] border-2 border-white hover:scale-105 hover:shadow-[0_0_55px_rgba(244,114,182,0.9),0_0_30px_rgba(255,255,255,1)] active:scale-95 flex items-center gap-3 group"
        >
          <span>Begin Journey</span>
          <span className="text-xl group-hover:translate-x-2 transition-transform text-pink-900 font-extrabold">→</span>
        </button>
      </main>

      {/* Bottom Subtle Overlay Footer in English */}
      <footer className="relative z-10 px-8 py-4 text-center text-xs text-pink-200/70 tracking-wide font-sans drop-shadow-sm">
        © 2026 Kids English Learning Agent 🌟 | Interactive AI English Learning Platform
      </footer>
    </div>
  );
}
