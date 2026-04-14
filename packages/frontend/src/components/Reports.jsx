import { useState, useEffect } from 'react'
import { reportAPI, deviceAPI } from '../services/api'
import { useNotification } from './Notifications'

const REPORT_DEFS = [
  { key: 'users', label: 'User Detail Report', description: 'All enrolled users across devices', icon: '👤', params: ['deviceId'] },
  { key: 'usersInDevice', label: 'Users in Device', description: 'Users enrolled on a specific device', icon: '📱', params: ['deviceId'], required: ['deviceId'] },
  { key: 'usersWithoutCredential', label: 'Users Without Enrollment', description: 'Card holders with no active device enrollment', icon: '⚠️', params: [] },
  { key: 'cards', label: 'All Cards', description: 'All card assignments with enrollment details', icon: '💳', params: ['status'] },
  { key: 'inactiveCards', label: 'Inactive Cards', description: 'Revoked, lost, and expired cards', icon: '🚫', params: [] },
  { key: 'devices', label: 'Device Status', description: 'Device fleet status overview', icon: '🖥️', params: [] },
  { key: 'events', label: 'Custom Event Report', description: 'Events with filters', icon: '📋', params: ['deviceId', 'eventType', 'authResult', 'userId', 'startDate', 'endDate', 'limit'] },
  { key: 'enrollments', label: 'Enrollment Log', description: 'Enrollment operation log', icon: '🎫', params: ['deviceId', 'success', 'operation', 'limit'] },
  { key: 'replicationLag', label: 'Replication Lag', description: 'Event replication lag per device', icon: '🔁', params: [] },
]

export default function Reports() {
  const { showNotification } = useNotification()
  const [devices, setDevices] = useState([])
  const [selectedReport, setSelectedReport] = useState('users')
  const [params, setParams] = useState({})
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    deviceAPI.getAll().then(r => setDevices(r.data.data || [])).catch(() => {})
  }, [])

  const report = REPORT_DEFS.find(r => r.key === selectedReport)

  const runReport = async () => {
    if (report?.required) {
      for (const r of report.required) {
        if (!params[r]) {
          showNotification(`${r} is required for this report`, 'error')
          return
        }
      }
    }
    setLoading(true)
    setData(null)
    try {
      const cleanParams = Object.fromEntries(Object.entries(params).filter(([, v]) => v !== '' && v !== undefined))
      const res = await reportAPI[selectedReport](cleanParams)
      setData(res.data)
    } catch (e) {
      showNotification(e.response?.data?.message || 'Failed to load report', 'error')
    } finally {
      setLoading(false)
    }
  }

  const exportReport = (format) => {
    const cleanParams = Object.fromEntries(Object.entries(params).filter(([, v]) => v !== '' && v !== undefined))
    const qs = new URLSearchParams({ ...cleanParams, format }).toString()
    const base = import.meta.env.VITE_API_URL || 'http://localhost:3000'
    const pathMap = {
      users: '/api/reports/users',
      usersInDevice: '/api/reports/users-in-device',
      usersWithoutCredential: '/api/reports/users-without-credential',
      cards: '/api/reports/cards',
      inactiveCards: '/api/reports/cards/inactive',
      devices: '/api/reports/devices',
      events: '/api/reports/events',
      enrollments: '/api/reports/enrollments',
      replicationLag: '/api/reports/replication-lag',
    }
    window.open(`${base}${pathMap[selectedReport]}?${qs}`, '_blank')
  }

  const updateParam = (key, value) => setParams(p => ({ ...p, [key]: value }))

  const renderParamInput = (p) => {
    if (p === 'deviceId') {
      return (
        <select key={p} value={params.deviceId || ''} onChange={e => updateParam('deviceId', e.target.value)} className="form-control" style={{ width: 'auto' }}>
          <option value="">All Devices</option>
          {devices.map(d => <option key={d.id} value={d.id}>{d.name} ({d.ip})</option>)}
        </select>
      )
    }
    if (p === 'eventType') {
      return (
        <select key={p} value={params.eventType || ''} onChange={e => updateParam('eventType', e.target.value)} className="form-control" style={{ width: 'auto' }}>
          <option value="">All Types</option>
          <option value="authentication">Authentication</option>
          <option value="door">Door</option>
          <option value="zone">Zone</option>
          <option value="system">System</option>
          <option value="user">User</option>
          <option value="attendance">Attendance</option>
        </select>
      )
    }
    if (p === 'authResult') {
      return (
        <select key={p} value={params.authResult || ''} onChange={e => updateParam('authResult', e.target.value)} className="form-control" style={{ width: 'auto' }}>
          <option value="">All</option>
          <option value="success">Success</option>
          <option value="fail">Failed</option>
        </select>
      )
    }
    if (p === 'status') {
      return (
        <select key={p} value={params.status || ''} onChange={e => updateParam('status', e.target.value)} className="form-control" style={{ width: 'auto' }}>
          <option value="">All Statuses</option>
          <option value="active">Active</option>
          <option value="revoked">Revoked</option>
          <option value="lost">Lost</option>
          <option value="expired">Expired</option>
        </select>
      )
    }
    if (p === 'success') {
      return (
        <select key={p} value={params.success ?? ''} onChange={e => updateParam('success', e.target.value)} className="form-control" style={{ width: 'auto' }}>
          <option value="">All</option>
          <option value="true">Success</option>
          <option value="false">Failed</option>
        </select>
      )
    }
    if (p === 'startDate' || p === 'endDate') {
      return <input key={p} type="datetime-local" value={params[p] || ''} onChange={e => updateParam(p, e.target.value)} className="form-control" style={{ width: 'auto' }} placeholder={p} />
    }
    return <input key={p} type="text" value={params[p] || ''} onChange={e => updateParam(p, e.target.value)} className="form-control" style={{ width: 'auto', minWidth: '120px' }} placeholder={p} />
  }

  const columns = data?.data?.length > 0 ? Object.keys(data.data[0]) : []

  return (
    <div className="page">
      <h2>📊 Reports</h2>

      <div className="card">
        <div className="card-header">
          <h3>Report Selection</h3>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px', marginBottom: '20px' }}>
          {REPORT_DEFS.map(r => (
            <div
              key={r.key}
              onClick={() => { setSelectedReport(r.key); setData(null); setParams({}) }}
              style={{
                padding: '16px',
                borderRadius: '8px',
                border: selectedReport === r.key ? '2px solid var(--primary-color, #2563eb)' : '1px solid var(--border-color, #e2e8f0)',
                background: selectedReport === r.key ? '#eff6ff' : 'var(--card-bg, #fff)',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              <div style={{ fontSize: '1.5rem', marginBottom: '6px' }}>{r.icon}</div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '4px' }}>{r.label}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary, #64748b)', lineHeight: 1.3 }}>{r.description}</div>
            </div>
          ))}
        </div>

        {report?.params.length > 0 && (
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '15px' }}>
            {report.params.map(renderParamInput)}
          </div>
        )}

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button onClick={runReport} className="btn btn-primary" disabled={loading}>
            {loading ? '⏳ Loading...' : '▶️ Run Report'}
          </button>
          <button onClick={() => exportReport('csv')} className="btn btn-secondary" disabled={loading}>📥 CSV</button>
          <button onClick={() => exportReport('xls')} className="btn btn-secondary" disabled={loading}>📥 Excel</button>
          <button onClick={() => exportReport('json')} className="btn btn-secondary" disabled={loading}>📥 JSON</button>
        </div>
      </div>

      {data && (
        <div className="card">
          <div className="card-header">
            <h3>{report?.label} ({data.total ?? data.data?.length ?? 0} rows)</h3>
          </div>
          {data.data?.length > 0 ? (
            <div style={{ overflowX: 'auto' }}>
              <table className="table">
                <thead>
                  <tr>{columns.map(c => <th key={c}>{c}</th>)}</tr>
                </thead>
                <tbody>
                  {data.data.slice(0, 200).map((row, i) => (
                    <tr key={i}>
                      {columns.map(c => (
                        <td key={c} style={{ maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {row[c] === null || row[c] === undefined ? '-' : typeof row[c] === 'boolean' ? (row[c] ? '✅' : '❌') : String(row[c])}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              {data.data.length > 200 && (
                <p style={{ textAlign: 'center', color: '#999', padding: '10px' }}>
                  Showing first 200 of {data.data.length} rows. Export for full data.
                </p>
              )}
            </div>
          ) : (
            <p style={{ textAlign: 'center', color: '#999', padding: '30px' }}>
                  <span style={{ display: 'block', fontSize: '2rem', marginBottom: '0.5rem' }}>📭</span>
                  No data found for this report. Try adjusting the parameters or selecting a different report type.
                </p>
          )}
        </div>
      )}

      <style>{`
        .table { width: 100%; border-collapse: collapse; }
        .table th { padding: 10px; text-align: left; border-bottom: 2px solid #ddd; background: #f5f5f5; font-size: 12px; }
        .table td { padding: 8px 10px; border-bottom: 1px solid #eee; font-size: 13px; }
        .table tr:hover { background: #f9f9f9; }
        .card-header { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; margin-bottom: 15px; }
        .card h3 { margin: 0; }
      `}</style>
    </div>
  )
}
