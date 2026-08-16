import React from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import DailyPath5StepSection from './DailyPath5StepSection.jsx';

export default function TodayPlanModal({
  isOpen,
  onClose,
  learnerName = 'Bé Minh Anh',
  totalStars = 120,
  streakDays = 5,
  selectedLevel = 'L1',
  vocabDatabase = [],
  masteredCards = [],
  onStartLesson,
  onStartReview,
  onStartPhonics,
  onStartGame,
  onAddStars,
  addToast
}) {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-slate-950/95 backdrop-blur-md p-2 sm:p-4 overflow-y-auto animate-fadeIn cursor-pointer" onClick={onClose}>
      <div className="relative w-full max-w-3xl max-h-[88vh] overflow-y-auto my-auto rounded-3xl border-2 border-emerald-500/50 bg-slate-950 p-2 sm:p-4 text-white shadow-2xl custom-scrollbar cursor-default" onClick={(e) => e.stopPropagation()}>
        
        {/* CLOSE BUTTON AT TOP RIGHT */}
        <div className="flex justify-end p-2 sticky top-0 z-50">
          <button
            onClick={onClose}
            className="p-2 rounded-2xl bg-rose-950 border border-rose-500/40 text-rose-300 hover:bg-rose-900 transition cursor-pointer shadow-lg"
            title="Đóng cửa sổ"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* UNIFIED 5-STEP PERSONALIZED LEARNING PATH SECTION */}
        <DailyPath5StepSection
          learnerName={learnerName}
          totalStars={totalStars}
          streakDays={streakDays}
          selectedLevel={selectedLevel}
          vocabDatabase={vocabDatabase}
          masteredCards={masteredCards}
          onStartLesson={() => {
            onStartLesson?.();
            onClose();
          }}
          onStartReview={() => {
            onStartReview?.();
            onClose();
          }}
          onStartPhonics={() => {
            onStartPhonics?.();
            onClose();
          }}
          onStartGame={() => {
            onStartGame?.();
            onClose();
          }}
          onAddStars={onAddStars}
          addToast={addToast}
        />

      </div>
    </div>,
    document.body
  );
}
