import { useState, useEffect, useCallback } from 'react'
import { enrollmentAPI, deviceAPI, doorAPI, userAPI } from '../services/api'
import { ErrorBanner } from './shared'
import EmployeeStep from './onboarding/EmployeeStep'
import CardStep from './onboarding/CardStep'
import DeviceStep from './onboarding/DeviceStep'
import AccessStep from './onboarding/AccessStep'
import ConfirmStep from './onboarding/ConfirmStep'
import { decodeHexToDecimal } from './onboarding/cardFormat'
import './Onboarding.css'

const STEPS = [
  { id: 'employee', label: 'Select Employee', icon: '👤' },
  { id: 'card', label: 'Assign Cards', icon: '💳' },
  { id: 'devices', label: 'Enroll on Devices', icon: '📱' },
  { id: 'access', label: 'Access Group', icon: '🚪' },
  { id: 'confirm', label: 'Confirm', icon: '✅' },
]

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
  // All card assignments created during this onboarding session (one per card).
  const [cardAssignments, setCardAssignments] = useState([])
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
      const card = res.data.data
      setScannedCard(card)
      if (card.isAssigned) {
        const owner = card.existingAssignment?.user?.name
        const isSameEmployee =
          card.existingAssignment?.user?.employee_id === selectedEmployee?.employee_id
        setError(
          isSameEmployee
            ? `This card is already assigned to ${selectedEmployee?.name}. Scan a different card to add another.`
            : `This card is already assigned${owner ? ` to ${owner}` : ''}. Please use a different card.`
        )
      }
    } catch (e) {
      setError(e.response?.data?.message || e.message || 'Failed to scan card')
    } finally {
      setScanning(false)
    }
  }

  // Assign the scanned card — can be repeated to give the employee several cards.
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
      setCardAssignments(prev => [...prev, res.data.data])
      setScannedCard(null)
      // Devices must re-enroll to pick up the newly added card.
      setEnrollmentResult(null)
      setSuccess(`Card ${decodeHexToDecimal(cardData)} assigned! Scan another card or continue to devices.`)
    } catch (e) {
      setError(e.response?.data?.message || e.message || 'Failed to assign card')
    } finally {
      setLoading(false)
    }
  }

  // Enroll every assigned card on the selected devices. Each enroll call pushes
  // the employee's full active card set to the device; per-assignment calls keep
  // one DeviceEnrollment row per card in the database.
  const handleEnrollOnDevices = async () => {
    if (cardAssignments.length === 0 || selectedDevices.length === 0) return
    setLoading(true)
    setError(null)
    const deviceIds = selectedDevices.map(d => parseInt(d))
    const deviceOk = new Map() // deviceId -> false if any card failed on it
    const failures = []

    for (const assignment of cardAssignments) {
      let data = null
      try {
        const res = await enrollmentAPI.enrollOnMultipleDevices(deviceIds, assignment.id)
        data = res.data?.data
      } catch (e) {
        data = e.response?.data?.data || null
        if (!data) {
          failures.push(e.response?.data?.message || e.message)
          deviceIds.forEach(id => deviceOk.set(id, false))
          continue
        }
      }
      for (const entry of data?.successful || []) {
        if (!deviceOk.has(entry.deviceId)) deviceOk.set(entry.deviceId, true)
      }
      for (const entry of data?.failed || []) {
        deviceOk.set(entry.deviceId, false)
        failures.push(`Device ${entry.deviceId}: ${entry.error}`)
      }
    }

    const successful = [...deviceOk].filter(([, ok]) => ok).map(([deviceId]) => ({ deviceId }))
    const failed = [...deviceOk].filter(([, ok]) => !ok).map(([deviceId]) => ({ deviceId }))
    setEnrollmentResult({ successful, failed })
    setLoading(false)

    if (successful.length === 0) {
      setError(failures[0] || 'Enrollment failed on all devices')
      return
    }
    if (failures.length > 0) {
      setError(`Some enrollments failed: ${failures.slice(0, 3).join('; ')}${failures.length > 3 ? '…' : ''}`)
    }
    setSuccess(`Enrolled ${cardAssignments.length} card(s) on ${successful.length}/${deviceIds.length} devices`)
    setCurrentStep(3)
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
    setCardAssignments([])
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

  const selectEmployee = (emp) => {
    setSelectedEmployee(emp)
    // A different employee invalidates any cards/enrollments from a prior pick.
    setCardAssignments([])
    setScannedCard(null)
    setEnrollmentResult(null)
  }

  const connectedDevices = devices.filter(d => d.status === 'connected')

  return (
    <div className="page">
      <h2>🚀 Employee Onboarding</h2>
      <p className="onboard-subtitle">Walk through a guided process to set up a new employee with cards, device enrollment, and access control.</p>

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

      {currentStep === 0 && (
        <EmployeeStep
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          employees={employees}
          loading={loading}
          onLoadAll={loadAllEmployees}
          selectedEmployee={selectedEmployee}
          onSelect={selectEmployee}
          onNext={() => setCurrentStep(1)}
        />
      )}

      {currentStep === 1 && (
        <CardStep
          selectedEmployee={selectedEmployee}
          connectedDevices={connectedDevices}
          selectedDevice={selectedDevice}
          setSelectedDevice={setSelectedDevice}
          scanning={scanning}
          scannedCard={scannedCard}
          onScan={handleScanCard}
          onAssign={handleAssignCard}
          cardAssignments={cardAssignments}
          loading={loading}
          onBack={() => setCurrentStep(0)}
          onNext={() => setCurrentStep(2)}
        />
      )}

      {currentStep === 2 && (
        <DeviceStep
          selectedEmployee={selectedEmployee}
          connectedDevices={connectedDevices}
          selectedDevices={selectedDevices}
          onToggleDevice={toggleDeviceSelection}
          cardAssignments={cardAssignments}
          enrollmentResult={enrollmentResult}
          loading={loading}
          onEnroll={handleEnrollOnDevices}
          onBack={() => setCurrentStep(1)}
          onNext={() => setCurrentStep(3)}
        />
      )}

      {currentStep === 3 && (
        <AccessStep
          selectedEmployee={selectedEmployee}
          accessGroups={accessGroups}
          selectedAccessGroup={selectedAccessGroup}
          setSelectedAccessGroup={setSelectedAccessGroup}
          loading={loading}
          onBack={() => setCurrentStep(2)}
          onComplete={handleComplete}
        />
      )}

      {currentStep === 4 && onboardingComplete && (
        <ConfirmStep
          selectedEmployee={selectedEmployee}
          cardAssignments={cardAssignments}
          enrollmentResult={enrollmentResult}
          selectedDevices={selectedDevices}
          selectedAccessGroup={selectedAccessGroup}
          onReset={resetWizard}
        />
      )}
    </div>
  )
}
