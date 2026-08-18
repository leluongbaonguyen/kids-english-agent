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
    <div className="relative w-full min-h-screen min-h-[100dvh] overflow-hidden bg-[#070a14] text-white font-sans flex flex-col justify-between selection:bg-pink-400 selection:text-slate-950">
      {/* Fullscreen Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none opacity-60"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
      />

      {/* Warm Soft Ambient Gradient Overlays */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none mix-blend-screen opacity-65"
        style={{
          background: `
            radial-gradient(circle at 50% 25%, rgba(236, 72, 153, 0.25) 0%, transparent 55%),
            radial-gradient(circle at 80% 75%, rgba(168, 85, 247, 0.2) 0%, transparent 60%),
            radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)
          `
        }}
      />

      {/* Top Header Bar */}
      <header className="relative z-10 w-full">
        <nav className="flex flex-row items-center justify-between px-4 sm:px-8 py-4 sm:py-6 max-w-7xl mx-auto w-full">
          {/* Brand Logo */}
          <div
            onClick={() => handleNav('home')}
            className="flex items-center gap-2.5 cursor-pointer select-none group"
          >
            <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500 text-xl sm:text-2xl shadow-[0_0_20px_rgba(236,72,153,0.5)] border border-white/20 group-hover:scale-105 transition duration-300">
              🦄
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-xl font-black tracking-tight text-white font-heading bg-gradient-to-r from-white via-pink-100 to-pink-300 bg-clip-text text-transparent">
                Kids English Agent
              </span>
              <span className="text-[10px] sm:text-xs text-pink-300 font-extrabold tracking-wider uppercase">
                V6.1 • Học Tiếng Anh Siêu Vui 🌟
              </span>
            </div>
          </div>

          {/* Quick Start Button */}
          <button
            onClick={() => handleNav('home')}
            className="rounded-full px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-black bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white transition-all duration-300 cursor-pointer shadow-[0_0_20px_rgba(236,72,153,0.6)] hover:scale-105 active:scale-95 border border-white/30"
          >
            Vào Học Ngay 🚀
          </button>
        </nav>
      </header>

      {/* Main Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-10 sm:pt-16 pb-20 max-w-4xl mx-auto w-full flex-1">
        {/* Child Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/20 border border-pink-400/40 text-pink-200 text-xs sm:text-sm font-black mb-6 backdrop-blur-md shadow-lg animate-bounce">
          <span>💖</span>
          <span>Dành riêng cho Bé Nguyễn Ngọc Minh Anh</span>
          <span>✨</span>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight font-heading drop-shadow-2xl">
          Khám Phá{' '}
          <span className="bg-gradient-to-r from-pink-300 via-amber-200 to-pink-400 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(244,114,182,0.8)]">
            Thế Giới Tiếng Anh
          </span>{' '}
          Siêu Vui Mỗi Ngày! 🌟
        </h1>

        {/* Subtitle */}
        <p className="text-pink-100/90 text-sm sm:text-base md:text-lg max-w-2xl mt-4 sm:mt-6 leading-relaxed font-sans font-medium drop-shadow-md">
          15 phút rèn luyện phản xạ phát âm chuẩn Anh-Mỹ với AI Trợ Lý, Spaced Repetition (SRS), trò chơi tương tác & kho 900 từ vựng sinh động! 🎮🎤
        </p>

        {/* Main Hero CTA Button */}
        <button
          onClick={() => handleNav('home')}
          className="rounded-full px-8 sm:px-12 py-3.5 sm:py-4 text-base sm:text-lg font-black text-slate-950 bg-gradient-to-r from-amber-300 via-pink-400 to-purple-400 mt-8 sm:mt-10 transition-all duration-300 cursor-pointer shadow-[0_0_35px_rgba(244,114,182,0.7)] border-2 border-white hover:scale-105 active:scale-95 flex items-center gap-3 group"
        >
          <span>Bắt Đầu Hành Trình 🚀</span>
          <span className="text-xl group-hover:translate-x-2 transition-transform">→</span>
        </button>
      </main>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-4 text-center text-xs text-pink-200/70 tracking-wide font-sans">
        © 2026 Kids English Learning Agent 🌟 | Nền tảng học Tiếng Anh tương tác AI thông minh
      </footer>
    </div>
  );
}

