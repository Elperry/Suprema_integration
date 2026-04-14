import { useState, useEffect, useCallback } from 'react'
import { tnaAPI, deviceAPI, employeeAPI } from '../services/api'
import ErrorBanner from './ErrorBanner'
import './TNA.css'

export default function TNA() {
  const [devices, setDevices] = useState([])
  const [logs, setLogs] = useState([])
  const [summary, setSummary] = useState(null)
  const [reportData, setReportData] = useState(null)
  const [reportType, setReportType] = useState(null)
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
      let res
      try {
        // Try gRPC-based device logs first
        res = await tnaAPI.getLogs({
          deviceId: filters.deviceId || undefined,
          employeeId: filters.employeeId || undefined,
          startDate: filters.startDate,
          endDate: filters.endDate,
          page: filters.page,
          pageSize: filters.pageSize
        })
      } catch (grpcErr) {
        // Fallback to DB-based daily attendance report
        res = await tnaAPI.getDailyReport({
          date: filters.startDate,
          deviceId: filters.deviceId || undefined,
          userId: filters.employeeId || undefined,
        })
        // Normalize DB response shape to match logs format
        const rows = (res.data.data || []).map(r => ({
          employeeId: r.userId,
          employeeName: r.userId,
          timestamp: r.firstEvent,
          eventType: 'checkin',
          deviceId: r.devices?.[0] || '',
          totalHours: r.totalHours,
          eventCount: r.eventCount,
        }))
        res = { data: { data: rows, pagination: { total: rows.length, totalPages: 1, page: 1 } } }
      }
      
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
      let res
      try {
        res = await tnaAPI.getSummary({
          deviceId: filters.deviceId || undefined,
          employeeId: filters.employeeId || undefined,
          startDate: filters.startDate,
          endDate: filters.endDate
        })
      } catch (grpcErr) {
        // Fallback: build summary from monthly report data
        try {
          const month = filters.startDate?.substring(0, 7) || new Date().toISOString().substring(0, 7)
          const fallbackRes = await tnaAPI.getMonthlyReport({ month, deviceId: filters.deviceId || undefined, userId: filters.employeeId || undefined })
          const rows = fallbackRes.data.data || []
          const totalHours = rows.reduce((sum, r) => sum + (r.totalHours || 0), 0)
          const totalDays = rows.reduce((sum, r) => sum + (r.daysPresent || 0), 0)
          res = { data: { data: {
            totalEmployees: rows.length,
            totalDays,
            totalHours: totalHours * 60,
            avgHoursPerDay: rows.length > 0 ? Math.round((totalHours / Math.max(totalDays, 1)) * 60) : 0,
            employees: rows.map(r => ({
              employeeId: r.userId,
              employeeName: r.userId,
              daysPresent: r.daysPresent || 0,
              totalMinutes: (r.totalHours || 0) * 60,
              avgMinutesPerDay: r.avgHoursPerDay ? r.avgHoursPerDay * 60 : 0,
              lateArrivals: 0,
              earlyLeaves: 0,
            }))
          }}}
        } catch {
          throw grpcErr // re-throw original if fallback also fails
        }
      }
      
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

  const handleExport = async (type, format) => {
    try {
      setLoading(true)
      setError(null)
      const params = { format, deviceId: filters.deviceId || undefined, userId: filters.employeeId || undefined }
      let res
      if (type === 'daily') {
        params.date = filters.startDate
        res = await tnaAPI.exportDaily(params)
      } else {
        params.month = filters.startDate?.substring(0, 7) || new Date().toISOString().substring(0, 7)
        res = await tnaAPI.exportMonthly(params)
      }
      const blob = new Blob([res.data])
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `attendance_${type}_${filters.startDate || 'report'}.${format === 'xls' ? 'xls' : 'csv'}`
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (e) {
      setError('Export failed: ' + (e.response?.data?.message || e.message))
    } finally {
      setLoading(false)
    }
  }

  const formatTime = (timestamp) => {
    if (!timestamp) return 'N/A'
    const date = new Date(timestamp)
    return date.toLocaleTimeString('en-EG', {
      timeZone: 'Africa/Cairo',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
  }

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A'
    const date = new Date(timestamp)
    return date.toLocaleDateString('en-EG', {
      timeZone: 'Africa/Cairo',
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
      <ErrorBanner error={error} onDismiss={() => setError(null)} />

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
          <h3>📈 Attendance Reports</h3>
          <div className="reports-grid">
            <div className={`report-card ${reportType === 'daily' ? 'active' : ''}`}>
              <div className="report-icon">📅</div>
              <h4>Daily Report</h4>
              <p>Attendance for a specific date — first in, last out, total hours per employee</p>
              <button className="btn btn-primary btn-sm" disabled={loading} onClick={async () => {
                setReportType('daily')
                setLoading(true)
                setError(null)
                try {
                  const res = await tnaAPI.getDailyReport({ date: filters.startDate, deviceId: filters.deviceId || undefined, userId: filters.employeeId || undefined })
                  setReportData({ type: 'daily', rows: res.data.data || [], date: res.data.date })
                } catch (e) { setError('Failed to generate report: ' + (e.response?.data?.message || e.message)) }
                finally { setLoading(false) }
              }}>
                {loading && reportType === 'daily' ? '⏳ Loading…' : '▶️ Generate'}
              </button>
            </div>
            <div className={`report-card ${reportType === 'monthly' ? 'active' : ''}`}>
              <div className="report-icon">🗓️</div>
              <h4>Monthly Report</h4>
              <p>Monthly summary — days present, total hours, average hours per day</p>
              <button className="btn btn-primary btn-sm" disabled={loading} onClick={async () => {
                setReportType('monthly')
                setLoading(true)
                setError(null)
                try {
                  const month = filters.startDate?.substring(0, 7) || new Date().toISOString().substring(0, 7)
                  const res = await tnaAPI.getMonthlyReport({ month, deviceId: filters.deviceId || undefined, userId: filters.employeeId || undefined })
                  setReportData({ type: 'monthly', rows: res.data.data || [], month: res.data.month })
                } catch (e) { setError('Failed to generate report: ' + (e.response?.data?.message || e.message)) }
                finally { setLoading(false) }
              }}>
                {loading && reportType === 'monthly' ? '⏳ Loading…' : '▶️ Generate'}
              </button>
            </div>
          </div>
          
          {/* Report Results */}
          {reportData && (
            <div className="report-results">
              <div className="card-header-flex" style={{ marginTop: '1rem' }}>
                <h4>
                  {reportData.type === 'daily' ? `📅 Daily Report — ${reportData.date}` : `🗓️ Monthly Report — ${reportData.month}`}
                  <span className="badge badge-info" style={{ marginLeft: '0.5rem' }}>{reportData.rows.length} employees</span>
                </h4>
              </div>
              {reportData.rows.length === 0 ? (
                <div className="empty-state"><p>No attendance data found for this period.</p></div>
              ) : reportData.type === 'daily' ? (
                <table className="table">
                  <thead>
                    <tr>
                      <th>User ID</th>
                      <th>First In</th>
                      <th>Last Out</th>
                      <th>Total Hours</th>
                      <th>Events</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportData.rows.map((r, i) => (
                      <tr key={i}>
                        <td><strong>{r.userId}</strong></td>
                        <td>{r.firstEvent ? new Date(r.firstEvent).toLocaleTimeString() : '—'}</td>
                        <td>{r.lastEvent ? new Date(r.lastEvent).toLocaleTimeString() : '—'}</td>
                        <td>{r.totalHours != null ? `${r.totalHours}h` : '—'}</td>
                        <td>{r.eventCount || 0}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <table className="table">
                  <thead>
                    <tr>
                      <th>User ID</th>
                      <th>Days Present</th>
                      <th>Total Hours</th>
                      <th>Avg Hours/Day</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportData.rows.map((r, i) => (
                      <tr key={i}>
                        <td><strong>{r.userId}</strong></td>
                        <td>{r.daysPresent || 0}</td>
                        <td>{r.totalHours != null ? `${r.totalHours}h` : '—'}</td>
                        <td>{r.avgHoursPerDay != null ? `${r.avgHoursPerDay}h` : '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          <div className="export-options">
            <h4>Export</h4>
            <div className="export-buttons">
              <button className="btn btn-secondary" onClick={() => handleExport('daily', 'csv')} disabled={loading}>
                📄 Daily CSV
              </button>
              <button className="btn btn-secondary" onClick={() => handleExport('daily', 'xls')} disabled={loading}>
                📑 Daily Excel
              </button>
              <button className="btn btn-secondary" onClick={() => handleExport('monthly', 'csv')} disabled={loading}>
                📄 Monthly CSV
              </button>
              <button className="btn btn-secondary" onClick={() => handleExport('monthly', 'xls')} disabled={loading}>
                📑 Monthly Excel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
