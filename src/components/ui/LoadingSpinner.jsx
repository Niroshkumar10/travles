import { Loader2 } from 'lucide-react'

import { cn } from '@/lib/cn'

export function LoadingSpinner({ className, size = 24, label = 'Loading' }) {
  return (
    <div role="status" className="inline-flex items-center gap-2">
      <Loader2 className={cn('animate-spin text-primary-600', className)} size={size} aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </div>
  )
}

export function PageSpinner() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <LoadingSpinner size={32} />
    </div>
  )
}
