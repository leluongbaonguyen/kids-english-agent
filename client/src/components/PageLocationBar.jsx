import React from 'react';
import { Home, ChevronRight, Compass, Sparkles, BookOpen, Gamepad2, RotateCw, FileText, UploadCloud, Archive, History, FileCheck } from 'lucide-react';

export const ROUTE_MAP = {
  'home': { slug: 'trang-chu', title: 'Trang Chủ Dashboard', icon: '🏠', path: 'Trang chủ ➔ Tổng quan hệ thống học tập', badge: 'V5.0' },
  'poster': { slug: 'khoa-hoc', title: 'Khóa Học & 90 Bài Học', icon: '🎨', path: 'Trang chủ ➔ Khóa học & Bài học minh họa', badge: '90 Bài' },
  'flashcards': { slug: 'thu-vien-tu-vung', title: 'Thư Viện Từ Vựng', icon: '📚', path: 'Trang chủ ➔ Thư viện 900 từ vựng siêu chi tiết', badge: '900 Từ' },
  'quiz': { slug: 'bai-tap-game', title: 'Bài Tập & Game Center', icon: '🎮', path: 'Trang chủ ➔ Đấu trường trắc nghiệm & Mini-Games', badge: 'Trò Chơi' },
  'review_cycles': { slug: 'chu-ky-on-tap', title: 'Chu Kỳ Ôn Tập SRS', icon: '🔄', path: 'Trang chủ ➔ Thuật toán Spaced Repetition (SRS)', badge: 'Thuật Toán' },
  'db_table': { slug: 'quan-ly-csdl', title: 'Quản Lý CSDL & Excel', icon: '📁', path: 'Hệ thống ➔ Quản trị Cơ sở dữ liệu', badge: 'Admin' },
  'import_wizard': { slug: 'nhap-du-lieu', title: 'Wizard Nhập Dữ Liệu', icon: '📤', path: 'Hệ thống ➔ Nhập / Xuất dữ liệu JSON & Excel', badge: 'Admin' },
  'trash_can': { slug: 'thung-rac', title: 'Thùng Rác Khôi Phục', icon: '🗑️', path: 'Hệ thống ➔ Thùng rác & Khôi phục dữ liệu', badge: 'Admin' },
  'audit_log': { slug: 'nhat-ky-system', title: 'Nhật Ký System Audit', icon: '📜', path: 'Hệ thống ➔ Giám sát lịch sử tác động', badge: 'Admin' },
  'qa_checklist': { slug: 'kiem-thu-qa', title: 'Checklist Kiểm Thử QA', icon: '✅', path: 'Hệ thống ➔ Tiêu chuẩn kiểm thử 100%', badge: 'Admin' },
};

export function PageLocationBar({ activeTab, setActiveTab, currentActor }) {
  const currentRoute = ROUTE_MAP[activeTab] || ROUTE_MAP['home'];
  const currentSlug = currentRoute.slug;
  const isMinhAnh = currentActor === 'minh_anh';

  return (
    <div className="w-full glass-panel rounded-2xl p-2.5 sm:p-3 border border-indigo-500/30 shadow-lg mb-3 flex flex-wrap items-center justify-between gap-2 bg-gradient-to-r from-slate-900/90 via-indigo-950/70 to-slate-900/90 backdrop-blur-md">
      {/* Left: Breadcrumb Path & URL Indicator */}
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-400/40 text-base shadow-sm">
          {currentRoute.icon}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
              <Compass className="h-3 w-3 text-cyan-400 shrink-0" />
              <span>Đường dẫn URL:</span>
            </span>
            <code className="text-[11px] font-extrabold text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded-lg border border-cyan-500/40 font-mono tracking-wide shadow-inner">
              http://localhost:5173/#/{currentSlug}
            </code>
            <span className="px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/40 text-[9px] font-black uppercase tracking-wider">
              {currentRoute.badge}
            </span>
          </div>
          <p className="text-xs sm:text-sm font-black text-slate-100 flex items-center gap-1 mt-0.5 truncate">
            <span className="text-slate-400 font-semibold text-xs">Vị trí hiện tại:</span>
            <span className="text-pink-300 font-bold">{currentRoute.path}</span>
          </p>
        </div>
      </div>

      {/* Right: Quick Tab Switching Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto max-w-full py-1.5 no-scrollbar">
        {Object.entries(ROUTE_MAP).map(([tabKey, info]) => {
          // Hide admin tabs if child mode active
          if (isMinhAnh && ['db_table', 'import_wizard', 'trash_can', 'audit_log', 'qa_checklist'].includes(tabKey)) {
            return null;
          }
          const isActive = activeTab === tabKey;
          return (
            <div key={tabKey} className="relative pt-1">
              {tabKey === 'db_table' && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-sm animate-wiggle pointer-events-none z-10 select-none drop-shadow-md">
                  🧸
                </div>
              )}
              <button
                onClick={() => setActiveTab(tabKey)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] font-bold transition whitespace-nowrap cursor-pointer touch-manipulation border ${
                  isActive
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white border-pink-300 shadow-md scale-105 font-black'
                    : 'bg-slate-800/60 text-slate-300 hover:text-white hover:bg-slate-700/80 border-slate-700/50'
                }`}
              >
                <span>{info.icon}</span>
                <span>{info.title.split(' ')[0]}</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
