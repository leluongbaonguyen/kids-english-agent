import React, { useState, useEffect, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { ShieldAlert, ShieldCheck, Lock, Unlock, X, Delete, KeyRound, HelpCircle, RefreshCw, Check, Monitor, Download, Smartphone, Laptop, Shield } from 'lucide-react';
import { useChildLock } from '../contexts/ChildLockContext.jsx';

export default function ParentalUnlockModal() {
  const {
    isUnlockModalOpen,
    unlockPromptReason,
    closeUnlockModal,
    unlockWithPin,
    emergencyUnlock,
    changePin,
    playKeyClick
  } = useChildLock();

  const [enteredDigits, setEnteredDigits] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [shakeKey, setShakeKey] = useState(0);
  const [activeTab, setActiveTab] = useState('pin'); // 'pin' | 'math' | 'change_pin'

  // Change PIN state
  const [oldPinInput, setOldPinInput] = useState('');
  const [newPinInput, setNewPinInput] = useState('');
  const [confirmPinInput, setConfirmPinInput] = useState('');
  const [changePinError, setChangePinError] = useState('');
  const [changePinSuccess, setChangePinSuccess] = useState(false);

  // Math Challenge State
  const [mathProblem, setMathProblem] = useState(() => generateMathProblem());
  const [mathAnswer, setMathAnswer] = useState('');
  const [mathError, setMathError] = useState('');

  function generateMathProblem() {
    const num1 = Math.floor(Math.random() * 40) + 18;
    const num2 = Math.floor(Math.random() * 40) + 15;
    return {
      num1,
      num2,
      result: num1 + num2,
      question: `${num1} + ${num2} = ?`
    };
  }

  // Reset inputs when modal opens
  useEffect(() => {
    if (isUnlockModalOpen) {
      setEnteredDigits('');
      setErrorMessage('');
      setActiveTab('pin');
      setMathAnswer('');
      setMathError('');
      setMathProblem(generateMathProblem());
      setOldPinInput('');
      setNewPinInput('');
      setConfirmPinInput('');
      setChangePinError('');
      setChangePinSuccess(false);
    }
  }, [isUnlockModalOpen]);

  // Handle digit press
  const handlePressDigit = (digit) => {
    playKeyClick?.();
    setErrorMessage('');
    if (enteredDigits.length < 4) {
      const nextDigits = enteredDigits + digit;
      setEnteredDigits(nextDigits);

      // Auto-validate on 4th digit
      if (nextDigits.length === 4) {
        setTimeout(() => {
          const res = unlockWithPin(nextDigits);
          if (!res.success) {
            setErrorMessage(res.error || 'Mật khẩu phụ huynh không đúng!');
            setShakeKey((k) => k + 1);
            setEnteredDigits('');
          }
        }, 120);
      }
    }
  };

  const handleBackspace = () => {
    playKeyClick?.();
    setErrorMessage('');
    setEnteredDigits((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    playKeyClick?.();
    setErrorMessage('');
    setEnteredDigits('');
  };

  // Physical Keyboard Support
  useEffect(() => {
    if (!isUnlockModalOpen) return;

    const handleKeyDown = (e) => {
      if (activeTab !== 'pin') return;

      if (/^[0-9]$/.test(e.key)) {
        e.preventDefault();
        handlePressDigit(e.key);
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        handleBackspace();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        closeUnlockModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isUnlockModalOpen, activeTab, enteredDigits, handlePressDigit, handleBackspace, closeUnlockModal]);

  // Handle Math Challenge
  const handleVerifyMath = (e) => {
    e?.preventDefault();
    if (parseInt(mathAnswer.trim(), 10) === mathProblem.result) {
      emergencyUnlock();
    } else {
      setMathError('Kết quả phép tính chưa đúng! Vui lòng thử lại.');
      setShakeKey((k) => k + 1);
      setMathProblem(generateMathProblem());
      setMathAnswer('');
    }
  };

  // Handle Change PIN submit
  const handleChangePinSubmit = (e) => {
    e?.preventDefault();
    setChangePinError('');
    if (newPinInput !== confirmPinInput) {
      setChangePinError('Mật khẩu mới và xác nhận mật khẩu không khớp!');
      setShakeKey((k) => k + 1);
      return;
    }
    const res = changePin(oldPinInput, newPinInput);
    if (res.success) {
      setChangePinSuccess(true);
      setTimeout(() => {
        setActiveTab('pin');
        setEnteredDigits('');
      }, 1500);
    } else {
      setChangePinError(res.error);
      setShakeKey((k) => k + 1);
    }
  };

  // Handle Download Windows Kiosk Launcher .bat
  const handleDownloadKioskLauncher = () => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5174';
    const batContent = `@echo off
:: =======================================================================
:: KIDS ENGLISH LEARNING AGENT - CHẾ ĐỘ KIOSK TOÀN MÀN HÌNH KHÓA CỨNG
:: Không thanh URL, Không tabs, Không nút đóng X, Bé không thể thoát ra!
:: =======================================================================
title Kids English Agent - Kiosk Lockdown
chcp 65001 > nul
cls
echo.
echo =======================================================================
echo   KHOI DONG HE THONG HOC TIENG ANH - CHE DO KIOSK KHONG THE THOAT
echo =======================================================================
echo.
echo [*] Dang tim kiem trinh duyet Microsoft Edge hoac Google Chrome...
echo.

where msedge >nul 2>nul
if %errorlevel% equ 0 (
    echo [OK] Phat hien Microsoft Edge. Dang khoi chay Kiosk...
    start msedge.exe --kiosk "${origin}/#/gioi-thieu" --edge-kiosk-type=fullscreen --no-first-run
    goto done
)

where chrome >nul 2>nul
if %errorlevel% equ 0 (
    echo [OK] Phat hien Google Chrome. Dang khoi chay Kiosk...
    start chrome.exe --kiosk "${origin}/#/gioi-thieu" --no-first-run
    goto done
)

echo [!] Khong tim thay Edge/Chrome trong PATH, dang thu mo bang lenh mac dinh...
start msedge.exe --kiosk "${origin}/#/gioi-thieu" || start chrome.exe --kiosk "${origin}/#/gioi-thieu"

:done
echo.
echo [x] Trinh duyet da vao Che do Kiosk Khoa Cung.
echo [x] De thoat khi can thiet: Ba/Me bam Alt + F4 hoac nhap ma PIN tren he thong.
timeout /t 3 > nul
exit
`;
    const blob = new Blob([batContent], { type: 'application/x-bat' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Chay_Khoa_Kiosk_Kids_English.bat';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!isUnlockModalOpen) return null;
  if (typeof document === 'undefined' || !document.body) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[999999999] flex items-center justify-center p-3 sm:p-4 bg-slate-950/90 backdrop-blur-2xl animate-fadeIn select-none"
      style={{ isolation: 'isolate' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          closeUnlockModal();
        }
      }}
    >
      <div
        key={shakeKey}
        className={`relative w-full max-w-sm sm:max-w-md max-h-[92vh] max-h-[92dvh] overflow-y-auto rounded-3xl border-2 ${
          errorMessage || mathError || changePinError ? 'border-rose-500 shadow-[0_0_40px_rgba(244,63,94,0.6)] animate-shake' : 'border-amber-400/80 shadow-[0_0_50px_rgba(245,158,11,0.45)]'
        } bg-gradient-to-b from-slate-900 via-slate-950 to-indigo-950 text-white p-4 sm:p-6 animate-scaleIn custom-scrollbar`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Close */}
        <button
          onClick={closeUnlockModal}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/80 hover:bg-rose-950 hover:text-rose-300 text-slate-400 transition cursor-pointer"
          title="Đóng (Hủy)"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-1.5 pb-2">
          <div className="inline-flex p-3 rounded-2xl bg-amber-500/20 border border-amber-400/50 text-amber-300 mb-1 shadow-inner">
            <Lock className="h-7 w-7 text-amber-300 animate-pulse" />
          </div>
          <h3 className="text-lg sm:text-xl font-black font-heading tracking-tight text-white uppercase">
            Xác Thực Phụ Huynh
          </h3>
          <p className="text-xs text-slate-300 font-medium leading-relaxed px-4">
            {unlockPromptReason || 'Nhập mã PIN 4 số của Ba/Mẹ để mở khóa hoặc điều hướng.'}
          </p>
        </div>

        {/* Navigation Tabs between PIN, Math, Change PIN & Kiosk Guide */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1 pb-3">
          <button
            onClick={() => setActiveTab('pin')}
            className={`px-2.5 sm:px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'pin'
                ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                : 'bg-slate-800/80 text-slate-300 hover:text-white'
            }`}
          >
            Mã PIN 4 Số
          </button>
          <button
            onClick={() => setActiveTab('math')}
            className={`px-2.5 sm:px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'math'
                ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                : 'bg-slate-800/80 text-slate-300 hover:text-white'
            }`}
          >
            Toán Phụ Huynh
          </button>
          <button
            onClick={() => setActiveTab('change_pin')}
            className={`px-2.5 sm:px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'change_pin'
                ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                : 'bg-slate-800/80 text-slate-300 hover:text-white'
            }`}
          >
            Đổi PIN
          </button>
          <button
            onClick={() => setActiveTab('kiosk')}
            className={`px-2.5 sm:px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1 ${
              activeTab === 'kiosk'
                ? 'bg-cyan-400 text-slate-950 shadow-md font-black'
                : 'bg-slate-800/80 text-cyan-300 hover:text-white'
            }`}
          >
            <Monitor className="h-3.5 w-3.5" />
            <span>Kiosk Chống Thoát</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: 4-DIGIT PIN ENTRY PAD                                              */}
        {/* ========================================================================= */}
        {activeTab === 'pin' && (
          <div className="space-y-4">
            {/* 4 Slots Indicator */}
            <div className="flex items-center justify-center gap-3 py-2">
              {[0, 1, 2, 3].map((slotIdx) => {
                const isFilled = slotIdx < enteredDigits.length;
                return (
                  <div
                    key={slotIdx}
                    className={`h-11 w-11 rounded-2xl flex items-center justify-center transition-all duration-200 border-2 ${
                      isFilled
                        ? 'border-amber-400 bg-amber-400 text-slate-950 scale-105 shadow-[0_0_15px_rgba(245,158,11,0.7)]'
                        : 'border-slate-700 bg-slate-900/80 text-transparent'
                    }`}
                  >
                    {isFilled ? (
                      <span className="text-xl font-black font-mono">●</span>
                    ) : (
                      <span className="text-xs text-slate-600 font-mono">_</span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="text-xs text-rose-300 font-bold text-center bg-rose-950/70 border border-rose-500/40 p-2 rounded-xl animate-fadeIn">
                ⚠️ {errorMessage}
              </div>
            )}

            {/* Touch Keypad */}
            <div className="grid grid-cols-3 gap-2 sm:gap-2.5 max-w-[280px] mx-auto pt-1">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => handlePressDigit(num)}
                  className="h-12 sm:h-13 rounded-2xl bg-slate-800/90 hover:bg-amber-500 hover:text-slate-950 text-white font-mono text-xl sm:text-2xl font-black border border-slate-700 hover:border-amber-400 transition-all active:scale-95 shadow-md flex items-center justify-center cursor-pointer"
                >
                  {num}
                </button>
              ))}

              {/* Clear */}
              <button
                type="button"
                onClick={handleClear}
                className="h-12 sm:h-13 rounded-2xl bg-slate-900/90 hover:bg-rose-900 text-slate-300 hover:text-rose-200 font-bold text-xs uppercase tracking-wider border border-slate-700 transition-all active:scale-95 flex items-center justify-center cursor-pointer"
                title="Xóa toàn bộ"
              >
                Xóa Hết
              </button>

              {/* 0 */}
              <button
                type="button"
                onClick={() => handlePressDigit('0')}
                className="h-12 sm:h-13 rounded-2xl bg-slate-800/90 hover:bg-amber-500 hover:text-slate-950 text-white font-mono text-xl sm:text-2xl font-black border border-slate-700 hover:border-amber-400 transition-all active:scale-95 shadow-md flex items-center justify-center cursor-pointer"
              >
                0
              </button>

              {/* Backspace */}
              <button
                type="button"
                onClick={handleBackspace}
                className="h-12 sm:h-13 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-amber-300 font-bold border border-slate-700 transition-all active:scale-95 flex items-center justify-center cursor-pointer"
                title="Xóa số trước"
              >
                <Delete className="h-5 w-5" />
              </button>
            </div>

            {/* Default PIN Hint */}
            <div className="text-center pt-2">
              <span className="text-[11px] text-slate-400">
                💡 Mã PIN mặc định ban đầu là: <span className="text-amber-300 font-mono font-bold bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-500/30">8888</span>
              </span>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: PARENTAL MATH CHALLENGE (EMERGENCY OVERRIDE)                       */}
        {/* ========================================================================= */}
        {activeTab === 'math' && (
          <form onSubmit={handleVerifyMath} className="space-y-4 pt-2">
            <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-center space-y-2">
              <div className="text-xs font-bold text-slate-300 flex items-center justify-center gap-1">
                <HelpCircle className="h-4 w-4 text-cyan-400" />
                <span>Thử thách tính nhanh dành riêng cho Phụ Huynh:</span>
              </div>
              <div className="text-3xl font-black font-mono text-amber-300 py-1">
                {mathProblem.question}
              </div>
              <p className="text-[11px] text-slate-400">
                Bé nhỏ chưa biết phép cộng 2 chữ số nên chỉ người lớn mới có thể vượt qua bước này.
              </p>
            </div>

            <div className="space-y-2">
              <input
                type="number"
                inputMode="numeric"
                autoFocus
                value={mathAnswer}
                onChange={(e) => setMathAnswer(e.target.value)}
                placeholder="Nhập kết quả phép tính..."
                className="w-full text-center text-2xl font-mono font-black py-2.5 px-4 rounded-xl bg-slate-950 border border-slate-700 focus:border-amber-400 focus:outline-none text-white"
              />

              {mathError && (
                <div className="text-xs text-rose-300 font-bold text-center bg-rose-950/70 border border-rose-500/40 p-2 rounded-xl">
                  ⚠️ {mathError}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  setMathProblem(generateMathProblem());
                  setMathAnswer('');
                  setMathError('');
                }}
                className="p-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white transition cursor-pointer"
                title="Đổi phép tính khác"
              >
                <RefreshCw className="h-4 w-4" />
              </button>

              <button
                type="submit"
                disabled={!mathAnswer.trim()}
                className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-sm transition shadow-lg disabled:opacity-50 cursor-pointer"
              >
                Xác Nhận & Mở Khóa Khẩn Cấp
              </button>
            </div>
          </form>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: CHANGE PIN                                                         */}
        {/* ========================================================================= */}
        {activeTab === 'change_pin' && (
          <form onSubmit={handleChangePinSubmit} className="space-y-3 pt-2">
            <div>
              <label className="text-[11px] font-bold text-slate-300 mb-1 block">
                Mật khẩu PIN hiện tại:
              </label>
              <input
                type="password"
                inputMode="numeric"
                maxLength={6}
                value={oldPinInput}
                onChange={(e) => setOldPinInput(e.target.value)}
                placeholder="Mặc định: 8888"
                className="w-full text-center text-lg font-mono font-bold py-2 px-3 rounded-xl bg-slate-950 border border-slate-700 focus:border-amber-400 focus:outline-none text-white"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-300 mb-1 block">
                Mật khẩu PIN mới (4 - 6 số):
              </label>
              <input
                type="password"
                inputMode="numeric"
                maxLength={6}
                value={newPinInput}
                onChange={(e) => setNewPinInput(e.target.value)}
                placeholder="Ví dụ: 1234"
                className="w-full text-center text-lg font-mono font-bold py-2 px-3 rounded-xl bg-slate-950 border border-slate-700 focus:border-amber-400 focus:outline-none text-white"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-300 mb-1 block">
                Xác nhận lại mã PIN mới:
              </label>
              <input
                type="password"
                inputMode="numeric"
                maxLength={6}
                value={confirmPinInput}
                onChange={(e) => setConfirmPinInput(e.target.value)}
                placeholder="Nhập lại mật khẩu mới..."
                className="w-full text-center text-lg font-mono font-bold py-2 px-3 rounded-xl bg-slate-950 border border-slate-700 focus:border-amber-400 focus:outline-none text-white"
              />
            </div>

            {changePinError && (
              <div className="text-xs text-rose-300 font-bold text-center bg-rose-950/70 border border-rose-500/40 p-2 rounded-xl">
                ⚠️ {changePinError}
              </div>
            )}

            {changePinSuccess && (
              <div className="text-xs text-emerald-300 font-bold text-center bg-emerald-950/70 border border-emerald-500/40 p-2 rounded-xl flex items-center justify-center gap-1.5">
                <Check className="h-4 w-4 text-emerald-400" />
                <span>Đổi mã PIN thành công!</span>
              </div>
            )}

            <button
              type="submit"
              disabled={!oldPinInput || !newPinInput || !confirmPinInput}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-sm transition shadow-lg disabled:opacity-50 cursor-pointer mt-2"
            >
              Lưu Mật Khẩu Mới
            </button>
          </form>
        )}
        {/* ========================================================================= */}
        {/* TAB 4: KIOSK ABSOLUTE LOCKDOWN GUIDE & 1-CLICK LAUNCHER                   */}
        {/* ========================================================================= */}
        {activeTab === 'kiosk' && (
          <div className="space-y-3.5 max-h-[60vh] overflow-y-auto pr-1 text-left">
            {/* Status of Active Defenses */}
            <div className="p-3 rounded-2xl bg-slate-950 border border-cyan-500/40 space-y-2">
              <div className="flex items-center gap-2 text-xs font-black text-cyan-300 uppercase tracking-wider">
                <Shield className="h-4 w-4 text-cyan-400" />
                <span>5 Lớp Bảo Vệ Chống Thoát Đang Hoạt Động:</span>
              </div>
              <ul className="text-[11px] text-slate-300 space-y-1.5 pl-1">
                <li className="flex items-start gap-1.5">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>Chặn phím tắt thoát:</strong> ESC, Alt+F4, Ctrl+W, Ctrl+T, Ctrl+N, Ctrl+R, F5, F11, F12.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>Bẫy điều hướng lùi:</strong> Tự động chặn và khóa lại nếu bé bấm nút Back trên trình duyệt.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>Chặn chuột phải & kéo thả:</strong> Vô hiệu hóa inspect và kéo link ra ngoài.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>Màn chắn Kiosk toàn màn hình:</strong> Nếu thoát toàn màn hình, màn chắn sẽ hiện lên chặn toàn bộ và yêu cầu vào lại.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>Cảnh báo đóng tab:</strong> Cảnh báo xác thực hệ thống nếu có thao tác đóng trang web.</span>
                </li>
              </ul>
            </div>

            {/* 1-Click Windows Kiosk .BAT Download */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-indigo-950/80 via-slate-900 to-slate-950 border-2 border-amber-400/80 space-y-2 shadow-lg">
              <div className="flex items-center gap-2 text-xs font-black text-amber-300 uppercase">
                <Laptop className="h-4 w-4 text-amber-400" />
                <span>Chế Độ Kiosk Tuyệt Đối Cho Windows</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Tải file chạy tự động này để mở trình duyệt Edge/Chrome ở chế độ <strong>Kiosk Chuyên Dụng</strong>: ẩn 100% thanh URL, ẩn tabs, ẩn nút đóng X. Bé không thể nhìn thấy bất kỳ thanh điều khiển nào của trình duyệt!
              </p>
              <button
                type="button"
                onClick={handleDownloadKioskLauncher}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black text-xs transition shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <Download className="h-4 w-4" />
                <span>TẢI FILE CHẠY KIOSK (.BAT) 1-CLICK</span>
              </button>
              <div className="text-[10px] text-slate-400 text-center italic">
                * Sau khi tải, chỉ cần bấm đúp vào file để khởi động Kiosk. Nhấn Alt + F4 hoặc nhập PIN khi muốn thoát.
              </div>
            </div>

            {/* PWA App Installation Guide */}
            <div className="p-3 rounded-2xl bg-slate-950/90 border border-slate-700 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-black text-white">
                <Monitor className="h-3.5 w-3.5 text-cyan-400" />
                <span>Cài Đặt Làm Ứng Dụng Độc Lập (PWA)</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Trên thanh địa chỉ Chrome hoặc Edge, bấm vào biểu tượng <strong>Cài đặt ứng dụng</strong> (hoặc icon dấu cộng / máy tính ở góc phải thanh địa chỉ). Ứng dụng sẽ chạy trong cửa sổ riêng biệt không có thanh địa chỉ web.
              </p>
            </div>

            {/* Mobile / Tablet Screen Pinning Guide */}
            <div className="p-3 rounded-2xl bg-slate-950/90 border border-slate-700 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-black text-white">
                <Smartphone className="h-3.5 w-3.5 text-emerald-400" />
                <span>Khóa Màn Hình Trên Máy Tính Bảng (Tablet / iPad)</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                • <strong>iPad:</strong> Bật <em>Cài đặt &gt; Trợ năng &gt; Truy cập được Hướng dẫn (Guided Access)</em>. Khi bé học, bấm phím nguồn 3 lần để khóa không cho thoát app.<br />
                • <strong>Android:</strong> Bật <em>Cài đặt &gt; Bảo mật &gt; Ghim ứng dụng (App Pinning)</em> và ghim trình duyệt lại.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
