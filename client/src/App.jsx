import React, { useState, useEffect } from 'react';
import { Header } from './components/Header.jsx';
import { KidsEnglishDashboard } from './components/KidsEnglishDashboard.jsx';
import { AnimatedMascots } from './components/AnimatedMascots.jsx';
import { BackgroundMusicPlayer } from './components/BackgroundMusicPlayer.jsx';
import { Dynamic3DBackground } from './components/Dynamic3DBackground.jsx';
import { ToastContainer } from './components/ToastContainer.jsx';
import { MobileBottomBar } from './components/MobileBottomBar.jsx';
import IosPwaInstallPrompt from './components/IosPwaInstallPrompt.jsx';
import { PageLocationBar, ROUTE_MAP } from './components/PageLocationBar.jsx';
import AuthGateScreen from './components/AuthGateScreen.jsx';
import LandingIntroHero from './components/LandingIntroHero.jsx';
import AdminSuperCrudStudioModal from './components/AdminSuperCrudStudioModal.jsx';
import AdminDashboardView from './components/AdminDashboardView.jsx';
import { errorReporter } from './services/errorReporter.js';
import SmartErrorAlertBanner from './components/SmartErrorAlertBanner.jsx';

const getTabFromHash = () => {
  try {
    const hash = window.location.hash.replace(/^#\/?/, '').trim();
    if (!hash || hash === 'intro' || hash === 'gioi-thieu') return 'intro';
    if (hash === 'auth' || hash === 'dang-nhap') return 'auth';
    for (const [tabKey, info] of Object.entries(ROUTE_MAP)) {
      if (info.slug === hash || tabKey === hash) return tabKey;
    }
  } catch (e) {}
  return 'intro';
};

export default function App() {
  const [activeSystemError, setActiveSystemError] = useState(null);

  useEffect(() => {
    errorReporter.init();
    const unsubscribe = errorReporter.subscribe((errorData) => {
      setActiveSystemError(errorData);
    });
    return () => unsubscribe();
  }, []);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return localStorage.getItem('kids_authenticated') === 'true' && Boolean(localStorage.getItem('v5_auth_token'));
    } catch {
      return false;
    }
  });

  const [currentActor, setCurrentActor] = useState(() => {
    try {
      return localStorage.getItem('kids_active_actor') || 'minh_anh';
    } catch {
      return 'minh_anh';
    }
  });

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('v5_user_info');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [activeTab, setActiveTab] = useState(() => getTabFromHash());
  const [longmanTrigger, setLongmanTrigger] = useState(0);
  const [userProfileTrigger, setUserProfileTrigger] = useState(0);
  const [cmsTrigger, setCmsTrigger] = useState(0);
  const [homeworkTrigger, setHomeworkTrigger] = useState(0);
  const [adminCrudOpen, setAdminCrudOpen] = useState(false);
  const [studentPreviewMode, setStudentPreviewMode] = useState(false);
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

  // Verify server session on load
  useEffect(() => {
    const token = localStorage.getItem('v5_auth_token');
    if (token) {
      fetch('/api/v1/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => {
          if (data.success && data.data?.user) {
            const user = data.data.user;
            setCurrentUser(user);
            setIsAuthenticated(true);
            const actor = user.role === 'admin' ? 'bao_nguyen' : 'minh_anh';
            setCurrentActor(actor);
            localStorage.setItem('kids_active_actor', actor);
            localStorage.setItem('v5_user_info', JSON.stringify(user));
          } else {
            handleLogout();
          }
        })
        .catch(() => {
          // If server error, do not fail completely if local token exists, but fail closed on invalid session
        });
    }
  }, []);

  const handleLoginSuccess = (actorId, userObj) => {
    setIsAuthenticated(true);
    setCurrentActor(actorId);
    setCurrentUser(userObj || null);
    try {
      localStorage.setItem('kids_authenticated', 'true');
      localStorage.setItem('kids_active_actor', actorId);
      if (userObj) localStorage.setItem('v5_user_info', JSON.stringify(userObj));
    } catch (e) {}
    setActiveTab('flashcards');
    try {
      window.location.hash = '#/tu-vung-toan-he-thong';
    } catch (e) {}
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('kids_authenticated');
      localStorage.removeItem('v5_auth_token');
      localStorage.removeItem('v5_user_info');
    } catch (e) {}
    setIsAuthenticated(false);
    setCurrentUser(null);
    setActiveTab('intro');
    addToast('🔒 Đã đăng xuất an toàn khỏi hệ thống!', 'info');
  };

  const handleSwitchActor = (actorId) => {
    setCurrentActor(actorId);
    try {
      localStorage.setItem('kids_active_actor', actorId);
    } catch (e) {}
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

  // Admin route protection guard
  const adminTabs = ['db_table', 'import_wizard', 'trash_can', 'audit_log', 'qa_checklist'];
  useEffect(() => {
    if (adminTabs.includes(activeTab) && currentActor !== 'bao_nguyen' && currentUser?.role !== 'admin') {
      addToast('⚠️ Bạn không có quyền truy cập trang Quản Trị Viên! (Yêu cầu tài khoản Admin)', 'warning');
      setActiveTab('home');
    }
  }, [activeTab, currentActor, currentUser]);

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

  // 1. FIRST RENDER: LANDING INTRO HERO PAGE (PUBLIC SHOWCASE FOR ALL VISITORS)
  if (activeTab === 'intro') {
    return (
      <div className="relative w-full min-h-screen bg-[#070a12]">
        <ToastContainer toasts={toasts} />
        <LandingIntroHero
          onEnterApp={() => {
            if (isAuthenticated) {
              setActiveTab('flashcards');
            } else {
              setActiveTab('auth');
            }
          }}
          onNavigateTab={(tab) => {
            if (!isAuthenticated && tab !== 'intro') {
              setActiveTab('auth');
            } else {
              setActiveTab(tab);
            }
          }}
          onOpenAuth={() => setActiveTab('auth')}
          onQuickLogin={(roleId = 'minh_anh') => {
            const defaultProfiles = {
              minh_anh: { id: 'minh_anh', name: 'Bé Nguyễn Ngọc Minh Anh', role: 'student' },
              parent_user: { id: 'parent_user', name: 'Phụ Huynh Bé Minh Anh', role: 'parent' },
              bao_nguyen: { id: 'bao_nguyen', name: 'Ba Bảo Nguyên', role: 'admin' }
            };
            const user = defaultProfiles[roleId] || defaultProfiles.minh_anh;
            handleLoginSuccess(roleId, user);
            addToast(`🎉 Đăng nhập nhanh thành công! Chào mừng ${user.name}!`, 'success');
          }}
          isAuthenticated={isAuthenticated}
          currentActor={currentActor}
        />
        <BackgroundMusicPlayer
          currentActor={currentActor}
          addToast={addToast}
          onBgConfigChange={setBgConfig}
          currentBgConfig={bgConfig}
        />
      </div>
    );
  }

  // 2. MANDATORY AUTHENTICATION GATE WHEN ENTERING APP
  if (!isAuthenticated || activeTab === 'auth') {
    return (
      <div className="relative w-full min-h-screen bg-[#070a12]">
        <ToastContainer toasts={toasts} />
        <AuthGateScreen
          onLoginSuccess={handleLoginSuccess}
          onGoToIntro={() => setActiveTab('intro')}
          addToast={addToast}
        />
      </div>
    );
  }

  const isAdmin = currentActor === 'bao_nguyen' || (currentUser && currentUser.role === 'admin');

  // 3. THIRD CHECK: DEDICATED ADMIN SYSTEM WORKSPACE (100% SEPARATE FROM STUDENT VIEW)
  if (isAdmin && !studentPreviewMode) {
    return (
      <div className="relative w-full min-h-screen bg-[#070a12] text-slate-100 font-sans overflow-x-hidden">
        <Dynamic3DBackground activeTab="admin" customBgConfig={bgConfig} />
        <ToastContainer toasts={toasts} />
        <AdminDashboardView
          currentActor={currentActor}
          currentUser={currentUser}
          onSwitchActor={handleSwitchActor}
          onLogout={handleLogout}
          addToast={addToast}
          onOpenStudentPreview={() => setStudentPreviewMode(true)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen min-h-[100dvh] w-full bg-[#070a12] text-slate-100 relative font-sans overflow-x-hidden flex flex-col items-center justify-start pb-36 sm:pb-28 xl:pb-8">
      {/* Admin Student Preview Mode Alert Banner */}
      {isAdmin && studentPreviewMode && (
        <div className="sticky top-0 z-[99999] w-full bg-amber-500 text-slate-950 text-xs font-black py-1.5 px-4 flex items-center justify-between shadow-lg">
          <span>👁️ Đang ở Chế Độ Xem Trước Giao Diện Học Sinh (Admin Student Preview Mode)</span>
          <button
            onClick={() => setStudentPreviewMode(false)}
            className="px-3 py-1 rounded-lg bg-slate-950 text-amber-300 font-bold hover:bg-slate-900 cursor-pointer"
          >
            ⬅️ Quay Lại Trang Quản Trị Admin
          </button>
        </div>
      )}

      {/* 3D Canvas Background */}
      <Dynamic3DBackground activeTab={activeTab} customBgConfig={bgConfig} />

      {/* Floating Mascots */}
      <AnimatedMascots addToast={addToast} />

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} />

      {/* Real-time Ultra Smart Error Alert Banner */}
      <SmartErrorAlertBanner
        activeError={activeSystemError}
        onClose={() => setActiveSystemError(null)}
        onSelfDiagnose={(err) => {
          setAdminCrudOpen(true);
          setActiveSystemError(null);
          addToast('🔧 Đã kích hoạt Self-Diagnosis & Tự động mở Smart Error Studio!', 'success');
        }}
      />

      {/* Auto-Responsive Main Application Container */}
      <div className="w-full mx-auto px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10 flex flex-col items-center">
        {/* Sticky Minimal Navigation Header */}
        <div className="sticky top-0 z-30 w-full pt-2 pb-1 backdrop-blur-2xl bg-[#070a12]/80 shadow-lg transition-all duration-300">
          <Header
            currentActor={currentActor}
            onSwitchActor={handleSwitchActor}
            onLogout={handleLogout}
            isFullscreen={isFullscreen}
            onToggleFullscreen={handleToggleFullscreen}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onOpenLongman={() => setLongmanTrigger((prev) => prev + 1)}
            onOpenUserProfile={() => setUserProfileTrigger((prev) => prev + 1)}
            onOpenCMS={() => setCmsTrigger((prev) => prev + 1)}
            onOpenHomework={() => setHomeworkTrigger((prev) => prev + 1)}
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
            userProfileTrigger={userProfileTrigger}
            cmsTrigger={cmsTrigger}
            homeworkTrigger={homeworkTrigger}
            currentActorProps={currentActor}
            onSwitchActorProps={handleSwitchActor}
          />
        </main>
      </div>

      {/* iOS Mobile Native App Push & PWA Banner */}
      <IosPwaInstallPrompt addToast={addToast} />

      {/* iOS Native Mobile Bottom Navigation Bar */}
      <MobileBottomBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Background Music Player */}
      <BackgroundMusicPlayer
        currentActor={currentActor}
        addToast={addToast}
        onBgConfigChange={setBgConfig}
        currentBgConfig={bgConfig}
      />

      {/* Admin Super CRUD Studio Modal */}
      <AdminSuperCrudStudioModal
        isOpen={adminCrudOpen}
        onClose={() => setAdminCrudOpen(false)}
        addToast={addToast}
      />
    </div>
  );
}
