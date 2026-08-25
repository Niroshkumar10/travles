import { experiences } from '@/data/experiences'
import { NotFoundError } from '@/lib/errors'
import { delay } from '@/lib/mockDelay'

export async function fetchExperiences(params = {}) {
  await delay()
  let result = [...experiences]

  if (params.search) {
    const q = params.search.toLowerCase()
    result = result.filter((e) => e.title.toLowerCase().includes(q) || e.description.toLowerCase().includes(q))
  }
  if (params.category && params.category !== 'all') {
    result = result.filter((e) => e.category === params.category)
  }
  if (params.destinationId) {
    result = result.filter((e) => e.destinationId === params.destinationId)
  }
  if (params.localOnly) {
    result = result.filter((e) => e.localExperience)
  }

  return result
}

export async function fetchExperienceBySlug(slug) {
  await delay()
  const experience = experiences.find((e) => e.slug === slug)
  if (!experience) throw new NotFoundError('Experience')
  return experience
}
