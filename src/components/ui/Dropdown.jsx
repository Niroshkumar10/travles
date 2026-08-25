import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import { cn } from '@/lib/cn'

// eslint-disable-next-line react-refresh/only-export-components -- re-exported Radix primitives, not local components
export const Dropdown = DropdownMenu.Root
// eslint-disable-next-line react-refresh/only-export-components
export const DropdownTrigger = DropdownMenu.Trigger

export function DropdownContent({ className, align = 'end', children, ...props }) {
  return (
    <DropdownMenu.Portal>
      <DropdownMenu.Content
        align={align}
        sideOffset={8}
        className={cn(
          'z-50 min-w-[10rem] rounded-control border border-border bg-surface p-1.5 shadow-dropdown',
          'data-[state=open]:animate-fade-in',
          className,
        )}
        {...props}
      >
        {children}
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  )
}

export function DropdownItem({ className, children, ...props }) {
  return (
    <DropdownMenu.Item
      className={cn(
        'cursor-pointer rounded-[calc(var(--radius-control)-0.25rem)] px-3 py-2 text-sm text-text outline-none',
        'data-[highlighted]:bg-primary-50 data-[highlighted]:text-primary-700',
        className,
      )}
      {...props}
    >
      {children}
    </DropdownMenu.Item>
  )
}
