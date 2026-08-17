import React, { useState, useEffect } from 'react';
import { Bell, Smartphone, Share, PlusSquare, CheckCircle2, X } from 'lucide-react';
import { NativePushService } from '../services/nativePushService';

export default function IosPwaInstallPrompt({ addToast }) {
  const [showPrompt, setShowPrompt] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState(
    typeof Notification !== 'undefined' ? Notification.permission : 'default'
  );

  useEffect(() => {
    // Register Service Worker
    NativePushService.registerServiceWorker();
    NativePushService.scheduleDailyReminders();

    // Check if on iOS Safari
    const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isStandalone = window.navigator.standalone || window.matchMedia('(display-mode: standalone)').matches;

    // Show prompt if notification permission is default or if on iOS not yet installed
    if (notificationStatus === 'default' || (isIos && !isStandalone)) {
      const timer = setTimeout(() => setShowPrompt(true), 3000);
      return () => clearTimeout(timer);
    }
  }, [notificationStatus]);

  const handleEnablePush = async () => {
    const res = await NativePushService.requestNotificationPermission();
    if (res.granted) {
      setNotificationStatus('granted');
      addToast?.('🎉 Đã bật thành công thông báo nhắc học trên máy!', 'success');
      setShowPrompt(false);
    } else {
      addToast?.('⚠️ Chưa cấp quyền thông báo. Bé có thể bật lại trong Cài đặt Safari!', 'warning');
    }
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[999995] w-[92%] max-w-md p-4 rounded-3xl border-2 border-cyan-400 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-2xl space-y-3 animate-fadeIn">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-cyan-500/20 border border-cyan-400 text-cyan-300 text-2xl animate-pulse">
            📲
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 text-[9px] font-black uppercase">
                iOS Mobile App Native
              </span>
            </div>
            <h4 className="text-sm font-black font-heading text-yellow-300">
              BẬT THÔNG BÁO NHẮC HỌC NHƯ APP THẬT
            </h4>
          </div>
        </div>

        <button
          onClick={() => setShowPrompt(false)}
          className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <p className="text-xs text-slate-200 leading-relaxed font-medium">
        Bé bấm nút bên dưới để ứng dụng tự động nhắc nhở giờ học 15 phút hàng ngày trên iPhone/iPad nhé!
      </p>

      {/* iOS Instructions */}
      <div className="p-2.5 rounded-2xl bg-slate-950 border border-slate-800 text-[11px] text-slate-300 space-y-1">
        <div className="flex items-center gap-1 text-cyan-300 font-bold">
          <Share className="h-3.5 w-3.5" />
          <span>Cài thành App trên màn hình chính iPhone:</span>
        </div>
        <div className="text-[10px] text-slate-400">
          Bấm nút <strong>Chia sẻ (Share)</strong> trên Safari ➔ Chọn <strong>Thêm vào Màn hình chính (Add to Home Screen)</strong>.
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-1">
        <button
          onClick={() => setShowPrompt(false)}
          className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
        >
          Để Sau
        </button>

        <button
          onClick={handleEnablePush}
          className="btn-white-pink px-4 py-2 rounded-2xl text-xs font-black shadow-lg flex items-center gap-1.5 hover:scale-105 transition cursor-pointer"
        >
          <Bell className="h-4 w-4 text-pink-700 animate-pulse-glow" />
          <span>🔔 Bật Thông Báo iOS Ngay</span>
        </button>
      </div>
    </div>
  );
}
