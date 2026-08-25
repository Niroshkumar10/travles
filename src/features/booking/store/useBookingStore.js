import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export const BOOKING_STEPS = ['dates', 'customize', 'travelers', 'review', 'payment', 'confirmation']

const initialDraft = {
  packageId: null,
  step: 'dates',
  dates: { startDate: null, adults: 2, children: 0 },
  customize: { selectedAddOnIds: [] },
  travelers: [],
  contactInfo: null,
  pricing: null,
  payment: { method: null, status: 'idle' },
  bookingId: null,
}

export const useBookingStore = create()(
  persist(
    (set, get) => ({
      ...initialDraft,

      startBooking(packageId) {
        if (get().packageId !== packageId) {
          set({ ...initialDraft, packageId })
        }
      },

      setDates(dates) {
        set((state) => ({ dates: { ...state.dates, ...dates } }))
      },

      setCustomize(customize) {
        set((state) => ({ customize: { ...state.customize, ...customize } }))
      },

      setTravelers(travelers) {
        set({ travelers })
      },

      setContactInfo(contactInfo) {
        set({ contactInfo })
      },

      setPricing(pricing) {
        set({ pricing })
      },

      goToStep(step) {
        if (get().canAccessStep(step)) {
          set({ step })
        }
      },

      canAccessStep(step) {
        const state = get()
        const totalTravelers = state.dates.adults + state.dates.children
        switch (step) {
          case 'dates':
            return true
          case 'customize':
            return Boolean(state.dates.startDate) && totalTravelers > 0
          case 'travelers':
            return Boolean(state.dates.startDate) && totalTravelers > 0
          case 'review':
            return state.travelers.length > 0 && Boolean(state.contactInfo)
          case 'payment':
            return state.travelers.length > 0 && Boolean(state.contactInfo) && Boolean(state.pricing)
          case 'confirmation':
            return Boolean(state.bookingId)
          default:
            return false
        }
      },

      furthestValidStep() {
        const state = get()
        const idx = [...BOOKING_STEPS].reverse().findIndex((s) => state.canAccessStep(s) && s !== 'confirmation')
        return idx === -1 ? 'dates' : [...BOOKING_STEPS].reverse()[idx]
      },

      setPaymentMethod(method) {
        set((state) => ({ payment: { ...state.payment, method } }))
      },

      setPaymentStatus(status) {
        set((state) => ({ payment: { ...state.payment, status } }))
      },

      setBookingId(bookingId) {
        set({ bookingId, step: 'confirmation' })
      },

      resetBooking() {
        set({ ...initialDraft })
      },
    }),
    {
      name: 'travel-booking-draft',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)
