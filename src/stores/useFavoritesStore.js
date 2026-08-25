import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export const useFavoritesStore = create()(
  persist(
    (set, get) => ({
      favoriteIds: [],

      isFavorite(id) {
        return get().favoriteIds.includes(id)
      },

      toggleFavorite(id) {
        set((state) => ({
          favoriteIds: state.favoriteIds.includes(id)
            ? state.favoriteIds.filter((f) => f !== id)
            : [...state.favoriteIds, id],
        }))
      },
    }),
    {
      name: 'travel-favorites',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
