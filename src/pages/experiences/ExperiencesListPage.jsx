import { useState } from 'react'

import { Seo } from '@/components/common/Seo'
import { CardGridSkeleton } from '@/components/ui/Skeleton'
import { EmptyState } from '@/components/ui/EmptyState'
import { ErrorState } from '@/components/ui/ErrorState'
import { SearchInput } from '@/components/ui/SearchInput'
import { Checkbox } from '@/components/ui/Checkbox'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { ExperienceCard } from '@/features/experiences/components/ExperienceCard'
import { useExperiences } from '@/features/experiences/api/useExperiences'
import { useDebounce } from '@/hooks/useDebounce'

const CATEGORIES = ['all', 'Food', 'Adventure', 'Water Activities', 'Cultural', 'Local Tours']

export default function ExperiencesListPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [localOnly, setLocalOnly] = useState(false)
  const debouncedSearch = useDebounce(search)

  const { data, isLoading, isError, refetch } = useExperiences({ search: debouncedSearch, category, localOnly })

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Seo title="Experiences" description="Discover hyper-local and unique travel experiences." />
      <h1 className="font-display text-2xl font-bold text-text sm:text-3xl">Experiences</h1>
      <p className="mt-1 text-text-muted">Hands-on, local, and unforgettable activities for your trip.</p>

      <Tabs value={category} onValueChange={setCategory} className="mt-6">
        <TabsList className="flex-wrap">
          {CATEGORIES.map((c) => (
            <TabsTrigger key={c} value={c}>
              {c === 'all' ? 'All' : c}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SearchInput value={search} onChange={setSearch} placeholder="Search experiences..." className="sm:max-w-xs" />
        <Checkbox
          id="local-only"
          label="Local & hyper-local experiences only"
          checked={localOnly}
          onChange={(e) => setLocalOnly(e.target.checked)}
        />
      </div>

      <div className="mt-8">
        {isLoading && <CardGridSkeleton count={6} />}
        {isError && <ErrorState onRetry={refetch} />}
        {data && data.length === 0 && (
          <EmptyState title="No experiences found" description="Try a different category or search term." />
        )}
        {data && data.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {data.map((experience) => (
              <ExperienceCard key={experience.id} experience={experience} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
