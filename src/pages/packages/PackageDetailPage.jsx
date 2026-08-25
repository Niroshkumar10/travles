import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { CalendarDays, MapPin, Users } from 'lucide-react'

import { Seo } from '@/components/common/Seo'
import { FavoriteButton } from '@/components/common/FavoriteButton'
import { LazyImage } from '@/components/common/LazyImage'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { ErrorState } from '@/components/ui/ErrorState'
import { PageSpinner } from '@/components/ui/LoadingSpinner'
import { Rating } from '@/components/ui/Rating'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { ROUTES } from '@/constants/routes'
import { destinationsById } from '@/data/destinations'
import { usePackage } from '@/features/packages/api/usePackages'
import { ReviewList } from '@/features/reviews/components/ReviewList'
import { formatCurrency } from '@/lib/pricing'
import { useAuthStore } from '@/stores/useAuthStore'

export default function PackageDetailPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { data: pkg, isLoading, isError, refetch } = usePackage(slug)
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const [activeImage, setActiveImage] = useState(0)

  if (isLoading) return <PageSpinner />
  if (isError || !pkg) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24">
        <ErrorState title="Package not found" onRetry={refetch} />
      </div>
    )
  }

  const destination = destinationsById[pkg.destinationId]

  function handleBookNow() {
    if (!isAuthenticated) {
      navigate(`${ROUTES.login}?redirect=/booking/${pkg.id}/dates`)
      return
    }
    navigate(`/booking/${pkg.id}/dates`)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Seo title={pkg.title} description={pkg.summary} />

      <div className="mb-6">
        <div className="relative h-72 overflow-hidden rounded-card sm:h-96">
          <LazyImage src={pkg.images[activeImage]} alt={pkg.title} loading="eager" className="h-full w-full" />
          <FavoriteButton id={pkg.id} className="absolute right-4 top-4" />
        </div>
        {pkg.images.length > 1 && (
          <div className="mt-2 flex gap-2">
            {pkg.images.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setActiveImage(i)}
                className={`h-16 w-24 overflow-hidden rounded-control border-2 ${i === activeImage ? 'border-primary-600' : 'border-transparent'}`}
              >
                <LazyImage src={src} alt="" className="h-full w-full" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
        <div>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="font-display text-2xl font-bold text-text sm:text-3xl">{pkg.title}</h1>
              {destination && (
                <p className="mt-1 flex items-center gap-1 text-sm text-text-muted">
                  <MapPin className="size-4" /> {destination.name}, {destination.country}
                </p>
              )}
            </div>
            <Rating value={pkg.rating} reviewCount={pkg.reviewCount} size="md" />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="neutral" className="capitalize">{pkg.category}</Badge>
            <Badge variant="neutral">
              <CalendarDays className="size-3" /> {pkg.durationDays}D / {pkg.durationNights}N
            </Badge>
            <Badge variant="neutral">
              <Users className="size-3" /> Up to {pkg.maxTravelers} travelers
            </Badge>
          </div>

          <p className="mt-5 leading-relaxed text-text-muted">{pkg.description}</p>

          <section className="mt-10">
            <h2 className="font-display text-xl font-semibold text-text">Day-by-Day Itinerary</h2>
            <ol className="mt-4 space-y-4 border-l-2 border-primary-100 pl-5">
              {pkg.itinerary.map((day) => (
                <li key={day.day} className="relative">
                  <span className="absolute -left-[1.65rem] flex size-5 items-center justify-center rounded-full bg-primary-600 text-[10px] font-bold text-white">
                    {day.day}
                  </span>
                  <p className="text-sm font-semibold text-text">
                    Day {day.day} — {day.title}
                  </p>
                  <p className="mt-0.5 text-sm text-text-muted">{day.description}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-10">
            <Tabs defaultValue="inclusions">
              <TabsList>
                <TabsTrigger value="inclusions">Package Includes</TabsTrigger>
                <TabsTrigger value="exclusions">Package Excludes</TabsTrigger>
                <TabsTrigger value="policy">Cancellation Policy</TabsTrigger>
              </TabsList>
              <TabsContent value="inclusions">
                <ul className="space-y-1.5 text-sm text-text-muted">
                  {pkg.inclusions.map((i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-0.5 text-secondary-600">&#10003;</span> {i}
                    </li>
                  ))}
                </ul>
              </TabsContent>
              <TabsContent value="exclusions">
                <ul className="space-y-1.5 text-sm text-text-muted">
                  {pkg.exclusions.map((i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-0.5 text-error">&#10007;</span> {i}
                    </li>
                  ))}
                </ul>
              </TabsContent>
              <TabsContent value="policy">
                <p className="text-sm text-text-muted">{pkg.cancellationPolicy}</p>
              </TabsContent>
            </Tabs>
          </section>

          <section className="mt-10">
            <h2 className="font-display text-xl font-semibold text-text">Traveler Reviews</h2>
            <div className="mt-4">
              <ReviewList targetType="package" targetId={pkg.id} />
            </div>
          </section>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <Card className="p-5">
            {pkg.discountPrice && (
              <p className="text-sm text-text-subtle line-through">{formatCurrency(pkg.price)}</p>
            )}
            <p className="text-sm text-text-muted">Starting From</p>
            <p className="font-display text-2xl font-bold text-primary-700">{formatCurrency(pkg.discountPrice ?? pkg.price)}</p>
            <p className="mt-1 text-xs text-text-subtle">per person, taxes extra</p>

            {pkg.availableDates?.length > 0 && (
              <p className="mt-3 text-xs text-text-muted">
                Next available: {new Date(pkg.availableDates[0] + 'T00:00:00').toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
              </p>
            )}

            <div className="mt-5 flex flex-col gap-2">
              <Button className="w-full" onClick={handleBookNow}>
                Book Now
              </Button>
              <Button variant="outline" className="w-full" onClick={handleBookNow}>
                Customize Trip
              </Button>
            </div>

            {destination && (
              <Link to={ROUTES.destinationDetail(destination.slug)} className="mt-4 block text-center text-xs text-primary-700 hover:underline">
                View {destination.name} destination guide
              </Link>
            )}
          </Card>
        </aside>
      </div>
    </div>
  )
}
