import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import {
  Sparkles, Trophy, Flame, RotateCw, Play, Pause, HelpCircle, Star,
  Award, Clock, Target, Zap, BookOpen, Search, Filter, CheckCircle2,
  Volume2, VolumeX, Shuffle, ChevronDown, ChevronUp, Layers, Eye,
  Smile, Share2, Crown, Settings, Mic, ArrowRight, X, Compass, Check,
  Users, Globe, Bot, ShieldAlert, MessageCircle, Wifi
} from 'lucide-react';
import {
  COURSE_LEVELS,
  VOCAB_CATEGORIES,
  VOCABULARY_DATABASE
} from '../constants/kidsVocabularyDatabase.js';
import VocabSmartIcon from './VocabSmartIcon.jsx';
import { NativeVoiceStudioModal } from './NativeVoiceStudioModal.jsx';
import {
  playCardFlip,
  playMatchSound,
  playMismatchSound,
  playComboSound,
  playVictorySound,
  playHintSound,
  playShuffleSound,
  playClickSound,
  playTickSound,
  playTurnChangeSound,
  playEmotePopSound,
  playTurnAlertSound,
  speakWord,
  soundSettings,
  saveSoundSettings
} from '../utils/gameAudio.js';
import { realtimeGameService } from '../services/realtimeGameService.js';
import MemoryPvpArenaBar from './MemoryPvpArenaBar.jsx';
import MemoryOnlineLobbyModal from './MemoryOnlineLobbyModal.jsx';
import MemoryLiveEmotesOverlay from './MemoryLiveEmotesOverlay.jsx';
import MemoryPvpPodiumModal from './MemoryPvpPodiumModal.jsx';

// 4-Tier Match Modes for Kids
const PVP_MODES = [
  {
    id: 'solo',
    name: '👤 Chơi Đơn',
    subtitle: 'Luyện tập cá nhân',
    icon: '🎯',
    badge: 'Kỷ lục cá nhân',
    color: 'from-pink-600 to-rose-600'
  },
  {
    id: 'pass_and_play',
    name: '👥 2 Người (Cùng Máy)',
    subtitle: 'Đổi lượt trên 1 thiết bị',
    icon: '🤝',
    badge: 'Chơi cùng Ba Mẹ',
    color: 'from-amber-500 to-orange-600'
  },
  {
    id: 'online_pvp',
    name: '🌐 Đấu Online (2 Máy)',
    subtitle: 'P2P Real-time WebRTC',
    icon: '⚡',
    badge: '2 Máy khác nhau',
    color: 'from-cyan-500 to-blue-600'
  },
  {
    id: 'vs_ai',
    name: '🤖 Đấu Với Máy AI',
    subtitle: 'Gấu Panda • Cú • Robot',
    icon: '🧠',
    badge: 'Luyện phản xạ',
    color: 'from-purple-600 to-indigo-600'
  }
];

const AI_LEVELS = {
  panda: {
    id: 'panda',
    name: '🐼 Bé Gấu Panda (Dễ)',
    accuracy: 0.35,
    delay: 1500,
    avatar: '🐼',
    quotes: ['Hmm để tớ nhớ xem nào...', 'Ui nhầm rồi hihi!', 'Aha trúng một cặp rồi! 🎉', 'Bạn nhớ siêu thế! 🌟']
  },
  owl: {
    id: 'owl',
    name: '🦉 Cú Mèo Thông Thái (Vừa)',
    accuracy: 0.65,
    delay: 1100,
    avatar: '🦉',
    quotes: ['Tớ đã ghi nhớ vị trí này!', 'Trận đấu hấp dẫn quá!', 'Cố lên bạn ơi!', 'Trí nhớ của tớ là vô song! ✨']
  },
  robot: {
    id: 'robot',
    name: '🤖 Robot Siêu Trí Tuệ (Khó)',
    accuracy: 0.92,
    delay: 750,
    avatar: '🤖',
    quotes: ['Đang quét cơ sở dữ liệu...', 'Xác suất ghép đúng: 99%', 'Tính toán hoàn tất! ⚡', 'Bạn là đối thủ xứng tầm!']
  }
};


// Course Level Themed Visual Map
const LEVEL_BADGE_MAP = {
  L1: { name: 'L1: Khởi Động', color: 'bg-amber-500/20 text-amber-300 border-amber-400/40' },
  L2: { name: 'L2: Cơ Bản', color: 'bg-blue-500/20 text-blue-300 border-blue-400/40' },
  L3: { name: 'L3: Mở Rộng', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40' },
  L4: { name: 'L4: Nâng Cao', color: 'bg-purple-500/20 text-purple-300 border-purple-400/40' },
  L5: { name: 'L5: Tiên Phong', color: 'bg-rose-500/20 text-rose-300 border-rose-400/40' },
  L6: { name: 'L6: Quốc Tế', color: 'bg-teal-500/20 text-teal-300 border-teal-400/40' },
  BIO: { name: 'BIO: Sinh Vật', color: 'bg-lime-500/20 text-lime-300 border-lime-400/40' },
  COLOR: { name: 'COLOR: Màu Sắc', color: 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-400/40' },
  NUM: { name: 'NUM: Số Đếm', color: 'bg-orange-500/20 text-orange-300 border-orange-400/40' },
};

// Auto-Responsive Grid Configurations for Mobile, Tablet & Desktop
const DIFFICULTY_CONFIG = {
  easy: {
    id: 'easy',
    name: '🐣 Khởi Đầu (Dễ)',
    shortName: '🐣 Dễ',
    pairs: 3,
    cardsCount: 6,
    gridClass: 'grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 max-w-md',
    timeLimit: 45,
    starThresholdMoves: 5,
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40'
  },
  medium: {
    id: 'medium',
    name: '🦁 Tiêu Chuẩn (Vừa)',
    shortName: '🦁 Vừa',
    pairs: 6,
    cardsCount: 12,
    gridClass: 'grid-cols-3 sm:grid-cols-4 max-w-2xl',
    timeLimit: 90,
    starThresholdMoves: 10,
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40'
  },
  hard: {
    id: 'hard',
    name: '🚀 Thử Thách (Khó)',
    shortName: '🚀 Khó',
    pairs: 8,
    cardsCount: 16,
    gridClass: 'grid-cols-4 sm:grid-cols-4 max-w-3xl',
    timeLimit: 120,
    starThresholdMoves: 14,
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-400/40'
  },
  master: {
    id: 'master',
    name: '👑 Bậc Thầy (Siêu Khó)',
    shortName: '👑 Bậc Thầy',
    pairs: 10,
    cardsCount: 20,
    gridClass: 'grid-cols-4 sm:grid-cols-4 md:grid-cols-5 max-w-4xl',
    timeLimit: 150,
    starThresholdMoves: 18,
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-400/40'
  },
  legendary: {
    id: 'legendary',
    name: '🌟 Thần Đồng (Đỉnh Cao)',
    shortName: '🌟 Thần Đồng',
    pairs: 12,
    cardsCount: 24,
    gridClass: 'grid-cols-4 sm:grid-cols-4 md:grid-cols-6 max-w-5xl',
    timeLimit: 180,
    starThresholdMoves: 22,
    badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-400/40'
  }
};

// Game Mode Specifications
const GAME_MODES = [
  {
    id: 'image_word',
    name: '🖼️ ↔ 🔤 Tranh (Có Dịch Nghĩa) ↔ Từ Vựng',
    description: 'Ghép tranh minh họa kèm nghĩa tiếng Việt chi tiết với từ tiếng Anh tương ứng',
    icon: '🎨',
    badge: 'Phổ biến nhất'
  },
  {
    id: 'image_meaning',
    name: '🖼️ ↔ 🇻🇳 Tranh ↔ Nghĩa Tiếng Việt',
    description: 'Ghép tranh minh họa với thẻ giải nghĩa tiếng Việt chuyên sâu cho bé',
    icon: '🇻🇳',
    badge: 'Dành cho bé nhỏ'
  },
  {
    id: 'word_meaning',
    name: '🔤 ↔ 🇻🇳 Từ Vựng Tiếng Anh ↔ Nghĩa Việt',
    description: 'Ghép từ tiếng Anh (kèm phiên âm IPA) với nghĩa tiếng Việt chuẩn xác',
    icon: '📖',
    badge: 'Học vẹt phản xạ'
  },
  {
    id: 'audio_word',
    name: '🎧 ↔ 🖼️ Nghe Phát Âm ↔ Tranh & Dịch Nghĩa',
    description: 'Thẻ bí mật phát âm thanh chuẩn AI, bé nghe và tìm tranh có nghĩa tương ứng',
    icon: '🎧',
    badge: 'Luyện nghe siêu đỉnh'
  },
  {
    id: 'twins',
    name: '👯 Cặp Đôi Song Sinh (Tranh + Từ + Nghĩa)',
    description: 'Ghép 2 thẻ giống hệt nhau gồm cả Tranh, Từ vựng, Phiên âm và Dịch nghĩa',
    icon: '✨',
    badge: 'Dễ chơi vui nhộn'
  }
];

export default function MemoryMatchGame({ addToast, onNavigateTab }) {
  // 1. Filter States
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyKey, setDifficultyKey] = useState('medium');
  const [gameMode, setGameMode] = useState('image_word');
  const [timerMode, setTimerMode] = useState('zen'); // 'zen' | 'countdown'
  const [showFilters, setShowFilters] = useState(false);

  // 2. Audio Settings State
  const [audioSettings, setAudioSettings] = useState(() => ({
    sfx: soundSettings.sfx,
    voice: soundSettings.voice,
    slowMode: soundSettings.slowMode,
    voiceGender: soundSettings.voiceGender
  }));

  // 3. PvP & Multiplayer Modes
  const [pvpMode, setPvpMode] = useState('solo'); // 'solo' | 'pass_and_play' | 'online_pvp' | 'vs_ai'
  const [player1, setPlayer1] = useState(() => {
    try {
      const savedName = localStorage.getItem('kids_player_name') || 'Bé Minh Anh';
      const savedAvatar = localStorage.getItem('kids_player_avatar') || '👧';
      return { name: savedName, avatar: savedAvatar, score: 0, streak: 0, maxStreak: 0, pairsCount: 0 };
    } catch {
      return { name: 'Bé Minh Anh', avatar: '👧', score: 0, streak: 0, maxStreak: 0, pairsCount: 0 };
    }
  });

  const [player2, setPlayer2] = useState({
    name: 'Người Chơi 2',
    avatar: '👦',
    score: 0,
    streak: 0,
    maxStreak: 0,
    pairsCount: 0
  });

  const [activeTurn, setActiveTurn] = useState('p1'); // 'p1' | 'p2'
  const [turnTimer, setTurnTimer] = useState(15); // 15 seconds per turn
  const [isBonusTurn, setIsBonusTurn] = useState(false);
  const [aiLevel, setAiLevel] = useState('owl'); // 'panda' | 'owl' | 'robot'
  const [aiSpeech, setAiSpeech] = useState('');
  const aiMemory = useRef(new Map()); // cardIndex -> pairId
  const turnTimerIntervalRef = useRef(null);

  // 4. Online Real-time State (PeerJS WebRTC + BroadcastChannel)
  const [showOnlineLobby, setShowOnlineLobby] = useState(false);
  const [onlineRoomCode, setOnlineRoomCode] = useState(null);
  const [connectionState, setConnectionState] = useState({
    status: 'idle',
    role: null,
    roomCode: null,
    latency: 0,
    opponentInfo: null,
    message: ''
  });

  // 5. Live Emotes & Quick Chat Reactions
  const [activeFloatingItems, setActiveFloatingItems] = useState([]);
  const [showPvpPodium, setShowPvpPodium] = useState(false);
  const [rematchWaiting, setRematchWaiting] = useState(false);

  // 6. Game Play States
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedPairIds, setMatchedPairIds] = useState(new Set());
  const [mismatchedIndices, setMismatchedIndices] = useState([]);
  const [isChecking, setIsChecking] = useState(false);
  const [moves, setMoves] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [score, setScore] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [hintsRemaining, setHintsRemaining] = useState(3);
  const [isHintActive, setIsHintActive] = useState(false);
  const [currentlySpeakingCardId, setCurrentlySpeakingCardId] = useState(null);

  // 7. Modal Drawers
  const [showVocabDrawer, setShowVocabDrawer] = useState(false);
  const [showLeaderboardDrawer, setShowLeaderboardDrawer] = useState(false);
  const [isVoiceStudioOpen, setIsVoiceStudioOpen] = useState(false);

  // 8. High Scores (LocalStorage)
  const [highScores, setHighScores] = useState(() => {
    try {
      const saved = localStorage.getItem('kids_memory_high_scores_v1');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const canvasRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const currentDiff = DIFFICULTY_CONFIG[difficultyKey] || DIFFICULTY_CONFIG.medium;

  // Filter available vocabulary pool based on Level, Category, and Search
  const filteredVocabPool = useMemo(() => {
    let pool = VOCABULARY_DATABASE;

    // Filter by Level
    if (selectedLevel !== 'all') {
      pool = pool.filter(item => item.level === selectedLevel);
    }

    // Filter by Category
    if (selectedCategory !== 'all') {
      pool = pool.filter(item => item.category === selectedCategory);
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      pool = pool.filter(item =>
        item.word.toLowerCase().includes(q) ||
        (item.meaning && item.meaning.toLowerCase().includes(q)) ||
        (item.vietnamesePhonetic && item.vietnamesePhonetic.toLowerCase().includes(q))
      );
    }

    return pool;
  }, [selectedLevel, selectedCategory, searchQuery]);

  // Categories available for currently selected level
  const availableCategories = useMemo(() => {
    if (selectedLevel === 'all') return VOCAB_CATEGORIES;
    return VOCAB_CATEGORIES.filter(c => c.id === 'all' || c.level === selectedLevel);
  }, [selectedLevel]);

  // Update sound settings
  const toggleSfx = () => {
    const next = !audioSettings.sfx;
    soundSettings.sfx = next;
    saveSoundSettings();
    setAudioSettings(prev => ({ ...prev, sfx: next }));
    if (next) playClickSound();
  };

  const toggleVoice = () => {
    const next = !audioSettings.voice;
    soundSettings.voice = next;
    saveSoundSettings();
    setAudioSettings(prev => ({ ...prev, voice: next }));
    if (next) {
      speakWord('Voice speech enabled', { slow: audioSettings.slowMode });
    }
  };

  const toggleSlowMode = () => {
    const next = !audioSettings.slowMode;
    soundSettings.slowMode = next;
    saveSoundSettings();
    setAudioSettings(prev => ({ ...prev, slowMode: next }));
    if (next) {
      speakWord('Slow mode active', { slow: true });
    } else {
      speakWord('Normal speed');
    }
  };

  // Generate and start a brand new game board
  const startNewGame = useCallback(() => {
    if (filteredVocabPool.length < currentDiff.pairs) {
      addToast?.(`⚠️ Kho từ hiện tại chỉ có ${filteredVocabPool.length} từ, không đủ ${currentDiff.pairs} cặp. Hãy nới lỏng bộ lọc nhé!`, 'warning');
      return;
    }

    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (turnTimerIntervalRef.current) clearInterval(turnTimerIntervalRef.current);
    playShuffleSound();

    // Pick N random unique words from pool
    const shuffledPool = [...filteredVocabPool].sort(() => Math.random() - 0.5);
    const selectedVocabs = shuffledPool.slice(0, currentDiff.pairs);

    // Build pair cards according to chosen gameMode
    const newCards = [];

    selectedVocabs.forEach((vocab, idx) => {
      const pairId = `pair-${vocab.id || idx}-${Math.random()}`;

      if (gameMode === 'image_word') {
        newCards.push({
          cardId: `${pairId}-img`,
          pairId,
          type: 'image',
          vocab,
          content: vocab.word
        });
        newCards.push({
          cardId: `${pairId}-word`,
          pairId,
          type: 'word',
          vocab,
          content: vocab.word
        });
      } else if (gameMode === 'image_meaning') {
        newCards.push({
          cardId: `${pairId}-img`,
          pairId,
          type: 'image',
          vocab,
          content: vocab.word
        });
        newCards.push({
          cardId: `${pairId}-meaning`,
          pairId,
          type: 'meaning',
          vocab,
          content: vocab.meaning
        });
      } else if (gameMode === 'word_meaning') {
        newCards.push({
          cardId: `${pairId}-word`,
          pairId,
          type: 'word',
          vocab,
          content: vocab.word
        });
        newCards.push({
          cardId: `${pairId}-meaning`,
          pairId,
          type: 'meaning',
          vocab,
          content: vocab.meaning
        });
      } else if (gameMode === 'audio_word') {
        newCards.push({
          cardId: `${pairId}-audio`,
          pairId,
          type: 'audio',
          vocab,
          content: vocab.word
        });
        newCards.push({
          cardId: `${pairId}-img`,
          pairId,
          type: 'image',
          vocab,
          content: vocab.word
        });
      } else {
        newCards.push({
          cardId: `${pairId}-twin-1`,
          pairId,
          type: 'twin',
          vocab,
          content: vocab.word
        });
        newCards.push({
          cardId: `${pairId}-twin-2`,
          pairId,
          type: 'twin',
          vocab,
          content: vocab.word
        });
      }
    });

    // Shuffle final deck
    const finalDeck = newCards.sort(() => Math.random() - 0.5);

    setCards(finalDeck);
    setFlippedIndices([]);
    setMatchedPairIds(new Set());
    setMismatchedIndices([]);
    setIsChecking(false);
    setMoves(0);
    setStreak(0);
    setMaxStreak(0);
    setScore(0);
    setHintsRemaining(3);
    setIsHintActive(false);
    setIsGameWon(false);
    setIsTimeUp(false);
    setTimerSeconds(timerMode === 'countdown' ? currentDiff.timeLimit : 0);
    setIsGameActive(true);

    // Reset PvP states
    setPlayer1(prev => ({ ...prev, score: 0, streak: 0, pairsCount: 0 }));
    setPlayer2(prev => ({
      ...prev,
      name: pvpMode === 'vs_ai' ? (AI_LEVELS[aiLevel]?.name || 'Máy AI') : prev.name,
      avatar: pvpMode === 'vs_ai' ? (AI_LEVELS[aiLevel]?.avatar || '🦉') : prev.avatar,
      score: 0,
      streak: 0,
      pairsCount: 0
    }));
    setActiveTurn('p1');
    setTurnTimer(15);
    setIsBonusTurn(false);
    setShowPvpPodium(false);
    setRematchWaiting(false);
    aiMemory.current = new Map();

    // If Online Host, broadcast new deck
    if (pvpMode === 'online_pvp' && connectionState.role === 'host') {
      realtimeGameService.sendGameDeck(finalDeck, { difficultyKey, gameMode });
    }

    addToast?.(`🎮 Đã tạo bàn lật thẻ mới: ${currentDiff.name} (${currentDiff.cardsCount} Thẻ)!`, 'info');
  }, [filteredVocabPool, currentDiff, gameMode, timerMode, pvpMode, aiLevel, connectionState.role, addToast]);

  // Initial Game Mount
  useEffect(() => {
    startNewGame();
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (turnTimerIntervalRef.current) clearInterval(turnTimerIntervalRef.current);
    };
  }, [difficultyKey, gameMode, selectedLevel, selectedCategory, pvpMode, aiLevel]);

  // Auto-detect Room Code from URL query/hash parameter
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hash = window.location.hash || '';
    const search = window.location.search || '';
    const combined = hash + search;
    const match = combined.match(/room=([A-Za-z0-9-]+)/i);
    if (match && match[1]) {
      const code = match[1].toUpperCase();
      setPvpMode('online_pvp');
      setOnlineRoomCode(code);
      setShowOnlineLobby(true);
      realtimeGameService.joinRoom(code, {
        name: player1.name,
        avatar: player1.avatar
      });
      addToast?.(`🌐 Đã tìm thấy phòng ${code} từ đường dẫn! Đang kết nối...`, 'info');
    }
  }, []);

  // WebRTC & BroadcastChannel Event Listeners
  useEffect(() => {
    const unsubStatus = realtimeGameService.onStatusChange((state) => {
      setConnectionState(state);
      if (state.roomCode) setOnlineRoomCode(state.roomCode);
      if (state.opponentInfo) {
        setPlayer2(prev => ({
          ...prev,
          name: state.opponentInfo.name || 'Đối thủ',
          avatar: state.opponentInfo.avatar || '👦'
        }));
      }
      if (state.status === 'connected') {
        addToast?.(`🟢 Đã kết nối thành công với ${state.opponentInfo?.name || 'Đối thủ'}!`, 'success');
        if (state.role === 'host' && cards.length > 0) {
          realtimeGameService.sendGameDeck(cards, { difficultyKey, gameMode });
        }
      }
    });

    const unsubMsg = realtimeGameService.onMessage((msg) => {
      handleIncomingNetworkMessage(msg);
    });

    return () => {
      unsubStatus();
      unsubMsg();
    };
  }, [cards, difficultyKey, gameMode]);

  // Handle incoming network messages
  const handleIncomingNetworkMessage = useCallback((msg) => {
    if (!msg || !msg.type) return;

    switch (msg.type) {
      case 'SYNC_GAME_DECK':
        if (msg.cards && msg.cards.length > 0) {
          setCards(msg.cards);
          setFlippedIndices([]);
          setMatchedPairIds(new Set());
          setMismatchedIndices([]);
          setIsChecking(false);
          setPlayer1(prev => ({ ...prev, score: 0, streak: 0, pairsCount: 0 }));
          setPlayer2(prev => ({ ...prev, score: 0, streak: 0, pairsCount: 0 }));
          setActiveTurn('p1');
          setTurnTimer(15);
          setIsBonusTurn(false);
          setShowPvpPodium(false);
          setRematchWaiting(false);
          setIsGameActive(true);
          setShowOnlineLobby(false);
          addToast?.('🎮 Bàn thi đấu Online đã đồng bộ từ Chủ Phòng!', 'success');
        }
        break;

      case 'CARD_FLIP':
        if (typeof msg.cardIndex === 'number') {
          handleCardClick(msg.cardIndex, true);
        }
        break;

      case 'TURN_CHANGE':
        if (msg.nextTurn) {
          setActiveTurn(msg.nextTurn);
          setTurnTimer(15);
          setIsBonusTurn(false);
          const isMyTurn = (connectionState.role === 'host' && msg.nextTurn === 'p1') ||
                           (connectionState.role === 'guest' && msg.nextTurn === 'p2');
          playTurnChangeSound(isMyTurn);
          if (msg.reason === 'timeout') {
            addToast?.('⏰ Hết giờ lượt đi! Đã chuyển lượt.', 'info');
          }
        }
        break;

      case 'EMOTE':
        if (msg.emoji) {
          const item = {
            id: `emote-${Date.now()}-${Math.random()}`,
            type: 'emoji',
            content: msg.emoji,
            senderName: msg.senderName,
            senderRole: msg.senderRole
          };
          setActiveFloatingItems(prev => [...prev.slice(-6), item]);
          playEmotePopSound();
          setTimeout(() => {
            setActiveFloatingItems(prev => prev.filter(i => i.id !== item.id));
          }, 3200);
        }
        break;

      case 'QUICK_CHAT':
        if (msg.chatItem) {
          const item = {
            id: `chat-${Date.now()}-${Math.random()}`,
            type: 'chat',
            content: msg.chatItem.en,
            vi: msg.chatItem.vi,
            senderName: msg.senderName,
            senderRole: msg.senderRole
          };
          setActiveFloatingItems(prev => [...prev.slice(-6), item]);
          playEmotePopSound();
          setTimeout(() => {
            setActiveFloatingItems(prev => prev.filter(i => i.id !== item.id));
          }, 3600);
        }
        break;

      case 'REMATCH_REQUEST':
        addToast?.(`🔁 ${msg.senderName || 'Đối thủ'} gửi yêu cầu tái đấu! Đang chuẩn bị bàn mới...`, 'info');
        if (connectionState.role === 'host') {
          startNewGame();
        }
        break;

      case 'REMATCH_ACCEPT':
        setShowPvpPodium(false);
        setRematchWaiting(false);
        if (msg.cards) {
          setCards(msg.cards);
          setFlippedIndices([]);
          setMatchedPairIds(new Set());
          setMismatchedIndices([]);
          setIsChecking(false);
          setPlayer1(prev => ({ ...prev, score: 0, streak: 0, pairsCount: 0 }));
          setPlayer2(prev => ({ ...prev, score: 0, streak: 0, pairsCount: 0 }));
          setActiveTurn('p1');
          setTurnTimer(15);
          setIsBonusTurn(false);
          setIsGameActive(true);
        }
        addToast?.('⚡ Trận tái đấu mới đã bắt đầu!', 'success');
        break;

      default:
        break;
    }
  }, [cards, connectionState.role, startNewGame, addToast]);

  // PvP Turn Countdown Interval
  useEffect(() => {
    if (pvpMode === 'solo' || !isGameActive || isGameWon || isChecking) {
      if (turnTimerIntervalRef.current) clearInterval(turnTimerIntervalRef.current);
      return;
    }

    turnTimerIntervalRef.current = setInterval(() => {
      setTurnTimer(prev => {
        if (prev <= 1) {
          // Timeout reached: clear any single open card and switch turn
          if (flippedIndices.length === 1) {
            setFlippedIndices([]);
          }
          const nextTurn = activeTurn === 'p1' ? 'p2' : 'p1';
          setActiveTurn(nextTurn);
          setIsBonusTurn(false);

          if (pvpMode === 'online_pvp') {
            realtimeGameService.sendTurnChange(nextTurn, 'timeout');
          }

          const isMyTurnNow = (pvpMode === 'online_pvp')
            ? ((connectionState.role === 'host' && nextTurn === 'p1') || (connectionState.role === 'guest' && nextTurn === 'p2'))
            : true;
          playTurnChangeSound(isMyTurnNow);
          addToast?.('⏰ Hết 15 giây lượt chơi! Đã chuyển lượt.', 'warning');
          return 15;
        }

        if (prev <= 4) {
          playTurnAlertSound();
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (turnTimerIntervalRef.current) clearInterval(turnTimerIntervalRef.current);
    };
  }, [pvpMode, isGameActive, isGameWon, isChecking, activeTurn, flippedIndices, connectionState.role, addToast]);

  // AI Opponent Decision Engine (Natural thinking delay + memory algorithm)
  useEffect(() => {
    if (pvpMode !== 'vs_ai' || activeTurn !== 'p2' || !isGameActive || isChecking || isGameWon) {
      return;
    }

    const aiCfg = AI_LEVELS[aiLevel] || AI_LEVELS.owl;
    let isCancelled = false;

    const randomQuote = aiCfg.quotes[Math.floor(Math.random() * aiCfg.quotes.length)];
    setAiSpeech(randomQuote);

    const timer1 = setTimeout(() => {
      if (isCancelled || !isGameActive || isChecking) return;

      const availableIndices = cards
        .map((c, i) => (!matchedPairIds.has(c.pairId) ? i : null))
        .filter(i => i !== null);

      if (availableIndices.length === 0) return;

      // 1. Check if AI already knows a pair in memory
      let firstChoice = null;
      let secondChoice = null;

      const knownMap = new Map();
      aiMemory.current.forEach((pairId, idx) => {
        if (!matchedPairIds.has(pairId)) {
          if (!knownMap.has(pairId)) knownMap.set(pairId, []);
          knownMap.get(pairId).push(idx);
        }
      });

      for (const [pId, idxList] of knownMap.entries()) {
        if (idxList.length >= 2 && Math.random() <= aiCfg.accuracy) {
          firstChoice = idxList[0];
          secondChoice = idxList[1];
          break;
        }
      }

      if (firstChoice === null) {
        firstChoice = availableIndices[Math.floor(Math.random() * availableIndices.length)];
      }

      handleCardClick(firstChoice, true);

      const timer2 = setTimeout(() => {
        if (isCancelled || !isGameActive) return;

        const firstCard = cards[firstChoice];
        if (!firstCard) return;

        if (secondChoice === null) {
          const matePairIndices = knownMap.get(firstCard.pairId) || [];
          const knownMate = matePairIndices.find(i => i !== firstChoice);

          if (knownMate !== undefined && Math.random() <= aiCfg.accuracy) {
            secondChoice = knownMate;
          } else {
            const remaining = availableIndices.filter(i => i !== firstChoice);
            if (remaining.length > 0) {
              secondChoice = remaining[Math.floor(Math.random() * remaining.length)];
            }
          }
        }

        if (secondChoice !== null) {
          handleCardClick(secondChoice, true);
        }
        setAiSpeech('');
      }, 900);

      return () => clearTimeout(timer2);
    }, aiCfg.delay);

    return () => {
      isCancelled = true;
      clearTimeout(timer1);
    };
  }, [pvpMode, activeTurn, isGameActive, isChecking, isGameWon, aiLevel, cards, matchedPairIds]);

  // Solo Timer Tick Engine
  useEffect(() => {
    if (!isGameActive || isGameWon || isTimeUp || pvpMode !== 'solo') {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      return;
    }

    timerIntervalRef.current = setInterval(() => {
      setTimerSeconds(prev => {
        if (timerMode === 'countdown') {
          if (prev <= 1) {
            clearInterval(timerIntervalRef.current);
            setIsTimeUp(true);
            setIsGameActive(false);
            playMismatchSound();
            addToast?.('⏰ Hết giờ rồi! Đừng nản lòng, hãy nhấn "Chơi Lại" để thử lại nhé!', 'warning');
            return 0;
          }
          if (prev <= 10) playTickSound();
          return prev - 1;
        } else {
          return prev + 1;
        }
      });
    }, 1000);

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [isGameActive, isGameWon, isTimeUp, timerMode, pvpMode, addToast]);

  // Card Click Interaction
  const handleCardClick = (cardIndex, isFromNetwork = false) => {
    if (
      !isGameActive ||
      isChecking ||
      isGameWon ||
      isTimeUp ||
      isHintActive
    ) return;

    // Check Turn for PvP / Online
    if (!isFromNetwork) {
      if (pvpMode === 'vs_ai' && activeTurn === 'p2') {
        return;
      }
      if (pvpMode === 'online_pvp') {
        const isMyTurn = (connectionState.role === 'host' && activeTurn === 'p1') ||
                         (connectionState.role === 'guest' && activeTurn === 'p2');
        if (!isMyTurn) {
          addToast?.('⏳ Chưa đến lượt của bạn! Đang là lượt của đối thủ.', 'info');
          return;
        }
        realtimeGameService.sendCardFlip(cardIndex);
      }
    }

    const clickedCard = cards[cardIndex];
    if (!clickedCard) return;

    if (matchedPairIds.has(clickedCard.pairId) || flippedIndices.includes(cardIndex)) {
      if (clickedCard.type === 'audio' || flippedIndices.includes(cardIndex)) {
        setCurrentlySpeakingCardId(clickedCard.cardId);
        speakWord(clickedCard.vocab.word, {
          slow: audioSettings.slowMode,
          onEnd: () => setCurrentlySpeakingCardId(null)
        });
      }
      return;
    }

    playCardFlip();

    // Register into AI memory
    if (aiMemory.current) {
      aiMemory.current.set(cardIndex, clickedCard.pairId);
    }

    if (audioSettings.voice) {
      setCurrentlySpeakingCardId(clickedCard.cardId);
      speakWord(clickedCard.vocab.word, {
        slow: audioSettings.slowMode,
        onEnd: () => setCurrentlySpeakingCardId(null)
      });
    }

    if (flippedIndices.length === 0) {
      setFlippedIndices([cardIndex]);
      return;
    }

    if (flippedIndices.length === 1) {
      const firstIndex = flippedIndices[0];
      const firstCard = cards[firstIndex];
      const newFlipped = [firstIndex, cardIndex];
      setFlippedIndices(newFlipped);
      setMoves(prev => prev + 1);

      // Check Match
      if (firstCard.pairId === clickedCard.pairId) {
        setIsChecking(true);
        const currentActiveStreak = pvpMode === 'solo'
          ? streak
          : (activeTurn === 'p1' ? player1.streak : player2.streak);
        const newStreak = currentActiveStreak + 1;
        setStreak(newStreak);
        setMaxStreak(prev => Math.max(prev, newStreak));

        const comboBonus = Math.min(newStreak * 50, 250);
        const matchPoints = 100 + comboBonus;
        setScore(prev => prev + matchPoints);

        // Update PvP score for active player
        if (pvpMode !== 'solo') {
          if (activeTurn === 'p1') {
            setPlayer1(prev => ({
              ...prev,
              score: prev.score + matchPoints,
              streak: newStreak,
              maxStreak: Math.max(prev.maxStreak, newStreak),
              pairsCount: (prev.pairsCount || 0) + 1
            }));
          } else {
            setPlayer2(prev => ({
              ...prev,
              score: prev.score + matchPoints,
              streak: newStreak,
              maxStreak: Math.max(prev.maxStreak, newStreak),
              pairsCount: (prev.pairsCount || 0) + 1
            }));
          }
          setIsBonusTurn(true);
          setTurnTimer(15);
        }

        setTimeout(() => {
          playMatchSound();
          if (newStreak > 1) {
            setTimeout(() => playComboSound(newStreak), 200);
          }

          setMatchedPairIds(prev => {
            const next = new Set(prev);
            next.add(firstCard.pairId);

            if (next.size === currentDiff.pairs) {
              handleGameVictory(newStreak);
            }
            return next;
          });

          setFlippedIndices([]);
          setIsChecking(false);
        }, 500);

      } else {
        setIsChecking(true);
        setStreak(0);
        setMismatchedIndices(newFlipped);

        if (pvpMode !== 'solo') {
          if (activeTurn === 'p1') {
            setPlayer1(prev => ({ ...prev, streak: 0 }));
          } else {
            setPlayer2(prev => ({ ...prev, streak: 0 }));
          }
          setIsBonusTurn(false);
        }

        setTimeout(() => {
          playMismatchSound();
        }, 300);

        setTimeout(() => {
          setFlippedIndices([]);
          setMismatchedIndices([]);
          setIsChecking(false);

          // Pass Turn in PvP
          if (pvpMode !== 'solo') {
            const nextTurn = activeTurn === 'p1' ? 'p2' : 'p1';
            setActiveTurn(nextTurn);
            setTurnTimer(15);
            const isMyTurnNow = (pvpMode === 'online_pvp')
              ? ((connectionState.role === 'host' && nextTurn === 'p1') || (connectionState.role === 'guest' && nextTurn === 'p2'))
              : true;
            playTurnChangeSound(isMyTurnNow);
          }
        }, 850);
      }
    }
  };

  // Game Victory Handling
  const handleGameVictory = (finalStreak) => {
    setIsGameWon(true);
    setIsGameActive(false);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (turnTimerIntervalRef.current) clearInterval(turnTimerIntervalRef.current);

    setTimeout(() => {
      playVictorySound();
      triggerConfetti();
    }, 400);

    if (pvpMode === 'solo') {
      const diffRecord = highScores[difficultyKey] || { bestTime: 9999, bestMoves: 9999, highestScore: 0, totalWins: 0 };
      const currentElapsed = timerMode === 'countdown' ? (currentDiff.timeLimit - timerSeconds) : timerSeconds;

      const updatedRecord = {
        bestTime: Math.min(diffRecord.bestTime, currentElapsed),
        bestMoves: Math.min(diffRecord.bestMoves, moves + 1),
        highestScore: Math.max(diffRecord.highestScore, score + 200),
        totalWins: (diffRecord.totalWins || 0) + 1,
        lastPlayed: new Date().toLocaleDateString('vi-VN')
      };

      const nextHighScores = { ...highScores, [difficultyKey]: updatedRecord };
      setHighScores(nextHighScores);
      try {
        localStorage.setItem('kids_memory_high_scores_v1', JSON.stringify(nextHighScores));
      } catch {}

      addToast?.(`🎉 XUẤT SẮC! Bé Minh Anh đã hoàn thành xuất sắc thử thách ${currentDiff.name}!`, 'success');
    } else {
      setShowPvpPodium(true);
      addToast?.(`🏆 TRẬN ĐẤU KẾT THÚC! Hãy cùng xem bục vinh quang nào!`, 'success');
    }
  };

  // Online Lobby Handlers
  const handleCreateOnlineRoom = (profile) => {
    setPlayer1(prev => ({ ...prev, name: profile.name, avatar: profile.avatar }));
    const code = realtimeGameService.createRoom(null, profile);
    setOnlineRoomCode(code);
  };

  const handleJoinOnlineRoom = (code, profile) => {
    setPlayer1(prev => ({ ...prev, name: profile.name, avatar: profile.avatar }));
    realtimeGameService.joinRoom(code, profile);
    setOnlineRoomCode(code);
  };

  const handleStartOnlineMatch = () => {
    setShowOnlineLobby(false);
    startNewGame();
  };

  // Live Emote & Quick Chat Handlers
  const handleSendLiveEmote = (emoji) => {
    const isLeft = (pvpMode === 'online_pvp') ? (connectionState.role === 'host') : (activeTurn === 'p1');
    const item = {
      id: `self-emote-${Date.now()}-${Math.random()}`,
      type: 'emoji',
      content: emoji,
      senderName: isLeft ? player1.name : player2.name,
      senderRole: isLeft ? 'p1' : 'p2'
    };
    setActiveFloatingItems(prev => [...prev.slice(-6), item]);

    if (pvpMode === 'online_pvp') {
      realtimeGameService.sendEmote(emoji);
    }

    setTimeout(() => {
      setActiveFloatingItems(prev => prev.filter(i => i.id !== item.id));
    }, 3200);
  };

  const handleSendLiveChat = (chatItem) => {
    const isLeft = (pvpMode === 'online_pvp') ? (connectionState.role === 'host') : (activeTurn === 'p1');
    const item = {
      id: `self-chat-${Date.now()}-${Math.random()}`,
      type: 'chat',
      content: chatItem.en,
      vi: chatItem.vi,
      senderName: isLeft ? player1.name : player2.name,
      senderRole: isLeft ? 'p1' : 'p2'
    };
    setActiveFloatingItems(prev => [...prev.slice(-6), item]);

    if (pvpMode === 'online_pvp') {
      realtimeGameService.sendQuickChat(chatItem);
    }

    setTimeout(() => {
      setActiveFloatingItems(prev => prev.filter(i => i.id !== item.id));
    }, 3600);
  };

  // Rematch Handler
  const handleRequestRematch = () => {
    if (pvpMode === 'online_pvp') {
      setRematchWaiting(true);
      realtimeGameService.sendRematchRequest();
      addToast?.('⏳ Đã gửi lời mời tái đấu tới đối thủ...', 'info');
    } else {
      setShowPvpPodium(false);
      startNewGame();
    }
  };


  const calculateStarRating = (finalMoves) => {
    const perfectMoves = currentDiff.pairs;
    if (finalMoves <= perfectMoves + 2) return 3;
    if (finalMoves <= perfectMoves + 6) return 2;
    return 1;
  };

  const handleUseHint = () => {
    if (hintsRemaining <= 0 || isHintActive || isChecking || !isGameActive) return;

    playHintSound();
    setHintsRemaining(prev => prev - 1);
    setIsHintActive(true);

    addToast?.('💡 Bảo bối thần kỳ: Hé lộ nhanh toàn bộ thẻ trong 1.3 giây!', 'info');

    setTimeout(() => {
      setIsHintActive(false);
    }, 1300);
  };

  // Canvas Confetti
  const triggerConfetti = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#f472b6', '#ec4899', '#38bdf8', '#a855f7', '#fbbf24', '#34d399', '#f87171'];
    const particles = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height * 0.5,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedY: Math.random() * 3 + 2,
      speedX: (Math.random() - 0.5) * 3,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 6
    }));

    let animId;
    let frames = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotSpeed;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.5);
        ctx.restore();
      });

      frames++;
      if (frames < 220) {
        animId = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    render();
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const currentMatchVocabs = useMemo(() => {
    const map = new Map();
    cards.forEach(c => {
      if (c.vocab && !map.has(c.vocab.id || c.vocab.word)) {
        map.set(c.vocab.id || c.vocab.word, c.vocab);
      }
    });
    return Array.from(map.values());
  }, [cards]);

  return (
    <div className="w-full max-w-6xl mx-auto px-1.5 sm:px-4 py-2 sm:py-3 select-none relative">
      {/* Confetti Overlay */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-50 w-full h-full"
      />

      {/* ========================================================================= */}
      {/* 1. HERO TITLE & CONTROL BANNER (AUTO-RESPONSIVE MOBILE FIRST)             */}
      {/* ========================================================================= */}
      <div className="glass-panel rounded-2xl sm:rounded-3xl p-3 sm:p-5 md:p-6 border border-pink-500/30 bg-gradient-to-r from-slate-950 via-purple-950/70 to-slate-950 shadow-2xl relative overflow-hidden mb-3 sm:mb-4">
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-pink-500 via-amber-400 to-cyan-400" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4">
          {/* Main Brand Title & Description */}
          <div className="flex items-center gap-3">
            <div className="relative flex h-11 w-11 sm:h-14 sm:w-14 md:h-16 md:w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-pink-500 via-purple-600 to-indigo-600 text-2xl sm:text-3xl md:text-4xl shadow-md border border-white/60">
              <span className="vocab-emoji">🃏</span>
              <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-yellow-300 animate-spin" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h2 className="text-base sm:text-xl md:text-2xl font-black text-white font-heading tracking-tight truncate">
                  SIÊU TRÒ CHƠI LẬT THẺ TRÍ NHỚ
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-pink-500 to-amber-500 text-slate-950 border border-yellow-300 shadow-sm shrink-0">
                  V6.1 Master
                </span>
              </div>
              <p className="text-[11px] sm:text-xs md:text-sm text-slate-300 font-medium line-clamp-1 sm:line-clamp-none mt-0.5">
                Toàn bộ <strong className="text-pink-300 font-extrabold">1,260 từ vựng</strong> • Kèm dịch nghĩa chi tiết từng tranh • Giọng đọc AI bản ngữ chuẩn Cambridge!
              </p>
            </div>
          </div>

          {/* Controls Bar (Auto-fit row for all mobile devices) */}
          <div className="flex items-center justify-between sm:justify-end gap-1.5 flex-wrap pt-1 lg:pt-0 border-t lg:border-t-0 border-white/10">
            {/* Toggle SFX Button */}
            <button
              onClick={toggleSfx}
              className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold transition flex items-center gap-1 cursor-pointer border ${
                audioSettings.sfx
                  ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40 shadow-sm'
                  : 'bg-slate-900 text-slate-500 border-slate-800'
              }`}
              title="Bật/Tắt âm thanh hiệu ứng SFX"
            >
              {audioSettings.sfx ? <Volume2 className="h-3.5 w-3.5 text-emerald-400" /> : <VolumeX className="h-3.5 w-3.5" />}
              <span className="hidden sm:inline">{audioSettings.sfx ? 'Âm thanh: BẬT' : 'Âm thanh: TẮT'}</span>
              <span className="sm:hidden">{audioSettings.sfx ? 'Âm: Bật' : 'Âm: Tắt'}</span>
            </button>

            {/* Toggle Voice Pronunciation Button */}
            <button
              onClick={toggleVoice}
              className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold transition flex items-center gap-1 cursor-pointer border ${
                audioSettings.voice
                  ? 'bg-purple-950/80 text-purple-300 border-purple-500/40 shadow-sm'
                  : 'bg-slate-900 text-slate-500 border-slate-800'
              }`}
              title="Bật/Tắt phát âm tiếng Anh AI"
            >
              <Mic className="h-3.5 w-3.5 text-pink-400" />
              <span className="hidden sm:inline">{audioSettings.voice ? 'Giọng đọc: BẬT' : 'Giọng đọc: TẮT'}</span>
              <span className="sm:hidden">{audioSettings.voice ? 'Giọng: Bật' : 'Giọng: Tắt'}</span>
            </button>

            {/* Toggle Slow Turtle Pronunciation */}
            <button
              onClick={toggleSlowMode}
              className={`px-2 py-1.5 rounded-xl text-[11px] font-bold transition flex items-center gap-1 cursor-pointer border ${
                audioSettings.slowMode
                  ? 'bg-amber-950/90 text-amber-300 border-amber-400 shadow-sm animate-pulse'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
              title="Chế độ đọc chậm 0.5x"
            >
              <span>🐢</span>
              <span className="hidden sm:inline">0.5x</span>
            </button>

            {/* Vocab Review Drawer Trigger */}
            <button
              onClick={() => setShowVocabDrawer(true)}
              className="px-2.5 py-1.5 rounded-xl text-[11px] font-black bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md hover:scale-105 transition flex items-center gap-1 cursor-pointer border border-cyan-400/50"
              title="Xem sổ tay từ vựng của ván chơi này"
            >
              <BookOpen className="h-3.5 w-3.5 text-cyan-200" />
              <span>Sổ Từ ({currentMatchVocabs.length})</span>
            </button>

            {/* Leaderboard Trigger */}
            <button
              onClick={() => setShowLeaderboardDrawer(true)}
              className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl text-[11px] font-bold bg-slate-900 border border-amber-500/40 text-amber-300 hover:bg-amber-950 transition flex items-center gap-1 cursor-pointer"
              title="Xem bảng thành tích & kỷ lục"
            >
              <Trophy className="h-3.5 w-3.5 text-yellow-400" />
              <span className="hidden sm:inline">Kỷ Lục</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. SUPER CONFIGURATION & FILTERS BAR (RESPONSIVE FLUID GRID)             */}
      {/* ========================================================================= */}
      {/* ========================================================================= */}
      {/* 2. SUPER CONFIGURATION & FILTERS BAR (RESPONSIVE FLUID GRID)             */}
      {/* ========================================================================= */}
      <div className="glass-panel rounded-2xl p-2.5 sm:p-4 border border-white/10 bg-slate-950/85 shadow-xl mb-3 sm:mb-4 space-y-2.5">
        
        {/* ROW 0: 4-TIER MATCH MODES SELECTOR (Solo, Pass & Play, Online 2 Devices, Vs AI) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-1.5 sm:gap-2 pb-2.5 border-b border-white/10">
          {PVP_MODES.map(mode => {
            const isActive = pvpMode === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => {
                  setPvpMode(mode.id);
                  if (mode.id === 'online_pvp') {
                    setShowOnlineLobby(true);
                  }
                }}
                className={`p-2 sm:p-2.5 rounded-2xl border transition-all cursor-pointer flex flex-col items-start relative overflow-hidden group text-left ${
                  isActive
                    ? `bg-gradient-to-r ${mode.color} text-white border-white/50 shadow-lg scale-102 ring-2 ring-white/30`
                    : 'bg-slate-900/90 text-slate-300 hover:text-white border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-base sm:text-lg">{mode.icon}</span>
                  <span className={`text-[8.5px] px-1.5 py-0.2 rounded-full font-bold uppercase tracking-wider ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {mode.badge}
                  </span>
                </div>
                <div className="text-xs sm:text-sm font-black font-heading mt-1 truncate max-w-full">
                  {mode.name}
                </div>
                <div className="text-[9px] sm:text-[10px] text-white/80 font-medium truncate max-w-full">
                  {mode.subtitle}
                </div>
              </button>
            );
          })}
        </div>

        {/* AI Opponent Selector Sub-bar (when in vs_ai mode) */}
        {pvpMode === 'vs_ai' && (
          <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-purple-950/50 border border-purple-500/40 text-xs flex-wrap animate-fadeIn">
            <div className="flex items-center gap-1.5 text-purple-200 font-bold">
              <Bot className="h-4 w-4 text-purple-400" />
              <span>Đối thủ AI:</span>
            </div>
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
              {Object.values(AI_LEVELS).map(lvl => (
                <button
                  key={lvl.id}
                  onClick={() => setAiLevel(lvl.id)}
                  className={`px-2.5 py-1 rounded-xl text-[11px] font-bold cursor-pointer transition border ${
                    aiLevel === lvl.id
                      ? 'bg-purple-600 text-white border-purple-300 shadow-md scale-105'
                      : 'bg-slate-900 text-slate-400 hover:text-white border-slate-800'
                  }`}
                >
                  {lvl.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Online Network Room Status Sub-bar (when in online_pvp mode) */}
        {pvpMode === 'online_pvp' && (
          <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-cyan-950/50 border border-cyan-500/40 text-xs flex-wrap animate-fadeIn">
            <div className="flex items-center gap-2">
              <span className={`h-2.5 w-2.5 rounded-full shrink-0 ${
                connectionState.status === 'connected' ? 'bg-emerald-400 animate-ping' : 'bg-amber-400 animate-pulse'
              }`} />
              <span className="font-bold text-white text-[11px] truncate">
                {connectionState.status === 'connected'
                  ? `Đã kết nối: ${connectionState.opponentInfo?.name || 'Đối thủ'} (${connectionState.latency}ms)`
                  : 'Chưa có đối thủ kết nối'}
              </span>
              {onlineRoomCode && (
                <span className="px-2 py-0.5 rounded-lg font-mono-code font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 text-[10.5px]">
                  Phòng: {onlineRoomCode}
                </span>
              )}
            </div>

            <button
              onClick={() => setShowOnlineLobby(true)}
              className="px-3 py-1 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:scale-105 text-white font-black text-[11px] shadow transition cursor-pointer flex items-center gap-1 border border-cyan-400/50"
            >
              <Globe className="h-3.5 w-3.5 text-cyan-200" />
              <span>{onlineRoomCode ? 'Quản Lý Phòng' : 'Tạo/Vào Phòng'}</span>
            </button>
          </div>
        )}

        {/* Row 1: Quick 1-Tap Difficulty Segmented Switcher (Always Accessible) */}
        <div className="flex items-center justify-between gap-1.5 flex-wrap">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 w-full sm:w-auto">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider hidden md:inline shrink-0 mr-1">
              Độ khó:
            </span>
            {Object.values(DIFFICULTY_CONFIG).map(diff => {
              const isActive = difficultyKey === diff.id;
              return (
                <button
                  key={diff.id}
                  onClick={() => setDifficultyKey(diff.id)}
                  className={`px-2.5 xs:px-3 sm:px-3.5 py-1.5 rounded-xl text-[11px] sm:text-xs font-black transition-all shrink-0 cursor-pointer flex items-center gap-1 border ${
                    isActive
                      ? 'bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 text-white border-pink-400 shadow-md scale-102'
                      : 'bg-slate-900/90 text-slate-400 hover:text-white border-slate-800 hover:border-slate-700'
                  }`}
                  title={`${diff.name} - ${diff.cardsCount} Thẻ (${diff.pairs} Cặp)`}
                >
                  <span>{diff.name.split(' ')[0]}</span>
                  <span>{diff.shortName || diff.name.split(' ')[1]}</span>
                  <span className="text-[9.5px] opacity-80 font-mono-code">({diff.cardsCount})</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-1.5 w-full sm:w-auto justify-between sm:justify-end pt-1 sm:pt-0 border-t sm:border-t-0 border-white/10">
            <button
              onClick={() => setIsVoiceStudioOpen(true)}
              className="px-2.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer border bg-indigo-950/80 text-indigo-200 border-indigo-400/50 hover:text-white hover:border-pink-400 shadow-sm"
              title="Cài đặt tốc độ đọc & giọng chuẩn bản ngữ 100%"
            >
              <Volume2 className="h-3.5 w-3.5 text-pink-400" />
              <span className="hidden xs:inline">Giọng Bản Ngữ</span>
            </button>

            <button
              onClick={() => setShowFilters(prev => !prev)}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 cursor-pointer border ${
                showFilters
                  ? 'bg-purple-950/90 text-purple-200 border-purple-400 shadow'
                  : 'bg-slate-900 text-slate-300 hover:text-white border-slate-800'
              }`}
            >
              <Filter className="h-3.5 w-3.5 text-pink-400" />
              <span>{showFilters ? 'Ẩn Bộ Lọc' : '⚙️ Bộ Lọc & Chế Độ'}</span>
              {showFilters ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </button>

            <button
              onClick={startNewGame}
              className="px-3 py-1.5 rounded-xl font-black text-xs bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white shadow-md hover:scale-105 active:scale-95 transition flex items-center gap-1.5 border border-pink-400/80 cursor-pointer animate-pulse"
              title="Trộn bộ thẻ mới"
            >
              <RotateCw className="h-3.5 w-3.5 text-yellow-300" />
              <span>Trộn Thẻ Mới ({currentDiff.cardsCount})</span>
            </button>
          </div>
        </div>

        {/* Collapsible Detailed Configuration Panel */}
        {showFilters && (
          <div className="pt-2 border-t border-slate-800 space-y-2.5 animate-fadeIn">
            {/* Level Tabs Quick Horizontal Scroll Bar */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
              <span className="text-slate-400 font-bold shrink-0 flex items-center gap-1 mr-1 text-[11px]">
                <Layers className="h-3.5 w-3.5 text-pink-400" /> Cấp độ:
              </span>

              <button
                onClick={() => { setSelectedLevel('all'); setSelectedCategory('all'); }}
                className={`px-2.5 py-1 rounded-xl text-xs font-black transition shrink-0 cursor-pointer ${
                  selectedLevel === 'all'
                    ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-md scale-105'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                🌈 Toàn Bộ 1,260 Từ
              </button>

              {COURSE_LEVELS.map(lvl => (
                <button
                  key={lvl.id}
                  onClick={() => { setSelectedLevel(lvl.id); setSelectedCategory('all'); }}
                  className={`px-2.5 py-1 rounded-xl text-xs font-bold transition shrink-0 cursor-pointer flex items-center gap-1 ${
                    selectedLevel === lvl.id
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md scale-105 border border-cyan-400'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <span>{lvl.icon}</span>
                  <span>{lvl.id}</span>
                </button>
              ))}
            </div>

            {/* Selectors Grid (2 cols on mobile, 4 on desktop) */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-2.5">
              {/* Unit / Category Dropdown */}
              <div>
                <label className="text-[10px] font-bold text-slate-400 block mb-0.5">
                  CHỦ ĐỀ BÀI HỌC ({availableCategories.length})
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full rounded-xl bg-slate-900 border border-slate-700 px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-pink-500 font-medium"
                >
                  <option value="all">🌈 Tất cả chủ đề ({filteredVocabPool.length} từ)</option>
                  {availableCategories.filter(c => c.id !== 'all').map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.icon} {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quick Search */}
              <div>
                <label className="text-[10px] font-bold text-slate-400 block mb-0.5">
                  TÌM TỪ TÙY CHỌN
                </label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Gõ từ: apple, cat, red..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-xl bg-slate-900 border border-slate-700 pl-8 pr-7 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500 placeholder-slate-500"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2 top-2 text-slate-400 hover:text-white cursor-pointer"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Match Mode Selector */}
              <div>
                <label className="text-[10px] font-bold text-slate-400 block mb-0.5">
                  CHẾ ĐỘ GHÉP THẺ
                </label>
                <select
                  value={gameMode}
                  onChange={(e) => setGameMode(e.target.value)}
                  className="w-full rounded-xl bg-slate-900 border border-slate-700 px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500 font-bold"
                >
                  {GAME_MODES.map(mode => (
                    <option key={mode.id} value={mode.id}>
                      {mode.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Timer Mode Toggle & Pool Info */}
              <div>
                <label className="text-[10px] font-bold text-slate-400 block mb-0.5">
                  CHẾ ĐỘ THỜI GIAN
                </label>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setTimerMode(prev => prev === 'zen' ? 'countdown' : 'zen')}
                    className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition cursor-pointer border flex items-center justify-center gap-1 ${
                      timerMode === 'countdown'
                        ? 'bg-rose-950 text-rose-300 border-rose-500/50'
                        : 'bg-emerald-950 text-emerald-300 border-emerald-500/50'
                    }`}
                  >
                    <span>{timerMode === 'countdown' ? '⚡ Đếm Ngược' : '⏱️ Thư Giãn (Zen)'}</span>
                  </button>
                  <span className="text-[10px] text-slate-400 font-mono-code px-2 py-1.5 bg-slate-900 rounded-xl border border-slate-800">
                    {filteredVocabPool.length} Từ
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 3. IN-GAME STATS HUD: SOLO STATS OR ESPORTS 2-PLAYER BATTLE ARENA BAR      */}
      {/* ========================================================================= */}
      {pvpMode === 'solo' ? (
        <div className="glass-panel rounded-2xl p-2.5 sm:px-4 sm:py-3 border border-pink-500/30 bg-slate-900/90 shadow-xl mb-3 sm:mb-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 items-center gap-2 sm:gap-4">
            {/* Item 1: Timer Display */}
            <div className="flex items-center gap-2 bg-slate-950/60 p-1.5 sm:p-2 rounded-xl border border-slate-800">
              <div className={`p-1.5 sm:p-2 rounded-lg border shrink-0 ${timerMode === 'countdown' && timerSeconds <= 10 ? 'bg-rose-950 border-rose-500 text-rose-300 animate-bounce' : 'bg-slate-900 border-slate-700 text-cyan-300'}`}>
                <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div className="min-w-0">
                <div className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase truncate">
                  {timerMode === 'countdown' ? 'Còn lại' : 'Thời gian'}
                </div>
                <div className="text-sm sm:text-base md:text-lg font-black font-mono-code text-white">
                  {formatTime(timerSeconds)}
                </div>
              </div>
            </div>

            {/* Item 2: Turns Taken */}
            <div className="flex items-center gap-2 bg-slate-950/60 p-1.5 sm:p-2 rounded-xl border border-slate-800">
              <div className="p-1.5 sm:p-2 rounded-lg bg-slate-900 border border-slate-700 text-amber-300 shrink-0">
                <Target className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div className="min-w-0">
                <div className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase truncate">
                  Lượt Lật
                </div>
                <div className="text-sm sm:text-base md:text-lg font-black font-mono-code text-amber-300">
                  {moves} Lượt
                </div>
              </div>
            </div>

            {/* Item 3: Matched Pairs & Combo */}
            <div className="flex items-center gap-2 bg-slate-950/60 p-1.5 sm:p-2 rounded-xl border border-slate-800">
              <div className="p-1.5 sm:p-2 rounded-lg bg-slate-900 border border-slate-700 text-emerald-400 shrink-0">
                <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div className="min-w-0">
                <div className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase truncate">
                  {streak > 1 ? `Combo x${streak} 🔥` : 'Đã Ghép'}
                </div>
                <div className="text-sm sm:text-base md:text-lg font-black font-mono-code text-emerald-400">
                  {matchedPairIds.size} / {currentDiff.pairs}
                </div>
              </div>
            </div>

            {/* Item 4: Total Score & Hint Power-Up */}
            <div className="flex items-center justify-between gap-1 bg-slate-950/60 p-1.5 sm:p-2 rounded-xl border border-slate-800">
              <div className="min-w-0">
                <div className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase truncate">
                  Điểm Số
                </div>
                <div className="text-sm sm:text-base md:text-lg font-black font-mono-code text-pink-300">
                  {score}
                </div>
              </div>

              <button
                onClick={handleUseHint}
                disabled={hintsRemaining <= 0 || isHintActive || isChecking}
                className={`px-2 py-1.5 rounded-lg text-[10px] sm:text-xs font-black transition flex items-center gap-1 border shrink-0 ${
                  hintsRemaining > 0 && !isHintActive
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 border-yellow-300 shadow hover:scale-105 active:scale-95 cursor-pointer'
                    : 'bg-slate-900 text-slate-500 border-slate-800 cursor-not-allowed opacity-50'
                }`}
                title="Hé lộ nhanh tất cả các thẻ trong 1.3 giây"
              >
                <HelpCircle className="h-3.5 w-3.5" />
                <span>Gợi ý ({hintsRemaining})</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <MemoryPvpArenaBar
          pvpMode={pvpMode}
          player1={player1}
          player2={player2}
          activeTurn={activeTurn}
          turnTimer={turnTimer}
          maxTurnTime={15}
          isBonusTurn={isBonusTurn}
          aiSpeech={aiSpeech}
          aiLevel={aiLevel}
          totalPairs={currentDiff.pairs}
          connectionStatus={connectionState.status}
          latency={connectionState.latency}
          isMyTurn={
            pvpMode === 'online_pvp'
              ? ((connectionState.role === 'host' && activeTurn === 'p1') || (connectionState.role === 'guest' && activeTurn === 'p2'))
              : true
          }
        />
      )}


      {/* ========================================================================= */}
      {/* 4. MEMORY CARD PLAYFIELD GRID (AUTO RESPONSIVE WITH SUPER DETAILED MEANINGS) */}
      {/* ========================================================================= */}
      <div className={`mx-auto grid ${currentDiff.gridClass} gap-1.5 xs:gap-2 sm:gap-2.5 md:gap-3.5 mb-5 sm:mb-8 card-flip-perspective px-0.5 sm:px-0`}>
        {cards.map((card, idx) => {
          const isMatched = matchedPairIds.has(card.pairId);
          const isFlipped = flippedIndices.includes(idx) || isMatched || isHintActive;
          const isMismatched = mismatchedIndices.includes(idx);
          const isSpeaking = currentlySpeakingCardId === card.cardId;

          return (
            <div
              key={card.cardId}
              onClick={() => handleCardClick(idx)}
              className={`w-full aspect-[3/4.2] sm:aspect-[3/4.1] min-h-[114px] xs:min-h-[128px] sm:min-h-[155px] md:min-h-[180px] relative cursor-pointer select-none transition-transform duration-200 card-flip-item ${
                isMatched
                  ? 'scale-98 opacity-95 animate-card-match'
                  : 'hover:scale-102 active:scale-95'
              } ${isMismatched ? 'animate-card-mismatch' : ''}`}
            >
              {/* 3D Flip Container Inner */}
              <div className={`card-flip-inner ${isFlipped ? 'is-flipped' : ''}`}>
                
                {/* ---------------- CARD BACK (MAGICAL COSMIC FOIL) ---------------- */}
                <div className="card-flip-face card-flip-back bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border-2 border-indigo-400/50 shadow-xl flex flex-col items-center justify-between p-1.5 xs:p-2 sm:p-2.5 relative overflow-hidden group">
                  {/* Holographic Shimmer Aura */}
                  <div className="absolute inset-0 holo-foil-gradient opacity-30 pointer-events-none" />

                  {/* Corner Ornaments */}
                  <div className="w-full flex items-center justify-between text-[7px] xs:text-[8px] sm:text-[9px] text-pink-400/80 font-mono-code">
                    <span>✦</span>
                    <span>✦</span>
                  </div>

                  {/* Central Emblem */}
                  <div className="relative flex flex-col items-center justify-center my-auto">
                    <div className="flex items-center justify-center h-8 w-8 xs:h-10 xs:w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-pink-500/30 via-purple-600/30 to-indigo-600/30 border border-white/40 shadow-inner group-hover:scale-105 transition-transform duration-200">
                      <span className="vocab-emoji text-lg xs:text-xl sm:text-2xl md:text-3xl">🦄</span>
                      <Sparkles className="absolute -top-1 -right-1 h-3 w-3 sm:h-3.5 sm:w-3.5 text-yellow-300 animate-spin" />
                    </div>

                    <span className="mt-1 text-[8px] xs:text-[9px] sm:text-[10px] md:text-xs font-black uppercase tracking-wider text-pink-200/90 font-heading text-center truncate max-w-full px-0.5">
                      KIDS ENGLISH
                    </span>
                  </div>

                  {/* Bottom Footer Badge */}
                  <div className="w-full flex items-center justify-between text-[7px] xs:text-[8px] sm:text-[9px] text-indigo-300/70 font-mono-code pt-0.5 border-t border-white/10">
                    <span>✦</span>
                    <span>#{idx + 1}</span>
                    <span>✦</span>
                  </div>
                </div>

                {/* ---------------- CARD FRONT (SUPER DETAILED FACE) ---------------- */}
                <div
                  className={`card-flip-face card-flip-front flex flex-col items-center justify-between p-1.5 xs:p-2 sm:p-2.5 md:p-3 relative border-2 shadow-xl ${
                    isMatched
                      ? 'bg-gradient-to-b from-emerald-950/95 via-slate-900 to-slate-950 border-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.4)]'
                      : 'bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border-pink-400/60 shadow-lg'
                  }`}
                >
                  {/* Category & Card Type Indicator Badge */}
                  <div className="w-full flex items-center justify-between text-[7.5px] xs:text-[8px] sm:text-[9px] font-bold text-slate-400 pb-0.5 sm:pb-1 border-b border-white/10">
                    <span className={`px-1 sm:px-1.5 py-0.5 rounded font-mono-code border text-[7.5px] xs:text-[8px] ${
                      LEVEL_BADGE_MAP[card.vocab?.level]?.color || 'bg-pink-500/20 text-pink-300 border-pink-400/30'
                    }`}>
                      {card.vocab?.level || 'L1'}
                    </span>
                    <span className={`px-1.5 py-0.5 rounded-full text-[7px] xs:text-[8px] font-black uppercase tracking-wider border ${
                      card.type === 'word'
                        ? 'bg-purple-500/20 text-purple-300 border-purple-400/40'
                        : card.type === 'image'
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40'
                        : card.type === 'meaning'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-400/40'
                        : card.type === 'audio'
                        ? 'bg-pink-500/20 text-pink-300 border-pink-400/40'
                        : 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40'
                    }`}>
                      {card.type === 'word' && '🔤 Thẻ Từ'}
                      {card.type === 'image' && '🖼️ Thẻ Hình'}
                      {card.type === 'meaning' && '🇻🇳 Thẻ Nghĩa'}
                      {card.type === 'audio' && '🔊 Thẻ Nghe'}
                      {card.type === 'twin' && '✨ Sinh Đôi'}
                    </span>
                  </div>

                  {/* Center Content based on card type */}
                  <div className="flex-1 flex flex-col items-center justify-between w-full my-0.5 sm:my-1 text-center overflow-hidden">
                    
                    {/* A. IMAGE CARD - Super Detailed with Translated Meaning & Phonetics */}
                    {card.type === 'image' && (
                      <div className="flex-1 flex flex-col items-center justify-between w-full h-full py-0.5">
                        {/* Flat Icon in Framed Pedestal Container */}
                        <div className="my-auto flex items-center justify-center p-1.5 xs:p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-gradient-to-br from-slate-800/90 to-slate-900 border border-slate-700/70 shadow-inner">
                          <VocabSmartIcon
                            item={card.vocab}
                            word={card.vocab?.word}
                            image={card.vocab?.image}
                            className="w-8 h-8 xs:w-9 xs:h-9 sm:w-12 sm:h-12 md:w-14 md:h-14"
                          />
                        </div>

                        {/* Vietnamese Translation & Reading Guide Block */}
                        <div className="w-full text-center px-0.5 mt-0.5">
                          {/* Vietnamese Definition */}
                          <div className="text-[10.5px] xs:text-[11.5px] sm:text-xs md:text-sm font-black text-amber-300 leading-tight line-clamp-2 drop-shadow-sm font-heading">
                            {card.vocab?.meaning}
                          </div>

                          {/* Vietnamese Phonetic Reading Guide */}
                          {card.vocab?.vietnamesePhonetic && (
                            <div className="text-[7.5px] xs:text-[8.5px] sm:text-[9.5px] text-pink-300 font-semibold italic mt-0.5 truncate flex items-center justify-center gap-0.5">
                              <span>🗣️</span>
                              <span>"{card.vocab.vietnamesePhonetic}"</span>
                            </div>
                          )}

                          {/* IPA Phonetics */}
                          {card.vocab?.ipa && (
                            <div className="hidden xs:block text-[7.5px] sm:text-[8.5px] text-cyan-300/80 font-mono-code truncate mt-0.5">
                              {card.vocab.ipa}
                            </div>
                          )}
                        </div>

                        {/* Revealed English Word upon match or Type Badge */}
                        {isMatched ? (
                          <div className="mt-0.5 px-1.5 py-0.5 rounded-md bg-emerald-500/25 border border-emerald-400/40 text-[8px] xs:text-[9px] sm:text-[10px] font-black text-emerald-300 capitalize truncate max-w-full">
                            ✓ {card.vocab?.word}
                          </div>
                        ) : (
                          <div className="text-[7.5px] xs:text-[8px] text-cyan-300/80 font-medium truncate mt-0.5 flex items-center justify-center gap-1">
                            <span>🔍 Ghép với thẻ từ</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* B. WORD CARD - Super Detailed with Translated Meaning */}
                    {card.type === 'word' && (
                      <div className="flex-1 flex flex-col items-center justify-between w-full h-full py-0.5 text-center px-0.5">
                        <div className="my-auto flex flex-col items-center justify-center w-full">
                          {isMatched && (
                            <div className="mb-1 p-1 rounded-lg bg-emerald-950/60 border border-emerald-500/30">
                              <VocabSmartIcon
                                item={card.vocab}
                                word={card.vocab?.word}
                                image={card.vocab?.image}
                                className="w-6 h-6 xs:w-7 xs:h-7 sm:w-9 sm:h-9"
                              />
                            </div>
                          )}
                          <div className="text-xs xs:text-sm sm:text-base md:text-lg font-black text-white capitalize font-heading tracking-wide leading-tight drop-shadow-sm">
                            {card.vocab?.word}
                          </div>
                          {card.vocab?.ipa && (
                            <div className="text-[7.5px] xs:text-[8.5px] sm:text-[9.5px] text-cyan-300 font-mono-code mt-0.5">
                              {card.vocab.ipa}
                            </div>
                          )}
                          {card.vocab?.vietnamesePhonetic && (
                            <div className="text-[7.5px] xs:text-[8.5px] sm:text-[9.5px] text-pink-300 font-medium italic mt-0.5 truncate max-w-full">
                              🗣️ "{card.vocab.vietnamesePhonetic}"
                            </div>
                          )}
                        </div>

                        {/* Vietnamese Meaning Pill */}
                        <div className="text-[9.5px] xs:text-[10.5px] sm:text-xs font-black text-amber-300 line-clamp-2 px-1.5 py-0.5 sm:py-1 bg-amber-500/15 border border-amber-400/30 rounded-lg w-full mt-0.5 font-heading">
                          👉 {card.vocab?.meaning}
                        </div>
                      </div>
                    )}

                    {/* C. VIETNAMESE MEANING CARD */}
                    {card.type === 'meaning' && (
                      <div className="flex-1 flex flex-col items-center justify-between w-full h-full py-0.5 text-center px-0.5">
                        <span className="text-[7px] xs:text-[8px] sm:text-[9px] font-black uppercase tracking-wider text-amber-400">
                          🇻🇳 NGHĨA TIẾNG VIỆT
                        </span>

                        <div className="my-auto w-full">
                          <div className="text-xs xs:text-sm sm:text-base font-black text-amber-300 leading-snug line-clamp-2 font-heading drop-shadow-sm">
                            {card.vocab?.meaning}
                          </div>
                          {card.vocab?.vietnamesePhonetic && (
                            <div className="text-[8px] xs:text-[8.5px] sm:text-[9.5px] text-cyan-300 font-medium italic mt-0.5 truncate">
                              Đọc là: "{card.vocab.vietnamesePhonetic}"
                            </div>
                          )}
                        </div>

                        {isMatched ? (
                          <div className="px-1.5 py-0.5 rounded bg-emerald-500/25 border border-emerald-400/30 text-[8.5px] xs:text-[9px] text-emerald-300 font-black capitalize">
                            ✓ {card.vocab?.word}
                          </div>
                        ) : (
                          <span className="text-[7.5px] xs:text-[8px] text-amber-300/80 font-medium">🔍 Tìm thẻ từ tương ứng</span>
                        )}
                      </div>
                    )}

                    {/* D. AUDIO MYSTERY CARD */}
                    {card.type === 'audio' && (
                      <div className="flex-1 flex flex-col items-center justify-between w-full h-full py-0.5 text-center">
                        <div className="my-auto flex flex-col items-center">
                          <div className={`p-2 xs:p-2.5 sm:p-3 rounded-2xl border transition-all ${
                            isSpeaking
                              ? 'bg-pink-600 border-white text-white scale-110 shadow-lg'
                              : 'bg-slate-900 border-purple-500/50 text-purple-300'
                          }`}>
                            <Volume2 className="h-5 w-5 xs:h-6 xs:w-6 sm:h-7 sm:w-7" />
                          </div>
                          <span className="text-[8.5px] xs:text-[9.5px] font-black text-purple-300 mt-1">
                            🔊 Nghe Phát Âm
                          </span>
                        </div>

                        {isMatched ? (
                          <div className="w-full px-1">
                            <div className="text-[9.5px] font-black text-amber-300 truncate font-heading">
                              {card.vocab?.meaning}
                            </div>
                            <div className="text-[8.5px] font-bold text-emerald-300 capitalize">
                              ✓ {card.vocab?.word}
                            </div>
                          </div>
                        ) : (
                          <span className="text-[7.5px] text-purple-300/80 font-medium">Chạm để nghe từ</span>
                        )}
                      </div>
                    )}

                    {/* E. TWIN CARD (BOTH IMAGE & WORD + MEANING) */}
                    {card.type === 'twin' && (
                      <div className="flex-1 flex flex-col items-center justify-between w-full h-full py-0.5 text-center px-0.5">
                        <div className="my-auto flex flex-col items-center w-full">
                          <div className="p-1 rounded-xl bg-slate-800/80 border border-slate-700/50 mb-0.5">
                            <VocabSmartIcon
                              item={card.vocab}
                              word={card.vocab?.word}
                              image={card.vocab?.image}
                              className="w-6 h-6 xs:w-7 xs:h-7 sm:w-9 sm:h-9 md:w-11 md:h-11"
                            />
                          </div>
                          <div className="text-[11px] xs:text-xs sm:text-sm font-black text-white capitalize font-heading tracking-wide leading-tight">
                            {card.vocab?.word}
                          </div>
                          {card.vocab?.vietnamesePhonetic && (
                            <div className="text-[7px] xs:text-[8px] sm:text-[9px] text-pink-300 italic truncate max-w-full">
                              🗣️ "{card.vocab.vietnamesePhonetic}"
                            </div>
                          )}
                        </div>

                        <div className="text-[9px] xs:text-[10px] sm:text-[11px] font-black text-amber-300 leading-tight truncate max-w-full px-1 py-0.5 bg-amber-500/10 rounded font-heading">
                          👉 {card.vocab?.meaning}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card Footer: Match Status or Audio Replay Button */}
                  <div className="w-full flex items-center justify-between pt-0.5 sm:pt-1 border-t border-white/10 text-[7.5px] xs:text-[8px] sm:text-[9px]">
                    {isMatched ? (
                      <span className="w-full text-center font-black text-emerald-300 flex items-center justify-center gap-1 text-[8px] xs:text-[8.5px] sm:text-[9.5px]">
                        <Check className="h-2.5 w-2.5 xs:h-3 xs:w-3 text-emerald-400 stroke-[3]" /> GHÉP ĐÚNG
                      </span>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentlySpeakingCardId(card.cardId);
                          speakWord(card.vocab?.word, {
                            slow: audioSettings.slowMode,
                            onEnd: () => setCurrentlySpeakingCardId(null)
                          });
                        }}
                        className={`w-full py-0.5 sm:py-1 rounded-lg flex items-center justify-center gap-1 font-bold text-[7.5px] xs:text-[8px] sm:text-[9px] transition-all cursor-pointer border active:scale-95 ${
                          isSpeaking
                            ? 'bg-pink-600 text-white border-white scale-102'
                            : 'bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border-white/10'
                        }`}
                        title="Nghe lại phát âm từ này"
                      >
                        <Volume2 className={`h-2.5 w-2.5 xs:h-3 xs:w-3 ${isSpeaking ? 'text-white animate-bounce' : 'text-pink-400'}`} />
                        <span className="truncate">{isSpeaking ? 'Đang đọc...' : 'Phát Âm'}</span>
                      </button>
                    )}
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* 5. VICTORY CELEBRATION MODAL (MOBILE RESPONSIVE DIALOG)                   */}
      {/* ========================================================================= */}
      {isGameWon && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="glass-panel w-full max-w-lg rounded-3xl border-2 border-yellow-400/80 bg-gradient-to-b from-slate-950 via-slate-900 to-purple-950/90 p-4 sm:p-7 shadow-[0_0_50px_rgba(250,204,21,0.5)] text-center relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-pink-500 via-amber-400 to-emerald-400" />

            {/* Trophy Icon */}
            <div className="relative inline-flex items-center justify-center h-16 w-16 sm:h-20 sm:w-20 rounded-3xl bg-gradient-to-tr from-amber-400 via-yellow-300 to-orange-500 text-slate-950 shadow-md text-4xl sm:text-5xl mb-2 sm:mb-3">
              <span className="vocab-emoji icon-dance">🏆</span>
              <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-white animate-spin" />
            </div>

            <h3 className="text-xl sm:text-3xl font-black text-white font-heading tracking-tight uppercase">
              BÉ XUẤT SẮC CHIẾN THẮNG!
            </h3>
            <p className="text-xs sm:text-sm text-amber-200 font-medium max-w-md mx-auto mt-1">
              Bé đã chinh phục trọn vẹn <strong>{currentDiff.pairs} cặp từ vựng</strong> của cấp độ <strong>{currentDiff.name}</strong>!
            </p>

            {/* Star Rating Display */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 my-3 sm:my-4">
              {[1, 2, 3].map(starIdx => {
                const earned = starIdx <= calculateStarRating(moves);
                return (
                  <Star
                    key={starIdx}
                    className={`h-7 w-7 sm:h-9 sm:w-9 transition-all duration-500 ${
                      earned
                        ? 'text-yellow-400 fill-yellow-400 drop-shadow-[0_0_12px_#facc15] scale-110 animate-pulse'
                        : 'text-slate-700'
                    }`}
                  />
                );
              })}
            </div>

            {/* Scoreboard Statistics Card */}
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2 p-2.5 sm:p-3 rounded-2xl bg-slate-950/90 border border-slate-800 text-xs font-mono-code mb-4 sm:mb-5">
              <div>
                <span className="text-slate-400 block text-[9px] sm:text-[10px]">THỜI GIAN</span>
                <span className="text-emerald-400 font-extrabold text-sm sm:text-base">
                  {formatTime(timerMode === 'countdown' ? (currentDiff.timeLimit - timerSeconds) : timerSeconds)}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[9px] sm:text-[10px]">TỔNG SỐ LƯỢT</span>
                <span className="text-amber-300 font-extrabold text-sm sm:text-base">
                  {moves} Lượt
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[9px] sm:text-[10px]">ĐIỂM TÍCH LŨY</span>
                <span className="text-pink-300 font-extrabold text-sm sm:text-base">
                  {score + 200}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <button
                onClick={() => { setIsGameWon(false); startNewGame(); }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-2xl font-black text-xs bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-xl hover:scale-105 active:scale-95 transition flex items-center justify-center gap-2 border border-emerald-300 cursor-pointer"
              >
                <RotateCw className="h-4 w-4" />
                <span>Chơi Ván Mới Tiếp Theo</span>
              </button>

              <button
                onClick={() => { setIsGameWon(false); setShowVocabDrawer(true); }}
                className="w-full sm:w-auto px-4 py-2.5 rounded-2xl font-black text-xs bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-xl hover:scale-105 transition flex items-center justify-center gap-1.5 border border-pink-400 cursor-pointer"
              >
                <BookOpen className="h-4 w-4" />
                <span>Ôn Tập Sổ Từ Vừa Học ({currentMatchVocabs.length})</span>
              </button>

              <button
                onClick={() => setIsGameWon(false)}
                className="w-full sm:w-auto px-4 py-2 rounded-2xl text-xs font-bold bg-slate-900 border border-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. VOCABULARY REVIEW DRAWER / MODAL (SỔ TAY TỪ VỰNG CỦA VÁN CHƠI)        */}
      {/* ========================================================================= */}
      {showVocabDrawer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-5 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="glass-panel w-full max-w-4xl max-h-[92vh] rounded-2xl sm:rounded-3xl border-2 border-cyan-400/60 bg-slate-950/95 shadow-2xl flex flex-col overflow-hidden">
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-3.5 sm:p-5 border-b border-slate-800 bg-slate-900/90">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="p-2 sm:p-2.5 rounded-xl bg-cyan-600/20 border border-cyan-400 text-cyan-300 text-xl sm:text-2xl">
                  📖
                </div>
                <div>
                  <h3 className="text-sm sm:text-lg font-black text-white font-heading">
                    SỔ TAY TỪ VỰNG VÁN CHƠI ({currentMatchVocabs.length} Từ)
                  </h3>
                  <p className="text-[10px] sm:text-xs text-slate-400">
                    Phát âm chuẩn AI, phiên âm tiếng Việt, nghĩa chi tiết và câu ví dụ song ngữ
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowVocabDrawer(false)}
                className="p-1.5 sm:p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>

            {/* Drawer Content: Cards Grid */}
            <div className="p-3 sm:p-6 overflow-y-auto space-y-2.5 sm:space-y-3.5 flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3.5">
                {currentMatchVocabs.map((vocab, vIdx) => (
                  <div
                    key={vocab.id || vIdx}
                    className="p-3 sm:p-3.5 rounded-2xl border border-slate-800 bg-slate-900/80 hover:border-pink-500/50 transition flex items-start gap-3 shadow-md"
                  >
                    <div className="shrink-0 pt-0.5">
                      <VocabSmartIcon
                        item={vocab}
                        word={vocab.word}
                        image={vocab.image}
                        className="w-11 h-11 sm:w-12 sm:h-12"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs sm:text-sm font-black text-white capitalize font-heading">
                            {vocab.word}
                          </span>
                          <span className="px-1.5 py-0.5 rounded text-[8px] sm:text-[9px] font-mono-code bg-pink-500/20 text-pink-300">
                            {vocab.level || 'L1'}
                          </span>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => speakWord(vocab.word, { slow: false })}
                            className="p-1 rounded-lg bg-pink-950 text-pink-300 hover:bg-pink-900 transition cursor-pointer"
                            title="Nghe phát âm chuẩn"
                          >
                            <Volume2 className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => speakWord(vocab.word, { slow: true })}
                            className="px-1.5 py-0.5 rounded-lg bg-amber-950 text-amber-300 text-[9px] font-bold hover:bg-amber-900 transition cursor-pointer"
                            title="Nghe phát âm chậm 0.5x"
                          >
                            🐢 0.5x
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 text-[11px] mt-0.5 font-mono-code">
                        <span className="text-cyan-300">{vocab.ipa}</span>
                        {vocab.vietnamesePhonetic && (
                          <span className="text-amber-300 font-sans italic text-[10px]">
                            • "{vocab.vietnamesePhonetic}"
                          </span>
                        )}
                      </div>

                      <div className="text-xs font-bold text-amber-200 mt-1">
                        👉 {vocab.meaning}
                      </div>

                      {vocab.example && (
                        <div className="mt-1.5 pt-1.5 border-t border-slate-800/80 text-[10px] sm:text-[11px] flex items-start justify-between gap-1.5 bg-slate-950/40 p-1.5 rounded-lg">
                          <div className="min-w-0 flex-1">
                            <div className="text-cyan-200 font-medium italic">
                              "{vocab.example}"
                            </div>
                            {vocab.exampleVi && (
                              <div className="text-amber-200/90 text-[9px] sm:text-[10px] mt-0.5">
                                {vocab.exampleVi}
                              </div>
                            )}
                          </div>
                          <button
                            onClick={() => speakWord(vocab.example, { slow: audioSettings.slowMode })}
                            className="p-1 rounded-md bg-cyan-950/80 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/30 shrink-0 cursor-pointer transition active:scale-95"
                            title="Nghe phát âm câu ví dụ"
                          >
                            <Volume2 className="h-3 w-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-3 sm:p-3.5 border-t border-slate-800 bg-slate-900/90 flex items-center justify-between text-xs">
              <span className="text-slate-400 text-[10px] sm:text-xs">
                Toàn bộ dữ liệu nằm trong hệ thống 1,260 từ vựng song ngữ
              </span>
              <button
                onClick={() => setShowVocabDrawer(false)}
                className="px-3.5 py-1.5 rounded-xl bg-pink-600 text-white font-bold text-xs cursor-pointer hover:bg-pink-500 transition"
              >
                Đã Ôn Tập Xong
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. HIGH SCORES & LEADERBOARD DRAWER                                      */}
      {/* ========================================================================= */}
      {showLeaderboardDrawer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="glass-panel w-full max-w-lg rounded-2xl sm:rounded-3xl border-2 border-amber-400/60 bg-slate-950/95 p-4 sm:p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
                <h3 className="text-sm sm:text-lg font-black text-white font-heading">
                  BẢNG KỶ LỤC & THÀNH TÍCH CÁ NHÂN
                </h3>
              </div>
              <button
                onClick={() => setShowLeaderboardDrawer(false)}
                className="p-1 rounded-xl bg-slate-900 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="py-3 sm:py-4 space-y-2">
              {Object.values(DIFFICULTY_CONFIG).map(diff => {
                const rec = highScores[diff.id];
                return (
                  <div
                    key={diff.id}
                    className="p-2.5 sm:p-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between"
                  >
                    <div>
                      <div className="font-extrabold text-white text-xs">
                        {diff.name}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {diff.cardsCount} Thẻ • {rec?.totalWins ? `Đã thắng: ${rec.totalWins} ván` : 'Chưa có kỷ lục'}
                      </div>
                    </div>

                    <div className="text-right font-mono-code text-xs">
                      {rec ? (
                        <>
                          <div className="text-emerald-400 font-bold text-[11px] sm:text-xs">
                            ⏱️ {formatTime(rec.bestTime)} • {rec.bestMoves} Lượt
                          </div>
                          <div className="text-pink-300 text-[10px]">
                            🏆 Điểm cao nhất: {rec.highestScore}
                          </div>
                        </>
                      ) : (
                        <span className="text-slate-600 text-[10px] italic">Chưa hoàn thành</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => setShowLeaderboardDrawer(false)}
              className="w-full py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 font-bold text-xs hover:text-white transition cursor-pointer"
            >
              Đóng Bảng Kỷ Lục
            </button>
          </div>
        </div>
      )}

      {/* Global Native Voice Studio Modal */}
      <NativeVoiceStudioModal
        isOpen={isVoiceStudioOpen}
        onClose={() => setIsVoiceStudioOpen(false)}
        addToast={addToast}
      />

      {/* 8. LIVE EMOTES & QUICK CHAT OVERLAY (FOR 2-PLAYER MODES) */}
      {pvpMode !== 'solo' && (
        <MemoryLiveEmotesOverlay
          activeFloatingItems={activeFloatingItems}
          onSendEmote={handleSendLiveEmote}
          onSendChat={handleSendLiveChat}
          disabled={!isGameActive || isGameWon}
        />
      )}

      {/* 9. REAL-TIME ONLINE LOBBY MODAL (WEBRTC P2P ROOMS) */}
      <MemoryOnlineLobbyModal
        isOpen={showOnlineLobby}
        onClose={() => setShowOnlineLobby(false)}
        roomCode={onlineRoomCode}
        connectionState={connectionState}
        onCreateRoom={handleCreateOnlineRoom}
        onJoinRoom={handleJoinOnlineRoom}
        onStartOnlineMatch={handleStartOnlineMatch}
        addToast={addToast}
      />

      {/* 10. 2-PLAYER VICTORY PODIUM MODAL */}
      <MemoryPvpPodiumModal
        isOpen={showPvpPodium}
        onClose={() => setShowPvpPodium(false)}
        player1={player1}
        player2={player2}
        pvpMode={pvpMode}
        totalPairs={currentDiff.pairs}
        onRematch={handleRequestRematch}
        onOpenVocabReview={() => setShowVocabDrawer(true)}
        rematchWaiting={rematchWaiting}
      />

    </div>
  );
}
