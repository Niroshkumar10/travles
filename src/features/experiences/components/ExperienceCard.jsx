import { Link } from 'react-router-dom'
import { Clock, Leaf } from 'lucide-react'

import { LazyImage } from '@/components/common/LazyImage'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { Rating } from '@/components/ui/Rating'
import { formatCurrency } from '@/lib/pricing'

export function ExperienceCard({ experience }) {
  return (
    <Card className="group overflow-hidden transition-shadow hover:shadow-modal">
      <Link to={`/experiences/${experience.slug}`} className="block">
        <div className="relative h-44 overflow-hidden">
          <LazyImage src={experience.image} alt={experience.title} className="h-full w-full transition-transform duration-300 group-hover:scale-105" />
          {experience.localExperience && (
            <Badge variant="success" className="absolute left-3 top-3 bg-white/90">
              <Leaf className="size-3" /> Local
            </Badge>
          )}
        </div>
        <div className="p-4">
          <Badge variant="neutral">{experience.category}</Badge>
          <h3 className="mt-2 font-display text-base font-semibold text-text">{experience.title}</h3>
          <p className="mt-1 flex items-center gap-1 text-sm text-text-muted">
            <Clock className="size-3.5" /> {experience.duration}
          </p>
          <div className="mt-3 flex items-center justify-between">
            <Rating value={experience.rating} reviewCount={experience.reviewCount} />
            <span className="font-semibold text-primary-700">{formatCurrency(experience.price, experience.currency)}</span>
          </div>
        </div>
      </Link>
    </Card>
  )
}
