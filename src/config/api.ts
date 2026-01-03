/**
 * Backend API Configuration
 * 
 * Update BACKEND_URL to point to your local backend server:
 * - Android Emulator: use http://10.0.2.2:3000
 * - iOS Simulator: use http://localhost:3000
 * - Physical Device: use your computer's local IP (e.g., http://192.168.1.100:3000)
 * - Web: use http://localhost:3000
 */

// Change this URL based on your environment
export const BACKEND_URL = 'http://localhost:3000';

// For different environments, use these:
// Android Emulator: 'http://10.0.2.2:3000'
// iOS Simulator: 'http://localhost:3000'
// Physical Device: 'http://YOUR_LOCAL_IP:3000'

export const API_ENDPOINTS = {
  investments: `${BACKEND_URL}/api/investments`,
  health: `${BACKEND_URL}/api/health`,
};
