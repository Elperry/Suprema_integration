/**
 * Processes Page
 * Lists all background operations (enrollment, sync, etc.) and lets operators
 * resolve card-assignment conflicts without re-running the whole enrollment.
 *
 * Polls GET /api/processes every 3 s for live status.
 */

import { useState, useEffect, useCallback, useRef } from 'react'
import { processAPI } from '../services/api'

// ── Helpers ───────────────────────────────────────────────────────────────────

const STATUS_COLOR = {
  pending:   '#888',
  running:   '#2196f3',
  completed: '#4caf50',
  failed:    '#f44336',
  cancelled: '#9e9e9e',
}

const TYPE_LABEL = {
  'enroll-multi':         'Bulk Enrollment',
  'user-sync-all':        'User Sync (All Devices)',
  'repair-all':           'Reconcile & Repair All',
  'event-sync-all':       'Event Sync (All Devices)',
  'import-csv':           'CSV Card Import',
  'hr-users-sync':        'HR User Sync',
  'sync-all':             'Sync All Devices',
}

function fmtDate(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleString()
}

function fmtDuration(a, b) {
  if (!a || !b) return ''
  const ms = new Date(b) - new Date(a)
  if (ms < 1000) return `${ms}ms`
  if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`
  return `${Math.floor(ms / 60000)}m ${Math.floor((ms % 60000) / 1000)}s`
}

function StatusBadge({ status }) {
  return (
    <span style={{
      display: 'inline-block',
      padding: '2px 10px',
      borderRadius: '12px',
      fontSize: '0.72rem',
      fontWeight: 700,
      background: STATUS_COLOR[status] || '#ccc',
      color: '#fff',
      letterSpacing: '0.02em',
      textTransform: 'uppercase',
    }}>
      {status}
    </span>
  )
}

function ProgressBar({ progress, total }) {
  const pct = total > 0 ? Math.round((progress / total) * 100) : 0
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 120 }}>
      <div style={{ flex: 1, height: 8, background: '#e0e0e0', borderRadius: 4, overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: '#2196f3', borderRadius: 4, transition: 'width .3s' }} />
      </div>
      <span style={{ fontSize: '0.78rem', color: '#666', whiteSpace: 'nowrap' }}>{progress}/{total}</span>
    </div>
  )
}

// ── Conflict Table ────────────────────────────────────────────────────────────

function ConflictTable({ process, onAction, actioning }) {
  const pending  = process.conflicts.filter(c => c.status === 'pending')
  const resolved = process.conflicts.filter(c => c.status !== 'pending')

  if (process.conflicts.length === 0) return (
    <p style={{ color: '#888', fontStyle: 'italic' }}>No card conflicts detected.</p>
  )

  return (
    <div>
      {pending.length > 0 && (
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <button
            className="btn btn-primary btn-sm"
            disabled={actioning === 'override-all'}
            onClick={() => onAction('override-all')}
          >
            {actioning === 'override-all' ? 'Overriding…' : `⚡ Override All (${pending.length})`}
          </button>
          <button
            className="btn btn-secondary btn-sm"
            disabled={actioning === 'cancel-all'}
            onClick={() => onAction('cancel-all')}
          >
            {actioning === 'cancel-all' ? 'Cancelling…' : `✖ Cancel All (${pending.length})`}
          </button>
          <span style={{ alignSelf: 'center', fontSize: '0.8rem', color: '#888' }}>
            Override reassigns the card to the target user. Cancel skips the conflict.
          </span>
        </div>
      )}

      <div style={{ overflowX: 'auto' }}>
        <table className="table" style={{ fontSize: '0.875rem' }}>
          <thead>
            <tr>
              <th>Device</th>
              <th>Target User</th>
              <th>Card</th>
              <th>Conflicting User</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {process.conflicts.map(c => (
              <tr key={c.id} style={{ background: c.status === 'pending' ? '#fff8e1' : 'transparent' }}>
                <td>{c.deviceName || c.deviceDbId}</td>
                <td>
                  <strong>{c.employeeName || c.userId}</strong>
                  {c.employeeId && <div style={{ fontSize: '0.75rem', color: '#888' }}>EID: {c.employeeId}</div>}
                </td>
                <td style={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
                  {c.cardData ? `${String(c.cardData).slice(0, 12)}…` : '—'}
                </td>
                <td>
                  {c.conflictingUserId ? (
                    <>
                      <strong style={{ color: '#c62828' }}>{c.conflictingEmployeeName || c.conflictingUserId}</strong>
                      {c.conflictingEmployeeId && (
                        <div style={{ fontSize: '0.75rem', color: '#888' }}>EID: {c.conflictingEmployeeId}</div>
                      )}
                    </>
                  ) : (
                    <span style={{ color: '#888' }} title="The device rejected this card as a duplicate but the conflicting holder could not be identified on the device or in the database. This usually means the card is held by a user we did not scan, or by a firmware-internal record. Try re-syncing users from the device or re-enrolling the card directly on the reader.">
                      Unresolved duplicate
                    </span>
                  )}
                </td>
                <td>
                  {c.status === 'pending'    && <StatusBadge status="pending" />}
                  {c.status === 'overridden' && <StatusBadge status="completed" />}
                  {c.status === 'cancelled'  && <StatusBadge status="cancelled" />}
                </td>
                <td>
                  {c.status === 'pending' && (
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button
                        className="btn btn-primary btn-sm"
                        style={{ padding: '2px 8px', fontSize: '0.78rem' }}
                        disabled={!!actioning}
                        onClick={() => onAction('override', c.id)}
                      >
                        {actioning === c.id ? '…' : 'Override'}
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '2px 8px', fontSize: '0.78rem' }}
                        disabled={!!actioning}
                        onClick={() => onAction('cancel', c.id)}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                  {c.status === 'overridden' && (
                    <span style={{ color: '#4caf50', fontSize: '0.8rem' }}>✔ Card reassigned</span>
                  )}
                  {c.status === 'cancelled' && (
                    <span style={{ color: '#9e9e9e', fontSize: '0.8rem' }}>✖ Skipped</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {resolved.length > 0 && (
        <div style={{ fontSize: '0.78rem', color: '#888', marginTop: 4 }}>
          {resolved.filter(c => c.status === 'overridden').length} overridden,&nbsp;
          {resolved.filter(c => c.status === 'cancelled').length} cancelled
        </div>
      )}
    </div>
  )
}

// ── Results Summary ───────────────────────────────────────────────────────────

function ResultsSummary({ results }) {
  if (!results || results.length === 0) return null
  const ok    = results.filter(r => r.success !== false).length
  const fail  = results.filter(r => r.success === false).length
  const errors = results.filter(r => r.success === false)

  return (
    <div>
      <p style={{ margin: '0 0 8px' }}>
        <span style={{ color: '#4caf50', fontWeight: 600 }}>{ok} enrolled</span>
        {fail > 0 && <>,&nbsp;<span style={{ color: '#f44336', fontWeight: 600 }}>{fail} failed</span></>}
      </p>
      {errors.length > 0 && (
        <details>
          <summary style={{ cursor: 'pointer', fontSize: '0.85rem', color: '#888' }}>Show errors ({errors.length})</summary>
          <ul style={{ margin: '8px 0 0 16px', fontSize: '0.82rem', color: '#c62828' }}>
            {errors.map((r, i) => (
              <li key={i}>{r.employeeName || r.userId} on {r.deviceName || r.deviceId}: {r.error}</li>
            ))}
          </ul>
        </details>
      )}
    </div>
  )
}

// ── Logs Panel ────────────────────────────────────────────────────────────────

function LogsPanel({ logs }) {
  if (!logs || logs.length === 0) return <p style={{ color: '#888', fontStyle: 'italic' }}>No logs yet.</p>

  const LEVEL_COLOR = { info: '#333', warning: '#e65100', error: '#c62828' }

  return (
    <div style={{
      maxHeight: 200,
      overflowY: 'auto',
      background: '#fafafa',
      border: '1px solid #e0e0e0',
      borderRadius: 6,
      padding: 8,
      fontFamily: 'monospace',
      fontSize: '0.78rem',
    }}>
      {[...logs].reverse().map((l, i) => (
        <div key={i} style={{ color: LEVEL_COLOR[l.level] || '#333', marginBottom: 2 }}>
          <span style={{ color: '#aaa' }}>{new Date(l.time).toLocaleTimeString()} </span>
          [{l.level.toUpperCase()}] {l.message}
        </div>
      ))}
    </div>
  )
}

// ── Detail Panel ─────────────────────────────────────────────────────────────

function ProcessDetail({ process, onClose, onRefresh }) {
  const [actioning, setActioning] = useState(null)
  const [error, setError] = useState(null)
  const [tab, setTab] = useState('conflicts') // conflicts | results | logs

  const pendingConflicts = process.conflicts.filter(c => c.status === 'pending').length

  const handleConflictAction = async (action, conflictId) => {
    setError(null)
    const key = action === 'override' || action === 'cancel' ? conflictId : action
    setActioning(key)
    try {
      if (action === 'override') {
        await processAPI.resolveConflict(process.id, conflictId, 'override')
      } else if (action === 'cancel') {
        await processAPI.resolveConflict(process.id, conflictId, 'cancel')
      } else if (action === 'override-all') {
        await processAPI.overrideAll(process.id)
      } else if (action === 'cancel-all') {
        await processAPI.cancelAllConflicts(process.id)
      }
      await onRefresh()
    } catch (e) {
      setError(e.response?.data?.message || e.message)
    } finally {
      setActioning(null)
    }
  }

  const handleCancel = async () => {
    if (!window.confirm('Cancel this process?')) return
    try {
      await processAPI.cancel(process.id)
      await onRefresh()
    } catch (e) {
      setError(e.response?.data?.message || e.message)
    }
  }

  return (
    <div style={{
      border: '1px solid #e0e0e0',
      borderRadius: 8,
      padding: 20,
      background: '#fff',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      marginTop: 16,
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
        <div>
          <h3 style={{ margin: 0 }}>
            {TYPE_LABEL[process.type] || process.type}
            &nbsp;<StatusBadge status={process.status} />
            {pendingConflicts > 0 && (
              <span style={{
                marginLeft: 8, background: '#ff9800', color: '#fff',
                borderRadius: 12, padding: '2px 8px', fontSize: '0.72rem',
              }}>
                {pendingConflicts} conflict{pendingConflicts !== 1 ? 's' : ''} need attention
              </span>
            )}
          </h3>
          <div style={{ fontSize: '0.82rem', color: '#888', marginTop: 4 }}>
            Started {fmtDate(process.createdAt)}
            {process.status === 'completed' && ` · Duration: ${fmtDuration(process.createdAt, process.updatedAt)}`}
            {process.metadata?.userCount && ` · ${process.metadata.userCount} user(s) · ${process.metadata.deviceCount} device(s)`}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {['pending', 'running'].includes(process.status) && (
            <button className="btn btn-warning btn-sm" onClick={handleCancel}>⏹ Cancel</button>
          )}
          <button className="btn btn-secondary btn-sm" onClick={onClose}>✕ Close</button>
        </div>
      </div>

      {/* Progress */}
      {process.total > 0 && (
        <div style={{ marginBottom: 16 }}>
          <ProgressBar progress={process.progress} total={process.total} />
        </div>
      )}

      {error && (
        <div className="alert alert-danger" style={{ marginBottom: 12, padding: '8px 12px', borderRadius: 6 }}>
          {error}
        </div>
      )}

      {/* Tabs */}
      <div style={{ borderBottom: '1px solid #e0e0e0', marginBottom: 16 }}>
        {[
          { key: 'conflicts', label: `Conflicts (${process.conflicts.length})` },
          { key: 'results',   label: `Results (${process.results.length})` },
          { key: 'logs',      label: `Logs (${process.logs.length})` },
        ].map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            style={{
              background: 'none',
              border: 'none',
              padding: '8px 16px',
              cursor: 'pointer',
              fontWeight: tab === t.key ? 700 : 400,
              borderBottom: tab === t.key ? '2px solid #2196f3' : '2px solid transparent',
              color: tab === t.key ? '#2196f3' : '#555',
              marginBottom: -1,
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'conflicts' && (
        <ConflictTable process={process} onAction={handleConflictAction} actioning={actioning} />
      )}
      {tab === 'results' && <ResultsSummary results={process.results} />}
      {tab === 'logs'    && <LogsPanel logs={process.logs} />}
    </div>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function Processes() {
  const [processes, setProcesses] = useState([])
  const [selectedId, setSelectedId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const pollRef = useRef(null)

  const load = useCallback(async (quiet = false) => {
    try {
      const res = await processAPI.getAll()
      setProcesses(res.data.data || [])
      if (!quiet) setError(null)
    } catch (e) {
      setError('Failed to load processes: ' + (e.response?.data?.message || e.message))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
    pollRef.current = setInterval(() => load(true), 3000)
    return () => clearInterval(pollRef.current)
  }, [load])

  const selectedProcess = processes.find(p => p.id === selectedId) || null

  if (loading) return (
    <div className="loading">
      <div className="loading-spinner" />
      <p>Loading processes…</p>
    </div>
  )

  return (
    <div className="page-container" style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <h2 style={{ margin: 0 }}>⚙️ Background Processes</h2>
        <button className="btn btn-secondary btn-sm" onClick={() => load()}>↻ Refresh</button>
      </div>

      {error && (
        <div className="alert alert-danger" style={{ marginBottom: 16, padding: '10px 14px', borderRadius: 6 }}>
          {error}
        </div>
      )}

      {processes.length === 0 ? (
        <div style={{
          textAlign: 'center', padding: '48px 0', color: '#999',
          background: '#fafafa', border: '1px dashed #ddd', borderRadius: 8,
        }}>
          <div style={{ fontSize: '2rem', marginBottom: 8 }}>📋</div>
          <p>No background processes yet.</p>
          <p style={{ fontSize: '0.85rem' }}>
            Bulk enrollment and sync operations will appear here.
          </p>
        </div>
      ) : (
        <>
          {/* Process list */}
          <div style={{ overflowX: 'auto', marginBottom: 8 }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Progress</th>
                  <th>Conflicts</th>
                  <th>Started</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {processes.map(p => {
                  const pendingConflicts = p.conflicts.filter(c => c.status === 'pending').length
                  const isSelected = p.id === selectedId
                  return (
                    <tr
                      key={p.id}
                      style={{
                        background: isSelected ? '#e3f2fd' : pendingConflicts > 0 ? '#fff8e1' : 'transparent',
                        cursor: 'pointer',
                      }}
                      onClick={() => setSelectedId(isSelected ? null : p.id)}
                    >
                      <td>
                        <strong>{TYPE_LABEL[p.type] || p.type}</strong>
                        {p.metadata?.userCount && (
                          <div style={{ fontSize: '0.75rem', color: '#888' }}>
                            {p.metadata.userCount} user(s) · {p.metadata.deviceCount} device(s)
                          </div>
                        )}
                      </td>
                      <td><StatusBadge status={p.status} /></td>
                      <td>
                        {p.total > 0 ? <ProgressBar progress={p.progress} total={p.total} />
                          : <span style={{ color: '#aaa', fontSize: '0.8rem' }}>—</span>}
                      </td>
                      <td>
                        {pendingConflicts > 0 ? (
                          <span style={{
                            background: '#ff9800', color: '#fff',
                            borderRadius: 12, padding: '2px 8px', fontSize: '0.72rem', fontWeight: 700,
                          }}>
                            {pendingConflicts} pending
                          </span>
                        ) : p.conflicts.length > 0 ? (
                          <span style={{ color: '#4caf50', fontSize: '0.8rem' }}>✔ all resolved</span>
                        ) : (
                          <span style={{ color: '#aaa', fontSize: '0.8rem' }}>none</span>
                        )}
                      </td>
                      <td style={{ fontSize: '0.82rem', color: '#666' }}>
                        {fmtDate(p.createdAt)}
                        {p.status === 'completed' && (
                          <div style={{ fontSize: '0.75rem', color: '#aaa' }}>
                            {fmtDuration(p.createdAt, p.updatedAt)}
                          </div>
                        )}
                      </td>
                      <td>
                        <button
                          className={`btn btn-sm ${isSelected ? 'btn-secondary' : 'btn-outline'}`}
                          onClick={e => { e.stopPropagation(); setSelectedId(isSelected ? null : p.id) }}
                        >
                          {isSelected ? '▲ Hide' : '▼ Details'}
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Detail panel */}
          {selectedProcess && (
            <ProcessDetail
              process={selectedProcess}
              onClose={() => setSelectedId(null)}
              onRefresh={() => load(true)}
            />
          )}
        </>
      )}
    </div>
  )
}
