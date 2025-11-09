import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_CONFIG } from '../config/constants'
import './Debugger.css'

const Debugger = () => {
  const [devices, setDevices] = useState([])
  const [selectedDevice, setSelectedDevice] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([])
  const [formData, setFormData] = useState({})

  useEffect(() => {
    loadDevices()
  }, [])

  const loadDevices = async () => {
    try {
      const response = await axios.get(`${API_CONFIG.API_BASE_URL}/devices`)
      if (response.data.success) {
        setDevices(response.data.data)
        if (response.data.data.length > 0 && !selectedDevice) {
          setSelectedDevice(response.data.data[0].id)
        }
      }
    } catch (error) {
      console.error('Error loading devices:', error)
    }
  }

  const addResult = (method, endpoint, request, response, error = null) => {
    const result = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      method,
      endpoint,
      request,
      response,
      error,
      success: !error
    }
    setResults(prev => [result, ...prev])
  }

  const clearResults = () => {
    setResults([])
  }

  // Device Connection Functions
  const testSearchDevices = async () => {
    setLoading(true)
    const timeout = formData.searchTimeout || 5
    try {
      const endpoint = `${API_CONFIG.API_BASE_URL}/devices/search?timeout=${timeout}`
      const response = await axios.get(endpoint)
      addResult('GET', endpoint, { timeout }, response.data)
    } catch (error) {
      addResult('GET', `${API_CONFIG.API_BASE_URL}/devices/search`, { timeout }, null, error.response?.data || error.message)
    } finally {
      setLoading(false)
    }
  }

  const testGetDevices = async () => {
    setLoading(true)
    try {
      const endpoint = `${API_CONFIG.API_BASE_URL}/devices`
      const response = await axios.get(endpoint)
      addResult('GET', endpoint, {}, response.data)
    } catch (error) {
      addResult('GET', `${API_CONFIG.API_BASE_URL}/devices`, {}, null, error.response?.data || error.message)
    } finally {
      setLoading(false)
    }
  }

  const testGetConnectedDevices = async () => {
    setLoading(true)
    try {
      const endpoint = `${API_CONFIG.API_BASE_URL}/devices?connected=true`
      const response = await axios.get(endpoint)
      addResult('GET', endpoint, {}, response.data)
    } catch (error) {
      addResult('GET', endpoint, {}, null, error.response?.data || error.message)
    } finally {
      setLoading(false)
    }
  }

  const testAddDevice = async () => {
    setLoading(true)
    const deviceData = {
      name: formData.deviceName || 'Test Device',
      ip: formData.deviceIp || '192.168.1.100',
      port: parseInt(formData.devicePort) || 51211,
      useSSL: formData.deviceUseSSL || false
    }
    try {
      const endpoint = `${API_CONFIG.API_BASE_URL}/devices`
      const response = await axios.post(endpoint, deviceData)
      addResult('POST', endpoint, deviceData, response.data)
      loadDevices()
    } catch (error) {
      addResult('POST', `${API_CONFIG.API_BASE_URL}/devices`, deviceData, null, error.response?.data || error.message)
    } finally {
      setLoading(false)
    }
  }

  const testConnectDevice = async () => {
    if (!selectedDevice) return
    setLoading(true)
    try {
      const endpoint = `${API_CONFIG.API_BASE_URL}/devices/${selectedDevice}/connect`
      const response = await axios.post(endpoint)
      addResult('POST', endpoint, { deviceId: selectedDevice }, response.data)
    } catch (error) {
      addResult('POST', `${API_CONFIG.API_BASE_URL}/devices/${selectedDevice}/connect`, { deviceId: selectedDevice }, null, error.response?.data || error.message)
    } finally {
      setLoading(false)
    }
  }

  const testDisconnectDevice = async () => {
    if (!selectedDevice) return
    setLoading(true)
    try {
      const endpoint = `${API_CONFIG.API_BASE_URL}/devices/${selectedDevice}/disconnect`
      const response = await axios.post(endpoint)
      addResult('POST', endpoint, { deviceId: selectedDevice }, response.data)
    } catch (error) {
      addResult('POST', `${API_CONFIG.API_BASE_URL}/devices/${selectedDevice}/disconnect`, { deviceId: selectedDevice }, null, error.response?.data || error.message)
    } finally {
      setLoading(false)
    }
  }

  const testGetDeviceInfo = async () => {
    if (!selectedDevice) return
    setLoading(true)
    try {
      const endpoint = `${API_CONFIG.API_BASE_URL}/devices/${selectedDevice}/info`
      const response = await axios.get(endpoint)
      addResult('GET', endpoint, { deviceId: selectedDevice }, response.data)
    } catch (error) {
      addResult('GET', `${API_CONFIG.API_BASE_URL}/devices/${selectedDevice}/info`, { deviceId: selectedDevice }, null, error.response?.data || error.message)
    } finally {
      setLoading(false)
    }
  }

  const testGetDeviceCapabilities = async () => {
    if (!selectedDevice) return
    setLoading(true)
    try {
      const endpoint = `${API_CONFIG.API_BASE_URL}/devices/${selectedDevice}/capabilities`
      const response = await axios.get(endpoint)
      addResult('GET', endpoint, { deviceId: selectedDevice }, response.data)
    } catch (error) {
      addResult('GET', `${API_CONFIG.API_BASE_URL}/devices/${selectedDevice}/capabilities`, { deviceId: selectedDevice }, null, error.response?.data || error.message)
    } finally {
      setLoading(false)
    }
  }

  const testConnectionTest = async () => {
    if (!selectedDevice) return
    setLoading(true)
    try {
      const endpoint = `${API_CONFIG.API_BASE_URL}/devices/${selectedDevice}/test`
      const response = await axios.get(endpoint)
      addResult('GET', endpoint, { deviceId: selectedDevice }, response.data)
    } catch (error) {
      addResult('GET', `${API_CONFIG.API_BASE_URL}/devices/${selectedDevice}/test`, { deviceId: selectedDevice }, null, error.response?.data || error.message)
    } finally {
      setLoading(false)
    }
  }

  const testUpdateDevice = async () => {
    if (!selectedDevice) return
    setLoading(true)
    const updateData = {
      name: formData.updateName,
      ip: formData.updateIp,
      port: formData.updatePort ? parseInt(formData.updatePort) : undefined
    }
    // Remove undefined values
    Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key])
    
    try {
      const endpoint = `${API_CONFIG.API_BASE_URL}/devices/${selectedDevice}`
      const response = await axios.put(endpoint, updateData)
      addResult('PUT', endpoint, updateData, response.data)
      loadDevices()
    } catch (error) {
      addResult('PUT', `${API_CONFIG.API_BASE_URL}/devices/${selectedDevice}`, updateData, null, error.response?.data || error.message)
    } finally {
      setLoading(false)
    }
  }

  const testDeleteDevice = async () => {
    if (!selectedDevice) return
    if (!confirm('Are you sure you want to delete this device?')) return
    setLoading(true)
    try {
      const endpoint = `${API_CONFIG.API_BASE_URL}/devices/${selectedDevice}`
      const response = await axios.delete(endpoint)
      addResult('DELETE', endpoint, { deviceId: selectedDevice }, response.data)
      loadDevices()
      setSelectedDevice('')
    } catch (error) {
      addResult('DELETE', `${API_CONFIG.API_BASE_URL}/devices/${selectedDevice}`, { deviceId: selectedDevice }, null, error.response?.data || error.message)
    } finally {
      setLoading(false)
    }
  }

  const testSyncDeviceStatus = async () => {
    setLoading(true)
    try {
      const endpoint = `${API_CONFIG.API_BASE_URL}/devices/sync`
      const response = await axios.post(endpoint)
      addResult('POST', endpoint, {}, response.data)
    } catch (error) {
      addResult('POST', `${API_CONFIG.API_BASE_URL}/devices/sync`, {}, null, error.response?.data || error.message)
    } finally {
      setLoading(false)
    }
  }

  const testReconnectDevices = async () => {
    setLoading(true)
    try {
      const endpoint = `${API_CONFIG.API_BASE_URL}/devices/reconnect`
      const response = await axios.post(endpoint)
      addResult('POST', endpoint, {}, response.data)
    } catch (error) {
      addResult('POST', `${API_CONFIG.API_BASE_URL}/devices/reconnect`, {}, null, error.response?.data || error.message)
    } finally {
      setLoading(false)
    }
  }

  const testGetStatistics = async () => {
    setLoading(true)
    try {
      const endpoint = `${API_CONFIG.API_BASE_URL}/devices/statistics`
      const response = await axios.get(endpoint)
      addResult('GET', endpoint, {}, response.data)
    } catch (error) {
      addResult('GET', `${API_CONFIG.API_BASE_URL}/devices/statistics`, {}, null, error.response?.data || error.message)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    alert('Copied to clipboard!')
  }

  const exportResults = () => {
    const dataStr = JSON.stringify(results, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `debugger-results-${new Date().toISOString()}.json`
    link.click()
  }

  return (
    <div className="debugger-container">
      <div className="debugger-header">
        <h2>🔧 Device API Debugger</h2>
        <p>Test all device connection functions and view JSON responses</p>
      </div>

      <div className="debugger-content">
        <div className="debugger-sidebar">
          <div className="sidebar-section">
            <h3>Device Selection</h3>
            <select
              value={selectedDevice}
              onChange={(e) => setSelectedDevice(e.target.value)}
              className="device-select"
            >
              <option value="">Select a device</option>
              {devices.map(device => (
                <option key={device.id} value={device.id}>
                  {device.name} ({device.ip}:{device.port})
                </option>
              ))}
            </select>
            <button onClick={loadDevices} className="btn-secondary">
              🔄 Refresh Devices
            </button>
          </div>

          <div className="sidebar-section">
            <h3>Search & Discovery</h3>
            <div className="form-group">
              <label>Timeout (seconds):</label>
              <input
                type="number"
                value={formData.searchTimeout || 5}
                onChange={(e) => setFormData({ ...formData, searchTimeout: e.target.value })}
                min="1"
                max="30"
              />
            </div>
            <button onClick={testSearchDevices} disabled={loading} className="btn-test">
              🔍 Search Devices
            </button>
            <button onClick={testGetDevices} disabled={loading} className="btn-test">
              📋 Get All Devices
            </button>
            <button onClick={testGetConnectedDevices} disabled={loading} className="btn-test">
              🔗 Get Connected Devices
            </button>
          </div>

          <div className="sidebar-section">
            <h3>Add New Device</h3>
            <div className="form-group">
              <input
                type="text"
                placeholder="Device Name"
                value={formData.deviceName || ''}
                onChange={(e) => setFormData({ ...formData, deviceName: e.target.value })}
              />
              <input
                type="text"
                placeholder="IP Address"
                value={formData.deviceIp || ''}
                onChange={(e) => setFormData({ ...formData, deviceIp: e.target.value })}
              />
              <input
                type="number"
                placeholder="Port"
                value={formData.devicePort || 51211}
                onChange={(e) => setFormData({ ...formData, devicePort: e.target.value })}
              />
              <label>
                <input
                  type="checkbox"
                  checked={formData.deviceUseSSL || false}
                  onChange={(e) => setFormData({ ...formData, deviceUseSSL: e.target.checked })}
                />
                Use SSL
              </label>
            </div>
            <button onClick={testAddDevice} disabled={loading} className="btn-test">
              ➕ Add Device
            </button>
          </div>

          <div className="sidebar-section">
            <h3>Connection Control</h3>
            <button onClick={testConnectDevice} disabled={loading || !selectedDevice} className="btn-test">
              🔌 Connect Device
            </button>
            <button onClick={testDisconnectDevice} disabled={loading || !selectedDevice} className="btn-test">
              🔌 Disconnect Device
            </button>
            <button onClick={testConnectionTest} disabled={loading || !selectedDevice} className="btn-test">
              ✓ Test Connection
            </button>
          </div>

          <div className="sidebar-section">
            <h3>Device Information</h3>
            <button onClick={testGetDeviceInfo} disabled={loading || !selectedDevice} className="btn-test">
              ℹ️ Get Device Info
            </button>
            <button onClick={testGetDeviceCapabilities} disabled={loading || !selectedDevice} className="btn-test">
              🎯 Get Capabilities
            </button>
          </div>

          <div className="sidebar-section">
            <h3>Device Management</h3>
            <div className="form-group">
              <input
                type="text"
                placeholder="New Name"
                value={formData.updateName || ''}
                onChange={(e) => setFormData({ ...formData, updateName: e.target.value })}
              />
              <input
                type="text"
                placeholder="New IP"
                value={formData.updateIp || ''}
                onChange={(e) => setFormData({ ...formData, updateIp: e.target.value })}
              />
              <input
                type="number"
                placeholder="New Port"
                value={formData.updatePort || ''}
                onChange={(e) => setFormData({ ...formData, updatePort: e.target.value })}
              />
            </div>
            <button onClick={testUpdateDevice} disabled={loading || !selectedDevice} className="btn-test">
              ✏️ Update Device
            </button>
            <button onClick={testDeleteDevice} disabled={loading || !selectedDevice} className="btn-test btn-danger">
              🗑️ Delete Device
            </button>
          </div>

          <div className="sidebar-section">
            <h3>System Operations</h3>
            <button onClick={testSyncDeviceStatus} disabled={loading} className="btn-test">
              🔄 Sync Device Status
            </button>
            <button onClick={testReconnectDevices} disabled={loading} className="btn-test">
              🔁 Auto-Reconnect
            </button>
            <button onClick={testGetStatistics} disabled={loading} className="btn-test">
              📊 Get Statistics
            </button>
          </div>
        </div>

        <div className="debugger-results">
          <div className="results-header">
            <h3>Test Results ({results.length})</h3>
            <div className="results-actions">
              <button onClick={exportResults} disabled={results.length === 0} className="btn-secondary">
                💾 Export JSON
              </button>
              <button onClick={clearResults} disabled={results.length === 0} className="btn-secondary">
                🗑️ Clear All
              </button>
            </div>
          </div>

          <div className="results-list">
            {results.length === 0 ? (
              <div className="empty-state">
                <p>No test results yet. Click a button to test an API endpoint.</p>
              </div>
            ) : (
              results.map(result => (
                <div key={result.id} className={`result-card ${result.success ? 'success' : 'error'}`}>
                  <div className="result-header">
                    <div className="result-meta">
                      <span className={`status-badge ${result.success ? 'success' : 'error'}`}>
                        {result.success ? '✓ SUCCESS' : '✗ ERROR'}
                      </span>
                      <span className="method-badge">{result.method}</span>
                      <span className="timestamp">{new Date(result.timestamp).toLocaleTimeString()}</span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(JSON.stringify(result, null, 2))}
                      className="btn-icon"
                      title="Copy to clipboard"
                    >
                      📋
                    </button>
                  </div>

                  <div className="result-endpoint">
                    <strong>Endpoint:</strong> {result.endpoint}
                  </div>

                  {Object.keys(result.request || {}).length > 0 && (
                    <div className="result-section">
                      <div className="section-header">Request:</div>
                      <pre className="json-display">
                        {JSON.stringify(result.request, null, 2)}
                      </pre>
                    </div>
                  )}

                  {result.response && (
                    <div className="result-section">
                      <div className="section-header">Response:</div>
                      <pre className="json-display">
                        {JSON.stringify(result.response, null, 2)}
                      </pre>
                    </div>
                  )}

                  {result.error && (
                    <div className="result-section">
                      <div className="section-header error">Error:</div>
                      <pre className="json-display error">
                        {typeof result.error === 'string' ? result.error : JSON.stringify(result.error, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p>Processing request...</p>
        </div>
      )}
    </div>
  )
}

export default Debugger
