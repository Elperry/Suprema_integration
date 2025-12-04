import { useState, useEffect, useCallback } from 'react'
import { enrollmentAPI, deviceAPI } from '../services/api'

export default function Enrollment() {
  // State
  const [devices, setDevices] = useState([])
  const [selectedDevice, setSelectedDevice] = useState('')
  const [cardAssignments, setCardAssignments] = useState([])
  const [employees, setEmployees] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [scanning, setScanning] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [stats, setStats] = useState(null)
  
  // Scanned card state
  const [scannedCard, setScannedCard] = useState(null)
  
  // Modal states
  const [showEnrollModal, setShowEnrollModal] = useState(false)
  const [showDeviceModal, setShowDeviceModal] = useState(false)
  const [selectedAssignment, setSelectedAssignment] = useState(null)
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [selectedDevices, setSelectedDevices] = useState([])

  // Active tab
  const [activeTab, setActiveTab] = useState('enroll') // enroll, cards, employees

  // Load data on mount
  useEffect(() => {
    loadDevices()
    loadCardAssignments()
    loadStatistics()
  }, [])

  const loadDevices = async () => {
    try {
      const res = await deviceAPI.getAll()
      setDevices(res.data.data || [])
    } catch (e) {
      console.error('Failed to load devices:', e)
    }
  }

  const loadCardAssignments = async () => {
    try {
      setLoading(true)
      const res = await enrollmentAPI.getCardAssignments()
      setCardAssignments(res.data.data || [])
    } catch (e) {
      console.error('Failed to load card assignments:', e)
      setError('Failed to load card assignments')
    } finally {
      setLoading(false)
    }
  }

  const loadStatistics = async () => {
    try {
      const res = await enrollmentAPI.getStatistics()
      setStats(res.data.data)
    } catch (e) {
      console.error('Failed to load statistics:', e)
    }
  }

  // Search employees with debounce
  const searchEmployees = useCallback(async (query) => {
    if (!query || query.length < 2) {
      setEmployees([])
      return
    }
    
    try {
      setLoading(true)
      const res = await enrollmentAPI.searchEmployees(query)
      setEmployees(res.data.data || [])
    } catch (e) {
      console.error('Failed to search employees:', e)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      searchEmployees(searchQuery)
    }, 300)
    return () => clearTimeout(timer)
  }, [searchQuery, searchEmployees])

  // Scan card from device
  const handleScanCard = async () => {
    if (!selectedDevice) {
      setError('Please select a device first')
      return
    }

    try {
      setScanning(true)
      setError(null)
      setScannedCard(null)
      
      const res = await enrollmentAPI.scanCard(selectedDevice, 15)
      setScannedCard(res.data.data)
      
      if (res.data.data.isAssigned) {
        setError(`Card is already assigned to ${res.data.data.existingAssignment.employeeName || res.data.data.existingAssignment.employeeId}`)
      } else {
        setSuccess('Card scanned successfully! Select an employee to assign.')
      }
    } catch (e) {
      setError(e.response?.data?.message || e.message || 'Failed to scan card')
    } finally {
      setScanning(false)
    }
  }

  // Assign card to employee
  const handleAssignCard = async () => {
    if (!scannedCard || !selectedEmployee) {
      setError('Please scan a card and select an employee')
      return
    }

    try {
      setLoading(true)
      setError(null)

      // Create card assignment
      const res = await enrollmentAPI.assignCard({
        employeeId: String(selectedEmployee.employee_id),
        employeeName: selectedEmployee.name,
        cardData: scannedCard.csn || scannedCard.data,
        cardType: scannedCard.type || 'CSN'
      })

      setSuccess(`Card assigned to ${selectedEmployee.name} successfully!`)
      setSelectedAssignment(res.data.data)
      setShowDeviceModal(true)
      
      // Reload data
      loadCardAssignments()
      loadStatistics()
      
      // Reset form
      setScannedCard(null)
      setSelectedEmployee(null)
      setSearchQuery('')
      setEmployees([])
    } catch (e) {
      setError(e.response?.data?.message || e.message || 'Failed to assign card')
    } finally {
      setLoading(false)
    }
  }

  // Quick enroll (assign + enroll on devices)
  const handleQuickEnroll = async () => {
    if (!scannedCard || !selectedEmployee) {
      setError('Please scan a card and select an employee')
      return
    }

    if (selectedDevices.length === 0) {
      setError('Please select at least one device')
      return
    }

    try {
      setLoading(true)
      setError(null)

      const res = await enrollmentAPI.quickEnroll({
        employeeId: String(selectedEmployee.employee_id),
        employeeName: selectedEmployee.name,
        cardData: scannedCard.csn || scannedCard.data,
        cardType: scannedCard.type || 'CSN',
        deviceIds: selectedDevices.map(d => parseInt(d))
      })

      const enrollments = res.data.data.enrollments
      if (enrollments) {
        setSuccess(`Card assigned and enrolled on ${enrollments.successful.length}/${selectedDevices.length} devices!`)
      } else {
        setSuccess('Card assigned successfully!')
      }
      
      // Reload data
      loadCardAssignments()
      loadStatistics()
      
      // Reset form
      setScannedCard(null)
      setSelectedEmployee(null)
      setSearchQuery('')
      setEmployees([])
      setSelectedDevices([])
      setShowEnrollModal(false)
    } catch (e) {
      setError(e.response?.data?.message || e.message || 'Failed to enroll')
    } finally {
      setLoading(false)
    }
  }

  // Enroll assignment on selected devices
  const handleEnrollOnDevices = async () => {
    if (!selectedAssignment || selectedDevices.length === 0) {
      setError('Please select devices')
      return
    }

    try {
      setLoading(true)
      setError(null)

      const res = await enrollmentAPI.enrollOnMultipleDevices(
        selectedDevices.map(d => parseInt(d)),
        selectedAssignment.id
      )

      setSuccess(`Enrolled on ${res.data.data.successful.length}/${selectedDevices.length} devices!`)
      setShowDeviceModal(false)
      setSelectedDevices([])
      loadCardAssignments()
    } catch (e) {
      setError(e.response?.data?.message || e.message || 'Failed to enroll on devices')
    } finally {
      setLoading(false)
    }
  }

  // Revoke card assignment
  const handleRevokeCard = async (assignmentId, reason = '') => {
    if (!confirm('Are you sure you want to revoke this card?')) return

    try {
      setLoading(true)
      await enrollmentAPI.revokeCard(assignmentId, reason)
      setSuccess('Card revoked successfully')
      loadCardAssignments()
      loadStatistics()
    } catch (e) {
      setError(e.response?.data?.message || e.message || 'Failed to revoke card')
    } finally {
      setLoading(false)
    }
  }

  // Sync device
  const handleSyncDevice = async (deviceId) => {
    try {
      setLoading(true)
      const res = await enrollmentAPI.syncToDevice(deviceId)
      setSuccess(`Synced ${res.data.data.synced}/${res.data.data.total} enrollments`)
    } catch (e) {
      setError(e.response?.data?.message || e.message || 'Failed to sync')
    } finally {
      setLoading(false)
    }
  }

  // Toggle device selection
  const toggleDeviceSelection = (deviceId) => {
    setSelectedDevices(prev => 
      prev.includes(deviceId)
        ? prev.filter(d => d !== deviceId)
        : [...prev, deviceId]
    )
  }

  const getStatusBadge = (status) => {
    const badges = {
      active: { class: 'badge-success', label: '✅ Active' },
      revoked: { class: 'badge-danger', label: '❌ Revoked' },
      lost: { class: 'badge-warning', label: '⚠️ Lost' },
      expired: { class: 'badge-secondary', label: '⏰ Expired' }
    }
    const badge = badges[status] || badges.active
    return <span className={`badge ${badge.class}`}>{badge.label}</span>
  }

  const connectedDevices = devices.filter(d => d.status === 'connected')

  return (
    <div className="page">
      <h2>🎫 Card Enrollment</h2>

      {/* Statistics */}
      {stats && (
        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-value">{stats.cards?.active || 0}</div>
            <div className="stat-label">Active Cards</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.enrollments?.active || 0}</div>
            <div className="stat-label">Device Enrollments</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.cards?.revoked || 0}</div>
            <div className="stat-label">Revoked Cards</div>
          </div>
        </div>
      )}

      {/* Alerts */}
      {error && (
        <div className="alert alert-danger">
          ⚠️ {error}
          <button onClick={() => setError(null)} className="btn-close">×</button>
        </div>
      )}
      {success && (
        <div className="alert alert-success">
          ✅ {success}
          <button onClick={() => setSuccess(null)} className="btn-close">×</button>
        </div>
      )}

      {/* Tabs */}
      <div className="tabs">
        <button className={`tab ${activeTab === 'enroll' ? 'active' : ''}`} onClick={() => setActiveTab('enroll')}>
          📝 New Enrollment
        </button>
        <button className={`tab ${activeTab === 'cards' ? 'active' : ''}`} onClick={() => setActiveTab('cards')}>
          🎴 Card Assignments ({cardAssignments.length})
        </button>
        <button className={`tab ${activeTab === 'devices' ? 'active' : ''}`} onClick={() => setActiveTab('devices')}>
          📱 Device Status
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'enroll' && (
        <div className="enrollment-form">
          {/* Step 1: Select Device */}
          <div className="card">
            <h3>Step 1: Select Device & Scan Card</h3>
            <div className="form-row">
              <div className="form-group" style={{ flex: 1 }}>
                <label>Select Connected Device</label>
                <select 
                  value={selectedDevice} 
                  onChange={e => setSelectedDevice(e.target.value)}
                  className="form-control"
                >
                  <option value="">-- Select Device --</option>
                  {connectedDevices.map(d => (
                    <option key={d.id} value={d.id}>
                      {d.name} ({d.ip})
                    </option>
                  ))}
                </select>
                {connectedDevices.length === 0 && (
                  <small className="text-warning">No connected devices. Please connect a device first.</small>
                )}
              </div>
              <div className="form-group">
                <label>&nbsp;</label>
                <button 
                  onClick={handleScanCard}
                  className="btn btn-primary"
                  disabled={!selectedDevice || scanning}
                >
                  {scanning ? '📡 Scanning...' : '🔍 Scan Card'}
                </button>
              </div>
            </div>

            {/* Scanned Card Display */}
            {scannedCard && (
              <div className={`scanned-card ${scannedCard.isAssigned ? 'assigned' : 'available'}`}>
                <h4>📇 Scanned Card</h4>
                <div className="card-details">
                  <p><strong>Card Data:</strong> <code>{scannedCard.csn || scannedCard.data}</code></p>
                  <p><strong>Type:</strong> {scannedCard.type || 'CSN'}</p>
                  <p><strong>Status:</strong> {scannedCard.isAssigned ? '❌ Already Assigned' : '✅ Available'}</p>
                </div>
              </div>
            )}
          </div>

          {/* Step 2: Search & Select Employee */}
          {scannedCard && !scannedCard.isAssigned && (
            <div className="card">
              <h3>Step 2: Select Employee</h3>
              <div className="form-group">
                <label>Search Employee</label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search by name, ID, or department..."
                  className="form-control"
                />
              </div>

              {/* Employee List */}
              {employees.length > 0 && (
                <div className="employee-list">
                  {employees.map(emp => (
                    <div 
                      key={emp.employee_id}
                      className={`employee-item ${selectedEmployee?.employee_id === emp.employee_id ? 'selected' : ''} ${emp.hasCard ? 'has-card' : ''}`}
                      onClick={() => !emp.hasCard && setSelectedEmployee(emp)}
                    >
                      <div className="employee-info">
                        <span className="employee-name">{emp.name}</span>
                        <span className="employee-id">ID: {emp.employee_id}</span>
                        {emp.department && <span className="employee-dept">{emp.department}</span>}
                      </div>
                      <div className="employee-status">
                        {emp.hasCard ? (
                          <span className="badge badge-info">Has Card</span>
                        ) : (
                          <span className="badge badge-secondary">No Card</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Selected Employee */}
              {selectedEmployee && (
                <div className="selected-employee">
                  <h4>Selected: {selectedEmployee.name} (ID: {selectedEmployee.employee_id})</h4>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Enrollment Options */}
          {scannedCard && !scannedCard.isAssigned && selectedEmployee && (
            <div className="card">
              <h3>Step 3: Complete Enrollment</h3>
              
              {/* Device Selection */}
              <div className="form-group">
                <label>Select Devices to Enroll On (Optional)</label>
                <div className="device-checkboxes">
                  {connectedDevices.map(d => (
                    <label key={d.id} className="checkbox-item">
                      <input
                        type="checkbox"
                        checked={selectedDevices.includes(String(d.id))}
                        onChange={() => toggleDeviceSelection(String(d.id))}
                      />
                      {d.name} ({d.ip})
                    </label>
                  ))}
                </div>
              </div>

              <div className="btn-group">
                <button 
                  onClick={handleAssignCard}
                  className="btn btn-secondary"
                  disabled={loading}
                >
                  {loading ? 'Processing...' : '📝 Assign Card Only'}
                </button>
                <button 
                  onClick={handleQuickEnroll}
                  className="btn btn-primary"
                  disabled={loading || selectedDevices.length === 0}
                >
                  {loading ? 'Enrolling...' : `🚀 Assign & Enroll (${selectedDevices.length} devices)`}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'cards' && (
        <div className="card">
          <div className="card-header">
            <h3>Card Assignments</h3>
            <button onClick={loadCardAssignments} className="btn btn-secondary btn-sm">
              🔄 Refresh
            </button>
          </div>
          
          {loading && <p>Loading...</p>}
          
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Card Data</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Assigned</th>
                  <th>Devices</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cardAssignments.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center">No card assignments found</td>
                  </tr>
                ) : (
                  cardAssignments.map(ca => (
                    <tr key={ca.id}>
                      <td>
                        <strong>{ca.employeeName || 'N/A'}</strong>
                        <br />
                        <small>ID: {ca.employeeId}</small>
                      </td>
                      <td><code>{ca.cardData?.substring(0, 20)}...</code></td>
                      <td>{ca.cardType}</td>
                      <td>{getStatusBadge(ca.status)}</td>
                      <td>{new Date(ca.assignedAt).toLocaleDateString()}</td>
                      <td>
                        {ca.enrollments?.filter(e => e.status === 'active').length || 0} devices
                      </td>
                      <td>
                        <div className="btn-group-sm">
                          <button
                            onClick={() => {
                              setSelectedAssignment(ca)
                              setShowDeviceModal(true)
                            }}
                            className="btn btn-sm btn-primary"
                            disabled={ca.status !== 'active'}
                          >
                            📱 Enroll
                          </button>
                          {ca.status === 'active' && (
                            <button
                              onClick={() => handleRevokeCard(ca.id)}
                              className="btn btn-sm btn-danger"
                            >
                              🚫 Revoke
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'devices' && (
        <div className="card">
          <h3>Device Enrollment Status</h3>
          <div className="device-grid">
            {devices.map(d => (
              <div key={d.id} className={`device-card ${d.status}`}>
                <div className="device-header">
                  <h4>{d.name}</h4>
                  <span className={`status-dot ${d.status}`}></span>
                </div>
                <p className="device-ip">{d.ip}:{d.port}</p>
                <p className="device-status">{d.status}</p>
                {d.status === 'connected' && (
                  <button
                    onClick={() => handleSyncDevice(d.id)}
                    className="btn btn-sm btn-primary"
                    disabled={loading}
                  >
                    🔄 Sync Enrollments
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Device Selection Modal */}
      {showDeviceModal && selectedAssignment && (
        <div className="modal-overlay" onClick={() => setShowDeviceModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Enroll on Devices</h3>
              <button onClick={() => setShowDeviceModal(false)} className="btn-close">×</button>
            </div>
            <div className="modal-body">
              <p>
                <strong>Employee:</strong> {selectedAssignment.employeeName}<br />
                <strong>Card:</strong> {selectedAssignment.cardData?.substring(0, 20)}...
              </p>
              
              <div className="form-group">
                <label>Select Devices:</label>
                <div className="device-checkboxes">
                  {connectedDevices.map(d => {
                    const isEnrolled = selectedAssignment.enrollments?.some(
                      e => e.deviceId === d.id && e.status === 'active'
                    )
                    return (
                      <label key={d.id} className={`checkbox-item ${isEnrolled ? 'enrolled' : ''}`}>
                        <input
                          type="checkbox"
                          checked={selectedDevices.includes(String(d.id))}
                          onChange={() => toggleDeviceSelection(String(d.id))}
                          disabled={isEnrolled}
                        />
                        {d.name} ({d.ip})
                        {isEnrolled && <span className="enrolled-badge">✓ Enrolled</span>}
                      </label>
                    )
                  })}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button onClick={() => setShowDeviceModal(false)} className="btn btn-secondary">
                Cancel
              </button>
              <button 
                onClick={handleEnrollOnDevices}
                className="btn btn-primary"
                disabled={loading || selectedDevices.length === 0}
              >
                {loading ? 'Enrolling...' : `Enroll on ${selectedDevices.length} devices`}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .stats-row {
          display: flex;
          gap: 20px;
          margin-bottom: 20px;
        }
        .stat-card {
          background: #f8f9fa;
          border-radius: 8px;
          padding: 20px;
          text-align: center;
          flex: 1;
        }
        .stat-value {
          font-size: 32px;
          font-weight: bold;
          color: #007bff;
        }
        .stat-label {
          color: #666;
          font-size: 14px;
        }
        .tabs {
          display: flex;
          gap: 4px;
          border-bottom: 2px solid #e0e0e0;
          margin-bottom: 20px;
        }
        .tab {
          padding: 12px 24px;
          border: none;
          background: none;
          cursor: pointer;
          border-bottom: 3px solid transparent;
          margin-bottom: -2px;
        }
        .tab:hover { background: #f0f0f0; }
        .tab.active {
          border-bottom-color: #007bff;
          font-weight: bold;
          color: #007bff;
        }
        .form-row {
          display: flex;
          gap: 15px;
          align-items: flex-end;
        }
        .form-group {
          margin-bottom: 15px;
        }
        .form-group label {
          display: block;
          font-weight: 600;
          margin-bottom: 5px;
        }
        .scanned-card {
          padding: 15px;
          border-radius: 8px;
          margin-top: 15px;
        }
        .scanned-card.available {
          background: #d4edda;
          border: 1px solid #28a745;
        }
        .scanned-card.assigned {
          background: #f8d7da;
          border: 1px solid #dc3545;
        }
        .card-details p {
          margin: 5px 0;
        }
        .employee-list {
          max-height: 300px;
          overflow-y: auto;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
        .employee-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 15px;
          border-bottom: 1px solid #eee;
          cursor: pointer;
        }
        .employee-item:hover { background: #f8f9fa; }
        .employee-item.selected {
          background: #e3f2fd;
          border-left: 4px solid #007bff;
        }
        .employee-item.has-card {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .employee-info {
          display: flex;
          flex-direction: column;
        }
        .employee-name { font-weight: 600; }
        .employee-id { font-size: 12px; color: #666; }
        .employee-dept { font-size: 12px; color: #999; }
        .selected-employee {
          padding: 15px;
          background: #e3f2fd;
          border-radius: 8px;
          margin-top: 15px;
        }
        .device-checkboxes {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .checkbox-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px;
          background: #f8f9fa;
          border-radius: 4px;
        }
        .checkbox-item.enrolled {
          background: #d4edda;
        }
        .enrolled-badge {
          color: #28a745;
          margin-left: auto;
        }
        .btn-group {
          display: flex;
          gap: 10px;
          margin-top: 15px;
        }
        .btn-group-sm {
          display: flex;
          gap: 5px;
        }
        .badge {
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
        }
        .badge-success { background: #28a745; color: white; }
        .badge-danger { background: #dc3545; color: white; }
        .badge-warning { background: #ffc107; color: #333; }
        .badge-secondary { background: #6c757d; color: white; }
        .badge-info { background: #17a2b8; color: white; }
        .alert {
          padding: 12px 15px;
          border-radius: 4px;
          margin-bottom: 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .alert-danger { background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }
        .alert-success { background: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
        .btn-close { background: none; border: none; font-size: 20px; cursor: pointer; }
        .device-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 15px;
        }
        .device-card {
          background: #f8f9fa;
          border-radius: 8px;
          padding: 15px;
          border-left: 4px solid #6c757d;
        }
        .device-card.connected { border-left-color: #28a745; }
        .device-card.disconnected { border-left-color: #dc3545; }
        .device-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .device-header h4 { margin: 0; }
        .status-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #6c757d;
        }
        .status-dot.connected { background: #28a745; }
        .status-dot.disconnected { background: #dc3545; }
        .device-ip { color: #666; font-size: 14px; margin: 5px 0; }
        .device-status { text-transform: capitalize; }
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        .modal {
          background: white;
          border-radius: 8px;
          width: 500px;
          max-width: 90%;
          max-height: 80vh;
          overflow-y: auto;
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 20px;
          border-bottom: 1px solid #ddd;
        }
        .modal-header h3 { margin: 0; }
        .modal-body { padding: 20px; }
        .modal-footer {
          padding: 15px 20px;
          border-top: 1px solid #ddd;
          display: flex;
          justify-content: flex-end;
          gap: 10px;
        }
        .text-warning { color: #856404; }
      `}</style>
    </div>
  )
}
