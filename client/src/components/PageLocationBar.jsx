import React from 'react';
import { Compass } from 'lucide-react';

export const ROUTE_MAP = {
  'intro': { slug: 'gioi-thieu', title: 'Trang Giới Thiệu (Hero Intro)', icon: '✨', path: 'Trang giới thiệu', badge: 'HERO' },
  'home': { slug: 'trang-chu', title: 'Trang Chủ Dashboard', icon: '🏠', path: 'Trang chủ', badge: 'MAIN' },
  'daily_path': { slug: 'lo-trinh-15-phut', title: '🎯 Lộ Trình 15 Phút', icon: '🎯', path: 'Lộ trình học 15 phút', badge: '15 MIN' },
  'detailed_path': { slug: 'lo-trinh-6-cap-do', title: '🗺️ Lộ Trình 6 Cấp Độ Siêu Chi Tiết', icon: '🗺️', path: 'Lộ trình 6 cấp độ', badge: 'L1 - L6' },
  'poster': { slug: 'khoa-hoc', title: 'Khóa Học & 90 Bài Học', icon: '🎨', path: 'Khóa học', badge: '90 Bài' },
  'flashcards': { slug: 'thu-vien-tu-vung', title: 'Thư Viện Từ Vựng', icon: '📚', path: 'Thư viện từ vựng', badge: '900 Từ' },
  'quiz': { slug: 'bai-tap-game', title: 'Bài Tập & Game Center', icon: '🎮', path: 'Bài tập & Games', badge: 'Games' },
  'games': { slug: 'games', title: 'Bài Tập & Trò Chơi Mini Games', icon: '🎮', path: 'Bài tập & Games', badge: 'Games' },
  'review_cycles': { slug: 'chu-ky-on-tap', title: 'Chu Kỳ Ôn Tập SRS', icon: '🔄', path: 'Chu kỳ SRS', badge: 'SRS' },
  'db_table': { slug: 'quan-ly-csdl', title: 'Quản Lý CSDL & Excel', icon: '📁', path: 'Admin CSDL', badge: 'Admin' },
  'import_wizard': { slug: 'nhap-du-lieu', title: 'Wizard Nhập Dữ Liệu', icon: '📤', path: 'Nhập dữ liệu', badge: 'Admin' },
  'trash_can': { slug: 'thung-rac', title: 'Thùng Rác Khôi Phục', icon: '🗑️', path: 'Thùng rác', badge: 'Admin' },
  'audit_log': { slug: 'nhat-ky-system', title: 'Nhật Ký System Audit', icon: '📜', path: 'Audit Log', badge: 'Admin' },
  'qa_checklist': { slug: 'kiem-thu-qa', title: 'Checklist Kiểm Thử QA', icon: '✅', path: 'QA Checklist', badge: 'Admin' },
};

export function PageLocationBar({ activeTab }) {
  const currentRoute = ROUTE_MAP[activeTab] || ROUTE_MAP['home'];

  return (
    <div className="w-full glass-panel rounded-xl px-3 py-1.5 border border-pink-500/25 shadow-sm mb-2.5 flex items-center justify-between text-xs bg-slate-900/80 backdrop-blur-md">
      <div className="flex items-center gap-2 text-slate-300 font-semibold truncate">
        <span className="text-pink-300 text-sm">{currentRoute.icon}</span>
        <span className="text-slate-400 text-[11px]">Vị trí:</span>
        <span className="font-extrabold text-white truncate">{currentRoute.title}</span>
        <span className="px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-400/40 text-[9px] font-black uppercase">
          {currentRoute.badge}
        </span>
      </div>
      <div className="hidden sm:flex items-center gap-1 font-mono-code text-[11px] text-cyan-300 bg-cyan-950/80 px-2.5 py-0.5 rounded-lg border border-cyan-500/30">
        <span>#/{currentRoute.slug}</span>
      </div>
    </div>
  );
}
