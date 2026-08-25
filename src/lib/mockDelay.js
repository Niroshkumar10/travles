import { ApiError } from '@/lib/errors'

export function delay(ms = 400 + Math.random() * 400) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/** Throws an ApiError with the given probability (0-1). Used to exercise error states in dev. */
export function maybeFail(rate = 0) {
  if (Math.random() < rate) {
    throw new ApiError('Simulated network failure')
  }
}
