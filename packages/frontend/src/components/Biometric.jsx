import { useState, useEffect, useCallback } from 'react'
import { biometricAPI, deviceAPI } from '../services/api'
import { ErrorBanner } from './shared'
import './Biometric.css'

export default function Biometric() {
  const [devices, setDevices] = useState([])
  const [selectedDevice, setSelectedDevice] = useState('')
  const [activeTab, setActiveTab] = useState('fingerprint')
  const [loading, setLoading] = useState(false)
  const [scanning, setScanning] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  // Biometric data
  const [config, setConfig] = useState(null)
  const [stats, setStats] = useState(null)
  const [supportedTypes, setSupportedTypes] = useState(null)
  const [scanResult, setScanResult] = useState(null)
  const [scanHistory, setScanHistory] = useState([])

  useEffect(() => {
    loadDevices()
  }, [])

  const loadDevices = async () => {
    try {
      const res = await deviceAPI.getAll()
      setDevices(res.data.data || [])
    } catch (e) {
      console.error('Failed to load devices:', e)
    }
  }

  const loadDeviceData = useCallback(async (deviceId) => {
    if (!deviceId) return
    setLoading(true)
    setError(null)
    try {
      const [configRes, statsRes, typesRes] = await Promise.allSettled([
        biometricAPI.getConfig(deviceId),
        biometricAPI.getStatistics(deviceId),
        biometricAPI.getTypes(deviceId),
      ])
      if (configRes.status === 'fulfilled') setConfig(configRes.value.data.data)
      if (statsRes.status === 'fulfilled') setStats(statsRes.value.data.data)
      if (typesRes.status === 'fulfilled') setSupportedTypes(typesRes.value.data.data)
    } catch (e) {
      setError(e.response?.data?.message || e.message || 'Failed to load biometric data')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (selectedDevice) {
      loadDeviceData(selectedDevice)
      setScanResult(null)
      setScanHistory([])
    }
  }, [selectedDevice, loadDeviceData])

  const handleScanFingerprint = async () => {
    if (!selectedDevice) return setError('Select a device first')
    try {
      setScanning(true)
      setError(null)
      setScanResult(null)
      const res = await biometricAPI.scanFingerprint(selectedDevice)
      const result = { ...res.data.data, type: 'fingerprint', timestamp: new Date().toISOString() }
      setScanResult(result)
      setScanHistory(prev => [result, ...prev].slice(0, 20))
      setSuccess('Fingerprint scanned successfully')
    } catch (e) {
      setError(e.response?.data?.message || e.message || 'Fingerprint scan failed')
    } finally {
      setScanning(false)
    }
  }

  const handleScanFace = async () => {
    if (!selectedDevice) return setError('Select a device first')
    try {
      setScanning(true)
      setError(null)
      setScanResult(null)
      const res = await biometricAPI.scanFace(selectedDevice)
      const result = { ...res.data.data, type: 'face', timestamp: new Date().toISOString() }
      setScanResult(result)
      setScanHistory(prev => [result, ...prev].slice(0, 20))
      setSuccess('Face scanned successfully')
    } catch (e) {
      setError(e.response?.data?.message || e.message || 'Face scan failed')
    } finally {
      setScanning(false)
    }
  }

  const handleOptimizeHR = async () => {
    if (!selectedDevice) return setError('Select a device first')
    try {
      setLoading(true)
      setError(null)
      await biometricAPI.optimizeForHR(selectedDevice)
      setSuccess('Biometric settings optimized for HR integration')
      loadDeviceData(selectedDevice)
    } catch (e) {
      setError(e.response?.data?.message || e.message || 'Failed to optimize')
    } finally {
      setLoading(false)
    }
  }

  const connectedDevices = devices.filter(d => d.status === 'connected')
  const selectedDeviceObj = devices.find(d => String(d.id) === String(selectedDevice))

  return (
    <div className="page">
      <h2>🧬 Biometric Management</h2>

      {/* Device Selector */}
      <div className="card bio-device-selector">
        <div className="bio-device-row">
          <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
            <label>Select Device</label>
            <div className="device-select-wrapper">
              <select
                value={selectedDevice}
                onChange={e => setSelectedDevice(e.target.value)}
                className="form-control"
              >
                <option value="">-- Select a device --</option>
                {devices.map(d => (
                  <option key={d.id} value={d.id} disabled={d.status !== 'connected'}>
                    {d.status === 'connected' ? '🟢' : '🔴'} {d.name} ({d.ip}) {d.status !== 'connected' ? '— Offline' : ''}
                  </option>
                ))}
              </select>
              {selectedDevice && (
                <span className={`device-connection-dot ${selectedDeviceObj?.status === 'connected' ? 'online' : 'offline'}`} />
              )}
            </div>
          </div>
          {selectedDevice && (
            <button className="btn btn-secondary" onClick={() => loadDeviceData(selectedDevice)} disabled={loading}>
              🔄 Refresh
            </button>
          )}
        </div>
      </div>

      <ErrorBanner error={error} onDismiss={() => setError(null)} />
      {success && (
        <div className="alert alert-success">
          ✅ {success}
          <button className="btn-close" onClick={() => setSuccess(null)}>×</button>
        </div>
      )}

      {!selectedDevice ? (
        <div className="bio-empty">
          <div className="bio-empty-icon">🧬</div>
          <h3>Select a Device</h3>
          <p>Choose a connected device to manage biometric operations — fingerprint scanning, face recognition, and configuration.</p>
        </div>
      ) : loading && !config ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading biometric data...</p>
        </div>
      ) : (
        <>
          {/* Stats Row */}
          {stats && (
            <div className="bio-stats-row">
              <div className="bio-stat">
                <div className="bio-stat-value">{stats.fingerprint?.count ?? stats.fingerprintCount ?? '—'}</div>
                <div className="bio-stat-label">Fingerprint Templates</div>
              </div>
              <div className="bio-stat">
                <div className="bio-stat-value">{stats.face?.count ?? stats.faceCount ?? '—'}</div>
                <div className="bio-stat-label">Face Templates</div>
              </div>
              <div className="bio-stat">
                <div className="bio-stat-value">{stats.card?.count ?? stats.cardCount ?? '—'}</div>
                <div className="bio-stat-label">Card Templates</div>
              </div>
              {supportedTypes && (
                <div className="bio-stat">
                  <div className="bio-stat-value">{Array.isArray(supportedTypes) ? supportedTypes.length : '—'}</div>
                  <div className="bio-stat-label">Supported Types</div>
                </div>
              )}
            </div>
          )}

          {/* Tabs */}
          <div className="bio-tabs">
            <button className={`bio-tab ${activeTab === 'fingerprint' ? 'active' : ''}`} onClick={() => setActiveTab('fingerprint')}>
              👆 Fingerprint
            </button>
            <button className={`bio-tab ${activeTab === 'face' ? 'active' : ''}`} onClick={() => setActiveTab('face')}>
              🧑 Face
            </button>
            <button className={`bio-tab ${activeTab === 'config' ? 'active' : ''}`} onClick={() => setActiveTab('config')}>
              ⚙️ Configuration
            </button>
            <button className={`bio-tab ${activeTab === 'history' ? 'active' : ''}`} onClick={() => setActiveTab('history')}>
              📋 Scan History ({scanHistory.length})
            </button>
          </div>

          {/* Fingerprint Tab */}
          {activeTab === 'fingerprint' && (
            <div className="card bio-scan-card">
              <h3>Fingerprint Scanning</h3>
              <p className="bio-scan-desc">Place a finger on the device scanner to capture a fingerprint template.</p>

              <button
                className="btn btn-primary btn-lg"
                onClick={handleScanFingerprint}
                disabled={scanning}
              >
                {scanning ? '📡 Scanning fingerprint...' : '👆 Scan Fingerprint'}
              </button>

              {scanning && (
                <div className="bio-scan-animation">
                  <div className="bio-scan-pulse"></div>
                  <div className="bio-scan-icon">👆</div>
                  <p>Place finger on the reader...</p>
                </div>
              )}

              {scanResult && scanResult.type === 'fingerprint' && (
                <div className="bio-scan-result success">
                  <h4>✅ Fingerprint Captured</h4>
                  <div className="bio-result-details">
                    {scanResult.quality && <p><strong>Quality:</strong> {scanResult.quality}</p>}
                    {scanResult.templateFormat && <p><strong>Format:</strong> {scanResult.templateFormat}</p>}
                    {scanResult.templateSize && <p><strong>Size:</strong> {scanResult.templateSize} bytes</p>}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Face Tab */}
          {activeTab === 'face' && (
            <div className="card bio-scan-card">
              <h3>Face Recognition</h3>
              <p className="bio-scan-desc">Look at the device camera to capture a face template.</p>

              <button
                className="btn btn-primary btn-lg"
                onClick={handleScanFace}
                disabled={scanning}
              >
                {scanning ? '📡 Scanning face...' : '🧑 Scan Face'}
              </button>

              {scanning && (
                <div className="bio-scan-animation">
                  <div className="bio-scan-pulse"></div>
                  <div className="bio-scan-icon">🧑</div>
                  <p>Look at the camera...</p>
                </div>
              )}

              {scanResult && scanResult.type === 'face' && (
                <div className="bio-scan-result success">
                  <h4>✅ Face Captured</h4>
                  <div className="bio-result-details">
                    {scanResult.quality && <p><strong>Quality:</strong> {scanResult.quality}</p>}
                    {scanResult.templateFormat && <p><strong>Format:</strong> {scanResult.templateFormat}</p>}
                    {scanResult.templateSize && <p><strong>Size:</strong> {scanResult.templateSize} bytes</p>}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Config Tab */}
          {activeTab === 'config' && (
            <div className="card">
              <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3>Biometric Configuration</h3>
                <button className="btn btn-secondary btn-sm" onClick={handleOptimizeHR} disabled={loading}>
                  🚀 Optimize for HR
                </button>
              </div>
              
              {config ? (
                <div className="bio-config-grid">
                  {Object.entries(config).map(([key, value]) => (
                    <div key={key} className="bio-config-item">
                      <span className="bio-config-key">{key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())}</span>
                      <span className="bio-config-value">
                        {typeof value === 'boolean' ? (value ? '✅ Enabled' : '❌ Disabled') : 
                         typeof value === 'object' ? JSON.stringify(value, null, 2) : 
                         String(value)}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bio-empty" style={{ padding: '30px' }}>
                  <p>No configuration data available for this device.</p>
                </div>
              )}

              {supportedTypes && (
                <div style={{ marginTop: '20px' }}>
                  <h4>Supported Biometric Types</h4>
                  <div className="bio-types-list">
                    {(Array.isArray(supportedTypes) ? supportedTypes : []).map((type, i) => (
                      <span key={i} className="bio-type-badge">{type}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* History Tab */}
          {activeTab === 'history' && (
            <div className="card">
              <h3>Scan History</h3>
              {scanHistory.length === 0 ? (
                <div className="bio-empty" style={{ padding: '30px' }}>
                  <div className="bio-empty-icon">📋</div>
                  <p>No scans yet. Use the Fingerprint or Face tab to capture biometric data.</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Type</th>
                        <th>Quality</th>
                        <th>Format</th>
                        <th>Size</th>
                        <th>Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {scanHistory.map((scan, i) => (
                        <tr key={i}>
                          <td>{scanHistory.length - i}</td>
                          <td>
                            <span className={`bio-badge bio-badge-${scan.type}`}>
                              {scan.type === 'fingerprint' ? '👆' : '🧑'} {scan.type}
                            </span>
                          </td>
                          <td>{scan.quality || '—'}</td>
                          <td>{scan.templateFormat || '—'}</td>
                          <td>{scan.templateSize ? `${scan.templateSize}B` : '—'}</td>
                          <td>{new Date(scan.timestamp).toLocaleTimeString('en-EG', { timeZone: 'Africa/Cairo' })}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}
