import { useState, useEffect } from 'react'
import { cardAPI, deviceAPI } from '../services/api'

export default function CardScanning() {
  const [devices, setDevices] = useState([])
  const [selectedDevice, setSelectedDevice] = useState('')
  const [scannedCard, setScannedCard] = useState(null)
  const [blacklist, setBlacklist] = useState([])

  useEffect(() => { loadDevices() }, [])

  const loadDevices = async () => {
    try {
      const res = await deviceAPI.getAll()
      setDevices(res.data.data || [])
    } catch (e) { console.error(e) }
  }

  const loadBlacklist = async () => {
    if (!selectedDevice) return
    try {
      const res = await cardAPI.getBlacklist(selectedDevice)
      setBlacklist(res.data.data || [])
    } catch (e) { console.error(e) }
  }

  const handleScan = async () => {
    if (!selectedDevice) {
      alert('Please select a device')
      return
    }
    try {
      const res = await cardAPI.scan(selectedDevice)
      setScannedCard(res.data.data)
      alert('Card scanned successfully!')
    } catch (e) { alert('Error: ' + e.message) }
  }

  const handleAddToBlacklist = async () => {
    if (!scannedCard) {
      alert('No card scanned')
      return
    }
    try {
      await cardAPI.addToBlacklist(selectedDevice, [{ cardID: scannedCard.cardID }])
      alert('Card added to blacklist')
      loadBlacklist()
    } catch (e) { alert('Error: ' + e.message) }
  }

  return (
    <div className="page">
      <h2>🔍 Card Scanning</h2>
      <div className="card">
        <h3>Select Device</h3>
        <select value={selectedDevice} onChange={(e) => { setSelectedDevice(e.target.value); loadBlacklist() }} className="form-control">
          <option value="">-- Select Device --</option>
          {devices.map(d => (
            <option key={d.id} value={d.id}>{d.name}</option>
          ))}
        </select>
      </div>

      {selectedDevice && (
        <>
          <div className="card">
            <h3>Scan Card</h3>
            <button onClick={handleScan} className="btn btn-primary">🔍 Scan Card</button>
            {scannedCard && (
              <div className="result-box">
                <h4>Scanned Card Data:</h4>
                <pre>{JSON.stringify(scannedCard, null, 2)}</pre>
                <button onClick={handleAddToBlacklist} className="btn btn-warning">Add to Blacklist</button>
              </div>
            )}
          </div>

          <div className="card">
            <h3>Card Blacklist</h3>
            {blacklist.length > 0 ? (
              <ul className="list">
                {blacklist.map((card, i) => (
                  <li key={i}>{card.cardID || 'Unknown'}</li>
                ))}
              </ul>
            ) : (
              <p className="text-muted">No blacklisted cards</p>
            )}
          </div>
        </>
      )}
    </div>
  )
}
