import React from 'react';
import {
  Lock, CheckCircle2, Star, Trophy, RotateCw, Play, Crown, Sparkles, Award, MapPin
} from 'lucide-react';

export default function LearningPathView({
  levelId = 'L1',
  levelName = 'Cấp độ L1: Khởi Động',
  topics = [],
  unlockedLevels = new Set(['L1']),
  completedTopics = new Set(),
  topicProgress = {},
  onSelectTopic,
  onStartContinue
}) {

  // Generate 12 sequential Adventure Nodes for this Level
  const adventureNodes = [
    { type: 'start', title: '🥚 Khởi Đầu Phiêu Lưu', icon: '🥚', id: 'start' },
    { type: 'topic', title: topics[0]?.name || '01. Màu sắc', icon: topics[0]?.icon || '🎨', topicId: topics[0]?.id || 'L1-U01' },
    { type: 'topic', title: topics[1]?.name || '02. Số đếm 1-10', icon: topics[1]?.icon || '🔢', topicId: topics[1]?.id || 'L1-U02' },
    { type: 'review', title: '⭐ Smart Review #1', icon: '⭐', id: 'rev-1' },
    { type: 'topic', title: topics[2]?.name || '03. Hình dạng', icon: topics[2]?.icon || '📐', topicId: topics[2]?.id || 'L1-U03' },
    { type: 'topic', title: topics[3]?.name || '04. Gia đình', icon: topics[3]?.icon || '👨‍👩‍👧‍👦', topicId: topics[3]?.id || 'L1-U04' },
    { type: 'game', title: '🎮 Mini Game Hub #1', icon: '🎮', id: 'game-1' },
    { type: 'topic', title: topics[4]?.name || '05. Cơ thể', icon: topics[4]?.icon || '👁️', topicId: topics[4]?.id || 'L1-U05' },
    { type: 'midtest', title: '🏆 Bài Kiểm Tra Giữa Chặng', icon: '🏆', id: 'mid-test' },
    { type: 'topic', title: topics[5]?.name || '06. Động vật', icon: topics[5]?.icon || '🐶', topicId: topics[5]?.id || 'L1-U06' },
    { type: 'topic', title: topics[6]?.name || '07. Đồ ăn', icon: topics[6]?.icon || '🍎', topicId: topics[6]?.id || 'L1-U07' },
    { type: 'finaltest', title: '🎓 Final Level Test & Chứng Nhận', icon: '🎓', id: 'final-test' }
  ];

  const isLevelUnlocked = unlockedLevels.has(levelId);

  return (
    <div className="rounded-3xl border-2 border-cyan-500/40 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 p-6 md:p-8 space-y-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
      
      {/* HEADER BẢN ĐỒ PHIÊU LƯU */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/40 bg-cyan-500/20 px-3.5 py-1 text-xs font-black text-cyan-300">
            <MapPin className="h-3.5 w-3.5 text-cyan-400" />
            <span>BẢN ĐỒ HỌC TẬP TƯƠNG TÁC (LEARNING PATH ROADMAP)</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black font-heading text-white tracking-tight flex items-center gap-2">
            <span>🗺️ Con Đường Phiêu Lưu {levelName}</span>
          </h2>
          <p className="text-xs text-slate-300">
            Học theo lộ trình con đường phiêu lưu: Khởi đầu ➔ Bài học ➔ Mini Game ➔ Ôn tập ➔ Mid-Test ➔ Final Test!
          </p>
        </div>

        {/* CTA NÚT TIẾP TỤC HỌC CHÍNH */}
        <button
          onClick={onStartContinue}
          className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 text-slate-950 text-xs font-black shadow-xl hover:scale-105 transition flex items-center gap-2 border border-amber-300 cursor-pointer animate-pulse"
        >
          <Play className="h-4 w-4 fill-slate-950 text-slate-950" />
          <span>▶ TIẾP TỤC BÀI ĐANG HỌC</span>
        </button>
      </div>

      {/* ADVENTURE ROADMAP PATH (CONNECTED NODES) */}
      <div className="relative py-6 max-w-2xl mx-auto space-y-8">
        
        {/* Curved Connection Line Background */}
        <div className="absolute left-1/2 top-10 bottom-10 w-1.5 -translate-x-1/2 bg-gradient-to-b from-cyan-500 via-amber-400 via-pink-500 to-emerald-400 rounded-full z-0 opacity-40"></div>

        {adventureNodes.map((node, idx) => {
          const isCompleted = completedTopics.has(node.topicId) || idx === 0;
          const isLocked = !isLevelUnlocked && idx > 0;
          const isCurrent = !isCompleted && !isLocked && idx === 1;

          // Alternate left and right alignment for zigzag adventure path
          const isLeft = idx % 2 === 0;

          return (
            <div
              key={idx}
              className={`relative z-10 flex items-center gap-4 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
            >
              {/* Content Card Side */}
              <div className={`w-1/2 ${isLeft ? 'text-right pr-4' : 'text-left pl-4'}`}>
                <div
                  onClick={() => {
                    if (!isLocked && node.topicId) {
                      onSelectTopic?.(node.topicId);
                    }
                  }}
                  className={`inline-block p-4 rounded-3xl border-2 transition-all duration-300 backdrop-blur-xl cursor-pointer shadow-xl ${
                    isCompleted
                      ? 'border-emerald-400 bg-emerald-950/80 hover:scale-105'
                      : isCurrent
                      ? 'border-amber-400 bg-amber-950/90 ring-4 ring-amber-400/50 scale-105 animate-pulse'
                      : isLocked
                      ? 'border-slate-800 bg-slate-950/90 opacity-60'
                      : 'border-cyan-400 bg-slate-900 hover:scale-105'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{node.icon}</span>
                    <div>
                      <div className="text-xs font-black text-white">{node.title}</div>
                      <div className="text-[10px] font-bold text-cyan-300">
                        {isCompleted
                          ? '✅ Hoàn thành xuất sắc'
                          : isCurrent
                          ? '🟡 Đang học ngay'
                          : isLocked
                          ? '🔒 Chưa mở'
                          : '⭐ Mở khóa bài học'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Center Map Node Marker Circle */}
              <div
                className={`relative z-20 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-4 shadow-2xl transition-all duration-300 ${
                  isCompleted
                    ? 'border-emerald-400 bg-emerald-600 text-white scale-110'
                    : isCurrent
                    ? 'border-yellow-300 bg-amber-500 text-slate-950 scale-125 ring-8 ring-amber-400/40'
                    : isLocked
                    ? 'border-slate-700 bg-slate-900 text-slate-500'
                    : 'border-cyan-400 bg-cyan-600 text-white'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="h-7 w-7 text-white" />
                ) : isLocked ? (
                  <Lock className="h-6 w-6 text-slate-400" />
                ) : (
                  <span className="text-xl">{node.icon}</span>
                )}
              </div>

              {/* Empty Spacer Side */}
              <div className="w-1/2"></div>
            </div>
          );
        })}

      </div>
    </div>
  );
}
