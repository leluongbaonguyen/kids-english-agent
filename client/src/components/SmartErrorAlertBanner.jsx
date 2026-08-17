import React from 'react';
import { AlertTriangle, X, Wrench, ShieldAlert } from 'lucide-react';

export default function SmartErrorAlertBanner({ activeError, onClose, onSelfDiagnose }) {
  if (!activeError) return null;

  return (
    <div className="fixed top-2 left-1/2 -translate-x-1/2 z-[999999] w-full max-w-xl p-3 bg-rose-950/95 border-2 border-rose-500/80 rounded-2xl shadow-[0_0_30px_rgba(244,63,94,0.4)] text-white backdrop-blur-xl animate-bounceIn flex items-center justify-between gap-3">
      <div className="flex items-center gap-3 overflow-hidden">
        <div className="p-2 rounded-xl bg-rose-600 text-white shrink-0 shadow animate-pulse">
          <AlertTriangle className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-black text-xs text-rose-200 uppercase tracking-wider flex items-center gap-1">
              <ShieldAlert className="h-3.5 w-3.5 text-rose-400" />
              SMART ERROR TELEMETRY DETECTED
            </span>
          </div>
          <p className="text-xs font-bold text-white truncate font-mono-code">
            {activeError.message || activeError.error || 'Cảnh báo sự cố kết nối hoặc dữ liệu'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={() => onSelfDiagnose?.(activeError)}
          className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition cursor-pointer flex items-center gap-1 shadow"
        >
          <Wrench className="h-3.5 w-3.5" />
          <span>Tự Chẩn Đoán</span>
        </button>

        <button
          onClick={onClose}
          className="p-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
