import { useState, useEffect, useCallback } from 'react'
import { enrollmentAPI, deviceAPI, doorAPI, userAPI } from '../services/api'
import { ErrorBanner } from './shared'
import './Onboarding.css'

const STEPS = [
  { id: 'employee', label: 'Select Employee', icon: '👤' },
  { id: 'card', label: 'Assign Card', icon: '💳' },
  { id: 'devices', label: 'Enroll on Devices', icon: '📱' },
  { id: 'access', label: 'Access Group', icon: '🚪' },
  { id: 'confirm', label: 'Confirm', icon: '✅' },
]

const decodeHexToDecimal = (hexData) => {
  try {
    if (!hexData) return 'N/A'
    let cleanHex = hexData.replace(/\s/g, '').toUpperCase()
    if (cleanHex.length % 2 === 1) cleanHex = '0' + cleanHex
    let significant = cleanHex.replace(/^0+/, '') || '0'
    if (significant.length % 2 === 1) significant = '0' + significant
    return BigInt('0x' + significant).toString()
  } catch { return 'Error' }
}

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [scanning, setScanning] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  // Data
  const [devices, setDevices] = useState([])
  const [employees, setEmployees] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [accessGroups, setAccessGroups] = useState([])

  // Wizard state
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [selectedDevice, setSelectedDevice] = useState('')
  const [scannedCard, setScannedCard] = useState(null)
  const [cardAssignment, setCardAssignment] = useState(null)
  const [selectedDevices, setSelectedDevices] = useState([])
  const [selectedAccessGroup, setSelectedAccessGroup] = useState('')
  const [enrollmentResult, setEnrollmentResult] = useState(null)
  const [onboardingComplete, setOnboardingComplete] = useState(false)

  useEffect(() => {
    loadDevices()
  }, [])

  const loadDevices = async () => {
    try {
      const res = await deviceAPI.getAll()
      setDevices(res.data.data || [])
    } catch (e) {
      console.error('Failed to load devices:', e)
    }
  }

  // Search employees
  const searchEmployees = useCallback(async (query) => {
    if (!query || query.length < 2) {
      if (!query) setEmployees([])
      return
    }
    try {
      setLoading(true)
      const res = await enrollmentAPI.searchEmployees(query)
      setEmployees(res.data.data || [])
    } catch (e) {
      console.error('Search failed:', e)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => searchEmployees(searchQuery), 300)
    return () => clearTimeout(timer)
  }, [searchQuery, searchEmployees])

  const loadAllEmployees = async () => {
    try {
      setLoading(true)
      const res = await enrollmentAPI.getEmployeesWithStatus({ limit: 100 })
      setEmployees(res.data.data || [])
    } catch (e) {
      setError('Failed to load employees')
    } finally {
      setLoading(false)
    }
  }

  // Load access groups when we reach that step
  useEffect(() => {
    if (currentStep === 3 && selectedDevices.length > 0) {
      loadAccessGroups()
    }
  }, [currentStep, selectedDevices])

  const loadAccessGroups = async () => {
    try {
      const deviceId = selectedDevices[0]
      const res = await doorAPI.getAccessGroups(deviceId)
      setAccessGroups(res.data.data || [])
    } catch (e) {
      console.error('Failed to load access groups:', e)
      setAccessGroups([])
    }
  }

  // Scan card
  const handleScanCard = async () => {
    if (!selectedDevice) return setError('Select a scanning device first')
    try {
      setScanning(true)
      setError(null)
      setScannedCard(null)
      const res = await enrollmentAPI.scanCard(selectedDevice, 15)
      setScannedCard(res.data.data)
      if (res.data.data.isAssigned) {
        setError('This card is already assigned. Please use a different card.')
      }
    } catch (e) {
      setError(e.response?.data?.message || e.message || 'Failed to scan card')
    } finally {
      setScanning(false)
    }
  }

  // Assign card
  const handleAssignCard = async () => {
    if (!scannedCard || !selectedEmployee) return
    const cardData = scannedCard.fullData || scannedCard.csn || scannedCard.data || scannedCard.cardData
    if (!cardData) return setError('Card data missing. Please scan again.')

    try {
      setLoading(true)
      setError(null)
      const res = await enrollmentAPI.assignCard({
        employeeId: String(selectedEmployee.employee_id),
        employeeName: selectedEmployee.name || selectedEmployee.fullname || selectedEmployee.displayname,
        cardData,
        cardSize: 32,
        cardType: scannedCard.type || 'CSN',
      })
      setCardAssignment(res.data.data)
      setSuccess('Card assigned successfully!')
      setCurrentStep(2) // Move to devices step
    } catch (e) {
      setError(e.response?.data?.message || e.message || 'Failed to assign card')
    } finally {
      setLoading(false)
    }
  }

  // Enroll on devices
  const handleEnrollOnDevices = async () => {
    if (!cardAssignment || selectedDevices.length === 0) return
    try {
      setLoading(true)
      setError(null)
      const res = await enrollmentAPI.enrollOnMultipleDevices(
        selectedDevices.map(d => parseInt(d)),
        cardAssignment.id
      )
      setEnrollmentResult(res.data.data)
      setSuccess(`Enrolled on ${res.data.data.successful?.length || 0}/${selectedDevices.length} devices`)
      setCurrentStep(3) // Move to access group
    } catch (e) {
      setError(e.response?.data?.message || e.message || 'Enrollment failed')
    } finally {
      setLoading(false)
    }
  }

  // Complete onboarding
  const handleComplete = async () => {
    try {
      setLoading(true)
      setError(null)

      // Optionally assign access group
      if (selectedAccessGroup && selectedDevices.length > 0) {
        try {
          await userAPI.setAccessGroups(selectedDevices[0], [{
            userID: selectedEmployee.employee_id,
            accessGroupIDs: [parseInt(selectedAccessGroup)]
          }])
        } catch (e) {
          console.warn('Access group assignment failed (non-blocking):', e)
        }
      }

      setOnboardingComplete(true)
      setCurrentStep(4)
      setSuccess('Onboarding complete! Employee is fully set up.')
    } catch (e) {
      setError(e.response?.data?.message || e.message || 'Failed to complete onboarding')
    } finally {
      setLoading(false)
    }
  }

  const resetWizard = () => {
    setCurrentStep(0)
    setSelectedEmployee(null)
    setSelectedDevice('')
    setScannedCard(null)
    setCardAssignment(null)
    setSelectedDevices([])
    setSelectedAccessGroup('')
    setEnrollmentResult(null)
    setOnboardingComplete(false)
    setError(null)
    setSuccess(null)
    setSearchQuery('')
    setEmployees([])
  }

  const toggleDeviceSelection = (deviceId) => {
    setSelectedDevices(prev =>
      prev.includes(deviceId) ? prev.filter(d => d !== deviceId) : [...prev, deviceId]
    )
  }

  const connectedDevices = devices.filter(d => d.status === 'connected')
  const canProceed = () => {
    switch (currentStep) {
      case 0: return !!selectedEmployee
      case 1: return !!cardAssignment
      case 2: return selectedDevices.length > 0
      case 3: return true // access group is optional
      default: return false
    }
  }

  return (
    <div className="page">
      <h2>🚀 Employee Onboarding</h2>
      <p className="onboard-subtitle">Walk through a guided process to set up a new employee with card, device enrollment, and access control.</p>

      {/* Progress Steps */}
      <div className="onboard-progress">
        {STEPS.map((step, i) => (
          <div key={step.id} className={`onboard-step ${i < currentStep ? 'done' : ''} ${i === currentStep ? 'active' : ''}`}>
            <div className="onboard-step-circle">
              {i < currentStep ? '✓' : step.icon}
            </div>
            <span className="onboard-step-label">{step.label}</span>
            {i < STEPS.length - 1 && <div className="onboard-step-line" />}
          </div>
        ))}
      </div>

      <ErrorBanner error={error} onDismiss={() => setError(null)} />
      {success && (
        <div className="alert alert-success">
          ✅ {success}
          <button className="btn-close" onClick={() => setSuccess(null)}>×</button>
        </div>
      )}

      {/* Step 0: Select Employee */}
      {currentStep === 0 && (
        <div className="card onboard-card">
          <h3>👤 Step 1: Select Employee</h3>
          <p>Search for the employee you want to onboard.</p>

          <div className="employee-search-row">
            <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search by name, ID, or department..."
                className="form-control"
              />
            </div>
            <button className="btn btn-secondary" onClick={loadAllEmployees} disabled={loading}>
              {loading ? '⏳' : '📋'} Load All
            </button>
          </div>

          {employees.length > 0 && (
            <div className="onboard-employee-list">
              {employees.map(emp => (
                <div
                  key={emp.employee_id}
                  className={`onboard-employee-item ${selectedEmployee?.employee_id === emp.employee_id ? 'selected' : ''} ${emp.hasCard ? 'has-card' : ''}`}
                  onClick={() => !emp.hasCard && setSelectedEmployee(emp)}
                >
                  <div className="onboard-emp-info">
                    <strong>{emp.name}</strong>
                    <span className="onboard-emp-id">ID: {emp.employee_id}</span>
                    {emp.department && <span className="onboard-emp-dept">{emp.department}</span>}
                  </div>
                  <div>
                    {emp.hasCard ? (
                      <span className="badge badge-warning">Already has card</span>
                    ) : selectedEmployee?.employee_id === emp.employee_id ? (
                      <span className="badge badge-success">✓ Selected</span>
                    ) : (
                      <span className="badge badge-secondary">Available</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {selectedEmployee && (
            <div className="onboard-selected-summary">
              <strong>Selected:</strong> {selectedEmployee.name} (ID: {selectedEmployee.employee_id})
              {selectedEmployee.department && ` — ${selectedEmployee.department}`}
            </div>
          )}

          <div className="onboard-actions">
            <button className="btn btn-primary" disabled={!canProceed()} onClick={() => setCurrentStep(1)}>
              Next: Assign Card →
            </button>
          </div>
        </div>
      )}

      {/* Step 1: Scan & Assign Card */}
      {currentStep === 1 && (
        <div className="card onboard-card">
          <h3>💳 Step 2: Assign Card</h3>
          <p>Scan a card on a connected device, then assign it to <strong>{selectedEmployee?.name}</strong>.</p>

          <div className="onboard-scan-row">
            <select
              value={selectedDevice}
              onChange={e => setSelectedDevice(e.target.value)}
              className="form-control"
              style={{ maxWidth: 300 }}
            >
              <option value="">-- Select scanning device --</option>
              {connectedDevices.map(d => (
                <option key={d.id} value={d.id}>🟢 {d.name} ({d.ip})</option>
              ))}
            </select>
            <button className="btn btn-primary" onClick={handleScanCard} disabled={!selectedDevice || scanning}>
              {scanning ? '📡 Scanning...' : '🔍 Scan Card'}
            </button>
          </div>

          {scanning && (
            <div className="onboard-scanning">
              <div className="onboard-scan-pulse"></div>
              <p>Waiting for card... Place card on the reader.</p>
            </div>
          )}

          {scannedCard && !scannedCard.isAssigned && (
            <div className="onboard-scanned-card">
              <h4>📇 Card Detected</h4>
              <p><strong>Number:</strong> <code>{decodeHexToDecimal(scannedCard.csn || scannedCard.data)}</code></p>
              <p><strong>Type:</strong> {scannedCard.type || 'CSN'}</p>
              <button className="btn btn-primary" onClick={handleAssignCard} disabled={loading}>
                {loading ? 'Assigning...' : `Assign to ${selectedEmployee?.name}`}
              </button>
            </div>
          )}

          {cardAssignment && (
            <div className="onboard-success-banner">
              ✅ Card assigned to {selectedEmployee?.name}
            </div>
          )}

          <div className="onboard-actions">
            <button className="btn btn-secondary" onClick={() => setCurrentStep(0)}>← Back</button>
            <button className="btn btn-primary" disabled={!cardAssignment} onClick={() => setCurrentStep(2)}>
              Next: Devices →
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Enroll on Devices */}
      {currentStep === 2 && (
        <div className="card onboard-card">
          <h3>📱 Step 3: Enroll on Devices</h3>
          <p>Select which devices should recognize <strong>{selectedEmployee?.name}</strong>'s card.</p>

          {connectedDevices.length === 0 ? (
            <div className="bio-empty" style={{ padding: '30px' }}>
              <p>No connected devices available.</p>
            </div>
          ) : (
            <div className="onboard-device-grid">
              {connectedDevices.map(d => (
                <label key={d.id} className={`onboard-device-item ${selectedDevices.includes(String(d.id)) ? 'selected' : ''}`}>
                  <input
                    type="checkbox"
                    checked={selectedDevices.includes(String(d.id))}
                    onChange={() => toggleDeviceSelection(String(d.id))}
                  />
                  <div className="onboard-device-info">
                    <strong>{d.name}</strong>
                    <span>{d.ip}:{d.port}</span>
                  </div>
                </label>
              ))}
            </div>
          )}

          <p className="onboard-hint">{selectedDevices.length} device(s) selected</p>

          {!enrollmentResult && (
            <button
              className="btn btn-primary"
              onClick={handleEnrollOnDevices}
              disabled={selectedDevices.length === 0 || loading}
            >
              {loading ? 'Enrolling...' : `Enroll on ${selectedDevices.length} Device(s)`}
            </button>
          )}

          {enrollmentResult && (
            <div className="onboard-success-banner">
              ✅ Enrolled on {enrollmentResult.successful?.length || 0} device(s)
              {enrollmentResult.failed?.length > 0 && (
                <span className="onboard-fail-note"> ({enrollmentResult.failed.length} failed)</span>
              )}
            </div>
          )}

          <div className="onboard-actions">
            <button className="btn btn-secondary" onClick={() => setCurrentStep(1)}>← Back</button>
            <button className="btn btn-primary" disabled={selectedDevices.length === 0} onClick={() => setCurrentStep(3)}>
              Next: Access Group →
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Access Group (Optional) */}
      {currentStep === 3 && (
        <div className="card onboard-card">
          <h3>🚪 Step 4: Access Group (Optional)</h3>
          <p>Assign an access group to control which doors <strong>{selectedEmployee?.name}</strong> can access.</p>

          {accessGroups.length > 0 ? (
            <div className="form-group">
              <label>Select Access Group</label>
              <select
                value={selectedAccessGroup}
                onChange={e => setSelectedAccessGroup(e.target.value)}
                className="form-control"
              >
                <option value="">-- No access group (skip) --</option>
                {accessGroups.map(ag => (
                  <option key={ag.id || ag.ID} value={ag.id || ag.ID}>
                    {ag.name || ag.Name || `Group ${ag.id || ag.ID}`}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className="onboard-info-banner">
              ℹ️ No access groups configured on the selected device. You can set these up later from the Doors & Schedules page.
            </div>
          )}

          <div className="onboard-actions">
            <button className="btn btn-secondary" onClick={() => setCurrentStep(2)}>← Back</button>
            <button className="btn btn-primary" onClick={handleComplete} disabled={loading}>
              {loading ? 'Completing...' : 'Complete Onboarding ✅'}
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Confirmation */}
      {currentStep === 4 && onboardingComplete && (
        <div className="card onboard-card onboard-complete">
          <div className="onboard-complete-icon">🎉</div>
          <h3>Onboarding Complete!</h3>
          <p><strong>{selectedEmployee?.name}</strong> has been fully set up.</p>

          <div className="onboard-summary">
            <div className="onboard-summary-item">
              <span className="onboard-summary-label">Employee</span>
              <span>{selectedEmployee?.name} (ID: {selectedEmployee?.employee_id})</span>
            </div>
            <div className="onboard-summary-item">
              <span className="onboard-summary-label">Card</span>
              <span>{cardAssignment ? decodeHexToDecimal(cardAssignment.cardData) : '—'}</span>
            </div>
            <div className="onboard-summary-item">
              <span className="onboard-summary-label">Devices</span>
              <span>{enrollmentResult?.successful?.length || selectedDevices.length} enrolled</span>
            </div>
            <div className="onboard-summary-item">
              <span className="onboard-summary-label">Access Group</span>
              <span>{selectedAccessGroup ? `Group #${selectedAccessGroup}` : 'None'}</span>
            </div>
          </div>

          <div className="onboard-actions" style={{ justifyContent: 'center' }}>
            <button className="btn btn-primary" onClick={resetWizard}>
              🚀 Onboard Another Employee
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
