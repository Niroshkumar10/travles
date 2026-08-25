import { useState } from 'react'
import * as Popover from '@radix-ui/react-popover'
import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react'

import { cn } from '@/lib/cn'

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

function toDateOnly(d) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

function formatIso(d) {
  return d.toISOString().slice(0, 10)
}

function formatDisplay(iso) {
  if (!iso) return ''
  return new Date(iso + 'T00:00:00').toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

/**
 * @param {{ value: string | null, onChange: (iso: string) => void, minDate?: Date,
 *   availableDates?: string[], placeholder?: string }} props
 */
export function DatePicker({ value, onChange, minDate, availableDates, placeholder = 'Select date' }) {
  const [open, setOpen] = useState(false)
  const [viewMonth, setViewMonth] = useState(() => (value ? new Date(value + 'T00:00:00') : new Date()))

  const availableSet = availableDates ? new Set(availableDates) : null
  const min = minDate ? toDateOnly(minDate) : toDateOnly(new Date())

  const year = viewMonth.getFullYear()
  const month = viewMonth.getMonth()
  const firstDay = new Date(year, month, 1)
  const startOffset = firstDay.getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const cells = []
  for (let i = 0; i < startOffset; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d))

  function selectDay(date) {
    onChange(formatIso(date))
    setOpen(false)
  }

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button
          type="button"
          className="flex h-11 w-full items-center gap-2.5 rounded-control border border-border bg-surface px-3.5 text-left text-sm text-text focus-visible:border-primary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-100"
        >
          <CalendarDays className="size-4 text-text-subtle" aria-hidden="true" />
          <span className={cn(!value && 'text-text-subtle')}>{value ? formatDisplay(value) : placeholder}</span>
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          sideOffset={8}
          className="z-50 w-72 rounded-card border border-border bg-surface p-4 shadow-dropdown animate-fade-in"
        >
          <div className="mb-3 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setViewMonth(new Date(year, month - 1, 1))}
              aria-label="Previous month"
              className="rounded-control p-1.5 hover:bg-primary-50"
            >
              <ChevronLeft className="size-4" />
            </button>
            <span className="text-sm font-semibold text-text">
              {viewMonth.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
            </span>
            <button
              type="button"
              onClick={() => setViewMonth(new Date(year, month + 1, 1))}
              aria-label="Next month"
              className="rounded-control p-1.5 hover:bg-primary-50"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-xs text-text-subtle">
            {WEEKDAYS.map((w, i) => (
              <div key={i} className="py-1">{w}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {cells.map((date, i) => {
              if (!date) return <div key={i} />
              const iso = formatIso(date)
              const isPast = toDateOnly(date) < min
              const isAvailable = !availableSet || availableSet.has(iso)
              const disabled = isPast || !isAvailable
              const isSelected = value === iso
              return (
                <button
                  key={i}
                  type="button"
                  disabled={disabled}
                  onClick={() => selectDay(date)}
                  className={cn(
                    'aspect-square rounded-control text-sm',
                    disabled && 'cursor-not-allowed text-text-subtle/50',
                    !disabled && !isSelected && 'text-text hover:bg-primary-50',
                    isSelected && 'bg-primary-600 font-semibold text-white',
                  )}
                >
                  {date.getDate()}
                </button>
              )
            })}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
