import { useQuery } from '@tanstack/react-query'

import { blogKeys } from '@/services/blog/queryKeys'
import { fetchBlogPostBySlug, fetchBlogPosts } from '@/services/blog/api'

export function useBlogPosts(params) {
  return useQuery({
    queryKey: blogKeys.list(params),
    queryFn: () => fetchBlogPosts(params),
  })
}

export function useBlogPost(slug) {
  return useQuery({
    queryKey: blogKeys.detail(slug),
    queryFn: () => fetchBlogPostBySlug(slug),
    enabled: Boolean(slug),
  })
}
