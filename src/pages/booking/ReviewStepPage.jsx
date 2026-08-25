import { useEffect } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'

import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { useBookingStore } from '@/features/booking/store/useBookingStore'
import { calculateBookingPricing, formatCurrency } from '@/lib/pricing'

export default function ReviewStepPage() {
  const { pkg } = useOutletContext()
  const navigate = useNavigate()
  const dates = useBookingStore((s) => s.dates)
  const customize = useBookingStore((s) => s.customize)
  const travelers = useBookingStore((s) => s.travelers)
  const contactInfo = useBookingStore((s) => s.contactInfo)
  const pricing = useBookingStore((s) => s.pricing)
  const setPricing = useBookingStore((s) => s.setPricing)

  const travelerCount = dates.adults + dates.children
  const selectedAddOns = (pkg.addOns ?? []).filter((a) => customize.selectedAddOnIds.includes(a.id))

  useEffect(() => {
    const breakdown = calculateBookingPricing({ pkg, travelerCount, selectedAddOnIds: customize.selectedAddOnIds })
    setPricing(breakdown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pkg.id, travelerCount, customize.selectedAddOnIds.join(',')])

  return (
    <Card className="p-6 sm:p-8">
      <h1 className="font-display text-xl font-semibold text-text">Review Your Booking</h1>

      <div className="mt-6 space-y-5 divide-y divide-border">
        <div className="pb-5">
          <h2 className="text-sm font-semibold text-text-muted">Package</h2>
          <p className="mt-1 font-medium text-text">{pkg.title}</p>
          <p className="text-sm text-text-muted">
            {pkg.durationDays} Days / {pkg.durationNights} Nights
          </p>
        </div>

        <div className="py-5">
          <h2 className="text-sm font-semibold text-text-muted">Dates &amp; Travelers</h2>
          <p className="mt-1 text-sm text-text">
            Departure: {new Date(dates.startDate + 'T00:00:00').toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
          <p className="text-sm text-text">
            {dates.adults} Adult(s){dates.children > 0 ? `, ${dates.children} Children` : ''}
          </p>
        </div>

        {selectedAddOns.length > 0 && (
          <div className="py-5">
            <h2 className="text-sm font-semibold text-text-muted">Add-ons</h2>
            <ul className="mt-1 space-y-1 text-sm text-text">
              {selectedAddOns.map((a) => (
                <li key={a.id} className="flex justify-between">
                  <span>{a.name}</span>
                  <span>{formatCurrency(a.price)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="py-5">
          <h2 className="text-sm font-semibold text-text-muted">Travelers</h2>
          <ul className="mt-1 space-y-1 text-sm text-text">
            {travelers.map((t) => (
              <li key={t.id}>
                {t.firstName} {t.lastName} ({t.age}){t.isPrimary ? ' — Primary' : ''}
              </li>
            ))}
          </ul>
          <p className="mt-2 text-sm text-text-muted">
            {contactInfo?.email} &middot; {contactInfo?.phone}
          </p>
        </div>

        {pricing && (
          <div className="pt-5">
            <h2 className="text-sm font-semibold text-text-muted">Price Breakdown</h2>
            <div className="mt-2 space-y-1.5 text-sm">
              <div className="flex justify-between text-text-muted">
                <span>Base Package</span>
                <span>{formatCurrency(pricing.base)}</span>
              </div>
              {pricing.addOns > 0 && (
                <div className="flex justify-between text-text-muted">
                  <span>Add-ons</span>
                  <span>{formatCurrency(pricing.addOns)}</span>
                </div>
              )}
              {pricing.discount > 0 && (
                <div className="flex justify-between text-secondary-700">
                  <span>Discount</span>
                  <span>-{formatCurrency(pricing.discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-text-muted">
                <span>Taxes &amp; Fees</span>
                <span>{formatCurrency(pricing.taxes)}</span>
              </div>
              <div className="flex justify-between border-t border-border pt-2 text-base font-semibold text-text">
                <span>Total</span>
                <span>{formatCurrency(pricing.total)}</span>
              </div>
            </div>
          </div>
        )}

        <p className="pt-5 text-xs text-text-subtle">{pkg.cancellationPolicy}</p>
      </div>

      <div className="mt-8 flex justify-between">
        <Button variant="outline" onClick={() => navigate(`/booking/${pkg.id}/travelers`)}>
          Back
        </Button>
        <Button onClick={() => navigate(`/booking/${pkg.id}/payment`)}>Continue to Payment</Button>
      </div>
    </Card>
  )
}
