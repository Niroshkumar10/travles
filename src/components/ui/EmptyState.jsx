import { SearchX } from 'lucide-react'

import { Button } from '@/components/ui/Button'

export function EmptyState({
  icon: Icon = SearchX,
  title = 'Nothing found',
  description,
  actionLabel,
  onAction,
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-card border border-dashed border-border px-6 py-16 text-center">
      <Icon className="size-10 text-text-subtle" aria-hidden="true" />
      <h3 className="text-lg font-semibold text-text">{title}</h3>
      {description && <p className="max-w-sm text-sm text-text-muted">{description}</p>}
      {actionLabel && onAction && (
        <Button variant="outline" size="sm" onClick={onAction} className="mt-2">
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
