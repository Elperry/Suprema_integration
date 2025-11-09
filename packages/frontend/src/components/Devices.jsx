import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Devices() {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    deviceId: '',
    ip: '',
    port: '51211',
    useSSL: false
  });

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/devices');
      setDevices(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/devices', formData);
      setShowForm(false);
      setFormData({ deviceId: '', ip: '', port: '51211', useSSL: false });
      fetchDevices();
    } catch (err) {
      alert('Error adding device: ' + err.message);
    }
  };

  const handleDelete = async (deviceId) => {
    if (!confirm('Are you sure you want to delete this device?')) return;
    try {
      await axios.delete(`/api/devices/${deviceId}`);
      fetchDevices();
    } catch (err) {
      alert('Error deleting device: ' + err.message);
    }
  };

  const handleConnect = async (deviceId) => {
    try {
      await axios.post(`/api/devices/${deviceId}/connect`);
      fetchDevices();
    } catch (err) {
      alert('Error connecting to device: ' + err.message);
    }
  };

  if (loading) return <div className="loading">Loading devices...</div>;

  return (
    <div>
      <div className="card-header">
        <h2 className="card-title">🖥️ Devices</h2>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="btn btn-secondary" onClick={fetchDevices}>
            🔄 Refresh
          </button>
          <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? '✕ Cancel' : '+ Add Device'}
          </button>
        </div>
      </div>

      {error && (
        <div className="card" style={{ marginBottom: '1rem', background: '#fee2e2' }}>
          <p style={{ color: 'var(--error-color)' }}>Error: {error}</p>
        </div>
      )}

      {showForm && (
        <div className="card" style={{ marginBottom: '1rem' }}>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: '600' }}>
            Add New Device
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Device ID</label>
              <input
                type="text"
                className="form-input"
                value={formData.deviceId}
                onChange={(e) => setFormData({ ...formData, deviceId: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">IP Address</label>
              <input
                type="text"
                className="form-input"
                value={formData.ip}
                onChange={(e) => setFormData({ ...formData, ip: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Port</label>
              <input
                type="text"
                className="form-input"
                value={formData.port}
                onChange={(e) => setFormData({ ...formData, port: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input
                  type="checkbox"
                  checked={formData.useSSL}
                  onChange={(e) => setFormData({ ...formData, useSSL: e.target.checked })}
                />
                Use SSL
              </label>
            </div>
            <button type="submit" className="btn btn-primary">
              Add Device
            </button>
          </form>
        </div>
      )}

      <div className="card">
        {devices.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '2rem' }}>
            No devices found. Add your first device to get started.
          </p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Device ID</th>
                <th>IP Address</th>
                <th>Port</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {devices.map((device) => (
                <tr key={device.deviceId}>
                  <td>{device.deviceId}</td>
                  <td>{device.ip}</td>
                  <td>{device.port}</td>
                  <td>
                    <span style={{
                      color: device.connected ? 'var(--success-color)' : 'var(--text-secondary)',
                      fontWeight: '500'
                    }}>
                      {device.connected ? '✓ Connected' : '○ Disconnected'}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      {!device.connected && (
                        <button
                          className="btn btn-primary"
                          style={{ padding: '0.375rem 0.75rem', fontSize: '0.8125rem' }}
                          onClick={() => handleConnect(device.deviceId)}
                        >
                          Connect
                        </button>
                      )}
                      <button
                        className="btn btn-secondary"
                        style={{ padding: '0.375rem 0.75rem', fontSize: '0.8125rem', background: 'var(--error-color)' }}
                        onClick={() => handleDelete(device.deviceId)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
