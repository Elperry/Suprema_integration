import React, { useState, useEffect, useCallback } from 'react'
import { enrollmentAPI, deviceAPI, cardAPI } from '../services/api'
import './CardAssignments.css'

const STATUS_OPTIONS = ['active', 'revoked', 'lost', 'expired']
const CARD_TYPES = ['CSN', 'SmartCard', 'QR', 'BLE', 'Mobile']

const decodeHex = (hex) => {
  try {
    if (!hex) return 'N/A'
    const clean = hex.replace(/[^0-9A-Fa-f]/g, '')
    if (!clean) return 'N/A'
    return BigInt('0x' + clean).toString()
  } catch { return 'N/A' }
}

export default function CardAssignments() {
  const [assignments, setAssignments] = useState([])
  const [devices, setDevices] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [page, setPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const PAGE_SIZE = 25

  // Filters
  const [filterStatus, setFilterStatus] = useState('')
  const [filterEmployee, setFilterEmployee] = useState('')
  const [searchText, setSearchText] = useState('')

  // Modal
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState({ employeeId: '', employeeName: '', cardData: '', cardType: 'CSN', notes: '' })
  const [saving, setSaving] = useState(false)
  const [confirmRevoke, setConfirmRevoke] = useState(null)

  // Enrollment modal
  const [showEnrollModal, setShowEnrollModal] = useState(false)
  const [enrollTarget, setEnrollTarget] = useState(null)
  const [selectedDevices, setSelectedDevices] = useState([])
  const [enrolling, setEnrolling] = useState(false)

  // Replacement modal
  const [showReplaceModal, setShowReplaceModal] = useState(false)
  const [replaceTarget, setReplaceTarget] = useState(null)
  const [replaceForm, setReplaceForm] = useState({ cardData: '', cardType: 'CSN', notes: '' })
  const [replacing, setReplacing] = useState(false)

  // History modal
  const [showHistoryModal, setShowHistoryModal] = useState(false)
  const [historyEmployee, setHistoryEmployee] = useState(null)
  const [cardHistory, setCardHistory] = useState([])
  const [historyLoading, setHistoryLoading] = useState(false)

  // Detail expand
  const [expandedRow, setExpandedRow] = useState(null)
  const [rowEnrollments, setRowEnrollments] = useState({})

  // Tab
  const [activeTab, setActiveTab] = useState('assignments')

  // Blacklist state
  const [blacklist, setBlacklist] = useState([])
  const [blacklistLoading, setBlacklistLoading] = useState(false)
  const [blacklistDevice, setBlacklistDevice] = useState('')
  const [blacklistForm, setBlacklistForm] = useState({ cardData: '', reason: '' })
  const [showBlacklistModal, setShowBlacklistModal] = useState(false)
  const [blacklistSaving, setBlacklistSaving] = useState(false)

  const loadAssignments = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const params = { page, pageSize: PAGE_SIZE }
      if (filterStatus) params.status = filterStatus
      if (filterEmployee) params.employeeId = filterEmployee
      const res = await enrollmentAPI.getCardAssignments(params)
      const data = res.data?.data || res.data || []
      setAssignments(Array.isArray(data) ? data : [])
      setTotalCount(res.data?.total || res.data?.count || data.length)
    } catch (e) {
      setError(e.userMessage || 'Failed to load card assignments')
    } finally {
      setLoading(false)
    }
  }, [page, filterStatus, filterEmployee])

  const loadDevices = async () => {
    try {
      const res = await deviceAPI.getAll()
      setDevices(res.data?.data || res.data || [])
    } catch {}
  }

  useEffect(() => { loadAssignments() }, [loadAssignments])
  useEffect(() => { loadDevices() }, [])

  const applyFilter = (e) => { e.preventDefault(); setPage(1); loadAssignments() }
  const clearFilter = () => { setFilterStatus(''); setFilterEmployee(''); setSearchText(''); setPage(1) }

  // Create
  const openCreate = () => {
    setEditingId(null)
    setForm({ employeeId: '', employeeName: '', cardData: '', cardType: 'CSN', notes: '' })
    setShowModal(true)
  }

  const handleSave = async () => {
    if (!form.employeeId.trim()) { setError('Employee ID is required'); return }
    if (!form.cardData.trim()) { setError('Card data is required'); return }
    setSaving(true)
    setError(null)
    try {
      const payload = {
        employeeId: form.employeeId.trim(),
        employeeName: form.employeeName.trim() || undefined,
        cardData: form.cardData.trim(),
        cardType: form.cardType,
        notes: form.notes.trim() || undefined,
      }
      await enrollmentAPI.assignCard(payload)
      setSuccess('Card assignment created successfully')
      setShowModal(false)
      loadAssignments()
    } catch (e) {
      setError(e.userMessage || 'Failed to create assignment')
    } finally {
      setSaving(false)
    }
  }

  // Status update
  const handleStatusChange = async (id, newStatus) => {
    try {
      await enrollmentAPI.updateCardStatus(id, newStatus)
      setSuccess(`Status updated to "${newStatus}"`)
      setAssignments(p => p.map(a => a.id === id ? { ...a, status: newStatus } : a))
    } catch (e) {
      setError(e.userMessage || 'Failed to update status')
    }
  }

  // Revoke
  const handleRevoke = async (assignment) => {
    try {
      await enrollmentAPI.revokeCard(assignment.id)
      setSuccess('Card assignment revoked')
      setConfirmRevoke(null)
      loadAssignments()
    } catch (e) {
      setError(e.userMessage || 'Revoke failed')
    }
  }

  // Enroll on devices
  const openEnroll = (assignment) => {
    setEnrollTarget(assignment)
    setSelectedDevices([])
    setShowEnrollModal(true)
  }

  const handleEnroll = async () => {
    if (!selectedDevices.length) { setError('Select at least one device'); return }
    setEnrolling(true)
    setError(null)
    try {
      await enrollmentAPI.enrollOnMultipleDevices(selectedDevices, enrollTarget.id)
      setSuccess(`Enrolled on ${selectedDevices.length} device(s)`)
      setShowEnrollModal(false)
    } catch (e) {
      setError(e.userMessage || 'Enrollment failed')
    } finally {
      setEnrolling(false)
    }
  }

  // Card replacement workflow
  const openReplace = (assignment) => {
    setReplaceTarget(assignment)
    setReplaceForm({ cardData: '', cardType: assignment.cardType || 'CSN', notes: '' })
    setShowReplaceModal(true)
  }

  const handleReplace = async () => {
    if (!replaceForm.cardData.trim()) { setError('New card data is required'); return }
    setReplacing(true)
    setError(null)
    try {
      await enrollmentAPI.replaceCard(replaceTarget.id, {
        cardData: replaceForm.cardData.trim(),
        cardType: replaceForm.cardType,
        notes: replaceForm.notes.trim() || undefined
      })
      setSuccess('Card replaced successfully. Old card revoked and new card enrolled on same devices.')
      setShowReplaceModal(false)
      loadAssignments()
    } catch (e) {
      setError(e.userMessage || 'Card replacement failed')
    } finally {
      setReplacing(false)
    }
  }

  // Card history
  const openHistory = async (assignment) => {
    setHistoryEmployee(assignment.employeeId)
    setShowHistoryModal(true)
    setHistoryLoading(true)
    try {
      const res = await enrollmentAPI.getCardHistory(assignment.employeeId)
      setCardHistory(res.data?.data || [])
    } catch (e) {
      setError(e.userMessage || 'Failed to load card history')
      setCardHistory([])
    } finally {
      setHistoryLoading(false)
    }
  }

  // Expand row to see device enrollments
  const toggleExpand = async (a) => {
    if (expandedRow === a.id) { setExpandedRow(null); return }
    setExpandedRow(a.id)
    if (rowEnrollments[a.id]) return
    try {
      const res = await enrollmentAPI.getCardEnrollments(a.id)
      setRowEnrollments(p => ({ ...p, [a.id]: res.data?.data || res.data || [] }))
    } catch {
      setRowEnrollments(p => ({ ...p, [a.id]: [] }))
    }
  }

  // Blacklist functions
  const loadBlacklist = useCallback(async () => {
    if (!blacklistDevice) return
    setBlacklistLoading(true)
    try {
      const res = await cardAPI.getBlacklist(parseInt(blacklistDevice))
      setBlacklist(res.data?.data || res.data || [])
    } catch {
      setBlacklist([])
    } finally {
      setBlacklistLoading(false)
    }
  }, [blacklistDevice])

  useEffect(() => {
    if (activeTab === 'blacklist' && blacklistDevice) loadBlacklist()
  }, [activeTab, blacklistDevice, loadBlacklist])

  const handleAddBlacklist = async () => {
    if (!blacklistForm.cardData.trim()) { setError('Card data is required'); return }
    if (!blacklistDevice) { setError('Select a device first'); return }
    setBlacklistSaving(true)
    setError(null)
    try {
      await cardAPI.addToBlacklist(parseInt(blacklistDevice), {
        cardData: blacklistForm.cardData.trim(),
        reason: blacklistForm.reason.trim() || undefined
      })
      setSuccess('Card added to blacklist')
      setShowBlacklistModal(false)
      setBlacklistForm({ cardData: '', reason: '' })
      loadBlacklist()
    } catch (e) {
      setError(e.response?.data?.message || e.userMessage || 'Failed to add to blacklist')
    } finally {
      setBlacklistSaving(false)
    }
  }

  const handleRemoveBlacklist = async (cardData) => {
    if (!window.confirm('Remove this card from the blacklist?')) return
    try {
      await cardAPI.removeFromBlacklist(parseInt(blacklistDevice), cardData)
      setSuccess('Card removed from blacklist')
      loadBlacklist()
    } catch (e) {
      setError(e.response?.data?.message || e.userMessage || 'Failed to remove from blacklist')
    }
  }

  const toggleDevice = (id) => {
    setSelectedDevices(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id])
  }

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE))

  const displayed = searchText
    ? assignments.filter(a =>
        a.employeeId?.toLowerCase().includes(searchText.toLowerCase()) ||
        a.employeeName?.toLowerCase().includes(searchText.toLowerCase()) ||
        a.cardData?.toLowerCase().includes(searchText.toLowerCase())
      )
    : assignments

  const statusBadge = (s) => {
    const map = { active: 'badge-active', revoked: 'badge-revoked', lost: 'badge-lost', expired: 'badge-expired' }
    return <span className={`badge ${map[s] || 'badge-neutral'}`}>{s}</span>
  }

  return (
    <div className="card-assign-page">
      <div className="page-header">
        <h2>💳 Card Assignments</h2>
        <div className="page-stats">
          <span className="stat-badge info">{totalCount} total</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="ca-tabs">
        <button className={`ca-tab ${activeTab === 'assignments' ? 'active' : ''}`} onClick={() => setActiveTab('assignments')}>💳 Assignments</button>
        <button className={`ca-tab ${activeTab === 'blacklist' ? 'active' : ''}`} onClick={() => setActiveTab('blacklist')}>🚫 Blacklist</button>
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

      {/* ===== Blacklist Tab ===== */}
      {activeTab === 'blacklist' && (
        <div className="blacklist-section">
          <div className="card toolbar-card">
            <div className="toolbar-row">
              <div className="toolbar-field">
                <label>Device</label>
                <select className="select-input" value={blacklistDevice} onChange={e => setBlacklistDevice(e.target.value)}>
                  <option value="">Select a device…</option>
                  {devices.map(d => <option key={d.id} value={d.id}>{d.name || d.ip} ({d.status})</option>)}
                </select>
              </div>
              <div className="toolbar-actions">
                <button className="btn btn-primary" onClick={loadBlacklist} disabled={!blacklistDevice || blacklistLoading}>↻ Refresh</button>
                <button className="btn btn-danger" onClick={() => { setBlacklistForm({ cardData: '', reason: '' }); setShowBlacklistModal(true) }} disabled={!blacklistDevice}>+ Add to Blacklist</button>
              </div>
            </div>
          </div>

          <div className="card">
            {!blacklistDevice ? (
              <div className="empty-cell" style={{ padding: 40, textAlign: 'center', color: '#94a3b8' }}>Select a device to view its card blacklist.</div>
            ) : blacklistLoading ? (
              <div className="loading-row"><div className="spinner" /><span>Loading blacklist…</span></div>
            ) : blacklist.length === 0 ? (
              <div className="empty-cell" style={{ padding: 40, textAlign: 'center', color: '#94a3b8' }}>No blacklisted cards on this device.</div>
            ) : (
              <table className="data-table">
                <thead>
                  <tr><th>Card Data</th><th>Card (Decimal)</th><th>Reason</th><th>Blacklisted At</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {blacklist.map((b, i) => (
                    <tr key={b.cardData || i}>
                      <td><code className="card-hex">{b.cardData?.substring(0, 20)}{b.cardData?.length > 20 ? '…' : ''}</code></td>
                      <td><code>{decodeHex(b.cardData)}</code></td>
                      <td>{b.reason || '—'}</td>
                      <td>{b.blacklistedAt ? new Date(b.blacklistedAt).toLocaleDateString() : b.createdAt ? new Date(b.createdAt).toLocaleDateString() : '—'}</td>
                      <td>
                        <button className="btn btn-sm btn-warning" onClick={() => handleRemoveBlacklist(b.cardData)}>Remove</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Add to Blacklist Modal */}
          {showBlacklistModal && (
            <div className="modal-overlay" onClick={() => setShowBlacklistModal(false)}>
              <div className="modal-box small" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                  <h3>🚫 Add Card to Blacklist</h3>
                  <button className="btn-close" onClick={() => setShowBlacklistModal(false)}>✕</button>
                </div>
                <div className="modal-body">
                  <div className="form-field">
                    <label>Card Data (hex) *</label>
                    <input className="search-input" value={blacklistForm.cardData} onChange={e => setBlacklistForm(p => ({ ...p, cardData: e.target.value }))} placeholder="Enter card hex data to blacklist" />
                  </div>
                  <div className="form-field">
                    <label>Reason</label>
                    <input className="search-input" value={blacklistForm.reason} onChange={e => setBlacklistForm(p => ({ ...p, reason: e.target.value }))} placeholder="e.g. Lost card, stolen, etc." />
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setShowBlacklistModal(false)}>Cancel</button>
                  <button className="btn btn-danger" disabled={blacklistSaving || !blacklistForm.cardData.trim()} onClick={handleAddBlacklist}>{blacklistSaving ? 'Adding…' : 'Add to Blacklist'}</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ===== Assignments Tab ===== */}
      {activeTab === 'assignments' && (<>

      {/* Toolbar */}
      <div className="card toolbar-card">
        <form onSubmit={applyFilter} className="toolbar-row">
          <div className="toolbar-field">
            <label>Employee ID</label>
            <input className="search-input" placeholder="Filter by employee ID…" value={filterEmployee} onChange={e => setFilterEmployee(e.target.value)} />
          </div>
          <div className="toolbar-field">
            <label>Status</label>
            <select className="select-input" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
              <option value="">All</option>
              {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="toolbar-field">
            <label>Quick search</label>
            <input className="search-input" placeholder="Name / card data…" value={searchText} onChange={e => setSearchText(e.target.value)} />
          </div>
          <div className="toolbar-actions">
            <button type="submit" className="btn btn-primary">Filter</button>
            <button type="button" className="btn btn-secondary" onClick={clearFilter}>Clear</button>
            <button type="button" className="btn btn-secondary" onClick={loadAssignments}>↻</button>
            <button type="button" className="btn btn-success" onClick={openCreate}>+ Assign Card</button>
          </div>
        </form>
      </div>

      {/* Table */}
      <div className="card">
        {loading ? (
          <div className="loading-row"><div className="spinner" /><span>Loading…</span></div>
        ) : (
          <>
            <table className="data-table">
              <thead>
                <tr>
                  <th></th>
                  <th>ID</th>
                  <th>Employee ID</th>
                  <th>Employee Name</th>
                  <th>Card Type</th>
                  <th>Card (Decimal)</th>
                  <th>Card Data (Hex)</th>
                  <th>Status</th>
                  <th>Assigned At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayed.length === 0 ? (
                  <tr><td colSpan={10} className="empty-cell">No card assignments found.</td></tr>
                ) : displayed.map(a => (
                  <React.Fragment key={a.id}>
                    <tr>
                      <td>
                        <button className="btn btn-sm btn-link" onClick={() => toggleExpand(a)} title="Expand enrollments">
                          {expandedRow === a.id ? '▾' : '▸'}
                        </button>
                      </td>
                      <td><code>{a.id}</code></td>
                      <td><a href={`/employee/${a.employeeId}`} className="employee-link"><strong>{a.employeeId}</strong></a></td>
                      <td>{a.employeeName ? <a href={`/employee/${a.employeeId}`} className="employee-link">{a.employeeName}</a> : '—'}</td>
                      <td>{a.cardType}</td>
                      <td><code>{decodeHex(a.cardData)}</code></td>
                      <td title={a.cardData || ''}><code className="card-hex">{a.cardData?.substring(0, 16)}{a.cardData?.length > 16 ? '…' : ''}</code></td>
                      <td>
                        <select
                          className="select-input compact"
                          value={a.status}
                          onChange={e => handleStatusChange(a.id, e.target.value)}
                        >
                          {STATUS_OPTIONS.map(s => <option key={s}>{s}</option>)}
                        </select>
                      </td>
                      <td>{a.assignedAt ? new Date(a.assignedAt).toLocaleDateString() : '—'}</td>
                      <td className="actions-cell">
                        <button className="btn btn-sm btn-primary" onClick={() => openEnroll(a)} title="Enroll on devices">📟 Enroll</button>
                        {a.status === 'active' && (
                          <button className="btn btn-sm btn-warning" onClick={() => openReplace(a)} title="Replace with new card">🔄 Replace</button>
                        )}
                        <button className="btn btn-sm btn-secondary" onClick={() => openHistory(a)} title="Card history for this employee">📜 History</button>
                        {a.status !== 'revoked' && (
                          <button className="btn btn-sm btn-danger" onClick={() => setConfirmRevoke(a)}>Revoke</button>
                        )}
                      </td>
                    </tr>
                    {expandedRow === a.id && (
                      <tr key={`exp-${a.id}`} className="expanded-row">
                        <td colSpan={10}>
                          <div className="enrollment-detail">
                            <strong>Device Enrollments:</strong>
                            {!rowEnrollments[a.id] ? (
                              <span className="dim"> Loading…</span>
                            ) : rowEnrollments[a.id].length === 0 ? (
                              <span className="dim"> Not enrolled on any device.</span>
                            ) : (
                              <table className="data-table compact inner-table">
                                <thead><tr><th>Enrollment ID</th><th>Device ID</th><th>Device User ID</th><th>Status</th><th>Enrolled At</th></tr></thead>
                                <tbody>
                                  {rowEnrollments[a.id].map(e => (
                                    <tr key={e.id}>
                                      <td><code>{e.id}</code></td>
                                      <td><code>{e.deviceId}</code></td>
                                      <td><code>{e.deviceUserId}</code></td>
                                      <td>{statusBadge(e.status)}</td>
                                      <td>{e.enrolledAt ? new Date(e.enrolledAt).toLocaleDateString() : '—'}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination">
                <button className="btn btn-sm btn-secondary" disabled={page === 1} onClick={() => setPage(p => p - 1)}>‹ Prev</button>
                <span>Page {page} / {totalPages} ({totalCount} assignments)</span>
                <button className="btn btn-sm btn-secondary" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>Next ›</button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Create Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>➕ Assign Card</h3>
              <button className="btn-close" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="form-row">
                <div className="form-field">
                  <label>Employee ID *</label>
                  <input className="search-input" value={form.employeeId} onChange={e => setForm(p => ({ ...p, employeeId: e.target.value }))} placeholder="e.g. EMP001" />
                </div>
                <div className="form-field">
                  <label>Employee Name</label>
                  <input className="search-input" value={form.employeeName} onChange={e => setForm(p => ({ ...p, employeeName: e.target.value }))} placeholder="Display name" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label>Card Data (hex) *</label>
                  <input className="search-input" value={form.cardData} onChange={e => setForm(p => ({ ...p, cardData: e.target.value }))} placeholder="32-byte hex string" />
                </div>
                <div className="form-field">
                  <label>Card Type</label>
                  <select className="select-input" value={form.cardType} onChange={e => setForm(p => ({ ...p, cardType: e.target.value }))}>
                    {CARD_TYPES.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-field">
                <label>Notes</label>
                <textarea className="search-input" rows={2} value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} placeholder="Optional notes…" />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" disabled={saving} onClick={handleSave}>{saving ? 'Saving…' : 'Assign Card'}</button>
            </div>
          </div>
        </div>
      )}

      {/* Enroll on Devices Modal */}
      {showEnrollModal && enrollTarget && (
        <div className="modal-overlay" onClick={() => setShowEnrollModal(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>📟 Enroll on Devices</h3>
              <button className="btn-close" onClick={() => setShowEnrollModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              <p className="hint-text">Assignment for <strong>{enrollTarget.employeeId}</strong> · {enrollTarget.cardType}</p>
              <p className="hint-text mb">Select devices to enroll this card assignment on:</p>
              <div className="device-checklist">
                {devices.map(d => (
                  <label key={d.id} className="device-check-item">
                    <input type="checkbox" checked={selectedDevices.includes(d.id)} onChange={() => toggleDevice(d.id)} />
                    <span className={`dot ${d.status === 'connected' ? 'online' : 'offline'}`} />
                    <span>{d.name || d.ip}</span>
                    <span className="dim">{d.ip}:{d.port || 51211}</span>
                  </label>
                ))}
              </div>
              {error && <div className="alert alert-danger mt">{error}</div>}
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowEnrollModal(false)}>Cancel</button>
              <button className="btn btn-primary" disabled={enrolling || !selectedDevices.length} onClick={handleEnroll}>
                {enrolling ? 'Enrolling…' : `Enroll on ${selectedDevices.length} device(s)`}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Revoke Modal */}
      {confirmRevoke && (
        <div className="modal-overlay" onClick={() => setConfirmRevoke(null)}>
          <div className="modal-box small" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>⚠️ Confirm Revoke</h3>
              <button className="btn-close" onClick={() => setConfirmRevoke(null)}>✕</button>
            </div>
            <div className="modal-body">
              <p>Revoke card assignment for employee <strong>{confirmRevoke.employeeId}</strong>?</p>
              <p className="hint">This will mark the card as revoked. The card will no longer grant access.</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setConfirmRevoke(null)}>Cancel</button>
              <button className="btn btn-danger" onClick={() => handleRevoke(confirmRevoke)}>Revoke</button>
            </div>
          </div>
        </div>
      )}

      {/* Card Replacement Modal */}
      {showReplaceModal && replaceTarget && (
        <div className="modal-overlay" onClick={() => setShowReplaceModal(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>🔄 Replace Card</h3>
              <button className="btn-close" onClick={() => setShowReplaceModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              <p className="hint-text">
                Replacing card for <strong>{replaceTarget.employeeName || replaceTarget.employeeId}</strong>.
                The old card will be revoked and the new card will be enrolled on the same devices.
              </p>
              <div className="detail-grid" style={{ marginBottom: '1rem' }}>
                <div className="detail-item"><span className="label">Old Card</span><span><code>{replaceTarget.cardData?.substring(0, 16)}…</code></span></div>
                <div className="detail-item"><span className="label">Old Status</span><span className="badge badge-active">{replaceTarget.status}</span></div>
              </div>
              <div className="form-field">
                <label>New Card Data (hex) *</label>
                <input className="search-input" value={replaceForm.cardData} onChange={e => setReplaceForm(p => ({ ...p, cardData: e.target.value }))} placeholder="Scan or paste new card hex data" />
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label>Card Type</label>
                  <select className="select-input" value={replaceForm.cardType} onChange={e => setReplaceForm(p => ({ ...p, cardType: e.target.value }))}>
                    {CARD_TYPES.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div className="form-field">
                  <label>Notes</label>
                  <input className="search-input" value={replaceForm.notes} onChange={e => setReplaceForm(p => ({ ...p, notes: e.target.value }))} placeholder="Reason for replacement…" />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowReplaceModal(false)}>Cancel</button>
              <button className="btn btn-primary" disabled={replacing || !replaceForm.cardData.trim()} onClick={handleReplace}>
                {replacing ? 'Replacing…' : 'Replace Card'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Card History Modal */}
      {showHistoryModal && historyEmployee && (
        <div className="modal-overlay" onClick={() => setShowHistoryModal(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>📜 Card History — {historyEmployee}</h3>
              <button className="btn-close" onClick={() => setShowHistoryModal(false)}>✕</button>
            </div>
            <div className="modal-body">
              {historyLoading ? (
                <div className="loading-row"><div className="spinner" /><span>Loading history…</span></div>
              ) : cardHistory.length === 0 ? (
                <p className="hint-text">No card history found for this employee.</p>
              ) : (
                <table className="data-table compact">
                  <thead>
                    <tr><th>ID</th><th>Card Type</th><th>Card Data</th><th>Status</th><th>Assigned</th><th>Revoked</th><th>Notes</th></tr>
                  </thead>
                  <tbody>
                    {cardHistory.map(h => (
                      <tr key={h.id}>
                        <td><code>{h.id}</code></td>
                        <td>{h.cardType}</td>
                        <td><code className="card-hex">{h.cardData?.substring(0, 16)}{h.cardData?.length > 16 ? '…' : ''}</code></td>
                        <td>{statusBadge(h.status)}</td>
                        <td>{h.assignedAt ? new Date(h.assignedAt).toLocaleDateString() : '—'}</td>
                        <td>{h.revokedAt ? new Date(h.revokedAt).toLocaleDateString() : '—'}</td>
                        <td className="hint">{h.notes || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      )}

      </>)}
    </div>
  )
}
