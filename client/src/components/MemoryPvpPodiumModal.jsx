import React from 'react';
import { Trophy, Crown, Sparkles, RotateCw, BookOpen, X, Award, Flame, Star } from 'lucide-react';

export default function MemoryPvpPodiumModal({
  isOpen,
  onClose,
  player1,
  player2,
  pvpMode, // 'pass_and_play' | 'online_pvp' | 'vs_ai'
  totalPairs,
  onRematch,
  onOpenVocabReview,
  rematchWaiting = false
}) {
  if (!isOpen) return null;

  // Determine winner
  const p1Score = player1.score || 0;
  const p2Score = player2.score || 0;
  const isTie = p1Score === p2Score;
  const winner = p1Score > p2Score ? 'p1' : (p2Score > p1Score ? 'p2' : 'tie');

  const p1IsWinner = winner === 'p1';
  const p2IsWinner = winner === 'p2';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fadeIn select-none">
      <div className="glass-panel w-full max-w-xl rounded-3xl border-2 border-yellow-400/80 bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950/95 shadow-[0_0_60px_rgba(250,204,21,0.4)] overflow-hidden relative flex flex-col max-h-[94vh]">
        {/* Top Rainbow Stripe */}
        <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-pink-500 via-amber-400 to-cyan-400" />

        {/* Modal Header */}
        <div className="p-4 sm:p-5 text-center relative border-b border-white/10 bg-slate-900/60">
          <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-yellow-400/20 text-yellow-300 border border-yellow-400/40 text-[10px] sm:text-xs font-black uppercase tracking-wider mb-1.5 shadow">
            <Trophy className="h-3.5 w-3.5 text-yellow-400" />
            <span>KẾT QUẢ TRẬN ĐẤU ĐỐI KHÁNG</span>
          </div>

          <h2 className="text-xl sm:text-3xl font-black text-white font-heading tracking-tight uppercase">
            {isTie ? (
              <span className="text-amber-300 drop-shadow">🤝 HÒA NHAU XUẤT SẮC!</span>
            ) : winner === 'p1' ? (
              <span className="bg-gradient-to-r from-pink-400 via-purple-300 to-yellow-300 bg-clip-text text-transparent">
                👑 {player1.name} CHIẾN THẮNG!
              </span>
            ) : (
              <span className="bg-gradient-to-r from-cyan-400 via-blue-300 to-yellow-300 bg-clip-text text-transparent">
                👑 {player2.name} CHIẾN THẮNG!
              </span>
            )}
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
            Cả 2 bạn đã cùng chinh phục thành công toàn bộ <strong>{totalPairs} cặp từ vựng</strong> tiếng Anh!
          </p>
        </div>

        {/* Body: 3D Victory Podium */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">
          
          {/* PODIUM PEDESTALS */}
          <div className="flex items-end justify-center gap-3 sm:gap-6 pt-6 pb-2">
            
            {/* Left Pedestal: Player 1 */}
            <div className={`flex flex-col items-center flex-1 max-w-[170px] transition-all duration-500 ${
              p1IsWinner || isTie ? 'order-1' : 'order-2'
            }`}>
              {/* Crown for Winner */}
              {(p1IsWinner || isTie) && (
                <div className="text-2xl sm:text-3xl animate-bounce mb-1">
                  👑
                </div>
              )}

              {/* Avatar */}
              <div className={`relative h-16 w-16 sm:h-20 sm:w-20 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl shadow-xl border-3 ${
                p1IsWinner || isTie
                  ? 'border-yellow-400 bg-pink-500/30 ring-4 ring-yellow-400/40 shadow-[0_0_20px_rgba(250,204,21,0.5)]'
                  : 'border-slate-700 bg-slate-800'
              }`}>
                <span>{player1.avatar || '👧'}</span>
                {p1IsWinner && (
                  <div className="absolute -bottom-2 px-2 py-0.5 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 font-black text-[9px] uppercase shadow border border-white">
                    Hạng 1
                  </div>
                )}
              </div>

              <div className="mt-2 text-center w-full">
                <div className="font-black text-white text-xs sm:text-sm truncate">
                  {player1.name}
                </div>
                <div className="text-pink-300 font-black font-mono-code text-sm sm:text-lg">
                  {player1.score} <span className="text-[10px] text-slate-400">điểm</span>
                </div>
                <div className="text-[10px] text-slate-300 font-mono-code">
                  {player1.pairsCount || 0} Cặp ăn được
                </div>
              </div>

              {/* 3D Pedestal Block */}
              <div className={`w-full rounded-t-2xl flex items-center justify-center font-black text-slate-950 text-xl font-heading shadow-xl mt-2 border-t-2 border-x-2 ${
                p1IsWinner || isTie
                  ? 'h-24 sm:h-28 bg-gradient-to-b from-yellow-400 via-amber-400 to-amber-600 border-yellow-200'
                  : 'h-16 sm:h-20 bg-gradient-to-b from-slate-400 via-slate-500 to-slate-700 border-slate-300 text-white'
              }`}>
                {p1IsWinner || isTie ? '1 🥇' : '2 🥈'}
              </div>
            </div>

            {/* Right Pedestal: Player 2 */}
            <div className={`flex flex-col items-center flex-1 max-w-[170px] transition-all duration-500 ${
              p2IsWinner ? 'order-1' : 'order-2'
            }`}>
              {/* Crown for Winner */}
              {p2IsWinner && (
                <div className="text-2xl sm:text-3xl animate-bounce mb-1">
                  👑
                </div>
              )}

              {/* Avatar */}
              <div className={`relative h-16 w-16 sm:h-20 sm:w-20 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl shadow-xl border-3 ${
                p2IsWinner
                  ? 'border-yellow-400 bg-cyan-500/30 ring-4 ring-yellow-400/40 shadow-[0_0_20px_rgba(250,204,21,0.5)]'
                  : 'border-slate-700 bg-slate-800'
              }`}>
                <span>{player2.avatar || '👦'}</span>
                {p2IsWinner && (
                  <div className="absolute -bottom-2 px-2 py-0.5 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 font-black text-[9px] uppercase shadow border border-white">
                    Hạng 1
                  </div>
                )}
              </div>

              <div className="mt-2 text-center w-full">
                <div className="font-black text-white text-xs sm:text-sm truncate">
                  {player2.name}
                </div>
                <div className="text-cyan-300 font-black font-mono-code text-sm sm:text-lg">
                  {player2.score} <span className="text-[10px] text-slate-400">điểm</span>
                </div>
                <div className="text-[10px] text-slate-300 font-mono-code">
                  {player2.pairsCount || 0} Cặp ăn được
                </div>
              </div>

              {/* 3D Pedestal Block */}
              <div className={`w-full rounded-t-2xl flex items-center justify-center font-black text-slate-950 text-xl font-heading shadow-xl mt-2 border-t-2 border-x-2 ${
                p2IsWinner
                  ? 'h-24 sm:h-28 bg-gradient-to-b from-yellow-400 via-amber-400 to-amber-600 border-yellow-200'
                  : 'h-16 sm:h-20 bg-gradient-to-b from-slate-400 via-slate-500 to-slate-700 border-slate-300 text-white'
              }`}>
                {p2IsWinner ? '1 🥇' : '2 🥈'}
              </div>
            </div>

          </div>

          {/* Detailed Match Comparison Grid */}
          <div className="p-3 sm:p-4 rounded-2xl bg-slate-950/80 border border-white/10 space-y-2 text-xs font-mono-code">
            <div className="text-center text-[10.5px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Thống Kê Chi Tiết Trận Đấu
            </div>

            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-pink-300 font-bold">{player1.score}</span>
              <span className="text-slate-400 font-sans font-bold">Tổng Điểm Trận Đấu</span>
              <span className="text-cyan-300 font-bold">{player2.score}</span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-pink-300 font-bold">{player1.pairsCount || 0}</span>
              <span className="text-slate-400 font-sans font-bold">Số Cặp Thẻ Ghép Được</span>
              <span className="text-cyan-300 font-bold">{player2.pairsCount || 0}</span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-pink-300 font-bold">x{player1.maxStreak || 1}</span>
              <span className="text-slate-400 font-sans font-bold">Chuỗi Thắng Dài Nhất</span>
              <span className="text-cyan-300 font-bold">x{player2.maxStreak || 1}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-2 flex-wrap pt-1">
            <button
              onClick={onRematch}
              disabled={rematchWaiting}
              className={`w-full sm:w-auto px-5 py-3 rounded-2xl font-black text-xs transition flex items-center justify-center gap-2 shadow-xl cursor-pointer ${
                rematchWaiting
                  ? 'bg-amber-950 text-amber-300 border border-amber-500/50 cursor-wait'
                  : 'bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-slate-950 hover:scale-105 active:scale-95 border border-emerald-300 animate-pulse'
              }`}
            >
              <RotateCw className={`h-4 w-4 ${rematchWaiting ? 'animate-spin' : ''}`} />
              <span>{rematchWaiting ? 'Đang Chờ Đối Thủ Đồng Ý...' : 'Tái Đấu Trận Mới (Rematch)'}</span>
            </button>

            <button
              onClick={() => { onClose(); onOpenVocabReview(); }}
              className="w-full sm:w-auto px-4 py-3 rounded-2xl font-black text-xs bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-xl hover:scale-105 transition flex items-center justify-center gap-1.5 border border-pink-400 cursor-pointer"
            >
              <BookOpen className="h-4 w-4 text-pink-200" />
              <span>Xem Lại Sổ Từ Vựng ({totalPairs} Từ)</span>
            </button>

            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2.5 rounded-2xl text-xs font-bold bg-slate-900 border border-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
            >
              Đóng
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
