import { packages } from '@/data/packages'
import { NotFoundError } from '@/lib/errors'
import { delay } from '@/lib/mockDelay'

const BUDGET_RANGES = {
  'under-10000': [0, 10000],
  '10000-25000': [10000, 25000],
  '25000-50000': [25000, 50000],
  '50000-plus': [50000, Infinity],
}

/**
 * @param {{ search?: string, budget?: string, category?: string, destinationId?: string,
 *   minRating?: number, minDuration?: number, maxDuration?: number, featured?: boolean, sort?: string }} [params]
 */
export function filterPackages(list, params = {}) {
  let result = [...list]

  if (params.search) {
    const q = params.search.toLowerCase()
    result = result.filter((p) => p.title.toLowerCase().includes(q) || p.summary.toLowerCase().includes(q))
  }

  if (params.budget && BUDGET_RANGES[params.budget]) {
    const [min, max] = BUDGET_RANGES[params.budget]
    result = result.filter((p) => {
      const effectivePrice = p.discountPrice ?? p.price
      return effectivePrice >= min && effectivePrice < max
    })
  }

  if (params.category && params.category !== 'all') {
    result = result.filter((p) => p.category === params.category)
  }

  if (params.destinationId) {
    result = result.filter((p) => p.destinationId === params.destinationId)
  }

  if (params.minRating) {
    result = result.filter((p) => p.rating >= params.minRating)
  }

  if (params.minDuration) {
    result = result.filter((p) => p.durationDays >= params.minDuration)
  }
  if (params.maxDuration) {
    result = result.filter((p) => p.durationDays <= params.maxDuration)
  }

  if (params.featured) {
    result = result.filter((p) => p.featured)
  }

  switch (params.sort) {
    case 'price-asc':
      result.sort((a, b) => (a.discountPrice ?? a.price) - (b.discountPrice ?? b.price))
      break
    case 'price-desc':
      result.sort((a, b) => (b.discountPrice ?? b.price) - (a.discountPrice ?? a.price))
      break
    case 'rating':
      result.sort((a, b) => b.rating - a.rating)
      break
    case 'popular':
      result.sort((a, b) => b.reviewCount - a.reviewCount)
      break
    default:
      break
  }

  return result
}

export async function fetchPackages(params) {
  await delay()
  return filterPackages(packages, params)
}

export async function fetchPackageBySlug(slug) {
  await delay()
  const pkg = packages.find((p) => p.slug === slug)
  if (!pkg) throw new NotFoundError('Package')
  return pkg
}

export async function fetchPackageById(id) {
  await delay()
  const pkg = packages.find((p) => p.id === id)
  if (!pkg) throw new NotFoundError('Package')
  return pkg
}
