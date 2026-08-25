import { forwardRef } from 'react'
import { ChevronDown } from 'lucide-react'

import { cn } from '@/lib/cn'

export const Select = forwardRef(function Select({ className, error, children, ...props }, ref) {
  return (
    <div className="relative">
      <select
        ref={ref}
        className={cn(
          'h-11 w-full appearance-none rounded-control border border-border bg-surface px-3.5 pr-9 text-sm text-text',
          'transition-colors focus-visible:border-primary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-100',
          error && 'border-error',
          className,
        )}
        aria-invalid={error ? 'true' : undefined}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-text-subtle" aria-hidden="true" />
    </div>
  )
})
