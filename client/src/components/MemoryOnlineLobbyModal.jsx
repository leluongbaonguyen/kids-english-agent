import React, { useState } from 'react';
import {
  X, Copy, Check, Users, Wifi, Globe, Share2, Sparkles,
  ArrowRight, ShieldCheck, Play, RotateCw, AlertCircle
} from 'lucide-react';

const AVATAR_OPTIONS = [
  { id: 'girl1', emoji: '👧', name: 'Bé Gái' },
  { id: 'boy1', emoji: '👦', name: 'Bé Trai' },
  { id: 'princess', emoji: '👸', name: 'Công Chúa' },
  { id: 'superhero', emoji: '🦸', name: 'Siêu Nhân' },
  { id: 'astronaut', emoji: '👨‍🚀', name: 'Phi Hành Gia' },
  { id: 'wizard', emoji: '🧙', name: 'Phù Thủy' },
  { id: 'cat', emoji: '🐱', name: 'Mèo Con' },
  { id: 'dog', emoji: '🐶', name: 'Cún Con' },
  { id: 'unicorn', emoji: '🦄', name: 'Kỳ Lân' },
  { id: 'lion', emoji: '🦁', name: 'Sư Tử' }
];

export default function MemoryOnlineLobbyModal({
  isOpen,
  onClose,
  roomCode,
  connectionState, // { status, role, latency, opponentInfo, message }
  onCreateRoom,
  onJoinRoom,
  onStartOnlineMatch,
  addToast
}) {
  const [activeTab, setActiveTab] = useState('create'); // 'create' | 'join'
  const [inputCode, setInputCode] = useState('');
  const [playerName, setPlayerName] = useState(() => {
    try {
      return localStorage.getItem('kids_player_name') || 'Bé Yêu';
    } catch {
      return 'Bé Yêu';
    }
  });
  const [playerAvatar, setPlayerAvatar] = useState(() => {
    try {
      return localStorage.getItem('kids_player_avatar') || '👧';
    } catch {
      return '👧';
    }
  });
  const [hasCopiedCode, setHasCopiedCode] = useState(false);
  const [hasCopiedLink, setHasCopiedLink] = useState(false);

  if (!isOpen) return null;

  const handleCopyCode = () => {
    if (!roomCode) return;
    navigator.clipboard?.writeText(roomCode);
    setHasCopiedCode(true);
    addToast?.(`📋 Đã sao chép mã phòng: ${roomCode}`, 'success');
    setTimeout(() => setHasCopiedCode(false), 2000);
  };

  const handleCopyLink = () => {
    if (!roomCode) return;
    const origin = window.location.origin;
    const pathname = window.location.pathname;
    const fullUrl = `${origin}${pathname}#/game-lat-the?room=${roomCode}`;
    navigator.clipboard?.writeText(fullUrl);
    setHasCopiedLink(true);
    addToast?.(`🔗 Đã sao chép link phòng trực tiếp! Gửi qua Zalo/tin nhắn nhé!`, 'success');
    setTimeout(() => setHasCopiedLink(false), 2500);
  };

  const handleSaveProfile = (name, avatar) => {
    setPlayerName(name);
    setPlayerAvatar(avatar);
    try {
      localStorage.setItem('kids_player_name', name);
      localStorage.setItem('kids_player_avatar', avatar);
    } catch {}
  };

  const isConnected = connectionState?.status === 'connected';
  const isWaiting = connectionState?.status === 'waiting';
  const isConnecting = connectionState?.status === 'connecting';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fadeIn select-none">
      <div className="glass-panel w-full max-w-xl rounded-3xl border-2 border-indigo-400/60 bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950/90 shadow-2xl overflow-hidden relative flex flex-col max-h-[92vh]">
        {/* Top Rainbow Stripe */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-pink-500 via-amber-400 to-cyan-400" />

        {/* Modal Header */}
        <div className="flex items-center justify-between p-3.5 sm:p-5 border-b border-white/10 bg-slate-900/80">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="p-2 sm:p-2.5 rounded-2xl bg-gradient-to-tr from-cyan-600 to-indigo-600 text-white text-xl sm:text-2xl shadow-md border border-cyan-300/40">
              🌐
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-base sm:text-lg font-black text-white font-heading">
                  ĐẤU ONLINE 2 MÁY KHÁC NHAU
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">
                  Real-Time P2P
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-slate-300 font-medium mt-0.5">
                Chơi trực tiếp 2 máy tính / điện thoại qua mã phòng hoặc link chia sẻ
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer border border-white/10"
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-3.5 sm:p-6 overflow-y-auto space-y-4 flex-1">
          
          {/* 1. Custom Player Profile Selector */}
          <div className="p-3 sm:p-4 rounded-2xl bg-slate-950/70 border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10.5px] sm:text-xs font-black uppercase tracking-wider text-slate-300">
                1. Thông Tin Của Bé
              </span>
              <span className="text-[10px] text-pink-300 font-medium">
                Hiện thị với đối thủ
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="h-11 w-11 rounded-2xl bg-gradient-to-tr from-pink-500/30 to-purple-600/30 border border-pink-400/60 flex items-center justify-center text-2xl shrink-0 shadow-inner">
                {playerAvatar}
              </div>
              <input
                type="text"
                value={playerName}
                onChange={(e) => handleSaveProfile(e.target.value, playerAvatar)}
                placeholder="Nhập tên bé..."
                maxLength={20}
                className="flex-1 rounded-xl bg-slate-900 border border-slate-700 px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-pink-500 font-bold placeholder-slate-500"
              />
            </div>

            {/* Quick Avatar Pickers */}
            <div className="flex items-center gap-1.5 overflow-x-auto py-1 no-scrollbar">
              {AVATAR_OPTIONS.map(av => (
                <button
                  key={av.id}
                  onClick={() => handleSaveProfile(playerName, av.emoji)}
                  className={`h-8 w-8 sm:h-9 sm:w-9 rounded-xl flex items-center justify-center text-lg sm:text-xl shrink-0 transition-transform cursor-pointer border ${
                    playerAvatar === av.emoji
                      ? 'border-pink-400 bg-pink-500/30 scale-110 shadow-md ring-2 ring-pink-400/50'
                      : 'border-slate-800 bg-slate-900 hover:border-slate-700'
                  }`}
                  title={av.name}
                >
                  {av.emoji}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Mode Selector Tabs: Create Room vs Join Room */}
          <div className="grid grid-cols-2 p-1 rounded-2xl bg-slate-950 border border-white/10 gap-1 text-xs font-black">
            <button
              onClick={() => setActiveTab('create')}
              className={`py-2 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'create'
                  ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>🏠 Tạo Phòng Mới (Chủ Nhà)</span>
            </button>
            <button
              onClick={() => setActiveTab('join')}
              className={`py-2 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'join'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>🚀 Vào Phòng Có Sẵn</span>
            </button>
          </div>

          {/* TAB CONTENT: CREATE ROOM */}
          {activeTab === 'create' && (
            <div className="space-y-3.5">
              {!roomCode ? (
                <div className="text-center py-4">
                  <button
                    onClick={() => onCreateRoom({ name: playerName, avatar: playerAvatar })}
                    className="w-full py-3.5 rounded-2xl font-black text-sm bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 text-white shadow-xl hover:scale-102 active:scale-98 transition flex items-center justify-center gap-2 border border-pink-400/60 cursor-pointer"
                  >
                    <Sparkles className="h-5 w-5 text-yellow-300 animate-spin" />
                    <span>TẠO MÃ PHÒNG THI ĐẤU NGAY</span>
                  </button>
                </div>
              ) : (
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/90 border border-pink-500/40 text-center space-y-3 relative overflow-hidden">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Mã Phòng Thi Đấu Của Bạn
                  </div>

                  {/* Room Code Badge */}
                  <div className="inline-flex items-center justify-center px-6 py-2.5 rounded-2xl bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-500/20 border-2 border-pink-400 shadow-[0_0_25px_rgba(244,114,182,0.4)]">
                    <span className="text-2xl sm:text-3xl font-black font-mono-code text-white tracking-widest">
                      {roomCode}
                    </span>
                  </div>

                  {/* Copy Actions */}
                  <div className="flex items-center justify-center gap-2 flex-wrap">
                    <button
                      onClick={handleCopyCode}
                      className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-900 border border-pink-500/40 text-pink-300 hover:text-white hover:bg-pink-950 transition flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      {hasCopiedCode ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4 text-pink-400" />}
                      <span>{hasCopiedCode ? 'Đã Chép Mã!' : 'Sao Chép Mã'}</span>
                    </button>

                    <button
                      onClick={handleCopyLink}
                      className="px-3.5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md hover:scale-105 transition flex items-center gap-1.5 cursor-pointer border border-cyan-400/50"
                    >
                      {hasCopiedLink ? <Check className="h-4 w-4 text-emerald-300" /> : <Share2 className="h-4 w-4 text-cyan-200" />}
                      <span>{hasCopiedLink ? 'Đã Chép Link!' : 'Gửi Link Tham Gia'}</span>
                    </button>
                  </div>

                  {/* Connection Status Box */}
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs">
                    {isConnected ? (
                      <div className="flex items-center justify-center gap-2 text-emerald-300 font-bold animate-fadeIn">
                        <Check className="h-4 w-4 text-emerald-400" />
                        <span>
                          Đối thủ <strong>{connectionState.opponentInfo?.name || 'Người chơi 2'}</strong> ({connectionState.opponentInfo?.avatar || '👦'}) đã vào phòng!
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2 text-amber-300 font-medium">
                        <RotateCw className="h-4 w-4 animate-spin text-amber-400" />
                        <span>Đang chờ máy thứ 2 nhập mã hoặc click link...</span>
                      </div>
                    )}
                  </div>

                  {/* Host Start Match Trigger */}
                  {isConnected && (
                    <button
                      onClick={onStartOnlineMatch}
                      className="w-full py-3 rounded-2xl font-black text-sm bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-slate-950 shadow-xl hover:scale-102 active:scale-98 transition flex items-center justify-center gap-2 border border-emerald-300 cursor-pointer animate-pulse"
                    >
                      <Play className="h-4 w-4 fill-slate-950" />
                      <span>BẮT ĐẦU TRẬN ĐẤU NGAY!</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB CONTENT: JOIN ROOM */}
          {activeTab === 'join' && (
            <div className="space-y-3.5">
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/90 border border-cyan-500/40 text-center space-y-3">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Nhập Mã Phòng Từ Bạn Bè (Ví dụ: KIDS-123)
                </div>

                <div className="max-w-xs mx-auto">
                  <input
                    type="text"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value.toUpperCase().replace(/\s+/g, ''))}
                    placeholder="VD: STAR-782"
                    maxLength={12}
                    className="w-full rounded-2xl bg-slate-900 border-2 border-cyan-500/60 px-4 py-3 text-center text-xl sm:text-2xl font-black font-mono-code text-cyan-300 tracking-widest focus:outline-none focus:border-pink-500 placeholder-slate-600"
                  />
                </div>

                <button
                  disabled={!inputCode.trim() || isConnecting}
                  onClick={() => onJoinRoom(inputCode, { name: playerName, avatar: playerAvatar })}
                  className={`w-full py-3.5 rounded-2xl font-black text-sm transition flex items-center justify-center gap-2 shadow-xl cursor-pointer ${
                    inputCode.trim() && !isConnecting
                      ? 'bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 text-white hover:scale-102 border border-cyan-400/60'
                      : 'bg-slate-900 text-slate-600 border border-slate-800 cursor-not-allowed opacity-60'
                  }`}
                >
                  {isConnecting ? (
                    <>
                      <RotateCw className="h-5 w-5 animate-spin" />
                      <span>Đang kết nối phòng {inputCode}...</span>
                    </>
                  ) : (
                    <>
                      <span>VÀO THI ĐẤU NGAY</span>
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </button>

                {connectionState?.message && (
                  <p className="text-xs text-slate-400 font-medium">
                    {connectionState.message}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Educational Safety & Guide Note */}
          <div className="p-3 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 flex items-start gap-2.5 text-xs text-slate-300">
            <ShieldCheck className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
            <div className="space-y-0.5 text-[11px] leading-relaxed">
              <span className="font-bold text-white block">💡 Mẹo thi đấu 2 máy siêu mượt:</span>
              <span>
                Hai bạn nhỏ chỉ cần chung mạng Wi-Fi hoặc có kết nối mạng internet. Khi một bên lật thẻ, bên kia sẽ nhìn thấy chuyển động tức thì!
              </span>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-3 sm:p-4 border-t border-white/10 bg-slate-900/80 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
            <Globe className="h-3.5 w-3.5 text-pink-400" />
            <span>Mạng P2P WebRTC trực tiếp • Độ trễ cực thấp</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold border border-white/10 transition cursor-pointer"
          >
            Đóng
          </button>
        </div>

      </div>
    </div>
  );
}
