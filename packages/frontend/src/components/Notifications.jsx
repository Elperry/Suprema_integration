import { useState, useEffect, createContext, useContext, useCallback } from 'react'
import './Notifications.css'

// Notification Context
const NotificationContext = createContext(null)

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider')
  }
  return context
}

// Notification Provider Component
export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([])

  const addNotification = useCallback((message, type = 'info', duration = 5000) => {
    const id = Date.now() + Math.random()
    const notification = { id, message, type, duration }
    
    setNotifications(prev => [...prev, notification])

    if (duration > 0) {
      setTimeout(() => {
        removeNotification(id)
      }, duration)
    }

    return id
  }, [])

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }, [])

  const success = useCallback((message, duration = 5000) => {
    return addNotification(message, 'success', duration)
  }, [addNotification])

  const error = useCallback((message, duration = 7000) => {
    return addNotification(message, 'error', duration)
  }, [addNotification])

  const warning = useCallback((message, duration = 5000) => {
    return addNotification(message, 'warning', duration)
  }, [addNotification])

  const info = useCallback((message, duration = 5000) => {
    return addNotification(message, 'info', duration)
  }, [addNotification])

  const value = {
    notifications,
    addNotification,
    removeNotification,
    success,
    error,
    warning,
    info
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <NotificationContainer 
        notifications={notifications} 
        onRemove={removeNotification} 
      />
    </NotificationContext.Provider>
  )
}

// Notification Container
function NotificationContainer({ notifications, onRemove }) {
  return (
    <div className="notification-container">
      {notifications.map(notification => (
        <NotificationItem 
          key={notification.id} 
          notification={notification}
          onRemove={onRemove}
        />
      ))}
    </div>
  )
}

// Individual Notification Item
function NotificationItem({ notification, onRemove }) {
  const [isExiting, setIsExiting] = useState(false)

  const handleRemove = () => {
    setIsExiting(true)
    setTimeout(() => onRemove(notification.id), 300)
  }

  const getIcon = () => {
    switch (notification.type) {
      case 'success': return '✅'
      case 'error': return '❌'
      case 'warning': return '⚠️'
      case 'info': default: return 'ℹ️'
    }
  }

  return (
    <div 
      className={`notification notification-${notification.type} ${isExiting ? 'notification-exit' : ''}`}
      onClick={handleRemove}
    >
      <span className="notification-icon">{getIcon()}</span>
      <span className="notification-message">{notification.message}</span>
      <button className="notification-close" onClick={handleRemove}>×</button>
    </div>
  )
}

export default NotificationProvider
