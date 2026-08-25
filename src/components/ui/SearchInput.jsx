import { Search, X } from 'lucide-react'

import { cn } from '@/lib/cn'

export function SearchInput({ value, onChange, placeholder = 'Search...', className, ...props }) {
  return (
    <div className={cn('relative', className)}>
      <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-text-subtle" aria-hidden="true" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-11 w-full rounded-control border border-border bg-surface pl-10 pr-9 text-sm text-text placeholder:text-text-subtle focus-visible:border-primary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-100"
        {...props}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-text-subtle hover:text-text"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  )
}
