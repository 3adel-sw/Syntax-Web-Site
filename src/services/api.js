// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

// ============================================================
// Retry interceptor: handle 429 (rate limit) with exponential backoff
// Backend limit per content-index.json: 60 req/min per IP
// React StrictMode double-invokes effects in dev → 2x the calls
// LayoutSyntax also opens an SSE stream → 1 extra call
// Without this, navigating between pages in dev can blow the limit.
// ============================================================
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;
    if (!config) return Promise.reject(error);

    // Only retry on 429 (rate limit) and network errors
    const isRateLimit = error.response?.status === 429;
    const isNetwork = !error.response;
    if (!isRateLimit && !isNetwork) return Promise.reject(error);

    config.__retryCount = config.__retryCount || 0;
    const maxRetries = 3;
    if (config.__retryCount >= maxRetries) return Promise.reject(error);

    // Honor Retry-After header if backend sends it
    const retryAfterHeader = error.response?.headers?.['retry-after'];
    let delayMs;
    if (retryAfterHeader) {
      const seconds = parseInt(retryAfterHeader, 10);
      delayMs = Number.isFinite(seconds) ? seconds * 1000 : 2000;
    } else {
      // Exponential backoff: 1s, 2s, 4s
      delayMs = Math.min(1000 * 2 ** config.__retryCount, 8000);
    }

    config.__retryCount += 1;
    await new Promise((resolve) => setTimeout(resolve, delayMs));
    return api.request(config);
  },
);

export default api;