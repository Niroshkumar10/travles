import { blogPosts } from '@/data/blogPosts'
import { NotFoundError } from '@/lib/errors'
import { delay } from '@/lib/mockDelay'

export async function fetchBlogPosts(params = {}) {
  await delay()
  let result = [...blogPosts]

  if (params.search) {
    const q = params.search.toLowerCase()
    result = result.filter((p) => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q))
  }
  if (params.category && params.category !== 'all') {
    result = result.filter((p) => p.category === params.category)
  }

  return result.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
}

export async function fetchBlogPostBySlug(slug) {
  await delay()
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) throw new NotFoundError('Article')
  return post
}
