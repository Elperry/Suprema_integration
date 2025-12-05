import axios from 'axios';
import { API_CONFIG, API_ENDPOINTS } from '../config/constants';

const api = axios.create({
  baseURL: API_CONFIG.API_BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Longer timeout for sync operations
const syncApi = axios.create({
  baseURL: API_CONFIG.API_BASE_URL,
  timeout: 120000, // 2 minutes for sync operations
  headers: {
    'Content-Type': 'application/json',
  },
});

// Health check
export const checkHealth = () => axios.get(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.HEALTH}`);

// ==================== DEVICE ENDPOINTS ====================

export const deviceAPI = {
  // Search & CRUD
  search: (timeout = 5) => api.get(`/devices/search?timeout=${timeout}`),
  getAll: (params = {}) => api.get('/devices', { params }),
  getById: (deviceId) => api.get(`/devices/${deviceId}`),
  create: (deviceData) => api.post('/devices', deviceData),
  update: (deviceId, updates) => api.put(`/devices/${deviceId}`, updates),
  delete: (deviceId) => api.delete(`/devices/${deviceId}`),
  
  // Connection
  connect: (deviceId) => api.post(`/devices/${deviceId}/connect`),
  disconnect: (deviceId) => api.post(`/devices/${deviceId}/disconnect`),
  test: (deviceId) => api.get(`/devices/${deviceId}/test`),
  
  // Info
  getInfo: (deviceId) => api.get(`/devices/${deviceId}/info`),
  getCapabilities: (deviceId) => api.get(`/devices/${deviceId}/capabilities`),
  getStatistics: () => api.get('/devices/statistics'),
  
  // Sync
  sync: () => api.post('/devices/sync'),
  reconnect: () => api.post('/devices/reconnect'),
};

// ==================== USER ENDPOINTS ====================

export const userAPI = {
  // User operations
  getUsers: (deviceId, detailed = false) => api.get(`/users/${deviceId}?detailed=${detailed}`),
  getUserById: (deviceId, userId) => api.get(`/users/${deviceId}/user/${userId}`),
  enroll: (deviceId, users) => api.post(`/users/${deviceId}`, { users }),
  enrollMulti: (deviceIds, users) => api.post('/users/enroll-multi', { deviceIds, users }),
  update: (deviceId, userId, userInfo) => api.put(`/users/${deviceId}/${userId}`, { userInfo }),
  updateMulti: (deviceIds, users) => api.put('/users/update-multi', { deviceIds, users }),
  delete: (deviceId, userIds) => api.delete(`/users/${deviceId}`, { data: { userIds } }),
  deleteMulti: (deviceIds, userIds) => api.delete('/users/delete-multi', { data: { deviceIds, userIds } }),
  
  // Biometric credentials
  setFingerprints: (deviceId, userFingerData) => api.post(`/users/${deviceId}/fingerprints`, { userFingerData }),
  setCards: (deviceId, userCardData) => api.post(`/users/${deviceId}/cards`, { userCardData }),
  getUserCards: (deviceId, userId) => api.get(`/users/${deviceId}/cards/${userId}`),
  updateUserCard: (deviceId, userId, cardData, cardIndex = 0) => 
    api.put(`/users/${deviceId}/cards/${userId}`, { cardData, cardIndex }),
  deleteUserCard: (deviceId, userId, cardIndex = 0) => 
    api.delete(`/users/${deviceId}/cards/${userId}?cardIndex=${cardIndex}`),
  setFaces: (deviceId, userFaceData) => api.post(`/users/${deviceId}/faces`, { userFaceData }),
  
  // Access groups
  getAccessGroups: (deviceId, userIds) => api.get(`/users/${deviceId}/access-groups?userIds=${userIds.join(',')}`),
  setAccessGroups: (deviceId, userAccessGroups) => api.post(`/users/${deviceId}/access-groups`, { userAccessGroups }),
  
  // Sync
  sync: (deviceId) => api.post(`/users/${deviceId}/sync`),
  syncAll: () => api.post('/users/sync-all'),
  
  // Statistics
  getStatistics: (deviceId) => api.get(`/users/${deviceId}/statistics`),
  
  // Blacklist
  manageBlacklist: (deviceId, action, cardInfos) => 
    api.post(`/users/${deviceId}/cards/blacklist`, { action, cardInfos }),
};

// ==================== CARD ENDPOINTS ====================

export const cardAPI = {
  // Scanning
  scan: (deviceId, format, threshold) => api.post('/cards/scan', { deviceId, format, threshold }),
  verify: (deviceId, cardData) => api.post('/cards/verify', { deviceId, cardData }),
  
  // Blacklist
  getBlacklist: (deviceId) => api.get(`/cards/blacklist/${deviceId}`),
  addToBlacklist: (deviceId, cardInfos) => api.post(`/cards/blacklist/${deviceId}`, { cardInfos }),
  removeFromBlacklist: (deviceId, cardInfos) => api.delete(`/cards/blacklist/${deviceId}`, { data: { cardInfos } }),
  
  // Configuration
  getConfig: (deviceId) => api.get(`/cards/config/${deviceId}`),
  setConfig: (deviceId, config) => api.put(`/cards/config/${deviceId}`, { config }),
  getQRConfig: (deviceId) => api.get(`/cards/qr-config/${deviceId}`),
  setQRConfig: (deviceId, qrConfig) => api.put(`/cards/qr-config/${deviceId}`, { qrConfig }),
  
  // Statistics
  getStatistics: (deviceId) => api.get(`/cards/statistics/${deviceId}`),
};

// ==================== EVENT ENDPOINTS ====================

export const eventAPI = {
  // Subscription
  subscribe: (deviceId, queueSize = 100) => api.post('/events/subscribe', { deviceId, queueSize }),
  unsubscribe: (deviceId) => api.post('/events/unsubscribe', { deviceId }),
  subscribeStream: (queueSize = 100) => api.post('/events/stream/subscribe', { queueSize }),
  
  // Logs
  getLogs: (deviceId, params = {}) => api.get('/events/logs', { params: { deviceId, ...params } }),
  getById: (eventId, deviceId) => api.get(`/events/${eventId}?deviceId=${deviceId}`),
  exportLogs: (params) => api.get('/events/export', { params, responseType: 'blob' }),
  
  // Device logs
  getDeviceLog: (deviceId, startEventId = 0, maxNumOfLog = 1000) => 
    api.get(`/events/device-log/${deviceId}?startEventId=${startEventId}&maxNumOfLog=${maxNumOfLog}`),
  getFilteredLog: (deviceId, filters = {}) => 
    api.post(`/events/device-log/${deviceId}/filtered`, { 
      startEventId: filters.startEventId || 0, 
      maxNumOfLog: filters.maxNumOfLog || 1000, 
      filter: filters 
    }),
  getImageLog: (deviceId, startEventId = 0, maxNumOfLog = 100) => 
    api.get(`/events/image-log/${deviceId}?startEventId=${startEventId}&maxNumOfLog=${maxNumOfLog}`),
  
  // Historical events with pagination
  getHistorical: (deviceId, params = {}) => {
    const query = new URLSearchParams();
    if (params.page) query.append('page', params.page);
    if (params.pageSize) query.append('pageSize', params.pageSize);
    if (params.eventType) query.append('eventType', params.eventType);
    if (params.userId) query.append('userId', params.userId);
    if (params.doorId) query.append('doorId', params.doorId);
    if (params.startDate) query.append('startDate', params.startDate);
    if (params.endDate) query.append('endDate', params.endDate);
    if (params.eventCodes) query.append('eventCodes', params.eventCodes);
    return api.get(`/events/historical/${deviceId}?${query.toString()}`);
  },
  
  // Specific event types
  getAuthenticationEvents: (deviceId, params = {}) => 
    api.get(`/events/authentication/${deviceId}`, { params }),
  getDoorEvents: (deviceId, params = {}) => 
    api.get(`/events/door/${deviceId}`, { params }),
  getUserEvents: (deviceId, userId, maxEvents = 500) => 
    api.get(`/events/user/${deviceId}/${userId}?maxEvents=${maxEvents}`),
  
  // Advanced search
  search: (deviceId, filters = {}, pagination = {}) => 
    api.post(`/events/search/${deviceId}`, { 
      filters, 
      page: pagination.page || 1, 
      pageSize: pagination.pageSize || 50,
      maxEvents: pagination.maxEvents || 1000
    }),
  
  // Monitoring
  enableMonitoring: (deviceId) => api.post(`/events/monitoring/${deviceId}/enable`),
  disableMonitoring: (deviceId) => api.post(`/events/monitoring/${deviceId}/disable`),
  enableMonitoringMulti: (deviceIds) => api.post('/events/monitoring/enable-multi', { deviceIds }),
  
  // Sync - use longer timeout
  sync: (deviceId, fromEventId, batchSize = 1000) => 
    syncApi.post(`/events/sync/${deviceId}`, { fromEventId, batchSize }),
  syncAll: (batchSize = 1000) => syncApi.post('/events/sync-all', { batchSize }),
  syncAllToDB: (batchSize = 500) => syncApi.post('/events/sync-all-to-db', { batchSize }),
  getSyncStatus: (deviceId) => api.get(`/events/sync-status/${deviceId}`),
  
  // Database events (synced events)
  getFromDB: (params = {}) => {
    const query = new URLSearchParams();
    if (params.page) query.append('page', params.page);
    if (params.pageSize) query.append('pageSize', params.pageSize);
    if (params.deviceId) query.append('deviceId', params.deviceId);
    if (params.eventType) query.append('eventType', params.eventType);
    if (params.userId) query.append('userId', params.userId);
    if (params.authResult) query.append('authResult', params.authResult);
    if (params.doorId) query.append('doorId', params.doorId);
    if (params.startDate) query.append('startDate', params.startDate);
    if (params.endDate) query.append('endDate', params.endDate);
    return api.get(`/events/db?${query.toString()}`);
  },
  
  // Statistics
  getStatistics: (deviceId, params = {}) => api.get('/events/statistics', { params: { deviceId, ...params } }),
  getCount: (deviceId) => api.get(`/events/count?deviceId=${deviceId}`),
  getCodes: () => api.get('/events/codes'),
};

// ==================== GATE EVENT ENDPOINTS ====================

export const gateEventAPI = {
  getAll: (params) => api.get('/gate-events', { params }),
  create: (eventData) => api.post('/gate-events', eventData),
  getByEmployee: (employeeId, limit = 50) => 
    api.get(`/gate-events/employee/${employeeId}?limit=${limit}`),
  getStats: (params) => api.get('/gate-events/stats', { params }),
};

// ==================== EMPLOYEE ENDPOINTS ====================

export const employeeAPI = {
  getAll: (params) => api.get('/employees', { params }),
  getById: (id) => api.get(`/employees/${id}`),
  search: (searchTerm) => api.get(`/employees/search/${searchTerm}`),
  getCardInfo: (id) => api.get(`/employees/${id}/card`),
};

// ==================== DOOR ENDPOINTS ====================

export const doorAPI = {
  getAll: (deviceId) => api.get(`/doors/${deviceId}`),
  control: (deviceId, doorId, action, duration) => 
    api.post(`/doors/${deviceId}/control`, { doorId, action, duration }),
  getStatus: (deviceId, doorId) => api.get(`/doors/${deviceId}/status/${doorId}`),
};

// ==================== TNA ENDPOINTS ====================

export const tnaAPI = {
  getLogs: (params) => api.get('/tna/logs', { params }),
  getSummary: (params) => api.get('/tna/summary', { params }),
  process: (deviceId, eventIds) => api.post('/tna/process', { deviceId, eventIds }),
};

// ==================== BIOMETRIC ENDPOINTS ====================

export const biometricAPI = {
  scanFingerprint: (deviceId) => api.post(`/biometric/${deviceId}/scan/fingerprint`),
  scanFace: (deviceId) => api.post(`/biometric/${deviceId}/scan/face`),
  getConfig: (deviceId) => api.get(`/biometric/${deviceId}/config`),
  setConfig: (deviceId, config) => api.put(`/biometric/${deviceId}/config`, { config }),
};

// ==================== HR ENDPOINTS ====================

export const hrAPI = {
  getWebhooks: () => api.get('/hr/webhooks'),
  triggerSync: () => api.post('/hr/sync'),
  getSyncStatus: () => api.get('/hr/sync/status'),
};

// ==================== ENROLLMENT ENDPOINTS ====================

export const enrollmentAPI = {
  // Card scanning
  scanCard: (deviceId, timeout = 10) => 
    api.post('/enrollment/scan', { deviceId, timeout }),

  // Card assignments
  getCardAssignments: (params = {}) => 
    api.get('/enrollment/cards', { params }),
  getCardAssignment: (id) => 
    api.get(`/enrollment/cards/${id}`),
  assignCard: (data) => 
    api.post('/enrollment/cards', data),
  revokeCard: (id, reason = '') => 
    api.delete(`/enrollment/cards/${id}`, { data: { reason } }),
  updateCardStatus: (id, status) => 
    api.patch(`/enrollment/cards/${id}/status`, { status }),

  // Device enrollment
  enrollOnDevice: (deviceId, assignmentId) => 
    api.post('/enrollment/enroll', { deviceId, assignmentId }),
  enrollOnMultipleDevices: (deviceIds, assignmentId) => 
    api.post('/enrollment/enroll-multi', { deviceIds, assignmentId }),
  removeFromDevice: (deviceId, assignmentId) => 
    api.delete(`/enrollment/devices/${deviceId}/assignments/${assignmentId}`),
  getDeviceEnrollments: (deviceId) => 
    api.get(`/enrollment/devices/${deviceId}/enrollments`),
  getCardEnrollments: (assignmentId) => 
    api.get(`/enrollment/cards/${assignmentId}/enrollments`),

  // Sync operations
  syncToDevice: (deviceId) => 
    api.post(`/enrollment/devices/${deviceId}/sync`),
  syncCardToDevices: (assignmentId) => 
    api.post(`/enrollment/cards/${assignmentId}/sync`),

  // Employee queries
  searchEmployees: (query, limit = 20) => 
    api.get('/enrollment/employees/search', { params: { q: query, limit } }),
  getEmployeesWithStatus: (params = {}) => 
    api.get('/enrollment/employees', { params }),

  // Quick enrollment (one step)
  quickEnroll: (data) => 
    api.post('/enrollment/quick', data),

  // Statistics
  getStatistics: () => 
    api.get('/enrollment/statistics'),
};

// ==================== LOCATION ENDPOINTS ====================

export const locationAPI = {
  // Tree structure
  getTree: () => api.get('/locations/tree'),
  
  // CRUD
  getAll: () => api.get('/locations'),
  getById: (locationId) => api.get(`/locations/${locationId}`),
  create: (locationData) => api.post('/locations', locationData),
  update: (locationId, updates) => api.put(`/locations/${locationId}`, updates),
  delete: (locationId) => api.delete(`/locations/${locationId}`),
  
  // Device assignment
  assignDevice: (locationId, deviceId, direction = 'in') => 
    api.post(`/locations/${locationId}/devices`, { deviceId, direction }),
  removeDevice: (locationId, deviceId) => 
    api.delete(`/locations/${locationId}/devices/${deviceId}`),
  updateDeviceDirection: (deviceId, direction) => 
    api.patch(`/locations/devices/${deviceId}/direction`, { direction }),
};

export default api;
