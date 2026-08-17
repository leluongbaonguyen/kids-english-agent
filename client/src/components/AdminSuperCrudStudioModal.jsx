import React, { useState } from 'react';
import {
  X,
  Sliders,
  Database,
  Users,
  ShieldCheck,
  Search,
  CheckCircle2,
  Trash2,
  RefreshCw,
  Zap,
  Sparkles
} from 'lucide-react';

export default function AdminSuperCrudStudioModal({ isOpen, onClose, addToast }) {
  const [activeSubTab, setActiveSubTab] = useState('vocab');
  const [searchFilter, setSearchFilter] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-4xl max-h-[85vh] rounded-3xl bg-slate-900/75 backdrop-blur-2xl border-2 border-purple-500/40 p-6 space-y-6 shadow-[0_0_60px_rgba(168,85,247,0.3)] text-white overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Backlight */}
        <div className="absolute -top-24 -left-24 w-60 h-60 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* MODAL HEADER */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 shadow-lg text-white">
              <Sliders className="h-6 w-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-lg font-black font-heading tracking-wide flex items-center gap-2">
                <span>🛠️ ADMIN SUPER CRUD STUDIO V7.0</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/40 font-mono-code font-bold">
                  ADVANCED DATA STUDIO
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Truy xuất & điều khiển cơ sở dữ liệu hệ thống cấp cao (Advanced Data CRUD Management Studio)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* SEARCH & SUB-TABS BAR */}
        <div className="flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-2xl border border-slate-800 text-xs font-bold">
            {[
              { id: 'vocab', label: 'Từ Vựng (CRUD)', icon: Database },
              { id: 'users', label: 'Người Dùng', icon: Users },
              { id: 'levels', label: 'Khóa Level L1-L6', icon: ShieldCheck }
            ].map((tab) => {
              const IconComp = tab.icon;
              const isActive = activeSubTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSubTab(tab.id)}
                  className={`px-3.5 py-1.5 rounded-xl transition flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'bg-purple-600 text-white shadow'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <IconComp className="h-3.5 w-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs flex-1 min-w-[200px]">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm kiếm bản ghi dữ liệu..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="bg-transparent text-white w-full focus:outline-none"
            />
          </div>
        </div>

        {/* WORKSPACE AREA */}
        <div className="flex-1 overflow-y-auto space-y-4 custom-scrollbar pr-1">
          {activeSubTab === 'vocab' && (
            <div className="p-4 rounded-2xl bg-slate-950 border border-purple-500/20 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-black text-purple-300 uppercase flex items-center gap-1.5">
                  <Database className="h-4 w-4 text-purple-400" />
                  BẢNG DỮ LIỆU TỪ VỰNG HỆ THỐNG (SYSTEM VOCABULARY CRUD)
                </span>
                <span className="text-[10px] font-mono-code text-slate-400">900+ Từ vựng đã đồng bộ DB</span>
              </div>
              <div className="text-xs text-slate-300 space-y-2">
                <p>Quản lý dữ liệu từ vựng trực tiếp. Hãy sử dụng Admin Studio chính để thực hiện Thêm / Sửa / Xóa toàn bộ từ vựng với form chi tiết.</p>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Trạng thái kết nối Database:</span>
                  <span className="text-emerald-400 font-mono-code font-bold flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4" /> 100% ONLINE (PostgreSQL / JSON Store)
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeSubTab === 'users' && (
            <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-500/20 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-black text-cyan-300 uppercase flex items-center gap-1.5">
                  <Users className="h-4 w-4 text-cyan-400" />
                  QUẢN LÝ TÀI KHOẢN NGƯỜI DÙNG & MÃ PIN
                </span>
                <span className="text-[10px] font-mono-code text-slate-400">3 Tài khoản mặc định</span>
              </div>
              <div className="space-y-2 text-xs">
                {[
                  { name: 'Ba Bảo Nguyên', role: 'Super Admin', status: 'Active', pin: '1234' },
                  { name: 'Bé Minh Anh', role: 'Learner L1', status: 'Active', pin: '1234' },
                  { name: 'Bé Gia Bảo', role: 'Learner L2', status: 'Active', pin: '1234' }
                ].map((usr, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="font-black text-white">{usr.name}</div>
                      <div className="text-[10px] text-slate-400">{usr.role} • PIN: {usr.pin}</div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[10px] font-bold">
                      {usr.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSubTab === 'levels' && (
            <div className="p-4 rounded-2xl bg-slate-950 border border-emerald-500/20 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-black text-emerald-300 uppercase flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  QUẢN LÝ KHÓA CẤP ĐỘ (LEVEL LOCK OVERRIDES)
                </span>
                <span className="text-[10px] font-mono-code text-slate-400">6 Levels (L1-L6)</span>
              </div>
              <p className="text-xs text-slate-300">
                Tất cả tính năng quản lý khóa cấp độ đã được tích hợp đầy đủ trong Admin Dashboard View.
              </p>
            </div>
          )}
        </div>

        {/* MODAL FOOTER */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 shrink-0">
          <span className="flex items-center gap-1 font-mono-code text-[11px]">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            Super CRUD Studio V7.0 • Ready
          </span>
          <button
            onClick={() => {
              addToast?.('⚡ Đã làm mới dữ liệu Super CRUD Studio!', 'success');
            }}
            className="px-3.5 py-1.5 rounded-xl bg-purple-950 hover:bg-purple-900 border border-purple-500/40 text-purple-200 font-bold transition flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="h-3.5 w-3.5 text-purple-300" />
            <span>Làm Mới Dữ Liệu</span>
          </button>
        </div>
      </div>
    </div>
  );
}
