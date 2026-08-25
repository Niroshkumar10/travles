import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { cancelBooking, createBooking, fetchBookingById, fetchUserBookings } from '@/services/bookings/api'
import { bookingKeys } from '@/services/bookings/queryKeys'

export function useUserBookings(userId) {
  return useQuery({
    queryKey: bookingKeys.forUser(userId),
    queryFn: () => fetchUserBookings(userId),
    enabled: Boolean(userId),
  })
}

export function useBooking(bookingId) {
  return useQuery({
    queryKey: bookingKeys.detail(bookingId),
    queryFn: () => fetchBookingById(bookingId),
    enabled: Boolean(bookingId),
  })
}

export function useCreateBooking() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createBooking,
    onSuccess: (booking) => {
      queryClient.invalidateQueries({ queryKey: bookingKeys.forUser(booking.userId) })
    },
  })
}

export function useCancelBooking(userId) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: cancelBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookingKeys.forUser(userId) })
    },
  })
}
