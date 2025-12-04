import { useState, useEffect } from 'react'
import { eventAPI, deviceAPI } from '../services/api'

export default function Events() {
  const [devices, setDevices] = useState([])
  const [selectedDevice, setSelectedDevice] = useState('')
  const [events, setEvents] = useState([])
  const [monitoring, setMonitoring] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  // Pagination
  const [page, setPage] = useState(1)
  const [pageSize] = useState(50)
  const [totalPages, setTotalPages] = useState(1)
  const [totalEvents, setTotalEvents] = useState(0)
  
  // Filters
  const [filters, setFilters] = useState({
    eventType: '',
    userId: '',
    doorId: '',
    startDate: '',
    endDate: '',
    authResult: ''
  })
  const [activeTab, setActiveTab] = useState('all')

  useEffect(() => { loadDevices() }, [])

  const loadDevices = async () => {
    try {
      const res = await deviceAPI.getAll()
      setDevices(res.data.data || [])
    } catch (e) { 
      console.error(e)
      setError('Failed to load devices')
    }
  }

  const loadEvents = async (resetPage = false) => {
    if (!selectedDevice) return
    
    setLoading(true)
    setError(null)
    
    const currentPage = resetPage ? 1 : page
    if (resetPage) setPage(1)
    
    try {
      let res
      
      if (activeTab === 'all') {
        res = await eventAPI.getHistorical(selectedDevice, {
          page: currentPage,
          pageSize,
          ...filters
        })
      } else if (activeTab === 'authentication') {
        res = await eventAPI.getAuthenticationEvents(selectedDevice, {
          maxEvents: 100,
          authResult: filters.authResult || undefined
        })
      } else if (activeTab === 'door') {
        res = await eventAPI.getDoorEvents(selectedDevice, {
          doorId: filters.doorId || undefined,
          maxEvents: 100
        })
      }
      
      if (res?.data?.pagination) {
        setEvents(res.data.data || [])
        setTotalPages(res.data.pagination.totalPages)
        setTotalEvents(res.data.pagination.totalEvents)
      } else {
        setEvents(res?.data?.data || [])
        setTotalEvents(res?.data?.total || 0)
        setTotalPages(1)
      }
    } catch (e) { 
      console.error(e)
      setError(e.response?.data?.message || e.message || 'Failed to load events')
    } finally {
      setLoading(false)
    }
  }

  const handleDeviceChange = (deviceId) => {
    setSelectedDevice(deviceId)
    setEvents([])
    setPage(1)
  }

  useEffect(() => {
    if (selectedDevice) {
      loadEvents(true)
    }
  }, [selectedDevice, activeTab])

  const handleMonitoring = async () => {
    if (!selectedDevice) return
    try {
      if (monitoring) {
        await eventAPI.disableMonitoring(selectedDevice)
        setMonitoring(false)
      } else {
        await eventAPI.enableMonitoring(selectedDevice)
        setMonitoring(true)
      }
    } catch (e) { 
      setError(e.response?.data?.message || e.message)
    }
  }

  const handleSync = async () => {
    if (!selectedDevice) return
    setLoading(true)
    try {
      const res = await eventAPI.sync(selectedDevice, null, 1000)
      alert(`Synced ${res.data.synced || 0} events`)
      loadEvents()
    } catch (e) { 
      setError(e.response?.data?.message || e.message)
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    loadEvents(true)
  }

  const clearFilters = () => {
    setFilters({
      eventType: '',
      userId: '',
      doorId: '',
      startDate: '',
      endDate: '',
      authResult: ''
    })
    loadEvents(true)
  }

  const getEventTypeBadge = (eventType) => {
    const badges = {
      authentication: { class: 'badge-primary', label: '🔐 Auth' },
      door: { class: 'badge-info', label: '🚪 Door' },
      zone: { class: 'badge-warning', label: '📍 Zone' },
      system: { class: 'badge-secondary', label: '⚙️ System' },
      user: { class: 'badge-success', label: '👤 User' },
      attendance: { class: 'badge-purple', label: '⏰ TNA' },
      other: { class: 'badge-dark', label: '📋 Other' }
    }
    const badge = badges[eventType] || badges.other
    return <span className={`badge ${badge.class}`}>{badge.label}</span>
  }

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'N/A'
    try {
      return new Date(timestamp).toLocaleString()
    } catch {
      return 'Invalid Date'
    }
  }

  return (
    <div className="page">
      <h2>📋 Events</h2>
      
      {/* Device Selection */}
      <div className="card">
        <h3>Select Device</h3>
        <div className="flex-row">
          <select 
            value={selectedDevice} 
            onChange={(e) => handleDeviceChange(e.target.value)} 
            className="form-control"
            style={{ flex: 1 }}
          >
            <option value="">-- Select Device --</option>
            {devices.map(d => (
              <option key={d.id} value={d.id}>
                {d.name} ({d.ip}) - {d.status || 'unknown'}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedDevice && (
        <>
          {/* Control Panel */}
          <div className="card">
            <div className="card-header">
              <h3>Event Controls</h3>
              <div className="btn-group">
                <button 
                  onClick={handleMonitoring} 
                  className={`btn ${monitoring ? 'btn-warning' : 'btn-primary'}`}
                  disabled={loading}
                >
                  {monitoring ? '⏹️ Stop Monitoring' : '▶️ Start Monitoring'}
                </button>
                <button onClick={handleSync} className="btn btn-secondary" disabled={loading}>
                  🔄 Sync to DB
                </button>
                <button onClick={() => loadEvents()} className="btn btn-secondary" disabled={loading}>
                  🔃 Refresh
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="card">
            <div className="tabs">
              <button 
                className={`tab ${activeTab === 'all' ? 'active' : ''}`}
                onClick={() => setActiveTab('all')}
              >
                📋 All Events
              </button>
              <button 
                className={`tab ${activeTab === 'authentication' ? 'active' : ''}`}
                onClick={() => setActiveTab('authentication')}
              >
                🔐 Authentication
              </button>
              <button 
                className={`tab ${activeTab === 'door' ? 'active' : ''}`}
                onClick={() => setActiveTab('door')}
              >
                🚪 Door Events
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="card">
            <h3>🔍 Filters</h3>
            <div className="filter-grid">
              {activeTab === 'all' && (
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
              )}
              
              {(activeTab === 'all' || activeTab === 'authentication') && (
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
              )}
              
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
              
              {(activeTab === 'all' || activeTab === 'door') && (
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
              )}
              
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

          {/* Error Message */}
          {error && (
            <div className="alert alert-danger">
              ⚠️ {error}
              <button onClick={() => setError(null)} className="btn-close">×</button>
            </div>
          )}

          {/* Events Table */}
          <div className="card">
            <div className="card-header">
              <h3>Event Log ({totalEvents} events)</h3>
              {loading && <span className="loading-spinner">Loading...</span>}
            </div>
            
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Event ID</th>
                    <th>Type</th>
                    <th>User ID</th>
                    <th>Event Code</th>
                    <th>Description</th>
                    <th>Door</th>
                    <th>Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {events.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center">
                        {loading ? 'Loading events...' : 'No events found'}
                      </td>
                    </tr>
                  ) : (
                    events.map((e, i) => (
                      <tr key={e.id || e.eventid || i}>
                        <td>{e.id || e.eventid || i}</td>
                        <td>{getEventTypeBadge(e.eventType)}</td>
                        <td>{e.userid || 'N/A'}</td>
                        <td>
                          <code>0x{(e.eventcode || 0).toString(16).toUpperCase()}</code>
                        </td>
                        <td>{e.description || '-'}</td>
                        <td>{e.doorid !== undefined ? e.doorid : '-'}</td>
                        <td>{formatTimestamp(e.timestamp)}</td>
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
                  onClick={() => { setPage(p => p - 1); loadEvents(); }}
                  disabled={page <= 1 || loading}
                  className="btn btn-sm"
                >
                  ◀ Previous
                </button>
                <span className="page-info">
                  Page {page} of {totalPages}
                </span>
                <button 
                  onClick={() => { setPage(p => p + 1); loadEvents(); }}
                  disabled={page >= totalPages || loading}
                  className="btn btn-sm"
                >
                  Next ▶
                </button>
              </div>
            )}
          </div>
        </>
      )}

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
        .tabs {
          display: flex;
          gap: 4px;
          border-bottom: 2px solid #e0e0e0;
          padding-bottom: 0;
        }
        .tab {
          padding: 10px 20px;
          border: none;
          background: none;
          cursor: pointer;
          border-bottom: 3px solid transparent;
          margin-bottom: -2px;
          transition: all 0.2s;
        }
        .tab:hover {
          background: #f0f0f0;
        }
        .tab.active {
          border-bottom-color: #007bff;
          font-weight: bold;
          color: #007bff;
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
        }
        .badge-primary { background: #007bff; color: white; }
        .badge-info { background: #17a2b8; color: white; }
        .badge-warning { background: #ffc107; color: #333; }
        .badge-secondary { background: #6c757d; color: white; }
        .badge-success { background: #28a745; color: white; }
        .badge-purple { background: #6f42c1; color: white; }
        .badge-dark { background: #343a40; color: white; }
        .alert {
          padding: 12px 15px;
          border-radius: 4px;
          margin-bottom: 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;
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
        }
        .loading-spinner {
          color: #007bff;
          font-size: 14px;
        }
        .text-center {
          text-align: center;
          color: #999;
          padding: 30px;
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
        }
      `}</style>
    </div>
  )
}
