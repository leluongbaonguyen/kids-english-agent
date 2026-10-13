import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import {
  Volume2, Sparkles, Star, Search, Filter, Download, Play, Pause,
  ChevronLeft, ChevronRight, X, Eye, BookOpen, Layers, CheckCircle2,
  Table, Grid, LayoutGrid, Clock, ArrowUpDown, RefreshCw, Zap, Award, HelpCircle
} from 'lucide-react';
import {
  COURSE_LEVELS,
  VOCAB_CATEGORIES,
  VOCABULARY_DATABASE,
  getSuperDetailedVocabInfo
} from '../constants/kidsVocabularyDatabase.js';
import VocabSmartIcon from './VocabSmartIcon.jsx';

// Color themes for CEFR Levels L1 - L6
const LEVEL_THEMES = {
  L1: {
    name: 'Khởi Động (4–5 tuổi)',
    gradient: 'from-amber-500 via-orange-500 to-yellow-500',
    border: 'border-amber-400',
    bgBadge: 'bg-amber-500/20 text-amber-300 border-amber-400/40',
    badgeText: 'text-amber-300',
    icon: '🐣'
  },
  L2: {
    name: 'Cơ Bản (5–7 tuổi)',
    gradient: 'from-blue-500 via-cyan-500 to-teal-400',
    border: 'border-cyan-400',
    bgBadge: 'bg-blue-500/20 text-blue-300 border-blue-400/40',
    badgeText: 'text-cyan-300',
    icon: '🦁'
  },
  L3: {
    name: 'Mở Rộng (7–9 tuổi)',
    gradient: 'from-emerald-500 via-teal-500 to-green-400',
    border: 'border-emerald-400',
    bgBadge: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40',
    badgeText: 'text-emerald-300',
    icon: '🚀'
  },
  L4: {
    name: 'Nâng Cao (8–10 tuổi)',
    gradient: 'from-purple-500 via-pink-500 to-indigo-500',
    border: 'border-purple-400',
    bgBadge: 'bg-purple-500/20 text-purple-300 border-purple-400/40',
    badgeText: 'text-purple-300',
    icon: '👑'
  },
  L5: {
    name: 'Tiên Phong (10–12 tuổi)',
    gradient: 'from-rose-500 via-red-500 to-orange-500',
    border: 'border-rose-400',
    bgBadge: 'bg-rose-500/20 text-rose-300 border-rose-400/40',
    badgeText: 'text-rose-300',
    icon: '🌟'
  },
  L6: {
    name: 'Quốc Tế (12+ tuổi)',
    gradient: 'from-teal-500 via-cyan-500 to-sky-400',
    border: 'border-teal-400',
    bgBadge: 'bg-teal-500/20 text-teal-300 border-teal-400/40',
    badgeText: 'text-teal-300',
    icon: '🌎'
  },
  BIO: {
    name: 'Bách Khoa Động Thực Vật Toàn Cầu',
    gradient: 'from-emerald-500 via-green-500 to-teal-400',
    border: 'border-emerald-400',
    bgBadge: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40',
    badgeText: 'text-emerald-300',
    icon: '🌿'
  },
  COLOR: {
    name: 'Bách Khoa Sắc Màu Toàn Cầu',
    gradient: 'from-fuchsia-500 via-rose-500 to-amber-400',
    border: 'border-fuchsia-400',
    bgBadge: 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-400/40',
    badgeText: 'text-fuchsia-300',
    icon: '🎨'
  },
  NUM: {
    name: 'Bách Khoa Số Đếm & Thứ Tự',
    gradient: 'from-amber-500 via-emerald-500 to-cyan-500',
    border: 'border-amber-400',
    bgBadge: 'bg-amber-500/20 text-amber-300 border-amber-400/40',
    badgeText: 'text-amber-300',
    icon: '🔢'
  }
};

export default function FullSystemVocabularyView({
  vocabList = VOCABULARY_DATABASE,
  masteredCards = [],
  toggleMastered,
  addToast,
  onOpenZoomModal
}) {
  // Navigation & Filtering States
  const [selectedLevel, setSelectedLevel] = useState('all'); // 'all' | 'L1'..'L6'
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedWordType, setSelectedWordType] = useState('all');
  const [masteryFilter, setMasteryFilter] = useState('all'); // 'all' | 'mastered' | 'unmastered'
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('detailed_cards'); // 'detailed_cards' | 'data_table' | 'compact_grid'
  
  // Pagination & Display limit
  const [pageSize, setPageSize] = useState(48); // 24 | 48 | 96 | 9999 (All)
  const [currentPage, setCurrentPage] = useState(1);

  // Spotlight Zoom Modal State
  const [activeSpotlight, setActiveSpotlight] = useState(null);

  // Lock body scroll when activeSpotlight modal is open to ensure clean layering
  useEffect(() => {
    if (activeSpotlight) {
      const orig = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = orig;
      };
    }
  }, [activeSpotlight]);

  // Audio & Speech Synthesis
  const [speakingWord, setSpeakingWord] = useState(null);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [autoPlaySeconds, setAutoPlaySeconds] = useState(5);
  const [autoPlayTimer, setAutoPlayTimer] = useState(5);

  // Quick lookup category map
  const categoryMap = useMemo(() => {
    const map = {};
    VOCAB_CATEGORIES.forEach((cat) => {
      map[cat.id] = cat;
    });
    return map;
  }, []);

  // Category options filtered by level if specific level chosen
  const availableCategories = useMemo(() => {
    if (selectedLevel === 'all') {
      return VOCAB_CATEGORIES.filter((c) => c.id !== 'all');
    }
    return VOCAB_CATEGORIES.filter((c) => c.level === selectedLevel);
  }, [selectedLevel]);

  // Audio Play function with fallback
  const playAudio = useCallback((text, slow = false) => {
    if (!('speechSynthesis' in window)) {
      if (addToast) addToast('Trình duyệt chưa hỗ trợ Web Speech API', 'warning');
      return;
    }
    window.speechSynthesis.cancel();
    setSpeakingWord(text.toLowerCase());
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = slow ? 0.75 : 1.0;
    utterance.onend = () => setSpeakingWord(null);
    utterance.onerror = () => setSpeakingWord(null);
    window.speechSynthesis.speak(utterance);
  }, [addToast]);

  // Filter Logic: 100% Unlocked, High Performance
  const filteredList = useMemo(() => {
    const source = Array.isArray(vocabList) && vocabList.length > 0 ? vocabList : VOCABULARY_DATABASE;
    const q = (searchQuery || '').toLowerCase().trim();

    return source.filter((item) => {
      if (!item) return false;

      // Level filter
      if (selectedLevel !== 'all' && item.level !== selectedLevel) return false;

      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;

      // Word type filter
      if (selectedWordType !== 'all' && item.type !== selectedWordType) return false;

      // Mastery filter
      const isMastered = masteredCards.includes(item.id) || masteredCards.includes(item.word);
      if (masteryFilter === 'mastered' && !isMastered) return false;
      if (masteryFilter === 'unmastered' && isMastered) return false;

      // Search query
      if (q) {
        const wordMatch = (item.word || '').toLowerCase().includes(q);
        const meaningMatch = (item.meaning || '').toLowerCase().includes(q);
        const ipaMatch = (item.ipa || '').toLowerCase().includes(q);
        const phoneticMatch = (item.vietnamesePhonetic || '').toLowerCase().includes(q);
        const exampleMatch = (item.example || '').toLowerCase().includes(q);
        const catName = categoryMap[item.category]?.name || '';
        const catMatch = catName.toLowerCase().includes(q);

        if (!wordMatch && !meaningMatch && !ipaMatch && !phoneticMatch && !exampleMatch && !catMatch) {
          return false;
        }
      }

      return true;
    });
  }, [vocabList, selectedLevel, selectedCategory, selectedWordType, masteryFilter, searchQuery, masteredCards, categoryMap]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedLevel, selectedCategory, selectedWordType, masteryFilter, searchQuery, pageSize]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredList.length / (pageSize === 9999 ? 999999 : pageSize)) || 1;
  const paginatedList = useMemo(() => {
    if (pageSize === 9999) return filteredList;
    const start = (currentPage - 1) * pageSize;
    return filteredList.slice(start, start + pageSize);
  }, [filteredList, currentPage, pageSize]);

  // Autoplay Slideshow Effect
  useEffect(() => {
    let interval = null;
    if (isAutoPlay && filteredList.length > 0) {
      interval = setInterval(() => {
        setAutoPlayTimer((prev) => {
          if (prev <= 1) {
            // Advance to next word
            setActiveSpotlight((cur) => {
              const curIdx = cur ? filteredList.findIndex((w) => w.id === cur.id) : -1;
              const nextIdx = (curIdx + 1) % filteredList.length;
              const nextWord = filteredList[nextIdx];
              if (nextWord) {
                playAudio(nextWord.word, false);
              }
              return nextWord;
            });
            return autoPlaySeconds;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setAutoPlayTimer(autoPlaySeconds);
    }
    return () => clearInterval(interval);
  }, [isAutoPlay, autoPlaySeconds, filteredList, playAudio]);

  // Trigger Excel File Download
  const handleDownloadExcel = () => {
    try {
      const link = document.createElement('a');
      link.href = '/Kids_English_Vocabulary_Full_Database.xlsx';
      link.download = 'Kids_English_Vocabulary_Full_Database.xlsx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      if (addToast) {
        addToast('📥 Đang tải xuống file Excel: Kids_English_Vocabulary_Full_Database.xlsx (900 từ)!', 'success');
      }
    } catch (e) {
      console.error(e);
      if (addToast) addToast('Lỗi tải file Excel!', 'error');
    }
  };

  // Keyboard navigation for Spotlight Modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!activeSpotlight) return;
      if (e.key === 'Escape') {
        setActiveSpotlight(null);
      } else if (e.key === 'ArrowRight') {
        const curIdx = filteredList.findIndex((w) => w.id === activeSpotlight.id);
        if (curIdx >= 0 && curIdx < filteredList.length - 1) {
          const next = filteredList[curIdx + 1];
          setActiveSpotlight(next);
          playAudio(next.word);
        }
      } else if (e.key === 'ArrowLeft') {
        const curIdx = filteredList.findIndex((w) => w.id === activeSpotlight.id);
        if (curIdx > 0) {
          const prev = filteredList[curIdx - 1];
          setActiveSpotlight(prev);
          playAudio(prev.word);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSpotlight, filteredList, playAudio]);

  // Overall Statistics Counts
  const stats = useMemo(() => {
    const total = vocabList.length || 900;
    const mastered = masteredCards.length;
    const pct = Math.min(100, Math.round((mastered / total) * 100));

    const levelCounts = {};
    COURSE_LEVELS.forEach((lvl) => {
      levelCounts[lvl.id] = 0;
    });
    vocabList.forEach((v) => {
      if (v?.level && levelCounts[v.level] !== undefined) {
        levelCounts[v.level]++;
      }
    });

    return { total, mastered, pct, levelCounts };
  }, [vocabList, masteredCards]);

  return (
    <div className="w-full space-y-6 animate-fadeIn pb-12 select-none">
      {/* ========================================================================= */}
      {/* 1. HERO HEADER: TỔNG QUAN KHO TỪ VỰNG SIÊU CHI TIẾT 900 TỪ                */}
      {/* ========================================================================= */}
      <div className="relative rounded-3xl border-2 border-cyan-400/60 bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950 p-5 sm:p-6 md:p-8 shadow-2xl overflow-hidden backdrop-blur-2xl">
        {/* Glow ambient effects */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 h-72 w-72 rounded-full bg-pink-500/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 text-xs font-black uppercase tracking-wider shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-yellow-300 animate-spin" />
              <span>KHO DỮ LIỆU TỪ VỰNG CHÍNH THỨC • 100% ĐẦY ĐỦ & KHÔNG KHÓA</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black font-heading text-white tracking-tight leading-tight">
              TOÀN BỘ {vocabList.length} TỪ VỰNG HỆ THỐNG <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-400 to-amber-300">SIÊU CHI TIẾT</span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              Khám phá toàn bộ {vocabList.length} từ vựng cốt lõi chuẩn CEFR & Cambridge qua 6 cấp độ (L1–L6) cùng Chuyên đề Bách Khoa Động Thực Vật Toàn Cầu (BIO), Bách Khoa Sắc Màu Toàn Cầu (COLOR) và Bách Khoa Số Đếm & Thứ Tự (NUM). Tích hợp phiên âm quốc tế IPA, đọc tiếng Việt bồi, loại từ, câu ví dụ song ngữ, mẹo nhớ thông minh & giọng phát âm chuẩn bản ngữ!
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0 w-full lg:w-auto">
            {/* Download Excel Button */}
            <button
              onClick={handleDownloadExcel}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 text-white font-black text-xs shadow-xl shadow-emerald-600/30 hover:scale-105 active:scale-95 transition cursor-pointer border border-emerald-400/50"
              title="Tải về file Excel chứa toàn bộ 900 từ vựng và 9 sheet chi tiết"
            >
              <Download className="h-4 w-4" />
              <span>XUẤT EXCEL TỪ VỰNG (.XLSX)</span>
            </button>

            {/* Autoplay Slideshow Button */}
            <button
              onClick={() => {
                const next = !isAutoPlay;
                setIsAutoPlay(next);
                if (next && filteredList.length > 0) {
                  const target = filteredList[0];
                  setActiveSpotlight(target);
                  playAudio(target.word);
                }
                if (addToast) {
                  addToast(
                    next ? `▶️ Đã bật tự động đọc từ theo chu kỳ ${autoPlaySeconds}s!` : '⏸️ Đã tạm dừng tự động đọc.',
                    next ? 'success' : 'info'
                  );
                }
              }}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-3 rounded-2xl font-black text-xs transition cursor-pointer shadow-xl active:scale-95 border ${
                isAutoPlay
                  ? 'bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 text-slate-950 border-yellow-200 animate-pulse'
                  : 'bg-slate-900 border-slate-700 text-slate-200 hover:text-white hover:border-pink-500'
              }`}
            >
              {isAutoPlay ? (
                <>
                  <Pause className="h-4 w-4 fill-slate-950" />
                  <span>DỪNG TỰ ĐỘNG ĐỌC ({autoPlayTimer}s)</span>
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 fill-white" />
                  <span>TỰ ĐỘNG ĐỌC TỪ</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 9 Level Breakdown Pills Bar (L1-L6 + BIO + COLOR + NUM) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-2 pt-6 border-t border-slate-800/80 mt-6">
          {COURSE_LEVELS.map((lvl) => {
            const theme = LEVEL_THEMES[lvl.id] || LEVEL_THEMES.L1;
            const count = stats.levelCounts[lvl.id] || 150;
            const isSelected = selectedLevel === lvl.id;

            return (
              <button
                key={lvl.id}
                onClick={() => {
                  setSelectedLevel(isSelected ? 'all' : lvl.id);
                  setSelectedCategory('all');
                }}
                className={`flex items-center gap-2 p-2.5 rounded-2xl border transition text-left cursor-pointer ${
                  isSelected
                    ? `bg-gradient-to-r ${theme.gradient} text-slate-950 font-black shadow-lg shadow-cyan-500/20 scale-105 border-white`
                    : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <span className="text-xl shrink-0">{lvl.icon}</span>
                <div className="min-w-0">
                  <div className="text-xs font-black truncate">{lvl.id} • {theme.name}</div>
                  <div className={`text-[10px] font-bold ${isSelected ? 'text-slate-900' : 'text-slate-400'}`}>
                    {count} Từ vựng
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. SMART CONTROLS & FILTER BAR                                            */}
      {/* ========================================================================= */}
      <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-4 sm:p-5 shadow-xl space-y-4 backdrop-blur-xl">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Live Search Box */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Tra cứu tức thì 900 từ (tiếng Anh, nghĩa tiếng Việt, IPA, loại từ, chủ đề)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-slate-700 bg-slate-900 pl-10 pr-9 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none transition font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-2xl border border-slate-800 self-center shrink-0">
            <button
              onClick={() => setViewMode('detailed_cards')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${
                viewMode === 'detailed_cards'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Chế độ Thẻ Siêu Chi Tiết"
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Thẻ Chi Tiết</span>
            </button>

            <button
              onClick={() => setViewMode('data_table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${
                viewMode === 'data_table'
                  ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Chế độ Bảng Toàn Bộ CSDL"
            >
              <Table className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Bảng Dữ Liệu</span>
            </button>

            <button
              onClick={() => setViewMode('compact_grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${
                viewMode === 'compact_grid'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Chế độ Lưới Thu Gọn"
            >
              <Grid className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Thu Gọn</span>
            </button>
          </div>
        </div>

        {/* Secondary Filter Dropdowns & Pills */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-slate-900">
          <div className="flex flex-wrap items-center gap-2">
            {/* Level Selector Dropdown / Button */}
            <select
              value={selectedLevel}
              onChange={(e) => {
                setSelectedLevel(e.target.value);
                setSelectedCategory('all');
              }}
              className="bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-1.5 text-xs font-bold focus:outline-none focus:border-cyan-400 cursor-pointer"
            >
              <option value="all">🌟 Tất Cả Cấp Độ ({vocabList.length} Từ)</option>
              <option value="L1">🐣 L1 • Khởi Động (150 Từ - 4-5T)</option>
              <option value="L2">🦁 L2 • Cơ Bản (150 Từ - 5-7T)</option>
              <option value="L3">🚀 L3 • Mở Rộng (150 Từ - 7-9T)</option>
              <option value="L4">👑 L4 • Nâng Cao (150 Từ - 8-10T)</option>
              <option value="L5">🌟 L5 • Tiên Phong (150 Từ - 10-12T)</option>
              <option value="L6">🌎 L6 • Quốc Tế (150 Từ - 12+T)</option>
              <option value="BIO">🌿 BIO • Động Thực Vật Toàn Cầu (120 Từ)</option>
              <option value="COLOR">🎨 COLOR • Sắc Màu Toàn Cầu (120 Từ)</option>
              <option value="NUM">🔢 NUM • Số Đếm & Số Thứ Tự (120 Từ)</option>
            </select>

            {/* Category / Unit Selector Dropdown */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-1.5 text-xs font-bold focus:outline-none focus:border-cyan-400 cursor-pointer max-w-[220px]"
            >
              <option value="all">🌈 Tất Cả {availableCategories.length} Chủ Đề</option>
              {availableCategories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.icon} {c.name}
                </option>
              ))}
            </select>

            {/* Word Type Filter */}
            <select
              value={selectedWordType}
              onChange={(e) => setSelectedWordType(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-1.5 text-xs font-bold focus:outline-none focus:border-cyan-400 cursor-pointer"
            >
              <option value="all">🔤 Mọi Loại Từ</option>
              <option value="Danh từ">Danh từ (831 từ)</option>
              <option value="Động từ">Động từ (10 từ)</option>
              <option value="Tính từ">Tính từ (35 từ)</option>
              <option value="Cụm từ">Cụm từ (20 từ)</option>
            </select>

            {/* Mastery Filter */}
            <button
              onClick={() => {
                setMasteryFilter((prev) => (prev === 'all' ? 'mastered' : prev === 'mastered' ? 'unmastered' : 'all'));
              }}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-black border transition cursor-pointer ${
                masteryFilter === 'mastered'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/50'
                  : masteryFilter === 'unmastered'
                  ? 'bg-amber-500/20 text-amber-300 border-amber-400/50'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              <Star className="h-3.5 w-3.5" />
              <span>
                {masteryFilter === 'mastered' ? '⭐ Chỉ Từ Đã Thuộc' : masteryFilter === 'unmastered' ? '⏳ Chỉ Từ Chưa Thuộc' : 'Tất Cả Trạng Thái'}
              </span>
            </button>
          </div>

          {/* Results count & Page Size selector */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-400">
              Đang hiển thị: <strong className="text-cyan-300">{filteredList.length}</strong> / 900 từ
            </span>

            {/* Page Size selector */}
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-[11px] font-bold">
              {[24, 48, 96, 9999].map((size) => (
                <button
                  key={size}
                  onClick={() => setPageSize(size)}
                  className={`px-2 py-0.5 rounded-lg transition ${
                    pageSize === size ? 'bg-cyan-600 text-white font-black' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {size === 9999 ? 'Tất Cả 900' : `${size}/Trang`}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. VIEW MODE 1: ULTRA-DETAILED FLASHCARDS (THẺ SIÊU CHI TIẾT)             */}
      {/* ========================================================================= */}
      {viewMode === 'detailed_cards' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {paginatedList.map((item, idx) => {
            const theme = LEVEL_THEMES[item.level] || LEVEL_THEMES.L1;
            const isMastered = masteredCards.includes(item.id) || masteredCards.includes(item.word);
            const isSpeaking = speakingWord === item.word?.toLowerCase();
            const superDetail = getSuperDetailedVocabInfo(item);
            const catInfo = categoryMap[item.category] || {};

            return (
              <div
                key={item.id || idx}
                onClick={() => {
                  setActiveSpotlight(item);
                  playAudio(item.word);
                }}
                className={`group relative rounded-3xl border p-4.5 bg-slate-900/90 backdrop-blur-xl shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer hover:scale-[1.02] hover:shadow-2xl ${
                  isSpeaking
                    ? 'border-yellow-400 ring-2 ring-yellow-400/80 shadow-[0_0_25px_rgba(250,204,21,0.5)]'
                    : 'border-slate-800 hover:border-cyan-400/70 hover:shadow-cyan-500/20'
                }`}
              >
                {/* Speaking Ribbon Indicator */}
                {isSpeaking && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-yellow-400 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-lg flex items-center gap-1 z-30 animate-bounce">
                    <Volume2 className="h-3 w-3 animate-pulse" />
                    <span>ĐANG PHÁT ÂM...</span>
                  </div>
                )}

                {/* Top Metadata Row */}
                <div className="flex items-center justify-between gap-1.5 pb-2.5 border-b border-slate-800/80 mb-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black border ${theme.bgBadge}`}>
                      {item.level} • {theme.icon}
                    </span>
                    <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                      {item.type || 'Danh từ'}
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMastered?.(item.id, item.word);
                    }}
                    className={`p-1.5 rounded-xl transition ${
                      isMastered
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-slate-800 text-slate-500 hover:text-yellow-300'
                    }`}
                    title={isMastered ? 'Đã thuộc từ này' : 'Bấm để đánh dấu đã thuộc'}
                  >
                    <Star className={`h-4 w-4 ${isMastered ? 'fill-emerald-400 text-emerald-400' : ''}`} />
                  </button>
                </div>

                {/* Card Center: Big Icon & Word */}
                <div className="text-center py-2 space-y-2">
                  <div className="flex justify-center items-center py-1 group-hover:scale-115 transition-transform duration-300 select-none">
                    <VocabSmartIcon item={item} className="w-16 h-16 drop-shadow-md text-6xl" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-black font-heading text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                      {item.word}
                    </h3>
                    <div className="flex items-center justify-center gap-1.5 mt-0.5">
                      <span className="text-xs font-mono-code text-cyan-300 font-semibold">{item.ipa}</span>
                    </div>
                    {item.vietnamesePhonetic && (
                      <div className="text-[11px] font-bold text-pink-300 bg-pink-950/60 px-2.5 py-0.5 rounded-full inline-block border border-pink-500/30 mt-1">
                        Đọc: "{item.vietnamesePhonetic}"
                      </div>
                    )}
                  </div>

                  {/* Vietnamese Meaning (Highlighted) */}
                  <div className="text-base font-black text-amber-300 font-heading bg-amber-950/40 px-3 py-1.5 rounded-2xl border border-amber-500/30">
                    {item.meaning}
                  </div>
                </div>

                {/* Example Sentence Box */}
                <div className="mt-3 p-2.5 rounded-2xl bg-slate-950/80 border border-slate-800/80 text-[11px] space-y-1">
                  <div className="font-semibold text-slate-200">
                    "{item.example}"
                  </div>
                  <div className="text-slate-400 italic text-[10px]">
                    ({item.exampleVi})
                  </div>
                </div>

                {/* Unit / Topic info */}
                <div className="text-[10px] text-slate-400 pt-2 flex items-center justify-between border-t border-slate-800/60 mt-3">
                  <span className="truncate">{catInfo.name || `Unit ${item.unit || 1}`}</span>
                  <div className="flex items-center gap-1 shrink-0">
                    {/* Speak Normal 1.0x */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playAudio(item.word, false);
                      }}
                      className="p-1 rounded-lg bg-slate-800 text-cyan-300 hover:bg-cyan-600 hover:text-white transition"
                      title="Nghe chuẩn 1.0x"
                    >
                      <Volume2 className="h-3.5 w-3.5" />
                    </button>

                    {/* Speak Slow 0.75x */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playAudio(item.word, true);
                      }}
                      className="px-1.5 py-0.5 rounded-lg bg-slate-800 text-amber-300 hover:bg-amber-600 hover:text-white text-[9px] font-bold transition"
                      title="Nghe chậm cho bé"
                    >
                      0.75x
                    </button>

                    {/* Zoom details */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveSpotlight(item);
                      }}
                      className="p-1 rounded-lg bg-slate-800 text-pink-300 hover:bg-pink-600 hover:text-white transition"
                      title="Phóng lớn chi tiết"
                    >
                      <Eye className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. VIEW MODE 2: MASTER SPREADSHEET / DATA TABLE                           */}
      {/* ========================================================================= */}
      {viewMode === 'data_table' && (
        <div className="rounded-3xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-900/90 border-b border-slate-800 text-slate-300 font-black">
                  <th className="py-3.5 px-3 text-center w-12">STT</th>
                  <th className="py-3.5 px-3 text-center w-12">Icon</th>
                  <th className="py-3.5 px-4 min-w-[130px]">Từ Vựng (English)</th>
                  <th className="py-3.5 px-3 min-w-[100px]">Phiên Âm IPA</th>
                  <th className="py-3.5 px-3 min-w-[110px]">Đọc Tiếng Việt</th>
                  <th className="py-3.5 px-4 min-w-[140px]">Nghĩa Tiếng Việt</th>
                  <th className="py-3.5 px-3 min-w-[90px]">Cấp Độ</th>
                  <th className="py-3.5 px-4 min-w-[160px]">Chủ Đề (Unit)</th>
                  <th className="py-3.5 px-3 min-w-[90px]">Loại Từ</th>
                  <th className="py-3.5 px-4 min-w-[220px]">Ví Dụ & Dịch Nghĩa</th>
                  <th className="py-3.5 px-3 text-center w-24">Phát Âm</th>
                  <th className="py-3.5 px-3 text-center w-16">Thuộc</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {paginatedList.map((item, idx) => {
                  const globalIndex = pageSize === 9999 ? idx + 1 : (currentPage - 1) * pageSize + idx + 1;
                  const theme = LEVEL_THEMES[item.level] || LEVEL_THEMES.L1;
                  const isMastered = masteredCards.includes(item.id) || masteredCards.includes(item.word);
                  const isSpeaking = speakingWord === item.word?.toLowerCase();
                  const catInfo = categoryMap[item.category] || {};

                  return (
                    <tr
                      key={item.id || idx}
                      onClick={() => setActiveSpotlight(item)}
                      className={`hover:bg-slate-900/90 transition cursor-pointer ${
                        isSpeaking ? 'bg-yellow-950/40' : idx % 2 === 0 ? 'bg-slate-950/40' : 'bg-slate-900/30'
                      }`}
                    >
                      <td className="py-2.5 px-3 text-center text-slate-400 font-mono-code">{globalIndex}</td>
                      <td className="py-2.5 px-3 text-center">
                        <VocabSmartIcon item={item} className="w-8 h-8 text-xl mx-auto" />
                      </td>
                      <td className="py-2.5 px-4 font-black text-white text-sm">
                        <span className="hover:text-cyan-300">{item.word}</span>
                      </td>
                      <td className="py-2.5 px-3 font-mono-code text-cyan-300 font-medium">{item.ipa}</td>
                      <td className="py-2.5 px-3 text-pink-300 font-bold">{item.vietnamesePhonetic || '-'}</td>
                      <td className="py-2.5 px-4 font-bold text-amber-300">{item.meaning}</td>
                      <td className="py-2.5 px-3">
                        <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black border ${theme.bgBadge}`}>
                          {item.level}
                        </span>
                      </td>
                      <td className="py-2.5 px-4 text-slate-300 truncate max-w-[200px]" title={catInfo.name}>
                        {catInfo.name || item.category}
                      </td>
                      <td className="py-2.5 px-3 text-slate-400">{item.type || 'Danh từ'}</td>
                      <td className="py-2.5 px-4 text-slate-300 leading-snug">
                        <div className="font-medium text-slate-200">"{item.example}"</div>
                        <div className="text-[10px] text-slate-400 italic">({item.exampleVi})</div>
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              playAudio(item.word, false);
                            }}
                            className="p-1 rounded-lg bg-slate-800 text-cyan-300 hover:bg-cyan-600 hover:text-white transition"
                            title="Nghe chuẩn"
                          >
                            <Volume2 className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              playAudio(item.word, true);
                            }}
                            className="px-1.5 py-0.5 rounded-lg bg-slate-800 text-amber-300 hover:bg-amber-600 hover:text-white text-[9px] font-bold transition"
                            title="Nghe chậm"
                          >
                            0.75x
                          </button>
                        </div>
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleMastered?.(item.id, item.word);
                          }}
                          className={`p-1.5 rounded-xl transition ${
                            isMastered
                              ? 'text-emerald-400'
                              : 'text-slate-600 hover:text-yellow-300'
                          }`}
                        >
                          <Star className={`h-4 w-4 ${isMastered ? 'fill-emerald-400' : ''}`} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. VIEW MODE 3: COMPACT GRID (LƯỚI TINH GỌN)                              */}
      {/* ========================================================================= */}
      {viewMode === 'compact_grid' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {paginatedList.map((item, idx) => {
            const isMastered = masteredCards.includes(item.id) || masteredCards.includes(item.word);
            const isSpeaking = speakingWord === item.word?.toLowerCase();

            return (
              <div
                key={item.id || idx}
                onClick={() => {
                  setActiveSpotlight(item);
                  playAudio(item.word);
                }}
                className={`p-3 rounded-2xl border bg-slate-900/90 shadow-lg text-center space-y-1.5 cursor-pointer hover:scale-105 transition ${
                  isSpeaking ? 'border-yellow-400 ring-2 ring-yellow-400' : 'border-slate-800 hover:border-cyan-400'
                }`}
              >
                <div className="flex justify-center items-center py-0.5">
                  <VocabSmartIcon item={item} className="w-10 h-10 text-3xl" />
                </div>
                <div className="text-sm font-black text-white truncate">{item.word}</div>
                <div className="text-[10px] font-mono-code text-cyan-300">{item.ipa}</div>
                <div className="text-xs font-bold text-amber-300 truncate">{item.meaning}</div>
              </div>
            );
          })}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. BOTTOM PAGINATION CONTROLS (IF NOT ALL ITEMS)                          */}
      {/* ========================================================================= */}
      {pageSize !== 9999 && totalPages > 1 && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 pt-5">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-200 hover:bg-slate-800 disabled:opacity-40 transition cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" /> Trang Trước
          </button>

          <div className="flex items-center gap-1 text-xs font-bold text-slate-300">
            <span>Trang</span>
            <span className="px-3 py-1 rounded-lg bg-cyan-600/30 text-cyan-300 font-mono-code font-black border border-cyan-500/40">
              {currentPage}
            </span>
            <span>/ {totalPages} ({filteredList.length} từ)</span>
          </div>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-200 hover:bg-slate-800 disabled:opacity-40 transition cursor-pointer"
          >
            Trang Sau <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. SPOTLIGHT ZOOM MODAL (PHÓNG TO TOÀN DIỆN SIÊU CHI TIẾT - AUTO-FIT ALL DEVICES & TOP LAYER) */}
      {/* ========================================================================= */}
      {activeSpotlight && typeof document !== 'undefined' && createPortal(
        <div
          className="fixed inset-0 z-[999999999] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/85 backdrop-blur-xl animate-fadeIn cursor-pointer"
          onClick={() => setActiveSpotlight(null)}
          style={{ isolation: 'isolate' }}
        >
          <div
            className="relative w-full max-w-lg md:max-w-xl max-h-[94dvh] sm:max-h-[90dvh] flex flex-col rounded-3xl border-2 border-cyan-400 bg-gradient-to-b from-slate-900 via-slate-950 to-indigo-950 text-white shadow-[0_0_60px_rgba(34,211,238,0.45)] overflow-hidden cursor-default animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 1. MODAL TOP BAR (PINNED STICKY AT TOP - ALWAYS VISIBLE) */}
            <div className="shrink-0 flex items-center justify-between px-4 py-3 sm:px-5 sm:py-3.5 border-b border-slate-800/90 bg-slate-900/95 backdrop-blur-md z-10 shadow-sm">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-xs font-black uppercase text-cyan-300 flex items-center gap-1 shrink-0">
                  <Sparkles className="h-3.5 w-3.5 text-yellow-300 animate-spin" />
                  <span className="hidden xs:inline">CHI TIẾT TỪ VỰNG HOÀN CHỈNH</span>
                  <span className="xs:hidden">TỪ VỰNG CHI TIẾT</span>
                </span>
                <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 truncate max-w-[150px] sm:max-w-[220px]">
                  {activeSpotlight.level} • {categoryMap[activeSpotlight.category]?.name || activeSpotlight.category}
                </span>
              </div>

              <button
                onClick={() => setActiveSpotlight(null)}
                className="shrink-0 p-1.5 rounded-xl bg-slate-800 hover:bg-rose-950 hover:text-rose-300 text-slate-400 transition cursor-pointer"
                title="Đóng cửa sổ (ESC)"
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>

            {/* 2. SCROLLABLE CONTENT BODY (AUTO-FITS CONTENT ON ALL DEVICES) */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-3.5 sm:p-5 space-y-3 sm:space-y-3.5">
              {/* Central Word Presentation */}
              <div className="text-center space-y-2 py-1">
                <div
                  onClick={() => playAudio(activeSpotlight.word)}
                  className="cursor-pointer hover:scale-110 active:scale-95 transition-transform duration-300 select-none inline-flex items-center justify-center p-2"
                  title="Bấm vào icon để nghe đọc lại"
                >
                  <VocabSmartIcon item={activeSpotlight} className="w-24 h-24 sm:w-28 sm:h-28 text-6xl sm:text-7xl md:text-8xl drop-shadow-2xl" />
                </div>

                <div>
                  <h2 className="text-3xl sm:text-4xl font-black font-heading tracking-tight text-white leading-tight">
                    {activeSpotlight.word}
                  </h2>
                  <div className="flex items-center justify-center gap-2 mt-1 flex-wrap">
                    <span className="text-sm sm:text-base font-mono-code text-cyan-300 font-bold bg-cyan-950/60 px-2.5 py-0.5 rounded-lg border border-cyan-500/30">
                      {activeSpotlight.ipa}
                    </span>
                    {activeSpotlight.vietnamesePhonetic && (
                      <span className="text-xs font-bold text-pink-300 bg-pink-950/80 px-2.5 py-0.5 rounded-lg border border-pink-500/30">
                        Cách đọc Tiếng Việt: "{activeSpotlight.vietnamesePhonetic}"
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-2xl sm:text-3xl font-black text-amber-300 font-heading">
                  {activeSpotlight.meaning}
                </div>
              </div>

              {/* Audio Controls (Compact side-by-side row) */}
              <div className="flex items-center justify-center gap-2 sm:gap-3 py-1">
                <button
                  onClick={() => playAudio(activeSpotlight.word, false)}
                  className="flex-1 max-w-[200px] flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-black text-xs shadow-lg hover:scale-105 active:scale-95 transition cursor-pointer"
                >
                  <Volume2 className="h-4 w-4 animate-pulse" />
                  <span>Phát Âm Chuẩn (1.0x)</span>
                </button>

                <button
                  onClick={() => playAudio(activeSpotlight.word, true)}
                  className="flex-1 max-w-[180px] flex items-center justify-center gap-2 px-3 py-2.5 rounded-2xl bg-amber-600 text-white font-black text-xs shadow-lg hover:bg-amber-500 active:scale-95 transition cursor-pointer"
                >
                  <span>🐢 Nghe Chậm (0.75x)</span>
                </button>
              </div>

              {/* Memory Tip & Bilingual Example Box */}
              {(() => {
                const detail = getSuperDetailedVocabInfo(activeSpotlight);
                return (
                  <div className="space-y-2.5">
                    {/* Bilingual Example Box */}
                    <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1 text-xs">
                      <div className="font-bold text-cyan-300 flex items-center gap-1.5">
                        <BookOpen className="h-3.5 w-3.5 text-cyan-400" />
                        <span>Câu Ví Dụ Ứng Dụng:</span>
                      </div>
                      <div className="text-white font-bold text-xs sm:text-sm pl-5 leading-relaxed">
                        "{activeSpotlight.example}"
                      </div>
                      {activeSpotlight.exampleVi && (
                        <div className="text-slate-400 italic text-[11px] pl-5">
                          ({activeSpotlight.exampleVi})
                        </div>
                      )}
                    </div>

                    {/* Memory Tip Box */}
                    <div className="p-3 sm:p-3.5 rounded-2xl bg-purple-950/60 border border-purple-500/40 text-xs text-purple-200 leading-relaxed space-y-1">
                      <div className="font-black text-purple-300 flex items-center gap-1.5">
                        <HelpCircle className="h-3.5 w-3.5 text-purple-400" />
                        <span>Mẹo Ghi Nhớ Nhanh:</span>
                      </div>
                      <div className="text-[11px] sm:text-xs pl-5">
                        {detail?.memoryTip || activeSpotlight.hint || 'Luyện tập phát âm từ vựng này 3 lần mỗi ngày để nhớ lâu nhé!'}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* 3. MODAL BOTTOM BAR (PINNED STICKY AT BOTTOM - NEVER CUT OFF ON ANY DEVICE) */}
            <div className="shrink-0 flex items-center justify-between gap-2 px-3.5 py-2.5 sm:px-5 sm:py-3 border-t border-slate-800/90 bg-slate-900/95 backdrop-blur-md z-10 shadow-lg">
              <button
                onClick={() => {
                  const curIdx = filteredList.findIndex((w) => w.id === activeSpotlight.id);
                  if (curIdx > 0) {
                    const prev = filteredList[curIdx - 1];
                    setActiveSpotlight(prev);
                    playAudio(prev.word);
                  }
                }}
                disabled={filteredList.findIndex((w) => w.id === activeSpotlight.id) <= 0}
                className="flex items-center gap-1 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-xs font-bold text-slate-200 transition cursor-pointer shrink-0"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Từ Trước (←)</span>
                <span className="sm:hidden">Trước</span>
              </button>

              <button
                onClick={() => toggleMastered?.(activeSpotlight.id, activeSpotlight.word)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-black transition cursor-pointer ${
                  masteredCards.includes(activeSpotlight.id) || masteredCards.includes(activeSpotlight.word)
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-gradient-to-r from-pink-600 to-purple-600 text-white hover:scale-105 shadow-md'
                }`}
              >
                <Star className={`h-3.5 w-3.5 ${masteredCards.includes(activeSpotlight.id) || masteredCards.includes(activeSpotlight.word) ? 'fill-emerald-400 text-emerald-400' : ''}`} />
                <span className="hidden xs:inline">
                  {masteredCards.includes(activeSpotlight.id) || masteredCards.includes(activeSpotlight.word)
                    ? 'Đã Thuộc ⭐'
                    : 'Đánh Dấu Thuộc ⭐'}
                </span>
                <span className="xs:hidden">
                  {masteredCards.includes(activeSpotlight.id) || masteredCards.includes(activeSpotlight.word)
                    ? 'Đã Thuộc'
                    : 'Thuộc ⭐'}
                </span>
              </button>

              <button
                onClick={() => {
                  const curIdx = filteredList.findIndex((w) => w.id === activeSpotlight.id);
                  if (curIdx < filteredList.length - 1) {
                    const next = filteredList[curIdx + 1];
                    setActiveSpotlight(next);
                    playAudio(next.word);
                  }
                }}
                disabled={filteredList.findIndex((w) => w.id === activeSpotlight.id) >= filteredList.length - 1}
                className="flex items-center gap-1 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-xs font-bold text-slate-200 transition cursor-pointer shrink-0"
              >
                <span className="hidden sm:inline">Từ Tiếp (→)</span>
                <span className="sm:hidden">Tiếp</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}