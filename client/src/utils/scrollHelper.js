/**
 * Global Scroll Helper for Kids English Agent
 * Ensures smooth, instant, and reliable scrolling to top across all devices & browsers
 * (iOS Safari, Android Chrome, Windows/macOS Edge/Firefox/Chrome).
 */

export function scrollToTop(smooth = true, targetElement = null) {
  if (typeof window === 'undefined') return;

  const behavior = smooth ? 'smooth' : 'auto';

  // 1. Primary window scroll
  try {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior,
    });
  } catch (err) {
    try {
      window.scrollTo(0, 0);
    } catch (e) {
      // Ignore
    }
  }

  // 2. Element/body fallback
  if (typeof document !== 'undefined') {
    if (document.documentElement && document.documentElement.scrollTop > 0) {
      document.documentElement.scrollTop = 0;
    }
    if (document.body && document.body.scrollTop > 0) {
      document.body.scrollTop = 0;
    }
  }

  // 3. Scroll specific modal or sub-container if provided
  if (targetElement && typeof targetElement.scrollTo === 'function') {
    try {
      targetElement.scrollTo({ top: 0, left: 0, behavior });
    } catch (err) {
      targetElement.scrollTop = 0;
    }
  } else if (targetElement && 'scrollTop' in targetElement) {
    targetElement.scrollTop = 0;
  }

  // 4. Double-check on next animation frame in case React re-render shifts DOM height
  if (typeof requestAnimationFrame !== 'undefined') {
    requestAnimationFrame(() => {
      try {
        window.scrollTo({ top: 0, left: 0, behavior });
      } catch (err) {
        window.scrollTo(0, 0);
      }
      if (document.documentElement) document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
      if (targetElement) {
        try {
          targetElement.scrollTo({ top: 0, left: 0, behavior });
        } catch (e) {
          targetElement.scrollTop = 0;
        }
      }
    });
  }
}

/**
 * Cuộn mượt đến ngay đầu phần thẻ từ vựng (thay vì cuộn hết lên đỉnh trang y=0)
 * khi bé hoặc phụ huynh chuyển trang (bấm "Trang Sau", "Trang Trước" hoặc chọn số trang).
 */
export function scrollToVocabCards(target = 'vocab-cards-top', offset = 85, smooth = true) {
  if (typeof window === 'undefined') return;

  const behavior = smooth ? 'smooth' : 'auto';
  let el = null;

  if (target && typeof target === 'object' && 'current' in target) {
    el = target.current;
  } else if (typeof target === 'string') {
    el = document.getElementById(target);
  } else if (target && target.nodeType) {
    el = target;
  }

  // Fallback nếu không truyền target cụ thể
  if (!el && typeof document !== 'undefined') {
    el = document.getElementById('vocab-cards-top') ||
         document.getElementById('vocab-cards-section') ||
         document.querySelector('.card-flip-perspective') ||
         document.getElementById('vocabulary-container');
  }

  if (el) {
    try {
      const rect = el.getBoundingClientRect();
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;
      const targetY = Math.max(0, rect.top + currentScrollTop - offset);

      window.scrollTo({
        top: targetY,
        left: 0,
        behavior
      });

      // Kiểm tra lại ở requestAnimationFrame để phòng trường hợp DOM re-render thay đổi chiều cao
      if (typeof requestAnimationFrame !== 'undefined') {
        requestAnimationFrame(() => {
          const updatedRect = el.getBoundingClientRect();
          const updatedScrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;
          const updatedY = Math.max(0, updatedRect.top + updatedScrollTop - offset);
          if (Math.abs(updatedScrollTop - updatedY) > 30) {
            window.scrollTo({ top: updatedY, left: 0, behavior: 'auto' });
          }
        });
      }
      return;
    } catch (e) {
      try {
        el.scrollIntoView({ behavior, block: 'start' });
        return;
      } catch (err) {
        // Fallback
      }
    }
  }

  // Fallback an toàn: nếu không tìm thấy thẻ, cuộn nhẹ lên đỉnh
  scrollToTop(smooth);
}

