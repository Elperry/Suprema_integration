import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Sidebar.css'

const NAV_GROUPS = [
  {
    id: 'operations',
    label: 'Operations',
    icon: '📊',
    items: [
      { to: '/', icon: '📊', label: 'Dashboard' },
      { to: '/employees', icon: '👤', label: 'Employees' },
      { to: '/users', icon: '👥', label: 'Users & Cards' },
      { to: '/onboarding', icon: '🚀', label: 'Onboarding' },
    ]
  },
  {
    id: 'devices',
    label: 'Devices',
    icon: '🖥️',
    items: [
      { to: '/devices', icon: '🖥️', label: 'Devices & Locations' },
      { to: '/device-users', icon: '📟', label: 'Device Users' },
      { to: '/enrollment', icon: '🎫', label: 'Card Enrollment' },
      { to: '/biometric', icon: '🧬', label: 'Biometrics' },
      { to: '/scanning', icon: '🔍', label: 'Card Scanning' },
    ]
  },
  {
    id: 'access',
    label: 'Access Control',
    icon: '🚪',
    items: [
      { to: '/doors', icon: '🔓', label: 'Doors & Schedules' },
      { to: '/access-matrix', icon: '🔐', label: 'Access Matrix' },
      { to: '/card-assignments', icon: '💳', label: 'Card Assignments' },
      { to: '/tna', icon: '⏰', label: 'Time & Attendance' },
    ]
  },
  {
    id: 'reports',
    label: 'Reports & Audit',
    icon: '📈',
    items: [
      { to: '/events', icon: '📋', label: 'Events' },
      { to: '/gate-events', icon: '🚪', label: 'Gate Events' },
      { to: '/sync-center', icon: '♻️', label: 'Sync Center' },
      { to: '/reports', icon: '📊', label: 'Reports' },
      { to: '/audit-log', icon: '📝', label: 'Audit Log' },
      { to: '/notifications', icon: '🔔', label: 'Notifications' },
    ]
  },
  {
    id: 'system',
    label: 'System',
    icon: '⚙️',
    items: [
      { to: '/health', icon: '🏥', label: 'System Health' },
      { to: '/bulk-import', icon: '📥', label: 'Bulk Import' },
      { to: '/debugger', icon: '🔧', label: 'Debugger' },
      { to: '/settings', icon: '⚙️', label: 'Settings' },
    ]
  },
]

export default function Sidebar({ collapsed, onToggle, mobileOpen, onNavClick }) {
  const location = useLocation()
  const [expandedGroups, setExpandedGroups] = useState(() => {
    // Start with all groups expanded
    return NAV_GROUPS.reduce((acc, g) => ({ ...acc, [g.id]: true }), {})
  })

  const toggleGroup = (groupId) => {
    if (collapsed) return
    setExpandedGroups(prev => ({ ...prev, [groupId]: !prev[groupId] }))
  }

  const isActive = (to) => {
    if (to === '/') return location.pathname === '/'
    return location.pathname.startsWith(to)
  }

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-brand">
          <span className="sidebar-logo">🔐</span>
          {!collapsed && <span className="sidebar-title">Suprema HR</span>}
        </div>
        <button className="sidebar-toggle" onClick={onToggle} title={collapsed ? 'Expand' : 'Collapse'}>
          {collapsed ? '▶' : '◀'}
        </button>
      </div>

      <nav className="sidebar-nav">
        {NAV_GROUPS.map(group => (
          <div key={group.id} className="nav-group">
            <button
              className={`nav-group-header ${expandedGroups[group.id] ? 'expanded' : ''}`}
              onClick={() => toggleGroup(group.id)}
              title={collapsed ? group.label : undefined}
            >
              <span className="nav-group-icon">{group.icon}</span>
              {!collapsed && (
                <>
                  <span className="nav-group-label">{group.label}</span>
                  <span className="nav-group-chevron">{expandedGroups[group.id] ? '▾' : '▸'}</span>
                </>
              )}
            </button>

            {(expandedGroups[group.id] || collapsed) && (
              <div className="nav-group-items">
                {group.items.map(item => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`sidebar-link ${isActive(item.to) ? 'active' : ''}`}
                    title={collapsed ? item.label : undefined}
                    onClick={onNavClick}
                  >
                    <span className="sidebar-link-icon">{item.icon}</span>
                    {!collapsed && <span className="sidebar-link-label">{item.label}</span>}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  )
}
