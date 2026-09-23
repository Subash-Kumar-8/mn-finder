/**
 * Central API Configuration and Service Abstraction
 * Currently operates in DEMO mode returning mock data.
 * Ready to connect to Node.js / Express backend REST endpoints.
 */

export const API_CONFIG = {
  BASE_URL: import.meta.env?.VITE_API_BASE_URL || 'http://localhost:5000/api',
  USE_MOCK: true, // Toggle when backend Express server is live
  TIMEOUT_MS: 5000
};

/**
 * JSDoc helper for simulated async delay to feel like real backend response
 * @param {number} ms 
 * @returns {Promise<void>}
 */
export function simulateNetworkDelay(ms = 400) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
