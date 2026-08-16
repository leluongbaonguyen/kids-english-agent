import React, { useState, useEffect } from 'react';
import { Header } from './components/Header.jsx';
import { KidsEnglishDashboard } from './components/KidsEnglishDashboard.jsx';
import { AnimatedMascots } from './components/AnimatedMascots.jsx';
import { BackgroundMusicPlayer } from './components/BackgroundMusicPlayer.jsx';
import { Dynamic3DBackground } from './components/Dynamic3DBackground.jsx';
import { ToastContainer } from './components/ToastContainer.jsx';
import { MobileBottomBar } from './components/MobileBottomBar.jsx';
import SmartReminderNotification from './components/SmartReminderNotification.jsx';
import IosPwaInstallPrompt from './components/IosPwaInstallPrompt.jsx';
import { PageLocationBar, ROUTE_MAP } from './components/PageLocationBar.jsx';

const getTabFromHash = () => {
  try {
    const hash = window.location.hash.replace(/^#\/?/, '').trim();
    if (!hash) return 'home';
    for (const [tabKey, info] of Object.entries(ROUTE_MAP)) {
      if (info.slug === hash || tabKey === hash) return tabKey;
    }
  } catch (e) {}
  return 'home';
};

export default function App() {
  const [currentActor, setCurrentActor] = useState(() => {
    try {
      return localStorage.getItem('kids_active_actor') || 'minh_anh';
    } catch {
      return 'minh_anh';
    }
  });

  const [activeTab, setActiveTab] = useState(() => getTabFromHash());
  const [longmanTrigger, setLongmanTrigger] = useState(0);
  const [aiModalTrigger, setAiModalTrigger] = useState(0);
  const [userProfileTrigger, setUserProfileTrigger] = useState(0);
  const [todayPlanTrigger, setTodayPlanTrigger] = useState(0);
  const [cmsTrigger, setCmsTrigger] = useState(0);
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
      if (['db_table', 'import_wizard', 'trash_can', 'audit_log', 'qa_checklist'].includes(activeTab)) {
        setActiveTab('home');
      }
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

  // Synchronize activeTab with URL hash for easy sharing & clear location display
  useEffect(() => {
    const currentSlug = ROUTE_MAP[activeTab]?.slug || activeTab;
    const targetHash = `#/${currentSlug}`;
    if (window.location.hash !== targetHash) {
      window.history.replaceState(null, '', targetHash);
    }
  }, [activeTab]);

  useEffect(() => {
    const handleHashChange = () => {
      const newTab = getTabFromHash();
      if (newTab !== activeTab) {
        setActiveTab(newTab);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [activeTab]);

  return (
    <div className="min-h-screen min-h-[100dvh] w-full bg-[#070a12] text-slate-100 relative font-sans overflow-x-hidden flex flex-col items-center justify-start pb-20 xl:pb-6">
      {/* 3D Canvas Background */}
      <Dynamic3DBackground activeTab={activeTab} customBgConfig={bgConfig} />

      {/* Floating Mascots */}
      <AnimatedMascots addToast={addToast} />

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} />

      {/* Auto-Responsive Main Application Container */}
      <div className="w-full mx-auto px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10 flex flex-col items-center">
        {/* Sticky Fixed Navigation Header & Page Location Bar */}
        <div className="sticky top-0 z-30 w-full pt-2 pb-2 space-y-2 backdrop-blur-xl bg-[#070a12]/90 shadow-2xl transition-all duration-300">
          {/* Unified Main Navigation Menu Header */}
          <Header
            currentActor={currentActor}
            onSwitchActor={handleSwitchActor}
            isFullscreen={isFullscreen}
            onToggleFullscreen={handleToggleFullscreen}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onOpenLongman={() => setLongmanTrigger((prev) => prev + 1)}
            onOpenAiModal={() => setAiModalTrigger((prev) => prev + 1)}
            onOpenUserProfile={() => setUserProfileTrigger((prev) => prev + 1)}
            onOpenTodayPlan={() => setTodayPlanTrigger((prev) => prev + 1)}
            onOpenCMS={() => setCmsTrigger((prev) => prev + 1)}
          />

          {/* Dynamic Page Location Breadcrumb & URL Routing Indicator Bar */}
          <PageLocationBar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            currentActor={currentActor}
          />
        </div>

        {/* Main Learning Dashboard Workspace */}
        <main className="w-full flex flex-col items-center pt-3 sm:pt-4">
          <KidsEnglishDashboard
            plan={null}
            addToast={addToast}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            longmanTrigger={longmanTrigger}
            aiModalTrigger={aiModalTrigger}
            userProfileTrigger={userProfileTrigger}
            todayPlanTrigger={todayPlanTrigger}
            cmsTrigger={cmsTrigger}
            currentActorProps={currentActor}
            onSwitchActorProps={handleSwitchActor}
          />
        </main>
      </div>

      {/* iOS Mobile Native App Push & PWA Banner */}
      <IosPwaInstallPrompt addToast={addToast} />

      {/* Smart Automated Reminder Notification System */}
      <SmartReminderNotification
        learnerName="Bé Minh Anh"
        onOpenTodayPlan={() => setTodayPlanTrigger((prev) => prev + 1)}
        addToast={addToast}
      />

      {/* iOS Native Mobile Bottom Navigation Bar */}
      <MobileBottomBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAiModal={() => setAiModalTrigger((prev) => prev + 1)}
      />

      {/* Background Music Player */}

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
