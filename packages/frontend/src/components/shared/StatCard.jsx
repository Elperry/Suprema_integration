/**
 * Shared StatCard component for consistent stat display across pages.
 * 
 * Usage:
 *   <StatCard value={42} label="Active Cards" icon="🎫" />
 *   <StatCard value={3} label="Offline" variant="danger" />
 * 
 * Container usage:
 *   <StatsRow>
 *     <StatCard ... />
 *     <StatCard ... />
 *   </StatsRow>
 */
import './StatCard.css'

const VARIANT_CLASSES = {
  default: '',
  success: 'stat-card--success',
  danger: 'stat-card--danger',
  warning: 'stat-card--warning',
  info: 'stat-card--info',
}

export function StatCard({ value, label, icon, variant = 'default', className = '' }) {
  const variantClass = VARIANT_CLASSES[variant] || ''
  return (
    <div className={`shared-stat-card ${variantClass} ${className}`.trim()}>
      {icon && <div className="shared-stat-icon">{icon}</div>}
      <div className="shared-stat-content">
        <div className="shared-stat-value">{value ?? '—'}</div>
        <div className="shared-stat-label">{label}</div>
      </div>
    </div>
  )
}

export function StatsRow({ children, className = '' }) {
  return (
    <div className={`shared-stats-row ${className}`.trim()}>
      {children}
    </div>
  )
}

export default StatCard
