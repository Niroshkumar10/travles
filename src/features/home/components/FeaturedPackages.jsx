import { useState } from 'react'

import { CardGridSkeleton } from '@/components/ui/Skeleton'
import { ErrorState } from '@/components/ui/ErrorState'
import { EmptyState } from '@/components/ui/EmptyState'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { PACKAGE_CATEGORIES } from '@/constants/filters'
import { PackageCard } from '@/features/packages/components/PackageCard'
import { usePackages } from '@/features/packages/api/usePackages'

export function FeaturedPackages() {
  const [category, setCategory] = useState('all')
  const { data, isLoading, isError, refetch } = usePackages({ featured: true, category })

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <h2 className="font-display text-2xl font-bold text-text sm:text-3xl">Featured Travel Packages</h2>
      <p className="mt-1 text-text-muted">Handpicked packages across every kind of trip.</p>

      <Tabs value={category} onValueChange={setCategory} className="mt-6">
        <TabsList>
          {PACKAGE_CATEGORIES.map((c) => (
            <TabsTrigger key={c.value} value={c.value}>
              {c.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="mt-8">
        {isLoading && <CardGridSkeleton count={3} />}
        {isError && <ErrorState onRetry={refetch} />}
        {data && data.length === 0 && <EmptyState title="No packages in this category yet" />}
        {data && data.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.slice(0, 6).map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
