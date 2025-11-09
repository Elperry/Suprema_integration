/**
 * Global Constants Configuration
 * Central location for all application-wide constants
 */

// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  API_BASE_URL: (import.meta.env.VITE_API_URL || 'http://localhost:3000') + '/api',
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second
};

// Endpoints
export const API_ENDPOINTS = {
  // Health
  HEALTH: '/health',
  
  // Devices
  DEVICES: '/api/devices',
  DEVICE_SEARCH: '/api/devices/search',
  DEVICE_CONNECT: (id) => `/api/devices/${id}/connect`,
  DEVICE_DISCONNECT: (id) => `/api/devices/${id}/disconnect`,
  DEVICE_INFO: (id) => `/api/devices/${id}/info`,
  DEVICE_CAPABILITIES: (id) => `/api/devices/${id}/capabilities`,
  DEVICE_SYNC: (id) => `/api/devices/${id}/sync`,
  
  // Users
  USERS: '/api/users',
  USER_ENROLL: '/api/users/enroll',
  USER_SYNC: '/api/users/sync',
  
  // Events
  EVENTS: '/api/events',
  EVENT_LOGS: '/api/events/logs',
  EVENT_MONITORING: '/api/events/monitoring',
  EVENT_SYNC: '/api/events/sync',
  
  // Cards
  CARDS: '/api/cards',
  CARD_SCAN: '/api/cards/scan',
  CARD_BLACKLIST: '/api/cards/blacklist',
  
  // Gate Events
  GATE_EVENTS: '/api/gate-events',
  
  // Employees
  EMPLOYEES: '/api/employees',
};

// UI Constants
export const UI_CONFIG = {
  // Pagination
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
  
  // Refresh intervals (milliseconds)
  DASHBOARD_REFRESH_INTERVAL: 30000, // 30 seconds
  EVENTS_REFRESH_INTERVAL: 10000,    // 10 seconds
  
  // Limits
  MAX_EVENTS_DISPLAY: 100,
  MAX_DEVICES_DISPLAY: 50,
  
  // Timeouts
  NOTIFICATION_DURATION: 5000, // 5 seconds
  LOADING_TIMEOUT: 30000,      // 30 seconds
};

// Device Status
export const DEVICE_STATUS = {
  CONNECTED: 'connected',
  DISCONNECTED: 'disconnected',
  CONNECTING: 'connecting',
  ERROR: 'error',
};

// Event Types
export const EVENT_TYPES = {
  AUTH_SUCCESS: 'auth:success',
  AUTH_FAILURE: 'auth:failure',
  DOOR_OPEN: 'door:open',
  DOOR_CLOSE: 'door:close',
};

// Response Status
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'suprema_auth_token',
  USER_PREFERENCES: 'suprema_user_preferences',
  SELECTED_DEVICE: 'suprema_selected_device',
};

// Feature Flags
export const FEATURES = {
  ENABLE_BIOMETRIC: true,
  ENABLE_CARD_SCAN: true,
  ENABLE_REAL_TIME_EVENTS: true,
  ENABLE_SYNC: true,
};

export default {
  API_CONFIG,
  API_ENDPOINTS,
  UI_CONFIG,
  DEVICE_STATUS,
  EVENT_TYPES,
  HTTP_STATUS,
  STORAGE_KEYS,
  FEATURES,
};
