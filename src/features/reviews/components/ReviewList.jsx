import { useState } from 'react'
import { BadgeCheck } from 'lucide-react'

import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { ErrorState } from '@/components/ui/ErrorState'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { Rating } from '@/components/ui/Rating'
import { useReviews } from '@/features/reviews/api/useReviews'
import { ReviewForm } from '@/features/reviews/components/ReviewForm'
import { useAuthStore } from '@/stores/useAuthStore'

export function ReviewList({ targetType, targetId }) {
  const { data: reviews, isLoading, isError, refetch } = useReviews(targetType, targetId)
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const [showForm, setShowForm] = useState(false)

  if (isLoading) return <LoadingSpinner />
  if (isError) return <ErrorState onRetry={refetch} />

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        {reviews.length > 0 ? (
          <Rating value={reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length} reviewCount={reviews.length} size="md" />
        ) : (
          <span />
        )}
        {isAuthenticated && (
          <Button variant="outline" size="sm" onClick={() => setShowForm((s) => !s)}>
            {showForm ? 'Cancel' : 'Write a Review'}
          </Button>
        )}
      </div>

      {showForm && (
        <div className="mb-6">
          <ReviewForm targetType={targetType} targetId={targetId} onSubmitted={() => setShowForm(false)} />
        </div>
      )}

      {reviews.length === 0 ? (
        <EmptyState title="No reviews yet" description="Be the first to share your experience." />
      ) : (
        <ul className="space-y-5">
          {reviews.map((review) => (
            <li key={review.id} className="border-b border-border pb-5 last:border-0">
              <div className="flex items-start gap-3">
                {review.userAvatar ? (
                  <img src={review.userAvatar} alt="" className="size-10 rounded-full object-cover" />
                ) : (
                  <div className="flex size-10 items-center justify-center rounded-full bg-primary-50 text-sm font-semibold text-primary-700">
                    {review.userName?.[0]}
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold text-text">{review.userName}</span>
                    {review.verified && (
                      <span className="flex items-center gap-1 text-xs text-secondary-600">
                        <BadgeCheck className="size-3.5" /> Verified Traveler
                      </span>
                    )}
                  </div>
                  <Rating value={review.rating} className="mt-1" />
                  {review.title && <p className="mt-1.5 text-sm font-medium text-text">{review.title}</p>}
                  <p className="mt-1 text-sm text-text-muted">{review.comment}</p>
                  <p className="mt-1.5 text-xs text-text-subtle">
                    {new Date(review.createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
