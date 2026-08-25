import { Link } from 'react-router-dom'
import { CalendarDays, MapPin } from 'lucide-react'

import { FavoriteButton } from '@/components/common/FavoriteButton'
import { LazyImage } from '@/components/common/LazyImage'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { Rating } from '@/components/ui/Rating'
import { ROUTES } from '@/constants/routes'
import { destinationsById } from '@/data/destinations'
import { formatCurrency } from '@/lib/pricing'

export function PackageCard({ pkg }) {
  const destination = destinationsById[pkg.destinationId]
  const discountPct = pkg.discountPrice ? Math.round(((pkg.price - pkg.discountPrice) / pkg.price) * 100) : null

  return (
    <Card className="group overflow-hidden transition-shadow hover:shadow-modal">
      <Link to={ROUTES.packageDetail(pkg.slug)} className="block">
        <div className="relative h-48 overflow-hidden">
          <LazyImage src={pkg.images[0]} alt={pkg.title} className="h-full w-full transition-transform duration-300 group-hover:scale-105" />
          <FavoriteButton id={pkg.id} className="absolute right-3 top-3" size="sm" />
          {discountPct && (
            <Badge variant="accent" className="absolute left-3 top-3 bg-accent-500 text-white">
              {discountPct}% OFF
            </Badge>
          )}
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-base font-semibold text-text">{pkg.title}</h3>
            <Rating value={pkg.rating} reviewCount={pkg.reviewCount} />
          </div>
          {destination && (
            <p className="mt-1 flex items-center gap-1 text-sm text-text-muted">
              <MapPin className="size-3.5" /> {destination.name}, {destination.country}
            </p>
          )}
          <p className="mt-1 flex items-center gap-1 text-sm text-text-muted">
            <CalendarDays className="size-3.5" /> {pkg.durationDays} Days / {pkg.durationNights} Nights
          </p>
          <div className="mt-3 flex items-end justify-between">
            <div>
              {pkg.discountPrice && (
                <span className="mr-2 text-xs text-text-subtle line-through">{formatCurrency(pkg.price)}</span>
              )}
              <span className="font-semibold text-primary-700">{formatCurrency(pkg.discountPrice ?? pkg.price)}</span>
            </div>
            <Badge variant="neutral" className="capitalize">{pkg.category}</Badge>
          </div>
        </div>
      </Link>
    </Card>
  )
}
