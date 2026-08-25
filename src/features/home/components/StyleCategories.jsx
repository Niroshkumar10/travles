import { Link } from 'react-router-dom'
import { Waves, Mountain, Compass, Heart, Users, Landmark, Gem, Leaf } from 'lucide-react'

import { destinations } from '@/data/destinations'

const STYLES = [
  { key: 'beach', label: 'Beaches', icon: Waves },
  { key: 'mountains', label: 'Mountains', icon: Mountain },
  { key: 'adventure', label: 'Adventure', icon: Compass },
  { key: 'honeymoon', label: 'Honeymoon', icon: Heart },
  { key: 'family', label: 'Family', icon: Users },
  { key: 'culture', label: 'Culture', icon: Landmark },
  { key: 'luxury', label: 'Luxury', icon: Gem },
  { key: 'sustainable', label: 'Sustainable Travel', icon: Leaf },
]

export function StyleCategories() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <h2 className="font-display text-2xl font-bold text-text sm:text-3xl">Explore by Travel Style</h2>
      <p className="mt-1 text-text-muted">Find the kind of trip that matches your mood.</p>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {STYLES.map(({ key, label, icon: Icon }) => {
          const count = destinations.filter((d) => d.tags.includes(key)).length
          return (
            <Link
              key={key}
              to={`/destinations?interests=${key}`}
              className="group flex flex-col items-center gap-2 rounded-card border border-border bg-surface p-5 text-center transition-colors hover:border-primary-300 hover:bg-primary-50"
            >
              <span className="flex size-12 items-center justify-center rounded-full bg-primary-50 text-primary-600 group-hover:bg-primary-100">
                <Icon className="size-6" />
              </span>
              <span className="text-sm font-medium text-text">{label}</span>
              {count > 0 && <span className="text-xs text-text-subtle">{count} experiences</span>}
            </Link>
          )
        })}
      </div>
    </section>
  )
}
