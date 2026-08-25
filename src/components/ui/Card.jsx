import { cn } from '@/lib/cn'

export function Card({ className, children, as: Comp = 'div', ...props }) {
  return (
    <Comp
      className={cn('rounded-card border border-border bg-surface shadow-card', className)}
      {...props}
    >
      {children}
    </Comp>
  )
}
