const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

export async function fetchKidsProgress() {
  try {
    const res = await fetch(`${API_BASE}/api/kids/progress`);
    if (!res.ok) throw new Error('API server unreachable');
    const data = await res.json();
    return data.progress;
  } catch (err) {
    console.warn('Backend API offline, using local storage fallback:', err.message);
    const saved = localStorage.getItem('kids_custom_progress_v1');
    if (saved) return JSON.parse(saved);
    return null;
  }
}

export async function saveKidsProgress(progressData) {
  try {
    localStorage.setItem('kids_custom_progress_v1', JSON.stringify(progressData));
    const res = await fetch(`${API_BASE}/api/kids/progress`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(progressData),
    });
    if (!res.ok) throw new Error('Failed to persist progress on server');
    return await res.json();
  } catch (err) {
    console.warn('Saved progress locally:', err.message);
    return { success: true, localOnly: true };
  }
}

