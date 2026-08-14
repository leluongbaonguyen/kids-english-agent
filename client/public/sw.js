/**
 * SERVICE WORKER FOR NATIVE iOS PWA & WEB PUSH NOTIFICATIONS
 * Supports offline caching & scheduled study alerts for Kids English V3
 */

const CACHE_NAME = 'kids-english-v3-cache-v1';

// Service Worker Install
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

// Service Worker Activate
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Native Push Notification Listener
self.addEventListener('push', (event) => {
  let data = { title: '🦄 Lumi Nhắc Học Tiếng Anh', body: 'Đã đến 15 phút học từ vựng hôm nay rồi bé ơi!' };
  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data.body = event.data.text();
    }
  }

  const options = {
    body: data.body,
    icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🦄</text></svg>',
    badge: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>⭐</text></svg>',
    vibrate: [200, 100, 200, 100, 200],
    tag: 'kids-english-study-reminder',
    renotify: true,
    data: { url: '/' },
    actions: [
      { action: 'open', title: '🚀 Vào Học Ngay' },
      { action: 'close', title: 'Đóng' }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Notification Click Handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  if (event.action === 'open' || !event.action) {
    event.waitUntil(
      self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
        if (clientList.length > 0) {
          return clientList[0].focus();
        }
        return self.clients.openWindow('/');
      })
    );
  }
});
