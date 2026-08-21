import { decodeHexToDecimal, assignmentCardNumber } from './cardFormat'

/**
 * Step 2 — scan and assign one or more cards to the selected employee.
 * Each assigned card is collected in `cardAssignments`; the operator can
 * keep scanning to add as many cards as needed before moving on.
 */
export default function CardStep({
  selectedEmployee,
  connectedDevices,
  selectedDevice,
  setSelectedDevice,
  scanning,
  scannedCard,
  onScan,
  onAssign,
  cardAssignments,
  loading,
  onBack,
  onNext,
}) {
  const existingCards = selectedEmployee?.cards || []

  return (
    <div className="card onboard-card">
      <h3>💳 Step 2: Assign Cards</h3>
      <p>
        Scan a card on a connected device, then assign it to <strong>{selectedEmployee?.name}</strong>.
        You can assign more than one card — scan and assign each in turn.
      </p>

      {existingCards.length > 0 && (
        <div className="onboard-info-banner">
          ℹ️ {selectedEmployee?.name} already has {existingCards.length} card{existingCards.length > 1 ? 's' : ''}:{' '}
          {existingCards.map(c => (
            <code key={c.id} className="onboard-card-chip">{decodeHexToDecimal(c.card_data)}</code>
          ))}
          {' '}New cards are added in addition to these.
        </div>
      )}

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
        <button className="btn btn-primary" onClick={onScan} disabled={!selectedDevice || scanning}>
          {scanning ? '📡 Scanning...' : cardAssignments.length > 0 ? '🔍 Scan Another Card' : '🔍 Scan Card'}
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
          <button className="btn btn-primary" onClick={onAssign} disabled={loading}>
            {loading ? 'Assigning...' : `Assign to ${selectedEmployee?.name}`}
          </button>
        </div>
      )}

      {cardAssignments.length > 0 && (
        <div className="onboard-success-banner">
          ✅ {cardAssignments.length} card{cardAssignments.length > 1 ? 's' : ''} assigned to {selectedEmployee?.name}:{' '}
          {cardAssignments.map(ca => (
            <code key={ca.id} className="onboard-card-chip">{assignmentCardNumber(ca)}</code>
          ))}
        </div>
      )}

      <div className="onboard-actions">
        <button className="btn btn-secondary" onClick={onBack}>← Back</button>
        <button className="btn btn-primary" disabled={cardAssignments.length === 0} onClick={onNext}>
          Next: Devices →
        </button>
      </div>
    </div>
  )
}
