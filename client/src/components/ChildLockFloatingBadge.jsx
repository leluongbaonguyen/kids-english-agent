import React from 'react';
import { Lock, Unlock, Clock, Maximize, Minimize, ShieldCheck } from 'lucide-react';
import { useChildLock } from '../contexts/ChildLockContext.jsx';

export default function ChildLockFloatingBadge() {
  const {
    isChildLocked,
    lockedTarget,
    sessionMinutes,
    requestUnlock,
    isFullscreen,
    enterFullscreen,
    exitFullscreen
  } = useChildLock();

  if (!isChildLocked) return null;

  const handleToggleFullscreen = () => {
    if (!isFullscreen) {
      enterFullscreen();
    } else {
      requestUnlock(() => exitFullscreen(), 'Xác thực phụ huynh để thoát Toàn Màn Hình');
    }
  };

  return (
    <aside 
      aria-label="Khóa Trẻ Em Đang Hoạt Động"
      className="fixed top-2 sm:top-3 right-2 sm:right-4 z-[99999998] flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 pl-2.5 sm:pl-3 rounded-2xl bg-slate-950/95 backdrop-blur-xl border-2 border-amber-400 text-white shadow-[0_0_25px_rgba(245,158,11,0.55)] select-none animate-fadeIn max-w-[95vw]"
    >
      {/* Blinking Status Light */}
      <span className="relative flex h-3 w-3 shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500" />
      </span>

      {/* Info Details */}
      <div className="flex flex-col min-w-0 pr-1">
        <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-amber-300">
          <Lock className="h-3.5 w-3.5 shrink-0 text-amber-400" />
          <span className="truncate">KHÓA TRẺ EM ĐANG BẬT</span>
        </div>
        <div className="flex items-center gap-2 text-[9px] sm:text-[10px] text-slate-300 font-medium">
          <span className="flex items-center gap-0.5 text-slate-400">
            <Clock className="h-2.5 w-2.5" /> {sessionMinutes} phút
          </span>
          {lockedTarget?.title && (
            <span className="truncate max-w-[120px] sm:max-w-[200px] text-cyan-300 font-bold">
              • {lockedTarget.title}
            </span>
          )}
        </div>
      </div>

      {/* Kiosk Fullscreen Toggle */}
      <button
        onClick={handleToggleFullscreen}
        className="hidden xs:flex p-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-amber-400/50 text-slate-300 hover:text-white transition cursor-pointer"
        title="Bật/Tắt Toàn Màn Hình (Chống bé bấm thanh trình duyệt)"
      >
        <Maximize className="h-3.5 w-3.5" />
      </button>

      {/* Unlock Button for Parents */}
      <button
        onClick={() => requestUnlock(null, 'Phụ huynh bấm mở khóa Chế độ trẻ em')}
        className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl text-[10px] sm:text-xs font-black bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 shadow-md transition-all active:scale-95 flex items-center gap-1 shrink-0 cursor-pointer"
        title="Nhập mật khẩu để mở khóa hệ thống"
      >
        <Unlock className="h-3.5 w-3.5" />
        <span>Mở Khóa</span>
      </button>
    </aside>
  );
}
