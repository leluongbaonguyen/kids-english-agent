/**
 * NATIVE IOS & WEB PUSH NOTIFICATION SERVICE (V3.0)
 * Triggers native system notifications on iOS, Android, and Desktop
 */

export const NativePushService = {
  /**
   * Đăng ký Service Worker
   */
  async registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log('ServiceWorker registered with scope:', registration.scope);
        return registration;
      } catch (err) {
        console.warn('ServiceWorker registration failed:', err);
      }
    }
    return null;
  },

  /**
   * Xin quyền gửi thông báo Native thiết bị
   */
  async requestNotificationPermission() {
    if (!('Notification' in window)) {
      return { granted: false, reason: 'unsupported' };
    }

    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        // Gửi thông báo mẫu thử nghiệm ngay
        this.sendLocalNotification(
          '🎉 Đã Bật Thông Báo Nhắc Học Tiếng Anh!',
          'Hệ thống sẽ tự động gửi thông báo hàng ngày để bé giữ chuỗi học tập ⭐'
        );
        return { granted: true };
      }
      return { granted: false, reason: permission };
    } catch (e) {
      console.warn('Error requesting notification permission:', e);
      return { granted: false, reason: 'error' };
    }
  },

  /**
   * Gửi thông báo Native thiết bị lập tức
   */
  sendLocalNotification(title, body) {
    if (!('Notification' in window) || Notification.permission !== 'granted') {
      return false;
    }

    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.ready.then((reg) => {
        reg.showNotification(title, {
          body,
          icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🦄</text></svg>',
          vibrate: [200, 100, 200],
          tag: 'kids-english-direct-alert',
          renotify: true
        });
      });
    } else {
      new Notification(title, {
        body,
        icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🦄</text></svg>'
      });
    }
    return true;
  },

  /**
   * Tự động lên lịch gửi thông báo định kỳ (Daily Scheduled Alerts)
   */
  scheduleDailyReminders() {
    // Tự động kiểm tra mỗi 1 giờ
    setInterval(() => {
      const now = new Date();
      const currentHour = now.getHours();
      // Nhắc học vào 9:00 sáng hoặc 19:00 tối
      if (currentHour === 9 || currentHour === 19) {
        this.sendLocalNotification(
          '⏰ Giờ Học Tiếng Anh Của Bé Minh Anh!',
          'Cùng Lumi vào ôn 5 từ vựng và làm Today Plan 15 phút ngay bé ơi! 🦄'
        );
      }
    }, 3600000);
  }
};
