import { decodeHexToDecimal } from './cardFormat'

/**
 * Step 1 — pick the employee to onboard.
 * Employees who already hold cards stay selectable: new cards are
 * assigned in addition to the ones they have.
 */
export default function EmployeeStep({
  searchQuery,
  setSearchQuery,
  employees,
  loading,
  onLoadAll,
  selectedEmployee,
  onSelect,
  onNext,
}) {
  return (
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
        <button className="btn btn-secondary" onClick={onLoadAll} disabled={loading}>
          {loading ? '⏳' : '📋'} Load All
        </button>
      </div>

      {employees.length > 0 && (
        <div className="onboard-employee-list">
          {employees.map(emp => {
            const cardCount = emp.cardCount ?? (emp.hasCard ? 1 : 0)
            const isSelected = selectedEmployee?.employee_id === emp.employee_id
            return (
              <div
                key={emp.employee_id}
                className={`onboard-employee-item ${isSelected ? 'selected' : ''}`}
                onClick={() => onSelect(emp)}
              >
                <div className="onboard-emp-info">
                  <strong>{emp.name}</strong>
                  <span className="onboard-emp-id">ID: {emp.employee_id}</span>
                  {emp.department && <span className="onboard-emp-dept">{emp.department}</span>}
                </div>
                <div>
                  {isSelected ? (
                    <span className="badge badge-success">✓ Selected</span>
                  ) : cardCount > 0 ? (
                    <span className="badge badge-warning">🎫 {cardCount} card{cardCount > 1 ? 's' : ''}</span>
                  ) : (
                    <span className="badge badge-secondary">No cards</span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {selectedEmployee && (
        <div className="onboard-selected-summary">
          <strong>Selected:</strong> {selectedEmployee.name} (ID: {selectedEmployee.employee_id})
          {selectedEmployee.department && ` — ${selectedEmployee.department}`}
          {selectedEmployee.cards?.length > 0 && (
            <div className="onboard-existing-cards">
              <strong>Existing cards ({selectedEmployee.cards.length}):</strong>{' '}
              {selectedEmployee.cards.map(c => (
                <code key={c.id} className="onboard-card-chip">{decodeHexToDecimal(c.card_data)}</code>
              ))}
              <div className="onboard-hint">New cards will be added in addition to these.</div>
            </div>
          )}
        </div>
      )}

      <div className="onboard-actions">
        <button className="btn btn-primary" disabled={!selectedEmployee} onClick={onNext}>
          Next: Assign Cards →
        </button>
      </div>
    </div>
  )
}
