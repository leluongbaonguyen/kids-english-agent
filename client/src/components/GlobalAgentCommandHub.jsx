import React from 'react';
import {
  X,
  Zap,
  Users,
  FileText,
  Bot,
  Sliders,
  ShieldCheck,
  Award,
  BookOpen,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export default function GlobalAgentCommandHub({
  isOpen,
  onClose,
  activeTab,
  setActiveTab,
  currentActor,
  onSwitchActor,
  onOpenCMS,
  onOpenAiModal,
  onOpenHomework,
  onOpenUserProfile,
  onOpenAdminCrud
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-2xl rounded-3xl bg-slate-900/75 backdrop-blur-2xl border-2 border-pink-500/40 p-6 space-y-6 shadow-[0_0_50px_rgba(236,72,153,0.3)] text-white overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Top Glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-pink-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 shadow-lg text-white">
              <Zap className="h-6 w-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-lg font-black font-heading tracking-wide flex items-center gap-2">
                <span>⚡ MENU ẨN AGENT COMMAND HUB V7.0</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-400/40 font-mono-code font-bold">
                  ADMIN ONLY
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Trung tâm điều hành nhanh & lối tắt hệ thống tác nhân AI dành riêng cho Quản trị viên
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* ACTOR SWITCHER BAR */}
        <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-purple-500/30 space-y-2 relative z-10">
          <span className="text-[10px] font-black text-purple-300 uppercase tracking-wider block">
            👤 CHỌN VAI TRÒ ĐIỀU HÀNH HỆ THỐNG (ACTOR ROLE)
          </span>
          <div className="grid grid-cols-3 gap-2 text-xs font-bold">
            {[
              { id: 'bao_nguyen', name: 'Ba Bảo Nguyên', role: 'Super Admin 👨‍💼', color: 'from-purple-600 to-indigo-600' },
              { id: 'minh_anh', name: 'Bé Minh Anh', role: 'Học Viên L1 👧', color: 'from-pink-600 to-purple-600' },
              { id: 'gia_bao', name: 'Bé Gia Bảo', role: 'Học Viên L2 👦', color: 'from-cyan-600 to-blue-600' },
            ].map((actor) => {
              const isSelected = currentActor === actor.id;
              return (
                <button
                  key={actor.id}
                  onClick={() => onSwitchActor?.(actor.id)}
                  className={`p-2.5 rounded-xl border transition flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? `bg-gradient-to-r ${actor.color} text-white border-white/40 shadow-lg`
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  <div>
                    <div className="font-black text-xs">{actor.name}</div>
                    <div className="text-[10px] opacity-80">{actor.role}</div>
                  </div>
                  {isSelected && <CheckCircle2 className="h-4 w-4 text-white" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* QUICK COMMAND ACTION GRID */}
        <div className="space-y-2 relative z-10">
          <span className="text-[10px] font-black text-pink-300 uppercase tracking-wider block">
            ⚡ LỐI TẮT THAO TÁC CẤP TỐC (QUICK COMMANDS)
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              {
                title: 'Hồ Sơ & PIN',
                desc: 'Đổi mật khẩu & PIN phụ huynh',
                icon: Users,
                color: 'text-cyan-400 border-cyan-500/30 hover:border-cyan-400',
                action: () => { onClose(); onOpenUserProfile?.(); }
              },
              {
                title: 'Bài Tập Về Nhà',
                desc: 'Chấm điểm & phản hồi',
                icon: FileText,
                color: 'text-amber-400 border-amber-500/30 hover:border-amber-400',
                action: () => { onClose(); onOpenHomework?.(); }
              },
              {
                title: 'Trợ Lý AI Agent',
                desc: 'Trò chuyện & phát âm IPA',
                icon: Bot,
                color: 'text-pink-400 border-pink-500/30 hover:border-pink-400',
                action: () => { onClose(); onOpenAiModal?.(); }
              },
              {
                title: 'Soạn Thảo CMS',
                desc: 'Biên tập giáo trình & từ vựng',
                icon: BookOpen,
                color: 'text-emerald-400 border-emerald-500/30 hover:border-emerald-400',
                action: () => { onClose(); onOpenCMS?.(); }
              },
              {
                title: 'Super CRUD Studio',
                desc: 'Truy xuất dữ liệu siêu nâng cao',
                icon: Sliders,
                color: 'text-purple-400 border-purple-500/30 hover:border-purple-400',
                action: () => { onClose(); onOpenAdminCrud?.(); }
              },
              {
                title: 'Quản Trị Admin',
                desc: 'Mở Admin Control Center',
                icon: ShieldCheck,
                color: 'text-indigo-400 border-indigo-500/30 hover:border-indigo-400',
                action: () => { onClose(); setActiveTab?.('admin'); }
              }
            ].map((cmd, idx) => {
              const IconComp = cmd.icon;
              return (
                <button
                  key={idx}
                  onClick={cmd.action}
                  className={`p-3 rounded-2xl bg-slate-950 border ${cmd.color} transition flex flex-col justify-between text-left space-y-2 group cursor-pointer hover:scale-105 shadow-md`}
                >
                  <div className="flex items-center justify-between">
                    <IconComp className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    <Sparkles className="h-3 w-3 text-slate-500 group-hover:text-amber-300" />
                  </div>
                  <div>
                    <div className="font-black text-xs text-white">{cmd.title}</div>
                    <div className="text-[10px] text-slate-400 line-clamp-1">{cmd.desc}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* FOOTER */}
        <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 relative z-10">
          <span className="flex items-center gap-1 font-mono-code">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            Hệ thống Agent V7.0 đang hoạt động ổn định
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold transition cursor-pointer"
          >
            Đóng Hub
          </button>
        </div>
      </div>
    </div>
  );
}
