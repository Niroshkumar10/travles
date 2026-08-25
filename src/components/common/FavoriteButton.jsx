import { Heart } from 'lucide-react'

import { cn } from '@/lib/cn'
import { useFavoritesStore } from '@/stores/useFavoritesStore'

export function FavoriteButton({ id, className, size = 'md' }) {
  const isFavorite = useFavoritesStore((s) => s.isFavorite(id))
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite)

  const dims = size === 'sm' ? 'size-8' : 'size-10'
  const iconDims = size === 'sm' ? 'size-4' : 'size-5'

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggleFavorite(id)
      }}
      aria-pressed={isFavorite}
      aria-label={isFavorite ? 'Remove from favorites' : 'Save to favorites'}
      className={cn(
        'inline-flex items-center justify-center rounded-full bg-white/90 text-text shadow-sm backdrop-blur transition-colors hover:bg-white',
        dims,
        className,
      )}
    >
      <Heart className={cn(iconDims, isFavorite ? 'fill-accent-500 text-accent-500' : 'text-text-muted')} />
    </button>
  )
}
