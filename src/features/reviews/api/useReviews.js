import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { reviewKeys } from '@/services/reviews/queryKeys'
import { fetchReviews, submitReview } from '@/services/reviews/api'

export function useReviews(targetType, targetId) {
  return useQuery({
    queryKey: reviewKeys.forTarget(targetType, targetId),
    queryFn: () => fetchReviews(targetType, targetId),
    enabled: Boolean(targetType && targetId),
  })
}

export function useSubmitReview(targetType, targetId) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload) => submitReview({ targetType, targetId, ...payload }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: reviewKeys.forTarget(targetType, targetId) })
    },
  })
}
