import React from 'react';
import { Flame, Clock, Trophy, Sparkles, Zap, Award, Bot, User, CheckCircle2 } from 'lucide-react';

export default function MemoryPvpArenaBar({
  pvpMode, // 'pass_and_play' | 'online_pvp' | 'vs_ai'
  player1,
  player2,
  activeTurn, // 'p1' | 'p2'
  turnTimer, // seconds remaining (e.g. 15 to 0)
  maxTurnTime = 15,
  isBonusTurn = false,
  aiSpeech = '',
  aiLevel = 'owl',
  totalPairs = 6,
  connectionStatus = 'connected',
  latency = 0,
  isMyTurn = true // for online pvp: is it local device's turn
}) {
  // Calculate advantage percentage (50% is tied)
  const totalScore = (player1.score || 0) + (player2.score || 0);
  const p1Ratio = totalScore === 0 ? 50 : Math.round(((player1.score || 0) / totalScore) * 100);
  const p2Ratio = 100 - p1Ratio;

  // Timer ring calculation (SVG circle)
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (turnTimer / maxTurnTime) * circumference;

  const isUrgent = turnTimer <= 3;
  const isWarning = turnTimer <= 6 && !isUrgent;

  return (
    <div className="w-full glass-panel rounded-2xl sm:rounded-3xl p-2.5 sm:p-4 border-2 border-indigo-500/40 bg-gradient-to-r from-slate-950 via-indigo-950/80 to-slate-950 shadow-2xl relative overflow-hidden mb-3 sm:mb-4">
      {/* Top Ambient Glow Line */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-pink-500 via-amber-400 to-cyan-400" />

      {/* Main Grid: Player 1 VS Player 2 */}
      <div className="grid grid-cols-12 items-center gap-1.5 sm:gap-3">
        
        {/* ========================================================================= */}
        {/* PLAYER 1 CARD (Left)                                                      */}
        {/* ========================================================================= */}
        <div
          className={`col-span-5 sm:col-span-4 p-2 sm:p-3 rounded-2xl transition-all duration-300 relative border flex items-center gap-2 sm:gap-3 ${
            activeTurn === 'p1'
              ? 'bg-gradient-to-br from-pink-950/90 via-purple-950/80 to-slate-900 border-pink-400 shadow-[0_0_20px_rgba(244,114,182,0.4)] scale-102 ring-2 ring-pink-400/50'
              : 'bg-slate-950/70 border-slate-800/80 opacity-80'
          }`}
        >
          {/* Active Turn Pulse Ribbon */}
          {activeTurn === 'p1' && (
            <div className="absolute -top-2 left-3 px-2 py-0.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white text-[8px] sm:text-[9.5px] font-black uppercase tracking-wider shadow-md animate-pulse flex items-center gap-1">
              <span>🎯</span>
              <span>Đang Lật</span>
              {isBonusTurn && (
                <span className="bg-yellow-300 text-slate-950 px-1 rounded font-extrabold ml-0.5 animate-bounce">
                  +1 LƯỢT
                </span>
              )}
            </div>
          )}

          {/* Avatar Container */}
          <div className="relative shrink-0">
            <div className={`h-11 w-11 sm:h-14 sm:w-14 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl shadow-inner border-2 ${
              activeTurn === 'p1' ? 'border-pink-300 bg-pink-500/20' : 'border-slate-700 bg-slate-800'
            }`}>
              <span>{player1.avatar || '👧'}</span>
            </div>
            {player1.streak > 1 && (
              <div className="absolute -bottom-1 -right-1 px-1 py-0.2 rounded-md bg-amber-500 text-slate-950 text-[8px] sm:text-[9px] font-black border border-yellow-200 shadow">
                🔥x{player1.streak}
              </div>
            )}
          </div>

          {/* Player 1 Stats */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1 truncate">
              <span className="text-[11px] sm:text-sm font-black text-white font-heading truncate">
                {player1.name || 'Người Chơi 1'}
              </span>
              {pvpMode === 'online_pvp' && (
                <span className="text-[8px] px-1 py-0.2 rounded bg-pink-500/20 text-pink-300 border border-pink-400/30 shrink-0">
                  Bạn
                </span>
              )}
            </div>

            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-base sm:text-2xl font-black font-mono-code text-pink-300 drop-shadow">
                {player1.score || 0}
              </span>
              <span className="text-[9px] sm:text-[11px] text-slate-400 font-medium">điểm</span>
            </div>

            <div className="flex items-center gap-1 text-[9px] sm:text-[10px] text-slate-300 mt-0.5 font-mono-code">
              <Trophy className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-yellow-400" />
              <span>{player1.pairsCount || 0}/{totalPairs} Cặp</span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CENTER ARENA (Timer, VS, Tug-of-War Bar)                                  */}
        {/* ========================================================================= */}
        <div className="col-span-2 sm:col-span-4 flex flex-col items-center justify-center text-center px-1">
          {/* Turn Countdown Circular Meter */}
          <div className="relative flex items-center justify-center">
            <svg className="w-12 h-12 sm:w-16 sm:h-16 transform -rotate-90">
              <circle
                cx="50%"
                cy="50%"
                r={radius}
                className="stroke-slate-800"
                strokeWidth="4"
                fill="transparent"
              />
              <circle
                cx="50%"
                cy="50%"
                r={radius}
                className={`transition-all duration-300 ${
                  isUrgent
                    ? 'stroke-rose-500 animate-pulse'
                    : isWarning
                    ? 'stroke-amber-400'
                    : 'stroke-cyan-400'
                }`}
                strokeWidth="4"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>

            {/* Center Seconds Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`font-black font-mono-code leading-none ${
                isUrgent
                  ? 'text-base sm:text-xl text-rose-400 animate-bounce'
                  : isWarning
                  ? 'text-sm sm:text-lg text-amber-300'
                  : 'text-xs sm:text-base text-white'
              }`}>
                {turnTimer}s
              </span>
              <span className="text-[7px] sm:text-[8px] font-bold text-slate-400 uppercase tracking-tighter hidden sm:block">
                Lượt
              </span>
            </div>
          </div>

          {/* VS Emblem & Turn Label */}
          <div className="flex items-center gap-1 mt-1">
            <div className="px-1.5 py-0.5 rounded-full bg-gradient-to-r from-pink-600 via-amber-500 to-cyan-600 text-slate-950 font-black text-[9px] sm:text-[10px] tracking-wider uppercase shadow flex items-center gap-0.5">
              <Flame className="h-2.5 w-2.5 text-yellow-200 fill-yellow-200 animate-pulse" />
              <span>VS</span>
            </div>
          </div>

          {/* Online P2P Network Badge */}
          {pvpMode === 'online_pvp' && (
            <div className="hidden sm:flex items-center gap-1 text-[8.5px] font-mono-code text-slate-400 mt-1">
              <span className={`h-1.5 w-1.5 rounded-full ${
                connectionStatus === 'connected' ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'
              }`} />
              <span>{latency > 0 ? `${latency}ms` : 'P2P Real-time'}</span>
            </div>
          )}

          {/* Tug-of-War Advantage Ratio Bar (Esports Style) */}
          <div className="w-full max-w-[130px] sm:max-w-[180px] h-2 rounded-full bg-slate-900 border border-white/10 overflow-hidden flex mt-1.5 shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-500"
              style={{ width: `${p1Ratio}%` }}
              title={`Người chơi 1: ${p1Ratio}%`}
            />
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500"
              style={{ width: `${p2Ratio}%` }}
              title={`Người chơi 2: ${p2Ratio}%`}
            />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PLAYER 2 / AI CARD (Right)                                                */}
        {/* ========================================================================= */}
        <div
          className={`col-span-5 sm:col-span-4 p-2 sm:p-3 rounded-2xl transition-all duration-300 relative border flex items-center justify-end gap-2 sm:gap-3 text-right ${
            activeTurn === 'p2'
              ? 'bg-gradient-to-bl from-cyan-950/90 via-blue-950/80 to-slate-900 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.4)] scale-102 ring-2 ring-cyan-400/50'
              : 'bg-slate-950/70 border-slate-800/80 opacity-80'
          }`}
        >
          {/* Active Turn Pulse Ribbon */}
          {activeTurn === 'p2' && (
            <div className="absolute -top-2 right-3 px-2 py-0.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-[8px] sm:text-[9.5px] font-black uppercase tracking-wider shadow-md animate-pulse flex items-center gap-1">
              {isBonusTurn && (
                <span className="bg-yellow-300 text-slate-950 px-1 rounded font-extrabold mr-0.5 animate-bounce">
                  +1 LƯỢT
                </span>
              )}
              <span>Đang Lật</span>
              <span>🎯</span>
            </div>
          )}

          {/* Player 2 Stats */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-end gap-1 truncate">
              {pvpMode === 'vs_ai' && (
                <span className="text-[8px] px-1 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 shrink-0">
                  AI
                </span>
              )}
              <span className="text-[11px] sm:text-sm font-black text-white font-heading truncate">
                {player2.name || (pvpMode === 'vs_ai' ? 'Máy AI' : 'Người Chơi 2')}
              </span>
            </div>

            <div className="flex items-baseline justify-end gap-1.5 mt-0.5">
              <span className="text-base sm:text-2xl font-black font-mono-code text-cyan-300 drop-shadow">
                {player2.score || 0}
              </span>
              <span className="text-[9px] sm:text-[11px] text-slate-400 font-medium">điểm</span>
            </div>

            <div className="flex items-center justify-end gap-1 text-[9px] sm:text-[10px] text-slate-300 mt-0.5 font-mono-code">
              <span>{player2.pairsCount || 0}/{totalPairs} Cặp</span>
              <Trophy className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-yellow-400" />
            </div>
          </div>

          {/* Avatar Container */}
          <div className="relative shrink-0">
            <div className={`h-11 w-11 sm:h-14 sm:w-14 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl shadow-inner border-2 ${
              activeTurn === 'p2' ? 'border-cyan-300 bg-cyan-500/20' : 'border-slate-700 bg-slate-800'
            }`}>
              <span>{player2.avatar || (pvpMode === 'vs_ai' ? '🐼' : '👦')}</span>
            </div>
            {player2.streak > 1 && (
              <div className="absolute -bottom-1 -left-1 px-1 py-0.2 rounded-md bg-amber-500 text-slate-950 text-[8px] sm:text-[9px] font-black border border-yellow-200 shadow">
                🔥x{player2.streak}
              </div>
            )}
          </div>

          {/* AI Cute Floating Speech Bubble */}
          {pvpMode === 'vs_ai' && aiSpeech && activeTurn === 'p2' && (
            <div className="absolute -bottom-8 right-2 bg-slate-900 border border-cyan-400/80 px-2.5 py-1 rounded-xl text-[10px] sm:text-xs text-cyan-200 font-bold shadow-lg animate-bounce z-20 flex items-center gap-1 whitespace-nowrap">
              <span>💭</span>
              <span>{aiSpeech}</span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
