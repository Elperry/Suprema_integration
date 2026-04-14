import { useState, useEffect, useCallback } from 'react'
import { eventAPI, auditAPI, healthAPI, deviceAPI } from '../services/api'
import './NotificationCenter.css'

const ALERT_TYPES = {
  all: { label: 'All', icon: '🔔' },
  device: { label: 'Device', icon: '🖥️' },
  access: { label: 'Access', icon: '🔐' },
  sync: { label: 'Sync', icon: '♻️' },
  system: { label: 'System', icon: '⚙️' },
}

function classifyEvent(event) {
  const code = event.eventCode || event.event_code || 0
  const type = event.type || ''
  const msg = (event.message || event.description || '').toLowerCase()

  if (msg.includes('device') || msg.includes('disconnect') || msg.includes('offline') || code >= 0x6000)
    return 'device'
  if (msg.includes('access') || msg.includes('denied') || msg.includes('door') || (code >= 0x1000 && code < 0x2000))
    return 'access'
  if (msg.includes('sync') || msg.includes('replication'))
    return 'sync'
  return 'system'
}

function getSeverity(event) {
  const msg = (event.message || event.description || '').toLowerCase()
  if (msg.includes('error') || msg.includes('fail') || msg.includes('denied') || msg.includes('disconnect'))
    return 'error'
  if (msg.includes('warn') || msg.includes('timeout') || msg.includes('retry') || msg.includes('drift'))
    return 'warning'
  if (msg.includes('success') || msg.includes('connected') || msg.includes('complete'))
    return 'success'
  return 'info'
}

const SEVERITY_ICONS = {
  error: '🔴',
  warning: '🟡',
  success: '🟢',
  info: '🔵',
}

export default function NotificationCenter() {
  const [alerts, setAlerts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeFilter, setActiveFilter] = useState('all')
  const [severityFilter, setSeverityFilter] = useState('all')
  const [timeRange, setTimeRange] = useState('24h')
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [devices, setDevices] = useState([])

  const getTimeRangeDate = (range) => {
    const now = new Date()
    switch (range) {
      case '1h': return new Date(now - 60 * 60 * 1000)
      case '6h': return new Date(now - 6 * 60 * 60 * 1000)
      case '24h': return new Date(now - 24 * 60 * 60 * 1000)
      case '7d': return new Date(now - 7 * 24 * 60 * 60 * 1000)
      case '30d': return new Date(now - 30 * 24 * 60 * 60 * 1000)
      default: return new Date(now - 24 * 60 * 60 * 1000)
    }
  }

  const loadAlerts = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const since = getTimeRangeDate(timeRange).toISOString()

      // Load from multiple sources in parallel
      const [audRes, devRes] = await Promise.allSettled([
        auditAPI.getLogs({ since, limit: 100, sortBy: 'timestamp', sortOrder: 'desc' }),
        deviceAPI.getAll(),
      ])

      const audData = audRes.status === 'fulfilled' ? (audRes.value.data.data || audRes.value.data.logs || []) : []
      const devData = devRes.status === 'fulfilled' ? (devRes.value.data.data || []) : []
      setDevices(devData)

      // Build alerts from audit logs
      const auditAlerts = audData.map((log, idx) => ({
        id: log.id || `audit-${idx}`,
        source: 'audit',
        type: classifyEvent(log),
        severity: getSeverity(log),
        message: log.message || log.action || 'Audit event',
        details: log.details || log.metadata || null,
        timestamp: log.timestamp || log.createdAt || log.created_at,
        user: log.user || log.userId || null,
        device: log.deviceId || log.device || null,
      }))

      // Build device status alerts
      const deviceAlerts = devData
        .filter(d => d.status !== 'connected')
        .map(d => ({
          id: `dev-${d.id}`,
          source: 'device',
          type: 'device',
          severity: 'error',
          message: `Device "${d.name}" is ${d.status || 'offline'}`,
          details: { ip: d.ip, lastSeen: d.lastSeen },
          timestamp: d.lastSeen || new Date().toISOString(),
          user: null,
          device: d.name,
        }))

      // Combine and sort by timestamp desc
      const combined = [...auditAlerts, ...deviceAlerts]
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))

      setAlerts(combined)
    } catch (e) {
      setError(e.response?.data?.message || e.message || 'Failed to load notifications')
    } finally {
      setLoading(false)
    }
  }, [timeRange])

  useEffect(() => {
    loadAlerts()
  }, [loadAlerts])

  // Auto-refresh every 30s
  useEffect(() => {
    if (!autoRefresh) return
    const interval = setInterval(loadAlerts, 30000)
    return () => clearInterval(interval)
  }, [autoRefresh, loadAlerts])

  const filteredAlerts = alerts.filter(a => {
    if (activeFilter !== 'all' && a.type !== activeFilter) return false
    if (severityFilter !== 'all' && a.severity !== severityFilter) return false
    return true
  })

  // Stats
  const errorCount = alerts.filter(a => a.severity === 'error').length
  const warningCount = alerts.filter(a => a.severity === 'warning').length
  const offlineDevices = devices.filter(d => d.status !== 'connected').length
  const totalCount = alerts.length

  const formatTime = (ts) => {
    if (!ts) return '—'
    const d = new Date(ts)
    const now = new Date()
    const diffMs = now - d
    if (diffMs < 60000) return 'Just now'
    if (diffMs < 3600000) return `${Math.floor(diffMs / 60000)}m ago`
    if (diffMs < 86400000) return `${Math.floor(diffMs / 3600000)}h ago`
    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="page">
      <div className="nc-header">
        <div>
          <h2>🔔 Notification Center</h2>
          <p className="nc-subtitle">Centralized feed of device alerts, access events, sync issues, and system warnings.</p>
        </div>
        <div className="nc-header-actions">
          <label className="nc-auto-toggle">
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={e => setAutoRefresh(e.target.checked)}
            />
            Auto-refresh
          </label>
          <button className="btn btn-secondary btn-sm" onClick={loadAlerts} disabled={loading}>
            🔄 Refresh
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="nc-stats">
        <div className="nc-stat nc-stat-total">
          <span className="nc-stat-value">{totalCount}</span>
          <span className="nc-stat-label">Total Alerts</span>
        </div>
        <div className="nc-stat nc-stat-error">
          <span className="nc-stat-value">{errorCount}</span>
          <span className="nc-stat-label">Errors</span>
        </div>
        <div className="nc-stat nc-stat-warning">
          <span className="nc-stat-value">{warningCount}</span>
          <span className="nc-stat-label">Warnings</span>
        </div>
        <div className="nc-stat nc-stat-devices">
          <span className="nc-stat-value">{offlineDevices}</span>
          <span className="nc-stat-label">Offline Devices</span>
        </div>
      </div>

      {/* Filters */}
      <div className="card nc-filters">
        <div className="nc-filter-row">
          <div className="nc-type-tabs">
            {Object.entries(ALERT_TYPES).map(([key, { label, icon }]) => (
              <button
                key={key}
                className={`nc-tab ${activeFilter === key ? 'active' : ''}`}
                onClick={() => setActiveFilter(key)}
              >
                {icon} {label}
                {key !== 'all' && (
                  <span className="nc-tab-count">
                    {alerts.filter(a => a.type === key).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="nc-filter-controls">
            <select
              value={severityFilter}
              onChange={e => setSeverityFilter(e.target.value)}
              className="form-control form-control-sm"
            >
              <option value="all">All Severity</option>
              <option value="error">🔴 Errors</option>
              <option value="warning">🟡 Warnings</option>
              <option value="info">🔵 Info</option>
              <option value="success">🟢 Success</option>
            </select>

            <select
              value={timeRange}
              onChange={e => setTimeRange(e.target.value)}
              className="form-control form-control-sm"
            >
              <option value="1h">Last Hour</option>
              <option value="6h">Last 6 Hours</option>
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
          </div>
        </div>
      </div>

      {error && (
        <div className="alert alert-error">
          ❌ {error}
          <button className="btn-close" onClick={() => setError(null)}>×</button>
        </div>
      )}

      {/* Alerts Feed */}
      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading notifications...</p>
        </div>
      ) : filteredAlerts.length === 0 ? (
        <div className="nc-empty">
          <div className="nc-empty-icon">🔔</div>
          <h3>No Notifications</h3>
          <p>No alerts matching your filters in the selected time range.</p>
        </div>
      ) : (
        <div className="nc-feed">
          {filteredAlerts.map(alert => (
            <AlertCard key={alert.id} alert={alert} formatTime={formatTime} />
          ))}
        </div>
      )}
    </div>
  )
}

function AlertCard({ alert, formatTime }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className={`nc-alert nc-alert-${alert.severity}`} onClick={() => setExpanded(!expanded)}>
      <div className="nc-alert-icon">{SEVERITY_ICONS[alert.severity]}</div>
      <div className="nc-alert-body">
        <div className="nc-alert-header">
          <span className="nc-alert-message">{alert.message}</span>
          <span className="nc-alert-time">{formatTime(alert.timestamp)}</span>
        </div>
        <div className="nc-alert-meta">
          <span className="nc-alert-type">{ALERT_TYPES[alert.type]?.icon} {ALERT_TYPES[alert.type]?.label || alert.type}</span>
          {alert.device && <span className="nc-alert-device">🖥️ {alert.device}</span>}
          {alert.user && <span className="nc-alert-user">👤 {alert.user}</span>}
          <span className="nc-alert-source">{alert.source}</span>
        </div>
        {expanded && alert.details && (
          <div className="nc-alert-details">
            <pre>{typeof alert.details === 'string' ? alert.details : JSON.stringify(alert.details, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  )
}
