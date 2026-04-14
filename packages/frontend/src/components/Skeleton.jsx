import './Skeleton.css'

export function SkeletonRow({ cols = 6 }) {
  return (
    <tr className="skeleton-row">
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i}><div className="skeleton-line" /></td>
      ))}
    </tr>
  )
}

export function SkeletonTable({ rows = 5, cols = 6 }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <SkeletonRow key={i} cols={cols} />
      ))}
    </>
  )
}

export function SkeletonCard({ height = 100 }) {
  return <div className="skeleton-card" style={{ height }} />
}

export function SkeletonCards({ count = 4, height = 100 }) {
  return (
    <div className="skeleton-cards">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} height={height} />
      ))}
    </div>
  )
}

export function SkeletonText({ lines = 3, width }) {
  return (
    <div className="skeleton-text-block">
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="skeleton-line" style={{ width: width || (i === lines - 1 ? '60%' : '100%') }} />
      ))}
    </div>
  )
}
