import React from 'react';
import { CheckCircle2, AlertTriangle, Info, AlertCircle, X } from 'lucide-react';

export function ToastContainer({ toasts }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-24 right-4 sm:bottom-6 sm:right-6 z-[9999] flex flex-col gap-2.5 max-w-sm sm:max-w-md w-auto pointer-events-none font-sans select-none px-2">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';
        const isWarning = toast.type === 'warning';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between p-4 rounded-2xl border shadow-2xl backdrop-blur-xl animate-toast-in ${
              isSuccess
                ? 'bg-emerald-950/90 border-emerald-500/50 text-emerald-100'
                : isError
                ? 'bg-rose-950/90 border-rose-500/50 text-rose-100'
                : isWarning
                ? 'bg-amber-950/90 border-amber-500/50 text-amber-100'
                : 'bg-slate-900/95 border-pink-500/40 text-pink-100'
            }`}
          >
            <div className="flex items-center gap-3 pr-2">
              {isSuccess && <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />}
              {isError && <AlertCircle className="h-5 w-5 text-rose-400 shrink-0" />}
              {isWarning && <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0" />}
              {!isSuccess && !isError && !isWarning && <Info className="h-5 w-5 text-pink-400 shrink-0" />}

              <span className="text-xs font-black leading-snug">{toast.message}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
