import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Clock } from 'lucide-react'

import { Seo } from '@/components/common/Seo'
import { LazyImage } from '@/components/common/LazyImage'
import { CardGridSkeleton } from '@/components/ui/Skeleton'
import { EmptyState } from '@/components/ui/EmptyState'
import { ErrorState } from '@/components/ui/ErrorState'
import { SearchInput } from '@/components/ui/SearchInput'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { ROUTES } from '@/constants/routes'
import { useBlogPosts } from '@/features/blog/api/useBlogPosts'
import { useDebounce } from '@/hooks/useDebounce'

const CATEGORIES = ['all', 'Destination Guides', 'Travel Tips', 'Budget Travel', 'Adventure', 'Food & Culture', 'Sustainable Travel']

export default function TravelGuideListPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const debouncedSearch = useDebounce(search)

  const { data, isLoading, isError, refetch } = useBlogPosts({ search: debouncedSearch, category })

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Seo title="Travel Guide" description="Destination guides, travel tips, and inspiration for your next trip." />
      <h1 className="font-display text-2xl font-bold text-text sm:text-3xl">Travel Guide</h1>
      <p className="mt-1 text-text-muted">Tips, guides, and inspiration from our travel experts.</p>

      <Tabs value={category} onValueChange={setCategory} className="mt-6">
        <TabsList className="flex-wrap">
          {CATEGORIES.map((c) => (
            <TabsTrigger key={c} value={c}>
              {c === 'all' ? 'All' : c}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="mt-4">
        <SearchInput value={search} onChange={setSearch} placeholder="Search articles..." className="sm:max-w-xs" />
      </div>

      <div className="mt-8">
        {isLoading && <CardGridSkeleton count={6} />}
        {isError && <ErrorState onRetry={refetch} />}
        {data && data.length === 0 && <EmptyState title="No articles found" description="Try a different category or search term." />}
        {data && data.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {data.map((post) => (
              <Card key={post.id} className="overflow-hidden transition-shadow hover:shadow-modal">
                <Link to={ROUTES.travelGuidePost(post.slug)}>
                  <LazyImage src={post.coverImage} alt={post.title} className="h-44 w-full" />
                  <div className="p-4">
                    <Badge variant="neutral">{post.category}</Badge>
                    <h2 className="mt-2 font-display text-base font-semibold text-text">{post.title}</h2>
                    <p className="mt-1 line-clamp-2 text-sm text-text-muted">{post.excerpt}</p>
                    <p className="mt-3 flex items-center gap-1 text-xs text-text-subtle">
                      <Clock className="size-3.5" /> {post.readMinutes} min read
                    </p>
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
