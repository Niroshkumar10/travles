// Seed bookings for the demo user, so My Trips has content on first load.
// Real bookings created during the session are appended to these in localStorage
// by src/services/bookings/api.js.
function isoDaysFromNow(days) {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}

/** @type {import('@/types/booking').Booking[]} */
export const seedBookings = [
  {
    id: 'booking-seed-upcoming',
    userId: 'user-demo-1',
    packageId: 'pkg-rajasthan-heritage',
    status: 'confirmed',
    startDate: isoDaysFromNow(45),
    endDate: isoDaysFromNow(51),
    travelers: [
      { id: 'trav-1', firstName: 'Aisha', lastName: 'Khan', age: 29, gender: 'female', isPrimary: true },
      { id: 'trav-2', firstName: 'Zoya', lastName: 'Khan', age: 27, gender: 'female' },
    ],
    selectedAddOnIds: ['addon-airport-transfer'],
    contactInfo: { email: 'demo@wayfarer.test', phone: '+91 98765 43210' },
    pricing: { base: 44999, addOns: 1500, taxes: 2325, discount: 0, total: 48824 },
    payment: { method: 'card', status: 'success', transactionId: 'TXN-SEED-001', paidAt: new Date(Date.now() - 5 * 86400000).toISOString() },
    createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 86400000).toISOString(),
  },
  {
    id: 'booking-seed-past',
    userId: 'user-demo-1',
    packageId: 'pkg-goa-weekend',
    status: 'completed',
    startDate: isoDaysFromNow(-60),
    endDate: isoDaysFromNow(-58),
    travelers: [{ id: 'trav-3', firstName: 'Aisha', lastName: 'Khan', age: 29, gender: 'female', isPrimary: true }],
    selectedAddOnIds: [],
    contactInfo: { email: 'demo@wayfarer.test', phone: '+91 98765 43210' },
    pricing: { base: 6999, addOns: 0, taxes: 350, discount: 500, total: 6849 },
    payment: { method: 'upi', status: 'success', transactionId: 'TXN-SEED-002', paidAt: new Date(Date.now() - 65 * 86400000).toISOString() },
    createdAt: new Date(Date.now() - 65 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 58 * 86400000).toISOString(),
  },
]
