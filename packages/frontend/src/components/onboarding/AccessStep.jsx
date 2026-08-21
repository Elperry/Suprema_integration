/**
 * Step 4 — optional access-group assignment.
 */
export default function AccessStep({
  selectedEmployee,
  accessGroups,
  selectedAccessGroup,
  setSelectedAccessGroup,
  loading,
  onBack,
  onComplete,
}) {
  return (
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
        <button className="btn btn-secondary" onClick={onBack}>← Back</button>
        <button className="btn btn-primary" onClick={onComplete} disabled={loading}>
          {loading ? 'Completing...' : 'Complete Onboarding ✅'}
        </button>
      </div>
    </div>
  )
}
