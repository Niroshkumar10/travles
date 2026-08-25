import { Link, useParams } from 'react-router-dom'
import { Clock } from 'lucide-react'

import { Seo } from '@/components/common/Seo'
import { LazyImage } from '@/components/common/LazyImage'
import { Badge } from '@/components/ui/Badge'
import { ErrorState } from '@/components/ui/ErrorState'
import { PageSpinner } from '@/components/ui/LoadingSpinner'
import { ROUTES } from '@/constants/routes'
import { useBlogPost } from '@/features/blog/api/useBlogPosts'

export default function TravelGuidePostPage() {
  const { slug } = useParams()
  const { data: post, isLoading, isError, refetch } = useBlogPost(slug)

  if (isLoading) return <PageSpinner />
  if (isError || !post) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24">
        <ErrorState title="Article not found" onRetry={refetch} />
      </div>
    )
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Seo title={post.title} description={post.excerpt} />
      <Link to={ROUTES.travelGuide} className="text-sm text-primary-700 hover:underline">
        &larr; Travel Guide
      </Link>

      <Badge variant="neutral" className="mt-4">{post.category}</Badge>
      <h1 className="mt-2 font-display text-3xl font-bold text-text">{post.title}</h1>
      <div className="mt-3 flex items-center gap-3 text-sm text-text-muted">
        <span>{post.author}</span>
        <span aria-hidden="true">&middot;</span>
        <span>{new Date(post.publishedAt).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })}</span>
        <span aria-hidden="true">&middot;</span>
        <span className="flex items-center gap-1">
          <Clock className="size-3.5" /> {post.readMinutes} min read
        </span>
      </div>

      <div className="mt-6 h-64 overflow-hidden rounded-card sm:h-96">
        <LazyImage src={post.coverImage} alt={post.title} loading="eager" className="h-full w-full" />
      </div>

      <div className="prose-content mt-8 space-y-4 leading-relaxed text-text">
        {post.content.map((paragraph, i) => (
          <p key={i} className="text-base text-text-muted">{paragraph}</p>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <Badge key={tag} variant="default">{tag}</Badge>
        ))}
      </div>
    </article>
  )
}
