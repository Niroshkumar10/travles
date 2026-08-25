import { useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { Minus, Plus } from 'lucide-react'

import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { DatePicker } from '@/components/ui/DatePicker'
import { useBookingStore } from '@/features/booking/store/useBookingStore'

function Stepper({ label, value, onChange, min = 0 }) {
  return (
    <div className="flex items-center justify-between rounded-control border border-border px-4 py-3">
      <span className="text-sm font-medium text-text">{label}</span>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          aria-label={`Decrease ${label}`}
          className="flex size-8 items-center justify-center rounded-full border border-border text-text hover:bg-primary-50 disabled:opacity-40"
          disabled={value <= min}
        >
          <Minus className="size-4" />
        </button>
        <span className="w-6 text-center text-sm font-semibold">{value}</span>
        <button
          type="button"
          onClick={() => onChange(value + 1)}
          aria-label={`Increase ${label}`}
          className="flex size-8 items-center justify-center rounded-full border border-border text-text hover:bg-primary-50"
        >
          <Plus className="size-4" />
        </button>
      </div>
    </div>
  )
}

export default function DatesStepPage() {
  const { pkg } = useOutletContext()
  const navigate = useNavigate()
  const dates = useBookingStore((s) => s.dates)
  const setDates = useBookingStore((s) => s.setDates)
  const [error, setError] = useState('')

  function handleContinue() {
    if (!dates.startDate) {
      setError('Please select a departure date to continue.')
      return
    }
    if (dates.adults + dates.children < 1) {
      setError('At least one traveler is required.')
      return
    }
    setError('')
    navigate(`/booking/${pkg.id}/customize`)
  }

  return (
    <Card className="p-6 sm:p-8">
      <h1 className="font-display text-xl font-semibold text-text">Select Dates &amp; Travelers</h1>
      <p className="mt-1 text-sm text-text-muted">
        Booking: <span className="font-medium text-text">{pkg.title}</span>
      </p>

      <div className="mt-6 space-y-5">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-text">Departure Date</label>
          <DatePicker
            value={dates.startDate}
            onChange={(iso) => setDates({ startDate: iso })}
            availableDates={pkg.availableDates}
          />
          {pkg.availableDates?.length > 0 && (
            <p className="mt-1.5 text-xs text-text-subtle">Only dates with confirmed availability are selectable.</p>
          )}
        </div>

        <Stepper label="Adults" value={dates.adults} onChange={(v) => setDates({ adults: v })} min={1} />
        <Stepper label="Children" value={dates.children} onChange={(v) => setDates({ children: v })} min={0} />

        {error && <p className="text-sm text-error">{error}</p>}
      </div>

      <div className="mt-8 flex justify-end">
        <Button onClick={handleContinue}>Continue to Customize</Button>
      </div>
    </Card>
  )
}
