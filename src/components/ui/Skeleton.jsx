import { cn } from '@/lib/cn'

export function Skeleton({ className }) {
  return <div className={cn('animate-pulse rounded-control bg-slate-200', className)} aria-hidden="true" />
}

export function DestinationCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-card border border-border bg-surface">
      <Skeleton className="h-48 w-full rounded-none" />
      <div className="space-y-2 p-4">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-3 w-1/3" />
      </div>
    </div>
  )
}

export function CardGridSkeleton({ count = 6, CardSkeleton = DestinationCardSkeleton }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  )
}
