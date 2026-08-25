import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'

import { cn } from '@/lib/cn'

export function Modal({ open, onOpenChange, title, description, children, className }) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-slate-900/50 animate-fade-in" />
        <Dialog.Content
          className={cn(
            'fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2',
            'rounded-card bg-surface p-6 shadow-modal focus:outline-none animate-fade-in',
            'max-h-[85vh] overflow-y-auto',
            className,
          )}
        >
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              {title && <Dialog.Title className="text-lg font-semibold text-text">{title}</Dialog.Title>}
              {description && (
                <Dialog.Description className="mt-1 text-sm text-text-muted">{description}</Dialog.Description>
              )}
            </div>
            <Dialog.Close
              className="rounded-full p-1.5 text-text-muted hover:bg-slate-100 hover:text-text"
              aria-label="Close"
            >
              <X className="size-4" />
            </Dialog.Close>
          </div>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
