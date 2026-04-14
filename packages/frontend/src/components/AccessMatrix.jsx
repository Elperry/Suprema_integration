import { useState, useEffect, useCallback } from 'react'
import { deviceAPI, doorAPI, userAPI, employeeAPI, enrollmentAPI } from '../services/api'
import { ErrorBanner } from './shared'
import './AccessMatrix.css'

export default function AccessMatrix() {
  const [devices, setDevices] = useState([])
  const [selectedDevice, setSelectedDevice] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  // Matrix data
  const [doors, setDoors] = useState([])
  const [accessGroups, setAccessGroups] = useState([])
  const [accessLevels, setAccessLevels] = useState([])
  const [employees, setEmployees] = useState([])
  const [userAccessMap, setUserAccessMap] = useState({}) // userId -> Set of accessGroupIds

  // UI state
  const [saving, setSaving] = useState(false)
  const [pendingChanges, setPendingChanges] = useState({}) // userId -> Set of groupIds (toggled)
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState('groups') // groups | doors

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

  const loadMatrixData = useCallback(async (deviceId) => {
    if (!deviceId) return
    setLoading(true)
    setError(null)
    setPendingChanges({})

    try {
      // Load doors, access groups, access levels, and employees in parallel
      const [doorsRes, groupsRes, levelsRes, employeesRes] = await Promise.allSettled([
        doorAPI.getAll(deviceId),
        doorAPI.getAccessGroups(deviceId),
        doorAPI.getAccessLevels(deviceId),
        enrollmentAPI.getEmployeesWithStatus({ limit: 200 }),
      ])

      const loadedDoors = doorsRes.status === 'fulfilled' ? (doorsRes.value.data.data || []) : []
      const loadedGroups = groupsRes.status === 'fulfilled' ? (groupsRes.value.data.data || []) : []
      const loadedLevels = levelsRes.status === 'fulfilled' ? (levelsRes.value.data.data || []) : []
      const loadedEmployees = employeesRes.status === 'fulfilled' ? (employeesRes.value.data.data || []) : []

      setDoors(loadedDoors)
      setAccessGroups(loadedGroups)
      setAccessLevels(loadedLevels)
      setEmployees(loadedEmployees)

      // Load access groups for all employees that have cards
      if (loadedEmployees.length > 0 && loadedGroups.length > 0) {
        try {
          const userIds = loadedEmployees.map(e => e.employee_id)
          const agRes = await userAPI.getAccessGroups(deviceId, userIds)
          const map = {}
          const agData = agRes.data.data || []
          if (Array.isArray(agData)) {
            agData.forEach(entry => {
              const uid = entry.userID || entry.userId
              const gids = entry.accessGroupIDs || entry.accessGroupIds || []
              if (uid) map[uid] = new Set(gids.map(Number))
            })
          }
          setUserAccessMap(map)
        } catch (e) {
          console.warn('Failed to load user access groups:', e)
          setUserAccessMap({})
        }
      }
    } catch (e) {
      setError(e.response?.data?.message || e.message || 'Failed to load access data')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (selectedDevice) {
      loadMatrixData(selectedDevice)
    }
  }, [selectedDevice, loadMatrixData])

  // Toggle an access group for an employee
  const toggleAccess = (employeeId, groupId) => {
    setPendingChanges(prev => {
      const updated = { ...prev }
      if (!updated[employeeId]) {
        // Start from current state
        const currentGroups = userAccessMap[employeeId] || new Set()
        updated[employeeId] = new Set(currentGroups)
      }
      if (updated[employeeId].has(groupId)) {
        updated[employeeId].delete(groupId)
      } else {
        updated[employeeId].add(groupId)
      }
      return updated
    })
  }

  // Check if a cell is checked (pending or actual)
  const isCellChecked = (employeeId, groupId) => {
    if (pendingChanges[employeeId]) {
      return pendingChanges[employeeId].has(groupId)
    }
    return (userAccessMap[employeeId] || new Set()).has(groupId)
  }

  // Check if a cell has been modified
  const isCellModified = (employeeId, groupId) => {
    if (!pendingChanges[employeeId]) return false
    const original = (userAccessMap[employeeId] || new Set()).has(groupId)
    const current = pendingChanges[employeeId].has(groupId)
    return original !== current
  }

  const hasChanges = Object.keys(pendingChanges).some(uid =>
    pendingChanges[uid] && [...pendingChanges[uid]].some(gid => {
      const original = (userAccessMap[uid] || new Set()).has(gid)
      return original !== pendingChanges[uid].has(gid)
    }) || [...(userAccessMap[uid] || new Set())].some(gid => !pendingChanges[uid].has(gid))
  )

  // Save all pending changes
  const handleSave = async () => {
    const changedUsers = Object.entries(pendingChanges)
      .filter(([uid]) => {
        const original = userAccessMap[uid] || new Set()
        const current = pendingChanges[uid]
        if (original.size !== current.size) return true
        for (const gid of original) if (!current.has(gid)) return true
        return false
      })
      .map(([uid, gids]) => ({
        userID: uid,
        accessGroupIDs: [...gids].map(Number),
      }))

    if (changedUsers.length === 0) return

    try {
      setSaving(true)
      setError(null)
      await userAPI.setAccessGroups(selectedDevice, changedUsers)

      // Update local state
      const newMap = { ...userAccessMap }
      changedUsers.forEach(({ userID, accessGroupIDs }) => {
        newMap[userID] = new Set(accessGroupIDs)
      })
      setUserAccessMap(newMap)
      setPendingChanges({})
      setSuccess(`Updated access groups for ${changedUsers.length} employee(s)`)
    } catch (e) {
      setError(e.response?.data?.message || e.message || 'Failed to save access changes')
    } finally {
      setSaving(false)
    }
  }

  const handleDiscard = () => {
    setPendingChanges({})
  }

  // Build door-to-group mapping for door view
  const doorGroupMap = {}
  accessGroups.forEach(ag => {
    const levels = ag.accessLevels || ag.levels || []
    levels.forEach(level => {
      const doorSchedules = level.doorSchedules || level.doors || []
      doorSchedules.forEach(ds => {
        const doorId = ds.doorID || ds.doorId
        if (doorId) {
          if (!doorGroupMap[doorId]) doorGroupMap[doorId] = []
          if (!doorGroupMap[doorId].includes(ag.ID || ag.id)) {
            doorGroupMap[doorId].push(ag.ID || ag.id)
          }
        }
      })
    })
  })

  const filteredEmployees = employees.filter(emp => {
    if (!searchQuery) return true
    const q = searchQuery.toLowerCase()
    return (
      (emp.name || '').toLowerCase().includes(q) ||
      String(emp.employee_id).toLowerCase().includes(q) ||
      (emp.department || '').toLowerCase().includes(q)
    )
  })

  const connectedDevices = devices.filter(d => d.status === 'connected')
  const selectedDeviceObj = devices.find(d => String(d.id) === String(selectedDevice))

  return (
    <div className="page">
      <h2>🔐 Access Control Matrix</h2>
      <p className="matrix-subtitle">Manage which employees have access to which areas. Select a device to view and edit access group assignments.</p>

      {/* Device Selector */}
      <div className="card matrix-toolbar">
        <div className="matrix-toolbar-row">
          <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
            <label>Device</label>
            <select
              value={selectedDevice}
              onChange={e => setSelectedDevice(e.target.value)}
              className="form-control"
            >
              <option value="">-- Select device --</option>
              {devices.map(d => (
                <option key={d.id} value={d.id} disabled={d.status !== 'connected'}>
                  {d.status === 'connected' ? '🟢' : '🔴'} {d.name} ({d.ip})
                </option>
              ))}
            </select>
          </div>

          {selectedDevice && (
            <>
              <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                <label>Search Employees</label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Filter by name, ID, department..."
                  className="form-control"
                />
              </div>
              <div className="matrix-view-toggle">
                <button
                  className={`toggle-btn ${viewMode === 'groups' ? 'active' : ''}`}
                  onClick={() => setViewMode('groups')}
                >
                  📋 By Groups
                </button>
                <button
                  className={`toggle-btn ${viewMode === 'doors' ? 'active' : ''}`}
                  onClick={() => setViewMode('doors')}
                >
                  🚪 By Doors
                </button>
              </div>
            </>
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
        <div className="matrix-empty">
          <div className="matrix-empty-icon">🔐</div>
          <h3>Select a Device</h3>
          <p>Choose a connected device to view and manage employee access permissions.</p>
        </div>
      ) : loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading access matrix...</p>
        </div>
      ) : (
        <>
          {/* Summary Stats */}
          <div className="matrix-stats">
            <div className="matrix-stat">
              <span className="matrix-stat-value">{doors.length}</span>
              <span className="matrix-stat-label">Doors</span>
            </div>
            <div className="matrix-stat">
              <span className="matrix-stat-value">{accessGroups.length}</span>
              <span className="matrix-stat-label">Access Groups</span>
            </div>
            <div className="matrix-stat">
              <span className="matrix-stat-value">{accessLevels.length}</span>
              <span className="matrix-stat-label">Access Levels</span>
            </div>
            <div className="matrix-stat">
              <span className="matrix-stat-value">{filteredEmployees.length}</span>
              <span className="matrix-stat-label">Employees</span>
            </div>
          </div>

          {/* Pending Changes Bar */}
          {hasChanges && (
            <div className="matrix-pending-bar">
              <span>⚡ You have unsaved changes</span>
              <div className="matrix-pending-actions">
                <button className="btn btn-secondary btn-sm" onClick={handleDiscard}>
                  Discard
                </button>
                <button className="btn btn-primary btn-sm" onClick={handleSave} disabled={saving}>
                  {saving ? 'Saving...' : '💾 Save Changes'}
                </button>
              </div>
            </div>
          )}

          {/* Matrix Table — Groups View */}
          {viewMode === 'groups' && accessGroups.length > 0 && (
            <div className="matrix-table-wrapper">
              <table className="matrix-table">
                <thead>
                  <tr>
                    <th className="matrix-name-col">Employee</th>
                    {accessGroups.map(ag => (
                      <th key={ag.ID || ag.id} className="matrix-group-col">
                        <div className="matrix-col-header">
                          <span className="matrix-col-label">{ag.name || ag.Name || `Group ${ag.ID || ag.id}`}</span>
                          <span className="matrix-col-id">ID: {ag.ID || ag.id}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployees.length === 0 ? (
                    <tr>
                      <td colSpan={1 + accessGroups.length} className="matrix-no-data">
                        No employees found
                      </td>
                    </tr>
                  ) : (
                    filteredEmployees.map(emp => (
                      <tr key={emp.employee_id}>
                        <td className="matrix-name-cell">
                          <div className="matrix-emp-info">
                            <strong>{emp.name}</strong>
                            <span className="matrix-emp-id">{emp.employee_id}</span>
                            {emp.department && <span className="matrix-emp-dept">{emp.department}</span>}
                          </div>
                        </td>
                        {accessGroups.map(ag => {
                          const gid = ag.ID || ag.id
                          const checked = isCellChecked(emp.employee_id, gid)
                          const modified = isCellModified(emp.employee_id, gid)
                          return (
                            <td key={gid} className={`matrix-cell ${modified ? 'modified' : ''} ${checked ? 'granted' : ''}`}>
                              <label className="matrix-checkbox">
                                <input
                                  type="checkbox"
                                  checked={checked}
                                  onChange={() => toggleAccess(emp.employee_id, gid)}
                                />
                                <span className="matrix-check-visual">
                                  {checked ? '✅' : '—'}
                                </span>
                              </label>
                            </td>
                          )
                        })}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Matrix Table — Doors View */}
          {viewMode === 'doors' && doors.length > 0 && (
            <div className="matrix-table-wrapper">
              <table className="matrix-table">
                <thead>
                  <tr>
                    <th className="matrix-name-col">Employee</th>
                    {doors.map(door => (
                      <th key={door.doorID || door.id} className="matrix-group-col">
                        <div className="matrix-col-header">
                          <span className="matrix-col-label">{door.name || `Door ${door.doorID || door.id}`}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployees.length === 0 ? (
                    <tr>
                      <td colSpan={1 + doors.length} className="matrix-no-data">
                        No employees found
                      </td>
                    </tr>
                  ) : (
                    filteredEmployees.map(emp => (
                      <tr key={emp.employee_id}>
                        <td className="matrix-name-cell">
                          <div className="matrix-emp-info">
                            <strong>{emp.name}</strong>
                            <span className="matrix-emp-id">{emp.employee_id}</span>
                          </div>
                        </td>
                        {doors.map(door => {
                          const doorId = door.doorID || door.id
                          const groupIdsForDoor = doorGroupMap[doorId] || []
                          const employeeGroups = pendingChanges[emp.employee_id]
                            || userAccessMap[emp.employee_id]
                            || new Set()
                          const hasAccess = groupIdsForDoor.some(gid => employeeGroups.has(gid))
                          return (
                            <td key={doorId} className={`matrix-cell ${hasAccess ? 'granted' : ''}`}>
                              <span className="matrix-door-status">
                                {hasAccess ? '🟢' : '🔴'}
                              </span>
                            </td>
                          )
                        })}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Empty states */}
          {viewMode === 'groups' && accessGroups.length === 0 && (
            <div className="matrix-empty" style={{ padding: '40px' }}>
              <div className="matrix-empty-icon">📋</div>
              <h3>No Access Groups</h3>
              <p>No access groups configured on this device. Create access groups from the Doors & Schedules page first.</p>
            </div>
          )}
          {viewMode === 'doors' && doors.length === 0 && (
            <div className="matrix-empty" style={{ padding: '40px' }}>
              <div className="matrix-empty-icon">🚪</div>
              <h3>No Doors</h3>
              <p>No doors configured on this device. Set up doors from the Doors & Schedules page first.</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}
