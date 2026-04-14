import { useState, useEffect, useCallback, useRef } from 'react'
import { gateEventAPI, employeeAPI } from '../services/api'
import ErrorBanner from './ErrorBanner'
import './GateEvents.css'

const formatDate = (dt) => {
  if (!dt) return '—'
  return new Date(dt).toLocaleString()
}

export default function GateEvents() {
  const [events, setEvents] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(false)
  const [statsLoading, setStatsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const PAGE_SIZE = 50

  // Filters
  const [filterEmployeeId, setFilterEmployeeId] = useState('')
  const [filterGateId, setFilterGateId] = useState('')
  const [filterStartDate, setFilterStartDate] = useState('')
  const [filterEndDate, setFilterEndDate] = useState('')
  const [filterDir, setFilterDir] = useState('')
  const [totalCount, setTotalCount] = useState(0)

  // Employee autocomplete
  const [empSuggestions, setEmpSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const empInputRef = useRef(null)
  const suggestionsRef = useRef(null)

  const searchEmployees = useCallback(async (query) => {
    if (!query || query.length < 2) { setEmpSuggestions([]); return }
    try {
      const res = await employeeAPI.getAll({ search: query, limit: 8 })
      setEmpSuggestions(res.data?.data || [])
    } catch { setEmpSuggestions([]) }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => searchEmployees(filterEmployeeId), 300)
    return () => clearTimeout(timer)
  }, [filterEmployeeId, searchEmployees])

  // Close suggestions on click outside
  useEffect(() => {
    const handler = (e) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(e.target) &&
          empInputRef.current && !empInputRef.current.contains(e.target)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const loadEvents = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const params = { limit: PAGE_SIZE, offset: (page - 1) * PAGE_SIZE }
      if (filterEmployeeId) params.employee_id = filterEmployeeId
      if (filterGateId) params.gate_id = filterGateId
      if (filterStartDate) params.startDate = filterStartDate
      if (filterEndDate) params.endDate = filterEndDate
      if (filterDir) params.dir = filterDir

      const res = await gateEventAPI.getAll(params)
      const data = res.data?.data || res.data || []
      const total = res.data?.total || data.length
      setEvents(data)
      setTotalCount(total)
    } catch (e) {
      setError(e.userMessage || 'Failed to load gate events')
    } finally {
      setLoading(false)
    }
  }, [page, filterEmployeeId, filterGateId, filterStartDate, filterEndDate, filterDir])

  const loadStats = useCallback(async () => {
    setStatsLoading(true)
    try {
      const res = await gateEventAPI.getStats()
      setStats(res.data?.data || res.data)
    } catch {
      setStats(null)
    } finally {
      setStatsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadEvents()
  }, [loadEvents])

  useEffect(() => {
    loadStats()
  }, [loadStats])

  const applyFilters = (e) => {
    e.preventDefault()
    setPage(1)
    loadEvents()
  }

  const clearFilters = () => {
    setFilterEmployeeId('')
    setFilterGateId('')
    setFilterStartDate('')
    setFilterEndDate('')
    setFilterDir('')
    setPage(1)
  }

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE))

  const dirBadge = (dir) => {
    if (!dir) return <span className="badge badge-neutral">—</span>
    const d = String(dir).toLowerCase()
    if (d === 'in') return <span className="badge badge-in">↓ In</span>
    if (d === 'out') return <span className="badge badge-out">↑ Out</span>
    return <span className="badge badge-neutral">{dir}</span>
  }

  return (
    <div className="gate-events-page">
      <div className="page-header">
        <h2>🚪 Gate Events</h2>
        <div className="page-stats">
          <span className="stat-badge info">{totalCount.toLocaleString()} total</span>
        </div>
      </div>

      <ErrorBanner error={error} onDismiss={() => setError(null)} />

      {/* Today's Stats */}
      {stats && (
        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-value">{stats.todayTotal ?? stats.total ?? '—'}</div>
            <div className="stat-label">Today's Events</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.entries ?? stats.todayIn ?? '—'}</div>
            <div className="stat-label">Entries (In)</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.exits ?? stats.todayOut ?? '—'}</div>
            <div className="stat-label">Exits (Out)</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.uniqueEmployees ?? stats.unique_employees ?? '—'}</div>
            <div className="stat-label">Unique Employees</div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="filter-card card">
        <div className="filter-card-title">🔍 Filters</div>
        <form onSubmit={applyFilters} className="filter-grid">
          <div className="filter-field" style={{ position: 'relative' }}>
            <label>Employee ID</label>
            <input
              ref={empInputRef}
              type="text"
              className="search-input"
              placeholder="Search by ID or name…"
              value={filterEmployeeId}
              onChange={e => { setFilterEmployeeId(e.target.value); setShowSuggestions(true) }}
              onFocus={() => empSuggestions.length > 0 && setShowSuggestions(true)}
              autoComplete="off"
            />
            {showSuggestions && empSuggestions.length > 0 && (
              <div ref={suggestionsRef} className="autocomplete-dropdown">
                {empSuggestions.map(emp => (
                  <div
                    key={emp.id || emp.employee_id}
                    className="autocomplete-item"
                    onClick={() => {
                      setFilterEmployeeId(String(emp.id || emp.employee_id))
                      setShowSuggestions(false)
                    }}
                  >
                    <strong>{emp.id || emp.employee_id}</strong>
                    <span className="emp-name">{emp.displayname || emp.name || ''}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="filter-field">
            <label>Gate ID</label>
            <input type="text" className="search-input" placeholder="e.g. 1" value={filterGateId} onChange={e => setFilterGateId(e.target.value)} />
          </div>
          <div className="filter-field">
            <label>Direction</label>
            <select className="select-input" value={filterDir} onChange={e => setFilterDir(e.target.value)}>
              <option value="">All</option>
              <option value="in">In</option>
              <option value="out">Out</option>
            </select>
          </div>
          <div className="filter-field">
            <label>Start Date</label>
            <input type="datetime-local" className="search-input" value={filterStartDate} onChange={e => setFilterStartDate(e.target.value)} />
          </div>
          <div className="filter-field">
            <label>End Date</label>
            <input type="datetime-local" className="search-input" value={filterEndDate} onChange={e => setFilterEndDate(e.target.value)} />
          </div>
          <div className="filter-actions">
            <button type="submit" className="btn btn-primary">Apply</button>
            <button type="button" className="btn btn-secondary" onClick={clearFilters}>Clear</button>
            <button type="button" className="btn btn-secondary" onClick={() => { loadEvents(); loadStats() }}>↻ Refresh</button>
          </div>
        </form>
      </div>

      {/* Events Table */}
      <div className="card">
        {loading ? (
          <div className="loading-row"><div className="spinner" /><span>Loading gate events…</span></div>
        ) : (
          <>
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Employee ID</th>
                  <th>Gate ID</th>
                  <th>Location</th>
                  <th>Direction</th>
                  <th>Door No</th>
                  <th>Event Time</th>
                </tr>
              </thead>
              <tbody>
                {events.length === 0 ? (
                  <tr><td colSpan={7} className="empty-cell">
                    <div style={{ padding: '2rem', textAlign: 'center' }}>
                      <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🚪</div>
                      <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>No gate events found</div>
                      <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                        Gate events appear here when employees badge through access points. Try adjusting your filters or sync events from devices.
                      </div>
                    </div>
                  </td></tr>
                ) : events.map((ev, idx) => (
                  <tr key={ev.id || idx}>
                    <td><code>{ev.id}</code></td>
                    <td><strong>{ev.employee_id || '—'}</strong></td>
                    <td>{ev.gate_id ?? '—'}</td>
                    <td>{ev.loc || '—'}</td>
                    <td>{dirBadge(ev.dir)}</td>
                    <td>{ev.door_no ?? '—'}</td>
                    <td>{formatDate(ev.etime)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination">
                <button className="btn btn-sm btn-secondary" disabled={page === 1} onClick={() => setPage(p => p - 1)}>‹ Prev</button>
                <span>Page {page} / {totalPages} ({totalCount.toLocaleString()} events)</span>
                <button className="btn btn-sm btn-secondary" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>Next ›</button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
