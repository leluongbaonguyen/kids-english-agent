// Real-Time P2P WebRTC & BroadcastChannel Engine for Kids Memory Card Game
// Supports:
// 1. Cross-device WebRTC P2P DataChannels via PeerJS with public STUN servers
// 2. Zero-latency BroadcastChannel fallback for dual-tab/same-machine play
// 3. Automated room matchmaking (ROOM-XXX), latency ping/pong, and message deduplication

import { Peer } from 'peerjs';

class RealtimeGameEngine {
  constructor() {
    this.peer = null;
    this.connection = null;
    this.broadcastChannel = null;
    this.roomCode = null;
    this.role = null; // 'host' | 'guest'
    this.status = 'idle'; // 'idle' | 'connecting' | 'waiting' | 'connected' | 'disconnected' | 'error'
    this.latency = 0;
    this.opponentInfo = null;
    this.myInfo = {
      name: 'Bé Yêu',
      avatar: '👧',
      id: Math.random().toString(36).substring(2, 9)
    };

    this.listeners = {
      statusChange: [],
      message: []
    };

    this.seenMessageIds = new Set();
    this.pingInterval = null;
  }

  // Generate a friendly, kid-memorable room code like "STAR-782" or "KIDS-391"
  generateRoomCode() {
    const prefixes = ['KIDS', 'STAR', 'HERO', 'LION', 'PANDA', 'MAGIC', 'LUCKY'];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const num = Math.floor(100 + Math.random() * 900);
    return `${prefix}-${num}`;
  }

  // Subscribe to engine events
  onStatusChange(callback) {
    this.listeners.statusChange.push(callback);
    return () => {
      this.listeners.statusChange = this.listeners.statusChange.filter(cb => cb !== callback);
    };
  }

  onMessage(callback) {
    this.listeners.message.push(callback);
    return () => {
      this.listeners.message = this.listeners.message.filter(cb => cb !== callback);
    };
  }

  emitStatus(status, extra = {}) {
    this.status = status;
    const state = {
      status,
      role: this.role,
      roomCode: this.roomCode,
      latency: this.latency,
      opponentInfo: this.opponentInfo,
      myInfo: this.myInfo,
      ...extra
    };
    this.listeners.statusChange.forEach(cb => {
      try { cb(state); } catch (e) { console.warn('Error in status subscriber', e); }
    });
  }

  emitMessage(payload) {
    this.listeners.message.forEach(cb => {
      try { cb(payload); } catch (e) { console.warn('Error in message subscriber', e); }
    });
  }

  // Update current player info
  setPlayerInfo(info) {
    this.myInfo = { ...this.myInfo, ...info };
    if (this.status === 'connected') {
      this.send({
        type: 'PLAYER_INFO_UPDATE',
        playerInfo: this.myInfo
      });
    }
  }

  // Setup local BroadcastChannel bridge for instant local tab sync
  setupBroadcastChannel(code) {
    if (typeof window === 'undefined' || typeof window.BroadcastChannel === 'undefined') return;
    try {
      if (this.broadcastChannel) {
        this.broadcastChannel.close();
      }
      this.broadcastChannel = new BroadcastChannel(`kids_memory_room_${code}`);
      this.broadcastChannel.onmessage = (event) => {
        this.handleIncomingRaw(event.data, 'broadcast');
      };
    } catch (e) {
      console.warn('BroadcastChannel not supported or error', e);
    }
  }

  // Create a Room as Host
  createRoom(customCode = null, playerInfo = null) {
    this.disconnect();
    this.role = 'host';
    this.roomCode = (customCode || this.generateRoomCode()).toUpperCase().trim();
    if (playerInfo) this.myInfo = { ...this.myInfo, ...playerInfo };

    this.emitStatus('connecting', { message: 'Đang khởi tạo phòng thi đấu...' });
    this.setupBroadcastChannel(this.roomCode);

    const peerId = `kids-card-pvp-${this.roomCode}-host`;

    try {
      this.peer = new Peer(peerId, {
        debug: 1,
        config: {
          iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'stun:stun1.l.google.com:19302' },
            { urls: 'stun:stun.cloudflare.com:3478' }
          ]
        }
      });

      this.peer.on('open', (id) => {
        this.emitStatus('waiting', {
          message: 'Phòng đã sẵn sàng! Chờ người chơi 2 tham gia...',
          peerId: id
        });
      });

      this.peer.on('connection', (conn) => {
        this.setupConnection(conn);
      });

      this.peer.on('error', (err) => {
        console.warn('Peer error (host):', err);
        // If ID taken, generate random suffix
        if (err.type === 'unavailable-id') {
          const fallbackCode = this.generateRoomCode();
          this.createRoom(fallbackCode, playerInfo);
        } else {
          this.emitStatus('error', { error: err.message || 'Lỗi kết nối mạng P2P' });
        }
      });

      this.peer.on('disconnected', () => {
        if (this.peer && !this.peer.destroyed) {
          this.peer.reconnect();
        }
      });
    } catch (e) {
      console.error('Failed to create host peer:', e);
      // Fallback to local broadcast channel
      this.emitStatus('waiting', {
        message: 'Đang kết nối qua kênh nội bộ BroadcastChannel...'
      });
    }

    return this.roomCode;
  }

  // Join an existing Room as Guest
  joinRoom(roomCode, playerInfo = null) {
    this.disconnect();
    this.role = 'guest';
    this.roomCode = roomCode.toUpperCase().trim();
    if (playerInfo) this.myInfo = { ...this.myInfo, ...playerInfo };

    this.emitStatus('connecting', { message: `Đang kết nối vào phòng ${this.roomCode}...` });
    this.setupBroadcastChannel(this.roomCode);

    const guestPeerId = `kids-card-pvp-${this.roomCode}-guest-${Math.random().toString(36).substring(2, 7)}`;
    const hostPeerId = `kids-card-pvp-${this.roomCode}-host`;

    try {
      this.peer = new Peer(guestPeerId, {
        debug: 1,
        config: {
          iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'stun:stun1.l.google.com:19302' },
            { urls: 'stun:stun.cloudflare.com:3478' }
          ]
        }
      });

      this.peer.on('open', () => {
        // Connect to host peer
        const conn = this.peer.connect(hostPeerId, {
          reliable: true
        });
        this.setupConnection(conn);

        // Also ping over broadcast channel
        this.send({
          type: 'GUEST_HELLO',
          playerInfo: this.myInfo
        });
      });

      this.peer.on('error', (err) => {
        console.warn('Peer error (guest):', err);
        // Even if WebRTC fails, BroadcastChannel might work locally
        this.emitStatus('connecting', {
          message: 'Đang thử kết nối nội bộ...'
        });
      });
    } catch (e) {
      console.error('Failed to create guest peer:', e);
    }
  }

  // Setup connection handlers
  setupConnection(conn) {
    this.connection = conn;

    conn.on('open', () => {
      this.emitStatus('connected', {
        message: 'Kết nối thành công!'
      });

      // Send introduction
      this.send({
        type: this.role === 'host' ? 'HOST_WELCOME' : 'GUEST_HELLO',
        playerInfo: this.myInfo
      });

      this.startHeartbeat();
    });

    conn.on('data', (data) => {
      this.handleIncomingRaw(data, 'webrtc');
    });

    conn.on('close', () => {
      this.emitStatus('disconnected', {
        message: 'Đối thủ đã ngắt kết nối hoặc rời phòng.'
      });
      this.stopHeartbeat();
    });

    conn.on('error', (err) => {
      console.warn('Connection error:', err);
    });
  }

  // Handle incoming raw payload from either WebRTC or BroadcastChannel
  handleIncomingRaw(data, transport) {
    if (!data || typeof data !== 'object') return;

    // Deduplication check
    if (data._msgId) {
      if (this.seenMessageIds.has(data._msgId)) return;
      this.seenMessageIds.add(data._msgId);
      if (this.seenMessageIds.size > 200) {
        const first = this.seenMessageIds.values().next().value;
        this.seenMessageIds.delete(first);
      }
    }

    // Ignore messages sent by self over BroadcastChannel
    if (data._senderId === this.myInfo.id) return;

    // Handle internal handshake messages
    if (data.type === 'HOST_WELCOME' || data.type === 'GUEST_HELLO' || data.type === 'PLAYER_INFO_UPDATE') {
      if (data.playerInfo) {
        this.opponentInfo = data.playerInfo;
      }
      this.emitStatus('connected', {
        opponentInfo: this.opponentInfo,
        message: `Đã kết nối với ${this.opponentInfo?.name || 'Đối thủ'}!`
      });

      // If Host receiving GUEST_HELLO over BroadcastChannel without WebRTC, acknowledge back
      if (this.role === 'host' && data.type === 'GUEST_HELLO') {
        this.send({
          type: 'HOST_WELCOME',
          playerInfo: this.myInfo
        });
      }
      return;
    }

    // Ping / Pong latency check
    if (data.type === 'PING') {
      this.send({
        type: 'PONG',
        origTime: data.timestamp
      });
      return;
    }

    if (data.type === 'PONG') {
      if (data.origTime) {
        this.latency = Math.max(1, Math.round((Date.now() - data.origTime) / 2));
        this.emitStatus(this.status);
      }
      return;
    }

    // Forward gameplay payload to game subscribers
    this.emitMessage(data);
  }

  // Send payload over WebRTC and BroadcastChannel
  send(payload) {
    const enriched = {
      ...payload,
      _msgId: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      _senderId: this.myInfo.id,
      _senderRole: this.role,
      _timestamp: Date.now()
    };

    // 1. Send via WebRTC DataChannel if open
    if (this.connection && this.connection.open) {
      try {
        this.connection.send(enriched);
      } catch (e) {
        console.warn('WebRTC send failed:', e);
      }
    }

    // 2. Also send via BroadcastChannel for dual-tab/local instant sync
    if (this.broadcastChannel) {
      try {
        this.broadcastChannel.postMessage(enriched);
      } catch (e) {
        console.warn('BroadcastChannel send failed:', e);
      }
    }
  }

  // Heartbeat ping
  startHeartbeat() {
    this.stopHeartbeat();
    this.pingInterval = setInterval(() => {
      this.send({
        type: 'PING',
        timestamp: Date.now()
      });
    }, 3000);
  }

  stopHeartbeat() {
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
      this.pingInterval = null;
    }
  }

  // Specific game actions helpers
  sendGameDeck(cards, config) {
    this.send({
      type: 'SYNC_GAME_DECK',
      cards,
      config,
      hostInfo: this.myInfo
    });
  }

  sendCardFlip(cardIndex) {
    this.send({
      type: 'CARD_FLIP',
      cardIndex,
      playerRole: this.role
    });
  }

  sendMatchResult({ firstIndex, secondIndex, isMatch, pairId, points, combo, nextTurn, matchedPairIds }) {
    this.send({
      type: 'MATCH_RESULT',
      firstIndex,
      secondIndex,
      isMatch,
      pairId,
      points,
      combo,
      nextTurn,
      matchedPairIds: Array.from(matchedPairIds || []),
      playerRole: this.role
    });
  }

  sendTurnChange(nextTurn, reason = 'timer') {
    this.send({
      type: 'TURN_CHANGE',
      nextTurn,
      reason
    });
  }

  sendEmote(emoji) {
    this.send({
      type: 'EMOTE',
      emoji,
      senderName: this.myInfo.name,
      senderAvatar: this.myInfo.avatar
    });
  }

  sendQuickChat(chatItem) {
    this.send({
      type: 'QUICK_CHAT',
      chatItem,
      senderName: this.myInfo.name,
      senderAvatar: this.myInfo.avatar
    });
  }

  sendRematchRequest() {
    this.send({
      type: 'REMATCH_REQUEST',
      senderName: this.myInfo.name
    });
  }

  sendRematchAccept(newCards, config) {
    this.send({
      type: 'REMATCH_ACCEPT',
      cards: newCards,
      config
    });
  }

  // Disconnect & cleanup
  disconnect() {
    this.stopHeartbeat();

    if (this.connection) {
      try { this.connection.close(); } catch (e) {}
      this.connection = null;
    }

    if (this.peer) {
      try { this.peer.destroy(); } catch (e) {}
      this.peer = null;
    }

    if (this.broadcastChannel) {
      try { this.broadcastChannel.close(); } catch (e) {}
      this.broadcastChannel = null;
    }

    this.role = null;
    this.roomCode = null;
    this.opponentInfo = null;
    this.latency = 0;
    this.seenMessageIds.clear();
    this.emitStatus('idle');
  }
}

export const realtimeGameService = new RealtimeGameEngine();
