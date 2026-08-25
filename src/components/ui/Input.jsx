import { forwardRef } from 'react'

import { cn } from '@/lib/cn'

export const Input = forwardRef(function Input({ className, error, ...props }, ref) {
  return (
    <input
      ref={ref}
      className={cn(
        'h-11 w-full rounded-control border border-border bg-surface px-3.5 text-sm text-text placeholder:text-text-subtle',
        'transition-colors focus-visible:border-primary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-100',
        error && 'border-error focus-visible:border-error focus-visible:ring-red-100',
        props.disabled && 'cursor-not-allowed opacity-60',
        className,
      )}
      aria-invalid={error ? 'true' : undefined}
      {...props}
    />
  )
})
