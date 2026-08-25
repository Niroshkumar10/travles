import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal } from 'lucide-react'

import { Seo } from '@/components/common/Seo'
import { Button } from '@/components/ui/Button'
import { CardGridSkeleton } from '@/components/ui/Skeleton'
import { EmptyState } from '@/components/ui/EmptyState'
import { ErrorState } from '@/components/ui/ErrorState'
import { Pagination } from '@/components/ui/Pagination'
import { SearchInput } from '@/components/ui/SearchInput'
import { Select } from '@/components/ui/Select'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { DURATION_OPTIONS, PACKAGE_CATEGORIES, SORT_OPTIONS } from '@/constants/filters'
import { PackageFilters } from '@/features/packages/components/PackageFilters'
import { PackageCard } from '@/features/packages/components/PackageCard'
import { usePackages } from '@/features/packages/api/usePackages'
import { useDebounce } from '@/hooks/useDebounce'

const PAGE_SIZE = 9

export default function PackagesListPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [searchInput, setSearchInput] = useState(searchParams.get('search') ?? '')
  const debouncedSearch = useDebounce(searchInput)
  const [page, setPage] = useState(1)

  const filters = {
    budget: searchParams.get('budget') ?? '',
    duration: searchParams.get('duration') ?? '',
    minRating: searchParams.get('minRating') ?? '',
    category: searchParams.get('category') ?? 'all',
    sort: searchParams.get('sort') ?? 'recommended',
    destination: searchParams.get('destination') ?? '',
  }

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    if (debouncedSearch) params.set('search', debouncedSearch)
    else params.delete('search')
    setSearchParams(params, { replace: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch])

  function updateFilters(patch) {
    const next = { ...filters, ...patch }
    const params = new URLSearchParams()
    if (debouncedSearch) params.set('search', debouncedSearch)
    if (next.budget) params.set('budget', next.budget)
    if (next.duration) params.set('duration', next.duration)
    if (next.minRating) params.set('minRating', next.minRating)
    if (next.category && next.category !== 'all') params.set('category', next.category)
    if (next.sort && next.sort !== 'recommended') params.set('sort', next.sort)
    if (next.destination) params.set('destination', next.destination)
    setSearchParams(params)
    setPage(1)
  }

  const durationRange = DURATION_OPTIONS.find((d) => d.value === filters.duration)

  const queryParams = useMemo(
    () => ({
      search: debouncedSearch,
      budget: filters.budget,
      category: filters.category,
      destinationId: filters.destination || undefined,
      minRating: filters.minRating ? Number(filters.minRating) : undefined,
      minDuration: durationRange?.min,
      maxDuration: durationRange?.max,
      sort: filters.sort === 'recommended' ? undefined : filters.sort,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [debouncedSearch, filters.budget, filters.category, filters.destination, filters.minRating, filters.duration, filters.sort],
  )

  const { data, isLoading, isError, refetch } = usePackages(queryParams)

  const total = data?.length ?? 0
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const paged = data?.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  function clearAll() {
    setSearchParams({})
    setSearchInput('')
    setPage(1)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Seo title="Travel Packages" description="Browse curated travel packages with transparent pricing and itineraries." />
      <h1 className="font-display text-2xl font-bold text-text sm:text-3xl">Travel Packages</h1>
      <p className="mt-1 text-text-muted">Curated multi-day trips, ready to book.</p>

      <Tabs value={filters.category} onValueChange={(v) => updateFilters({ category: v })} className="mt-6">
        <TabsList>
          {PACKAGE_CATEGORIES.map((c) => (
            <TabsTrigger key={c.value} value={c.value}>
              {c.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <SearchInput
          value={searchInput}
          onChange={(v) => {
            setSearchInput(v)
            setPage(1)
          }}
          placeholder="Search packages..."
          className="flex-1"
        />
        <div className="flex gap-2">
          <Select value={filters.sort} onChange={(e) => updateFilters({ sort: e.target.value })} className="w-48">
            {SORT_OPTIONS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </Select>
          <Button variant="outline" className="lg:hidden" onClick={() => setMobileFiltersOpen(true)}>
            <SlidersHorizontal className="size-4" /> Filters
          </Button>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr]">
        <aside className="hidden lg:block">
          <PackageFilters filters={filters} onChange={updateFilters} onClearAll={clearAll} />
        </aside>

        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-slate-900/50" onClick={() => setMobileFiltersOpen(false)} />
            <div className="absolute inset-y-0 right-0 w-80 max-w-[90%] overflow-y-auto bg-surface p-5 shadow-modal">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-semibold text-text">Filters</h2>
                <Button variant="ghost" size="sm" onClick={() => setMobileFiltersOpen(false)}>
                  Done
                </Button>
              </div>
              <PackageFilters filters={filters} onChange={updateFilters} onClearAll={clearAll} />
            </div>
          </div>
        )}

        <div>
          {!isLoading && data && (
            <p className="mb-4 text-sm text-text-muted">
              {total} package{total !== 1 ? 's' : ''} found
            </p>
          )}

          {isLoading && <CardGridSkeleton count={6} />}
          {isError && <ErrorState onRetry={refetch} />}
          {data && total === 0 && (
            <EmptyState title="No packages found" description="Try changing your search or filters." actionLabel="Clear Filters" onAction={clearAll} />
          )}
          {paged && paged.length > 0 && (
            <>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {paged.map((pkg) => (
                  <PackageCard key={pkg.id} pkg={pkg} />
                ))}
              </div>
              <div className="mt-8">
                <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
