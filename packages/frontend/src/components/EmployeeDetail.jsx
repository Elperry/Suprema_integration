import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { employeeAPI, gateEventAPI, enrollmentAPI } from '../services/api'
import { useNotification } from './Notifications'

export default function EmployeeDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { showNotification } = useNotification()

  const [employee, setEmployee] = useState(null)
  const [cardInfo, setCardInfo] = useState(null)
  const [cardAssignments, setCardAssignments] = useState([])
  const [cardHistory, setCardHistory] = useState([])
  const [gateEvents, setGateEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    loadEmployee()
  }, [id])

  const loadEmployee = async () => {
    setLoading(true)
    try {
      const [empRes, cardRes, assignRes, historyRes, eventsRes] = await Promise.allSettled([
        employeeAPI.getById(id),
        employeeAPI.getCardInfo(id),
        enrollmentAPI.getCardAssignments({ employeeId: id }),
        enrollmentAPI.getCardHistory(id),
        gateEventAPI.getByEmployee(id, 100),
      ])

      if (empRes.status === 'fulfilled') setEmployee(empRes.value.data?.data || empRes.value.data)
      if (cardRes.status === 'fulfilled') setCardInfo(cardRes.value.data?.data || cardRes.value.data)
      if (assignRes.status === 'fulfilled') setCardAssignments(assignRes.value.data?.data || [])
      if (historyRes.status === 'fulfilled') setCardHistory(historyRes.value.data?.data || [])
      if (eventsRes.status === 'fulfilled') setGateEvents(eventsRes.value.data?.data || [])
    } catch (error) {
      showNotification('Failed to load employee details', 'error')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="page">
        <div className="loading">Loading employee profile...</div>
      </div>
    )
  }

  if (!employee) {
    return (
      <div className="page">
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <h3>Employee not found</h3>
          <button className="btn btn-primary" onClick={() => navigate('/employees')} style={{ marginTop: '1rem' }}>
            Back to Employees
          </button>
        </div>
      </div>
    )
  }

  const name = employee.name || employee.full_name || employee.employee_name || employee.displayname || 'Unknown'
  const email = employee.email || employee.employee_email || '-'
  const dept = employee.department || employee.dept_name || '-'
  const position = employee.position || employee.job_title || '-'
  const company = employee.company || employee.company_name || '-'
  const status = employee.suspend === 1 ? 'Suspended' : 'Active'
  const statusClass = employee.suspend === 1 ? 'suspended' : 'active'

  const profileIncomplete = dept === '-' && position === '-' && email === '-' && company === '-'

  const tabs = [
    { id: 'cards', label: `Cards (${cardAssignments.length})` },
    { id: 'events', label: `Gate Events (${gateEvents.length})` },
  ]

  return (
    <div className="page employee-detail">
      <nav style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
        <a href="/" style={{ color: 'var(--primary-color)', textDecoration: 'none' }}>Dashboard</a>
        <span style={{ margin: '0 0.5rem' }}>/</span>
        <a href="/employees" style={{ color: 'var(--primary-color)', textDecoration: 'none' }}>Employees</a>
        <span style={{ margin: '0 0.5rem' }}>/</span>
        <span>{name}</span>
      </nav>
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button className="btn btn-secondary" onClick={() => navigate('/employees')}>← Back</button>
          <h2>{name}</h2>
          <span className={`emp-status-badge ${statusClass}`}>{status}</span>
        </div>
        <button className="btn btn-primary" onClick={loadEmployee}>↻ Refresh</button>
      </div>

      {/* Identity Card */}
      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
        <div className="stat-card">
          <span className="stat-icon">🆔</span>
          <div className="stat-content">
            <h3>Employee ID</h3>
            <div className="stat-value" style={{ fontSize: '1.25rem' }}>{employee.id || employee.employee_id}</div>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">🏢</span>
          <div className="stat-content">
            <h3>Department</h3>
            <div className="stat-value" style={{ fontSize: '1.25rem' }}>{dept}</div>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">💼</span>
          <div className="stat-content">
            <h3>Position</h3>
            <div className="stat-value" style={{ fontSize: '1.25rem' }}>{position}</div>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">💳</span>
          <div className="stat-content">
            <h3>Card / SSN</h3>
            <div className="stat-value" style={{ fontSize: '1.25rem' }}>
              {cardInfo?.card || cardInfo?.ssn || 'No card'}
            </div>
          </div>
        </div>
      </div>

      {profileIncomplete && (
        <div className="alert alert-warning" style={{ marginBottom: '1rem' }}>
          ⚠️ <strong>Profile Incomplete</strong> — Department, position, email, and company are not stored in the device database. These fields must be populated via HR integration or the Bulk Import tool.
        </div>
      )}

      {/* Tabs */}
      <div className="card">
        <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`btn ${activeTab === tab.id ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveTab(tab.id)}
              style={{ fontSize: '0.85rem' }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div>
            <h3 style={{ marginBottom: '1rem' }}>Employee Information</h3>
            <table className="table">
              <tbody>
                <tr><td style={{ fontWeight: 600, width: '200px' }}>Full Name</td><td>{name}</td></tr>
                <tr><td style={{ fontWeight: 600 }}>Email</td><td>{email}</td></tr>
                <tr><td style={{ fontWeight: 600 }}>Department</td><td>{dept}</td></tr>
                <tr><td style={{ fontWeight: 600 }}>Position</td><td>{position}</td></tr>
                <tr><td style={{ fontWeight: 600 }}>Company</td><td>{company}</td></tr>
                <tr><td style={{ fontWeight: 600 }}>Status</td><td><span className={`emp-status-badge ${statusClass}`}>{status}</span></td></tr>
                {cardInfo?.ssn && <tr><td style={{ fontWeight: 600 }}>SSN</td><td>{cardInfo.ssn}</td></tr>}
                {cardInfo?.card && <tr><td style={{ fontWeight: 600 }}>Card Number</td><td>{cardInfo.card}</td></tr>}
              </tbody>
            </table>

            {cardHistory.length > 0 && (
              <>
                <h3 style={{ margin: '1.5rem 0 1rem' }}>Card History</h3>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Action</th>
                      <th>Card Number</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cardHistory.map((h, i) => (
                      <tr key={h.id || i}>
                        <td>{h.createdAt ? new Date(h.createdAt).toLocaleString() : '-'}</td>
                        <td>{h.action || h.type || '-'}</td>
                        <td>{h.cardNumber || h.card_number || '-'}</td>
                        <td>{h.reason || h.details || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </div>
        )}

        {activeTab === 'cards' && (
          <div>
            <h3 style={{ marginBottom: '1rem' }}>Card Assignments</h3>
            {cardAssignments.length === 0 ? (
              <p style={{ color: 'var(--text-secondary)' }}>No card assignments found.</p>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>Card Number</th>
                    <th>Status</th>
                    <th>Assigned</th>
                    <th>Device</th>
                  </tr>
                </thead>
                <tbody>
                  {cardAssignments.map((a, i) => (
                    <tr key={a.id || i}>
                      <td>{a.cardNumber || a.card_number || '-'}</td>
                      <td>
                        <span className={`emp-status-badge ${a.status === 'active' ? 'active' : 'suspended'}`}>
                          {a.status || '-'}
                        </span>
                      </td>
                      <td>{a.createdAt ? new Date(a.createdAt).toLocaleString() : '-'}</td>
                      <td>{a.deviceName || a.device_name || a.deviceId || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {activeTab === 'events' && (
          <div>
            <h3 style={{ marginBottom: '1rem' }}>Recent Gate Events</h3>
            {gateEvents.length === 0 ? (
              <p style={{ color: 'var(--text-secondary)' }}>No gate events found.</p>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Device</th>
                    <th>Door</th>
                    <th>Direction</th>
                    <th>Result</th>
                  </tr>
                </thead>
                <tbody>
                  {gateEvents.map((e, i) => (
                    <tr key={e.id || i}>
                      <td>{e.timestamp ? new Date(e.timestamp).toLocaleString() : e.event_time || '-'}</td>
                      <td>{e.deviceName || e.device_name || e.deviceId || '-'}</td>
                      <td>{e.doorName || e.door_name || '-'}</td>
                      <td>{e.direction || '-'}</td>
                      <td>
                        <span className={`emp-status-badge ${e.result === 'granted' || e.result === 'success' ? 'active' : 'suspended'}`}>
                          {e.result || e.auth_result || '-'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>

      <style>{`
        .emp-status-badge {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 600;
        }
        .emp-status-badge.active { background: #dcfce7; color: #166534; }
        .emp-status-badge.suspended { background: #fee2e2; color: #991b1b; }
      `}</style>
    </div>
  )
}
