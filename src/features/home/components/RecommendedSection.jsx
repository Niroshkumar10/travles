import { destinations } from '@/data/destinations'
import { packages } from '@/data/packages'
import { DestinationCard } from '@/features/destinations/components/DestinationCard'
import { PackageCard } from '@/features/packages/components/PackageCard'
import { useAuthStore } from '@/stores/useAuthStore'
import { useFavoritesStore } from '@/stores/useFavoritesStore'

export function RecommendedSection() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const favoriteIds = useFavoritesStore((s) => s.favoriteIds)

  const favoriteTags = new Set(
    destinations.filter((d) => favoriteIds.includes(d.id)).flatMap((d) => d.tags),
  )

  const items = isAuthenticated && favoriteTags.size > 0
    ? [
        ...destinations.filter((d) => !favoriteIds.includes(d.id) && d.tags.some((t) => favoriteTags.has(t))).slice(0, 2),
        ...packages.filter((p) => favoriteTags.has(p.category)).slice(0, 2),
      ]
    : [...destinations.filter((d) => d.featured).slice(0, 2), ...packages.filter((p) => p.featured).slice(0, 2)]

  return (
    <section className="bg-surface py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl font-bold text-text sm:text-3xl">Recommended for You</h2>
        <p className="mt-1 text-text-muted">
          {isAuthenticated && favoriteTags.size > 0
            ? 'Based on destinations and packages you\'ve saved.'
            : 'Popular picks travelers are loving right now.'}
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) =>
            'startingPrice' in item ? (
              <DestinationCard key={item.id} destination={item} />
            ) : (
              <PackageCard key={item.id} pkg={item} />
            ),
          )}
        </div>
      </div>
    </section>
  )
}
