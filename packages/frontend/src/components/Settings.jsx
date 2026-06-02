import { useState, useEffect, useCallback } from 'react';
import { eventAPI, userAPI, deviceAPI, healthAPI, settingsAPI } from '../services/api';
import { useNotification } from './Notifications';
import { deriveHealthSummary } from '../utils/healthStatus';
import './Settings.css';

const defaultSyncSettings = {
  version: 1,
  deviceImport: { enabled: false, intervalMs: 30000 },
  dbToDevice: { enabled: false, intervalMs: 300000 },
  eventReplication: {
    enabled: true,
    intervalMs: 60000,
    batchSize: 1000,
    maxBatches: 50,
    enableRealtime: false,
    realtimeQueueSize: 100,
  },
  cloudSync: { enabled: false, trigger: 'disabled', intervalMs: 300000 },
  deviceTime: { enabled: true, useSystemTimezone: false, timezoneOffsetSeconds: 0 },
};

const defaultConnectionSettings = {
  apiBaseUrl: 'http://localhost:3000',
  timeout: 30000,
  retryAttempts: 3,
  retryDelay: 1000,
};

function secondsToMs(seconds) {
  return Math.max(1, Number.parseInt(seconds, 10) || 1) * 1000;
}

function msToSeconds(ms) {
  return Math.round((Number(ms) || 0) / 1000);
}

function extractResponseData(response) {
  return response?.data?.data ?? response?.data ?? response;
}

export default function Settings() {
  const { showNotification } = useNotification();
  const [activeTab, setActiveTab] = useState('general');
  const [loading, setLoading] = useState(false);
  const [settingsLoading, setSettingsLoading] = useState(false);
  const [healthData, setHealthData] = useState(null);
  const [syncSettings, setSyncSettings] = useState(defaultSyncSettings);
  const [runtimeStatus, setRuntimeStatus] = useState(null);
  const [connectionSettings, setConnectionSettings] = useState(defaultConnectionSettings);
  const [syncStatus, setSyncStatus] = useState({
    events: { lastSync: null, status: 'idle', count: 0 },
    users: { lastSync: null, status: 'idle', count: 0 },
    devices: { lastSync: null, status: 'idle', count: 0 },
  });

  const fetchHealthStatus = useCallback(async () => {
    try {
      const response = await healthAPI.check();
      setHealthData(response);
    } catch (error) {
      console.error('Failed to fetch health status:', error);
    }
  }, []);

  const loadSyncSettings = useCallback(async () => {
    setSettingsLoading(true);
    try {
      const response = await settingsAPI.getSync();
      const data = extractResponseData(response);
      setSyncSettings(data.settings || defaultSyncSettings);
      setRuntimeStatus(data.status || null);
    } catch (error) {
      showNotification('Failed to load sync settings: ' + (error.userMessage || error.message), 'error');
    } finally {
      setSettingsLoading(false);
    }
  }, [showNotification]);

  useEffect(() => {
    fetchHealthStatus();
    loadSyncSettings();
    const interval = setInterval(fetchHealthStatus, 30000);
    return () => clearInterval(interval);
  }, [fetchHealthStatus, loadSyncSettings]);

  useEffect(() => {
    const savedConnectionSettings = localStorage.getItem('connectionSettings');
    if (savedConnectionSettings) {
      setConnectionSettings(JSON.parse(savedConnectionSettings));
    }
  }, []);

  const updateSyncSection = (section, updates) => {
    setSyncSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...updates,
      },
    }));
  };

  const handleSaveSyncSettings = async () => {
    setSettingsLoading(true);
    try {
      const response = await settingsAPI.updateSync(syncSettings, true);
      const data = extractResponseData(response);
      setSyncSettings(data.settings);
      setRuntimeStatus(data.status || data.applied || null);
      showNotification('Sync settings saved and applied', 'success');
    } catch (error) {
      showNotification('Failed to save sync settings: ' + (error.userMessage || error.message), 'error');
    } finally {
      setSettingsLoading(false);
    }
  };

  const handleSaveConnectionSettings = () => {
    localStorage.setItem('connectionSettings', JSON.stringify(connectionSettings));
    showNotification('Connection settings saved successfully', 'success');
  };

  const handleSyncEvents = async () => {
    setLoading(true);
    setSyncStatus((prev) => ({ ...prev, events: { ...prev.events, status: 'syncing' } }));

    try {
      const response = await eventAPI.syncAll();
      const data = extractResponseData(response);
      setSyncStatus((prev) => ({
        ...prev,
        events: { ...prev.events, lastSync: new Date().toISOString(), status: 'success' },
      }));
      showNotification(data.message || 'Background event sync started', 'success');
    } catch (error) {
      setSyncStatus((prev) => ({ ...prev, events: { ...prev.events, status: 'error' } }));
      showNotification('Failed to sync events: ' + (error.userMessage || error.message), 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSyncUsers = async () => {
    setLoading(true);
    setSyncStatus((prev) => ({ ...prev, users: { ...prev.users, status: 'syncing' } }));

    try {
      const response = await userAPI.syncAll();
      const data = extractResponseData(response);
      setSyncStatus((prev) => ({
        ...prev,
        users: { lastSync: new Date().toISOString(), status: 'success', count: 0 },
      }));
      const msg = data.background
        ? 'User sync started in the background. Devices will be updated shortly.'
        : `Users synced successfully: ${data.synced ?? data.totalCardAssignments ?? data.results?.length ?? 0} users`;
      showNotification(msg, 'success');
    } catch (error) {
      setSyncStatus((prev) => ({ ...prev, users: { ...prev.users, status: 'error' } }));
      showNotification('Failed to sync users: ' + (error.userMessage || error.message), 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSyncDevices = async () => {
    setLoading(true);
    setSyncStatus((prev) => ({ ...prev, devices: { ...prev.devices, status: 'syncing' } }));

    try {
      const response = await deviceAPI.getAll();
      const data = extractResponseData(response);
      const devices = Array.isArray(data) ? data : data.devices || [];
      setSyncStatus((prev) => ({
        ...prev,
        devices: { lastSync: new Date().toISOString(), status: 'success', count: devices.length },
      }));
      showNotification(`Devices refreshed: ${devices.length} devices`, 'success');
    } catch (error) {
      setSyncStatus((prev) => ({ ...prev, devices: { ...prev.devices, status: 'error' } }));
      showNotification('Failed to refresh devices: ' + (error.userMessage || error.message), 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSyncAll = async () => {
    setLoading(true);
    try {
      await Promise.all([handleSyncEvents(), handleSyncUsers(), handleSyncDevices()]);
      showNotification('All manual sync operations completed', 'success');
    } catch {
      showNotification('Some sync operations failed', 'warning');
    } finally {
      setLoading(false);
    }
  };

  const handleResetSettings = async () => {
    if (!confirm('Reset sync and connection settings to defaults?')) return;

    setSettingsLoading(true);
    try {
      const response = await settingsAPI.resetSync(true);
      const data = extractResponseData(response);
      setSyncSettings(data.settings);
      setRuntimeStatus(data.status || data.applied || null);
      setConnectionSettings(defaultConnectionSettings);
      localStorage.setItem('connectionSettings', JSON.stringify(defaultConnectionSettings));
      showNotification('Settings reset to defaults', 'info');
    } catch (error) {
      showNotification('Failed to reset settings: ' + (error.userMessage || error.message), 'error');
    } finally {
      setSettingsLoading(false);
    }
  };

  const formatLastSync = (timestamp) => {
    if (!timestamp) return 'Never';
    return new Date(timestamp).toLocaleString('en-EG', {
      timeZone: 'Africa/Cairo',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  };

  const getSyncStatusIcon = (status) => {
    switch (status) {
      case 'syncing': return 'Syncing';
      case 'success': return 'OK';
      case 'error': return 'Error';
      default: return 'Idle';
    }
  };

  const autoSyncEnabled = syncSettings.deviceImport.enabled ||
    syncSettings.dbToDevice.enabled ||
    syncSettings.eventReplication.enabled ||
    syncSettings.cloudSync.enabled;

  const healthSummary = deriveHealthSummary(healthData);

  const renderGeneralTab = () => (
    <div className="settings-section">
      <div className="settings-card">
        <h3>System Status</h3>
        {healthData ? (
          <div className="health-status">
            <div className={`health-indicator ${healthSummary.status}`}>
              <span className="health-dot"></span>
              <span className="health-text">
                System {healthSummary.label}
              </span>
            </div>

            <div className="health-details">
              <div className="health-item">
                <span className="label">Database:</span>
                <span className={healthSummary.databaseConnected ? 'connected' : 'disconnected'}>
                  {healthSummary.databaseConnected ? 'Connected' : 'Disconnected'}
                </span>
              </div>
              <div className="health-item">
                <span className="label">Gateway:</span>
                <span className={healthSummary.isGatewayConnected ? 'connected' : 'disconnected'}>
                  {healthSummary.gatewayLabel}
                </span>
              </div>
              <div className="health-item">
                <span className="label">Registered Devices:</span>
                <span>{healthSummary.devices.total}</span>
              </div>
              <div className="health-item">
                <span className="label">Connected Devices:</span>
                <span>{healthSummary.devices.connected}</span>
              </div>
            </div>

            <div className="services-status">
              <h4>Services</h4>
              <div className="services-grid">
                {healthData.services && Object.entries(healthData.services).map(([service, active]) => (
                  <div key={service} className={`service-item ${active ? 'active' : 'inactive'}`}>
                    <span className="service-icon">{active ? 'On' : 'Off'}</span>
                    <span className="service-name">{service}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="loading-placeholder">Loading system status...</div>
        )}
      </div>

      <div className="settings-card">
        <h3>System Information</h3>
        <div className="info-grid">
          <div className="info-item">
            <span className="label">Frontend Version:</span>
            <span className="value">1.0.0</span>
          </div>
          <div className="info-item">
            <span className="label">Backend API:</span>
            <span className="value">{connectionSettings.apiBaseUrl}</span>
          </div>
          <div className="info-item">
            <span className="label">Background Sync:</span>
            <span className="value">{autoSyncEnabled ? 'Enabled' : 'Disabled'}</span>
          </div>
          <div className="info-item">
            <span className="label">Last Health Check:</span>
            <span className="value">
              {healthData?.timestamp
                ? new Date(healthData.timestamp).toLocaleString('en-EG', { timeZone: 'Africa/Cairo', hour12: false })
                : 'N/A'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderRuntimeState = () => (
    <div className="settings-card">
      <h3>Runtime State</h3>
      <div className="runtime-grid">
        <div className="runtime-item">
          <span>Device users/cards to DB</span>
          <strong>{runtimeStatus?.deviceImport?.running ? 'Running' : 'Stopped'}</strong>
        </div>
        <div className="runtime-item">
          <span>Card assignments to devices</span>
          <strong>{runtimeStatus?.dbToDevice?.running ? 'Running' : 'Stopped'}</strong>
        </div>
        <div className="runtime-item">
          <span>Device events to DB</span>
          <strong>{runtimeStatus?.eventReplication?.running ? 'Running' : 'Stopped'}</strong>
        </div>
        <div className="runtime-item">
          <span>Cloud employee/table sync</span>
          <strong>{runtimeStatus?.cloudSync?.running ? 'Running' : 'Stopped'}</strong>
        </div>
      </div>
    </div>
  );

  const renderSyncTab = () => (
    <div className="settings-section">
      <div className="settings-card">
        <h3>Background Sync Configuration</h3>
        {settingsLoading ? <div className="loading-placeholder">Loading sync settings...</div> : (
          <div className="settings-form">
            <div className="settings-subsection">
              <h4>Device Users and Cards to Database</h4>
              <p className="settings-help">
                Imports users that already exist on connected Suprema devices and creates local card assignments/enrollment records.
              </p>
              <div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    checked={syncSettings.deviceImport.enabled}
                    onChange={(e) => updateSyncSection('deviceImport', { enabled: e.target.checked })}
                  />
                  Enable scheduled user/card import from devices
                </label>
              </div>
              <div className="form-group">
                <label>Interval (seconds)</label>
                <input
                  type="number"
                  value={msToSeconds(syncSettings.deviceImport.intervalMs)}
                  onChange={(e) => updateSyncSection('deviceImport', { intervalMs: secondsToMs(e.target.value) })}
                  min="5"
                  max="86400"
                />
              </div>
            </div>

            <div className="settings-subsection">
              <h4>Database Card Assignments to Devices</h4>
              <p className="settings-help">
                Pushes active local card assignments to connected devices and repairs missing or mismatched user cards.
              </p>
              <div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    checked={syncSettings.dbToDevice.enabled}
                    onChange={(e) => updateSyncSection('dbToDevice', { enabled: e.target.checked })}
                  />
                  Enable scheduled card/user push to devices
                </label>
              </div>
              <div className="form-group">
                <label>Interval (seconds)</label>
                <input
                  type="number"
                  value={msToSeconds(syncSettings.dbToDevice.intervalMs)}
                  onChange={(e) => updateSyncSection('dbToDevice', { intervalMs: secondsToMs(e.target.value) })}
                  min="5"
                  max="86400"
                />
              </div>
            </div>

            <div className="settings-subsection">
              <h4>Device Events to Local Database</h4>
              <p className="settings-help">
                Pulls access, door, system, and authentication events from connected devices into the local events table.
              </p>
              <div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    checked={syncSettings.eventReplication.enabled}
                    onChange={(e) => updateSyncSection('eventReplication', { enabled: e.target.checked })}
                  />
                  Enable scheduled event pull from devices
                </label>
              </div>
              <div className="settings-grid two-col">
                <div className="form-group">
                  <label>Interval (seconds)</label>
                  <input
                    type="number"
                    value={msToSeconds(syncSettings.eventReplication.intervalMs)}
                    onChange={(e) => updateSyncSection('eventReplication', { intervalMs: secondsToMs(e.target.value) })}
                    min="5"
                    max="86400"
                  />
                </div>
                <div className="form-group">
                  <label>Batch size</label>
                  <input
                    type="number"
                    value={syncSettings.eventReplication.batchSize}
                    onChange={(e) => updateSyncSection('eventReplication', { batchSize: Number.parseInt(e.target.value, 10) || 1000 })}
                    min="1"
                    max="10000"
                  />
                </div>
                <div className="form-group">
                  <label>Max batches</label>
                  <input
                    type="number"
                    value={syncSettings.eventReplication.maxBatches}
                    onChange={(e) => updateSyncSection('eventReplication', { maxBatches: Number.parseInt(e.target.value, 10) || 50 })}
                    min="1"
                    max="1000"
                  />
                </div>
                <div className="form-group">
                  <label>Realtime queue size</label>
                  <input
                    type="number"
                    value={syncSettings.eventReplication.realtimeQueueSize}
                    onChange={(e) => updateSyncSection('eventReplication', { realtimeQueueSize: Number.parseInt(e.target.value, 10) || 100 })}
                    min="1"
                    max="10000"
                  />
                </div>
              </div>
              <div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    checked={syncSettings.eventReplication.enableRealtime}
                    onChange={(e) => updateSyncSection('eventReplication', { enableRealtime: e.target.checked })}
                  />
                  Enable realtime event monitoring
                </label>
              </div>
            </div>

            <div className="settings-subsection">
              <h4>Cloud Employee and Operational Table Sync</h4>
              <p className="settings-help">
                Pulls employee data from the cloud database and mirrors local operational tables such as card assignments, enrollments, and events.
              </p>
              <div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    checked={syncSettings.cloudSync.enabled}
                    onChange={(e) => updateSyncSection('cloudSync', {
                      enabled: e.target.checked,
                      trigger: e.target.checked && syncSettings.cloudSync.trigger === 'disabled'
                        ? 'both'
                        : syncSettings.cloudSync.trigger,
                    })}
                  />
                  Enable cloud database sync
                </label>
              </div>
              <div className="settings-grid two-col">
                <div className="form-group">
                  <label>Trigger</label>
                  <select
                    value={syncSettings.cloudSync.trigger}
                    onChange={(e) => updateSyncSection('cloudSync', {
                      trigger: e.target.value,
                      enabled: e.target.value !== 'disabled',
                    })}
                  >
                    <option value="disabled">Disabled</option>
                    <option value="startup">Startup only</option>
                    <option value="interval">Interval only</option>
                    <option value="both">Startup and interval</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Interval (seconds)</label>
                  <input
                    type="number"
                    value={msToSeconds(syncSettings.cloudSync.intervalMs)}
                    onChange={(e) => updateSyncSection('cloudSync', { intervalMs: secondsToMs(e.target.value) })}
                    min="5"
                    max="86400"
                  />
                </div>
              </div>
            </div>

            <div className="settings-subsection">
              <h4>Device Clock Sync at Startup</h4>
              <p className="settings-help">
                Updates connected device clocks when the backend starts. This is not an event, user, or card sync.
              </p>
              <div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    checked={syncSettings.deviceTime.enabled}
                    onChange={(e) => updateSyncSection('deviceTime', { enabled: e.target.checked })}
                  />
                  Sync device clocks during startup
                </label>
              </div>
              <div className="settings-grid two-col">
                <div className="form-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={syncSettings.deviceTime.useSystemTimezone}
                      onChange={(e) => updateSyncSection('deviceTime', { useSystemTimezone: e.target.checked })}
                    />
                    Use server timezone
                  </label>
                </div>
                <div className="form-group">
                  <label>Timezone offset (seconds)</label>
                  <input
                    type="number"
                    value={syncSettings.deviceTime.timezoneOffsetSeconds}
                    onChange={(e) => updateSyncSection('deviceTime', { timezoneOffsetSeconds: Number.parseInt(e.target.value, 10) || 0 })}
                    min="-43200"
                    max="50400"
                  />
                </div>
              </div>
            </div>

            <div className="settings-actions">
              <button className="btn btn-primary" onClick={handleSaveSyncSettings} disabled={settingsLoading}>
                Save and Apply Sync Settings
              </button>
              <button className="btn btn-secondary" onClick={loadSyncSettings} disabled={settingsLoading}>
                Reload
              </button>
            </div>
          </div>
        )}
      </div>

      {renderRuntimeState()}

      <div className="settings-card">
        <h3>Manual Sync Operations</h3>
        <div className="sync-status-grid">
          {[
            ['events', 'Device Events', 'Pull Events from Devices', handleSyncEvents],
            ['users', 'User/Card Push', 'Push Users/Cards to Devices', handleSyncUsers],
            ['devices', 'Device Inventory', 'Refresh Device List', handleSyncDevices],
          ].map(([key, title, actionLabel, handler]) => (
            <div className="sync-status-item" key={key}>
              <div className="sync-header">
                <span className="sync-icon">{getSyncStatusIcon(syncStatus[key].status)}</span>
                <span className="sync-title">{title}</span>
              </div>
              <div className="sync-details">
                <span>Last Sync: {formatLastSync(syncStatus[key].lastSync)}</span>
                {syncStatus[key].count > 0 && <span>Count: {syncStatus[key].count}</span>}
              </div>
              <button
                className="btn btn-secondary"
                onClick={handler}
                disabled={loading || syncStatus[key].status === 'syncing'}
              >
                {syncStatus[key].status === 'syncing' ? 'Syncing...' : actionLabel}
              </button>
            </div>
          ))}
        </div>

        <div className="sync-all-container">
          <button className="btn btn-primary btn-large" onClick={handleSyncAll} disabled={loading}>
            {loading ? 'Syncing All...' : 'Sync All Data'}
          </button>
        </div>
      </div>
    </div>
  );

  const renderConnectionTab = () => (
    <div className="settings-section">
      <div className="settings-card">
        <h3>Connection Settings</h3>
        <div className="settings-form">
          <div className="form-group">
            <label>API Base URL</label>
            <input
              type="text"
              value={connectionSettings.apiBaseUrl}
              onChange={(e) => setConnectionSettings({ ...connectionSettings, apiBaseUrl: e.target.value })}
              placeholder="http://localhost:3000"
            />
          </div>
          <div className="form-group">
            <label>Request Timeout (ms)</label>
            <input
              type="number"
              value={connectionSettings.timeout}
              onChange={(e) => setConnectionSettings({ ...connectionSettings, timeout: Number.parseInt(e.target.value, 10) || 30000 })}
              min="5000"
              max="120000"
            />
          </div>
          <div className="form-group">
            <label>Retry Attempts</label>
            <input
              type="number"
              value={connectionSettings.retryAttempts}
              onChange={(e) => setConnectionSettings({ ...connectionSettings, retryAttempts: Number.parseInt(e.target.value, 10) || 3 })}
              min="0"
              max="10"
            />
          </div>
          <div className="form-group">
            <label>Retry Delay (ms)</label>
            <input
              type="number"
              value={connectionSettings.retryDelay}
              onChange={(e) => setConnectionSettings({ ...connectionSettings, retryDelay: Number.parseInt(e.target.value, 10) || 1000 })}
              min="100"
              max="10000"
            />
          </div>
          <button className="btn btn-primary" onClick={handleSaveConnectionSettings}>
            Save Connection Settings
          </button>
        </div>
      </div>

      <div className="settings-card">
        <h3>Advanced Options</h3>
        <div className="advanced-options">
          <button className="btn btn-warning" onClick={handleResetSettings}>
            Reset Settings to Defaults
          </button>
          <button className="btn btn-secondary" onClick={fetchHealthStatus}>
            Refresh Health Status
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="settings-page">
      <div className="page-header">
        <h2>Settings</h2>
        <p className="page-description">Configure system settings, sync options, and connection parameters</p>
      </div>

      <div className="settings-tabs">
        <button
          className={`tab-btn ${activeTab === 'general' ? 'active' : ''}`}
          onClick={() => setActiveTab('general')}
        >
          General
        </button>
        <button
          className={`tab-btn ${activeTab === 'sync' ? 'active' : ''}`}
          onClick={() => setActiveTab('sync')}
        >
          Sync
        </button>
        <button
          className={`tab-btn ${activeTab === 'connection' ? 'active' : ''}`}
          onClick={() => setActiveTab('connection')}
        >
          Connection
        </button>
      </div>

      <div className="settings-content">
        {activeTab === 'general' && renderGeneralTab()}
        {activeTab === 'sync' && renderSyncTab()}
        {activeTab === 'connection' && renderConnectionTab()}
      </div>
    </div>
  );
}
