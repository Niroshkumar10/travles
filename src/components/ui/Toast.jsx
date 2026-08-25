import * as ToastPrimitive from '@radix-ui/react-toast'
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react'

import { useToastStore } from '@/lib/toastStore'
import { cn } from '@/lib/cn'

const icons = {
  success: <CheckCircle2 className="size-5 text-success" aria-hidden="true" />,
  error: <AlertCircle className="size-5 text-error" aria-hidden="true" />,
  info: <Info className="size-5 text-primary-600" aria-hidden="true" />,
}

export function Toaster() {
  const { toasts, remove } = useToastStore()

  return (
    <ToastPrimitive.Provider swipeDirection="right" duration={4500}>
      {toasts.map((t) => (
        <ToastPrimitive.Root
          key={t.id}
          onOpenChange={(open) => !open && remove(t.id)}
          className={cn(
            'flex items-start gap-3 rounded-card border border-border bg-surface p-4 shadow-modal',
            'data-[state=open]:animate-fade-in',
          )}
        >
          {icons[t.variant]}
          <div className="flex-1">
            {t.title && <ToastPrimitive.Title className="text-sm font-semibold text-text">{t.title}</ToastPrimitive.Title>}
            {t.description && (
              <ToastPrimitive.Description className="mt-0.5 text-sm text-text-muted">
                {t.description}
              </ToastPrimitive.Description>
            )}
          </div>
          <ToastPrimitive.Close aria-label="Dismiss" className="text-text-subtle hover:text-text">
            <X className="size-4" />
          </ToastPrimitive.Close>
        </ToastPrimitive.Root>
      ))}
      <ToastPrimitive.Viewport className="fixed bottom-0 right-0 z-[100] flex w-full max-w-sm flex-col gap-2 p-4 outline-none" />
    </ToastPrimitive.Provider>
  )
}
