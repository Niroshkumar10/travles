import { seedBookings } from '@/data/bookings'
import { NotFoundError } from '@/lib/errors'
import { delay } from '@/lib/mockDelay'

const BOOKINGS_KEY = 'travel-bookings'

function loadBookings() {
  try {
    const raw = localStorage.getItem(BOOKINGS_KEY)
    return raw ? JSON.parse(raw) : seedBookings
  } catch {
    return seedBookings
  }
}

function saveBookings(bookings) {
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings))
}

export async function fetchUserBookings(userId) {
  await delay()
  return loadBookings()
    .filter((b) => b.userId === userId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
}

export async function fetchBookingById(id) {
  await delay()
  const booking = loadBookings().find((b) => b.id === id)
  if (!booking) throw new NotFoundError('Booking')
  return booking
}

export async function createBooking(payload) {
  await delay(1200 + Math.random() * 800)
  const bookings = loadBookings()
  const now = new Date().toISOString()
  const booking = {
    id: `booking-${Date.now()}`,
    status: 'confirmed',
    createdAt: now,
    updatedAt: now,
    ...payload,
  }
  saveBookings([booking, ...bookings])
  return booking
}

export async function cancelBooking(id) {
  await delay()
  const bookings = loadBookings()
  const idx = bookings.findIndex((b) => b.id === id)
  if (idx === -1) throw new NotFoundError('Booking')
  bookings[idx] = { ...bookings[idx], status: 'cancelled', updatedAt: new Date().toISOString() }
  saveBookings(bookings)
  return bookings[idx]
}
