import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
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
import TNA from './components/TNA'
import { NotificationProvider } from './components/Notifications'
import { API_CONFIG, API_ENDPOINTS } from './config/constants'

// Navigation component with active state
function NavLink({ to, icon, children }) {
  const location = useLocation()
  const isActive = location.pathname === to
  
  return (
    <Link to={to} className={`nav-link ${isActive ? 'active' : ''}`}>
      <span className="icon">{icon}</span>
      {children}
    </Link>
  )
}

function AppContent() {
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
        <NavLink to="/" icon="📊">Dashboard</NavLink>
        <NavLink to="/devices" icon="🖥️">Devices</NavLink>
        <NavLink to="/enrollment" icon="🎫">Enrollment</NavLink>
        <NavLink to="/users" icon="👥">Users & Cards</NavLink>
        <NavLink to="/scanning" icon="🔍">Card Scanning</NavLink>
        <NavLink to="/tna" icon="⏰">Time & Attendance</NavLink>
        <NavLink to="/events" icon="📋">Events</NavLink>
        <NavLink to="/debugger" icon="🔧">Debugger</NavLink>
        <NavLink to="/settings" icon="⚙️">Settings</NavLink>
      </nav>

      <main className="app-main">
        {loading ? (
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>Connecting to server...</p>
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<Dashboard health={health} />} />
            <Route path="/devices" element={<Devices />} />
            <Route path="/enrollment" element={<Enrollment />} />
            <Route path="/users" element={<Users />} />
            <Route path="/scanning" element={<CardScanning />} />
            <Route path="/tna" element={<TNA />} />
            <Route path="/events" element={<Events />} />
            <Route path="/debugger" element={<Debugger />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        )}
      </main>
    </div>
  )
}

function App() {
  return (
    <NotificationProvider>
      <Router>
        <AppContent />
      </Router>
    </NotificationProvider>
  )
}

export default App
