import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import axios from 'axios'
import './App.css'

// Components
import Dashboard from './components/Dashboard'
import Devices from './components/Devices'
import Users from './components/Users'
import CardScanning from './components/CardScanning'
import Events from './components/Events'
import Settings from './components/Settings'
import Debugger from './components/Debugger'
import Enrollment from './components/Enrollment'
import {API_CONFIG,API_ENDPOINTS } from './config/constants'

function App() {
  const [health, setHealth] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkHealth()
    const interval = setInterval(checkHealth, 30000) // Check every 30 seconds
    return () => clearInterval(interval)
  }, [])

  const checkHealth = async () => {
    try {
      const response = await axios.get(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.HEALTH}`)
      setHealth(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Health check failed:', error)
      setHealth(null)
      setLoading(false)
    }
  }

  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <div className="header-content">
            <div className="brand">
              <span className="icon">🔐</span>
              <h1>Suprema HR Integration</h1>
            </div>
            <div className="header-status">
              <div className={`status-indicator ${health ? 'connected' : 'disconnected'}`}>
                <span className="dot"></span>
                <span>{health ? 'Connected' : 'Disconnected'}</span>
              </div>
            </div>
          </div>
        </header>

        <nav className="app-nav">
          <Link to="/" className="nav-link">
            <span className="icon">📊</span>
            Dashboard
          </Link>
          <Link to="/devices" className="nav-link">
            <span className="icon">🖥️</span>
            Devices
          </Link>
          <Link to="/enrollment" className="nav-link">
            <span className="icon">🎫</span>
            Enrollment
          </Link>
          <Link to="/users" className="nav-link">
            <span className="icon">👥</span>
            Users & Cards
          </Link>
          <Link to="/scanning" className="nav-link">
            <span className="icon">🔍</span>
            Card Scanning
          </Link>
          <Link to="/events" className="nav-link">
            <span className="icon">📋</span>
            Events
          </Link>
          <Link to="/debugger" className="nav-link">
            <span className="icon">🔧</span>
            Debugger
          </Link>
          <Link to="/settings" className="nav-link">
            <span className="icon">⚙️</span>
            Settings
          </Link>
        </nav>

        <main className="app-main">
          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            <Routes>
              <Route path="/" element={<Dashboard health={health} />} />
              <Route path="/devices" element={<Devices />} />
              <Route path="/enrollment" element={<Enrollment />} />
              <Route path="/users" element={<Users />} />
              <Route path="/scanning" element={<CardScanning />} />
              <Route path="/events" element={<Events />} />
              <Route path="/debugger" element={<Debugger />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          )}
        </main>
      </div>
    </Router>
  )
}

export default App
