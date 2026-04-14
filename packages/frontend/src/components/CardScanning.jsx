import { useState, useEffect, useRef } from 'react'
import { cardAPI, deviceAPI } from '../services/api'
import ErrorBanner from './ErrorBanner'
import './CardScanning.css'

export default function CardScanning() {
  const [devices, setDevices] = useState([])
  const [selectedDevice, setSelectedDevice] = useState('')
  const [scanning, setScanning] = useState(false)
  const [scanHistory, setScanHistory] = useState([])
  const [blacklist, setBlacklist] = useState([])
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const scanTimerRef = useRef(null)

  useEffect(() => { loadDevices() }, [])

  useEffect(() => {
    if (selectedDevice) loadBlacklist()
  }, [selectedDevice])

  // Clean up on unmount
  useEffect(() => () => { if (scanTimerRef.current) clearTimeout(scanTimerRef.current) }, [])

  const loadDevices = async () => {
    try {
      const res = await deviceAPI.getAll()
      setDevices(res.data.data || [])
    } catch (e) {
      setError('Failed to load devices: ' + (e.userMessage || e.message))
    }
  }

  const loadBlacklist = async () => {
    try {
      const res = await cardAPI.getBlacklist(selectedDevice)
      setBlacklist(res.data.data || [])
    } catch (e) { console.error('Blacklist load failed:', e) }
  }

  const handleScan = async () => {
    if (!selectedDevice) { setError('Please select a device first'); return }
    setScanning(true)
    setError(null)
    setSuccess(null)
    try {
      const res = await cardAPI.scan(selectedDevice)
      const card = res.data.data
      if (card) {
        setScanHistory(prev => [{ ...card, scannedAt: new Date().toISOString(), id: Date.now() }, ...prev].slice(0, 10))
        setSuccess('Card scanned successfully!')
      } else {
        setError('No card detected. Please place a card on the reader and try again.')
      }
    } catch (e) {
      setError('Scan failed: ' + (e.userMessage || e.message))
    } finally {
      setScanning(false)
    }
  }

  const handleAddToBlacklist = async (card) => {
    if (!card?.cardID) return
    try {
      await cardAPI.addToBlacklist(selectedDevice, [{ cardID: card.cardID }])
      setSuccess('Card added to blacklist')
      loadBlacklist()
    } catch (e) { setError('Failed to blacklist card: ' + (e.userMessage || e.message)) }
  }

  const handleRemoveFromBlacklist = async (card) => {
    if (!card?.cardID) return
    try {
      await cardAPI.removeFromBlacklist(selectedDevice, [{ cardID: card.cardID }])
      setSuccess('Card removed from blacklist')
      loadBlacklist()
    } catch (e) { setError('Failed to remove from blacklist: ' + (e.userMessage || e.message)) }
  }

  const selectedDeviceName = devices.find(d => String(d.id) === String(selectedDevice))?.name || ''

  return (
    <div className="page scanning-page">
      <div className="page-header">
        <h2>🔍 Card Scanning</h2>
        <p className="page-subtitle">Place a card on a connected device reader to scan and identify it</p>
      </div>

      <ErrorBanner error={error} onDismiss={() => setError(null)} />
      {success && (
        <div className="alert alert-success">
          <span>✅ {success}</span>
          <button className="btn-close" onClick={() => setSuccess(null)}>✕</button>
        </div>
      )}

      <div className="scanning-layout">
        {/* Left: Scanner Panel */}
        <div className="scanner-panel card">
          <h3>📡 Scanner</h3>

          <div className="form-field">
            <label>Device</label>
            <select
              value={selectedDevice}
              onChange={(e) => setSelectedDevice(e.target.value)}
              className="select-input"
            >
              <option value="">Select Device…</option>
              {devices.map(d => (
                <option key={d.id} value={d.id}>{d.name || `Device ${d.id}`}</option>
              ))}
            </select>
          </div>

          {!selectedDevice ? (
            <div className="empty-state">
              <div className="empty-icon">📱</div>
              <p>Select a device to start scanning cards</p>
              <p className="hint">The device must be connected and have a card reader</p>
            </div>
          ) : (
            <div className="scan-action">
              <button
                onClick={handleScan}
                disabled={scanning}
                className={`btn btn-primary btn-scan ${scanning ? 'scanning' : ''}`}
              >
                {scanning ? (
                  <>
                    <span className="scan-pulse" />
                    Scanning…
                  </>
                ) : (
                  '🔍 Scan Card'
                )}
              </button>
              {selectedDeviceName && (
                <p className="scan-device-label">on <strong>{selectedDeviceName}</strong></p>
              )}
            </div>
          )}
        </div>

        {/* Right: Results Panel */}
        <div className="results-panel">
          {/* Scan History */}
          <div className="card">
            <h3>📋 Scan History <span className="badge badge-info">{scanHistory.length}</span></h3>
            {scanHistory.length === 0 ? (
              <div className="empty-state small">
                <p>No cards scanned yet</p>
                <p className="hint">Scanned cards will appear here with timestamps</p>
              </div>
            ) : (
              <div className="scan-history-list">
                {scanHistory.map((card) => (
                  <div key={card.id} className="scan-result-item">
                    <div className="scan-result-header">
                      <span className="card-icon">💳</span>
                      <div className="scan-result-info">
                        <code className="card-id">{card.cardID || card.CSNCardData || 'Unknown'}</code>
                        <span className="scan-time">{new Date(card.scannedAt).toLocaleTimeString()}</span>
                      </div>
                    </div>
                    <div className="scan-result-details">
                      {card.cardType != null && <span className="detail-tag">Type: {card.cardType}</span>}
                      {card.cardSize != null && <span className="detail-tag">Size: {card.cardSize}</span>}
                      {card.data && <span className="detail-tag mono">Data: {String(card.data).substring(0, 20)}…</span>}
                    </div>
                    <div className="scan-result-actions">
                      <button className="btn btn-sm btn-warning" onClick={() => handleAddToBlacklist(card)}>
                        Blacklist
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Blacklist */}
          {selectedDevice && (
            <div className="card">
              <h3>🚫 Blacklisted Cards <span className="badge badge-danger">{blacklist.length}</span></h3>
              {blacklist.length === 0 ? (
                <p className="text-muted">No blacklisted cards on this device</p>
              ) : (
                <div className="blacklist-list">
                  {blacklist.map((card, i) => (
                    <div key={i} className="blacklist-item">
                      <code>{card.cardID || 'Unknown'}</code>
                      <button className="btn btn-sm btn-secondary" onClick={() => handleRemoveFromBlacklist(card)}>Remove</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
