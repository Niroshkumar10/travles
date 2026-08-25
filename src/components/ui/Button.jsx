import { forwardRef } from 'react'
import { Loader2 } from 'lucide-react'

import { cn } from '@/lib/cn'

const variants = {
  primary: 'bg-primary-600 text-white hover:bg-primary-700 focus-visible:outline-primary-600',
  secondary: 'bg-secondary-600 text-white hover:bg-secondary-700 focus-visible:outline-secondary-600',
  outline: 'border border-border bg-surface text-text hover:bg-primary-50 hover:border-primary-300',
  ghost: 'text-text hover:bg-primary-50',
  accent: 'bg-accent-500 text-white hover:bg-accent-600',
  danger: 'bg-error text-white hover:opacity-90',
}

const sizes = {
  sm: 'h-9 px-3 text-sm gap-1.5',
  md: 'h-11 px-5 text-sm gap-2',
  lg: 'h-13 px-7 text-base gap-2',
}

export const Button = forwardRef(function Button(
  { className, variant = 'primary', size = 'md', loading = false, disabled, children, type = 'button', ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center rounded-control font-medium transition-colors',
        'disabled:pointer-events-none disabled:opacity-50',
        variants[variant],
        sizes[size],
        className,
      )}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading && <Loader2 className="size-4 animate-spin" aria-hidden="true" />}
      {children}
    </button>
  )
})
