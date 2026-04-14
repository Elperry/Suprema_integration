import { useState, useEffect, useCallback } from 'react'
import { doorAPI, deviceAPI } from '../services/api'
import ErrorBanner from './ErrorBanner'
import { useNotification } from './Notifications'
import './Doors.css'

const NEW_DOOR_TEMPLATE = {
  name: '',
  entryDeviceId: '',
  exitDeviceId: '',
  relay: { deviceId: '', port: 0 },
  sensor: { deviceId: '', port: 0, type: 0 },
  button: { deviceId: '', port: 0, type: 0 },
  autoLockTimeout: 3,
  heldOpenTimeout: 0,
  instantLock: true,
  forcedOpenAlarm: true,
  heldOpenAlarm: true,
}

export default function Doors() {
  const notify = useNotification()
  const [devices, setDevices] = useState([])
  const [selectedDeviceId, setSelectedDeviceId] = useState('')
  const [doors, setDoors] = useState([])
  const [loading, setLoading] = useState(false)
  const [actionLoading, setActionLoading] = useState({})
  const [error, setError] = useState(null)
  const [success, _setSuccess] = useState(null)
  const setSuccess = (msg) => { _setSuccess(msg); if (msg) notify.success(msg) }

  // Modal states
  const [showModal, setShowModal] = useState(false)
  const [editingDoor, setEditingDoor] = useState(null)
  const [form, setForm] = useState({ name: '', autoLockTimeout: 3 })
  const [confirmDelete, setConfirmDelete] = useState(null)
  const [unlockDuration, setUnlockDuration] = useState(5)
  const [doorStatus, setDoorStatus] = useState({})

  // Access Control panel
  const [activeTab, setActiveTab] = useState('doors') // doors, access-levels, schedules, access-groups
  const [accessLevels, setAccessLevels] = useState([])
  const [schedules, setSchedules] = useState([])
  const [accessGroups, setAccessGroups] = useState([])
  const [acLoading, setAcLoading] = useState(false)

  // Create modals for access control
  const [showALModal, setShowALModal] = useState(false)
  const [alForm, setAlForm] = useState({ name: '', doorSchedules: [] })
  const [showSchedModal, setShowSchedModal] = useState(false)
  const [schedForm, setSchedForm] = useState({ name: '', startTime: '08:00', endTime: '17:00' })
  const [showAGModal, setShowAGModal] = useState(false)
  const [agForm, setAgForm] = useState({ name: '', levelIds: [] })

  useEffect(() => {
    loadDevices()
  }, [])

  const loadDevices = async () => {
    try {
      const res = await deviceAPI.getAll()
      const list = res.data?.data || res.data || []
      setDevices(list)
      if (list.length > 0 && !selectedDeviceId) {
        setSelectedDeviceId(String(list[0].id))
      }
    } catch (e) {
      setError(e.userMessage || 'Failed to load devices')
    }
  }

  const loadDoors = useCallback(async () => {
    if (!selectedDeviceId) return
    setLoading(true)
    setError(null)
    try {
      const res = await doorAPI.getAll(selectedDeviceId)
      setDoors(res.data?.data || res.data || [])
    } catch (e) {
      setError(e.userMessage || 'Failed to load doors. Device may be offline.')
      setDoors([])
    } finally {
      setLoading(false)
    }
  }, [selectedDeviceId])

  useEffect(() => {
    if (selectedDeviceId) loadDoors()
  }, [loadDoors, selectedDeviceId])

  const setActionState = (key, val) => setActionLoading(p => ({ ...p, [key]: val }))

  const handleUnlock = async (door) => {
    const key = `unlock-${door.doorId ?? door.id}`
    setActionState(key, true)
    setError(null)
    try {
      await doorAPI.unlock(selectedDeviceId, door.doorId ?? door.id, unlockDuration)
      setSuccess(`Door "${door.name || door.doorId}" unlocked for ${unlockDuration}s`)
    } catch (e) {
      setError(e.userMessage || 'Unlock failed')
    } finally {
      setActionState(key, false)
    }
  }

  const handleLock = async (door) => {
    const key = `lock-${door.doorId ?? door.id}`
    setActionState(key, true)
    setError(null)
    try {
      await doorAPI.lock(selectedDeviceId, door.doorId ?? door.id)
      setSuccess(`Door "${door.name || door.doorId}" locked`)
    } catch (e) {
      setError(e.userMessage || 'Lock failed')
    } finally {
      setActionState(key, false)
    }
  }

  const handleGetStatus = async (door) => {
    const key = `status-${door.doorId ?? door.id}`
    setActionState(key, true)
    try {
      const res = await doorAPI.getStatus(selectedDeviceId, door.doorId ?? door.id)
      setDoorStatus(p => ({ ...p, [door.doorId ?? door.id]: res.data?.data || res.data }))
    } catch (e) {
      setDoorStatus(p => ({ ...p, [door.doorId ?? door.id]: { error: e.userMessage || 'Failed' } }))
    } finally {
      setActionState(key, false)
    }
  }

  // Access control data loaders
  const loadAccessLevels = async () => {
    if (!selectedDeviceId) return
    setAcLoading(true)
    try {
      const res = await doorAPI.getAccessLevels(selectedDeviceId)
      setAccessLevels(res.data?.data || [])
    } catch (e) {
      setError(e.userMessage || 'Failed to load access levels')
    } finally {
      setAcLoading(false)
    }
  }

  const loadSchedules = async () => {
    if (!selectedDeviceId) return
    setAcLoading(true)
    try {
      const res = await doorAPI.getSchedules(selectedDeviceId)
      setSchedules(res.data?.data || [])
    } catch (e) {
      setError(e.userMessage || 'Failed to load schedules')
    } finally {
      setAcLoading(false)
    }
  }

  const loadAccessGroups = async () => {
    if (!selectedDeviceId) return
    setAcLoading(true)
    try {
      const res = await doorAPI.getAccessGroups(selectedDeviceId)
      setAccessGroups(res.data?.data || [])
    } catch (e) {
      setError(e.userMessage || 'Failed to load access groups')
    } finally {
      setAcLoading(false)
    }
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    if (tab === 'access-levels') loadAccessLevels()
    else if (tab === 'schedules') loadSchedules()
    else if (tab === 'access-groups') loadAccessGroups()
  }

  const handleDeleteAccessLevel = async (id) => {
    if (!confirm(`Delete access level ${id}?`)) return
    try {
      await doorAPI.deleteAccessLevels(selectedDeviceId, [id])
      setSuccess('Access level deleted')
      loadAccessLevels()
    } catch (e) {
      setError(e.userMessage || 'Delete failed')
    }
  }

  const handleDeleteSchedule = async (id) => {
    if (!confirm(`Delete schedule ${id}?`)) return
    try {
      await doorAPI.deleteSchedules(selectedDeviceId, [id])
      setSuccess('Schedule deleted')
      loadSchedules()
    } catch (e) {
      setError(e.userMessage || 'Delete failed')
    }
  }

  const handleDeleteAccessGroup = async (id) => {
    if (!confirm(`Delete access group ${id}?`)) return
    try {
      await doorAPI.deleteAccessGroups(selectedDeviceId, [id])
      setSuccess('Access group deleted')
      loadAccessGroups()
    } catch (e) {
      setError(e.userMessage || 'Delete failed')
    }
  }

  const openCreate = () => {
    setEditingDoor(null)
    setForm({ name: '', autoLockTimeout: 3 })
    setShowModal(true)
  }

  const openEdit = (door) => {
    setEditingDoor(door)
    setForm({ name: door.name || '', autoLockTimeout: door.autoLockTimeout ?? 3 })
    setShowModal(true)
  }

  const handleSave = async () => {
    if (!form.name.trim()) { setError('Door name is required'); return }
    setActionState('save', true)
    setError(null)
    try {
      if (editingDoor) {
        await doorAPI.update(selectedDeviceId, editingDoor.doorId ?? editingDoor.id, {
          ...editingDoor,
          name: form.name,
          autoLockTimeout: Number(form.autoLockTimeout),
        })
        setSuccess('Door updated successfully')
      } else {
        await doorAPI.create(selectedDeviceId, {
          ...NEW_DOOR_TEMPLATE,
          name: form.name,
          autoLockTimeout: Number(form.autoLockTimeout),
        })
        setSuccess('Door created successfully')
      }
      setShowModal(false)
      loadDoors()
    } catch (e) {
      setError(e.userMessage || 'Save failed')
    } finally {
      setActionState('save', false)
    }
  }

  const handleDelete = async (door) => {
    setActionState(`del-${door.doorId ?? door.id}`, true)
    setError(null)
    try {
      await doorAPI.delete(selectedDeviceId, door.doorId ?? door.id)
      setSuccess('Door deleted')
      setConfirmDelete(null)
      loadDoors()
    } catch (e) {
      setError(e.userMessage || 'Delete failed')
    } finally {
      setActionState(`del-${door.doorId ?? door.id}`, false)
    }
  }

  const dismissAlerts = () => { setError(null); setSuccess(null) }

  // Create handlers for access control items
  const handleCreateAccessLevel = async () => {
    if (!alForm.name.trim()) { setError('Access level name is required'); return }
    setAcLoading(true)
    try {
      const doorSchedules = alForm.doorSchedules.length > 0
        ? alForm.doorSchedules
        : doors.map(d => ({ doorId: d.doorId ?? d.id, scheduleId: 1 }))
      await doorAPI.createAccessLevel(selectedDeviceId, { name: alForm.name, doorSchedules })
      setSuccess('Access level created')
      setShowALModal(false)
      setAlForm({ name: '', doorSchedules: [] })
      loadAccessLevels()
    } catch (e) { setError(e.userMessage || 'Failed to create access level') }
    finally { setAcLoading(false) }
  }

  const handleCreateSchedule = async () => {
    if (!schedForm.name.trim()) { setError('Schedule name is required'); return }
    setAcLoading(true)
    try {
      const [sh, sm] = schedForm.startTime.split(':').map(Number)
      const [eh, em] = schedForm.endTime.split(':').map(Number)
      // Create a weekly schedule with same hours every day (Mon-Sun)
      const dailySchedules = Array.from({ length: 7 }, () => ({
        periods: [{ startHour: sh, startMinute: sm, endHour: eh, endMinute: em }]
      }))
      await doorAPI.createSchedule(selectedDeviceId, { name: schedForm.name, dailySchedules })
      setSuccess('Schedule created')
      setShowSchedModal(false)
      setSchedForm({ name: '', startTime: '08:00', endTime: '17:00' })
      loadSchedules()
    } catch (e) { setError(e.userMessage || 'Failed to create schedule') }
    finally { setAcLoading(false) }
  }

  const handleCreateAccessGroup = async () => {
    if (!agForm.name.trim()) { setError('Access group name is required'); return }
    setAcLoading(true)
    try {
      await doorAPI.createAccessGroup(selectedDeviceId, { name: agForm.name, levelIds: agForm.levelIds })
      setSuccess('Access group created')
      setShowAGModal(false)
      setAgForm({ name: '', levelIds: [] })
      loadAccessGroups()
    } catch (e) { setError(e.userMessage || 'Failed to create access group') }
    finally { setAcLoading(false) }
  }

  const selectedDevice = devices.find(d => String(d.id) === String(selectedDeviceId))

  return (
    <div className="doors-page">
      <div className="page-header">
        <h2>🚪 Doors</h2>
        <div className="page-stats">
          <span className="stat-badge info">{doors.length} doors</span>
        </div>
      </div>

      <ErrorBanner error={error} onDismiss={dismissAlerts} />
      {success && (
        <div className="alert alert-success">
          <span>✅ {success}</span>
          <button onClick={dismissAlerts} className="btn-close">✕</button>
        </div>
      )}

      {/* Device Selector */}
      <div className="card toolbar-card">
        <div className="toolbar-row">
          <div className="toolbar-field">
            <label>Device</label>
            <select className="select-input wide" value={selectedDeviceId} onChange={e => setSelectedDeviceId(e.target.value)}>
              <option value="">— Select Device —</option>
              {devices.map(d => (
                <option key={d.id} value={d.id}>
                  {d.name || d.ip} ({d.ip}:{d.port || 51211}) — {d.status || 'unknown'}
                </option>
              ))}
            </select>
          </div>
          <div className="toolbar-field">
            <label>Unlock Duration (s)</label>
            <input type="number" className="search-input narrow" min={1} max={300} value={unlockDuration} onChange={e => setUnlockDuration(Number(e.target.value))} />
          </div>
          <div className="toolbar-actions">
            <button className="btn btn-primary" onClick={openCreate} disabled={!selectedDeviceId}>+ Add Door</button>
            <button className="btn btn-secondary" onClick={loadDoors} disabled={!selectedDeviceId}>↻ Refresh</button>
          </div>
        </div>
        {selectedDevice && (
          <div className="device-info-bar">
            <span className={`dot ${selectedDevice.status === 'connected' ? 'online' : 'offline'}`} />
            <span>{selectedDevice.name || selectedDevice.ip}</span>
            <span className="dim">· {selectedDevice.ip}:{selectedDevice.port || 51211}</span>
            <span className={`badge badge-${selectedDevice.status === 'connected' ? 'success' : 'neutral'}`}>{selectedDevice.status || 'unknown'}</span>
          </div>
        )}
      </div>

      {/* Tab Navigation */}
      {selectedDeviceId && (
        <div className="card" style={{ padding: '0.5rem 1rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {[
              { key: 'doors', label: '🚪 Doors' },
              { key: 'access-levels', label: '🔐 Access Levels' },
              { key: 'schedules', label: '📅 Schedules' },
              { key: 'access-groups', label: '👥 Access Groups' }
            ].map(tab => (
              <button
                key={tab.key}
                className={`btn btn-sm ${activeTab === tab.key ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => handleTabChange(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Doors Table */}
      {activeTab === 'doors' && (
      <div className="card">
        {loading ? (
          <div className="loading-row"><div className="spinner" /><span>Loading doors…</span></div>
        ) : !selectedDeviceId ? (
          <div className="empty-cell">Select a device to view its doors.</div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Door ID</th>
                <th>Name</th>
                <th>Auto-Lock (s)</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {doors.length === 0 ? (
                <tr><td colSpan={5} className="empty-cell">No doors found on this device.</td></tr>
              ) : doors.map((door, idx) => {
                const doorId = door.doorId ?? door.id ?? idx
                const status = doorStatus[doorId]
                return (
                  <tr key={doorId}>
                    <td><code>{doorId}</code></td>
                    <td><strong>{door.name || '—'}</strong></td>
                    <td>{door.autoLockTimeout ?? '—'}s</td>
                    <td>
                      {status ? (
                        status.error
                          ? <span className="badge badge-neutral">Error</span>
                          : <span className="badge badge-in">
                              {status.isOpen ? 'Open' : 'Closed'} · {status.isLocked ? 'Locked' : 'Unlocked'}
                            </span>
                      ) : (
                        <button className="btn btn-sm btn-secondary" disabled={actionLoading[`status-${doorId}`]} onClick={() => handleGetStatus(door)}>
                          {actionLoading[`status-${doorId}`] ? '…' : 'Check'}
                        </button>
                      )}
                    </td>
                    <td className="actions-cell">
                      <button
                        className="btn btn-sm btn-success"
                        disabled={actionLoading[`unlock-${doorId}`]}
                        onClick={() => handleUnlock(door)}
                        title={`Unlock for ${unlockDuration}s`}
                      >
                        {actionLoading[`unlock-${doorId}`] ? '…' : '🔓 Unlock'}
                      </button>
                      <button
                        className="btn btn-sm btn-warning"
                        disabled={actionLoading[`lock-${doorId}`]}
                        onClick={() => handleLock(door)}
                      >
                        {actionLoading[`lock-${doorId}`] ? '…' : '🔒 Lock'}
                      </button>
                      <button className="btn btn-sm btn-secondary" onClick={() => openEdit(door)}>✏️ Edit</button>
                      <button className="btn btn-sm btn-danger" onClick={() => setConfirmDelete(door)}>🗑</button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
      )}

      {/* Access Levels Panel */}
      {activeTab === 'access-levels' && (
        <div className="card">
          <div className="card-header-flex" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3>🔐 Access Levels</h3>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className="btn btn-primary btn-sm" onClick={() => setShowALModal(true)} disabled={!selectedDeviceId}>+ Create</button>
              <button className="btn btn-secondary btn-sm" onClick={loadAccessLevels}>↻ Refresh</button>
            </div>
          </div>
          {acLoading ? (
            <div className="loading-row"><div className="spinner" /><span>Loading…</span></div>
          ) : (
            <table className="data-table">
              <thead>
                <tr><th>ID</th><th>Name</th><th>Door Schedules</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {accessLevels.length === 0 ? (
                  <tr><td colSpan={4} className="empty-cell">No access levels configured.</td></tr>
                ) : accessLevels.map(al => (
                  <tr key={al.id}>
                    <td><code>{al.id}</code></td>
                    <td><strong>{al.name || '—'}</strong></td>
                    <td>{al.doorschedulesList?.length || al.doorSchedules?.length || 0} door-schedule pairs</td>
                    <td>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDeleteAccessLevel(al.id)}>🗑 Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Schedules Panel */}
      {activeTab === 'schedules' && (
        <div className="card">
          <div className="card-header-flex" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3>📅 Schedules</h3>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className="btn btn-primary btn-sm" onClick={() => setShowSchedModal(true)} disabled={!selectedDeviceId}>+ Create</button>
              <button className="btn btn-secondary btn-sm" onClick={loadSchedules}>↻ Refresh</button>
            </div>
          </div>
          {acLoading ? (
            <div className="loading-row"><div className="spinner" /><span>Loading…</span></div>
          ) : (
            <table className="data-table">
              <thead>
                <tr><th>ID</th><th>Name</th><th>Daily Schedules</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {schedules.length === 0 ? (
                  <tr><td colSpan={4} className="empty-cell">No schedules configured.</td></tr>
                ) : schedules.map(s => (
                  <tr key={s.id}>
                    <td><code>{s.id}</code></td>
                    <td><strong>{s.name || '—'}</strong></td>
                    <td>{s.dailyschedulesList?.length || s.dailySchedules?.length || 0} day(s)</td>
                    <td>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDeleteSchedule(s.id)}>🗑 Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Access Groups Panel */}
      {activeTab === 'access-groups' && (
        <div className="card">
          <div className="card-header-flex" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3>👥 Access Groups</h3>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className="btn btn-primary btn-sm" onClick={() => setShowAGModal(true)} disabled={!selectedDeviceId}>+ Create</button>
              <button className="btn btn-secondary btn-sm" onClick={loadAccessGroups}>↻ Refresh</button>
            </div>
          </div>
          {acLoading ? (
            <div className="loading-row"><div className="spinner" /><span>Loading…</span></div>
          ) : (
            <table className="data-table">
              <thead>
                <tr><th>ID</th><th>Name</th><th>Access Levels</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {accessGroups.length === 0 ? (
                  <tr><td colSpan={4} className="empty-cell">No access groups configured.</td></tr>
                ) : accessGroups.map(g => (
                  <tr key={g.id}>
                    <td><code>{g.id}</code></td>
                    <td><strong>{g.name || '—'}</strong></td>
                    <td>{g.levelidsList?.length || g.levelIds?.length || 0} level(s)</td>
                    <td>
                      <button className="btn btn-sm btn-danger" onClick={() => handleDeleteAccessGroup(g.id)}>🗑 Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Create / Edit Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-box small" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingDoor ? '✏️ Edit Door' : '➕ Add Door'}</h3>
              <button className="btn-close" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="form-field">
                <label>Door Name *</label>
                <input type="text" className="search-input" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Main Entrance" />
              </div>
              <div className="form-field">
                <label>Auto-Lock Timeout (seconds)</label>
                <input type="number" className="search-input" min={0} max={3600} value={form.autoLockTimeout} onChange={e => setForm(p => ({ ...p, autoLockTimeout: e.target.value }))} />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" disabled={actionLoading.save} onClick={handleSave}>
                {actionLoading.save ? 'Saving…' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Access Level Modal */}
      {showALModal && (
        <div className="modal-overlay" onClick={() => setShowALModal(false)}>
          <div className="modal-box small" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>➕ Create Access Level</h3>
              <button className="btn-close" onClick={() => setShowALModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="form-field">
                <label>Name *</label>
                <input type="text" className="search-input" value={alForm.name} onChange={e => setAlForm(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Full Access" />
              </div>
              <p className="hint">All {doors.length} door(s) on this device will be assigned with the default schedule.</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowALModal(false)}>Cancel</button>
              <button className="btn btn-primary" disabled={acLoading} onClick={handleCreateAccessLevel}>
                {acLoading ? 'Creating…' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Schedule Modal */}
      {showSchedModal && (
        <div className="modal-overlay" onClick={() => setShowSchedModal(false)}>
          <div className="modal-box small" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>➕ Create Schedule</h3>
              <button className="btn-close" onClick={() => setShowSchedModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="form-field">
                <label>Name *</label>
                <input type="text" className="search-input" value={schedForm.name} onChange={e => setSchedForm(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Business Hours" />
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div className="form-field" style={{ flex: 1 }}>
                  <label>Start Time</label>
                  <input type="time" className="search-input" value={schedForm.startTime} onChange={e => setSchedForm(p => ({ ...p, startTime: e.target.value }))} />
                </div>
                <div className="form-field" style={{ flex: 1 }}>
                  <label>End Time</label>
                  <input type="time" className="search-input" value={schedForm.endTime} onChange={e => setSchedForm(p => ({ ...p, endTime: e.target.value }))} />
                </div>
              </div>
              <p className="hint">Schedule will apply the same hours for all 7 days of the week.</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowSchedModal(false)}>Cancel</button>
              <button className="btn btn-primary" disabled={acLoading} onClick={handleCreateSchedule}>
                {acLoading ? 'Creating…' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Access Group Modal */}
      {showAGModal && (
        <div className="modal-overlay" onClick={() => setShowAGModal(false)}>
          <div className="modal-box small" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>➕ Create Access Group</h3>
              <button className="btn-close" onClick={() => setShowAGModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="form-field">
                <label>Name *</label>
                <input type="text" className="search-input" value={agForm.name} onChange={e => setAgForm(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Engineering Team" />
              </div>
              <div className="form-field">
                <label>Access Levels</label>
                {accessLevels.length === 0 ? (
                  <p className="hint">No access levels found. Create an access level first.</p>
                ) : (
                  <div style={{ maxHeight: '150px', overflowY: 'auto', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '0.5rem' }}>
                    {accessLevels.map(al => (
                      <label key={al.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.25rem 0', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={agForm.levelIds.includes(al.id)}
                          onChange={e => {
                            if (e.target.checked) setAgForm(p => ({ ...p, levelIds: [...p.levelIds, al.id] }))
                            else setAgForm(p => ({ ...p, levelIds: p.levelIds.filter(id => id !== al.id) }))
                          }}
                        />
                        <span>{al.name || `Level ${al.id}`}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowAGModal(false)}>Cancel</button>
              <button className="btn btn-primary" disabled={acLoading} onClick={handleCreateAccessGroup}>
                {acLoading ? 'Creating…' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Delete Modal */}
      {confirmDelete && (
        <div className="modal-overlay" onClick={() => setConfirmDelete(null)}>
          <div className="modal-box small" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>🗑 Confirm Delete</h3>
              <button className="btn-close" onClick={() => setConfirmDelete(null)}>✕</button>
            </div>
            <div className="modal-body">
              <p>Delete door <strong>"{confirmDelete.name || confirmDelete.doorId}"</strong>?</p>
              <p className="hint">This will permanently remove this door configuration from the device.</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setConfirmDelete(null)}>Cancel</button>
              <button className="btn btn-danger" disabled={actionLoading[`del-${confirmDelete.doorId ?? confirmDelete.id}`]} onClick={() => handleDelete(confirmDelete)}>
                {actionLoading[`del-${confirmDelete.doorId ?? confirmDelete.id}`] ? 'Deleting…' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
