import { useCallback, useEffect, useState } from 'react'
import { auditAPI } from '../services/api'
import { useNotification } from './Notifications'
import './AuditLog.css'

const formatDateTime = (value) => {
  if (!value) return '—'
  try {
    return new Date(value).toLocaleString()
  } catch {
    return '—'
  }
}

const STATUS_CLASS = {
  success: 'status-success',
  failure: 'status-danger',
  partial: 'status-warning',
}

const CATEGORIES = ['', 'sync', 'enrollment', 'export', 'device', 'user', 'general']
const STATUSES = ['', 'success', 'failure', 'partial']

export default function AuditLog() {
  const notify = useNotification()
  const [logs, setLogs] = useState([])
  const [summary, setSummary] = useState(null)
  const [pagination, setPagination] = useState({ page: 1, limit: 50, total: 0, totalPages: 0 })
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    action: '',
    startDate: '',
    endDate: '',
  })

  const loadLogs = useCallback(async (page = 1) => {
    setLoading(true)
    try {
      const params = { page, limit: 50 }
      if (filters.category) params.category = filters.category
      if (filters.status) params.status = filters.status
      if (filters.action) params.action = filters.action
      if (filters.startDate) params.startDate = filters.startDate
      if (filters.endDate) params.endDate = filters.endDate

      const [logsRes, summaryRes] = await Promise.all([
        auditAPI.getLogs(params),
        auditAPI.getSummary({ startDate: filters.startDate || undefined, endDate: filters.endDate || undefined }),
      ])

      setLogs(logsRes.data?.data || [])
      setPagination(logsRes.data?.pagination || { page: 1, limit: 50, total: 0, totalPages: 0 })
      setSummary(summaryRes.data?.data || null)
    } catch (err) {
      notify.error(err.userMessage || 'Failed to load audit logs')
    } finally {
      setLoading(false)
    }
  }, [filters, notify])

  useEffect(() => {
    loadLogs(1)
  }, [loadLogs])

  const exportLogs = async (format) => {
    try {
      const params = { format }
      if (filters.category) params.category = filters.category
      if (filters.status) params.status = filters.status
      if (filters.action) params.action = filters.action
      if (filters.startDate) params.startDate = filters.startDate
      if (filters.endDate) params.endDate = filters.endDate

      const response = await auditAPI.exportLogs(params)
      const blob = response.data instanceof Blob ? response.data : new Blob([response.data])
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `audit_log.${format === 'xls' ? 'xls' : 'csv'}`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      notify.success(`Audit log exported as ${format.toUpperCase()}`)
    } catch (err) {
      notify.error(err.userMessage || 'Failed to export audit log')
    }
  }

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="audit-log-page">
      <div className="page-header audit-header">
        <div>
          <h2>📋 Audit Log</h2>
          <p className="audit-subtitle">Review administrative actions, repairs, sync operations, and exports.</p>
        </div>
        <div className="audit-toolbar">
          <button className="btn btn-secondary" onClick={() => loadLogs(pagination.page)}>↻ Refresh</button>
          <button className="btn btn-secondary btn-sm" onClick={() => exportLogs('csv')}>Export CSV</button>
          <button className="btn btn-secondary btn-sm" onClick={() => exportLogs('xls')}>Export Excel</button>
        </div>
      </div>

      {summary && (
        <div className="stats-row audit-stats">
          <div className="stat-card"><div className="stat-value">{summary.total}</div><div className="stat-label">Total Entries</div></div>
          {summary.byStatus.map((s) => (
            <div key={s.status} className="stat-card">
              <div className={`stat-value ${STATUS_CLASS[s.status] || ''}`}>{s.count}</div>
              <div className="stat-label">{s.status.charAt(0).toUpperCase() + s.status.slice(1)}</div>
            </div>
          ))}
        </div>
      )}

      <div className="card audit-filters">
        <div className="filter-grid audit-filter-grid">
          <div className="filter-field">
            <label>Category</label>
            <select className="select-input" value={filters.category} onChange={(e) => updateFilter('category', e.target.value)}>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c || 'All categories'}</option>
              ))}
            </select>
          </div>
          <div className="filter-field">
            <label>Status</label>
            <select className="select-input" value={filters.status} onChange={(e) => updateFilter('status', e.target.value)}>
              {STATUSES.map((s) => (
                <option key={s} value={s}>{s || 'All statuses'}</option>
              ))}
            </select>
          </div>
          <div className="filter-field">
            <label>Action</label>
            <input className="text-input" placeholder="e.g. repair-device" value={filters.action} onChange={(e) => updateFilter('action', e.target.value)} />
          </div>
          <div className="filter-field">
            <label>Start Date</label>
            <input className="text-input" type="date" value={filters.startDate} onChange={(e) => updateFilter('startDate', e.target.value)} />
          </div>
          <div className="filter-field">
            <label>End Date</label>
            <input className="text-input" type="date" value={filters.endDate} onChange={(e) => updateFilter('endDate', e.target.value)} />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="loading-row"><div className="spinner" /><span>Loading audit logs…</span></div>
      ) : (
        <div className="card">
          <table className="data-table audit-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Action</th>
                <th>Category</th>
                <th>Target</th>
                <th>Status</th>
                <th>Duration</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {logs.length === 0 ? (
                <tr><td colSpan={7} className="empty-cell">
                  <div style={{ padding: '2rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📋</div>
                    <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>No audit log entries found</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                      Audit entries are created automatically when sync, enrollment, export, or device operations are performed.
                      Try adjusting your filters or perform an operation to generate log entries.
                    </div>
                  </div>
                </td></tr>
              ) : logs.map((entry) => (
                <tr key={entry.id}>
                  <td className="nowrap">{formatDateTime(entry.createdAt)}</td>
                  <td><code>{entry.action}</code></td>
                  <td><span className="category-badge">{entry.category}</span></td>
                  <td>
                    {entry.targetType ? (
                      <span>{entry.targetType}{entry.targetId ? ` #${entry.targetId}` : ''}</span>
                    ) : '—'}
                  </td>
                  <td>
                    <span className={`status-pill ${entry.status === 'success' ? 'online' : entry.status === 'failure' ? 'offline' : 'warning'}`}>
                      {entry.status}
                    </span>
                  </td>
                  <td>{entry.duration != null ? `${entry.duration}ms` : '—'}</td>
                  <td className="detail-cell">
                    {entry.errorMessage ? (
                      <span className="error-text" title={entry.errorMessage}>{entry.errorMessage.slice(0, 80)}{entry.errorMessage.length > 80 ? '…' : ''}</span>
                    ) : entry.details ? (
                      <span className="detail-text" title={JSON.stringify(entry.details, null, 2)}>
                        {JSON.stringify(entry.details).slice(0, 60)}{JSON.stringify(entry.details).length > 60 ? '…' : ''}
                      </span>
                    ) : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {pagination.totalPages > 1 && (
            <div className="pagination-row">
              <button className="btn btn-secondary btn-sm" disabled={pagination.page <= 1} onClick={() => loadLogs(pagination.page - 1)}>← Previous</button>
              <span className="pagination-info">Page {pagination.page} of {pagination.totalPages} ({pagination.total} total)</span>
              <button className="btn btn-secondary btn-sm" disabled={pagination.page >= pagination.totalPages} onClick={() => loadLogs(pagination.page + 1)}>Next →</button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
