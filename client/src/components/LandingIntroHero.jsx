import React, { useState } from 'react';
import {
  Sparkles, ArrowRight, BookOpen, Award, Zap, Volume2, ShieldCheck,
  CheckCircle2, Layers, ExternalLink, FileSpreadsheet, FileText,
  Gamepad2, Star, Heart, Palette, Hash, Leaf, ChevronRight,
  Play, Flame, Trophy, Download, Compass, HelpCircle, Check
} from 'lucide-react';

export default function LandingIntroHero({
  onEnterApp,
  onNavigateTab,
  onOpenAuth,
  onQuickLogin,
  isAuthenticated,
  currentActor
}) {
  const [activeTabPreview, setActiveTabPreview] = useState('all');
  const [copiedLink, setCopiedLink] = useState(false);

  const handleNav = (tabKey = 'flashcards') => {
    if (onNavigateTab) {
      onNavigateTab(tabKey);
    } else if (onEnterApp) {
      onEnterApp();
    }
  };

  const handleCopyShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.origin);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const levelCards = [
    {
      id: 'L1',
      title: 'Level 1 • Khởi Động',
      subtitle: 'Starter Foundation',
      count: '150 Từ Vựng',
      units: '15 Units',
      color: 'from-amber-500 to-orange-600',
      border: 'border-amber-400/50',
      badge: 'bg-amber-500/20 text-amber-300',
      icon: '🌱',
      desc: 'Bảng chữ cái, đồ vật thân thuộc, gia đình, động vật cưng, các màu sắc cơ bản và đồ chơi yêu thích.'
    },
    {
      id: 'L2',
      title: 'Level 2 • Cơ Bản',
      subtitle: 'Elementary Communication',
      count: '150 Từ Vựng',
      units: '15 Units',
      color: 'from-blue-500 to-cyan-600',
      border: 'border-blue-400/50',
      badge: 'bg-blue-500/20 text-blue-300',
      icon: '🏫',
      desc: 'Trường lớp, dụng cụ học tập, phòng học, hành động hàng ngày, cảm xúc biểu cảm và thức uống.'
    },
    {
      id: 'L3',
      title: 'Level 3 • Mở Rộng',
      subtitle: 'Expanding World',
      count: '150 Từ Vựng',
      units: '15 Units',
      color: 'from-teal-500 to-emerald-600',
      border: 'border-teal-400/50',
      badge: 'bg-teal-500/20 text-teal-300',
      icon: '🌿',
      desc: 'Thiên nhiên bốn mùa, thời tiết, giao thông công cộng, trang thiết bị gia đình và món ăn bổ dưỡng.'
    },
    {
      id: 'L4',
      title: 'Level 4 • Nâng Cao',
      subtitle: 'Advanced Horizons',
      count: '150 Từ Vựng',
      units: '15 Units',
      color: 'from-purple-500 to-indigo-600',
      border: 'border-purple-400/50',
      badge: 'bg-purple-500/20 text-purple-300',
      icon: '🚀',
      desc: 'Nghề nghiệp ước mơ, thành phố hiện đại, danh lam thắng cảnh, thể thao sôi động và nghệ thuật sáng tạo.'
    },
    {
      id: 'L5',
      title: 'Level 5 • Tiên Phong',
      subtitle: 'Pioneer Science',
      count: '150 Từ Vựng',
      units: '15 Units',
      color: 'from-rose-500 to-red-600',
      border: 'border-rose-400/50',
      badge: 'bg-rose-500/20 text-rose-300',
      icon: '🔬',
      desc: 'Khoa học tự nhiên, hệ mặt trời vũ trụ, đại dương sâu thẳm, đa dạng sinh học và phát minh công nghệ.'
    },
    {
      id: 'L6',
      title: 'Level 6 • Quốc Tế',
      subtitle: 'Global Cambridge Mastery',
      count: '150 Từ Vựng',
      units: '15 Units',
      color: 'from-cyan-500 to-blue-700',
      border: 'border-cyan-400/50',
      badge: 'bg-cyan-500/20 text-cyan-300',
      icon: '🌍',
      desc: 'Hội nhập thế giới, văn hóa đa quốc gia, kỹ năng thế kỷ 21, chuẩn đầu ra Cambridge Starters / Movers.'
    },
    {
      id: 'BIO',
      title: 'Chuyên Đề • Bách Khoa Sinh Vật',
      subtitle: 'Flora & Fauna of the World',
      count: '120 Từ Vựng',
      units: '10 Units',
      color: 'from-emerald-500 to-green-700',
      border: 'border-emerald-400/50',
      badge: 'bg-emerald-500/20 text-emerald-300',
      icon: '🦁',
      desc: 'Phân loại động thực vật toàn cầu: thú ăn thịt, chim di cư, côn trùng thụ phấn, hoa quý & nấm dược liệu kèm 58 Vector SVGs.'
    },
    {
      id: 'COLOR',
      title: 'Chuyên Đề • Sắc Màu Toàn Cầu',
      subtitle: 'Colors of the World Encyclopedia',
      count: '120 Từ Vựng',
      units: '10 Units',
      color: 'from-fuchsia-500 to-rose-600',
      border: 'border-fuchsia-400/50',
      badge: 'bg-fuchsia-500/20 text-fuchsia-300',
      icon: '🎨',
      desc: '120 sắc thái màu thế giới: ruby, sapphire, emerald, pastel, neon quang học kèm mã HEX chuẩn và 120 Vector SVGs.'
    },
    {
      id: 'NUM',
      title: 'Chuyên Đề • Số Đếm & Thứ Tự',
      subtitle: 'Numbers & Ordinals Encyclopedia',
      count: '120 Từ Vựng',
      units: '10 Units',
      color: 'from-amber-400 via-yellow-500 to-amber-600',
      border: 'border-amber-400/60',
      badge: 'bg-amber-500/20 text-amber-300',
      icon: '🔢',
      desc: 'Số đếm 0–11, teens, tens, đại số lớn (million, billion, infinity), số thứ tự 1st–100th, phân số, bội số, chữ số La Mã I–M.'
    }
  ];

  return (
    <div className="relative w-full min-h-screen min-h-[100dvh] bg-[#070a14] text-white font-sans overflow-x-hidden selection:bg-pink-500 selection:text-white">
      
      {/* FULLSCREEN VIDEO BACKGROUND WITH BACKUP GRADIENT */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-45 mix-blend-screen scale-105 filter saturate-150"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
        />
        {/* Ambient Gradient Glow Lights */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-pink-600/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[130px]" />
        <div className="absolute -bottom-40 left-1/4 w-[700px] h-[700px] bg-cyan-600/15 rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-radial-vignette opacity-70" />
      </div>

      {/* TOP NAVIGATION BAR */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-2xl bg-[#070a14]/85 border-b border-white/10 shadow-xl transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <div 
            onClick={() => handleNav('flashcards')}
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <div className="relative flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-pink-500 via-purple-600 to-indigo-600 text-xl sm:text-2xl shadow-[0_0_25px_rgba(236,72,153,0.6)] border-2 border-white/40 group-hover:scale-105 group-hover:rotate-3 transition duration-300">
              <span>🦄</span>
              <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-yellow-300 animate-spin" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-xl font-black tracking-tight text-white font-heading bg-gradient-to-r from-white via-pink-100 to-pink-300 bg-clip-text text-transparent">
                  KIDS ENGLISH AGENT
                </span>
                <span className="px-2 py-0.5 rounded-full bg-pink-500/20 border border-pink-400/40 text-pink-300 text-[10px] font-black uppercase tracking-wider">
                  V6.1
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-pink-200/80 font-bold hidden sm:block">
                Bách Khoa Toàn Thư Tiếng Anh Trẻ Em & Tiểu Học Chuẩn Quốc Tế
              </p>
            </div>
          </div>

          {/* Nav Quick Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-bold text-slate-300">
            <a href="#stats" className="hover:text-pink-300 transition">Thống Kê Khủng</a>
            <a href="#curriculum" className="hover:text-pink-300 transition">9 Cấp Độ (1,520 Từ)</a>
            <a href="#galleries" className="hover:text-pink-300 transition">3 Triển Lãm SVG</a>
            <a href="#features" className="hover:text-pink-300 transition">Tính Năng Đột Phá</a>
            <a href="#exports" className="hover:text-pink-300 transition">Tài Liệu Xuất Bản</a>
          </nav>

          {/* Action Header Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {!isAuthenticated ? (
              <button
                onClick={() => onOpenAuth ? onOpenAuth() : handleNav('auth')}
                className="px-3.5 py-2 rounded-xl text-xs font-black bg-slate-900/90 hover:bg-slate-800 text-pink-300 border border-pink-500/40 hover:border-pink-400 transition cursor-pointer flex items-center gap-1.5 shadow-md"
                title="Đăng nhập tài khoản"
              >
                <span>🔑</span>
                <span>Đăng Nhập</span>
              </button>
            ) : (
              <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-pink-500/10 border border-pink-400/30 text-pink-200 text-xs font-bold">
                <span>👧</span>
                <span>Bé Minh Anh</span>
              </div>
            )}

            <button
              onClick={handleCopyShare}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-700/80 transition cursor-pointer"
              title="Chia sẻ đường dẫn"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <ExternalLink className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Đã sao chép!' : 'Chia Sẻ'}</span>
            </button>

            <button
              onClick={() => {
                if (!isAuthenticated && onQuickLogin) {
                  onQuickLogin('minh_anh');
                } else {
                  handleNav('flashcards');
                }
              }}
              className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-black text-slate-950 bg-gradient-to-r from-amber-300 via-pink-400 to-purple-400 hover:scale-105 active:scale-95 transition-all shadow-[0_0_25px_rgba(244,114,182,0.6)] border border-white/50 cursor-pointer flex items-center gap-2 group"
            >
              <span>Vào Học Ngay 🚀</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative z-10 pt-10 sm:pt-16 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
        
        {/* Child Dedicated VIP Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 rounded-full bg-pink-500/20 border border-pink-400/50 text-pink-200 text-xs sm:text-sm font-black mb-6 backdrop-blur-xl shadow-lg animate-bounce">
          <Heart className="w-4 h-4 text-pink-400 fill-pink-400" />
          <span>Dành Riêng Cho Bé Nguyễn Ngọc Minh Anh & Thiếu Nhi Toàn Quốc</span>
          <Sparkles className="w-4 h-4 text-amber-300" />
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.15] text-white font-heading max-w-5xl">
          HỆ THỐNG BÁCH KHOA TOÀN THƯ
          <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-amber-200 to-cyan-300 drop-shadow-[0_0_35px_rgba(244,114,182,0.7)]">
            TIẾNG ANH THẾ HỆ MỚI V6.1
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-3xl mt-5 sm:mt-7 text-sm sm:text-base md:text-lg text-slate-200/90 leading-relaxed font-medium">
          Đột phá toàn diện với <span className="text-pink-300 font-black">1,520 từ vựng chuẩn quốc tế</span>, <span className="text-amber-300 font-black">100% Vector SVG bespoke vẽ riêng</span>, Trợ lý AI chấm phát âm chuẩn Anh - Mỹ, Thuật toán ghi nhớ vĩnh cửu <span className="text-cyan-300 font-black">SRS SuperMemo SM-2</span>, 18 Poster Sách Giáo Khoa và Bộ 3 Triển lãm Bách khoa tương tác đỉnh cao! 🌟
        </p>

        {/* Hero CTA Action Group */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-10">
          <button
            onClick={() => {
              if (!isAuthenticated && onQuickLogin) {
                onQuickLogin('minh_anh');
              } else {
                handleNav('flashcards');
              }
            }}
            className="px-7 sm:px-10 py-3.5 sm:py-4 rounded-2xl text-sm sm:text-base font-black text-slate-950 bg-gradient-to-r from-amber-300 via-pink-400 to-purple-400 shadow-[0_0_35px_rgba(244,114,182,0.8)] border-2 border-white hover:scale-105 active:scale-95 transition-all flex items-center gap-3 cursor-pointer group"
          >
            <Play className="w-5 h-5 fill-slate-950 text-slate-950" />
            <span>KHÁM PHÁ TOÀN BỘ 1,520 TỪ VỰNG</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
          </button>

          <button
            onClick={() => handleNav('detailed_path')}
            className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl text-sm sm:text-base font-black text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 shadow-xl hover:border-pink-400/60 transition-all flex items-center gap-2.5 cursor-pointer"
          >
            <Compass className="w-5 h-5 text-pink-400" />
            <span>Xem Lộ Trình 6 Cấp Độ</span>
          </button>

          <button
            onClick={() => handleNav('poster')}
            className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl text-sm sm:text-base font-black text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 shadow-xl hover:border-cyan-400/60 transition-all flex items-center gap-2.5 cursor-pointer"
          >
            <Palette className="w-5 h-5 text-cyan-400" />
            <span>18 Poster Bài Học Khổ Lớn</span>
          </button>

          <button
            onClick={() => handleNav('memory_game')}
            className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl text-sm sm:text-base font-black text-white bg-gradient-to-r from-purple-900/90 via-pink-900/90 to-amber-950/90 hover:from-purple-800 hover:to-pink-800 border-2 border-pink-400/80 shadow-[0_0_25px_rgba(236,72,153,0.5)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 cursor-pointer"
          >
            <span className="text-xl">🃏</span>
            <span>Chơi Siêu Game Lật Thẻ (1,520 Từ)</span>
          </button>
        </div>

        {/* Feature Highlights Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 mt-10 text-xs font-bold text-slate-300">
          <span className="px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 100% Phát Âm Bản Ngữ Chuẩn
          </span>
          <span className="px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Phiên Âm Tiếng Việt Trực Quan
          </span>
          <span className="px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Ví Dụ Song Ngữ Chuẩn Ngữ Cảnh
          </span>
          <span className="px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Hoạt Động Offline & Đồng Bộ Realtime
          </span>
        </div>

      </section>

      {/* STATS SECTION */}
      <section id="stats" className="relative z-10 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
        <div className="text-center space-y-2 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/40 text-amber-300 text-xs font-black uppercase">
            <Trophy className="w-3.5 h-3.5" />
            <span>QUY MÔ & TẦM VÓC HỆ THỐNG</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            Các Con Số Kỷ Lục Đầy Tự Hào
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-pink-500/50 backdrop-blur-xl transition text-center space-y-1 group">
            <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400 group-hover:scale-110 transition-transform">
              1,520
            </div>
            <div className="text-xs font-bold text-white">Từ Vựng Chuẩn</div>
            <div className="text-[11px] text-slate-400 font-medium">L1-L6 & 3 Bách Khoa</div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-purple-500/50 backdrop-blur-xl transition text-center space-y-1 group">
            <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 group-hover:scale-110 transition-transform">
              121
            </div>
            <div className="text-xs font-bold text-white">Chủ Đề Toàn Diện</div>
            <div className="text-[11px] text-slate-400 font-medium">Bao phủ mọi lĩnh vực</div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-emerald-500/50 backdrop-blur-xl transition text-center space-y-1 group">
            <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 group-hover:scale-110 transition-transform">
              300+
            </div>
            <div className="text-xs font-bold text-white">Vector SVG Độc Quyền</div>
            <div className="text-[11px] text-slate-400 font-medium">Vẽ tay 100% chuẩn xác</div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-amber-500/50 backdrop-blur-xl transition text-center space-y-1 group">
            <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-400 group-hover:scale-110 transition-transform">
              18
            </div>
            <div className="text-xs font-bold text-white">Poster Sách Giáo Khoa</div>
            <div className="text-[11px] text-slate-400 font-medium">50 từ/poster trực quan</div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/50 backdrop-blur-xl transition text-center space-y-1 group">
            <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:scale-110 transition-transform">
              9
            </div>
            <div className="text-xs font-bold text-white">Cấp Độ & Chuyên Đề</div>
            <div className="text-[11px] text-slate-400 font-medium">Lộ trình học bài bản</div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-rose-500/50 backdrop-blur-xl transition text-center space-y-1 group">
            <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-400 group-hover:scale-110 transition-transform">
              12 Sheets
            </div>
            <div className="text-xs font-bold text-white">Xuất Excel Chuẩn</div>
            <div className="text-[11px] text-slate-400 font-medium">Kèm file Word bài tập A4</div>
          </div>

        </div>
      </section>

      {/* CURRICULUM SECTION */}
      <section id="curriculum" className="relative z-10 py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
        <div className="text-center space-y-2 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-400/40 text-purple-300 text-xs font-black uppercase">
            <BookOpen className="w-3.5 h-3.5" />
            <span>LỘ TRÌNH 9 CẤP ĐỘ BÀI BẢN</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            Cấu Trúc Khóa Học Chuẩn Quốc Tế
          </h2>
          <p className="max-w-2xl mx-auto text-xs sm:text-sm text-slate-300">
            Khám phá 6 Cấp độ học đường nền tảng (L1 đến L6) kết hợp 3 Đại Chuyên Đề Bách Khoa sâu rộng (Sinh Vật BIO, Sắc Màu COLOR, Số Học NUM).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {levelCards.map((lvl) => (
            <div
              key={lvl.id}
              onClick={() => handleNav('flashcards')}
              className={`p-6 rounded-3xl bg-slate-900/80 border ${lvl.border} hover:scale-[1.02] transition-all duration-300 shadow-xl flex flex-col justify-between cursor-pointer group hover:bg-slate-900`}
            >
              <div>
                {/* Card Top */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-3xl p-2 rounded-2xl bg-slate-950/80 border border-slate-800 shadow-md vocab-emoji">
                    {lvl.icon}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${lvl.badge}`}>
                      {lvl.units}
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-slate-800 text-slate-200">
                      {lvl.count}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-black text-white group-hover:text-pink-300 transition">
                  {lvl.title}
                </h3>
                <div className="text-xs font-semibold text-slate-400 mt-0.5">
                  {lvl.subtitle}
                </div>

                {/* Description */}
                <p className="text-xs sm:text-[13px] text-slate-300/90 leading-relaxed mt-3 font-normal">
                  {lvl.desc}
                </p>
              </div>

              {/* Card Bottom CTA */}
              <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between text-xs font-black text-pink-300 group-hover:text-pink-200">
                <span>Vào Khám Phá Thẻ Học</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* INTERACTIVE GALLERIES SECTION */}
      <section id="galleries" className="relative z-10 py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
        <div className="text-center space-y-2 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/40 text-cyan-300 text-xs font-black uppercase">
            <Palette className="w-3.5 h-3.5" />
            <span>KHÔNG GIAN TRẢI NGHIỆM ĐỘC QUYỀN</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            Bộ 3 Phòng Triển Lãm Vector Tương Tác
          </h2>
          <p className="max-w-2xl mx-auto text-xs sm:text-sm text-slate-300">
            Ba trang web triển lãm trực quan chuyên sâu với âm thanh giọng đọc bản ngữ, tra cứu thời gian thực và toàn bộ Vector SVG minh họa sắc nét.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Gallery 1: Flora Fauna */}
          <div className="relative rounded-3xl p-6 bg-gradient-to-b from-emerald-950/40 to-slate-900 border border-emerald-500/40 shadow-2xl flex flex-col justify-between group hover:border-emerald-400 transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-4xl">🦁</span>
                <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  120 Loài Sinh Vật
                </span>
              </div>
              <h3 className="text-xl font-black text-white group-hover:text-emerald-300 transition">
                Phòng Triển Lãm Động Thực Vật Toàn Cầu
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mt-2.5">
                Bách khoa sinh thái học với 58 vector SVG minh họa các loài thú, chim muông, côn trùng, nấm, thảo mộc quý hiếm trên khắp địa cầu.
              </p>
            </div>
            <a
              href="/flora_fauna_gallery.html"
              target="_blank"
              rel="noreferrer"
              className="mt-6 w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer shadow-lg"
            >
              <span>Mở Triển Lãm Sinh Vật</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Gallery 2: Colors */}
          <div className="relative rounded-3xl p-6 bg-gradient-to-b from-fuchsia-950/40 to-slate-900 border border-fuchsia-500/40 shadow-2xl flex flex-col justify-between group hover:border-fuchsia-400 transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-4xl">🎨</span>
                <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-400/30">
                  120 Sắc Thái HEX
                </span>
              </div>
              <h3 className="text-xl font-black text-white group-hover:text-fuchsia-300 transition">
                Phòng Triển Lãm Sắc Màu Thế Giới
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mt-2.5">
                Khám phá 120 màu sắc hội họa & quang học: ruby, sapphire, ngọc bích, neon, ánh kim, pastel kèm mã màu HEX và vector minh họa.
              </p>
            </div>
            <a
              href="/colors_gallery.html"
              target="_blank"
              rel="noreferrer"
              className="mt-6 w-full py-3 rounded-2xl bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer shadow-lg"
            >
              <span>Mở Triển Lãm Sắc Màu</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Gallery 3: Numbers */}
          <div className="relative rounded-3xl p-6 bg-gradient-to-b from-amber-950/40 to-slate-900 border border-amber-500/40 shadow-2xl flex flex-col justify-between group hover:border-amber-400 transition-all">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-4xl">🔢</span>
                <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase bg-amber-500/20 text-amber-300 border border-amber-400/30">
                  120 Khái Niệm Số Học
                </span>
              </div>
              <h3 className="text-xl font-black text-white group-hover:text-amber-300 transition">
                Phòng Triển Lãm Số Đếm & Số Thứ Tự
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mt-2.5">
                Toàn cảnh số đếm 0–11, tròn chục, triệu, tỷ, vô cực, số thứ tự 1st–100th, phân số, bội số, tá, thế kỷ và chữ số La Mã I–M.
              </p>
            </div>
            <a
              href="/numbers_gallery.html"
              target="_blank"
              rel="noreferrer"
              className="mt-6 w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer shadow-lg"
            >
              <span>Mở Triển Lãm Số Học</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

        </div>
      </section>

      {/* CORE FEATURES SECTION */}
      <section id="features" className="relative z-10 py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
        <div className="text-center space-y-2 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-400/40 text-pink-300 text-xs font-black uppercase">
            <Zap className="w-3.5 h-3.5" />
            <span>CÔNG NGHỆ & SƯ PHẠM VƯỢT TRỘI</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            Học Tiếng Anh Thật Vui & Hiệu Quả Gấp 5 Lần
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-pink-500/50 backdrop-blur-xl transition space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-pink-500/20 border border-pink-400/40 flex items-center justify-center text-pink-300 text-2xl">
              🎤
            </div>
            <h3 className="text-lg font-black text-white">Trợ Lý AI Chấm Phát Âm 1-Kèm-1</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Trí tuệ nhân tạo lắng nghe giọng nói của bé qua micro, phân tích độ chính xác theo từng âm vị (Phoneme Analysis) và phản hồi tức thì với điểm sao động viên.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-purple-500/50 backdrop-blur-xl transition space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-purple-300 text-2xl">
              🧠
            </div>
            <h3 className="text-lg font-black text-white">Trí Nhớ Dài Hạn SRS SuperMemo SM-2</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Thuật toán lặp lại ngắt quãng (Spaced Repetition) tự động tính toán thời điểm vàng bé sắp quên từ vựng để nhắc ôn tập lại, giúp khắc sâu vào trí nhớ dài hạn.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/50 backdrop-blur-xl transition space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 text-2xl">
              🎮
            </div>
            <h3 className="text-lg font-black text-white">Trung Tâm Bài Tập & Mini-Games</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Kho trò chơi tương tác phong phú: Ghép từ với tranh, Nghe âm thanh đoán nghĩa, Thử thách phản xạ tốc độ và Đố vui trắc nghiệm củng cố kiến thức sinh động.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-amber-500/50 backdrop-blur-xl transition space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 text-2xl">
              🎨
            </div>
            <h3 className="text-lg font-black text-white">18 Poster Sách Giáo Khoa Khổ Lớn</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Toàn bộ kho từ vựng cốt lõi L1–L6 được thiết kế thành các trang poster tuyệt đẹp như sách giáo khoa quốc tế, mỗi trang tập trung từ vựng trực quan với hình ảnh sinh động.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-emerald-500/50 backdrop-blur-xl transition space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 text-2xl">
              📊
            </div>
            <h3 className="text-lg font-black text-white">Bảng Theo Dõi Tiến Độ Phụ Huynh</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Báo cáo minh bạch số từ bé đã làm chủ, chuỗi ngày học liên tục (Streak), tỷ lệ phát âm chuẩn và các từ vựng cần ôn tập thêm để ba mẹ đồng hành cùng con.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-rose-500/50 backdrop-blur-xl transition space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-400/40 flex items-center justify-center text-rose-300 text-2xl">
              💎
            </div>
            <h3 className="text-lg font-black text-white">100% Vector SVG Bespoke Chuẩn Mực</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Từng biểu tượng và minh họa từ vựng đều được vẽ riêng theo tỉ lệ chuẩn học đường, không sử dụng icon cẩu thả hay sai loài sinh vật/màu sắc.
            </p>
          </div>

        </div>
      </section>

      {/* EXPORTS & DOWNLOADS SECTION */}
      <section id="exports" className="relative z-10 py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-white/15 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-black uppercase">
              <Download className="w-3.5 h-3.5" />
              <span>HỆ THỐNG XUẤT BẢN TÀI LIỆU CHUẨN</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              Tải Toàn Bộ Cơ Sở Dữ Liệu & Sách Bài Tập In Ấn
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Hệ thống tự động biên soạn và đồng bộ hóa toàn bộ 1,520 từ vựng ra hai định dạng chuẩn mực cao cấp: file Excel 12 sheets phân loại chi tiết và file Word bài tập A4 in màu cho bé học tại bàn!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <a
              href="/Kids_English_Vocabulary_Full_Database.xlsx"
              download
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2.5 transition shadow-lg cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Tải File Excel (.xlsx)</span>
            </a>

            <a
              href="/Kids_English_V6_Full_Vocab_Exercises.docx"
              download
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2.5 transition shadow-lg cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Tải Sách Bài Tập Word (.docx)</span>
            </a>
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="relative z-10 py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/20 border border-pink-400/50 text-pink-200 text-xs font-black">
          <span>✨</span>
          <span>Bắt Đầu Ngay Hôm Nay Để Chắp Cánh Tương Lai Cho Con</span>
          <span>✨</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-white font-heading">
          Sẵn Sàng Cho Hành Trình Chinh Phục Tiếng Anh?
        </h2>

        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-medium">
          Chỉ 15 phút mỗi ngày cùng Kids English Agent giúp bé tự tin giao tiếp, phản xạ tự nhiên và sở hữu vốn từ vựng phong phú vượt bậc!
        </p>

        <div className="pt-4">
          <button
            onClick={() => handleNav('flashcards')}
            className="px-10 sm:px-14 py-4 sm:py-5 rounded-full text-base sm:text-xl font-black text-slate-950 bg-gradient-to-r from-amber-300 via-pink-400 to-purple-400 hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(244,114,182,0.9)] border-2 border-white cursor-pointer inline-flex items-center gap-3 group"
          >
            <span>BẮT ĐẦU VÀO HỌC NGAY BÂY GIỜ 🚀</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 py-8 px-4 sm:px-6 lg:px-8 border-t border-slate-800 text-center text-xs text-slate-400 space-y-2">
        <div className="flex items-center justify-center gap-2 text-slate-300 font-bold">
          <span>🦄 Kids English Agent V6.1 Enterprise</span>
          <span>•</span>
          <span>Designed & Architected with Love for Minh Anh</span>
        </div>
        <p className="text-slate-500">
          Công nghệ: React 18, Vite, TailwindCSS, Web Speech API, SuperMemo SM-2 SRS, 100% Vector SVG Icons.
        </p>
      </footer>

    </div>
  );
}
