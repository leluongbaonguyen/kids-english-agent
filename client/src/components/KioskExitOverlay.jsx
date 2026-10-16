import React from 'react';
import { ShieldAlert, Maximize2, Lock, Unlock, Sparkles, CheckCircle } from 'lucide-react';
import { useChildLock } from '../contexts/ChildLockContext.jsx';

/**
 * KioskExitOverlay
 * Appears whenever Child Lock is active but the window is NOT in fullscreen mode.
 * Blocks all interaction and prompts the user/child to return to Fullscreen mode,
 * or allows parents to enter their PIN to unlock.
 */
export default function KioskExitOverlay() {
  const {
    isChildLocked,
    isFullscreen,
    lockedTarget,
    enterFullscreen,
    requestUnlock,
    isUnlockModalOpen
  } = useChildLock();

  // Only show if locked and NOT currently fullscreen, and unlock modal is not blocking
  if (!isChildLocked || isFullscreen) return null;

  const handleReturnToFullscreen = (e) => {
    e?.stopPropagation();
    enterFullscreen();
  };

  const handleParentUnlock = (e) => {
    e?.stopPropagation();
    requestUnlock(null, 'Phụ huynh xác thực để thoát chế độ Toàn màn hình');
  };

  return (
    <div
      className="fixed inset-0 z-[99999990] flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-2xl text-white select-none animate-fadeIn cursor-pointer"
      onClick={handleReturnToFullscreen}
      title="Chạm bất cứ đâu để vào lại Toàn Màn Hình"
    >
      {/* Background Animated Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div
        className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl border-2 border-amber-400 bg-gradient-to-b from-slate-900 via-slate-950 to-indigo-950 shadow-[0_0_80px_rgba(245,158,11,0.5)] text-center space-y-5 animate-scaleIn cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Shield Icon Badge */}
        <div className="inline-flex items-center justify-center p-4 rounded-3xl bg-amber-500/20 border-2 border-amber-400/80 text-amber-300 shadow-[0_0_30px_rgba(245,158,11,0.4)]">
          <ShieldAlert className="h-12 w-12 sm:h-14 sm:w-14 text-amber-400 animate-bounce" />
        </div>

        {/* Title */}
        <div className="space-y-2">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-black bg-amber-400/20 text-amber-300 border border-amber-400/50 uppercase tracking-widest">
            🛡️ BẢO VỆ CHỐNG THOÁT KHỎI ỨNG DỤNG
          </span>
          <h2 className="text-xl sm:text-2xl font-black font-heading text-white tracking-tight">
            Chế Độ Khóa Trẻ Em Đang Bật!
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed max-w-md mx-auto">
            Ứng dụng cần được chạy ở chế độ <strong className="text-amber-300 font-bold">Toàn Màn Hình</strong> để ngăn bé bấm nhầm ra ngoài trình duyệt hoặc đóng ứng dụng.
          </p>
        </div>

        {/* Current Active Lesson Info */}
        {lockedTarget?.title && (
          <div className="p-3 rounded-2xl bg-slate-900/90 border border-cyan-500/40 text-left flex items-center gap-3">
            <span className="text-2xl">🎯</span>
            <div className="min-w-0 flex-1">
              <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">
                Nội Dung Được Phép Học Duy Nhất:
              </div>
              <div className="text-xs sm:text-sm font-black text-white truncate">
                {lockedTarget.title}
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="space-y-3 pt-2">
          {/* Big Action: Return to Fullscreen */}
          <button
            onClick={handleReturnToFullscreen}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black text-sm sm:text-base transition-all transform active:scale-95 shadow-[0_0_30px_rgba(245,158,11,0.6)] flex items-center justify-center gap-2 cursor-pointer"
          >
            <Maximize2 className="h-5 w-5 shrink-0" />
            <span>VÀO LẠI TOÀN MÀN HÌNH ĐỂ TIẾP TỤC HỌC</span>
          </button>

          {/* Secondary Action: Parent Unlock PIN */}
          <button
            onClick={handleParentUnlock}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-amber-400/50 text-slate-300 hover:text-white font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <Lock className="h-4 w-4 text-amber-400" />
            <span>Ba / Mẹ Nhập Mật Khẩu Để Mở Khóa Hoặc Thoát</span>
          </button>
        </div>

        {/* Quick Hint */}
        <div className="text-[11px] text-slate-400 pt-1">
          💡 Bạn có thể bấm vào bất kỳ vị trí nào trên màn hình để ngay lập tức trở lại toàn màn hình.
        </div>
      </div>
    </div>
  );
}
