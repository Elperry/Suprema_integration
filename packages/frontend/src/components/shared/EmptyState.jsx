/**
 * Shared EmptyState component for consistent empty/no-data displays.
 *
 * Usage:
 *   <EmptyState icon="📱" title="No devices configured" message="Add devices from the Devices page." />
 *   <EmptyState icon="🔍" message="Search for employees to get started" compact />
 */
import './EmptyState.css'

export default function EmptyState({ icon, title, message, action, onAction, compact = false, className = '' }) {
  return (
    <div className={`shared-empty-state ${compact ? 'shared-empty-state--compact' : ''} ${className}`.trim()}>
      {icon && <div className="shared-empty-icon">{icon}</div>}
      {title && <h4 className="shared-empty-title">{title}</h4>}
      {message && <p className="shared-empty-message">{message}</p>}
      {action && onAction && (
        <button className="btn btn-primary btn-sm shared-empty-action" onClick={onAction}>
          {action}
        </button>
      )}
    </div>
  )
}
