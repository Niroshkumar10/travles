import { forwardRef } from 'react'

import { cn } from '@/lib/cn'

export const Checkbox = forwardRef(function Checkbox({ className, label, id, ...props }, ref) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-center gap-2.5 text-sm text-text">
      <input
        ref={ref}
        id={id}
        type="checkbox"
        className={cn(
          'size-4.5 shrink-0 rounded border-border text-primary-600 focus-visible:outline-primary-600',
          className,
        )}
        {...props}
      />
      {label}
    </label>
  )
})
