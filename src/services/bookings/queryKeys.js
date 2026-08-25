export const bookingKeys = {
  all: ['bookings'],
  forUser: (userId) => [...bookingKeys.all, 'user', userId],
  detail: (id) => [...bookingKeys.all, 'detail', id],
}
