export function Separator({ className = "" }) {
  return (
    <div
      role="separator"
      className={`shrink-0 bg-slate-200 dark:bg-slate-700 ${className}`}
    />
  )
}
