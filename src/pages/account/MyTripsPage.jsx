import { useMemo, useState } from 'react'

import { Seo } from '@/components/common/Seo'
import { EmptyState } from '@/components/ui/EmptyState'
import { ErrorState } from '@/components/ui/ErrorState'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { TripCard } from '@/features/account/components/TripCard'
import { useUserBookings } from '@/features/booking/api/useBookings'
import { useAuthStore } from '@/stores/useAuthStore'

export default function MyTripsPage() {
  const userId = useAuthStore((s) => s.session?.user?.id)
  const { data: bookings, isLoading, isError, refetch } = useUserBookings(userId)
  const [tab, setTab] = useState('upcoming')

  const today = new Date().toISOString().slice(0, 10)

  const filtered = useMemo(() => {
    if (!bookings) return []
    if (tab === 'upcoming') return bookings.filter((b) => b.endDate >= today && b.status !== 'cancelled')
    if (tab === 'past') return bookings.filter((b) => b.endDate < today || b.status === 'completed')
    return bookings.filter((b) => b.status === 'cancelled')
  }, [bookings, tab, today])

  return (
    <div>
      <Seo title="My Trips" />
      <h1 className="font-display text-2xl font-bold text-text">My Trips</h1>
      <p className="mt-1 text-text-muted">View and manage your bookings.</p>

      <Tabs value={tab} onValueChange={setTab} className="mt-6">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="mt-6 space-y-5">
        {isLoading && <LoadingSpinner />}
        {isError && <ErrorState onRetry={refetch} />}
        {filtered && filtered.length === 0 && !isLoading && (
          <EmptyState title={`No ${tab} trips`} description="Trips you book will show up here." />
        )}
        {filtered.map((booking) => (
          <TripCard key={booking.id} booking={booking} userId={userId} />
        ))}
      </div>
    </div>
  )
}
