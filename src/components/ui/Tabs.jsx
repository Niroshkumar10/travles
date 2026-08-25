import * as TabsPrimitive from '@radix-ui/react-tabs'

import { cn } from '@/lib/cn'

// eslint-disable-next-line react-refresh/only-export-components -- re-exported Radix primitive, not a local component
export const Tabs = TabsPrimitive.Root

export function TabsList({ className, ...props }) {
  return (
    <TabsPrimitive.List
      className={cn('inline-flex items-center gap-1 rounded-control bg-slate-100 p-1', className)}
      {...props}
    />
  )
}

export function TabsTrigger({ className, ...props }) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        'rounded-[calc(var(--radius-control)-0.25rem)] px-4 py-2 text-sm font-medium text-text-muted transition-colors',
        'data-[state=active]:bg-surface data-[state=active]:text-primary-700 data-[state=active]:shadow-sm',
        'focus-visible:outline-primary-600',
        className,
      )}
      {...props}
    />
  )
}

export function TabsContent({ className, ...props }) {
  return <TabsPrimitive.Content className={cn('mt-4', className)} {...props} />
}
