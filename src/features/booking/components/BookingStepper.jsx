import { Check } from 'lucide-react'

import { cn } from '@/lib/cn'

const STEP_LABELS = [
  { key: 'dates', label: 'Dates & Travelers' },
  { key: 'customize', label: 'Customize' },
  { key: 'travelers', label: 'Traveler Details' },
  { key: 'review', label: 'Review' },
  { key: 'payment', label: 'Payment' },
]

export function BookingStepper({ currentStep }) {
  const currentIndex = STEP_LABELS.findIndex((s) => s.key === currentStep)

  return (
    <ol className="flex items-center gap-1 overflow-x-auto pb-1 sm:gap-2" aria-label="Booking progress">
      {STEP_LABELS.map((step, i) => {
        const isDone = i < currentIndex
        const isCurrent = i === currentIndex
        return (
          <li key={step.key} className="flex shrink-0 items-center gap-1 sm:gap-2">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  'flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold',
                  isDone && 'bg-primary-600 text-white',
                  isCurrent && 'bg-primary-100 text-primary-700 ring-2 ring-primary-600',
                  !isDone && !isCurrent && 'bg-slate-100 text-text-subtle',
                )}
                aria-current={isCurrent ? 'step' : undefined}
              >
                {isDone ? <Check className="size-3.5" /> : i + 1}
              </span>
              <span className={cn('hidden text-sm font-medium sm:inline', isCurrent ? 'text-text' : 'text-text-muted')}>
                {step.label}
              </span>
            </div>
            {i < STEP_LABELS.length - 1 && <div className="h-px w-4 bg-border sm:w-8" />}
          </li>
        )
      })}
    </ol>
  )
}
