import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import * as authApi from '@/services/auth/api'

export const useAuthStore = create()(
  persist(
    (set, get) => ({
      session: null,
      isAuthenticated: false,
      status: 'idle', // idle | loading | error
      error: null,

      async login(email, password) {
        set({ status: 'loading', error: null })
        try {
          const session = await authApi.login(email, password)
          set({ session, isAuthenticated: true, status: 'idle' })
          return session
        } catch (err) {
          set({ status: 'error', error: err.message })
          throw err
        }
      },

      async register(payload) {
        set({ status: 'loading', error: null })
        try {
          const session = await authApi.register(payload)
          set({ session, isAuthenticated: true, status: 'idle' })
          return session
        } catch (err) {
          set({ status: 'error', error: err.message })
          throw err
        }
      },

      logout() {
        set({ session: null, isAuthenticated: false })
      },

      updateProfile(patch) {
        const { session } = get()
        if (!session) return
        set({ session: { ...session, user: { ...session.user, ...patch } } })
      },
    }),
    {
      name: 'travel-auth',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ session: state.session, isAuthenticated: state.isAuthenticated }),
    },
  ),
)
