import { useQuery } from '@tanstack/react-query'

import { destinationKeys } from '@/services/destinations/queryKeys'
import { fetchDestinationBySlug, fetchDestinations } from '@/services/destinations/api'

export function useDestinations(params) {
  return useQuery({
    queryKey: destinationKeys.list(params),
    queryFn: () => fetchDestinations(params),
  })
}

export function useDestination(slug) {
  return useQuery({
    queryKey: destinationKeys.detail(slug),
    queryFn: () => fetchDestinationBySlug(slug),
    enabled: Boolean(slug),
  })
}
