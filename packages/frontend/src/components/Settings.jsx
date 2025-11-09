import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Settings() {
  const [settings, setSettings] = useState({
    gatewayIp: '',
    gatewayPort: '',
    apiKey: '',
    autoReconnect: true,
    logLevel: 'info',
    maxRetries: '3',
    connectionTimeout: '30'
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/settings');
      setSettings(response.data);
    } catch (err) {
      console.error('Error fetching settings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setSettings({ ...settings, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      await axios.put('/api/settings', settings);
      setMessage({ type: 'success', text: 'Settings saved successfully!' });
    } catch (err) {
      setMessage({ type: 'error', text: 'Error saving settings: ' + err.message });
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (!confirm('Are you sure you want to reset all settings to default?')) return;
    fetchSettings();
    setMessage({ type: 'info', text: 'Settings reset to defaults' });
  };

  const testConnection = async () => {
    try {
      const response = await axios.post('/api/settings/test-connection');
      setMessage({ 
        type: 'success', 
        text: `Connection successful! ${response.data.message || ''}` 
      });
    } catch (err) {
      setMessage({ 
        type: 'error', 
        text: 'Connection failed: ' + err.message 
      });
    }
  };

  if (loading) return <div className="loading">Loading settings...</div>;

  return (
    <div>
      <div className="card-header">
        <h2 className="card-title">⚙️ Settings</h2>
        <button className="btn btn-secondary" onClick={handleReset}>
          🔄 Reset to Defaults
        </button>
      </div>

      {message && (
        <div 
          className="card" 
          style={{ 
            marginBottom: '1rem', 
            background: message.type === 'error' ? '#fee2e2' : 
                       message.type === 'success' ? '#dcfce7' : '#fef3c7'
          }}
        >
          <p style={{ 
            color: message.type === 'error' ? 'var(--error-color)' : 
                   message.type === 'success' ? 'var(--success-color)' : '#92400e'
          }}>
            {message.text}
          </p>
        </div>
      )}

      <div className="grid">
        <div className="card">
          <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: '600' }}>
            Gateway Configuration
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Gateway IP Address</label>
              <input
                type="text"
                className="form-input"
                value={settings.gatewayIp}
                onChange={(e) => handleChange('gatewayIp', e.target.value)}
                placeholder="192.168.1.100"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Gateway Port</label>
              <input
                type="text"
                className="form-input"
                value={settings.gatewayPort}
                onChange={(e) => handleChange('gatewayPort', e.target.value)}
                placeholder="4000"
              />
            </div>
            <div className="form-group">
              <label className="form-label">API Key</label>
              <input
                type="password"
                className="form-input"
                value={settings.apiKey}
                onChange={(e) => handleChange('apiKey', e.target.value)}
                placeholder="Enter API key..."
              />
            </div>
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={testConnection}
            >
              🔌 Test Connection
            </button>
          </form>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: '600' }}>
            Connection Settings
          </h3>
          <div className="form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                type="checkbox"
                checked={settings.autoReconnect}
                onChange={(e) => handleChange('autoReconnect', e.target.checked)}
              />
              <span className="form-label" style={{ marginBottom: 0 }}>
                Auto-reconnect on disconnect
              </span>
            </label>
          </div>
          <div className="form-group">
            <label className="form-label">Max Reconnection Retries</label>
            <input
              type="number"
              className="form-input"
              value={settings.maxRetries}
              onChange={(e) => handleChange('maxRetries', e.target.value)}
              min="1"
              max="10"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Connection Timeout (seconds)</label>
            <input
              type="number"
              className="form-input"
              value={settings.connectionTimeout}
              onChange={(e) => handleChange('connectionTimeout', e.target.value)}
              min="5"
              max="120"
            />
          </div>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: '600' }}>
            System Settings
          </h3>
          <div className="form-group">
            <label className="form-label">Log Level</label>
            <select
              className="form-select"
              value={settings.logLevel}
              onChange={(e) => handleChange('logLevel', e.target.value)}
            >
              <option value="debug">Debug</option>
              <option value="info">Info</option>
              <option value="warn">Warning</option>
              <option value="error">Error</option>
            </select>
          </div>
          <div style={{ 
            padding: '1rem', 
            background: '#f1f5f9', 
            borderRadius: '6px',
            fontSize: '0.875rem',
            color: 'var(--text-secondary)'
          }}>
            <p><strong>Note:</strong> Changing the log level will affect system performance and log file size.</p>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={() => fetchSettings()}
          >
            Cancel
          </button>
          <button 
            type="button" 
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={saving}
          >
            {saving ? 'Saving...' : '💾 Save Settings'}
          </button>
        </div>
      </div>
    </div>
  );
}
