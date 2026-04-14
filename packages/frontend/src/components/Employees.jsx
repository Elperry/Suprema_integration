import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { employeeAPI, enrollmentAPI, hrAPI } from '../services/api'
import { useNotification } from './Notifications'
import { SkeletonTable } from './Skeleton'
import './Employees.css'

const decodeHexCardData = (hexData) => {
  try {
    if (!hexData) return { decimal: '—' }
    const cleanHex = String(hexData).replace(/[^0-9A-Fa-f]/g, '').toUpperCase()
    if (!cleanHex) return { decimal: '—' }
    const significant = cleanHex.replace(/^0+/, '') || '0'
    if (!/^[0-9A-Fa-f]+$/.test(significant)) return { decimal: '—' }
    return { decimal: BigInt('0x' + significant).toString() }
  } catch {
    return { decimal: '—' }
  }
}

export default function Employees() {
  const navigate = useNavigate()
  const notify = useNotification()
  const [employees, setEmployees] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, _setSuccess] = useState(null)
  const setSuccess = (msg) => { _setSuccess(msg); if (msg) notify.success(msg) }
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [employeeDetail, setEmployeeDetail] = useState(null)
  const [detailLoading, setDetailLoading] = useState(false)
  const [filterSuspend, setFilterSuspend] = useState('all')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [confirmTerminate, setConfirmTerminate] = useState(null)
  const [terminateReason, setTerminateReason] = useState('')
  const [sortField, setSortField] = useState('id')
  const [sortDir, setSortDir] = useState('asc')
  const [selectedIds, setSelectedIds] = useState(new Set())
  const PAGE_SIZE = 20

  const loadEmployees = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const params = { page, limit: PAGE_SIZE }
      if (filterSuspend !== 'all') params.suspend = filterSuspend === 'suspended' ? '1' : '0'
      if (searchQuery.trim()) params.search = searchQuery.trim()
      const res = await employeeAPI.getAll(params)
      const data = res.data?.data || res.data || []
      setEmployees(Array.isArray(data) ? data : [])
      setTotalCount(res.data?.total || data.length)
      setTotalPages(res.data?.totalPages || Math.max(1, Math.ceil((res.data?.total || data.length) / PAGE_SIZE)))
    } catch (e) {
      setError(e.userMessage || 'Failed to load employees')
    } finally {
      setLoading(false)
    }
  }, [filterSuspend, page, searchQuery])

  useEffect(() => {
    loadEmployees()
  }, [loadEmployees])

  const handleSearch = async (e) => {
    e.preventDefault()
    if (searchQuery.trim() && searchQuery.trim().length < 2) {
      setError('Enter at least 2 characters to search')
      return
    }
    setPage(1)
    // loadEmployees will fire via useEffect since page changed
  }

  const clearSearch = () => {
    setSearchQuery('')
    setPage(1)
  }

  const handleTerminate = async () => {
    if (!confirmTerminate) return
    const empId = confirmTerminate.id || confirmTerminate.employee_id
    try {
      setLoading(true)
      const res = await hrAPI.terminateEmployee(empId, terminateReason || 'Terminated via admin')
      setSuccess(res.data?.message || 'Employee terminated and cards revoked')
      setConfirmTerminate(null)
      setTerminateReason('')
      loadEmployees()
    } catch (e) {
      setError(e.userMessage || 'Termination failed')
    } finally {
      setLoading(false)
    }
  }

  const openDetail = async (emp) => {
    setSelectedEmployee(emp)
    setDetailLoading(true)
    setEmployeeDetail(null)
    try {
      const [detailRes, cardRes] = await Promise.allSettled([
        employeeAPI.getById(emp.id || emp.employee_id),
        employeeAPI.getCardInfo(emp.id || emp.employee_id),
      ])
      const detail = detailRes.status === 'fulfilled'
        ? (detailRes.value.data?.data || detailRes.value.data)
        : emp
      const card = cardRes.status === 'fulfilled'
        ? (cardRes.value.data?.data || cardRes.value.data)
        : null

      // Also get card assignments from enrollment
      let assignments = []
      try {
        const aRes = await enrollmentAPI.getCardAssignments({ employeeId: emp.id || emp.employee_id })
        assignments = aRes.data?.data || aRes.data || []
      } catch {}

      setEmployeeDetail({ ...detail, cardInfo: card, assignments })
    } catch (e) {
      setEmployeeDetail({ ...emp, error: e.userMessage || 'Failed to load detail' })
    } finally {
      setDetailLoading(false)
    }
  }

  const closeDetail = () => {
    setSelectedEmployee(null)
    setEmployeeDetail(null)
  }

  const statusColor = (emp) => {
    if (emp.suspend == 1 || emp.suspend === true) return 'status-suspended'
    return 'status-active'
  }

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDir(prev => prev === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDir('asc')
    }
  }

  const sortIndicator = (field) => {
    if (sortField !== field) return <span className="sort-indicator">⇅</span>
    return <span className="sort-indicator active">{sortDir === 'asc' ? '↑' : '↓'}</span>
  }

  const sortedEmployees = [...employees].sort((a, b) => {
    let av, bv
    switch (sortField) {
      case 'id': av = a.id || a.employee_id || 0; bv = b.id || b.employee_id || 0; break
      case 'name': av = (a.displayname || a.name || a.full_name || '').toLowerCase(); bv = (b.displayname || b.name || b.full_name || '').toLowerCase(); break
      case 'card': av = a.card || ''; bv = b.card || ''; break
      case 'ssn': av = a.ssn || ''; bv = b.ssn || ''; break
      case 'status': av = a.suspend == 1 ? 1 : 0; bv = b.suspend == 1 ? 1 : 0; break
      default: av = a.id || 0; bv = b.id || 0
    }
    if (av < bv) return sortDir === 'asc' ? -1 : 1
    if (av > bv) return sortDir === 'asc' ? 1 : -1
    return 0
  })

  const toggleSelectAll = () => {
    if (selectedIds.size === sortedEmployees.length) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(sortedEmployees.map(e => e.id || e.employee_id)))
    }
  }

  const toggleSelect = (empId) => {
    setSelectedIds(prev => {
      const next = new Set(prev)
      if (next.has(empId)) next.delete(empId)
      else next.add(empId)
      return next
    })
  }

  const handleExportSelected = () => {
    const selected = sortedEmployees.filter(e => selectedIds.has(e.id || e.employee_id))
    if (selected.length === 0) return
    const headers = ['ID', 'Name', 'Card', 'SSN', 'Status']
    const rows = selected.map(e => [
      e.id || e.employee_id,
      e.displayname || e.name || e.full_name || e.employee_name || '',
      e.card ? decodeHexCardData(e.card).decimal : '',
      e.ssn || '',
      e.suspend == 1 ? 'Suspended' : 'Active'
    ])
    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `employees_export_${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    notify.success(`Exported ${selected.length} employees`)
  }

  return (
    <div className="employees-page">
      <div className="page-header">
        <h2>👤 Employees</h2>
        <div className="page-stats">
          <span className="stat-badge info">{employees.length} shown</span>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger">
          <span>⚠️ {error}</span>
          <button onClick={() => setError(null)} className="btn-close">✕</button>
        </div>
      )}
      {success && (
        <div className="alert alert-success">
          <span>✅ {success}</span>
          <button onClick={() => setSuccess(null)} className="btn-close">✕</button>
        </div>
      )}

      {/* Filters & Search */}
      <div className="emp-toolbar card">
        <form onSubmit={handleSearch} className="search-row">
          <input
            type="text"
            className="search-input"
            placeholder="Search by name or ID (min 2 chars)…"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">🔍 Search</button>
          {searchQuery && (
            <button type="button" className="btn btn-secondary" onClick={clearSearch}>✕ Clear</button>
          )}
        </form>

        <div className="filter-row">
          <label>Status:</label>
          <select value={filterSuspend} onChange={e => { setFilterSuspend(e.target.value); setPage(1) }} className="select-input">
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
          </select>
          <button className="btn btn-secondary" onClick={() => loadEmployees()}>↻ Refresh</button>
        </div>
        {selectedIds.size > 0 && (
          <div className="bulk-bar">
            <span>{selectedIds.size} selected</span>
            <button className="btn btn-sm btn-primary" onClick={handleExportSelected}>📥 Export Selected</button>
            <button className="btn btn-sm btn-secondary" onClick={() => setSelectedIds(new Set())}>✕ Clear</button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="card">
        {loading ? (
          <table className="data-table">
            <thead>
              <tr><th style={{ width: 36 }}></th><th>ID</th><th>Name</th><th>Card</th><th>SSN</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              <SkeletonTable rows={8} cols={7} />
            </tbody>
          </table>
        ) : (
          <>
            <table className="data-table">
              <thead>
                <tr>
                  <th style={{ width: 36 }}><input type="checkbox" checked={selectedIds.size === sortedEmployees.length && sortedEmployees.length > 0} onChange={toggleSelectAll} /></th>
                  <th className="sortable-th" onClick={() => handleSort('id')}>ID {sortIndicator('id')}</th>
                  <th className="sortable-th" onClick={() => handleSort('name')}>Name {sortIndicator('name')}</th>
                  <th className="sortable-th" onClick={() => handleSort('card')}>Card {sortIndicator('card')}</th>
                  <th className="sortable-th" onClick={() => handleSort('ssn')}>SSN {sortIndicator('ssn')}</th>
                  <th className="sortable-th" onClick={() => handleSort('status')}>Status {sortIndicator('status')}</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedEmployees.length === 0 ? (
                  <tr><td colSpan={7} className="empty-cell">No employees found.</td></tr>
                ) : sortedEmployees.map((emp, idx) => (
                  <tr key={emp.id || emp.employee_id || idx} className={selectedIds.has(emp.id || emp.employee_id) ? 'selected-row' : ''}>
                    <td><input type="checkbox" checked={selectedIds.has(emp.id || emp.employee_id)} onChange={() => toggleSelect(emp.id || emp.employee_id)} /></td>
                    <td><code>{emp.id || emp.employee_id}</code></td>
                    <td className="name-cell">
                      {emp.profile_photo && (
                        <img src={emp.profile_photo} alt="" className="avatar" onError={e => e.target.style.display='none'} />
                      )}
                      <span>{emp.displayname || emp.name || emp.full_name || emp.employee_name || '—'}</span>
                    </td>
                    <td><code>{emp.card ? decodeHexCardData(emp.card).decimal : '—'}</code></td>
                    <td>{emp.ssn || '—'}</td>
                    <td>
                      <span className={`badge ${statusColor(emp)}`}>
                        {emp.suspend == 1 || emp.suspend === true ? 'Suspended' : 'Active'}
                      </span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-primary" onClick={() => navigate(`/employee/${emp.id || emp.employee_id}`)}>
                        Profile
                      </button>
                      <button className="btn btn-sm btn-secondary" style={{ marginLeft: '0.25rem' }} onClick={() => openDetail(emp)}>
                        Quick View
                      </button>
                      {!(emp.suspend == 1 || emp.suspend === true) && (
                        <button className="btn btn-sm btn-danger" style={{ marginLeft: '0.25rem' }} onClick={() => setConfirmTerminate(emp)}>
                          Terminate
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination">
                <button className="btn btn-sm btn-secondary" disabled={page === 1} onClick={() => setPage(p => p - 1)}>‹ Prev</button>
                <span>Page {page} / {totalPages} ({totalCount} employees)</span>
                <button className="btn btn-sm btn-secondary" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>Next ›</button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Employee Detail Modal */}
      {selectedEmployee && (
        <div className="modal-overlay" onClick={closeDetail}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>👤 Employee Detail</h3>
              <button className="btn-close" onClick={closeDetail}>✕</button>
            </div>

            {detailLoading ? (
              <div className="loading-row"><div className="spinner" /><span>Loading…</span></div>
            ) : employeeDetail ? (
              <div className="detail-content">
                <div className="detail-section">
                  <h4>Basic Info</h4>
                  <div className="detail-grid">
                    <div className="detail-item"><span className="label">ID</span><span>{employeeDetail.id || employeeDetail.employee_id}</span></div>
                    <div className="detail-item"><span className="label">Name</span><span>{employeeDetail.displayname || employeeDetail.name || employeeDetail.full_name || employeeDetail.employee_name || '—'}</span></div>
                    <div className="detail-item"><span className="label">Email</span><span>{employeeDetail.email || '—'}</span></div>
                    <div className="detail-item"><span className="label">Phone</span><span>{employeeDetail.phone || employeeDetail.mobile || '—'}</span></div>
                    <div className="detail-item"><span className="label">Department</span><span>{employeeDetail.department || employeeDetail.dept_name || '—'}</span></div>
                    <div className="detail-item"><span className="label">Position</span><span>{employeeDetail.position || employeeDetail.job_title || '—'}</span></div>
                    <div className="detail-item"><span className="label">Join Date</span><span>{employeeDetail.join_date || employeeDetail.hire_date || '—'}</span></div>
                    <div className="detail-item"><span className="label">Status</span>
                      <span className={`badge ${employeeDetail.suspend == 1 ? 'status-suspended' : 'status-active'}`}>
                        {employeeDetail.suspend == 1 ? 'Suspended' : 'Active'}
                      </span>
                    </div>
                  </div>
                </div>

                {employeeDetail.cardInfo && (
                  <div className="detail-section">
                    <h4>🔖 Card / SSN Info</h4>
                    <div className="detail-grid">
                      {Object.entries(employeeDetail.cardInfo).map(([k, v]) => (
                        <div className="detail-item" key={k}>
                          <span className="label">{k}</span>
                          <span>{String(v ?? '—')}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {employeeDetail.assignments && employeeDetail.assignments.length > 0 && (
                  <div className="detail-section">
                    <h4>💳 Card Assignments ({employeeDetail.assignments.length})</h4>
                    <table className="data-table compact">
                      <thead>
                        <tr><th>ID</th><th>Card Data</th><th>Type</th><th>Status</th><th>Assigned At</th></tr>
                      </thead>
                      <tbody>
                        {employeeDetail.assignments.map(a => (
                          <tr key={a.id}>
                            <td><code>{a.id}</code></td>
                            <td><code>{a.cardData ? decodeHexCardData(a.cardData).decimal : '—'}</code></td>
                            <td>{a.cardType}</td>
                            <td><span className={`badge badge-${a.status}`}>{a.status}</span></td>
                            <td>{a.assignedAt ? new Date(a.assignedAt).toLocaleDateString() : '—'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {employeeDetail.error && (
                  <div className="alert alert-danger">{employeeDetail.error}</div>
                )}
              </div>
            ) : null}
          </div>
        </div>
      )}

      {/* Terminate Confirmation Modal */}
      {confirmTerminate && (
        <div className="modal-overlay" onClick={() => setConfirmTerminate(null)}>
          <div className="modal-box small" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>⚠️ Terminate Employee</h3>
              <button className="btn-close" onClick={() => setConfirmTerminate(null)}>✕</button>
            </div>
            <div className="modal-body">
              <p>Terminate <strong>{confirmTerminate.displayname || confirmTerminate.name || confirmTerminate.full_name || confirmTerminate.employee_name}</strong> (ID: {confirmTerminate.id || confirmTerminate.employee_id})?</p>
              <p className="hint">This will revoke all active card assignments and remove access from all devices.</p>
              <div className="form-field" style={{ marginTop: '0.75rem' }}>
                <label>Reason</label>
                <input
                  className="search-input"
                  value={terminateReason}
                  onChange={e => setTerminateReason(e.target.value)}
                  placeholder="e.g., Resignation, Contract ended…"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setConfirmTerminate(null)}>Cancel</button>
              <button className="btn btn-danger" disabled={loading} onClick={handleTerminate}>
                {loading ? 'Processing…' : 'Terminate & Revoke Cards'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
