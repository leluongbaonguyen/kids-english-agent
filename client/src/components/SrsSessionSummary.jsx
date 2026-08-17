import React from 'react';
import { Trophy, Star, Sparkles, CheckCircle2, RotateCw, ArrowRight, ShieldCheck, Flame } from 'lucide-react';

export default function SrsSessionSummary({
  completedCount = 5,
  starsEarned = 15,
  xpEarned = 150,
  weakWords = [],
  onClose,
  onPracticeWeakWords
}) {
  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4 animate-fadeIn font-sans">
      <div className="w-full max-w-lg rounded-3xl border-2 border-purple-500/60 bg-gradient-to-br from-purple-950 via-slate-900 to-slate-950 p-6 md:p-8 space-y-6 shadow-[0_0_50px_rgba(168,85,247,0.4)] text-white text-center">
        
        {/* Top Trophy Icon */}
        <div className="relative inline-flex items-center justify-center h-20 w-20 rounded-3xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-slate-950 shadow-2xl border-2 border-yellow-200 mx-auto animate-bounce">
          <Trophy className="h-10 w-10 fill-current text-slate-950" />
        </div>

        <div>
          <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 text-[10px] font-black uppercase tracking-wider">
            🎉 HOÀN THÀNH PHIÊN ÔN TẬP SRS
          </span>
          <h2 className="text-2xl font-black font-heading text-yellow-300 mt-2">
            XUẤT SẮC LẮM BÉ ƠI!
          </h2>
          <p className="text-xs text-slate-300 font-medium mt-1">
            Bé đã hoàn thành xuất sắc chu kỳ ghi nhớ dài hạn hôm nay!
          </p>
        </div>

        {/* Rewards Summary Grid */}
        <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-purple-950/60 border border-purple-500/30">
          <div className="space-y-1">
            <span className="text-[10px] text-purple-300 font-bold uppercase block">Đã Ôn Tập</span>
            <span className="text-xl font-black font-mono-code text-white">{completedCount}</span>
            <span className="text-[10px] text-slate-400 block">từ vựng</span>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] text-amber-300 font-bold uppercase block">Thưởng Sao</span>
            <span className="text-xl font-black font-mono-code text-yellow-300 flex items-center justify-center gap-1">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              +{starsEarned}
            </span>
            <span className="text-[10px] text-slate-400 block">Siêu Sao ⭐</span>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] text-pink-300 font-bold uppercase block">Kinh Nghiệm</span>
            <span className="text-xl font-black font-mono-code text-pink-300">+{xpEarned}</span>
            <span className="text-[10px] text-slate-400 block">XP</span>
          </div>
        </div>

        {/* Weak Words List if any */}
        {weakWords.length > 0 && (
          <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/30 text-left space-y-2">
            <div className="flex items-center justify-between text-xs font-black text-rose-300">
              <span>⚠️ Cần Rèn Luyện Thêm ({weakWords.length} từ):</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {weakWords.map((w, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-xl bg-rose-900/60 text-rose-200 border border-rose-400/30 text-xs font-bold">
                  {w.word || w}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-3 pt-2">
          {weakWords.length > 0 && onPracticeWeakWords && (
            <button
              onClick={onPracticeWeakWords}
              className="px-4 py-2.5 rounded-2xl bg-slate-800 text-slate-200 font-bold text-xs hover:bg-slate-700 transition"
            >
              🔄 Ôn Lại Từ Khó
            </button>
          )}

          <button
            onClick={onClose}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs shadow-xl hover:scale-105 transition cursor-pointer flex items-center gap-1.5"
          >
            <span>Hoàn Thành & Trở Về</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
