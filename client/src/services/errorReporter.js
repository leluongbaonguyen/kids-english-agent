// Real-time Telemetry & Global Error Reporter for V7.0 Smart Error Center
class ErrorReporter {
  constructor() {
    this.initialized = false;
    this.listeners = [];
  }

  subscribe(callback) {
    if (typeof callback === 'function') {
      this.listeners.push(callback);
    }
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
    };
  }

  notifyListeners(errorData) {
    this.listeners.forEach(cb => {
      try {
        cb(errorData);
      } catch (e) {
        console.warn('Error listener dispatch failed:', e);
      }
    });
  }

  init() {
    if (this.initialized || typeof window === 'undefined') return;
    this.initialized = true;

    // Global Window Error Handler
    window.onerror = (message, source, lineno, colno, error) => {
      const payload = {
        code: 'CLIENT_RUNTIME_ERROR',
        message: String(message),
        source: 'frontend',
        file: source || 'window.onerror',
        line: lineno || 1,
        severity: 'P1_CRITICAL',
        stack: error?.stack || '',
        timestamp: new Date().toLocaleTimeString()
      };
      this.notifyListeners(payload);
      this.reportError(payload);
    };

    // Global Unhandled Promise Rejection Handler
    window.onunhandledrejection = (event) => {
      const payload = {
        code: 'UNHANDLED_PROMISE_REJECTION',
        message: String(event.reason?.message || event.reason || 'Unhandled Promise Rejection'),
        source: 'frontend',
        file: 'async/promise',
        line: 1,
        severity: 'P2_HIGH',
        stack: event.reason?.stack || '',
        timestamp: new Date().toLocaleTimeString()
      };
      this.notifyListeners(payload);
      this.reportError(payload);
    };
  }

  async reportError(errorPayload) {
    try {
      await fetch('/api/v1/telemetry/errors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(errorPayload)
      });
    } catch (err) {
      console.warn('Failed to send error telemetry:', err);
    }
  }

  // Manual Trigger for UI Errors
  triggerAlert(message, code = 'SYSTEM_ALERT', severity = 'P1_CRITICAL') {
    const payload = {
      code,
      message,
      source: 'system',
      file: 'UI Runtime',
      line: 1,
      severity,
      timestamp: new Date().toLocaleTimeString()
    };
    this.notifyListeners(payload);
    this.reportError(payload);
  }
}

export const errorReporter = new ErrorReporter();
