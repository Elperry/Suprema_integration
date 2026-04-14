import { useCallback, useEffect, useMemo, useState } from 'react'
import { eventAPI, gateEventAPI, userAPI } from '../services/api'
import { useNotification } from './Notifications'
import ErrorBanner from './ErrorBanner'
import './SyncCenter.css'

const PRESET_KEY = 'suprema-sync-center-presets'

const formatDateTime = (value) => {
  if (!value) return '—'
  try {
    return new Date(value).toLocaleString()
  } catch {
    return '—'
  }
}

const getFilenameFromDisposition = (disposition, fallback) => {
  if (!disposition) return fallback
  const match = disposition.match(/filename="?([^";]+)"?/i)
  return match?.[1] || fallback
}

const loadPresets = () => {
  try {
    const raw = localStorage.getItem(PRESET_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export default function SyncCenter() {
  const notify = useNotification()
  const [overview, setOverview] = useState(null)
  const [replication, setReplication] = useState(null)
  const [deviceReport, setDeviceReport] = useState(null)
  const [loading, setLoading] = useState(true)
  const [detailLoading, setDetailLoading] = useState(false)
  const [error, setError] = useState(null)
  const [actionKey, setActionKey] = useState(null)
  const [filters, setFilters] = useState({
    issueFilter: 'all',
    selectedDeviceId: ''
  })
  const [presets, setPresets] = useState(loadPresets)

  const persistPresets = useCallback((nextPresets) => {
    setPresets(nextPresets)
    localStorage.setItem(PRESET_KEY, JSON.stringify(nextPresets))
  }, [])

  const downloadResponse = useCallback(async (requestPromise, fallbackName) => {
    const response = await requestPromise
    const blob = response.data instanceof Blob ? response.data : new Blob([response.data])
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    const disposition = response.headers?.['content-disposition']
    link.href = url
    link.download = getFilenameFromDisposition(disposition, fallbackName)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }, [])

  const loadOverview = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [reconciliationRes, replicationRes] = await Promise.all([
        userAPI.getReconciliation(),
        eventAPI.getReplicationHealth()
      ])

      setOverview(reconciliationRes.data?.data || null)
      setReplication(replicationRes.data?.data || null)
    } catch (err) {
      setError(err.userMessage || 'Failed to load synchronization center data')
    } finally {
      setLoading(false)
    }
  }, [])

  const loadDeviceReport = useCallback(async (deviceId) => {
    if (!deviceId) {
      setDeviceReport(null)
      return
    }

    setDetailLoading(true)
    try {
      const response = await userAPI.getDeviceReconciliation(deviceId)
      setDeviceReport(response.data?.data || null)
    } catch (err) {
      notify.error(err.userMessage || 'Failed to load device reconciliation report')
    } finally {
      setDetailLoading(false)
    }
  }, [notify])

  useEffect(() => {
    loadOverview()
  }, [loadOverview])

  useEffect(() => {
    if (filters.selectedDeviceId) {
      loadDeviceReport(filters.selectedDeviceId)
    } else {
      setDeviceReport(null)
    }
  }, [filters.selectedDeviceId, loadDeviceReport])

  const visibleDevices = useMemo(() => {
    const devices = overview?.devices || []
    if (filters.issueFilter === 'issues') {
      return devices.filter((entry) => {
        const summary = entry.summary || {}
        return Boolean(entry.error || entry.warning || summary.missingOnDevice || summary.missingInDatabase || summary.cardMismatches)
      })
    }
    return devices
  }, [overview, filters.issueFilter])

  const selectedReplicationDevice = useMemo(() => {
    if (!filters.selectedDeviceId || !replication?.devices) return null
    return replication.devices.find((entry) => String(entry.deviceId) === String(filters.selectedDeviceId)) || null
  }, [filters.selectedDeviceId, replication])

  const savePreset = () => {
    const name = window.prompt('Preset name')
    if (!name) return

    const nextPresets = [
      ...presets.filter((preset) => preset.name !== name),
      { name, filters }
    ]
    persistPresets(nextPresets)
    notify.success(`Saved preset “${name}”`)
  }

  const applyPreset = (name) => {
    const preset = presets.find((entry) => entry.name === name)
    if (!preset) return
    setFilters(preset.filters)
  }

  const deletePreset = (name) => {
    persistPresets(presets.filter((preset) => preset.name !== name))
    notify.info(`Deleted preset “${name}”`)
  }

  const runAction = async (key, action, successMessage) => {
    setActionKey(key)
    try {
      await action()
      notify.success(successMessage)
      await loadOverview()
      if (filters.selectedDeviceId) {
        await loadDeviceReport(filters.selectedDeviceId)
      }
    } catch (err) {
      notify.error(err.userMessage || err.message || 'Operation failed')
    } finally {
      setActionKey(null)
    }
  }

  const exportReconciliation = async (format) => {
    try {
      await downloadResponse(
        userAPI.exportReconciliation({ format }),
        `user_reconciliation.${format === 'xls' ? 'xls' : format}`
      )
      notify.success(`Reconciliation report exported as ${format.toUpperCase()}`)
    } catch (err) {
      notify.error(err.userMessage || 'Failed to export reconciliation report')
    }
  }

  const exportSyncedEvents = async (format) => {
    try {
      await downloadResponse(
        eventAPI.exportSyncedFromDB({ format, deviceId: filters.selectedDeviceId || undefined, limit: 5000 }),
        `synced_events.${format === 'xls' ? 'xls' : format}`
      )
      notify.success(`Replicated events exported as ${format.toUpperCase()}`)
    } catch (err) {
      notify.error(err.userMessage || 'Failed to export replicated events')
    }
  }

  const exportGateEvents = async (format) => {
    try {
      await downloadResponse(
        gateEventAPI.exportReport({ format, limit: 5000 }),
        `gate_events.${format === 'xls' ? 'xls' : format}`
      )
      notify.success(`Gate events exported as ${format.toUpperCase()}`)
    } catch (err) {
      notify.error(err.userMessage || 'Failed to export gate events')
    }
  }

  return (
    <div className="sync-center-page">
      <div className="page-header sync-header">
        <div>
          <h2>♻️ Sync Center</h2>
          <p className="sync-subtitle">Repair device drift, review replication health, and export operational reports.</p>
        </div>
        <div className="sync-toolbar">
          <button className="btn btn-secondary" onClick={loadOverview}>↻ Refresh</button>
          <button
            className="btn btn-primary"
            disabled={actionKey === 'repair-all'}
            onClick={() => runAction('repair-all', () => userAPI.repairAllDevices(), 'Batch device repair completed')}
          >
            {actionKey === 'repair-all' ? 'Repairing…' : '🔧 Repair All'}
          </button>
          <button className="btn btn-secondary" onClick={savePreset}>Save Preset</button>
        </div>
      </div>

      <ErrorBanner error={error} onDismiss={() => setError(null)} />

      <div className="sync-filters card">
        <div className="filter-grid sync-filter-grid">
          <div className="filter-field">
            <label>Device Focus</label>
            <select className="select-input" value={filters.selectedDeviceId} onChange={(e) => setFilters((prev) => ({ ...prev, selectedDeviceId: e.target.value }))}>
              <option value="">All devices</option>
              {(overview?.devices || []).map((entry) => (
                <option key={entry.device.databaseDeviceId} value={entry.device.databaseDeviceId}>
                  {entry.device.name || `Device ${entry.device.databaseDeviceId}`}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-field">
            <label>Visibility</label>
            <select className="select-input" value={filters.issueFilter} onChange={(e) => setFilters((prev) => ({ ...prev, issueFilter: e.target.value }))}>
              <option value="all">All devices</option>
              <option value="issues">Devices with issues only</option>
            </select>
          </div>
          <div className="filter-field">
            <label>Saved Preset</label>
            <div className="preset-row">
              <select className="select-input" defaultValue="" onChange={(e) => e.target.value && applyPreset(e.target.value)}>
                <option value="">Choose preset</option>
                {presets.map((preset) => (
                  <option key={preset.name} value={preset.name}>{preset.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        {presets.length > 0 && (
          <div className="preset-chips">
            {presets.map((preset) => (
              <button key={preset.name} type="button" className="preset-chip" onClick={() => applyPreset(preset.name)}>
                <span>{preset.name}</span>
                <span className="preset-chip-close" onClick={(event) => { event.stopPropagation(); deletePreset(preset.name) }}>×</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {loading ? (
        <div className="loading-row"><div className="spinner" /><span>Loading sync center…</span></div>
      ) : (
        <>
          <div className="stats-row sync-stats">
            <div className="stat-card"><div className="stat-value">{overview?.summary?.totalDevices ?? 0}</div><div className="stat-label">Registered Devices</div></div>
            <div className="stat-card"><div className="stat-value">{overview?.summary?.devicesWithIssues ?? 0}</div><div className="stat-label">Devices With Drift</div></div>
            <div className="stat-card"><div className="stat-value">{overview?.summary?.missingOnDevice ?? 0}</div><div className="stat-label">Missing On Device</div></div>
            <div className="stat-card"><div className="stat-value">{overview?.summary?.cardMismatches ?? 0}</div><div className="stat-label">Card Mismatches</div></div>
            <div className="stat-card"><div className="stat-value">{replication?.service?.totalPersisted ?? 0}</div><div className="stat-label">Persisted Events</div></div>
            <div className="stat-card"><div className="stat-value">{replication?.service?.running ? 'Live' : 'Stopped'}</div><div className="stat-label">Replication Service</div></div>
          </div>

          <div className="sync-actions card">
            <div>
              <div className="filter-card-title">📤 Report Exports</div>
              <p className="helper-text">Download reconciliation, replicated events, and gate-event reports in operational formats.</p>
            </div>
            <div className="export-groups">
              <div className="export-group">
                <span>Reconciliation</span>
                <button className="btn btn-secondary btn-sm" onClick={() => exportReconciliation('csv')}>CSV</button>
                <button className="btn btn-secondary btn-sm" onClick={() => exportReconciliation('xls')}>Excel</button>
              </div>
              <div className="export-group">
                <span>Replicated Events</span>
                <button className="btn btn-secondary btn-sm" onClick={() => exportSyncedEvents('csv')}>CSV</button>
                <button className="btn btn-secondary btn-sm" onClick={() => exportSyncedEvents('xls')}>Excel</button>
              </div>
              <div className="export-group">
                <span>Gate Events</span>
                <button className="btn btn-secondary btn-sm" onClick={() => exportGateEvents('csv')}>CSV</button>
                <button className="btn btn-secondary btn-sm" onClick={() => exportGateEvents('xls')}>Excel</button>
              </div>
            </div>
          </div>

          <div className="sync-layout">
            <div className="card sync-device-card">
              <div className="card-header">
                <h3 className="card-title">Device Drift Overview</h3>
                <span className="stat-badge info">{visibleDevices.length} shown</span>
              </div>
              <table className="data-table sync-table">
                <thead>
                  <tr>
                    <th>Device</th>
                    <th>Connection</th>
                    <th>Missing</th>
                    <th>DB Only</th>
                    <th>Mismatches</th>
                    <th>Lag</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleDevices.length === 0 ? (
                    <tr><td colSpan={7} className="empty-cell">No devices match the current filters.</td></tr>
                  ) : visibleDevices.map((entry) => {
                    const replicationEntry = replication?.devices?.find((device) => String(device.deviceId) === String(entry.device.databaseDeviceId))
                    const isSelected = String(filters.selectedDeviceId) === String(entry.device.databaseDeviceId)
                    const repairKey = `repair:${entry.device.databaseDeviceId}`
                    const importKey = `import:${entry.device.databaseDeviceId}`

                    return (
                      <tr key={entry.device.databaseDeviceId} className={isSelected ? 'selected-row' : ''}>
                        <td>
                          <button type="button" className="link-button" onClick={() => setFilters((prev) => ({ ...prev, selectedDeviceId: String(entry.device.databaseDeviceId) }))}>
                            {entry.device.name || `Device ${entry.device.databaseDeviceId}`}
                          </button>
                          <div className="cell-subtitle">{entry.device.ip}:{entry.device.port}</div>
                        </td>
                        <td>
                          <span className={`status-pill ${entry.device.connected ? 'online' : 'offline'}`}>
                            {entry.device.connected ? 'Online' : 'Offline'}
                          </span>
                        </td>
                        <td>{entry.summary.missingOnDevice}</td>
                        <td>{entry.summary.missingInDatabase}</td>
                        <td>{entry.summary.cardMismatches}</td>
                        <td>{replicationEntry?.replicationLagSeconds ?? '—'}s</td>
                        <td>
                          <div className="table-actions">
                            <button
                              type="button"
                              className="btn btn-primary btn-sm"
                              disabled={actionKey === repairKey || !entry.device.connected}
                              onClick={() => runAction(repairKey, () => userAPI.repairDevice(entry.device.databaseDeviceId), `Repaired ${entry.device.name || `device ${entry.device.databaseDeviceId}`}`)}
                            >
                              {actionKey === repairKey ? 'Working…' : 'Repair'}
                            </button>
                            <button
                              type="button"
                              className="btn btn-secondary btn-sm"
                              disabled={actionKey === importKey || !entry.device.connected}
                              onClick={() => runAction(importKey, () => userAPI.importFromDevice(entry.device.databaseDeviceId), `Imported users from ${entry.device.name || `device ${entry.device.databaseDeviceId}`}`)}
                            >
                              {actionKey === importKey ? 'Working…' : 'Import'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            <div className="card sync-detail-card">
              <div className="card-header">
                <h3 className="card-title">Selected Device Detail</h3>
                {filters.selectedDeviceId && <span className="stat-badge info">Device #{filters.selectedDeviceId}</span>}
              </div>

              {!filters.selectedDeviceId ? (
                <div className="empty-state">Select a device from the table to inspect drift details and run targeted repairs.</div>
              ) : detailLoading ? (
                <div className="loading-row"><div className="spinner" /><span>Loading device detail…</span></div>
              ) : !deviceReport ? (
                <div className="empty-state">No detail available for the selected device.</div>
              ) : (
                <>
                  <div className="detail-grid">
                    <div className="detail-card">
                      <div className="detail-label">Matched Users</div>
                      <div className="detail-value">{deviceReport.summary.matched}</div>
                    </div>
                    <div className="detail-card">
                      <div className="detail-label">Last User Sync</div>
                      <div className="detail-value small">{formatDateTime(deviceReport.device.lastUserSync)}</div>
                    </div>
                    <div className="detail-card">
                      <div className="detail-label">Last Event Sync</div>
                      <div className="detail-value small">{formatDateTime(deviceReport.device.lastEventSync)}</div>
                    </div>
                    <div className="detail-card">
                      <div className="detail-label">Replication Lag</div>
                      <div className="detail-value small">{selectedReplicationDevice?.replicationLagSeconds ?? '—'} seconds</div>
                    </div>
                  </div>

                  <div className="detail-section">
                    <div className="section-header-row">
                      <h4>Missing On Device</h4>
                      <span className="stat-badge info">{deviceReport.differences.missingOnDevice.length}</span>
                    </div>
                    {deviceReport.differences.missingOnDevice.length === 0 ? <div className="empty-state compact">No DB-backed users are missing on this device.</div> : (
                      <div className="issue-list">
                        {deviceReport.differences.missingOnDevice.map((item) => {
                          const repairKey = `user:${item.userId}`
                          return (
                            <div key={`missing-${item.userId}`} className="issue-card">
                              <div>
                                <strong>{item.userId}</strong>
                                <div className="cell-subtitle">{item.employeeName || 'Unnamed employee'}</div>
                              </div>
                              <button
                                type="button"
                                className="btn btn-primary btn-sm"
                                disabled={actionKey === repairKey}
                                onClick={() => runAction(repairKey, () => userAPI.repairUser(filters.selectedDeviceId, item.userId), `Repaired user ${item.userId}`)}
                              >
                                {actionKey === repairKey ? 'Working…' : 'Repair User'}
                              </button>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>

                  <div className="detail-section">
                    <div className="section-header-row">
                      <h4>Card Mismatches</h4>
                      <span className="stat-badge info">{deviceReport.differences.cardMismatches.length}</span>
                    </div>
                    {deviceReport.differences.cardMismatches.length === 0 ? <div className="empty-state compact">No card mismatches detected.</div> : (
                      <div className="issue-list">
                        {deviceReport.differences.cardMismatches.map((item) => {
                          const repairKey = `mismatch:${item.userId}`
                          return (
                            <div key={`mismatch-${item.userId}`} className="issue-card issue-card-wide">
                              <div>
                                <strong>{item.userId}</strong>
                                <div className="cell-subtitle">DB: {item.databaseCardData || '—'} | Device: {item.deviceCardData || '—'}</div>
                              </div>
                              <button
                                type="button"
                                className="btn btn-primary btn-sm"
                                disabled={actionKey === repairKey}
                                onClick={() => runAction(repairKey, () => userAPI.repairUser(filters.selectedDeviceId, item.userId), `Aligned card for user ${item.userId}`)}
                              >
                                {actionKey === repairKey ? 'Working…' : 'Repair User'}
                              </button>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>

                  <div className="detail-section">
                    <div className="section-header-row">
                      <h4>Users Missing In DB</h4>
                      <span className="stat-badge info">{deviceReport.differences.missingInDatabase.length}</span>
                    </div>
                    {deviceReport.differences.missingInDatabase.length === 0 ? <div className="empty-state compact">No extra device-only users detected.</div> : (
                      <div className="issue-list">
                        {deviceReport.differences.missingInDatabase.map((item) => (
                          <div key={`device-only-${item.userId}`} className="issue-card issue-card-wide">
                            <div>
                              <strong>{item.userId}</strong>
                              <div className="cell-subtitle">{item.employeeName || 'Unknown device user'} | Card: {item.cardData || '—'}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}