import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Star } from 'lucide-react'

import { Button } from '@/components/ui/Button'
import { Textarea } from '@/components/ui/Textarea'
import { toast } from '@/lib/toastStore'
import { useSubmitReview } from '@/features/reviews/api/useReviews'
import { cn } from '@/lib/cn'
import { reviewSchema } from '@/lib/validators/bookingSchemas'
import { useAuthStore } from '@/stores/useAuthStore'

export function ReviewForm({ targetType, targetId, onSubmitted }) {
  const user = useAuthStore((s) => s.session?.user)
  const submitReviewMutation = useSubmitReview(targetType, targetId)
  const [rating, setRating] = useState(0)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: zodResolver(reviewSchema) })

  async function onSubmit(values) {
    try {
      await submitReviewMutation.mutateAsync({ ...values, user })
      toast({ variant: 'success', title: 'Review submitted', description: 'Thanks for sharing your experience!' })
      onSubmitted?.()
    } catch {
      toast({ variant: 'error', title: 'Could not submit review', description: 'Please try again.' })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="rounded-control border border-border p-4" noValidate>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-text">Your Rating</label>
        <div className="flex gap-1" role="radiogroup" aria-label="Rating">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={rating === n}
              aria-label={`${n} star${n > 1 ? 's' : ''}`}
              onClick={() => {
                setRating(n)
                setValue('rating', n, { shouldValidate: true })
              }}
              className="p-0.5"
            >
              <Star className={cn('size-6', n <= rating ? 'fill-accent-500 text-accent-500' : 'text-slate-300')} />
            </button>
          ))}
        </div>
        {errors.rating && <p className="mt-1 text-xs text-error">{errors.rating.message}</p>}
      </div>

      <div className="mt-4">
        <label className="mb-1.5 block text-sm font-medium text-text">Your Review</label>
        <Textarea {...register('comment')} error={Boolean(errors.comment)} placeholder="Share details of your experience..." />
        {errors.comment && <p className="mt-1 text-xs text-error">{errors.comment.message}</p>}
      </div>

      <Button type="submit" size="sm" className="mt-4" loading={submitReviewMutation.isPending}>
        Submit Review
      </Button>
    </form>
  )
}
