import { useQuery } from '@tanstack/react-query'

import { packageKeys } from '@/services/packages/queryKeys'
import { fetchPackageBySlug, fetchPackages } from '@/services/packages/api'

export function usePackages(params) {
  return useQuery({
    queryKey: packageKeys.list(params),
    queryFn: () => fetchPackages(params),
  })
}

export function usePackage(slug) {
  return useQuery({
    queryKey: packageKeys.detail(slug),
    queryFn: () => fetchPackageBySlug(slug),
    enabled: Boolean(slug),
  })
}
