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
