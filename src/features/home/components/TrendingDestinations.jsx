import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

import { DestinationCard } from '@/features/destinations/components/DestinationCard'
import { useDestinations } from '@/features/destinations/api/useDestinations'
import { CardGridSkeleton } from '@/components/ui/Skeleton'
import { ErrorState } from '@/components/ui/ErrorState'
import { ROUTES } from '@/constants/routes'

export function TrendingDestinations() {
  const { data, isLoading, isError, refetch } = useDestinations({ featured: true })

  return (
    <section className="bg-surface py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-text sm:text-3xl">Trending Destinations</h2>
            <p className="mt-1 text-text-muted">Loved by travelers this season.</p>
          </div>
          <Link to={ROUTES.destinations} className="hidden items-center gap-1 text-sm font-medium text-primary-700 hover:underline sm:flex">
            View all <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="mt-8">
          {isLoading && <CardGridSkeleton count={4} />}
          {isError && <ErrorState onRetry={refetch} />}
          {data && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {data.slice(0, 4).map((destination) => (
                <DestinationCard key={destination.id} destination={destination} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
