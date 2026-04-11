import { useState, useEffect, useCallback } from 'react';
import { eventAPI, userAPI, deviceAPI, healthAPI } from '../services/api';
import { useNotification } from './Notifications';
import './Settings.css';

export default function Settings() {
  const { showNotification } = useNotification();
  const [activeTab, setActiveTab] = useState('general');
  const [loading, setLoading] = useState(false);
  const [healthData, setHealthData] = useState(null);
  
  // Sync settings
  const [syncSettings, setSyncSettings] = useState({
    eventSyncInterval: 60,
    userSyncInterval: 300,
    deviceSyncInterval: 120,
    autoSync: true,
    maxEventsPerSync: 1000
  });

  // Connection settings
  const [connectionSettings, setConnectionSettings] = useState({
    apiBaseUrl: 'http://localhost:3000',
    timeout: 30000,
    retryAttempts: 3,
    retryDelay: 1000
  });

  // Sync status
  const [syncStatus, setSyncStatus] = useState({
    events: { lastSync: null, status: 'idle', count: 0 },
    users: { lastSync: null, status: 'idle', count: 0 },
    devices: { lastSync: null, status: 'idle', count: 0 }
  });

  // Fetch health status
  const fetchHealthStatus = useCallback(async () => {
    try {
      const response = await healthAPI.check();
      setHealthData(response);
    } catch (error) {
      console.error('Failed to fetch health status:', error);
    }
  }, []);

  useEffect(() => {
    fetchHealthStatus();
    const interval = setInterval(fetchHealthStatus, 30000);
    return () => clearInterval(interval);
  }, [fetchHealthStatus]);

  // Load settings from localStorage
  useEffect(() => {
    const savedSyncSettings = localStorage.getItem('syncSettings');
    if (savedSyncSettings) {
      setSyncSettings(JSON.parse(savedSyncSettings));
    }
    
    const savedConnectionSettings = localStorage.getItem('connectionSettings');
    if (savedConnectionSettings) {
      setConnectionSettings(JSON.parse(savedConnectionSettings));
    }
  }, []);

  // Save sync settings
  const handleSaveSyncSettings = () => {
    localStorage.setItem('syncSettings', JSON.stringify(syncSettings));
    showNotification('Sync settings saved successfully', 'success');
  };

  // Save connection settings
  const handleSaveConnectionSettings = () => {
    localStorage.setItem('connectionSettings', JSON.stringify(connectionSettings));
    showNotification('Connection settings saved successfully', 'success');
  };

  // Sync operations
  const handleSyncEvents = async () => {
    setLoading(true);
    setSyncStatus(prev => ({
      ...prev,
      events: { ...prev.events, status: 'syncing' }
    }));
    
    try {
      const result = await eventAPI.syncAll(syncSettings.maxEventsPerSync);
      setSyncStatus(prev => ({
        ...prev,
        events: { 
          lastSync: new Date().toISOString(), 
          status: 'success', 
          count: result.synced || 0 
        }
      }));
      showNotification(`Events synced successfully: ${result.synced || 0} events`, 'success');
    } catch (error) {
      setSyncStatus(prev => ({
        ...prev,
        events: { ...prev.events, status: 'error' }
      }));
      showNotification('Failed to sync events: ' + error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSyncUsers = async () => {
    setLoading(true);
    setSyncStatus(prev => ({
      ...prev,
      users: { ...prev.users, status: 'syncing' }
    }));
    
    try {
      const result = await userAPI.syncAll();
      setSyncStatus(prev => ({
        ...prev,
        users: { 
          lastSync: new Date().toISOString(), 
          status: 'success', 
          count: result.synced || 0 
        }
      }));
      showNotification(`Users synced successfully: ${result.synced || 0} users`, 'success');
    } catch (error) {
      setSyncStatus(prev => ({
        ...prev,
        users: { ...prev.users, status: 'error' }
      }));
      showNotification('Failed to sync users: ' + error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSyncDevices = async () => {
    setLoading(true);
    setSyncStatus(prev => ({
      ...prev,
      devices: { ...prev.devices, status: 'syncing' }
    }));
    
    try {
      const devices = await deviceAPI.getAll();
      setSyncStatus(prev => ({
        ...prev,
        devices: { 
          lastSync: new Date().toISOString(), 
          status: 'success', 
          count: devices.length || 0 
        }
      }));
      showNotification(`Devices synced: ${devices.length || 0} devices`, 'success');
    } catch (error) {
      setSyncStatus(prev => ({
        ...prev,
        devices: { ...prev.devices, status: 'error' }
      }));
      showNotification('Failed to sync devices: ' + error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSyncAll = async () => {
    setLoading(true);
    try {
      await Promise.all([
        handleSyncEvents(),
        handleSyncUsers(),
        handleSyncDevices()
      ]);
      showNotification('All data synced successfully', 'success');
    } catch (error) {
      showNotification('Some sync operations failed', 'warning');
    } finally {
      setLoading(false);
    }
  };

  const handleResetSettings = () => {
    if (confirm('Are you sure you want to reset all settings to defaults?')) {
      const defaultSync = {
        eventSyncInterval: 60,
        userSyncInterval: 300,
        deviceSyncInterval: 120,
        autoSync: true,
        maxEventsPerSync: 1000
      };
      const defaultConnection = {
        apiBaseUrl: 'http://localhost:3000',
        timeout: 30000,
        retryAttempts: 3,
        retryDelay: 1000
      };
      
      setSyncSettings(defaultSync);
      setConnectionSettings(defaultConnection);
      localStorage.setItem('syncSettings', JSON.stringify(defaultSync));
      localStorage.setItem('connectionSettings', JSON.stringify(defaultConnection));
      showNotification('Settings reset to defaults', 'info');
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
      hour12: false
    });
  };

  const getSyncStatusIcon = (status) => {
    switch (status) {
      case 'syncing': return '🔄';
      case 'success': return '✅';
      case 'error': return '❌';
      default: return '⏸️';
    }
  };

  const renderGeneralTab = () => (
    <div className="settings-section">
      <div className="settings-card">
        <h3>📊 System Status</h3>
        {healthData ? (
          <div className="health-status">
            <div className={`health-indicator ${healthData.status}`}>
              <span className="health-dot"></span>
              <span className="health-text">
                System {healthData.status === 'healthy' ? 'Healthy' : 'Degraded'}
              </span>
            </div>
            
            <div className="health-details">
              <div className="health-item">
                <span className="label">Database:</span>
                <span className={healthData.database?.connected ? 'connected' : 'disconnected'}>
                  {healthData.database?.connected ? '🟢 Connected' : '🔴 Disconnected'}
                </span>
              </div>
              
              <div className="health-item">
                <span className="label">Total Devices:</span>
                <span>{healthData.devices?.total || 0}</span>
              </div>
              
              <div className="health-item">
                <span className="label">Connected Devices:</span>
                <span>{healthData.devices?.connected || 0}</span>
              </div>
              
              <div className="health-item">
                <span className="label">Active Devices:</span>
                <span>{healthData.devices?.active || 0}</span>
              </div>
            </div>

            <div className="services-status">
              <h4>Services</h4>
              <div className="services-grid">
                {healthData.services && Object.entries(healthData.services).map(([service, active]) => (
                  <div key={service} className={`service-item ${active ? 'active' : 'inactive'}`}>
                    <span className="service-icon">{active ? '✓' : '✗'}</span>
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
        <h3>ℹ️ System Information</h3>
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
            <span className="label">Auto-Sync:</span>
            <span className="value">{syncSettings.autoSync ? 'Enabled' : 'Disabled'}</span>
          </div>
          <div className="info-item">
            <span className="label">Last Health Check:</span>
            <span className="value">{healthData?.timestamp ? new Date(healthData.timestamp).toLocaleString('en-EG', { timeZone: 'Africa/Cairo', hour12: false }) : 'N/A'}</span>
          </div>
        </div>
      </div>

      <div className="settings-card">
        <h3>📋 Available Endpoints</h3>
        <div className="endpoints-list">
          <div className="endpoint-category">
            <h4>Device Management</h4>
            <ul>
              <li>✅ Device Discovery & Connection</li>
              <li>✅ Device Information & Status</li>
              <li>✅ Capability Queries</li>
            </ul>
          </div>
          <div className="endpoint-category">
            <h4>User Management</h4>
            <ul>
              <li>✅ User Enrollment & Deletion</li>
              <li>✅ Card Credential Management</li>
              <li>✅ Biometric Data Handling</li>
            </ul>
          </div>
          <div className="endpoint-category">
            <h4>Access Control</h4>
            <ul>
              <li>✅ Door Operations</li>
              <li>✅ Event Monitoring</li>
              <li>✅ Time & Attendance</li>
            </ul>
          </div>
          <div className="endpoint-category">
            <h4>HR Integration</h4>
            <ul>
              <li>✅ Employee Sync</li>
              <li>✅ Gate Events</li>
              <li>✅ Attendance Reports</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSyncTab = () => (
    <div className="settings-section">
      <div className="settings-card">
        <h3>🔄 Sync Configuration</h3>
        <div className="settings-form">
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                checked={syncSettings.autoSync}
                onChange={(e) => setSyncSettings({ ...syncSettings, autoSync: e.target.checked })}
              />
              Enable Auto-Sync
            </label>
          </div>
          
          <div className="form-group">
            <label>Event Sync Interval (seconds)</label>
            <input
              type="number"
              value={syncSettings.eventSyncInterval}
              onChange={(e) => setSyncSettings({ ...syncSettings, eventSyncInterval: parseInt(e.target.value) || 60 })}
              min="10"
              max="3600"
            />
          </div>
          
          <div className="form-group">
            <label>User Sync Interval (seconds)</label>
            <input
              type="number"
              value={syncSettings.userSyncInterval}
              onChange={(e) => setSyncSettings({ ...syncSettings, userSyncInterval: parseInt(e.target.value) || 300 })}
              min="60"
              max="3600"
            />
          </div>
          
          <div className="form-group">
            <label>Device Sync Interval (seconds)</label>
            <input
              type="number"
              value={syncSettings.deviceSyncInterval}
              onChange={(e) => setSyncSettings({ ...syncSettings, deviceSyncInterval: parseInt(e.target.value) || 120 })}
              min="30"
              max="3600"
            />
          </div>
          
          <div className="form-group">
            <label>Max Events Per Sync</label>
            <input
              type="number"
              value={syncSettings.maxEventsPerSync}
              onChange={(e) => setSyncSettings({ ...syncSettings, maxEventsPerSync: parseInt(e.target.value) || 1000 })}
              min="100"
              max="10000"
            />
          </div>
          
          <button className="btn btn-primary" onClick={handleSaveSyncSettings}>
            💾 Save Sync Settings
          </button>
        </div>
      </div>

      <div className="settings-card">
        <h3>⚡ Manual Sync Operations</h3>
        <div className="sync-status-grid">
          <div className="sync-status-item">
            <div className="sync-header">
              <span className="sync-icon">{getSyncStatusIcon(syncStatus.events.status)}</span>
              <span className="sync-title">Events</span>
            </div>
            <div className="sync-details">
              <span>Last Sync: {formatLastSync(syncStatus.events.lastSync)}</span>
              {syncStatus.events.count > 0 && <span>Count: {syncStatus.events.count}</span>}
            </div>
            <button 
              className="btn btn-secondary" 
              onClick={handleSyncEvents}
              disabled={loading || syncStatus.events.status === 'syncing'}
            >
              {syncStatus.events.status === 'syncing' ? 'Syncing...' : 'Sync Events'}
            </button>
          </div>

          <div className="sync-status-item">
            <div className="sync-header">
              <span className="sync-icon">{getSyncStatusIcon(syncStatus.users.status)}</span>
              <span className="sync-title">Users</span>
            </div>
            <div className="sync-details">
              <span>Last Sync: {formatLastSync(syncStatus.users.lastSync)}</span>
              {syncStatus.users.count > 0 && <span>Count: {syncStatus.users.count}</span>}
            </div>
            <button 
              className="btn btn-secondary" 
              onClick={handleSyncUsers}
              disabled={loading || syncStatus.users.status === 'syncing'}
            >
              {syncStatus.users.status === 'syncing' ? 'Syncing...' : 'Sync Users'}
            </button>
          </div>

          <div className="sync-status-item">
            <div className="sync-header">
              <span className="sync-icon">{getSyncStatusIcon(syncStatus.devices.status)}</span>
              <span className="sync-title">Devices</span>
            </div>
            <div className="sync-details">
              <span>Last Sync: {formatLastSync(syncStatus.devices.lastSync)}</span>
              {syncStatus.devices.count > 0 && <span>Count: {syncStatus.devices.count}</span>}
            </div>
            <button 
              className="btn btn-secondary" 
              onClick={handleSyncDevices}
              disabled={loading || syncStatus.devices.status === 'syncing'}
            >
              {syncStatus.devices.status === 'syncing' ? 'Syncing...' : 'Sync Devices'}
            </button>
          </div>
        </div>

        <div className="sync-all-container">
          <button 
            className="btn btn-primary btn-large" 
            onClick={handleSyncAll}
            disabled={loading}
          >
            {loading ? '🔄 Syncing All...' : '🔄 Sync All Data'}
          </button>
        </div>
      </div>
    </div>
  );

  const renderConnectionTab = () => (
    <div className="settings-section">
      <div className="settings-card">
        <h3>🔌 Connection Settings</h3>
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
              onChange={(e) => setConnectionSettings({ ...connectionSettings, timeout: parseInt(e.target.value) || 30000 })}
              min="5000"
              max="120000"
            />
          </div>
          
          <div className="form-group">
            <label>Retry Attempts</label>
            <input
              type="number"
              value={connectionSettings.retryAttempts}
              onChange={(e) => setConnectionSettings({ ...connectionSettings, retryAttempts: parseInt(e.target.value) || 3 })}
              min="0"
              max="10"
            />
          </div>
          
          <div className="form-group">
            <label>Retry Delay (ms)</label>
            <input
              type="number"
              value={connectionSettings.retryDelay}
              onChange={(e) => setConnectionSettings({ ...connectionSettings, retryDelay: parseInt(e.target.value) || 1000 })}
              min="100"
              max="10000"
            />
          </div>
          
          <button className="btn btn-primary" onClick={handleSaveConnectionSettings}>
            💾 Save Connection Settings
          </button>
        </div>
      </div>

      <div className="settings-card">
        <h3>🔧 Advanced Options</h3>
        <div className="advanced-options">
          <button className="btn btn-warning" onClick={handleResetSettings}>
            🔄 Reset All Settings to Defaults
          </button>
          
          <button className="btn btn-secondary" onClick={fetchHealthStatus}>
            🔍 Refresh Health Status
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="settings-page">
      <div className="page-header">
        <h2>⚙️ Settings</h2>
        <p className="page-description">Configure system settings, sync options, and connection parameters</p>
      </div>

      <div className="settings-tabs">
        <button 
          className={`tab-btn ${activeTab === 'general' ? 'active' : ''}`}
          onClick={() => setActiveTab('general')}
        >
          📊 General
        </button>
        <button 
          className={`tab-btn ${activeTab === 'sync' ? 'active' : ''}`}
          onClick={() => setActiveTab('sync')}
        >
          🔄 Sync
        </button>
        <button 
          className={`tab-btn ${activeTab === 'connection' ? 'active' : ''}`}
          onClick={() => setActiveTab('connection')}
        >
          🔌 Connection
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
