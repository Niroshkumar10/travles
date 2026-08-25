import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CalendarDays, MapPin } from 'lucide-react'

import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import { LazyImage } from '@/components/common/LazyImage'
import { ROUTES } from '@/constants/routes'
import { packagesById } from '@/data/packages'
import { destinationsById } from '@/data/destinations'
import { useCancelBooking } from '@/features/booking/api/useBookings'
import { formatCurrency } from '@/lib/pricing'
import { toast } from '@/lib/toastStore'

const STATUS_VARIANTS = { confirmed: 'default', completed: 'success', cancelled: 'neutral', pending: 'accent' }

function formatDateRange(start, end) {
  const opts = { day: 'numeric', month: 'short' }
  return `${new Date(start + 'T00:00:00').toLocaleDateString(undefined, opts)} – ${new Date(end + 'T00:00:00').toLocaleDateString(undefined, { ...opts, year: 'numeric' })}`
}

export function TripCard({ booking, userId }) {
  const pkg = packagesById[booking.packageId]
  const destination = pkg ? destinationsById[pkg.destinationId] : null
  const cancelBookingMutation = useCancelBooking(userId)
  const [confirmOpen, setConfirmOpen] = useState(false)

  async function handleCancel() {
    try {
      await cancelBookingMutation.mutateAsync(booking.id)
      toast({ variant: 'success', title: 'Booking cancelled' })
    } catch {
      toast({ variant: 'error', title: 'Could not cancel booking' })
    } finally {
      setConfirmOpen(false)
    }
  }

  return (
    <Card className="overflow-hidden sm:flex">
      {pkg?.images?.[0] && (
        <div className="h-40 sm:h-auto sm:w-56 sm:shrink-0">
          <LazyImage src={pkg.images[0]} alt={pkg.title} className="h-full w-full" />
        </div>
      )}
      <div className="flex-1 p-5">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <p className="flex items-center gap-1.5 text-sm text-text-muted">
              <MapPin className="size-3.5" /> {destination?.name ?? 'Trip'}
            </p>
            <h3 className="mt-0.5 font-display text-lg font-semibold text-text">{pkg?.title ?? 'Booking'}</h3>
          </div>
          <Badge variant={STATUS_VARIANTS[booking.status] ?? 'neutral'} className="capitalize">
            {booking.status}
          </Badge>
        </div>

        <p className="mt-2 flex items-center gap-1.5 text-sm text-text-muted">
          <CalendarDays className="size-3.5" /> {formatDateRange(booking.startDate, booking.endDate)}
        </p>
        <p className="mt-1 text-sm text-text-muted">
          {booking.travelers.length} traveler(s) &middot; {formatCurrency(booking.pricing.total)}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <Link to={ROUTES.myTrips}>
            <Button variant="outline" size="sm">
              View Itinerary
            </Button>
          </Link>
          {booking.status === 'confirmed' && (
            <Button variant="outline" size="sm" onClick={() => setConfirmOpen(true)} disabled={cancelBookingMutation.isPending}>
              Cancel Booking
            </Button>
          )}
          <Link to={ROUTES.contact}>
            <Button variant="ghost" size="sm">
              Contact Support
            </Button>
          </Link>
        </div>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Cancel this booking?"
        description="This will cancel your trip according to the package's cancellation policy. This action cannot be undone in this demo."
        confirmLabel="Cancel Booking"
        cancelLabel="Keep Booking"
        onConfirm={handleCancel}
        loading={cancelBookingMutation.isPending}
      />
    </Card>
  )
}
