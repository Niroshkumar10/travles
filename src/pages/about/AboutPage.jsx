import { ShieldCheck, Compass, HeartHandshake, Leaf } from 'lucide-react'

import { Seo } from '@/components/common/Seo'
import { Card } from '@/components/ui/Card'

const VALUES = [
  { icon: Compass, title: 'Curated Journeys', description: 'Every destination and package is chosen for genuine travel value, not just discounts.' },
  { icon: ShieldCheck, title: 'Trust & Safety', description: 'Transparent pricing, clear cancellation policies, and secure checkout on every booking.' },
  { icon: HeartHandshake, title: 'Human Support', description: 'Real support whenever you need help before, during, or after your trip.' },
  { icon: Leaf, title: 'Responsible Travel', description: 'We highlight local guides, eco-conscious stays, and community-based experiences where available.' },
]

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
      <Seo title="About Us" description="Learn about Wayfarer's mission to make travel planning simple and trustworthy." />
      <h1 className="font-display text-3xl font-bold text-text">About Wayfarer</h1>
      <p className="mt-4 leading-relaxed text-text-muted">
        Wayfarer is a travel discovery and booking platform built to make planning a trip feel as good as taking one.
        We bring destinations, curated packages, and local experiences together in one place, so you can go from
        inspiration to a confirmed booking without juggling a dozen tabs.
      </p>
      <p className="mt-4 leading-relaxed text-text-muted">
        Our mission is simple: help people travel more, with less friction and more confidence in what they're
        booking. This is a v1 product build — pricing, packages, and reviews shown here are demo data used to
        showcase the full booking experience end to end.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {VALUES.map(({ icon: Icon, title, description }) => (
          <Card key={title} className="flex items-start gap-4 p-5">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-600">
              <Icon className="size-5" />
            </span>
            <div>
              <h2 className="font-semibold text-text">{title}</h2>
              <p className="mt-1 text-sm text-text-muted">{description}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
