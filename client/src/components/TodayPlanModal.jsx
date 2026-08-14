import React, { useState } from 'react';
import { X, Calendar, Sparkles, CheckCircle2, Clock, Play, Award, Zap, RefreshCw, Star, ShieldCheck } from 'lucide-react';

export default function TodayPlanModal({
  isOpen,
  onClose,
  learnerName = 'Bé Minh Anh',
  totalStars = 120,
  streakDays = 5,
  dueReviewCount = 8,
  onStartLesson,
  onStartReview,
  onStartGame,
  addToast
}) {
  if (!isOpen) return null;

  const [activeStep, setActiveStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([1]); // step 1 done sample

  const dailyBlocks = [
    {
      id: 1,
      time: '2–3 phút',
      title: '🔄 Ôn Từ Vựng Đã Học (SRS Due Review)',
      subtitle: `${dueReviewCount} từ cần ôn lặp ngắt quãng hôm nay để tránh quên!`,
      icon: '🧠',
      tag: 'Smart SRS',
      color: 'from-amber-500 to-orange-500 border-amber-400 text-amber-300',
      actionText: 'Bắt Đầu Ôn Ngay',
      action: onStartReview
    },
    {
      id: 2,
      time: '3–5 phút',
      title: '📖 Bài Học Mới Theo Lộ Trình L1',
      subtitle: 'Nhìn ➔ Nghe ➔ Nói ➔ Quiz 11 bước tương tác',
      icon: '🎯',
      tag: 'Core Lesson',
      color: 'from-pink-500 to-purple-500 border-pink-400 text-pink-300',
      actionText: 'Vào Bài Học Mới',
      action: onStartLesson
    },
    {
      id: 3,
      time: '2–3 phút',
      title: '🎤 Luyện Nói AI & Phonics Lab',
      subtitle: 'Luyện thu âm phát âm chuẩn giọng Anh - Mỹ cùng AI Tutor',
      icon: '🎙️',
      tag: 'Skill Focus',
      color: 'from-cyan-500 to-blue-500 border-cyan-400 text-cyan-300',
      actionText: 'Mở Phonics & Mic',
      action: () => addToast?.('🎙️ Mở phòng luyện phát âm AI!', 'info')
    },
    {
      id: 4,
      time: '1–3 phút',
      title: '🎮 Củng Cố Bằng 8 Mini Games',
      subtitle: 'Đập bóng từ vựng, Feed the Monster & Memory Match',
      icon: '👾',
      tag: 'Game Center',
      color: 'from-emerald-500 to-teal-500 border-emerald-400 text-emerald-300',
      actionText: 'Vào Game Center',
      action: onStartGame
    },
    {
      id: 5,
      time: '1 phút',
      title: '🏆 Thử Thách Hằng Ngày (Daily Challenge)',
      subtitle: 'Hoàn thành 3 bài tập xuất sắc để nhận 50 Ngôi Sao Bonus',
      icon: '🎁',
      tag: 'Reward Target',
      color: 'from-yellow-400 to-amber-500 border-yellow-300 text-yellow-300',
      actionText: 'Nhận Thử Thách',
      action: () => addToast?.('🌟 Bạn đã kích hoạt Thử thách hàng ngày!', 'success')
    }
  ];

  const toggleStepComplete = (stepId) => {
    if (completedSteps.includes(stepId)) {
      setCompletedSteps(completedSteps.filter(s => s !== stepId));
    } else {
      setCompletedSteps([...completedSteps, stepId]);
      addToast?.(`🎉 Tuyệt vời! ${learnerName} đã hoàn thành chặng ${stepId}!`, 'success');
    }
  };

  const overallProgress = Math.round((completedSteps.length / dailyBlocks.length) * 100);

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-slate-950/90 backdrop-blur-2xl p-3 sm:p-6 overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-xl sm:max-w-2xl max-h-[85vh] md:max-h-[88vh] overflow-y-auto rounded-3xl border-2 border-amber-400/60 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 p-4 sm:p-6 space-y-4 text-white shadow-2xl custom-scrollbar">

        {/* HEADER BAR */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-slate-950 text-2xl shadow-lg font-black animate-pulse">
              📅
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 text-[10px] font-black uppercase tracking-wider">
                  Today Plan V3 • 15 Phút Học Mỗi Ngày
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-black font-heading text-white">
                KẾ HOẠCH HỌC TẬP HÔM NAY DÀNH CHO {learnerName.toUpperCase()}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-2xl bg-rose-950 border border-rose-500/40 text-rose-300 hover:bg-rose-900 transition cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* PROGRESS OVERVIEW CARD */}
        <div className="p-5 rounded-3xl border-2 border-amber-400/40 bg-gradient-to-r from-amber-950/80 via-slate-900 to-purple-950/80 shadow-xl space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-yellow-300 animate-spin" />
              <span className="text-sm font-black text-amber-300 font-heading">
                Tiến Độ Hoàn Thành Hôm Nay: {overallProgress}%
              </span>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono-code font-bold">
              <span className="px-3 py-1 rounded-full bg-slate-950 text-amber-300 border border-amber-400/40 flex items-center gap-1">
                🔥 Streak: {streakDays} Ngày
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-950 text-yellow-300 border border-yellow-400/40 flex items-center gap-1">
                ⭐ {totalStars} Sao
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-3 rounded-full bg-slate-950 border border-slate-800 overflow-hidden p-0.5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-400 via-pink-500 to-emerald-400 transition-all duration-500"
              style={{ width: `${overallProgress}%` }}
            />
          </div>

          <p className="text-xs text-slate-300 italic">
            💡 "Học 15 phút mỗi ngày đều đặn giúp bé ghi nhớ lâu hơn gấp 3 lần so with học dồn!"
          </p>
        </div>

        {/* DAILY 5 BLOCKS TIMELINE */}
        <div className="space-y-3">
          <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-2">
            <Clock className="h-4 w-4 text-amber-400" />
            <span>Lộ Trình 5 Bước Cá Nhân Hóa (Tổng 15 Phút):</span>
          </h3>

          {dailyBlocks.map((block) => {
            const isDone = completedSteps.includes(block.id);
            return (
              <div
                key={block.id}
                className={`p-4 sm:p-5 rounded-3xl border-2 transition space-y-3 shadow-lg relative ${
                  isDone
                    ? 'border-emerald-500/80 bg-emerald-950/30'
                    : 'border-slate-800 bg-slate-900/90 hover:border-amber-400/50'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span className="text-3xl sm:text-4xl p-2 rounded-2xl bg-slate-950 border border-slate-800 shrink-0">
                      {block.icon}
                    </span>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-slate-950 text-slate-300 border border-slate-800">
                          ⏱️ {block.time}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-purple-500/20 text-purple-300 border border-purple-400/40">
                          {block.tag}
                        </span>
                        {isDone && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-400 flex items-center gap-1">
                            <CheckCircle2 className="h-3 w-3" /> Đã Hoàn Thành
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm sm:text-base font-black text-white font-heading">
                        {block.title}
                      </h4>
                      <p className="text-xs text-slate-300 font-medium">{block.subtitle}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleStepComplete(block.id)}
                    className={`p-2 rounded-2xl border transition shrink-0 ${
                      isDone
                        ? 'bg-emerald-600 text-white border-emerald-400'
                        : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                    }`}
                    title={isDone ? 'Bấm để đánh dấu chưa xong' : 'Bấm đánh dấu đã hoàn thành'}
                  >
                    <CheckCircle2 className="h-5 w-5" />
                  </button>
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    onClick={() => {
                      if (block.action) block.action();
                      onClose();
                    }}
                    className={`px-4 py-2 rounded-2xl font-black text-xs shadow-lg transition flex items-center gap-1.5 cursor-pointer bg-gradient-to-r ${block.color}`}
                  >
                    <Play className="h-4 w-4 fill-current" />
                    <span>{block.actionText}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* PARENT CONTROLS RECOMMENDATION */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-400 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>Phụ huynh có thể điều chỉnh thời lượng học hằng ngày trong Parent Dashboard.</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 font-bold text-xs hover:bg-slate-700 transition"
          >
            Đóng Màn Hình
          </button>
        </div>

      </div>
    </div>
  );
}
