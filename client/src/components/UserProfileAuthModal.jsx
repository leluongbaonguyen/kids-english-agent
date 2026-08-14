import React, { useState, useEffect } from 'react';
import {
  X, User, Lock, Mail, Phone, Calendar, Heart, ShieldCheck, Key, LogOut,
  Edit, Plus, Trash2, CheckCircle2, Sparkles, Star, Trophy, Flame, Eye, EyeOff,
  UserCheck, Award, Settings, Check, AlertTriangle, Shield, RefreshCw, Layers, Crown
} from 'lucide-react';

export default function UserProfileAuthModal({
  isOpen,
  onClose,
  currentActor = 'minh_anh',
  onSwitchActor,
  stars = 36,
  masteredCount = 35,
  totalXP = 420,
  selectedLevel = 'L1',
  addToast
}) {
  if (!isOpen) return null;

  // View state: 'profile' | 'login' | 'register' | 'forgot_password'
  const [viewState, setViewState] = useState('profile');
  const [activeProfileTab, setActiveProfileTab] = useState('info'); // info, family, badges, logs, security

  // =========================================================================
  // AUTHENTICATION STATES (LOGIN & REGISTER & FORGOT PASSWORD)
  // =========================================================================
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginRole, setLoginRole] = useState(currentActor === 'bao_nguyen' ? 'admin' : 'student');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Register Form
  const [regFullName, setRegFullName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regLevel, setRegLevel] = useState('L1');
  const [regAvatar, setRegAvatar] = useState('🦄');

  // Forgot Password
  const [forgotEmail, setForgotEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  // =========================================================================
  // PROFILE EDIT STATES & CUSTOM ATTRIBUTES CRUD
  // =========================================================================
  const [profileData, setProfileData] = useState(() => {
    try {
      const saved = localStorage.getItem('kids_user_profile_data');
      if (saved) return JSON.parse(saved);
    } catch (e) {}

    return {
      fullName: currentActor === 'bao_nguyen' ? 'Lê Lương Bảo Nguyên' : 'Nguyễn Ngọc Minh Anh',
      nickname: currentActor === 'bao_nguyen' ? 'Ba Bảo Nguyên' : 'Bé Minh Anh',
      email: currentActor === 'bao_nguyen' ? 'baonguyen@kidsenglish.edu.vn' : 'minhanh@kidsenglish.edu.vn',
      phone: '0988 777 999',
      birthday: '2019-08-18',
      gender: currentActor === 'bao_nguyen' ? 'Nam' : 'Nữ',
      motto: 'Học Tiếng Anh siêu vui cùng Ba Bảo Nguyên mỗi ngày! 🦄✨',
      coverTheme: 'gradient-purple',
      avatarIcon: currentActor === 'bao_nguyen' ? '👨‍💼' : '👧'
    };
  });

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editForm, setEditForm] = useState(profileData);

  // Custom User Attributes CRUD List
  const [customFields, setCustomFields] = useState(() => {
    try {
      const saved = localStorage.getItem('kids_user_custom_fields');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [
      { id: 'f1', label: 'Sở thích', value: 'Vẽ tranh, Đọc truyện Tiếng Anh & Chơi cùng Lumi' },
      { id: 'f2', label: 'Món ăn yêu thích', value: 'Bánh kem dâu & Sữa tươi' },
      { id: 'f3', label: 'Mục tiêu năm 2026', value: 'Master 600 từ vựng & Nhận Cúp Vàng L6' }
    ];
  });

  // State for adding new custom field
  const [newFieldLabel, setNewFieldLabel] = useState('');
  const [newFieldValue, setNewFieldValue] = useState('');
  const [showAddFieldModal, setShowAddFieldModal] = useState(false);

  // State for Editing a custom field
  const [editingFieldId, setEditingFieldId] = useState(null);
  const [editingFieldValue, setEditingFieldValue] = useState('');

  // Family Profiles List (CRUD)
  const [familyMembers, setFamilyMembers] = useState(() => {
    try {
      const saved = localStorage.getItem('kids_family_members');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [
      { id: 'mem1', name: 'Nguyễn Ngọc Minh Anh', role: 'Học Viên Bé', level: 'L1', xp: 420, stars: 36, avatar: '👧', active: currentActor === 'minh_anh' },
      { id: 'mem2', name: 'Lê Lương Bảo Nguyên', role: 'Phụ Huynh / Super Admin', level: 'Master', xp: 9999, stars: 500, avatar: '👨‍💼', active: currentActor === 'bao_nguyen' },
      { id: 'mem3', name: 'Nguyễn Ngọc Bảo An', role: 'Học Viên Nhí', level: 'L2', xp: 180, stars: 15, avatar: '🦁', active: false }
    ];
  });

  const [showAddFamilyModal, setShowAddFamilyModal] = useState(false);
  const [newFamilyName, setNewFamilyName] = useState('');
  const [newFamilyRole, setNewFamilyRole] = useState('Học Viên Nhí');
  const [newFamilyLevel, setNewFamilyLevel] = useState('L1');

  // Change Password State
  const [currPass, setCurrPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmNewPass, setConfirmNewPass] = useState('');

  // Save profile to LocalStorage
  const handleSaveProfile = () => {
    setProfileData(editForm);
    try {
      localStorage.setItem('kids_user_profile_data', JSON.stringify(editForm));
    } catch (e) {}
    setIsEditingProfile(false);
    addToast?.('✨ Đã cập nhật hồ sơ cá nhân thành công!', 'success');
  };

  // CRUD Custom Fields
  const handleAddCustomField = () => {
    if (!newFieldLabel.trim() || !newFieldValue.trim()) {
      addToast?.('⚠️ Vui lòng nhập đầy đủ tên trường và nội dung!', 'warning');
      return;
    }
    const newField = {
      id: `f_${Date.now()}`,
      label: newFieldLabel.trim(),
      value: newFieldValue.trim()
    };
    const updated = [...customFields, newField];
    setCustomFields(updated);
    try {
      localStorage.setItem('kids_user_custom_fields', JSON.stringify(updated));
    } catch (e) {}
    setNewFieldLabel('');
    setNewFieldValue('');
    setShowAddFieldModal(false);
    addToast?.(`➕ Đã thêm thông tin "${newField.label}"!`, 'success');
  };

  const handleDeleteCustomField = (id, label) => {
    const updated = customFields.filter((f) => f.id !== id);
    setCustomFields(updated);
    try {
      localStorage.setItem('kids_user_custom_fields', JSON.stringify(updated));
    } catch (e) {}
    addToast?.(`🗑️ Đã xóa thông tin "${label}"!`, 'info');
  };

  const handleUpdateCustomField = (id) => {
    const updated = customFields.map((f) => f.id === id ? { ...f, value: editingFieldValue } : f);
    setCustomFields(updated);
    try {
      localStorage.setItem('kids_user_custom_fields', JSON.stringify(updated));
    } catch (e) {}
    setEditingFieldId(null);
    addToast?.('✏️ Đã cập nhật thông tin!', 'success');
  };

  // CRUD Family Profiles
  const handleAddFamilyMember = () => {
    if (!newFamilyName.trim()) {
      addToast?.('⚠️ Vui lòng nhập tên thành viên gia đình!', 'warning');
      return;
    }
    const newMem = {
      id: `mem_${Date.now()}`,
      name: newFamilyName.trim(),
      role: newFamilyRole,
      level: newFamilyLevel,
      xp: 0,
      stars: 0,
      avatar: newFamilyRole.includes('Phụ Huynh') ? '👨‍💼' : '🐣',
      active: false
    };
    const updated = [...familyMembers, newMem];
    setFamilyMembers(updated);
    try {
      localStorage.setItem('kids_family_members', JSON.stringify(updated));
    } catch (e) {}
    setNewFamilyName('');
    setShowAddFamilyModal(false);
    addToast?.(`👨‍👩‍👧‍👦 Đã thêm hồ sơ "${newMem.name}"!`, 'success');
  };

  const handleDeleteFamilyMember = (id, name) => {
    const updated = familyMembers.filter((m) => m.id !== id);
    setFamilyMembers(updated);
    try {
      localStorage.setItem('kids_family_members', JSON.stringify(updated));
    } catch (e) {}
    addToast?.(`🗑️ Đã xóa hồ sơ thành viên "${name}"!`, 'info');
  };

  const handleSwitchActiveFamilyMember = (mem) => {
    const updated = familyMembers.map((m) => ({ ...m, active: m.id === mem.id }));
    setFamilyMembers(updated);
    try {
      localStorage.setItem('kids_family_members', JSON.stringify(updated));
    } catch (e) {}
    if (mem.role.includes('Phụ Huynh') || mem.role.includes('Admin')) {
      onSwitchActor?.('bao_nguyen');
    } else {
      onSwitchActor?.('minh_anh');
    }
    addToast?.(`🔄 Đã chuyển sang hồ sơ "${mem.name}"!`, 'success');
  };

  // Authentication Handlers
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginEmail.trim()) {
      addToast?.('⚠️ Vui lòng nhập email hoặc tên đăng nhập!', 'warning');
      return;
    }
    if (loginRole === 'admin') {
      onSwitchActor?.('bao_nguyen');
    } else {
      onSwitchActor?.('minh_anh');
    }
    setViewState('profile');
    addToast?.('🎉 Đăng nhập hệ thống thành công!', 'success');
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!regFullName.trim() || !regEmail.trim() || !regPassword.trim()) {
      addToast?.('⚠️ Vui lòng điền đầy đủ các thông tin đăng ký!', 'warning');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      addToast?.('❌ Mật khẩu xác nhận không trùng khớp!', 'error');
      return;
    }
    // Set profile data
    const newProfile = {
      ...profileData,
      fullName: regFullName,
      nickname: regFullName.split(' ')[0],
      email: regEmail,
      avatarIcon: regAvatar
    };
    setProfileData(newProfile);
    try {
      localStorage.setItem('kids_user_profile_data', JSON.stringify(newProfile));
    } catch (e) {}

    setViewState('profile');
    addToast?.('🎉 Đăng ký tài khoản mới thành công! Chào mừng bé!', 'success');
  };

  const handleChangePasswordSubmit = (e) => {
    e.preventDefault();
    if (!newPass || newPass !== confirmNewPass) {
      addToast?.('❌ Mật khẩu mới không khớp!', 'error');
      return;
    }
    setCurrPass('');
    setNewPass('');
    setConfirmNewPass('');
    addToast?.('🔑 Đổi mật khẩu thành công! Hãy ghi nhớ mật khẩu mới nhé!', 'success');
  };

  const avatarPresets = ['🦄', '👧', '👨‍💼', '🦁', '🚀', '👑', '🌟', '🐣', '🐱', '🐶', '🍎', '⭐'];

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-slate-950/90 backdrop-blur-2xl p-3 sm:p-6 overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[85vh] md:max-h-[88vh] overflow-y-auto rounded-3xl border-2 border-pink-500/50 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 p-4 sm:p-6 space-y-5 text-white shadow-2xl custom-scrollbar">

        {/* HEADER BAR */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 border border-pink-400 text-white text-2xl shadow-lg">
              {profileData.avatarIcon || '🦄'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-pink-500/20 border border-pink-400 px-2.5 py-0.5 text-[10px] font-black text-pink-300">
                  Hồ Sơ Cá Nhân & Quản Lý Tài Khoản
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-black font-heading text-white">
                {viewState === 'profile' && `TRANG CÁ NHÂN: ${profileData.fullName.toUpperCase()}`}
                {viewState === 'login' && 'ĐĂNG NHẬP HỆ THỐNG KIDS ENGLISH'}
                {viewState === 'register' && 'ĐĂNG KÝ TÀI KHOẢN HỌC VIÊN MỚI'}
                {viewState === 'forgot_password' && 'KHÔI PHỤC MẬT KHẨU TÀI KHOẢN'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {viewState !== 'profile' && (
              <button
                onClick={() => setViewState('profile')}
                className="px-3.5 py-2 rounded-2xl bg-slate-800 text-slate-300 font-bold text-xs hover:bg-slate-700 transition"
              >
                ◀ Về Hồ Sơ
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-2xl bg-rose-950 border border-rose-500/40 text-rose-300 hover:bg-rose-900 transition cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* VIEW 1: TRANG CÁ NHÂN CHI TIẾT (PROFILE VIEW WITH MULTI-TAB & CRUD) */}
        {/* ========================================================================= */}
        {viewState === 'profile' && (
          <div className="space-y-6 animate-fadeIn">

            {/* HERO PROFILE COVER BANNER */}
            <div className="relative overflow-hidden rounded-3xl border-2 border-pink-400/60 bg-gradient-to-r from-pink-950 via-purple-950 to-slate-950 p-6 md:p-8 shadow-2xl backdrop-blur-2xl">
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  {/* Avatar Frame with Badge */}
                  <div className="relative">
                    <div className="h-24 w-24 rounded-3xl bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 border-4 border-amber-400 flex items-center justify-center text-6xl shadow-2xl animate-pulse">
                      {profileData.avatarIcon}
                    </div>
                    <span className="absolute -bottom-2 -right-2 p-1.5 rounded-full bg-amber-500 text-slate-950 border-2 border-amber-300 shadow">
                      <Crown className="h-4 w-4 fill-slate-950" />
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h1 className="text-2xl md:text-3xl font-black font-heading text-white">
                        {profileData.fullName}
                      </h1>
                      <span className="px-3 py-1 rounded-full text-xs font-black bg-pink-500/30 text-pink-200 border border-pink-400">
                        {currentActor === 'bao_nguyen' ? '👑 Super Admin Ba Bảo Nguyên' : '👧 Học Viên Bé Minh Anh'}
                      </span>
                    </div>

                    <p className="text-xs text-amber-300 italic font-medium">"{profileData.motto}"</p>

                    <div className="flex items-center gap-3 pt-1 text-xs font-mono-code text-slate-300 font-bold">
                      <span>📧 {profileData.email}</span>
                      <span>• 📱 {profileData.phone}</span>
                    </div>
                  </div>
                </div>

                {/* Quick Action Controls */}
                <div className="flex flex-col sm:flex-row items-center gap-2">
                  <button
                    onClick={() => setIsEditingProfile(true)}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-2xl bg-amber-500 text-slate-950 font-black text-xs shadow-lg hover:scale-105 transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Edit className="h-4 w-4" /> ✏️ Sửa Hồ Sơ
                  </button>

                  <button
                    onClick={() => setViewState('login')}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-2xl bg-indigo-600 text-white font-black text-xs shadow-lg hover:scale-105 transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Key className="h-4 w-4" /> 🔑 Đăng Nhập / Đổi TK
                  </button>

                  <button
                    onClick={() => {
                      onSwitchActor?.('minh_anh');
                      addToast?.('🚪 Đã đăng xuất khỏi tài khoản!', 'info');
                    }}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-2xl bg-rose-950 border border-rose-500/40 text-rose-300 font-black text-xs hover:bg-rose-900 transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <LogOut className="h-4 w-4" /> Đăng Xuất
                  </button>
                </div>
              </div>

              {/* QUICK STATS BAR */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-pink-500/30 mt-6">
                <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-0.5">
                  <div className="text-[10px] text-slate-400 font-bold">Tổng XP Tích Lũy</div>
                  <div className="text-xl font-black text-indigo-300 font-mono-code">+{totalXP} XP</div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-0.5">
                  <div className="text-[10px] text-slate-400 font-bold">Ngôi Sao Thu Độc</div>
                  <div className="text-xl font-black text-yellow-300 font-mono-code">⭐ {stars} Sao</div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-0.5">
                  <div className="text-[10px] text-slate-400 font-bold">Từ Thuộc Thuần Thục</div>
                  <div className="text-xl font-black text-emerald-300 font-mono-code">👑 {masteredCount} Từ</div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-0.5">
                  <div className="text-[10px] text-slate-400 font-bold">Cấp Độ Hiện Tại</div>
                  <div className="text-xl font-black text-cyan-300 font-mono-code">{selectedLevel} • Active</div>
                </div>
              </div>
            </div>

            {/* TAB NAVIGATION BUTTONS */}
            <div className="flex rounded-2xl border border-slate-800 bg-slate-950 p-1.5 overflow-x-auto custom-scrollbar">
              {[
                { id: 'info', label: '👤 Thông Tin & Thuộc Tính Tùy Chỉnh' },
                { id: 'family', label: '👨‍👩‍👧‍👦 Quản Lý Hồ Sơ Gia Đình (' + familyMembers.length + ')' },
                { id: 'badges', label: '🏆 Bộ Bảng Thành Tích & Huy Hiệu' },
                { id: 'logs', label: '📜 Nhật Ký Hoạt Động' },
                { id: 'security', label: '🔑 Bảo Mật & Đổi Mật Khẩu' }
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveProfileTab(t.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-black shrink-0 transition cursor-pointer ${
                    activeProfileTab === t.id
                      ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* TAB 1: THÔNG TIN CÁ NHÂN & CUSTOM ATTRIBUTES CRUD */}
            {activeProfileTab === 'info' && (
              <div className="space-y-6 animate-fadeIn">
                {/* Standard Info Grid */}
                <div className="p-6 rounded-3xl border border-slate-800 bg-slate-950 space-y-4 shadow-xl">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h3 className="text-sm font-black uppercase text-pink-300 tracking-wider flex items-center gap-2">
                      <User className="h-4 w-4 text-pink-400" />
                      <span>Thông Tin Cá Nhân Cơ Bản:</span>
                    </h3>

                    <button
                      onClick={() => setIsEditingProfile(!isEditingProfile)}
                      className="px-3 py-1.5 rounded-xl bg-pink-950 border border-pink-500/40 text-pink-300 text-xs font-black hover:bg-pink-900 transition flex items-center gap-1 cursor-pointer"
                    >
                      <Edit className="h-3.5 w-3.5" />
                      <span>{isEditingProfile ? 'Hủy Sửa' : 'Chỉnh Sửa'}</span>
                    </button>
                  </div>

                  {!isEditingProfile ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                      <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
                        <div className="text-slate-400 font-bold">Họ & Tên Đầy Đủ:</div>
                        <div className="text-sm font-black text-white font-heading mt-0.5">{profileData.fullName}</div>
                      </div>

                      <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
                        <div className="text-slate-400 font-bold">Tên Thường Gọi / Nickname:</div>
                        <div className="text-sm font-black text-amber-300 font-heading mt-0.5">{profileData.nickname}</div>
                      </div>

                      <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
                        <div className="text-slate-400 font-bold">Địa Chỉ Email:</div>
                        <div className="text-sm font-black text-cyan-300 font-mono-code mt-0.5">{profileData.email}</div>
                      </div>

                      <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
                        <div className="text-slate-400 font-bold">Số Điện Thoại:</div>
                        <div className="text-sm font-black text-emerald-300 font-mono-code mt-0.5">{profileData.phone}</div>
                      </div>

                      <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
                        <div className="text-slate-400 font-bold">Ngày Sinh:</div>
                        <div className="text-sm font-black text-purple-300 font-mono-code mt-0.5">{profileData.birthday}</div>
                      </div>

                      <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800">
                        <div className="text-slate-400 font-bold">Giới Tính:</div>
                        <div className="text-sm font-black text-pink-300 font-mono-code mt-0.5">{profileData.gender}</div>
                      </div>
                    </div>
                  ) : (
                    /* Edit Profile Form */
                    <div className="space-y-4 pt-2">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div>
                          <label className="text-slate-300 font-bold block mb-1">Họ Tên:</label>
                          <input
                            type="text"
                            value={editForm.fullName}
                            onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                            className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white font-bold"
                          />
                        </div>

                        <div>
                          <label className="text-slate-300 font-bold block mb-1">Nickname:</label>
                          <input
                            type="text"
                            value={editForm.nickname}
                            onChange={(e) => setEditForm({ ...editForm, nickname: e.target.value })}
                            className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white font-bold"
                          />
                        </div>

                        <div>
                          <label className="text-slate-300 font-bold block mb-1">Email:</label>
                          <input
                            type="email"
                            value={editForm.email}
                            onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                            className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white font-bold"
                          />
                        </div>

                        <div>
                          <label className="text-slate-300 font-bold block mb-1">Số Điện Thoại:</label>
                          <input
                            type="text"
                            value={editForm.phone}
                            onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                            className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white font-bold"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="text-slate-300 font-bold block mb-1">Phương Châm Học Tập:</label>
                          <input
                            type="text"
                            value={editForm.motto}
                            onChange={(e) => setEditForm({ ...editForm, motto: e.target.value })}
                            className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white font-bold"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          onClick={handleSaveProfile}
                          className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black text-xs shadow-lg hover:scale-105 transition cursor-pointer"
                        >
                          💾 Lưu Cập Nhật Hồ Sơ
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* CUSTOM ATTRIBUTES LIST (FULL CRUD: ADD, EDIT, DELETE) */}
                <div className="p-6 rounded-3xl border border-slate-800 bg-slate-950 space-y-4 shadow-xl">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div>
                      <h3 className="text-sm font-black uppercase text-amber-300 tracking-wider flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-yellow-300" />
                        <span>Thông Tin Cá Nhân Tùy Chỉnh (Custom Attributes CRUD):</span>
                      </h3>
                      <p className="text-[11px] text-slate-400">Cho phép người dùng tự thêm, sửa, xóa các thông tin cá nhân tùy ý!</p>
                    </div>

                    <button
                      onClick={() => setShowAddFieldModal(true)}
                      className="px-3.5 py-2 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black text-xs hover:scale-105 transition flex items-center gap-1.5 cursor-pointer shadow"
                    >
                      <Plus className="h-4 w-4" />
                      <span>➕ Thêm Trường Mới</span>
                    </button>
                  </div>

                  {/* Custom Fields Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {customFields.map((field) => (
                      <div
                        key={field.id}
                        className="p-4 rounded-2xl border border-slate-800 bg-slate-900 flex items-start justify-between gap-3 shadow hover:border-amber-400/50 transition"
                      >
                        <div className="space-y-1 min-w-0 flex-1">
                          <div className="text-xs font-black text-amber-300 uppercase tracking-wider">{field.label}:</div>
                          {editingFieldId === field.id ? (
                            <div className="flex items-center gap-2 pt-1">
                              <input
                                type="text"
                                value={editingFieldValue}
                                onChange={(e) => setEditingFieldValue(e.target.value)}
                                className="w-full p-1.5 rounded-lg border border-amber-400 bg-slate-950 text-white text-xs font-bold"
                              />
                              <button
                                onClick={() => handleUpdateCustomField(field.id)}
                                className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-xs font-black shrink-0"
                              >
                                Lưu
                              </button>
                            </div>
                          ) : (
                            <div className="text-xs text-slate-200 font-bold leading-relaxed">{field.value}</div>
                          )}
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => {
                              setEditingFieldId(field.id);
                              setEditingFieldValue(field.value);
                            }}
                            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                            title="Sửa thông tin này"
                          >
                            <Edit className="h-3.5 w-3.5" />
                          </button>

                          <button
                            onClick={() => handleDeleteCustomField(field.id, field.label)}
                            className="p-1.5 rounded-lg bg-rose-950 text-rose-300 hover:bg-rose-900"
                            title="Xóa thông tin này"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: QUẢN LÝ HỒ SƠ GIA ĐÌNH & CÁC BÉ (FAMILY PROFILES CRUD) */}
            {activeProfileTab === 'family' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="p-6 rounded-3xl border border-slate-800 bg-slate-950 space-y-4 shadow-xl">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div>
                      <h3 className="text-sm font-black uppercase text-cyan-300 tracking-wider flex items-center gap-2">
                        <UserCheck className="h-4 w-4 text-cyan-400" />
                        <span>Danh Sách Hồ Sơ Thành Viên Trong Gia Đình (Family Accounts CRUD):</span>
                      </h3>
                      <p className="text-[11px] text-slate-400">Tạo thêm hồ sơ cho các bé, chuyển đổi tài khoản học nhanh chóng!</p>
                    </div>

                    <button
                      onClick={() => setShowAddFamilyModal(true)}
                      className="px-3.5 py-2 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-black text-xs hover:scale-105 transition flex items-center gap-1.5 cursor-pointer shadow"
                    >
                      <Plus className="h-4 w-4" />
                      <span>➕ Thêm Hồ Sơ Bé Mới</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {familyMembers.map((mem) => (
                      <div
                        key={mem.id}
                        className={`p-5 rounded-3xl border-2 transition space-y-3 shadow-lg relative ${
                          mem.active
                            ? 'border-cyan-400 bg-cyan-950/40 ring-4 ring-cyan-500/30'
                            : 'border-slate-800 bg-slate-900 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-5xl">{mem.avatar}</span>
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black border ${
                            mem.active ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400' : 'bg-slate-800 text-slate-400 border-slate-700'
                          }`}>
                            {mem.active ? '✅ Đang Hoạt Động' : 'Tài Khoản'}
                          </span>
                        </div>

                        <div>
                          <div className="text-base font-black text-white font-heading">{mem.name}</div>
                          <div className="text-xs font-mono-code text-cyan-300">{mem.role} • Level {mem.level}</div>
                        </div>

                        <div className="flex items-center justify-between text-xs font-mono-code font-bold text-amber-300 pt-1 border-t border-slate-800">
                          <span>⭐ {mem.stars} Sao</span>
                          <span>+{mem.xp} XP</span>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <button
                            onClick={() => handleSwitchActiveFamilyMember(mem)}
                            disabled={mem.active}
                            className="flex-1 py-2 rounded-xl bg-cyan-600 text-white text-xs font-black disabled:opacity-40 hover:bg-cyan-500 transition cursor-pointer"
                          >
                            {mem.active ? 'Đang Học' : 'Chuyển Hồ Sơ'}
                          </button>

                          <button
                            onClick={() => handleDeleteFamilyMember(mem.id, mem.name)}
                            className="p-2 rounded-xl bg-rose-950 text-rose-300 border border-rose-500/40 hover:bg-rose-900 transition"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: TROPHY & BADGES COLLECTION */}
            {activeProfileTab === 'badges' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="p-6 rounded-3xl border border-slate-800 bg-slate-950 space-y-4 shadow-xl">
                  <h3 className="text-sm font-black uppercase text-yellow-300 tracking-wider flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-yellow-400" />
                    <span>Bộ Bảng Huy Hiệu & Danh Hiệu Đã Đạt Được:</span>
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { icon: '🐣', title: 'First Lesson', desc: 'Hoàn thành bài học đầu tiên', unlocked: true },
                      { icon: '🎧', title: 'Listening Star', desc: 'Nghe thuộc 50 phát âm', unlocked: true },
                      { icon: '🎤', title: 'Little Speaker', desc: 'Luyện nói AI 100 câu', unlocked: true },
                      { icon: '📚', title: 'Young Reader', desc: 'Đọc 10 câu chuyện karaoke', unlocked: true },
                      { icon: '🔥', title: '7 Day Hero', desc: 'Học 7 ngày liên tục', unlocked: true },
                      { icon: '👑', title: 'Vocabulary Master', desc: 'Master 100 từ vựng L1', unlocked: true },
                      { icon: '🌟', title: 'Super Star', desc: 'Đạt mốc 500 Ngôi sao', unlocked: false },
                      { icon: '🎓', title: 'L6 CEFR Master', desc: 'Hoàn thành 6 Cấp Độ', unlocked: false }
                    ].map((b, idx) => (
                      <div
                        key={idx}
                        className={`p-4 rounded-3xl border-2 text-center space-y-2 transition ${
                          b.unlocked
                            ? 'border-amber-400 bg-amber-950/40 shadow-lg'
                            : 'border-slate-800 bg-slate-950 opacity-50'
                        }`}
                      >
                        <div className="text-5xl animate-bounce">{b.icon}</div>
                        <div className="text-xs font-black text-white">{b.title}</div>
                        <div className="text-[10px] text-slate-400">{b.desc}</div>
                        <div className="text-[9px] font-mono-code text-amber-300 font-bold">
                          {b.unlocked ? '✅ Đã Mở Khóa' : '🔒 Chưa Mở'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: ACTIVITY LOGS */}
            {activeProfileTab === 'logs' && (
              <div className="p-6 rounded-3xl border border-slate-800 bg-slate-950 space-y-4 shadow-xl">
                <h3 className="text-sm font-black uppercase text-purple-300 tracking-wider flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-purple-400" />
                  <span>Nhật Ký Đăng Nhập & Lịch Sử Hoạt Động (Audit Logs):</span>
                </h3>

                <div className="space-y-2 text-xs font-mono-code">
                  {[
                    { time: 'Hôm nay, 01:40', action: 'Đăng nhập hệ thống bằng tài khoản Bé Minh Anh', ip: '192.168.1.100' },
                    { time: 'Hôm nay, 01:25', action: 'Hoàn thành bài tập Flashcard L1 - Màu Sắc (+10 XP)', ip: '192.168.1.100' },
                    { time: 'Hôm qua, 20:15', action: 'Cập nhật ảnh đại diện & Phương châm học tập', ip: '192.168.1.100' }
                  ].map((l, idx) => (
                    <div key={idx} className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                      <div className="space-y-0.5">
                        <div className="text-slate-200 font-bold">{l.action}</div>
                        <div className="text-[10px] text-slate-400">{l.time}</div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-slate-950 text-slate-400 text-[10px] border border-slate-800">
                        {l.ip}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: SECURITY & CHANGE PASSWORD */}
            {activeProfileTab === 'security' && (
              <div className="p-6 rounded-3xl border border-slate-800 bg-slate-950 space-y-5 shadow-xl max-w-lg mx-auto">
                <h3 className="text-sm font-black uppercase text-pink-300 tracking-wider flex items-center gap-2">
                  <Key className="h-4 w-4 text-pink-400" />
                  <span>Đổi Mật Khẩu & Cài Đặt Bảo Mật:</span>
                </h3>

                <form onSubmit={handleChangePasswordSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="text-slate-300 font-bold block mb-1">Mật khẩu hiện tại:</label>
                    <input
                      type="password"
                      value={currPass}
                      onChange={(e) => setCurrPass(e.target.value)}
                      placeholder="••••••••"
                      className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 font-bold block mb-1">Mật khẩu mới:</label>
                    <input
                      type="password"
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                      placeholder="Mật khẩu mới ít nhất 6 ký tự"
                      className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 font-bold block mb-1">Xác nhận mật khẩu mới:</label>
                    <input
                      type="password"
                      value={confirmNewPass}
                      onChange={(e) => setConfirmNewPass(e.target.value)}
                      placeholder="Nhập lại mật khẩu mới"
                      className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white font-bold"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-pink-600 to-purple-600 text-white font-black text-xs shadow-lg hover:scale-105 transition cursor-pointer"
                  >
                    🔑 Đổi Mật Khẩu Ngay
                  </button>
                </form>
              </div>
            )}

          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 2: ĐĂNG NHẬP HỆ THỐNG (LOGIN VIEW) */}
        {/* ========================================================================= */}
        {viewState === 'login' && (
          <div className="max-w-md mx-auto space-y-6 animate-fadeIn p-4">
            <div className="text-center space-y-2">
              <div className="text-6xl animate-bounce">🦄</div>
              <h3 className="text-2xl font-black font-heading text-white">ĐĂNG NHẬP HỌC VIÊN</h3>
              <p className="text-xs text-slate-300">Nhập email hoặc tên đăng nhập để tiếp tục lộ trình học tập!</p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-bold block mb-1">Email / Tên Đăng Nhập:</label>
                <input
                  type="text"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="VD: minhanh@kidsenglish.edu.vn"
                  className="w-full p-3 rounded-2xl border border-slate-700 bg-slate-950 text-white font-bold"
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Mật Khẩu:</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full p-3 pr-10 rounded-2xl border border-slate-700 bg-slate-950 text-white font-bold"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-slate-700 text-pink-500"
                  />
                  <span>Ghi nhớ đăng nhập</span>
                </label>

                <button
                  type="button"
                  onClick={() => setViewState('forgot_password')}
                  className="text-pink-300 hover:underline font-bold"
                >
                  Quên mật khẩu?
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 text-white font-black text-sm shadow-xl hover:scale-105 transition cursor-pointer"
              >
                🚀 Đăng Nhập Ngay
              </button>
            </form>

            <div className="text-center text-xs text-slate-400 pt-2 border-t border-slate-800">
              Chưa có tài khoản học?{' '}
              <button
                onClick={() => setViewState('register')}
                className="text-yellow-300 font-black hover:underline"
              >
                Đăng ký ngay tại đây!
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 3: ĐĂNG KÝ TÀI KHOẢN MỚI (REGISTER VIEW) */}
        {/* ========================================================================= */}
        {viewState === 'register' && (
          <div className="max-w-lg mx-auto space-y-5 animate-fadeIn p-4">
            <div className="text-center space-y-1">
              <h3 className="text-2xl font-black font-heading text-white">ĐĂNG KÝ TÀI KHOẢN MỚI</h3>
              <p className="text-xs text-slate-300">Tạo tài khoản học tiếng Anh cho bé chỉ trong 30 giây!</p>
            </div>

            <form onSubmit={handleRegisterSubmit} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-300 font-bold block mb-1">Họ và Tên Bé:</label>
                <input
                  type="text"
                  value={regFullName}
                  onChange={(e) => setRegFullName(e.target.value)}
                  placeholder="VD: Nguyễn Ngọc Minh Anh"
                  className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white font-bold"
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Email / Tên Đăng Nhập:</label>
                <input
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="VD: minhanh@gmail.com"
                  className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Mật khẩu:</label>
                  <input
                    type="password"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white font-bold"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">Xác nhận mật khẩu:</label>
                  <input
                    type="password"
                    value={regConfirmPassword}
                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Chọn Avatar Đại Diện:</label>
                <div className="flex justify-center gap-2 flex-wrap">
                  {avatarPresets.map((av, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setRegAvatar(av)}
                      className={`text-2xl p-2 rounded-xl border transition ${
                        regAvatar === av ? 'border-amber-400 bg-amber-950 scale-110' : 'border-slate-800 bg-slate-950'
                      }`}
                    >
                      {av}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black text-sm shadow-xl hover:scale-105 transition cursor-pointer"
              >
                🎉 Đăng Ký Tài Khoản Ngay
              </button>
            </form>
          </div>
        )}

        {/* MODAL THÊM TRƯỜNG TÙY CHỈNH (ADD CUSTOM FIELD MODAL) */}
        {showAddFieldModal && (
          <div className="fixed inset-0 z-[1000000] flex items-center justify-center bg-slate-950/80 p-2 sm:p-4 overflow-y-auto">
            <div className="w-full max-w-md max-h-[85vh] overflow-y-auto rounded-3xl border-2 border-amber-400 bg-slate-900 p-5 space-y-4 shadow-2xl custom-scrollbar my-auto">
              <h3 className="text-lg font-black text-yellow-300 font-heading">➕ Thêm Thông Tin Cá Nhân Tùy Chỉnh</h3>
              
              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Tên trường thông tin (VD: Sở thích, Trường học...):</label>
                  <input
                    type="text"
                    value={newFieldLabel}
                    onChange={(e) => setNewFieldLabel(e.target.value)}
                    placeholder="VD: Sở thích cá nhân"
                    className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white font-bold"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">Nội dung giá trị:</label>
                  <input
                    type="text"
                    value={newFieldValue}
                    onChange={(e) => setNewFieldValue(e.target.value)}
                    placeholder="VD: Đọc sách, Vẽ tranh & Chơi đàn Piano"
                    className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white font-bold"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setShowAddFieldModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs"
                >
                  Hủy
                </button>
                <button
                  onClick={handleAddCustomField}
                  className="px-5 py-2 rounded-xl bg-amber-500 text-slate-950 font-black text-xs shadow hover:scale-105 transition"
                >
                  Lưu Thông Tin
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL THÊM HỒ SƠ THÀNH VIÊN GIA ĐÌNH MỚI */}
        {showAddFamilyModal && (
          <div className="fixed inset-0 z-[1000000] flex items-center justify-center bg-slate-950/80 p-2 sm:p-4 overflow-y-auto">
            <div className="w-full max-w-md max-h-[85vh] overflow-y-auto rounded-3xl border-2 border-cyan-400 bg-slate-900 p-5 space-y-4 shadow-2xl custom-scrollbar my-auto">
              <h3 className="text-lg font-black text-cyan-300 font-heading">👨‍👩‍👧‍👦 Thêm Hồ Sơ Thành Viên Gia Đình</h3>
              
              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Tên thành viên / Bé:</label>
                  <input
                    type="text"
                    value={newFamilyName}
                    onChange={(e) => setNewFamilyName(e.target.value)}
                    placeholder="VD: Nguyễn Ngọc Bảo An"
                    className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white font-bold"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">Vai trò:</label>
                  <select
                    value={newFamilyRole}
                    onChange={(e) => setNewFamilyRole(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white font-bold"
                  >
                    <option value="Học Viên Nhí">👧 Học Viên Nhí</option>
                    <option value="Phụ Huynh">👨‍💼 Phụ Huynh</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setShowAddFamilyModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs"
                >
                  Hủy
                </button>
                <button
                  onClick={handleAddFamilyMember}
                  className="px-5 py-2 rounded-xl bg-cyan-600 text-white font-black text-xs shadow hover:scale-105 transition"
                >
                  Tạo Hồ Sơ
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
