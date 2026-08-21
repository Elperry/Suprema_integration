import { assignmentCardNumber } from './cardFormat'

/**
 * Step 5 — final summary of the completed onboarding.
 */
export default function ConfirmStep({
  selectedEmployee,
  cardAssignments,
  enrollmentResult,
  selectedDevices,
  selectedAccessGroup,
  onReset,
}) {
  return (
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
          <span className="onboard-summary-label">
            Card{cardAssignments.length > 1 ? `s (${cardAssignments.length})` : ''}
          </span>
          <span>
            {cardAssignments.length > 0
              ? cardAssignments.map(ca => (
                  <code key={ca.id} className="onboard-card-chip">{assignmentCardNumber(ca)}</code>
                ))
              : '—'}
          </span>
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
        <button className="btn btn-primary" onClick={onReset}>
          🚀 Onboard Another Employee
        </button>
      </div>
    </div>
  )
}
