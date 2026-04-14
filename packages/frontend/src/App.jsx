import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import axios from 'axios'
import './App.css'

// Components
import Dashboard from './components/Dashboard'
import Devices from './components/Devices'
import Users from './components/Users'
import DeviceUsers from './components/DeviceUsers'
import CardScanning from './components/CardScanning'
import Events from './components/Events'
import Settings from './components/Settings'
import Debugger from './components/Debugger'
import Enrollment from './components/Enrollment'
import TNA from './components/TNA'
import Employees from './components/Employees'
import GateEvents from './components/GateEvents'
import Doors from './components/Doors'
import CardAssignments from './components/CardAssignments'
import SyncCenter from './components/SyncCenter'
import AuditLog from './components/AuditLog'
import Reports from './components/Reports'
import BulkImport from './components/BulkImport'
import EmployeeDetail from './components/EmployeeDetail'
import SystemHealth from './components/SystemHealth'
import DeviceDetail from './components/DeviceDetail'
import Biometric from './components/Biometric'
import Onboarding from './components/Onboarding'
import AccessMatrix from './components/AccessMatrix'
import NotificationCenter from './components/NotificationCenter'
import Sidebar from './components/Sidebar'
import { NotificationProvider } from './components/Notifications'
import { API_CONFIG, API_ENDPOINTS } from './config/constants'

function AppContent() {
  const [health, setHealth] = useState(null)
  const [loading, setLoading] = useState(true)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768
      setIsMobile(mobile)
      if (!mobile) setMobileOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    checkHealth()
    const interval = setInterval(checkHealth, 30000)
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
      {mobileOpen && <div className="sidebar-overlay visible" onClick={() => setMobileOpen(false)} />}
      <Sidebar
        collapsed={isMobile ? false : sidebarCollapsed}
        onToggle={() => isMobile ? setMobileOpen(o => !o) : setSidebarCollapsed(c => !c)}
        mobileOpen={mobileOpen}
        onNavClick={() => { if (isMobile) setMobileOpen(false) }}
      />
      <div className="app-body">
        <header className="app-header">
          <div className="header-content">
            {isMobile && (
              <button className="hamburger-btn" onClick={() => setMobileOpen(o => !o)}>
                ☰
              </button>
            )}
            <div className="header-status">
              <div className={`status-indicator ${health ? 'connected' : 'disconnected'}`}>
                <span className="dot"></span>
                <span>{health ? 'Connected' : 'Disconnected'}</span>
              </div>
            </div>
          </div>
        </header>

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
              <Route path="/device/:id" element={<DeviceDetail />} />
              <Route path="/enrollment" element={<Enrollment />} />
              <Route path="/biometric" element={<Biometric />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/users" element={<Users />} />
              <Route path="/device-users" element={<DeviceUsers />} />
              <Route path="/scanning" element={<CardScanning />} />
              <Route path="/tna" element={<TNA />} />
              <Route path="/events" element={<Events />} />
              <Route path="/sync-center" element={<SyncCenter />} />
              <Route path="/audit-log" element={<AuditLog />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/bulk-import" element={<BulkImport />} />
              <Route path="/gate-events" element={<GateEvents />} />
              <Route path="/card-assignments" element={<CardAssignments />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="/employee/:id" element={<EmployeeDetail />} />
              <Route path="/doors" element={<Doors />} />
              <Route path="/access-matrix" element={<AccessMatrix />} />
              <Route path="/notifications" element={<NotificationCenter />} />
              <Route path="/debugger" element={<Debugger />} />
              <Route path="/health" element={<SystemHealth />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          )}
        </main>
      </div>
    </div>
  )
}

function App() {
  return (
    <NotificationProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <AppContent />
      </Router>
    </NotificationProvider>
  )
}

export default App
