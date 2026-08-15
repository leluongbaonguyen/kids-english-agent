import React, { useState, useEffect } from 'react';
import { X, Award, ShieldCheck, BarChart3, Clock, Calendar, Star, Trophy, Download, Printer, CheckCircle2, Target, History, Sparkles, TrendingUp, AlertCircle, Settings, Bell } from 'lucide-react';
import { DBSyncEngine } from '../services/dbSyncEngine';
import { NativePushService } from '../services/nativePushService';

export default function ParentDashboardModal({
  isOpen,
  onClose,
  childName = 'Bé Minh Anh',
  totalXP = 420,
  totalStars = 36,
  streakDays = 5,
  masteredCount = 35,
  totalWords = 100,
  selectedLevel = 'L1',
  addToast
}) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('analytics'); // 'analytics' | 'weekly_chart' | 'audit_timeline' | 'certificate'
  const [pushStatus, setPushStatus] = useState('unknown');

  useEffect(() => {
    if ('Notification' in window) {
      setPushStatus(Notification.permission);
    } else {
      setPushStatus('unsupported');
    }
  }, []);

  const handleEnablePushNotifications = async () => {
    const res = await NativePushService.requestNotificationPermission();
    if (res.granted) {
      setPushStatus('granted');
      NativePushService.scheduleDailyReminders();
      if (addToast) addToast('🔔 Đã bật thành công Thông Báo Nhắc Học Nhắc Nhở Hàng Ngày trên iOS/Thiết Bị!', 'success');
    } else {
      setPushStatus(res.reason || 'denied');
      if (addToast) addToast('⚠️ Vui lòng cho phép quyền Thông Báo trong Cài đặt iPhone/iPad của bạn!', 'warning');
    }
  };

  // Daily goal persistence state
  const [dailyGoalMinutes, setDailyGoalMinutes] = useState(() => {
    try {
      return parseInt(localStorage.getItem('kids_daily_goal_minutes') || '15', 10);
    } catch {
      return 15;
    }
  });

  const [studyMinutesToday, setStudyMinutesToday] = useState(12);

  // Weekly study data (Mon to Sun)
  const weeklyData = [
    { day: 'T2', mins: 15, accuracy: 90 },
    { day: 'T3', mins: 18, accuracy: 95 },
    { day: 'T4', mins: 12, accuracy: 88 },
    { day: 'T5', mins: 20, accuracy: 92 },
    { day: 'T6', mins: 15, accuracy: 85 },
    { day: 'T7', mins: 25, accuracy: 96 },
    { day: 'CN', mins: 12, accuracy: 91 }
  ];

  // Learner Event Audit Trail
  const [learnerEvents, setLearnerEvents] = useState(() => {
    try {
      const logs = JSON.parse(localStorage.getItem('v3_event_logs') || '[]');
      return logs.slice(-25).reverse();
    } catch {
      return [
        { id: 1, eventName: 'flashcard_completed', timestamp: 'Hôm nay, 19:30', payload: { word: 'Apple', score: 100 } },
        { id: 2, eventName: 'speech_recognition_passed', timestamp: 'Hôm nay, 19:32', payload: { word: 'Butterfly', accuracy: '95%' } },
        { id: 3, eventName: 'quiz_passed', timestamp: 'Hôm nay, 19:40', payload: { level: 'L1', score: '5/5' } }
      ];
    }
  });

  // Skill metrics
  const skills = [
    { name: '🎧 Nghe & Nhận Âm (Listening)', score: 88, color: 'bg-cyan-500' },
    { name: '🎤 Nói & Phát Âm AI (Speaking)', score: 82, color: 'bg-pink-500' },
    { name: '📖 Đọc & Lật Thẻ 3D (Reading)', score: 86, color: 'bg-emerald-500' },
    { name: '✍️ Ghép Chữ & Chính Tả (Spelling)', score: 74, color: 'bg-purple-500' },
    { name: '🧠 Từ Vựng SRS (Vocabulary)', score: 90, color: 'bg-amber-500' },
    { name: '🔤 Mẫu Câu & Phonics (Grammar)', score: 78, color: 'bg-indigo-500' }
  ];

  // Weak words needing review
  const weakWords = [
    { word: 'Elephant', meaning: 'Con voi', ipa: '/ˈel.ɪ.fənt/', accuracy: '60%' },
    { word: 'Rainbow', meaning: 'Cầu vồng', ipa: '/ˈreɪn.boʊ/', accuracy: '65%' },
    { word: 'Submarine', meaning: 'Tàu ngầm', ipa: '/ˌsʌb.məˈriːn/', accuracy: '55%' }
  ];

  const handleSaveDailyGoal = (mins) => {
    setDailyGoalMinutes(mins);
    try {
      localStorage.setItem('kids_daily_goal_minutes', mins.toString());
      DBSyncEngine.trackEvent('parent_update_daily_goal', { mins, actor: 'bao_nguyen' });
    } catch (e) {}
    if (addToast) addToast(`🎯 Đã cập nhật mục tiêu học hàng ngày: ${mins} phút!`, 'success');
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-slate-950/95 backdrop-blur-2xl p-3 sm:p-6 overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-5xl modal-device-fit max-h-[85vh] md:max-h-[88vh] overflow-y-auto rounded-3xl border-2 border-cyan-500/50 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 p-4 sm:p-6 space-y-4 text-white shadow-2xl custom-scrollbar flex flex-col justify-between">
        
        <div>
          {/* HEADER */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-600 text-slate-950 text-3xl font-black shadow-lg">
                👨‍👩‍👧‍👦
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-cyan-500/20 border border-cyan-400 px-2.5 py-0.5 text-[10px] font-black text-cyan-300">
                    Dành Cho Phụ Huynh Ba Bảo Nguyên
                  </span>
                  <span className="rounded-full bg-pink-500/20 border border-pink-400 px-2.5 py-0.5 text-[10px] font-black text-pink-300">
                    Học Viên: {childName} 👧
                  </span>
                </div>
                <h2 className="text-xl md:text-2xl font-black font-heading text-white">
                  BẢNG QUẢN TRỊ & BÁO CÁO PHỤ HUYNH SIÊU CHI TIẾT
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="p-2 rounded-2xl bg-rose-950 border border-rose-500/40 text-rose-300 hover:bg-rose-900 transition cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* TAB NAVIGATION */}
          <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3 pt-3">
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-4 py-2 rounded-2xl font-black text-xs transition flex items-center gap-2 cursor-pointer ${
                activeTab === 'analytics'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-lg'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <BarChart3 className="h-4 w-4" />
              <span>📊 Báo Cáo Kỹ Năng & Mục Tiêu</span>
            </button>

            <button
              onClick={() => setActiveTab('weekly_chart')}
              className={`px-4 py-2 rounded-2xl font-black text-xs transition flex items-center gap-2 cursor-pointer ${
                activeTab === 'weekly_chart'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <TrendingUp className="h-4 w-4" />
              <span>📈 Biểu Đồ Học Tuần ({weeklyData.reduce((acc, curr) => acc + curr.mins, 0)} phút)</span>
            </button>

            <button
              onClick={() => setActiveTab('audit_timeline')}
              className={`px-4 py-2 rounded-2xl font-black text-xs transition flex items-center gap-2 cursor-pointer ${
                activeTab === 'audit_timeline'
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <History className="h-4 w-4" />
              <span>📜 Nhật Ký Hành Động Bé ({learnerEvents.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('certificate')}
              className={`px-4 py-2 rounded-2xl font-black text-xs transition flex items-center gap-2 cursor-pointer ${
                activeTab === 'certificate'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-lg'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Trophy className="h-4 w-4" />
              <span>🎓 Bằng Chứng Nhận Kế Thừa</span>
            </button>
          </div>

          {/* TAB 1: ANALYTICS & DAILY GOALS */}
          {activeTab === 'analytics' && (
            <div className="space-y-6 animate-fadeIn pt-2">
              {/* Quick KPI Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-3xl bg-slate-950 border border-slate-800 space-y-1 shadow-lg">
                  <div className="text-xs text-slate-400 font-bold flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-cyan-400" /> Đã học hôm nay
                  </div>
                  <div className="text-2xl font-black text-cyan-300 font-mono-code">{studyMinutesToday} / {dailyGoalMinutes} phút</div>
                  <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                    <div className="h-full bg-cyan-400 transition-all duration-500" style={{ width: `${Math.min(100, (studyMinutesToday / dailyGoalMinutes) * 100)}%` }}></div>
                  </div>
                </div>

                <div className="p-4 rounded-3xl bg-slate-950 border border-slate-800 space-y-1 shadow-lg">
                  <div className="text-xs text-slate-400 font-bold flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-amber-400" /> Chuỗi ngày liên tục
                  </div>
                  <div className="text-2xl font-black text-yellow-300 font-mono-code">🔥 {streakDays} ngày</div>
                  <p className="text-[10px] text-amber-200/70 font-bold">Duy trì đều đặn 7 ngày</p>
                </div>

                <div className="p-4 rounded-3xl bg-slate-950 border border-slate-800 space-y-1 shadow-lg">
                  <div className="text-xs text-slate-400 font-bold flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 text-emerald-400" /> Từ thành thạo (Mastered)
                  </div>
                  <div className="text-2xl font-black text-emerald-300 font-mono-code">{masteredCount}/{totalWords} từ</div>
                  <p className="text-[10px] text-emerald-200/70 font-bold">SRS Interval &gt; 5 ngày</p>
                </div>

                <div className="p-4 rounded-3xl bg-slate-950 border border-slate-800 space-y-1 shadow-lg">
                  <div className="text-xs text-slate-400 font-bold flex items-center gap-1">
                    <Trophy className="h-3.5 w-3.5 text-indigo-400" /> Điểm kinh nghiệm & Sao
                  </div>
                  <div className="text-2xl font-black text-indigo-300 font-mono-code">{totalXP} XP • ⭐ {totalStars}</div>
                  <p className="text-[10px] text-purple-200/70 font-bold">Level hiện tại: {selectedLevel}</p>
                </div>
              </div>

              {/* DAILY GOAL CONFIGURATOR */}
              <div className="p-5 rounded-3xl border border-slate-800 bg-slate-950 space-y-3 shadow-xl">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black uppercase text-amber-300 tracking-wider flex items-center gap-2">
                    <Target className="h-4 w-4 text-amber-400" />
                    <span>Cài Đặt Mục Tiêu Thời Gian Học Hàng Ngày Cho Bé:</span>
                  </h3>
                  <span className="text-xs font-bold text-slate-400">Mục tiêu hiện tại: <strong className="text-amber-300">{dailyGoalMinutes} phút/ngày</strong></span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {[10, 15, 20, 30, 45].map((mins) => (
                    <button
                      key={mins}
                      onClick={() => handleSaveDailyGoal(mins)}
                      className={`px-4 py-2 rounded-2xl text-xs font-black transition cursor-pointer flex items-center gap-1.5 ${
                        dailyGoalMinutes === mins
                          ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md border border-amber-300 scale-105'
                          : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
                      }`}
                    >
                      <span>⏱️ {mins} phút</span>
                      {dailyGoalMinutes === mins && <CheckCircle2 className="h-3.5 w-3.5" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* IOS / WEB PUSH NOTIFICATIONS ACTIVATION CARD */}
              <div className="p-5 rounded-3xl border border-cyan-500/40 bg-gradient-to-r from-slate-950 via-cyan-950/30 to-slate-950 space-y-3 shadow-xl">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-2xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/40">
                      <Bell className="h-5 w-5 animate-bounce" />
                    </div>
                    <div>
                      <h3 className="text-xs font-black uppercase text-cyan-300 tracking-wider">
                        THÔNG BÁO NHẮC HỌC HÀNG NGÀY TRÊN IPHONE / IPAD / WEB:
                      </h3>
                      <p className="text-[11px] text-slate-300">
                        Nhắc bé ôn từ vựng & giữ chuỗi học tập (Streak) vào 9:00 sáng & 19:00 tối hàng ngày
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleEnablePushNotifications}
                    className={`px-5 py-2.5 rounded-2xl text-xs font-black transition cursor-pointer shadow-lg flex items-center gap-2 ${
                      pushStatus === 'granted'
                        ? 'bg-emerald-950 border border-emerald-500 text-emerald-300'
                        : 'bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 text-slate-950 hover:scale-105'
                    }`}
                  >
                    <Bell className="h-4 w-4" />
                    <span>
                      {pushStatus === 'granted'
                        ? '✔ Đã Bật Thông Báo iOS'
                        : '🔔 BẬT THÔNG BÁO NHẮC HỌC NGAY'}
                    </span>
                  </button>
                </div>
              </div>

              {/* SKILLS PROGRESS BARS */}
              <div className="p-6 rounded-3xl border border-slate-800 bg-slate-950 space-y-4 shadow-xl">
                <h3 className="text-sm font-black uppercase text-cyan-300 tracking-wider flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-cyan-400" />
                  <span>Phân Tích 6 Kỹ Năng Ngôn Ngữ Của Bé Minh Anh:</span>
                </h3>

                <div className="space-y-3">
                  {skills.map((s, idx) => (
                    <div key={idx} className="space-y-1 text-xs font-mono-code font-bold">
                      <div className="flex justify-between text-slate-300">
                        <span>{s.name}</span>
                        <span className="text-white">{s.score}%</span>
                      </div>
                      <div className="h-3 w-full bg-slate-900 rounded-full border border-slate-800 overflow-hidden">
                        <div className={`h-full ${s.color} transition-all duration-500`} style={{ width: `${s.score}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* WEAK WORDS NEEDING ATTENTION */}
              <div className="p-5 rounded-3xl border border-rose-500/30 bg-slate-950 space-y-3 shadow-xl">
                <h3 className="text-xs font-black uppercase text-rose-400 tracking-wider flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-rose-400" />
                  <span>Top Từ Vựng Bé Cần Củng Cố Lại (Accuracy &lt; 70%):</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {weakWords.map((w, idx) => (
                    <div key={idx} className="p-3 rounded-2xl bg-rose-950/30 border border-rose-500/30 text-xs space-y-1">
                      <div className="flex justify-between items-center font-bold text-rose-300">
                        <span>{w.word}</span>
                        <span className="px-2 py-0.2 rounded-full bg-rose-500/20 text-[10px]">{w.accuracy}</span>
                      </div>
                      <div className="text-[11px] text-slate-300">{w.meaning} • {w.ipa}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: WEEKLY ACTIVITY CHART */}
          {activeTab === 'weekly_chart' && (
            <div className="space-y-6 animate-fadeIn pt-2">
              <div className="p-6 rounded-3xl border border-slate-800 bg-slate-950 space-y-4 shadow-xl">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-black uppercase text-pink-300 tracking-wider flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-pink-400" />
                    <span>Biểu Đồ Thời Gian Học Hàng Ngày Trong Tuần:</span>
                  </h3>
                  <span className="text-xs font-bold text-slate-400">Trung bình: 17.1 phút/ngày</span>
                </div>

                {/* SVG Visual Bar Chart */}
                <div className="h-56 w-full flex items-end justify-between gap-2 sm:gap-4 pt-6 pb-2 px-2 border-b border-slate-800">
                  {weeklyData.map((d, i) => {
                    const heightPercent = Math.min(100, (d.mins / 30) * 100);
                    return (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                        <div className="text-[10px] font-mono-code font-bold text-pink-300 opacity-80 group-hover:opacity-100">
                          {d.mins}m
                        </div>
                        <div className="w-full max-w-[40px] bg-slate-900 rounded-t-xl overflow-hidden h-full flex items-end">
                          <div
                            className="w-full bg-gradient-to-t from-pink-600 via-purple-500 to-indigo-400 rounded-t-xl transition-all duration-700 group-hover:brightness-125"
                            style={{ height: `${heightPercent}%` }}
                          ></div>
                        </div>
                        <div className="text-xs font-bold text-slate-300">{d.day}</div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-between text-xs text-slate-400 font-medium">
                  <span>Mục tiêu khuyến nghị: 15–20 phút/ngày</span>
                  <span className="text-emerald-400 font-bold">Độ chính xác trung bình tuần: 91.8%</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: LEARNER AUDIT TIMELINE */}
          {activeTab === 'audit_timeline' && (
            <div className="space-y-4 animate-fadeIn pt-2">
              <h3 className="text-xs font-black uppercase text-purple-300 tracking-wider flex items-center gap-2">
                <History className="h-4 w-4 text-purple-400" />
                <span>Nhật Ký Tương Tác & Bài Học Của Bé Minh Anh (Real-time Timeline):</span>
              </h3>

              <div className="border border-slate-800 rounded-2xl p-4 bg-slate-950 max-h-72 overflow-y-auto custom-scrollbar font-mono-code text-[11px] space-y-2">
                {learnerEvents.map((log, idx) => (
                  <div key={log.id || idx} className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1 flex justify-between items-center">
                    <div className="space-y-0.5">
                      <div className="font-bold text-cyan-300">[{log.eventName}]</div>
                      <div className="text-slate-300">{JSON.stringify(log.payload)}</div>
                    </div>
                    <span className="text-[10px] text-slate-500 font-bold shrink-0">{log.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: CERTIFICATE GENERATOR */}
          {activeTab === 'certificate' && (
            <div className="space-y-4 text-center animate-fadeIn pt-2">
              <div className="flex justify-end">
                <button
                  onClick={handlePrintCertificate}
                  className="px-4 py-2 rounded-2xl bg-amber-500 text-slate-950 font-black text-xs shadow-lg flex items-center gap-1.5 cursor-pointer hover:scale-105 transition"
                >
                  <Printer className="h-4 w-4" /> In Bằng Chứng Nhận
                </button>
              </div>

              {/* PRINTABLE CERTIFICATE CARD */}
              <div className="p-8 rounded-3xl border-4 border-amber-400 bg-gradient-to-br from-amber-950 via-slate-950 to-amber-950 space-y-6 shadow-2xl text-center relative overflow-hidden">
                <div className="text-xs font-mono-code font-bold text-amber-400 uppercase tracking-widest">
                  OFFICIAL CERTIFICATE OF COMPLETION • SYSTEM VERIFIED
                </div>

                <div className="text-5xl animate-bounce">🎓</div>

                <h1 className="text-3xl md:text-4xl font-black font-heading text-yellow-300 tracking-tight">
                  CHỨNG NHẬN HOÀN THÀNH KHÓA HỌC
                </h1>

                <div className="text-sm text-slate-300">Trao tặng cho bé học viên xuất sắc:</div>

                <div className="text-3xl md:text-4xl font-black text-white font-heading underline decoration-amber-400">
                  {childName.toUpperCase()}
                </div>

                <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                  Đã hoàn thành xuất sắc toàn bộ 100 từ vựng và bài tập của <strong>{selectedLevel} - Tiếng Anh Trẻ Em Super Agent</strong> với tổng số điểm <strong>{totalXP} XP</strong> và <strong>{totalStars} ⭐</strong>!
                </p>

                <div className="flex justify-between items-center pt-6 border-t border-amber-500/30 text-xs font-mono-code font-bold text-amber-300">
                  <div>Ngày cấp: {new Date().toLocaleDateString('vi-VN')}</div>
                  <div>ID Chứng nhận: KEA-2026-MINHANH-88</div>
                  <div>Chữ ký Ba Bảo Nguyên ✍️</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="flex justify-end border-t border-slate-800 pt-3">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs hover:bg-slate-700 transition cursor-pointer"
          >
            Đóng Báo Cáo
          </button>
        </div>

      </div>
    </div>
  );
}
