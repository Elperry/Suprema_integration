import { useState, useEffect, useCallback, useRef } from 'react'
import { API_CONFIG, API_ENDPOINTS } from '../config/constants'
import { deviceAPI, eventAPI } from '../services/api'
import './SystemHealth.css'

export default function SystemHealth() {
  const [health, setHealth] = useState(null)
  const [history, setHistory] = useState([])
  const [devices, setDevices] = useState([])
  const [replicationHealth, setReplicationHealth] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [refreshInterval, setRefreshInterval] = useState(15)
  const [countdown, setCountdown] = useState(0)
  const timerRef = useRef(null)

  const loadHealth = useCallback(async () => {
    try {
      const res = await fetch(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.HEALTH}`)
      const data = await res.json()
      setHealth(data)
      setHistory(prev => [...prev, { ...data, _ts: Date.now() }].slice(-60))
      setError(null)
    } catch (e) {
      setError('Failed to reach backend: ' + e.message)
    }
  }, [])

  const loadDevices = useCallback(async () => {
    try {
      const res = await deviceAPI.getAll()
      setDevices(res.data.data || [])
    } catch {}
  }, [])

  const loadReplication = useCallback(async () => {
    try {
      const res = await eventAPI.getReplicationHealth({})
      setReplicationHealth(res.data)
    } catch {}
  }, [])

  useEffect(() => {
    const init = async () => {
      setLoading(true)
      await Promise.all([loadHealth(), loadDevices(), loadReplication()])
      setLoading(false)
    }
    init()
  }, [loadHealth, loadDevices, loadReplication])

  useEffect(() => {
    if (autoRefresh && refreshInterval > 0) {
      setCountdown(refreshInterval)
      timerRef.current = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            loadHealth()
            loadDevices()
            loadReplication()
            return refreshInterval
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(timerRef.current)
    } else {
      if (timerRef.current) clearInterval(timerRef.current)
      setCountdown(0)
    }
  }, [autoRefresh, refreshInterval, loadHealth, loadDevices, loadReplication])

  const getUptimePercent = () => {
    if (history.length < 2) return '100.0'
    const healthy = history.filter(h => h.status === 'healthy').length
    return ((healthy / history.length) * 100).toFixed(1)
  }

  const getAvgResponseTime = () => {
    // Approximate from history timestamps
    if (history.length < 2) return 'N/A'
    const diffs = []
    for (let i = 1; i < history.length; i++) {
      diffs.push(history[i]._ts - history[i - 1]._ts)
    }
    const avg = diffs.reduce((a, b) => a + b, 0) / diffs.length
    return `${(avg / 1000).toFixed(1)}s`
  }

  const connectedDevices = devices.filter(d => d.status === 'connected')
  const offlineDevices = devices.filter(d => d.status !== 'connected')

  const serviceList = health?.services
    ? Object.entries(health.services).map(([name, online]) => ({ name, online }))
    : []

  const replicationDevices = replicationHealth?.devices || []

  if (loading) {
    return (
      <div className="system-health-page">
        <div className="page-header"><h2>🏥 System Health</h2></div>
        <div className="health-skeleton">
          <div className="skeleton-card" /><div className="skeleton-card" />
          <div className="skeleton-card" /><div className="skeleton-card" />
        </div>
      </div>
    )
  }

  return (
    <div className="system-health-page">
      <div className="page-header">
        <h2>🏥 System Health</h2>
        <div className="health-controls">
          <label className="auto-refresh-toggle">
            <input type="checkbox" checked={autoRefresh} onChange={e => setAutoRefresh(e.target.checked)} />
            Auto-refresh
          </label>
          {autoRefresh && (
            <select value={refreshInterval} onChange={e => setRefreshInterval(Number(e.target.value))} className="form-control" style={{ width: 'auto' }}>
              <option value={5}>5s</option>
              <option value={15}>15s</option>
              <option value={30}>30s</option>
              <option value={60}>60s</option>
            </select>
          )}
          {autoRefresh && <span className="countdown-pill">🔄 {countdown}s</span>}
          <button className="btn btn-secondary btn-sm" onClick={() => { loadHealth(); loadDevices(); loadReplication() }}>
            ↻ Refresh Now
          </button>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger">⚠️ {error}<button className="btn-close" onClick={() => setError(null)}>×</button></div>
      )}

      {/* Overall Status Banner */}
      <div className={`health-status-banner ${health?.status || 'unhealthy'}`}>
        <div className="banner-icon">{health?.status === 'healthy' ? '✅' : health?.status === 'degraded' ? '⚠️' : '❌'}</div>
        <div className="banner-text">
          <h3>System {health?.status === 'healthy' ? 'Healthy' : health?.status === 'degraded' ? 'Degraded' : 'Unhealthy'}</h3>
          <span>Last checked: {health?.timestamp ? new Date(health.timestamp).toLocaleString() : 'N/A'}</span>
        </div>
        <div className="banner-metrics">
          <div className="mini-metric"><span className="mini-label">Uptime</span><span className="mini-value">{getUptimePercent()}%</span></div>
          <div className="mini-metric"><span className="mini-label">Polling</span><span className="mini-value">{getAvgResponseTime()}</span></div>
          <div className="mini-metric"><span className="mini-label">Samples</span><span className="mini-value">{history.length}</span></div>
        </div>
      </div>

      {/* Core Metrics Grid */}
      <div className="metrics-grid">
        <MetricCard icon="🗄️" label="Database" value={health?.database?.connected ? 'Connected' : 'Disconnected'} status={health?.database?.connected ? 'ok' : 'critical'} detail={health?.database?.message} />
        <MetricCard icon="🔌" label="Gateway" value={health?.gateway || 'N/A'} status={health?.gateway === 'connected' ? 'ok' : 'critical'} />
        <MetricCard icon="🖥️" label="Devices" value={`${health?.devices?.connected || 0} / ${health?.devices?.total || 0}`} status={offlineDevices.length === 0 ? 'ok' : offlineDevices.length < 3 ? 'warn' : 'critical'} detail={`${offlineDevices.length} offline`} />
        <MetricCard icon="⚡" label="Active Devices" value={health?.devices?.active || 0} status="ok" />
      </div>

      {/* Services Grid */}
      <div className="card health-section">
        <h3>🔧 Service Status</h3>
        <div className="services-grid">
          {serviceList.map(svc => (
            <div key={svc.name} className={`service-chip ${svc.online ? 'online' : 'offline'}`}>
              <span className="service-dot" />
              <span className="service-name">{svc.name}</span>
              <span className="service-status">{svc.online ? 'Online' : 'Offline'}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Device Status Table */}
      <div className="card health-section">
        <h3>🖥️ Device Health ({devices.length})</h3>
        {devices.length === 0 ? (
          <p className="empty-hint">No devices registered.</p>
        ) : (
          <div className="table-responsive">
            <table className="health-table">
              <thead>
                <tr>
                  <th>Status</th>
                  <th>Device</th>
                  <th>IP:Port</th>
                  <th>Direction</th>
                  <th>Location</th>
                </tr>
              </thead>
              <tbody>
                {devices.map(d => (
                  <tr key={d.id} className={d.status !== 'connected' ? 'row-warn' : ''}>
                    <td><span className={`status-dot-sm ${d.status === 'connected' ? 'green' : 'red'}`} /> {d.status === 'connected' ? 'Online' : 'Offline'}</td>
                    <td><strong>{d.name || 'Unnamed'}</strong></td>
                    <td><code>{d.ip}:{d.port}</code></td>
                    <td>{(d.direction || 'in').toUpperCase()}</td>
                    <td>{d.locationName || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Replication Status */}
      <div className="card health-section">
        <h3>📡 Event Replication</h3>
        {replicationDevices.length === 0 ? (
          <p className="empty-hint">No replication data available. Sync events to begin monitoring.</p>
        ) : (
          <div className="table-responsive">
            <table className="health-table">
              <thead>
                <tr>
                  <th>Device</th>
                  <th>Monitoring</th>
                  <th>Lag</th>
                  <th>Persisted</th>
                  <th>Failures</th>
                  <th>Last Sync</th>
                  <th>Last Error</th>
                </tr>
              </thead>
              <tbody>
                {replicationDevices.map(rd => (
                  <tr key={rd.deviceId} className={rd.failureCount > 0 ? 'row-warn' : ''}>
                    <td><strong>Device {rd.deviceId}</strong></td>
                    <td>{rd.monitoringEnabled ? '✅' : '❌'}</td>
                    <td className={rd.replicationLagSeconds > 60 ? 'text-danger' : ''}>{rd.replicationLagSeconds != null ? `${rd.replicationLagSeconds}s` : 'N/A'}</td>
                    <td>{rd.totalPersisted ?? 'N/A'}</td>
                    <td className={rd.failureCount > 0 ? 'text-danger' : ''}>{rd.failureCount ?? 0}</td>
                    <td>{rd.lastEventSync ? new Date(rd.lastEventSync).toLocaleString() : 'Never'}</td>
                    <td className="error-cell">{rd.lastError || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Uptime History Bar */}
      <div className="card health-section">
        <h3>📈 Recent Health History ({history.length} samples)</h3>
        {history.length < 2 ? (
          <p className="empty-hint">Collecting data... history will appear after multiple health checks.</p>
        ) : (
          <div className="uptime-bar">
            {history.map((h, i) => (
              <div
                key={i}
                className={`uptime-tick ${h.status === 'healthy' ? 'tick-ok' : h.status === 'degraded' ? 'tick-warn' : 'tick-bad'}`}
                title={`${new Date(h._ts).toLocaleTimeString()} — ${h.status}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function MetricCard({ icon, label, value, status, detail }) {
  return (
    <div className={`metric-card metric-${status}`}>
      <div className="metric-icon">{icon}</div>
      <div className="metric-body">
        <div className="metric-label">{label}</div>
        <div className="metric-value">{value}</div>
        {detail && <div className="metric-detail">{detail}</div>}
      </div>
    </div>
  )
}
