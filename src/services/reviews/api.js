import { getReviewsFor } from '@/data/reviews'
import { delay } from '@/lib/mockDelay'

const SUBMITTED_KEY = 'travel-submitted-reviews'

function loadSubmitted() {
  try {
    const raw = localStorage.getItem(SUBMITTED_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveSubmitted(list) {
  localStorage.setItem(SUBMITTED_KEY, JSON.stringify(list))
}

export async function fetchReviews(targetType, targetId) {
  await delay()
  const submitted = loadSubmitted().filter((r) => r.targetType === targetType && r.targetId === targetId)
  return [...submitted, ...getReviewsFor(targetType, targetId)].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  )
}

export async function submitReview({ targetType, targetId, user, rating, title, comment }) {
  await delay()
  const review = {
    id: `rev-user-${Date.now()}`,
    targetType,
    targetId,
    userId: user.id,
    userName: `${user.firstName} ${user.lastName}`,
    userAvatar: user.avatarUrl,
    rating,
    title,
    comment,
    createdAt: new Date().toISOString(),
    helpfulCount: 0,
    verified: true,
  }
  const submitted = loadSubmitted()
  saveSubmitted([review, ...submitted])
  return review
}
