import { useNavigate, useOutletContext } from 'react-router-dom'

import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Checkbox } from '@/components/ui/Checkbox'
import { useBookingStore } from '@/features/booking/store/useBookingStore'
import { formatCurrency } from '@/lib/pricing'

export default function CustomizeStepPage() {
  const { pkg } = useOutletContext()
  const navigate = useNavigate()
  const customize = useBookingStore((s) => s.customize)
  const setCustomize = useBookingStore((s) => s.setCustomize)
  const dates = useBookingStore((s) => s.dates)

  const travelerCount = dates.adults + dates.children
  const basePrice = (pkg.discountPrice ?? pkg.price) * travelerCount
  const addOnsTotal = (pkg.addOns ?? [])
    .filter((a) => customize.selectedAddOnIds.includes(a.id))
    .reduce((sum, a) => sum + a.price, 0)

  function toggleAddOn(id) {
    const selected = customize.selectedAddOnIds.includes(id)
      ? customize.selectedAddOnIds.filter((a) => a !== id)
      : [...customize.selectedAddOnIds, id]
    setCustomize({ selectedAddOnIds: selected })
  }

  return (
    <Card className="p-6 sm:p-8">
      <h1 className="font-display text-xl font-semibold text-text">Customize Your Trip</h1>
      <p className="mt-1 text-sm text-text-muted">Add optional extras to personalize your booking.</p>

      <div className="mt-6 space-y-3">
        {(pkg.addOns ?? []).map((addOn) => (
          <label
            key={addOn.id}
            className="flex cursor-pointer items-start justify-between gap-4 rounded-control border border-border px-4 py-3.5 hover:border-primary-300"
          >
            <div className="flex items-start gap-3">
              <Checkbox
                checked={customize.selectedAddOnIds.includes(addOn.id)}
                onChange={() => toggleAddOn(addOn.id)}
              />
              <div>
                <p className="text-sm font-medium text-text">{addOn.name}</p>
                {addOn.description && <p className="text-xs text-text-muted">{addOn.description}</p>}
              </div>
            </div>
            <span className="shrink-0 text-sm font-semibold text-primary-700">{formatCurrency(addOn.price)}</span>
          </label>
        ))}
      </div>

      <div className="mt-6 rounded-control bg-slate-50 p-4">
        <div className="flex justify-between text-sm text-text-muted">
          <span>Base Package</span>
          <span>{formatCurrency(basePrice)}</span>
        </div>
        <div className="flex justify-between text-sm text-text-muted">
          <span>Add-ons</span>
          <span>{formatCurrency(addOnsTotal)}</span>
        </div>
        <div className="mt-2 flex justify-between border-t border-border pt-2 text-sm font-semibold text-text">
          <span>Subtotal (before taxes)</span>
          <span>{formatCurrency(basePrice + addOnsTotal)}</span>
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <Button variant="outline" onClick={() => navigate(`/booking/${pkg.id}/dates`)}>
          Back
        </Button>
        <Button onClick={() => navigate(`/booking/${pkg.id}/travelers`)}>Continue to Traveler Details</Button>
      </div>
    </Card>
  )
}
