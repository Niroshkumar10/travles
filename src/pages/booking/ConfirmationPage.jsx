import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CheckCircle2, MapPin } from 'lucide-react'

import { Seo } from '@/components/common/Seo'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { ErrorState } from '@/components/ui/ErrorState'
import { PageSpinner } from '@/components/ui/LoadingSpinner'
import { ROUTES } from '@/constants/routes'
import { useBooking } from '@/features/booking/api/useBookings'
import { useBookingStore } from '@/features/booking/store/useBookingStore'
import { toast } from '@/lib/toastStore'
import { packagesById } from '@/data/packages'
import { formatCurrency } from '@/lib/pricing'

export default function ConfirmationPage() {
  const { bookingId } = useParams()
  const { data: booking, isLoading, isError, refetch } = useBooking(bookingId)
  const resetBooking = useBookingStore((s) => s.resetBooking)

  useEffect(() => {
    return () => resetBooking()
  }, [resetBooking])

  if (isLoading) return <PageSpinner />
  if (isError || !booking) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16">
        <ErrorState title="Booking not found" onRetry={refetch} />
      </div>
    )
  }

  const pkg = packagesById[booking.packageId]

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <Seo title="Booking Confirmed" />
      <div className="text-center">
        <CheckCircle2 className="mx-auto size-14 text-secondary-600" />
        <h1 className="mt-4 font-display text-2xl font-bold text-text">Booking Confirmed!</h1>
        <p className="mt-1 text-sm text-text-muted">Booking ID: <span className="font-mono font-medium text-text">{booking.id}</span></p>
      </div>

      <Card className="mt-8 p-6 sm:p-8">
        <div className="flex items-center gap-2">
          <MapPin className="size-4 text-primary-600" />
          <h2 className="font-display text-lg font-semibold text-text">{pkg?.title ?? 'Your Trip'}</h2>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
          <div>
            <p className="text-text-subtle">Dates</p>
            <p className="font-medium text-text">
              {new Date(booking.startDate + 'T00:00:00').toLocaleDateString(undefined, { day: 'numeric', month: 'short' })} &ndash;{' '}
              {new Date(booking.endDate + 'T00:00:00').toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
            </p>
          </div>
          <div>
            <p className="text-text-subtle">Travelers</p>
            <p className="font-medium text-text">{booking.travelers.length}</p>
          </div>
          <div>
            <p className="text-text-subtle">Total Paid</p>
            <p className="font-medium text-text">{formatCurrency(booking.pricing.total)}</p>
          </div>
          <div>
            <p className="text-text-subtle">Payment Method</p>
            <p className="font-medium uppercase text-text">{booking.payment.method}</p>
          </div>
        </div>
      </Card>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to={ROUTES.myTrips}>
          <Button>View My Trip</Button>
        </Link>
        <Button
          variant="outline"
          onClick={() => toast({ variant: 'info', title: 'Download started', description: 'Your booking summary is a demo action in v1.' })}
        >
          Download Booking Details
        </Button>
        <Link to={ROUTES.support}>
          <Button variant="outline">Contact Support</Button>
        </Link>
        <Button
          variant="ghost"
          onClick={() => {
            if (navigator.share) {
              navigator.share({ title: 'My upcoming trip', text: `I just booked ${pkg?.title ?? 'a trip'} with Wayfarer!` }).catch(() => {})
            } else {
              toast({ variant: 'info', title: 'Trip link copied', description: 'Share it with your travel companions.' })
            }
          }}
        >
          Share Trip
        </Button>
      </div>
    </div>
  )
}
