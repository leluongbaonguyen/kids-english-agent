import React from 'react';
import { Sparkles } from 'lucide-react';

export default function DataLoadingSpinner({ label = 'Đang tự động nạp dữ liệu siêu nhanh...' }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4 text-center animate-fadeIn">
      <div className="relative flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border-4 border-cyan-500/20 border-t-cyan-400 animate-spin"></div>
        <div className="absolute text-2xl animate-bounce">🦄</div>
      </div>

      <div className="space-y-1">
        <div className="flex items-center justify-center gap-1.5 text-xs font-black text-amber-300 uppercase tracking-widest">
          <Sparkles className="h-4 w-4 text-yellow-300 animate-spin" />
          <span>REAL-TIME ON-DEMAND DATA SYNC</span>
        </div>
        <p className="text-sm font-bold text-slate-300 font-heading">{label}</p>
      </div>
    </div>
  );
}
