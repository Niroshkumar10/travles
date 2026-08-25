import { useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { Lock, ShieldCheck, Smartphone, CreditCard, Landmark, Wallet } from 'lucide-react'

import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { PAYMENT_METHODS } from '@/constants/filters'
import { useCreateBooking } from '@/features/booking/api/useBookings'
import { useBookingStore } from '@/features/booking/store/useBookingStore'
import { cn } from '@/lib/cn'
import { formatCurrency } from '@/lib/pricing'
import { useAuthStore } from '@/stores/useAuthStore'

const METHOD_ICONS = { upi: Smartphone, card: CreditCard, netbanking: Landmark, wallet: Wallet }

export default function PaymentStepPage() {
  const { pkg } = useOutletContext()
  const navigate = useNavigate()
  const userId = useAuthStore((s) => s.session?.user?.id)
  const dates = useBookingStore((s) => s.dates)
  const customize = useBookingStore((s) => s.customize)
  const travelers = useBookingStore((s) => s.travelers)
  const contactInfo = useBookingStore((s) => s.contactInfo)
  const pricing = useBookingStore((s) => s.pricing)
  const payment = useBookingStore((s) => s.payment)
  const setPaymentMethod = useBookingStore((s) => s.setPaymentMethod)
  const setPaymentStatus = useBookingStore((s) => s.setPaymentStatus)
  const setBookingId = useBookingStore((s) => s.setBookingId)
  const createBookingMutation = useCreateBooking()
  const [submitting, setSubmitting] = useState(false)

  async function handlePay() {
    if (!payment.method) return
    setSubmitting(true)
    setPaymentStatus('processing')

    // Simulated payment processing for this demo — no real gateway is called.
    await new Promise((resolve) => setTimeout(resolve, 1500 + Math.random() * 800))

    if (useBookingStore.getState().payment.status === 'cancelled') {
      setSubmitting(false)
      return
    }

    const succeeded = Math.random() > 0.12

    if (!succeeded) {
      setPaymentStatus('failed')
      setSubmitting(false)
      return
    }

    setPaymentStatus('success')

    const endDate = new Date(dates.startDate)
    endDate.setDate(endDate.getDate() + pkg.durationDays)

    try {
      const booking = await createBookingMutation.mutateAsync({
        userId,
        packageId: pkg.id,
        startDate: dates.startDate,
        endDate: endDate.toISOString().slice(0, 10),
        travelers,
        selectedAddOnIds: customize.selectedAddOnIds,
        contactInfo,
        pricing,
        payment: {
          method: payment.method,
          status: 'success',
          transactionId: `TXN-${Date.now()}`,
          paidAt: new Date().toISOString(),
        },
      })
      setBookingId(booking.id)
      navigate(`/booking/confirmation/${booking.id}`)
    } finally {
      setSubmitting(false)
    }
  }

  function handleCancelPayment() {
    setPaymentStatus('cancelled')
  }

  return (
    <Card className="p-6 sm:p-8">
      <div className="flex items-center gap-2">
        <Lock className="size-4 text-secondary-600" />
        <h1 className="font-display text-xl font-semibold text-text">Secure Payment</h1>
      </div>
      <p className="mt-1 text-sm text-text-muted">
        This is a demo checkout — no real payment gateway is connected and no money will be charged.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {PAYMENT_METHODS.map((method) => {
          const Icon = METHOD_ICONS[method.value]
          const selected = payment.method === method.value
          return (
            <button
              key={method.value}
              type="button"
              onClick={() => setPaymentMethod(method.value)}
              className={cn(
                'flex flex-col items-center gap-2 rounded-control border px-3 py-4 text-center text-sm font-medium',
                selected ? 'border-primary-600 bg-primary-50 text-primary-700' : 'border-border text-text-muted hover:border-primary-300',
              )}
            >
              <Icon className="size-5" />
              {method.label}
            </button>
          )
        })}
      </div>

      {payment.status === 'failed' && (
        <p className="mt-4 rounded-control bg-red-50 px-4 py-3 text-sm text-error">
          Payment failed. No amount was charged. Please try again.
        </p>
      )}
      {payment.status === 'cancelled' && (
        <p className="mt-4 rounded-control bg-slate-100 px-4 py-3 text-sm text-text-muted">
          Payment was cancelled. You can retry whenever you're ready.
        </p>
      )}

      <div className="mt-6 flex items-center justify-between rounded-control bg-slate-50 px-4 py-3.5">
        <span className="flex items-center gap-2 text-sm text-text-muted">
          <ShieldCheck className="size-4 text-secondary-600" /> Total Amount
        </span>
        <span className="text-lg font-semibold text-text">{pricing ? formatCurrency(pricing.total) : '—'}</span>
      </div>

      <div className="mt-8 flex flex-wrap justify-between gap-3">
        <Button variant="outline" onClick={() => navigate(`/booking/${pkg.id}/review`)} disabled={submitting}>
          Back
        </Button>
        <div className="flex gap-3">
          {payment.status === 'processing' && (
            <Button variant="ghost" onClick={handleCancelPayment}>
              Cancel Payment
            </Button>
          )}
          <Button onClick={handlePay} loading={submitting} disabled={!payment.method}>
            {submitting ? 'Processing…' : `Pay ${pricing ? formatCurrency(pricing.total) : ''}`}
          </Button>
        </div>
      </div>
    </Card>
  )
}
