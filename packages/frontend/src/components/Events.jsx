import { useState, useEffect, useCallback } from 'react'
import { eventAPI, deviceAPI } from '../services/api'

export default function Events() {
  const [devices, setDevices] = useState([])
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(false)
  const [syncing, setSyncing] = useState(false)
  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  
  // Pagination
  const [page, setPage] = useState(1)
  const [pageSize] = useState(50)
  const [totalPages, setTotalPages] = useState(1)
  const [totalEvents, setTotalEvents] = useState(0)
  
  // Filters - deviceId is empty by default (show ALL devices)
  const [filters, setFilters] = useState({
    deviceId: '',
    eventType: '',
    userId: '',
    doorId: '',
    startDate: '',
    endDate: '',
    authResult: ''
  })

  useEffect(() => { 
    loadDevices()
    loadEvents()
  }, [])

  const loadDevices = async () => {
    try {
      const res = await deviceAPI.getAll()
      setDevices(res.data.data || [])
    } catch (e) { 
      console.error(e)
    }
  }

  const loadEvents = useCallback(async (resetPage = false) => {
    setLoading(true)
    setError(null)
    
    const currentPage = resetPage ? 1 : page
    if (resetPage) setPage(1)
    
    try {
      // Load from database - can filter by device or show all
      const res = await eventAPI.getFromDB({
        page: currentPage,
        pageSize,
        deviceId: filters.deviceId || undefined,
        eventType: filters.eventType || undefined,
        userId: filters.userId || undefined,
        authResult: filters.authResult || undefined,
        doorId: filters.doorId || undefined,
        startDate: filters.startDate || undefined,
        endDate: filters.endDate || undefined
      })
      
      if (res?.data?.pagination) {
        setEvents(res.data.data || [])
        setTotalPages(res.data.pagination.totalPages)
        setTotalEvents(res.data.pagination.totalEvents)
      } else {
        setEvents(res?.data?.data || [])
        setTotalEvents(res?.data?.data?.length || 0)
        setTotalPages(1)
      }
    } catch (e) { 
      console.error(e)
      setError(e.response?.data?.message || e.message || 'Failed to load events')
    } finally {
      setLoading(false)
    }
  }, [page, pageSize, filters])

  // Reload when page changes
  useEffect(() => {
    loadEvents()
  }, [page])

  const handleSyncAll = async () => {
    setSyncing(true)
    setError(null)
    setSuccessMessage(null)
    
    try {
      const res = await eventAPI.syncAllToDB(1000)
      setSuccessMessage(`Synced ${res.data.totalSynced} events from ${res.data.results?.length || 0} devices`)
      // Reload events after sync
      loadEvents(true)
    } catch (e) { 
      setError(e.response?.data?.message || e.message || 'Failed to sync events')
    } finally {
      setSyncing(false)
    }
  }

  const handleSyncDevice = async (deviceId) => {
    setSyncing(true)
    setError(null)
    setSuccessMessage(null)
    
    try {
      const res = await eventAPI.sync(deviceId, null, 1000)
      setSuccessMessage(`Synced ${res.data.synced} events from device`)
      loadEvents(true)
    } catch (e) { 
      setError(e.response?.data?.message || e.message || 'Failed to sync events')
    } finally {
      setSyncing(false)
    }
  }

  const applyFilters = () => {
    loadEvents(true)
  }

  const clearFilters = () => {
    setFilters({
      deviceId: '',
      eventType: '',
      userId: '',
      doorId: '',
      startDate: '',
      endDate: '',
      authResult: ''
    })
    setTimeout(() => loadEvents(true), 0)
  }

  const getEventTypeBadge = (eventType) => {
    const badges = {
      authentication: { cls: 'badge-primary', label: '🔐 Auth' },
      door: { cls: 'badge-info', label: '🚪 Door' },
      zone: { cls: 'badge-warning', label: '📍 Zone' },
      system: { cls: 'badge-secondary', label: '⚙️ System' },
      user: { cls: 'badge-success', label: '👤 User' },
      attendance: { cls: 'badge-purple', label: '⏰ TNA' },
      other: { cls: 'badge-dark', label: '📋 Other' }
    }
    const badge = badges[eventType] || badges.other
    return <span className={`badge ${badge.cls}`}>{badge.label}</span>
  }

  const getAuthResultBadge = (result) => {
    if (!result) return null
    const badges = {
      success: { cls: 'badge-success', label: '✅ Success' },
      fail: { cls: 'badge-danger', label: '❌ Failed' }
    }
    const badge = badges[result] || { cls: 'badge-secondary', label: result }
    return <span className={`badge ${badge.cls}`}>{badge.label}</span>
  }

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'N/A'
    try {
      return new Date(timestamp).toLocaleString()
    } catch {
      return 'Invalid Date'
    }
  }

  const getDeviceName = (deviceId) => {
    const device = devices.find(d => d.id === deviceId)
    return device ? device.name : `Device ${deviceId}`
  }

  return (
    <div className="page">
      <h2>📋 Events</h2>
      
      {/* Sync Controls */}
      <div className="card">
        <div className="card-header">
          <h3>🔄 Event Synchronization</h3>
          <div className="btn-group">
            <button 
              onClick={handleSyncAll} 
              className="btn btn-primary"
              disabled={syncing}
            >
              {syncing ? '⏳ Syncing...' : '🔄 Sync All Devices'}
            </button>
            <button 
              onClick={() => loadEvents(true)} 
              className="btn btn-secondary" 
              disabled={loading}
            >
              🔃 Refresh
            </button>
          </div>
        </div>
        
        {/* Quick device sync */}
        <div className="device-sync-grid">
          {devices.filter(d => d.status === 'connected').map(d => (
            <div key={d.id} className="device-sync-card">
              <div>
                <strong>{d.name}</strong>
                <br />
                <small style={{ color: '#666' }}>{d.ip}</small>
              </div>
              <button 
                onClick={() => handleSyncDevice(d.id)}
                className="btn btn-sm btn-secondary"
                disabled={syncing}
              >
                🔄
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Success/Error Messages */}
      {successMessage && (
        <div className="alert alert-success">
          ✅ {successMessage}
          <button onClick={() => setSuccessMessage(null)} className="btn-close">×</button>
        </div>
      )}
      
      {error && (
        <div className="alert alert-danger">
          ⚠️ {error}
          <button onClick={() => setError(null)} className="btn-close">×</button>
        </div>
      )}

      {/* Filters */}
      <div className="card">
        <h3>🔍 Filters</h3>
        <div className="filter-grid">
          <div className="filter-item">
            <label>Device</label>
            <select 
              value={filters.deviceId} 
              onChange={(e) => setFilters({...filters, deviceId: e.target.value})}
              className="form-control"
            >
              <option value="">All Devices</option>
              {devices.map(d => (
                <option key={d.id} value={d.id}>
                  {d.name} ({d.ip})
                </option>
              ))}
            </select>
          </div>
          
          <div className="filter-item">
            <label>Event Type</label>
            <select 
              value={filters.eventType} 
              onChange={(e) => setFilters({...filters, eventType: e.target.value})}
              className="form-control"
            >
              <option value="">All Types</option>
              <option value="authentication">Authentication</option>
              <option value="door">Door</option>
              <option value="zone">Zone</option>
              <option value="system">System</option>
              <option value="user">User</option>
              <option value="attendance">Attendance</option>
            </select>
          </div>
          
          <div className="filter-item">
            <label>Auth Result</label>
            <select 
              value={filters.authResult} 
              onChange={(e) => setFilters({...filters, authResult: e.target.value})}
              className="form-control"
            >
              <option value="">All</option>
              <option value="success">Success ✅</option>
              <option value="fail">Failed ❌</option>
            </select>
          </div>
          
          <div className="filter-item">
            <label>User ID</label>
            <input 
              type="text" 
              value={filters.userId}
              onChange={(e) => setFilters({...filters, userId: e.target.value})}
              placeholder="Filter by User ID"
              className="form-control"
            />
          </div>
          
          <div className="filter-item">
            <label>Door ID</label>
            <input 
              type="number" 
              value={filters.doorId}
              onChange={(e) => setFilters({...filters, doorId: e.target.value})}
              placeholder="Filter by Door ID"
              className="form-control"
            />
          </div>
          
          <div className="filter-item">
            <label>Start Date</label>
            <input 
              type="datetime-local" 
              value={filters.startDate}
              onChange={(e) => setFilters({...filters, startDate: e.target.value})}
              className="form-control"
            />
          </div>
          
          <div className="filter-item">
            <label>End Date</label>
            <input 
              type="datetime-local" 
              value={filters.endDate}
              onChange={(e) => setFilters({...filters, endDate: e.target.value})}
              className="form-control"
            />
          </div>
        </div>
        
        <div className="filter-actions">
          <button onClick={applyFilters} className="btn btn-primary" disabled={loading}>
            🔍 Apply Filters
          </button>
          <button onClick={clearFilters} className="btn btn-secondary" disabled={loading}>
            ✖️ Clear
          </button>
        </div>
      </div>

      {/* Events Table */}
      <div className="card">
        <div className="card-header">
          <h3>Event Log ({totalEvents.toLocaleString()} events)</h3>
          {loading && <span className="loading-spinner">⏳ Loading...</span>}
        </div>
        
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Device</th>
                <th>Type</th>
                <th>User ID</th>
                <th>Event Code</th>
                <th>Description</th>
                <th>Result</th>
                <th>Door</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {events.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center">
                    {loading ? '⏳ Loading events...' : '📭 No events found. Click "Sync All Devices" to fetch events.'}
                  </td>
                </tr>
              ) : (
                events.map((e, i) => (
                  <tr key={e.id || i}>
                    <td>
                      <span className="device-badge">
                        {getDeviceName(e.deviceId)}
                      </span>
                    </td>
                    <td>{getEventTypeBadge(e.eventType)}</td>
                    <td>{e.userId || 'N/A'}</td>
                    <td>
                      <code>0x{(e.eventCode || 0).toString(16).toUpperCase().padStart(4, '0')}</code>
                    </td>
                    <td className="desc-cell">{e.description || '-'}</td>
                    <td>{getAuthResultBadge(e.authResult)}</td>
                    <td>{e.doorId !== null ? e.doorId : '-'}</td>
                    <td className="ts-cell">{formatTimestamp(e.timestamp)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button 
              onClick={() => setPage(1)}
              disabled={page <= 1 || loading}
              className="btn btn-sm"
            >
              ⏮️ First
            </button>
            <button 
              onClick={() => setPage(p => p - 1)}
              disabled={page <= 1 || loading}
              className="btn btn-sm"
            >
              ◀ Previous
            </button>
            <span className="page-info">
              Page {page} of {totalPages}
            </span>
            <button 
              onClick={() => setPage(p => p + 1)}
              disabled={page >= totalPages || loading}
              className="btn btn-sm"
            >
              Next ▶
            </button>
            <button 
              onClick={() => setPage(totalPages)}
              disabled={page >= totalPages || loading}
              className="btn btn-sm"
            >
              Last ⏭️
            </button>
          </div>
        )}
      </div>

      <style>{`
        .flex-row {
          display: flex;
          gap: 10px;
          align-items: center;
        }
        .btn-group {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .device-sync-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 10px;
          margin-top: 15px;
        }
        .device-sync-card {
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 8px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .filter-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 15px;
          margin-bottom: 15px;
        }
        .filter-item label {
          display: block;
          font-size: 12px;
          font-weight: 600;
          margin-bottom: 5px;
          color: #666;
        }
        .filter-actions {
          display: flex;
          gap: 10px;
          padding-top: 10px;
          border-top: 1px solid #eee;
        }
        .badge {
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 600;
          display: inline-block;
        }
        .badge-primary { background: #007bff; color: white; }
        .badge-info { background: #17a2b8; color: white; }
        .badge-warning { background: #ffc107; color: #333; }
        .badge-secondary { background: #6c757d; color: white; }
        .badge-success { background: #28a745; color: white; }
        .badge-danger { background: #dc3545; color: white; }
        .badge-purple { background: #6f42c1; color: white; }
        .badge-dark { background: #343a40; color: white; }
        .device-badge {
          background-color: #e9ecef;
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 12px;
        }
        .alert {
          padding: 12px 15px;
          border-radius: 4px;
          margin-bottom: 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .alert-success {
          background: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }
        .alert-danger {
          background: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }
        .btn-close {
          background: none;
          border: none;
          font-size: 20px;
          cursor: pointer;
          color: inherit;
        }
        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 15px;
          padding: 15px;
          border-top: 1px solid #eee;
        }
        .page-info {
          color: #666;
          padding: 6px 15px;
          background: #f5f5f5;
          border-radius: 4px;
        }
        .loading-spinner {
          color: #666;
          font-size: 14px;
        }
        .text-center {
          text-align: center;
          color: #999;
          padding: 40px;
        }
        code {
          background: #f4f4f4;
          padding: 2px 6px;
          border-radius: 3px;
          font-family: monospace;
        }
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 15px;
        }
        .card h3 {
          margin: 0 0 15px 0;
        }
        .table {
          width: 100%;
          border-collapse: collapse;
        }
        .table th {
          padding: 12px;
          text-align: left;
          border-bottom: 2px solid #ddd;
          background: #f5f5f5;
        }
        .table td {
          padding: 10px;
          border-bottom: 1px solid #eee;
        }
        .table tr:hover {
          background: #f9f9f9;
        }
        .desc-cell {
          max-width: 250px;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .ts-cell {
          white-space: nowrap;
        }
        .table-responsive {
          overflow-x: auto;
        }
      `}</style>
    </div>
  )
}
