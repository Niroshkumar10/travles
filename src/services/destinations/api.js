import { destinations } from '@/data/destinations'
import { NotFoundError } from '@/lib/errors'
import { delay } from '@/lib/mockDelay'

const BUDGET_RANGES = {
  'under-10000': [0, 10000],
  '10000-25000': [10000, 25000],
  '25000-50000': [25000, 50000],
  '50000-plus': [50000, Infinity],
}

/**
 * @param {{ search?: string, budget?: string, interests?: string[], travelType?: string,
 *   minRating?: number, domestic?: boolean, featured?: boolean, sort?: string }} [params]
 */
export function filterDestinations(list, params = {}) {
  let result = [...list]

  if (params.search) {
    const q = params.search.toLowerCase()
    result = result.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.country.toLowerCase().includes(q) ||
        d.region.toLowerCase().includes(q) ||
        d.tags.some((t) => t.toLowerCase().includes(q)),
    )
  }

  if (params.budget && BUDGET_RANGES[params.budget]) {
    const [min, max] = BUDGET_RANGES[params.budget]
    result = result.filter((d) => d.startingPrice >= min && d.startingPrice < max)
  }

  if (params.interests?.length) {
    result = result.filter((d) => params.interests.some((i) => d.tags.includes(i)))
  }

  if (typeof params.domestic === 'boolean') {
    result = result.filter((d) => d.domestic === params.domestic)
  }

  if (params.minRating) {
    result = result.filter((d) => d.rating >= params.minRating)
  }

  if (params.featured) {
    result = result.filter((d) => d.featured)
  }

  switch (params.sort) {
    case 'price-asc':
      result.sort((a, b) => a.startingPrice - b.startingPrice)
      break
    case 'price-desc':
      result.sort((a, b) => b.startingPrice - a.startingPrice)
      break
    case 'rating':
      result.sort((a, b) => b.rating - a.rating)
      break
    default:
      break
  }

  return result
}

export async function fetchDestinations(params) {
  await delay()
  return filterDestinations(destinations, params)
}

export async function fetchDestinationBySlug(slug) {
  await delay()
  const destination = destinations.find((d) => d.slug === slug)
  if (!destination) throw new NotFoundError('Destination')
  return destination
}

export async function fetchDestinationById(id) {
  await delay()
  const destination = destinations.find((d) => d.id === id)
  if (!destination) throw new NotFoundError('Destination')
  return destination
}
