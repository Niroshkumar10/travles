import { Link } from 'react-router-dom'
import { MapPin, Leaf } from 'lucide-react'

import { FavoriteButton } from '@/components/common/FavoriteButton'
import { LazyImage } from '@/components/common/LazyImage'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { Rating } from '@/components/ui/Rating'
import { ROUTES } from '@/constants/routes'
import { formatCurrency } from '@/lib/pricing'

export function DestinationCard({ destination }) {
  return (
    <Card className="group overflow-hidden transition-shadow hover:shadow-modal">
      <Link to={ROUTES.destinationDetail(destination.slug)} className="block">
        <div className="relative h-48 overflow-hidden">
          <LazyImage
            src={destination.heroImage}
            alt={`${destination.name}, ${destination.country}`}
            className="h-full w-full transition-transform duration-300 group-hover:scale-105"
          />
          <FavoriteButton id={destination.id} className="absolute right-3 top-3" size="sm" />
          {destination.sustainable && (
            <Badge variant="success" className="absolute left-3 top-3 bg-white/90">
              <Leaf className="size-3" /> Sustainable
            </Badge>
          )}
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-base font-semibold text-text">{destination.name}</h3>
            <Rating value={destination.rating} reviewCount={destination.reviewCount} />
          </div>
          <p className="mt-1 flex items-center gap-1 text-sm text-text-muted">
            <MapPin className="size-3.5" /> {destination.country}
          </p>
          <p className="mt-3 text-sm text-text-muted">
            Starting from <span className="font-semibold text-primary-700">{formatCurrency(destination.startingPrice)}</span>
          </p>
        </div>
      </Link>
    </Card>
  )
}
