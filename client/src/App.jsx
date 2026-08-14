import React, { useState, useEffect } from 'react';
import { Header } from './components/Header.jsx';
import { KidsEnglishDashboard } from './components/KidsEnglishDashboard.jsx';
import { AnimatedMascots } from './components/AnimatedMascots.jsx';
import { BackgroundMusicPlayer } from './components/BackgroundMusicPlayer.jsx';
import { Dynamic3DBackground } from './components/Dynamic3DBackground.jsx';
import { ToastContainer } from './components/ToastContainer.jsx';

export default function App() {
  const [currentActor, setCurrentActor] = useState(() => {
    try {
      return localStorage.getItem('kids_active_actor') || 'minh_anh';
    } catch {
      return 'minh_anh';
    }
  });

  const [toasts, setToasts] = useState([]);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [bgConfig, setBgConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('system_bg_config_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn(e);
    }
    return { theme: 'galaxy3d', customUrl: '', customType: 'image', opacity: 0.85, blur: 0, speed: 1.0 };
  });

  const addToast = (message, type = 'info') => {
    const id = Date.now() + Math.random().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  };

  const handleSwitchActor = (actorId) => {
    setCurrentActor(actorId);
    try {
      localStorage.setItem('kids_active_actor', actorId);
    } catch (e) {}
    if (actorId === 'minh_anh') {
      addToast('👧 Đã chuyển sang Tác nhân Nguyễn Ngọc Minh Anh', 'info');
    } else {
      addToast('👨‍💼 Đã chuyển sang Tác nhân Ba Bảo Nguyên (Admin)', 'info');
    }
  };

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFs = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', handleFs);
    return () => document.removeEventListener('fullscreenchange', handleFs);
  }, []);

  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100 p-3 sm:p-6 space-y-4 relative font-sans">
      {/* 3D Canvas Background */}
      <Dynamic3DBackground activeTab="dashboard" customBgConfig={bgConfig} />

      {/* Floating Mascots */}
      <AnimatedMascots addToast={addToast} />

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} />

      {/* App Header */}
      <Header
        currentActor={currentActor}
        onSwitchActor={handleSwitchActor}
        isFullscreen={isFullscreen}
        onToggleFullscreen={handleToggleFullscreen}
      />

      {/* Main Learning Dashboard */}
      <main className="relative z-10 w-full">
        <KidsEnglishDashboard plan={null} addToast={addToast} />
      </main>

      {/* Background Music Player */}
      <BackgroundMusicPlayer
        currentActor={currentActor}
        addToast={addToast}
        onBgConfigChange={setBgConfig}
        currentBgConfig={bgConfig}
      />
    </div>
  );
}
