import { useState, useEffect } from 'react';
import axios from 'axios';

export default function CardScanning() {
  const [scanning, setScanning] = useState(false);
  const [lastCard, setLastCard] = useState(null);
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    try {
      const response = await axios.get('/api/devices');
      const connectedDevices = response.data.filter(d => d.connected);
      setDevices(connectedDevices);
      if (connectedDevices.length > 0 && !selectedDevice) {
        setSelectedDevice(connectedDevices[0].deviceId);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const startScanning = async () => {
    if (!selectedDevice) {
      alert('Please select a device first');
      return;
    }
    
    try {
      setScanning(true);
      setError(null);
      const response = await axios.post(`/api/devices/${selectedDevice}/scan`);
      setLastCard(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setScanning(false);
    }
  };

  const stopScanning = () => {
    setScanning(false);
  };

  return (
    <div>
      <div className="card-header">
        <h2 className="card-title">💳 Card Scanning</h2>
        <button className="btn btn-secondary" onClick={fetchDevices}>
          🔄 Refresh Devices
        </button>
      </div>

      {error && (
        <div className="card" style={{ marginBottom: '1rem', background: '#fee2e2' }}>
          <p style={{ color: 'var(--error-color)' }}>Error: {error}</p>
        </div>
      )}

      <div className="grid">
        <div className="card">
          <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: '600' }}>
            Scanner Settings
          </h3>
          
          <div className="form-group">
            <label className="form-label">Select Device</label>
            <select
              className="form-select"
              value={selectedDevice}
              onChange={(e) => setSelectedDevice(e.target.value)}
              disabled={scanning}
            >
              <option value="">-- Select Device --</option>
              {devices.map((device) => (
                <option key={device.deviceId} value={device.deviceId}>
                  {device.deviceId} ({device.ip})
                </option>
              ))}
            </select>
          </div>

          {devices.length === 0 && (
            <div style={{ 
              padding: '1rem', 
              background: '#fef3c7', 
              borderRadius: '6px',
              fontSize: '0.875rem',
              marginBottom: '1rem'
            }}>
              No connected devices found. Please connect a device first.
            </div>
          )}

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {!scanning ? (
              <button
                className="btn btn-primary"
                onClick={startScanning}
                disabled={!selectedDevice || devices.length === 0}
              >
                ▶️ Start Scanning
              </button>
            ) : (
              <button
                className="btn btn-secondary"
                onClick={stopScanning}
                style={{ background: 'var(--error-color)' }}
              >
                ⏹️ Stop Scanning
              </button>
            )}
          </div>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: '600' }}>
            Scanner Status
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Status</span>
              <span style={{ 
                color: scanning ? 'var(--success-color)' : 'var(--text-secondary)',
                fontWeight: '500'
              }}>
                {scanning ? '● Scanning...' : '○ Idle'}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Device</span>
              <span style={{ fontWeight: '500' }}>
                {selectedDevice || 'None'}
              </span>
            </div>
          </div>

          {scanning && (
            <div style={{ 
              marginTop: '1rem',
              padding: '1rem',
              background: '#dbeafe',
              borderRadius: '6px',
              textAlign: 'center'
            }}>
              <p style={{ color: 'var(--primary-color)', fontWeight: '500' }}>
                Please scan a card on the device...
              </p>
            </div>
          )}
        </div>

        {lastCard && (
          <div className="card">
            <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: '600' }}>
              Last Scanned Card
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Card ID</span>
                <span style={{ fontWeight: '600', fontSize: '1.125rem' }}>
                  {lastCard.cardId}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>User</span>
                <span style={{ fontWeight: '500' }}>
                  {lastCard.userName || 'Unknown'}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Scanned At</span>
                <span style={{ fontSize: '0.875rem' }}>
                  {new Date(lastCard.timestamp).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
