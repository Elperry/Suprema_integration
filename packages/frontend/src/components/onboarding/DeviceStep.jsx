/**
 * Step 3 — choose the devices that should recognize the employee's cards.
 * Enrollment pushes the employee's full active card set to each device.
 */
export default function DeviceStep({
  selectedEmployee,
  connectedDevices,
  selectedDevices,
  onToggleDevice,
  cardAssignments,
  enrollmentResult,
  loading,
  onEnroll,
  onBack,
  onNext,
}) {
  return (
    <div className="card onboard-card">
      <h3>📱 Step 3: Enroll on Devices</h3>
      <p>
        Select which devices should recognize <strong>{selectedEmployee?.name}</strong>'s{' '}
        {cardAssignments.length > 1 ? `${cardAssignments.length} cards` : 'card'}.
      </p>

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
                onChange={() => onToggleDevice(String(d.id))}
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
          onClick={onEnroll}
          disabled={selectedDevices.length === 0 || loading}
        >
          {loading
            ? 'Enrolling...'
            : `Enroll ${cardAssignments.length} Card(s) on ${selectedDevices.length} Device(s)`}
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
        <button className="btn btn-secondary" onClick={onBack}>← Back</button>
        <button className="btn btn-primary" disabled={selectedDevices.length === 0} onClick={onNext}>
          Next: Access Group →
        </button>
      </div>
    </div>
  )
}
