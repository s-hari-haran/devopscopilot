// Use the Codespaces forwarded port URL or localhost
const getApiBase = () => {
  if (typeof window === 'undefined') return 'http://localhost:3001/api';
  
  if (window.location.hostname.includes('github.dev')) {
    // In Codespaces: replace port 3000 with 3001 in hostname
    const apiHost = window.location.hostname.replace('-3000.app', '-3001.app');
    return `https://${apiHost}/api`;
  }
  return 'http://localhost:3001/api';
};

export const API_BASE = getApiBase();

export const api = {
  async post(endpoint, data) {
    try {
      const url = `${API_BASE}${endpoint}`;
      console.log('POST to:', url, 'Data:', data);
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Request failed');
      }
      return response.json();
    } catch (error) {
      console.error('API POST error:', error);
      throw error;
    }
  },

  async get(endpoint) {
    try {
      const url = `${API_BASE}${endpoint}`;
      console.log('GET from:', url);
      const response = await fetch(url);
      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Request failed' }));
        throw new Error(error.error || 'Request failed');
      }
      return response.json();
    } catch (error) {
      console.error('API GET error:', error);
      throw error;
    }
  },
};
