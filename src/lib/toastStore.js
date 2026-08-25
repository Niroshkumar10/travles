import { create } from 'zustand'

export const useToastStore = create((set) => ({
  toasts: [],
  add: (toast) =>
    set((state) => ({
      toasts: [...state.toasts, { id: Date.now() + Math.random(), variant: 'info', ...toast }],
    })),
  remove: (id) => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}))

export function toast({ title, description, variant = 'info' }) {
  useToastStore.getState().add({ title, description, variant })
}
