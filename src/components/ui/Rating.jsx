import { Star } from 'lucide-react'

import { cn } from '@/lib/cn'

export function Rating({ value, reviewCount, size = 'sm', className }) {
  const textSize = size === 'lg' ? 'text-base' : size === 'md' ? 'text-sm' : 'text-xs'
  return (
    <div className={cn('inline-flex items-center gap-1', textSize, className)}>
      <Star className="size-3.5 fill-accent-500 text-accent-500" aria-hidden="true" />
      <span className="font-semibold text-text">{value.toFixed(1)}</span>
      {typeof reviewCount === 'number' && (
        <span className="text-text-muted">({reviewCount.toLocaleString()})</span>
      )}
    </div>
  )
}
