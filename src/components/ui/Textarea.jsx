import { forwardRef } from 'react'

import { cn } from '@/lib/cn'

export const Textarea = forwardRef(function Textarea({ className, error, rows = 4, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      rows={rows}
      className={cn(
        'w-full rounded-control border border-border bg-surface px-3.5 py-2.5 text-sm text-text placeholder:text-text-subtle',
        'transition-colors focus-visible:border-primary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-100',
        error && 'border-error focus-visible:border-error focus-visible:ring-red-100',
        className,
      )}
      aria-invalid={error ? 'true' : undefined}
      {...props}
    />
  )
})
