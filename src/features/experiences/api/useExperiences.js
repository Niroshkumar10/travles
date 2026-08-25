import { useQuery } from '@tanstack/react-query'

import { experienceKeys } from '@/services/experiences/queryKeys'
import { fetchExperienceBySlug, fetchExperiences } from '@/services/experiences/api'

export function useExperiences(params) {
  return useQuery({
    queryKey: experienceKeys.list(params),
    queryFn: () => fetchExperiences(params),
  })
}

export function useExperience(slug) {
  return useQuery({
    queryKey: experienceKeys.detail(slug),
    queryFn: () => fetchExperienceBySlug(slug),
    enabled: Boolean(slug),
  })
}
