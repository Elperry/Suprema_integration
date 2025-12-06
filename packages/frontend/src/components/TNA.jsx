import { useState, useEffect, useCallback } from 'react'
import { tnaAPI, deviceAPI, employeeAPI } from '../services/api'
import './TNA.css'

export default function TNA() {
  const [devices, setDevices] = useState([])
  const [logs, setLogs] = useState([])
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('logs') // logs, summary, reports
  
  // Filters
  const [filters, setFilters] = useState({
    deviceId: '',
    employeeId: '',
    startDate: getDefaultStartDate(),
    endDate: getDefaultEndDate(),
    page: 1,
    pageSize: 50
  })

  // Pagination
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 1,
    currentPage: 1
  })

  function getDefaultStartDate() {
    const date = new Date()
    date.setDate(date.getDate() - 7)
    return date.toISOString().split('T')[0]
  }

  function getDefaultEndDate() {
    return new Date().toISOString().split('T')[0]
  }

  useEffect(() => {
    loadDevices()
  }, [])

  useEffect(() => {
    if (activeTab === 'logs') {
      loadLogs()
    } else if (activeTab === 'summary') {
      loadSummary()
    }
  }, [activeTab, filters.page])

  const loadDevices = async () => {
    try {
      const res = await deviceAPI.getAll()
      setDevices(res.data.data || [])
    } catch (e) {
      console.error('Failed to load devices:', e)
    }
  }

  const loadLogs = async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await tnaAPI.getLogs({
        deviceId: filters.deviceId || undefined,
        employeeId: filters.employeeId || undefined,
        startDate: filters.startDate,
        endDate: filters.endDate,
        page: filters.page,
        pageSize: filters.pageSize
      })
      
      setLogs(res.data.data || [])
      if (res.data.pagination) {
        setPagination({
          total: res.data.pagination.total,
          totalPages: res.data.pagination.totalPages,
          currentPage: res.data.pagination.page
        })
      }
    } catch (e) {
      setError('Failed to load attendance logs: ' + (e.response?.data?.message || e.message))
    } finally {
      setLoading(false)
    }
  }

  const loadSummary = async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await tnaAPI.getSummary({
        deviceId: filters.deviceId || undefined,
        employeeId: filters.employeeId || undefined,
        startDate: filters.startDate,
        endDate: filters.endDate
      })
      
      setSummary(res.data.data || null)
    } catch (e) {
      setError('Failed to load summary: ' + (e.response?.data?.message || e.message))
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    setFilters(prev => ({ ...prev, page: 1 }))
    if (activeTab === 'logs') {
      loadLogs()
    } else {
      loadSummary()
    }
  }

  const clearFilters = () => {
    setFilters({
      deviceId: '',
      employeeId: '',
      startDate: getDefaultStartDate(),
      endDate: getDefaultEndDate(),
      page: 1,
      pageSize: 50
    })
  }

  const formatTime = (timestamp) => {
    if (!timestamp) return 'N/A'
    const date = new Date(timestamp)
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A'
    const date = new Date(timestamp)
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatDuration = (minutes) => {
    if (!minutes && minutes !== 0) return 'N/A'
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  const getEventTypeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'checkin':
      case 'in':
        return '➡️'
      case 'checkout':
      case 'out':
        return '⬅️'
      case 'break_start':
        return '☕'
      case 'break_end':
        return '🔙'
      default:
        return '📍'
    }
  }

  const getEventTypeBadge = (type) => {
    const badges = {
      'checkin': { cls: 'badge-success', label: 'Check In' },
      'in': { cls: 'badge-success', label: 'In' },
      'checkout': { cls: 'badge-info', label: 'Check Out' },
      'out': { cls: 'badge-info', label: 'Out' },
      'break_start': { cls: 'badge-warning', label: 'Break Start' },
      'break_end': { cls: 'badge-warning', label: 'Break End' }
    }
    const badge = badges[type?.toLowerCase()] || { cls: 'badge-secondary', label: type || 'Unknown' }
    return <span className={`badge ${badge.cls}`}>{getEventTypeIcon(type)} {badge.label}</span>
  }

  return (
    <div className="page tna-page">
      <div className="page-header">
        <h2>⏰ Time & Attendance</h2>
        <div className="tab-buttons">
          <button 
            className={`btn ${activeTab === 'logs' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('logs')}
          >
            📋 Logs
          </button>
          <button 
            className={`btn ${activeTab === 'summary' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('summary')}
          >
            📊 Summary
          </button>
          <button 
            className={`btn ${activeTab === 'reports' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveTab('reports')}
          >
            📈 Reports
          </button>
        </div>
      </div>

      {/* Alerts */}
      {error && (
        <div className="alert alert-danger">
          <span>⚠️ {error}</span>
          <button onClick={() => setError(null)} className="btn-close">×</button>
        </div>
      )}

      {/* Filters */}
      <div className="card filter-card">
        <h3>🔍 Filters</h3>
        <div className="filter-grid">
          <div className="filter-group">
            <label>Device</label>
            <select 
              value={filters.deviceId}
              onChange={(e) => setFilters({...filters, deviceId: e.target.value})}
              className="form-control"
            >
              <option value="">All Devices</option>
              {devices.map(d => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label>Employee ID</label>
            <input 
              type="text"
              placeholder="Enter employee ID"
              value={filters.employeeId}
              onChange={(e) => setFilters({...filters, employeeId: e.target.value})}
              className="form-control"
            />
          </div>
          
          <div className="filter-group">
            <label>Start Date</label>
            <input 
              type="date"
              value={filters.startDate}
              onChange={(e) => setFilters({...filters, startDate: e.target.value})}
              className="form-control"
            />
          </div>
          
          <div className="filter-group">
            <label>End Date</label>
            <input 
              type="date"
              value={filters.endDate}
              onChange={(e) => setFilters({...filters, endDate: e.target.value})}
              className="form-control"
            />
          </div>
          
          <div className="filter-actions">
            <button onClick={applyFilters} className="btn btn-primary">
              🔍 Apply
            </button>
            <button onClick={clearFilters} className="btn btn-secondary">
              ✖ Clear
            </button>
          </div>
        </div>
      </div>

      {/* Logs Tab */}
      {activeTab === 'logs' && (
        <div className="card">
          <div className="card-header-flex">
            <h3>📋 Attendance Logs</h3>
            <span className="badge badge-info">{pagination.total} records</span>
          </div>

          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading attendance logs...</p>
            </div>
          ) : logs.length === 0 ? (
            <div className="empty-state">
              <p>📭 No attendance logs found for the selected period.</p>
              <p>Try adjusting your filters or sync events from devices.</p>
            </div>
          ) : (
            <>
              <table className="table tna-table">
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Event Type</th>
                    <th>Device</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Location</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log, index) => (
                    <tr key={log.id || index}>
                      <td>
                        <div className="employee-cell">
                          <span className="employee-name">{log.employeeName || 'Unknown'}</span>
                          <span className="employee-id">{log.employeeId}</span>
                        </div>
                      </td>
                      <td>{getEventTypeBadge(log.eventType)}</td>
                      <td>{log.deviceName || log.deviceId}</td>
                      <td>{formatDate(log.timestamp)}</td>
                      <td><strong>{formatTime(log.timestamp)}</strong></td>
                      <td>{log.location || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="pagination">
                  <button 
                    onClick={() => setFilters(p => ({ ...p, page: p.page - 1 }))}
                    disabled={filters.page <= 1}
                    className="btn btn-secondary btn-sm"
                  >
                    ← Previous
                  </button>
                  <span className="page-info">
                    Page {pagination.currentPage} of {pagination.totalPages}
                  </span>
                  <button 
                    onClick={() => setFilters(p => ({ ...p, page: p.page + 1 }))}
                    disabled={filters.page >= pagination.totalPages}
                    className="btn btn-secondary btn-sm"
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* Summary Tab */}
      {activeTab === 'summary' && (
        <div className="card">
          <div className="card-header-flex">
            <h3>📊 Attendance Summary</h3>
            <button onClick={loadSummary} className="btn btn-secondary btn-sm" disabled={loading}>
              🔄 Refresh
            </button>
          </div>

          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading summary...</p>
            </div>
          ) : !summary ? (
            <div className="empty-state">
              <p>📭 No attendance data available for the selected period.</p>
            </div>
          ) : (
            <>
              {/* Summary Stats */}
              <div className="summary-stats">
                <div className="summary-stat">
                  <div className="stat-value">{summary.totalEmployees || 0}</div>
                  <div className="stat-label">Employees</div>
                </div>
                <div className="summary-stat">
                  <div className="stat-value">{summary.totalDays || 0}</div>
                  <div className="stat-label">Working Days</div>
                </div>
                <div className="summary-stat">
                  <div className="stat-value">{formatDuration(summary.totalHours)}</div>
                  <div className="stat-label">Total Hours</div>
                </div>
                <div className="summary-stat">
                  <div className="stat-value">{formatDuration(summary.avgHoursPerDay)}</div>
                  <div className="stat-label">Avg Hours/Day</div>
                </div>
              </div>

              {/* Employee Summary Table */}
              {summary.employees && summary.employees.length > 0 && (
                <table className="table summary-table">
                  <thead>
                    <tr>
                      <th>Employee</th>
                      <th>Days Present</th>
                      <th>Total Hours</th>
                      <th>Avg Hours/Day</th>
                      <th>Late Arrivals</th>
                      <th>Early Leaves</th>
                    </tr>
                  </thead>
                  <tbody>
                    {summary.employees.map((emp, index) => (
                      <tr key={emp.employeeId || index}>
                        <td>
                          <div className="employee-cell">
                            <span className="employee-name">{emp.employeeName || 'Unknown'}</span>
                            <span className="employee-id">{emp.employeeId}</span>
                          </div>
                        </td>
                        <td>{emp.daysPresent || 0}</td>
                        <td>{formatDuration(emp.totalMinutes)}</td>
                        <td>{formatDuration(emp.avgMinutesPerDay)}</td>
                        <td>
                          <span className={emp.lateArrivals > 0 ? 'text-warning' : ''}>
                            {emp.lateArrivals || 0}
                          </span>
                        </td>
                        <td>
                          <span className={emp.earlyLeaves > 0 ? 'text-warning' : ''}>
                            {emp.earlyLeaves || 0}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </>
          )}
        </div>
      )}

      {/* Reports Tab */}
      {activeTab === 'reports' && (
        <div className="card">
          <h3>📈 Reports</h3>
          <div className="reports-grid">
            <div className="report-card">
              <div className="report-icon">📅</div>
              <h4>Daily Report</h4>
              <p>Generate daily attendance report</p>
              <button className="btn btn-primary btn-sm">Generate</button>
            </div>
            <div className="report-card">
              <div className="report-icon">📆</div>
              <h4>Weekly Report</h4>
              <p>Generate weekly attendance summary</p>
              <button className="btn btn-primary btn-sm">Generate</button>
            </div>
            <div className="report-card">
              <div className="report-icon">🗓️</div>
              <h4>Monthly Report</h4>
              <p>Generate monthly attendance report</p>
              <button className="btn btn-primary btn-sm">Generate</button>
            </div>
            <div className="report-card">
              <div className="report-icon">📊</div>
              <h4>Custom Report</h4>
              <p>Create custom date range report</p>
              <button className="btn btn-primary btn-sm">Generate</button>
            </div>
          </div>
          
          <div className="export-options">
            <h4>Export Options</h4>
            <div className="export-buttons">
              <button className="btn btn-secondary">
                📄 Export CSV
              </button>
              <button className="btn btn-secondary">
                📑 Export Excel
              </button>
              <button className="btn btn-secondary">
                📋 Export PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
