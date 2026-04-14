import { useState, useEffect, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import { deviceAPI, eventAPI, userAPI, locationAPI } from '../services/api'
import { SkeletonCards, SkeletonTable } from './Skeleton'
import './DeviceDetail.css'

export default function DeviceDetail() {
  const { id } = useParams()
  const deviceId = parseInt(id)

  const [device, setDevice] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [actionLoading, setActionLoading] = useState(null)

  // Tabs
  const [activeTab, setActiveTab] = useState('overview')

  // Sub-data
  const [enrolledUsers, setEnrolledUsers] = useState([])
  const [usersLoading, setUsersLoading] = useState(false)
  const [recentEvents, setRecentEvents] = useState([])
  const [eventsLoading, setEventsLoading] = useState(false)
  const [replicationHealth, setReplicationHealth] = useState(null)
  const [reconciliation, setReconciliation] = useState(null)

  const loadDevice = useCallback(async () => {
    try {
      setLoading(true)
      const res = await deviceAPI.getAll()
      const all = res.data.data || []
      const d = all.find(dev => dev.id === deviceId)
      if (d) {
        setDevice(d)
      } else {
        setError('Device not found')
      }
    } catch (e) {
      setError('Failed to load device: ' + e.message)
    } finally {
      setLoading(false)
    }
  }, [deviceId])

  const loadUsers = useCallback(async () => {
    try {
      setUsersLoading(true)
      const res = await userAPI.getUsers(deviceId, true, 'database')
      setEnrolledUsers(res.data.data || [])
    } catch {
      setEnrolledUsers([])
    } finally {
      setUsersLoading(false)
    }
  }, [deviceId])

  const loadEvents = useCallback(async () => {
    try {
      setEventsLoading(true)
      const res = await eventAPI.getFromDB({ deviceId, page: 1, pageSize: 20 })
      setRecentEvents(res.data?.data || [])
    } catch {
      setRecentEvents([])
    } finally {
      setEventsLoading(false)
    }
  }, [deviceId])

  const loadHealth = useCallback(async () => {
    try {
      const [replRes, reconRes] = await Promise.allSettled([
        eventAPI.getReplicationHealth({ deviceId }),
        userAPI.getDeviceReconciliation(deviceId)
      ])
      if (replRes.status === 'fulfilled') {
        const deviceHealth = replRes.value.data?.devices?.find(d => d.deviceId === deviceId)
        setReplicationHealth(deviceHealth || null)
      }
      if (reconRes.status === 'fulfilled') {
        setReconciliation(reconRes.value.data?.data || null)
      }
    } catch {}
  }, [deviceId])

  useEffect(() => {
    loadDevice()
    loadHealth()
  }, [loadDevice, loadHealth])

  useEffect(() => {
    if (activeTab === 'users') loadUsers()
    if (activeTab === 'events') loadEvents()
  }, [activeTab, loadUsers, loadEvents])

  const handleAction = async (action) => {
    setActionLoading(action)
    setError(null)
    setSuccess(null)
    try {
      switch (action) {
        case 'connect':
          await deviceAPI.connect(deviceId)
          setSuccess('Connected successfully')
          break
        case 'disconnect':
          await deviceAPI.disconnect(deviceId)
          setSuccess('Disconnected')
          break
        case 'syncUsers':
          await userAPI.sync(deviceId)
          setSuccess('Users synced to device')
          break
        case 'syncEvents':
          await eventAPI.sync(deviceId, null, 1000)
          setSuccess('Events synced from device')
          break
        case 'repair':
          await userAPI.repairDevice(deviceId)
          setSuccess('Device repair completed')
          break
        default:
          break
      }
      loadDevice()
      loadHealth()
    } catch (e) {
      setError(`Action failed: ${e.response?.data?.message || e.message}`)
    } finally {
      setActionLoading(null)
    }
  }

  const formatTimestamp = (ts) => {
    if (!ts) return 'N/A'
    try {
      return new Date(ts).toLocaleString('en-GB', { timeZone: 'Africa/Cairo', day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })
    } catch { return 'Invalid' }
  }

  if (loading) {
    return (
      <div className="device-detail-page">
        <nav className="breadcrumb"><Link to="/">Dashboard</Link> / <Link to="/devices">Devices</Link> / ...</nav>
        <SkeletonCards count={4} height={100} />
      </div>
    )
  }

  if (!device) {
    return (
      <div className="device-detail-page">
        <nav className="breadcrumb"><Link to="/">Dashboard</Link> / <Link to="/devices">Devices</Link> / Not Found</nav>
        <div className="card" style={{ padding: 32, textAlign: 'center' }}>
          <h3>Device Not Found</h3>
          <p>Device with ID {id} does not exist.</p>
          <Link to="/devices" className="btn btn-primary">← Back to Devices</Link>
        </div>
      </div>
    )
  }

  const isConnected = device.status === 'connected'

  return (
    <div className="device-detail-page">
      {/* Breadcrumb */}
      <nav className="breadcrumb">
        <Link to="/">Dashboard</Link> / <Link to="/devices">Devices</Link> / <strong>{device.name || 'Unnamed'}</strong>
      </nav>

      {/* Header */}
      <div className="device-detail-header">
        <div className="device-detail-title">
          <span className={`status-dot-lg ${isConnected ? 'green' : 'red'}`} />
          <div>
            <h2>{device.name || 'Unnamed Device'}</h2>
            <span className="device-subtitle">{device.ip}:{device.port} · {(device.direction || 'in').toUpperCase()} · ID: {device.id}</span>
          </div>
        </div>
        <div className="device-detail-actions">
          {isConnected ? (
            <button className="btn btn-warning btn-sm" onClick={() => handleAction('disconnect')} disabled={!!actionLoading}>
              {actionLoading === 'disconnect' ? '⏳' : '🔌'} Disconnect
            </button>
          ) : (
            <button className="btn btn-success btn-sm" onClick={() => handleAction('connect')} disabled={!!actionLoading}>
              {actionLoading === 'connect' ? '⏳' : '🔗'} Connect
            </button>
          )}
          <button className="btn btn-primary btn-sm" onClick={() => handleAction('syncUsers')} disabled={!!actionLoading}>
            {actionLoading === 'syncUsers' ? '⏳' : '👥'} Sync Users
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => handleAction('syncEvents')} disabled={!!actionLoading}>
            {actionLoading === 'syncEvents' ? '⏳' : '📋'} Sync Events
          </button>
          <button className="btn btn-secondary btn-sm" onClick={() => handleAction('repair')} disabled={!!actionLoading}>
            {actionLoading === 'repair' ? '⏳' : '🔧'} Repair
          </button>
        </div>
      </div>

      {/* Alerts */}
      {error && <div className="alert alert-danger">⚠️ {error}<button className="btn-close" onClick={() => setError(null)}>×</button></div>}
      {success && <div className="alert alert-success">✅ {success}<button className="btn-close" onClick={() => setSuccess(null)}>×</button></div>}

      {/* Quick Stats */}
      <div className="device-stats-grid">
        <div className={`device-stat-card ${isConnected ? 'stat-ok' : 'stat-err'}`}>
          <div className="stat-label">Connection</div>
          <div className="stat-val">{isConnected ? '🟢 Online' : '🔴 Offline'}</div>
        </div>
        <div className="device-stat-card">
          <div className="stat-label">Enrolled Users</div>
          <div className="stat-val">{enrolledUsers.length || '—'}</div>
        </div>
        <div className="device-stat-card">
          <div className="stat-label">Replication Lag</div>
          <div className={`stat-val ${replicationHealth?.replicationLagSeconds > 60 ? 'text-warn' : ''}`}>
            {replicationHealth?.replicationLagSeconds != null ? `${replicationHealth.replicationLagSeconds}s` : 'N/A'}
          </div>
        </div>
        <div className={`device-stat-card ${(reconciliation?.summary?.missingOnDevice || 0) > 0 ? 'stat-warn' : ''}`}>
          <div className="stat-label">Missing on Device</div>
          <div className="stat-val">{reconciliation?.summary?.missingOnDevice ?? 'N/A'}</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="detail-tabs">
        {['overview', 'users', 'events'].map(tab => (
          <button key={tab} className={`tab-btn ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
            {tab === 'overview' ? '📊 Overview' : tab === 'users' ? '👥 Users' : '📋 Events'}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="card detail-card">
          <h3>Device Information</h3>
          <div className="info-grid">
            <InfoRow label="Device ID" value={device.id} />
            <InfoRow label="Name" value={device.name || 'Unnamed'} />
            <InfoRow label="IP Address" value={device.ip} />
            <InfoRow label="Port" value={device.port} />
            <InfoRow label="Status" value={isConnected ? 'Connected' : 'Disconnected'} badge={isConnected ? 'success' : 'danger'} />
            <InfoRow label="Direction" value={(device.direction || 'in').toUpperCase()} />
            <InfoRow label="Location" value={device.locationName || 'Unassigned'} />
          </div>

          {replicationHealth && (
            <>
              <h3 style={{ marginTop: 20 }}>Replication Health</h3>
              <div className="info-grid">
                <InfoRow label="Monitoring" value={replicationHealth.monitoringEnabled ? 'Enabled' : 'Disabled'} badge={replicationHealth.monitoringEnabled ? 'success' : 'warning'} />
                <InfoRow label="Total Persisted" value={replicationHealth.totalPersisted ?? 'N/A'} />
                <InfoRow label="Sync Failures" value={replicationHealth.failureCount ?? 0} badge={(replicationHealth.failureCount || 0) > 0 ? 'danger' : 'success'} />
                <InfoRow label="Last Event Sync" value={replicationHealth.lastEventSync ? formatTimestamp(replicationHealth.lastEventSync) : 'Never'} />
                <InfoRow label="Last Success" value={replicationHealth.lastSuccessAt ? formatTimestamp(replicationHealth.lastSuccessAt) : 'Never'} />
                {replicationHealth.lastError && <InfoRow label="Last Error" value={replicationHealth.lastError} badge="danger" />}
              </div>
            </>
          )}

          {reconciliation?.summary && (
            <>
              <h3 style={{ marginTop: 20 }}>Reconciliation</h3>
              <div className="info-grid">
                <InfoRow label="DB Users" value={reconciliation.summary.databaseUsers ?? 'N/A'} />
                <InfoRow label="Device Users" value={reconciliation.summary.deviceUsers ?? 'N/A'} />
                <InfoRow label="Matched" value={reconciliation.summary.matched ?? 'N/A'} />
                <InfoRow label="Missing on Device" value={reconciliation.summary.missingOnDevice ?? 0} badge={(reconciliation.summary.missingOnDevice || 0) > 0 ? 'danger' : 'success'} />
                <InfoRow label="Card Mismatches" value={reconciliation.summary.cardMismatches ?? 0} badge={(reconciliation.summary.cardMismatches || 0) > 0 ? 'warning' : 'success'} />
              </div>
            </>
          )}
        </div>
      )}

      {activeTab === 'users' && (
        <div className="card detail-card">
          <div className="card-header-flex">
            <h3>👥 Enrolled Users ({enrolledUsers.length})</h3>
            <button className="btn btn-sm btn-secondary" onClick={loadUsers} disabled={usersLoading}>↻ Refresh</button>
          </div>
          {usersLoading ? (
            <table className="data-table"><thead><tr><th>ID</th><th>Name</th><th>Card</th><th>Status</th></tr></thead><tbody><SkeletonTable rows={6} cols={4} /></tbody></table>
          ) : enrolledUsers.length === 0 ? (
            <div className="empty-hint">No users enrolled on this device. Use "Sync Users" to push users from the database.</div>
          ) : (
            <table className="data-table">
              <thead>
                <tr><th>User ID</th><th>Name</th><th>Card</th><th>Status</th></tr>
              </thead>
              <tbody>
                {enrolledUsers.map((u, i) => (
                  <tr key={u.userID || u.id || i}>
                    <td><code>{u.userID || u.id}</code></td>
                    <td>{u.name || u.userName || '—'}</td>
                    <td><code>{u.cardData ? u.cardData.substring(0, 16) + '…' : '—'}</code></td>
                    <td><span className={`badge ${u.status === 'active' ? 'badge-success' : 'badge-secondary'}`}>{u.status || 'enrolled'}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {activeTab === 'events' && (
        <div className="card detail-card">
          <div className="card-header-flex">
            <h3>📋 Recent Events</h3>
            <button className="btn btn-sm btn-secondary" onClick={loadEvents} disabled={eventsLoading}>↻ Refresh</button>
          </div>
          {eventsLoading ? (
            <table className="data-table"><thead><tr><th>Type</th><th>User</th><th>Description</th><th>Result</th><th>Time</th></tr></thead><tbody><SkeletonTable rows={8} cols={5} /></tbody></table>
          ) : recentEvents.length === 0 ? (
            <div className="empty-hint">No events recorded for this device. Sync events to populate.</div>
          ) : (
            <table className="data-table">
              <thead>
                <tr><th>Type</th><th>User</th><th>Description</th><th>Result</th><th>Time</th></tr>
              </thead>
              <tbody>
                {recentEvents.map((e, i) => (
                  <tr key={e.id || i}>
                    <td><span className={`badge badge-${e.eventType || 'other'}`}>{e.eventType || 'other'}</span></td>
                    <td>{e.userId || 'N/A'}</td>
                    <td className="desc-cell">{e.description || '—'}</td>
                    <td>{e.authResult === 'success' ? '✅' : e.authResult === 'fail' ? '❌' : '—'}</td>
                    <td className="ts-cell">{formatTimestamp(e.timestamp)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  )
}

function InfoRow({ label, value, badge }) {
  return (
    <div className="info-row">
      <span className="info-label">{label}</span>
      {badge ? (
        <span className={`badge badge-${badge}`}>{String(value)}</span>
      ) : (
        <span className="info-value">{String(value)}</span>
      )}
    </div>
  )
}
