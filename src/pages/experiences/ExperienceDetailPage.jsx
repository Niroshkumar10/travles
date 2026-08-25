import { Link, useParams } from 'react-router-dom'
import { Clock, MapPin } from 'lucide-react'

import { Seo } from '@/components/common/Seo'
import { LazyImage } from '@/components/common/LazyImage'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { ErrorState } from '@/components/ui/ErrorState'
import { PageSpinner } from '@/components/ui/LoadingSpinner'
import { Rating } from '@/components/ui/Rating'
import { toast } from '@/lib/toastStore'
import { ROUTES } from '@/constants/routes'
import { destinationsById } from '@/data/destinations'
import { useExperience } from '@/features/experiences/api/useExperiences'
import { formatCurrency } from '@/lib/pricing'

export default function ExperienceDetailPage() {
  const { slug } = useParams()
  const { data: experience, isLoading, isError, refetch } = useExperience(slug)

  if (isLoading) return <PageSpinner />
  if (isError || !experience) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24">
        <ErrorState title="Experience not found" onRetry={refetch} />
      </div>
    )
  }

  const destination = experience.destinationId ? destinationsById[experience.destinationId] : null

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Seo title={experience.title} description={experience.description} />

      <div className="h-72 overflow-hidden rounded-card sm:h-96">
        <LazyImage src={experience.image} alt={experience.title} loading="eager" className="h-full w-full" />
      </div>

      <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <Badge variant="neutral">{experience.category}</Badge>
          <h1 className="mt-2 font-display text-2xl font-bold text-text sm:text-3xl">{experience.title}</h1>
          {destination && (
            <Link to={ROUTES.destinationDetail(destination.slug)} className="mt-1 flex items-center gap-1 text-sm text-primary-700 hover:underline">
              <MapPin className="size-4" /> {destination.name}, {destination.country}
            </Link>
          )}
        </div>
        <Rating value={experience.rating} reviewCount={experience.reviewCount} size="md" />
      </div>

      <p className="mt-5 leading-relaxed text-text-muted">{experience.description}</p>

      <div className="mt-6 flex flex-wrap items-center gap-4 rounded-control bg-slate-50 px-4 py-3.5 text-sm text-text-muted">
        <span className="flex items-center gap-1.5">
          <Clock className="size-4" /> {experience.duration}
        </span>
        <span>{experience.available ? 'Available for booking' : 'Currently unavailable'}</span>
      </div>

      <Card className="mt-8 flex flex-wrap items-center justify-between gap-4 p-5">
        <div>
          <p className="text-sm text-text-muted">Price</p>
          <p className="font-display text-xl font-bold text-primary-700">{formatCurrency(experience.price, experience.currency)}</p>
        </div>
        <Button
          disabled={!experience.available}
          onClick={() => toast({ variant: 'success', title: 'Added to trip plan', description: 'Bookable experiences will connect to the booking flow in a future update.' })}
        >
          Book This Experience
        </Button>
      </Card>
    </div>
  )
}
