import { Link, useParams } from 'react-router-dom'
import { CalendarDays, Leaf, MapPin } from 'lucide-react'

import { Seo } from '@/components/common/Seo'
import { FavoriteButton } from '@/components/common/FavoriteButton'
import { LazyImage } from '@/components/common/LazyImage'
import { Accordion } from '@/components/ui/Accordion'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { ErrorState } from '@/components/ui/ErrorState'
import { PageSpinner } from '@/components/ui/LoadingSpinner'
import { Rating } from '@/components/ui/Rating'
import { ROUTES } from '@/constants/routes'
import { useDestination, useDestinations } from '@/features/destinations/api/useDestinations'
import { DestinationCard } from '@/features/destinations/components/DestinationCard'
import { usePackages } from '@/features/packages/api/usePackages'
import { PackageCard } from '@/features/packages/components/PackageCard'
import { ReviewList } from '@/features/reviews/components/ReviewList'

export default function DestinationDetailPage() {
  const { slug } = useParams()
  const { data: destination, isLoading, isError, refetch } = useDestination(slug)
  const packagesQuery = usePackages({ destinationId: destination?.id })
  const similarQuery = useDestinations({ domestic: destination?.domestic })

  if (isLoading) return <PageSpinner />
  if (isError || !destination) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24">
        <ErrorState title="Destination not found" onRetry={refetch} />
      </div>
    )
  }

  const similar = (similarQuery.data ?? []).filter((d) => d.id !== destination.id).slice(0, 3)

  return (
    <div>
      <Seo title={destination.name} description={destination.shortDescription} />

      <section className="relative h-[26rem] overflow-hidden sm:h-[30rem]">
        <LazyImage src={destination.heroImage} alt={destination.name} loading="eager" className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="flex items-center gap-1.5 text-sm text-white/80">
                <MapPin className="size-4" /> {destination.country} &middot; {destination.region}
              </p>
              <h1 className="mt-1 font-display text-3xl font-bold text-white sm:text-4xl">{destination.name}</h1>
              <p className="mt-2 max-w-xl text-white/90">{destination.shortDescription}</p>
              <div className="mt-3 flex items-center gap-3">
                <Rating value={destination.rating} reviewCount={destination.reviewCount} size="md" className="text-white [&>span]:text-white" />
                {destination.sustainable && (
                  <Badge variant="success" className="bg-white/90">
                    <Leaf className="size-3" /> Sustainable Pick
                  </Badge>
                )}
              </div>
            </div>
            <FavoriteButton id={destination.id} />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
          <div className="space-y-10">
            <section>
              <h2 className="font-display text-xl font-semibold text-text">Overview</h2>
              <p className="mt-3 leading-relaxed text-text-muted">{destination.description}</p>
            </section>

            {destination.gallery?.length > 0 && (
              <section>
                <h2 className="font-display text-xl font-semibold text-text">Gallery</h2>
                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {destination.gallery.map((src, i) => (
                    <LazyImage key={i} src={src} alt="" className="h-28 w-full rounded-control sm:h-32" />
                  ))}
                </div>
              </section>
            )}

            <section>
              <h2 className="font-display text-xl font-semibold text-text">Highlights</h2>
              <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {destination.highlights.map((h) => (
                  <li key={h} className="rounded-control bg-primary-50 px-3.5 py-2.5 text-sm text-primary-800">
                    {h}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-text">Things to Do</h2>
              <ul className="mt-3 list-inside list-disc space-y-1.5 text-text-muted">
                {destination.thingsToDo.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl font-semibold text-text">Travel Tips</h2>
              <ul className="mt-3 list-inside list-disc space-y-1.5 text-text-muted">
                {destination.travelTips.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </section>

            {destination.faq?.length > 0 && (
              <section>
                <h2 className="font-display text-xl font-semibold text-text">Frequently Asked Questions</h2>
                <div className="mt-3">
                  <Accordion items={destination.faq.map((f, i) => ({ id: i, title: f.question, content: f.answer }))} />
                </div>
              </section>
            )}

            {packagesQuery.data?.length > 0 && (
              <section>
                <h2 className="font-display text-xl font-semibold text-text">Available Packages</h2>
                <div className="mt-3 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {packagesQuery.data.map((pkg) => (
                    <PackageCard key={pkg.id} pkg={pkg} />
                  ))}
                </div>
              </section>
            )}

            <section>
              <h2 className="font-display text-xl font-semibold text-text">Traveler Reviews</h2>
              <div className="mt-3">
                <ReviewList targetType="destination" targetId={destination.id} />
              </div>
            </section>

            {similar.length > 0 && (
              <section>
                <h2 className="font-display text-xl font-semibold text-text">Similar Destinations</h2>
                <div className="mt-3 grid grid-cols-1 gap-6 sm:grid-cols-3">
                  {similar.map((d) => (
                    <DestinationCard key={d.id} destination={d} />
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <Card className="p-5">
              <p className="text-sm text-text-muted">Starting from</p>
              <p className="font-display text-2xl font-bold text-primary-700">
                {new Intl.NumberFormat('en-IN', { style: 'currency', currency: destination.currency, maximumFractionDigits: 0 }).format(
                  destination.startingPrice,
                )}
              </p>
              <p className="mt-3 flex items-center gap-1.5 text-sm text-text-muted">
                <CalendarDays className="size-4" /> Best time: {destination.bestSeason.join(', ')}
              </p>
              <div className="mt-5 flex flex-col gap-2">
                <Link to={`${ROUTES.packages}?destination=${destination.id}`}>
                  <Button className="w-full">Explore Packages</Button>
                </Link>
                <Link to={ROUTES.contact}>
                  <Button variant="outline" className="w-full">
                    Plan My Trip
                  </Button>
                </Link>
              </div>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  )
}
