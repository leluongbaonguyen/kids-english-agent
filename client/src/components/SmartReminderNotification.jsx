import React, { useState, useEffect } from 'react';
import { Sparkles, Bell, X, Flame, Play, ShieldCheck, CheckCircle2, RotateCw } from 'lucide-react';

export default function SmartReminderNotification({
  learnerName = 'Bé Minh Anh',
  onOpenTodayPlan,
  addToast
}) {
  const [showReminder, setShowReminder] = useState(false);
  const [reminderMessage, setReminderMessage] = useState('');

  const reminderPresets = [
    `⏰ Bé ${learnerName} ơi! Đến giờ học 15 phút rèn luyện phản xạ Tiếng Anh hôm nay rồi! 🦄`,
    `🔥 Bé đã giữ chuỗi học 5 ngày liên tục! Vào làm Today Plan để nhận 50 ⭐ Bonus nhé!`,
    `🧠 Thuật toán SRS nhắc nhở: Có 8 từ vựng cũ cần bé ôn lặp ngắt quãng ngay để không bị quên!`,
    `🎙️ AI Phonics Coach vừa sẵn sàng! Cùng thu âm luyện phát âm giọng Anh-Mỹ chuẩn nhé! 🎤`
  ];

  useEffect(() => {
    // Tự động nhắc nhở sau 10 giây khi khởi chạy ứng dụng
    const timer = setTimeout(() => {
      const randomMsg = reminderPresets[Math.floor(Math.random() * reminderPresets.length)];
      setReminderMessage(randomMsg);
      setShowReminder(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, [learnerName]);

  if (!showReminder) return null;

  return (
    <div className="fixed bottom-20 right-4 z-[999990] max-w-sm w-full p-4 rounded-3xl border-2 border-amber-400 bg-gradient-to-br from-slate-900 via-amber-950/80 to-slate-950 text-white shadow-2xl animate-bounce space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-2xl bg-amber-500/20 border border-amber-400 text-2xl text-amber-300">
            🦄
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 text-[9px] font-black uppercase">
                Tự Động Nhắc Nhở Thông Minh (Auto System)
              </span>
            </div>
            <h4 className="text-xs font-black font-heading text-yellow-300">
              LUMI MASCOT NHẮC HỌC TẬP
            </h4>
          </div>
        </div>

        <button
          onClick={() => setShowReminder(false)}
          className="p-1 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <p className="text-xs text-slate-200 font-medium leading-relaxed">
        {reminderMessage}
      </p>

      <div className="flex justify-end gap-2 pt-1">
        <button
          onClick={() => setShowReminder(false)}
          className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-[11px] font-bold"
        >
          Bỏ Qua
        </button>
        <button
          onClick={() => {
            setShowReminder(false);
            if (onOpenTodayPlan) onOpenTodayPlan();
          }}
          className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 text-[11px] font-black shadow-lg flex items-center gap-1 cursor-pointer hover:scale-105 transition"
        >
          <Play className="h-3.5 w-3.5 fill-current" />
          <span>Vào Học Ngay</span>
        </button>
      </div>
    </div>
  );
}
