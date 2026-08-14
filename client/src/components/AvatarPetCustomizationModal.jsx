import React, { useState } from 'react';
import { X, Sparkles, Trophy, Star, CheckCircle2, Lock, Heart, Wand2 } from 'lucide-react';

export default function AvatarPetCustomizationModal({
  isOpen,
  onClose,
  totalXP = 420,
  addToast
}) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('pet'); // pet, avatar
  const [selectedPetStage, setSelectedPetStage] = useState(1); // 1 = Baby Unicorn, 2 = Magic Unicorn, 3 = Super Rainbow Unicorn
  const [equippedHat, setEquippedHat] = useState('👑 Vương Miện');
  const [equippedShirt, setEquippedShirt] = useState('👕 Áo Siêu Nhân');

  const hats = [
    { name: '👑 Vương Miện', xpReq: 0, icon: '👑' },
    { name: '🧢 Mũ Lưỡi Trai', xpReq: 100, icon: '🧢' },
    { name: '🎩 Mũ Phù Thủy', xpReq: 300, icon: '🎩' },
    { name: '🎓 Mũ Cử Nhân', xpReq: 500, icon: '🎓' }
  ];

  const petDialogue = [
    'Bé ơi! Cùng học 5 từ mới tiếng Anh hôm nay nhé! 🦄',
    'Xuất sắc lắm bé ơi! Lumi rất tự hào về bé! 🌟',
    'Bé có biết "Cat" là con mèo không nè? 🐱',
    'Ôn tập chăm chỉ để rồng Lumi tiến hóa thành Kỳ Lân Cầu Vồng nhé! 🌈'
  ];

  const [dialogueIdx, setDialogueIdx] = useState(0);

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-slate-950/95 backdrop-blur-2xl p-3 sm:p-6 overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-3xl max-h-[85vh] md:max-h-[88vh] overflow-y-auto rounded-3xl border-2 border-purple-500/50 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 p-4 sm:p-6 space-y-4 text-white shadow-2xl custom-scrollbar">
        
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-purple-600/20 border border-purple-500/40 text-purple-400 text-3xl">
              🦄
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black font-heading text-white">
                THÚ CỦ NƯƠNG LUMI & TÙY CHỈNH AVATAR
              </h2>
              <p className="text-xs text-slate-300">Tùy chỉnh trang phục bé và chăm sóc bạn Kỳ Lân Lumi đồng hành!</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-2xl bg-rose-950 border border-rose-500/40 text-rose-300 hover:bg-rose-900 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* PET LUMI INTERACTIVE DISPLAY */}
        <div className="p-6 rounded-3xl border-2 border-purple-400/50 bg-gradient-to-r from-purple-950 via-slate-950 to-pink-950 text-center space-y-4 shadow-2xl relative overflow-hidden">
          
          {/* PET SPEECH BUBBLE */}
          <div
            onClick={() => setDialogueIdx((prev) => (prev + 1) % petDialogue.length)}
            className="max-w-md mx-auto p-3.5 rounded-2xl bg-slate-900 border border-purple-400 text-xs font-black text-pink-300 shadow-xl cursor-pointer hover:scale-105 transition"
          >
            💬 Lumi nói: "{petDialogue[dialogueIdx]}" (Bấm để đổi câu nói)
          </div>

          {/* PET SPRITE ANIMATION */}
          <div className="text-8xl animate-bounce drop-shadow-2xl">
            {selectedPetStage === 1 ? '🦄' : selectedPetStage === 2 ? '🐉' : '🌈🦄'}
          </div>

          <div className="space-y-1">
            <h3 className="text-xl font-black font-heading text-yellow-300">
              Kỳ Lân Lumi • Cấp Độ {selectedPetStage}
            </h3>
            <p className="text-xs text-slate-400">Tiến hóa theo tổng XP học tập của bé!</p>
          </div>

          {/* PET EVOLUTION PROGRESS BAR */}
          <div className="max-w-md mx-auto space-y-1 font-mono-code text-xs font-bold">
            <div className="flex justify-between text-purple-300">
              <span>Tiến hóa Cấp tiếp theo:</span>
              <span className="text-yellow-300">{totalXP} / 500 XP</span>
            </div>
            <div className="h-3 w-full bg-slate-950 rounded-full border border-slate-800 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-amber-400 rounded-full" style={{ width: `${Math.min(100, (totalXP / 500) * 100)}%` }}></div>
            </div>
          </div>
        </div>

        {/* HAT / ITEM UNLOCKS GRID */}
        <div className="space-y-3">
          <h4 className="text-xs font-black uppercase text-purple-300 tracking-wider">Trang Phục Mũ Đã Mở Khóa:</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {hats.map((h, idx) => {
              const isUnlocked = totalXP >= h.xpReq;
              const isEquipped = equippedHat === h.name;

              return (
                <button
                  key={idx}
                  onClick={() => {
                    if (isUnlocked) {
                      setEquippedHat(h.name);
                      addToast?.(`👑 Đã mặc trang phục ${h.name}!`, 'success');
                    } else {
                      addToast?.(`🔒 Cần đạt ${h.xpReq} XP để mở khóa!`, 'warning');
                    }
                  }}
                  className={`p-3 rounded-2xl border-2 transition text-center space-y-1 cursor-pointer ${
                    isEquipped
                      ? 'border-yellow-400 bg-amber-950 text-white font-black scale-105'
                      : isUnlocked
                      ? 'border-purple-500/50 bg-slate-900 text-slate-200'
                      : 'border-slate-800 bg-slate-950 text-slate-600 opacity-60'
                  }`}
                >
                  <div className="text-3xl">{h.icon}</div>
                  <div className="text-xs font-bold">{h.name}</div>
                  <div className="text-[10px] text-amber-300 font-mono-code">
                    {isUnlocked ? (isEquipped ? '✅ Đang Mặc' : 'Mở Khóa') : `🔒 ${h.xpReq} XP`}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
