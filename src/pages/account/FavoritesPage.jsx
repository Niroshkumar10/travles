import { Seo } from '@/components/common/Seo'
import { EmptyState } from '@/components/ui/EmptyState'
import { destinations } from '@/data/destinations'
import { packages } from '@/data/packages'
import { DestinationCard } from '@/features/destinations/components/DestinationCard'
import { PackageCard } from '@/features/packages/components/PackageCard'
import { useFavoritesStore } from '@/stores/useFavoritesStore'

export default function FavoritesPage() {
  const favoriteIds = useFavoritesStore((s) => s.favoriteIds)

  const favoriteDestinations = destinations.filter((d) => favoriteIds.includes(d.id))
  const favoritePackages = packages.filter((p) => favoriteIds.includes(p.id))

  const isEmpty = favoriteDestinations.length === 0 && favoritePackages.length === 0

  return (
    <div>
      <Seo title="Favorites" />
      <h1 className="font-display text-2xl font-bold text-text">Favorites</h1>
      <p className="mt-1 text-text-muted">Destinations and packages you've saved.</p>

      {isEmpty && (
        <div className="mt-6">
          <EmptyState title="No favorites yet" description="Tap the heart icon on any destination or package to save it here." />
        </div>
      )}

      {favoriteDestinations.length > 0 && (
        <section className="mt-8">
          <h2 className="font-display text-lg font-semibold text-text">Saved Destinations</h2>
          <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {favoriteDestinations.map((d) => (
              <DestinationCard key={d.id} destination={d} />
            ))}
          </div>
        </section>
      )}

      {favoritePackages.length > 0 && (
        <section className="mt-8">
          <h2 className="font-display text-lg font-semibold text-text">Saved Packages</h2>
          <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {favoritePackages.map((p) => (
              <PackageCard key={p.id} pkg={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
