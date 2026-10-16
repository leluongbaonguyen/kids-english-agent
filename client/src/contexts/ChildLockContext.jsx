import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

const ChildLockContext = createContext(null);

const STORAGE_KEY_LOCKED = 'kids_child_lock_active';
const STORAGE_KEY_PIN = 'kids_child_lock_pin';
const STORAGE_KEY_TARGET = 'kids_child_lock_target';
const STORAGE_KEY_TIME = 'kids_child_lock_time';
const DEFAULT_PIN = '8888';

/**
 * Play high-fidelity synthesized Web Audio sound effects for lock interactions
 */
function playLockAudioFeedback(type) {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    if (type === 'lock') {
      // Crisp ascending chime: C5 (523Hz) -> G5 (784Hz)
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.15);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
    } else if (type === 'unlock') {
      // Joyful multi-tone chime: G5 -> C6
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(783.99, now);
      osc.frequency.setValueAtTime(1046.50, now + 0.12);
      gain.gain.setValueAtTime(0.14, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.4);
    } else if (type === 'click') {
      // Subtle key click
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.06);
    } else if (type === 'error') {
      // Double low buzzer
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.setValueAtTime(130, now + 0.1);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.28);
    }
  } catch (e) {
    // AudioContext might be restricted by autoplay policy before user gesture
  }
}

export function ChildLockProvider({ children, onToast }) {
  const [isLocked, setIsLocked] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_LOCKED) === 'true';
    } catch {
      return false;
    }
  });

  const [pin, setPin] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_PIN) || DEFAULT_PIN;
    } catch {
      return DEFAULT_PIN;
    }
  });

  const [lockedTarget, setLockedTarget] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_TARGET);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [lockedTime, setLockedTime] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_TIME);
      return saved ? parseInt(saved, 10) : Date.now();
    } catch {
      return Date.now();
    }
  });

  const [isUnlockModalOpen, setIsUnlockModalOpen] = useState(false);
  const [unlockPromptReason, setUnlockPromptReason] = useState('');
  const pendingCallbackRef = useRef(null);

  // Time elapsed in locked session
  const [sessionMinutes, setSessionMinutes] = useState(0);

  // Fullscreen Kiosk State
  const [isFullscreen, setIsFullscreen] = useState(() => {
    return typeof document !== 'undefined' ? Boolean(document.fullscreenElement) : false;
  });

  const enterFullscreen = useCallback(async () => {
    try {
      if (
        typeof document !== 'undefined' &&
        typeof document.documentElement?.requestFullscreen === 'function' &&
        !document.fullscreenElement
      ) {
        await document.documentElement.requestFullscreen();
      }
      if (typeof navigator !== 'undefined' && navigator.keyboard?.lock) {
        await navigator.keyboard.lock(['Escape', 'F11', 'Tab', 'AltLeft', 'AltRight']).catch(() => {});
      }
    } catch (e) {
      console.warn('Enter fullscreen error:', e);
    }
  }, []);

  const exitFullscreen = useCallback(async () => {
    try {
      if (typeof document !== 'undefined' && document.fullscreenElement) {
        if (typeof navigator !== 'undefined' && navigator.keyboard?.unlock) {
          navigator.keyboard.unlock();
        }
        await document.exitFullscreen();
      }
    } catch (e) {
      console.warn('Exit fullscreen error:', e);
    }
  }, []);

  useEffect(() => {
    const handleFsChange = () => {
      const isFs = typeof document !== 'undefined' ? Boolean(document.fullscreenElement) : false;
      setIsFullscreen(isFs);
      if (isFs && isLocked && navigator.keyboard?.lock) {
        navigator.keyboard.lock(['Escape', 'F11', 'Tab', 'AltLeft', 'AltRight']).catch(() => {});
      }
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, [isLocked]);

  useEffect(() => {
    if (!isLocked) return;
    const updateElapsed = () => {
      const diff = Math.floor((Date.now() - lockedTime) / 60000);
      setSessionMinutes(diff);
    };
    updateElapsed();
    const interval = setInterval(updateElapsed, 30000);
    return () => clearInterval(interval);
  }, [isLocked, lockedTime]);

  /**
   * Lock Child Learning Mode
   * @param {Object} targetInfo e.g. { title: 'Thảo Nguyên & Động Vật Ăn Cỏ', level: 'BIO', category: 'BIO-U01', tab: 'flashcards' }
   */
  const activateLock = useCallback((targetInfo = null) => {
    const now = Date.now();
    setIsLocked(true);
    setLockedTarget(targetInfo);
    setLockedTime(now);
    try {
      localStorage.setItem(STORAGE_KEY_LOCKED, 'true');
      localStorage.setItem(STORAGE_KEY_TIME, now.toString());
      if (targetInfo) {
        localStorage.setItem(STORAGE_KEY_TARGET, JSON.stringify(targetInfo));
      } else {
        localStorage.removeItem(STORAGE_KEY_TARGET);
      }
    } catch (e) {}

    // Only attempt Fullscreen on non-mobile devices where requestFullscreen is supported
    const isMobile = typeof window !== 'undefined' && (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      window.innerWidth < 768 ||
      (typeof navigator !== 'undefined' && navigator.maxTouchPoints > 2) ||
      (typeof document !== 'undefined' && !document.documentElement?.requestFullscreen)
    );

    if (!isMobile) {
      enterFullscreen();
    }

    playLockAudioFeedback('lock');
    if (onToast) {
      const targetLabel = targetInfo?.title ? ` - "${targetInfo.title}"` : '';
      const modeLabel = isMobile ? 'Khóa Trẻ Em' : 'Khóa Trẻ Em & Chế độ Kiosk Toàn Màn Hình';
      onToast(`🔒 Đã bật ${modeLabel}${targetLabel}! Bé chỉ có thể học nội dung này và không thể thoát ra.`, 'success');
    }
  }, [enterFullscreen, onToast]);

  /**
   * Request an action that requires Parental Unlock
   * If already unlocked, runs immediately.
   * If locked, opens the Parental Unlock Keypad.
   */
  const requestUnlock = useCallback((callback = null, reason = '') => {
    if (!isLocked) {
      if (typeof callback === 'function') callback();
      return true;
    }
    pendingCallbackRef.current = typeof callback === 'function' ? callback : null;
    setUnlockPromptReason(reason || 'Vui lòng nhập mật khẩu phụ huynh để mở khóa hoặc thoát');
    setIsUnlockModalOpen(true);
    return false;
  }, [isLocked]);

  /**
   * Direct manual unlock with verified PIN
   */
  const unlockWithPin = useCallback((enteredPin) => {
    if (enteredPin === pin) {
      setIsLocked(false);
      setLockedTarget(null);
      setIsUnlockModalOpen(false);
      try {
        localStorage.removeItem(STORAGE_KEY_LOCKED);
        localStorage.removeItem(STORAGE_KEY_TARGET);
        localStorage.removeItem(STORAGE_KEY_TIME);
      } catch (e) {}

      if (typeof navigator !== 'undefined' && navigator.keyboard?.unlock) {
        navigator.keyboard.unlock();
      }

      playLockAudioFeedback('unlock');
      if (onToast) {
        onToast('🔓 Đã mở khóa phụ huynh thành công! Chào mừng Ba/Mẹ.', 'success');
      }

      if (pendingCallbackRef.current) {
        const cb = pendingCallbackRef.current;
        pendingCallbackRef.current = null;
        try {
          cb();
        } catch (err) {
          console.error(err);
        }
      }
      return { success: true };
    } else {
      playLockAudioFeedback('error');
      return { success: false, error: 'Mật khẩu phụ huynh không chính xác! Vui lòng thử lại.' };
    }
  }, [pin, onToast]);

  /**
   * Emergency Unlock via Parental Math Challenge (for parents who forgot their PIN)
   */
  const emergencyUnlock = useCallback(() => {
    setIsLocked(false);
    setLockedTarget(null);
    setIsUnlockModalOpen(false);
    try {
      localStorage.removeItem(STORAGE_KEY_LOCKED);
      localStorage.removeItem(STORAGE_KEY_TARGET);
      localStorage.removeItem(STORAGE_KEY_TIME);
    } catch (e) {}

    if (typeof navigator !== 'undefined' && navigator.keyboard?.unlock) {
      navigator.keyboard.unlock();
    }

    playLockAudioFeedback('unlock');
    if (onToast) {
      onToast('🔓 Đã mở khóa khẩn cấp qua xác thực phụ huynh thành công!', 'success');
    }

    if (pendingCallbackRef.current) {
      const cb = pendingCallbackRef.current;
      pendingCallbackRef.current = null;
      try {
        cb();
      } catch (err) {}
    }
    return { success: true };
  }, [onToast]);

  /**
   * Change Parent PIN
   */
  const changePin = useCallback((oldPin, newPin) => {
    if (oldPin !== pin) {
      playLockAudioFeedback('error');
      return { success: false, error: 'Mật khẩu cũ không chính xác!' };
    }
    if (!newPin || newPin.length < 4 || !/^\d+$/.test(newPin)) {
      return { success: false, error: 'Mật khẩu mới phải gồm ít nhất 4 chữ số (0-9)!' };
    }
    setPin(newPin);
    try {
      localStorage.setItem(STORAGE_KEY_PIN, newPin);
    } catch (e) {}
    playLockAudioFeedback('unlock');
    if (onToast) {
      onToast('🔑 Đã cập nhật mật khẩu phụ huynh mới thành công!', 'success');
    }
    return { success: true };
  }, [pin, onToast]);

  const closeUnlockModal = useCallback(() => {
    setIsUnlockModalOpen(false);
    pendingCallbackRef.current = null;
  }, []);

  // System-level Keyboard & Navigation Guards when Child Lock is Active
  useEffect(() => {
    if (!isLocked) return;

    // 1. Comprehensive Keyboard Shortcuts Guard
    const handleKeyDown = (e) => {
      // ESC: intercept and open PIN modal
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        if (!isUnlockModalOpen) {
          requestUnlock(null, 'Bé vừa bấm phím thoát (ESC) - Nhập mật khẩu phụ huynh để mở');
        }
        return;
      }

      // Tab / Window closing shortcuts: Ctrl+W, Ctrl+F4, Alt+F4
      if (
        (e.ctrlKey && (e.key === 'w' || e.key === 'W' || e.key === 'F4')) ||
        (e.altKey && e.key === 'F4')
      ) {
        e.preventDefault();
        e.stopPropagation();
        playLockAudioFeedback('error');
        requestUnlock(null, 'Phát hiện thao tác đóng cửa sổ / tab ứng dụng!');
        return;
      }

      // New tab / new window shortcuts: Ctrl+T, Ctrl+N, Ctrl+Shift+N, Ctrl+Shift+T
      if (
        e.ctrlKey &&
        (e.key === 't' || e.key === 'T' || e.key === 'n' || e.key === 'N')
      ) {
        e.preventDefault();
        e.stopPropagation();
        playLockAudioFeedback('error');
        return;
      }

      // Focus Address bar / Search: Ctrl+L, Alt+D, Ctrl+E, Ctrl+K
      if (
        (e.ctrlKey && (e.key === 'l' || e.key === 'L' || e.key === 'e' || e.key === 'E' || e.key === 'k' || e.key === 'K')) ||
        (e.altKey && (e.key === 'd' || e.key === 'D'))
      ) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      // Reloading: F5, Ctrl+R, Ctrl+Shift+R
      if (e.key === 'F5' || (e.ctrlKey && (e.key === 'r' || e.key === 'R'))) {
        e.preventDefault();
        e.stopPropagation();
        playLockAudioFeedback('error');
        requestUnlock(null, 'Phát hiện phím tải lại trang (F5/Ctrl+R)');
        return;
      }

      // F11 Fullscreen toggle
      if (e.key === 'F11') {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      // Developer Tools & Source inspection: F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
      if (
        e.key === 'F12' ||
        (e.ctrlKey && (e.key === 'u' || e.key === 'U')) ||
        (e.ctrlKey && e.shiftKey && (e.key === 'i' || e.key === 'I' || e.key === 'j' || e.key === 'J'))
      ) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      // History navigation: Alt + ArrowLeft / ArrowRight
      if (e.altKey && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      // Backspace outside form inputs
      if (e.key === 'Backspace' && !['INPUT', 'TEXTAREA'].includes(e.target?.tagName)) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
    };

    // 2. Browser Tab Closing Guard (warns with native prompt if closed)
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = 'Hệ thống đang bật Khóa Trẻ Em. Bé không thể thoát nếu không có mật khẩu phụ huynh.';
      return 'Hệ thống đang bật Khóa Trẻ Em.';
    };

    // 3. Disable Context Menu & Dragging outside
    const handleContextMenu = (e) => {
      e.preventDefault();
      return false;
    };
    const handleDragStart = (e) => {
      e.preventDefault();
      return false;
    };

    window.addEventListener('keydown', handleKeyDown, true);
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('contextmenu', handleContextMenu, true);
    window.addEventListener('dragstart', handleDragStart, true);

    return () => {
      window.removeEventListener('keydown', handleKeyDown, true);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('contextmenu', handleContextMenu, true);
      window.removeEventListener('dragstart', handleDragStart, true);
    };
  }, [isLocked, isUnlockModalOpen, requestUnlock]);

  // History Trapping Guard (Browser Back button neutralization)
  useEffect(() => {
    if (!isLocked) return;

    try {
      window.history.pushState({ kidsLock: true }, '', window.location.href);
    } catch (e) {}

    const handlePopState = () => {
      try {
        window.history.pushState({ kidsLock: true }, '', window.location.href);
      } catch (err) {}
      playLockAudioFeedback('error');
      requestUnlock(null, 'Bé vừa bấm nút lùi trang (Back) của trình duyệt - Cần mật khẩu phụ huynh');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [isLocked, requestUnlock]);

  const value = {
    isChildLocked: isLocked,
    pin,
    lockedTarget,
    lockedTime,
    sessionMinutes,
    isUnlockModalOpen,
    unlockPromptReason,
    isFullscreen,
    enterFullscreen,
    exitFullscreen,
    activateLock,
    requestUnlock,
    unlockWithPin,
    emergencyUnlock,
    changePin,
    closeUnlockModal,
    playKeyClick: () => playLockAudioFeedback('click')
  };

  return (
    <ChildLockContext.Provider value={value}>
      {children}
    </ChildLockContext.Provider>
  );
}

export function useChildLock() {
  const context = useContext(ChildLockContext);
  if (!context) {
    throw new Error('useChildLock must be used within a ChildLockProvider');
  }
  return context;
}
