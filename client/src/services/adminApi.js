// V7.0 Admin Operations & Intelligence API Service

export const adminApi = {
  // 1. Telemetry & Smart Error Center (A24)
  async getErrorGroups() {
    const res = await fetch('/api/v1/admin/errors');
    if (!res.ok) throw new Error('Failed to fetch error groups');
    return res.json();
  },

  async updateErrorGroup(groupId, updates) {
    const res = await fetch(`/api/v1/admin/errors/${groupId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    if (!res.ok) throw new Error('Failed to update error group');
    return res.json();
  },

  // 2. Live Code Studio (A25)
  async getCodeTree() {
    const res = await fetch('/api/v1/admin/code/tree');
    if (!res.ok) throw new Error('Failed to fetch code allowlist tree');
    return res.json();
  },

  async getWorkspaces() {
    const res = await fetch('/api/v1/admin/code/workspaces');
    if (!res.ok) throw new Error('Failed to fetch code workspaces');
    return res.json();
  },

  async createWorkspace(data) {
    const res = await fetch('/api/v1/admin/code/workspaces', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to create code workspace');
    return res.json();
  },

  // 3. Release & Rollback (A27)
  async getReleases() {
    const res = await fetch('/api/v1/admin/releases');
    if (!res.ok) throw new Error('Failed to fetch releases');
    return res.json();
  },

  async rollbackRelease(releaseId) {
    const res = await fetch(`/api/v1/admin/releases/${releaseId}/rollback`, {
      method: 'POST'
    });
    if (!res.ok) throw new Error('Failed to rollback release');
    return res.json();
  },

  // 4. Feature Flags (A22)
  async getFeatureFlags() {
    const res = await fetch('/api/v1/admin/feature-flags');
    if (!res.ok) throw new Error('Failed to fetch feature flags');
    return res.json();
  },

  async updateFeatureFlag(key, updates) {
    const res = await fetch(`/api/v1/admin/feature-flags/${key}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    if (!res.ok) throw new Error('Failed to update feature flag');
    return res.json();
  },

  // 5. Data Quality (A16)
  async getDataQuality() {
    const res = await fetch('/api/v1/admin/data-quality');
    if (!res.ok) throw new Error('Failed to fetch data quality metrics');
    return res.json();
  }
};
