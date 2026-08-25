import { seedUsers } from '@/data/users'
import { ApiError } from '@/lib/errors'
import { delay } from '@/lib/mockDelay'

const USERS_KEY = 'travel-users'

function loadUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY)
    return raw ? JSON.parse(raw) : seedUsers
  } catch {
    return seedUsers
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

function toSession(user) {
  // eslint-disable-next-line no-unused-vars
  const { password, ...publicUser } = user
  const token = btoa(`${user.id}:${Date.now()}`)
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
  return { user: publicUser, token, expiresAt }
}

export async function login(email, password) {
  await delay()
  const users = loadUsers()
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase())
  if (!user || user.password !== password) {
    throw new ApiError('Invalid email or password', 401)
  }
  return toSession(user)
}

export async function register({ email, password, firstName, lastName, phone }) {
  await delay()
  const users = loadUsers()
  if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    throw new ApiError('An account with this email already exists', 409)
  }
  const newUser = {
    id: `user-${Date.now()}`,
    email,
    password,
    firstName,
    lastName,
    phone: phone ?? '',
    avatarUrl: `https://picsum.photos/seed/user-${Date.now()}/200/200`,
    createdAt: new Date().toISOString(),
  }
  saveUsers([...users, newUser])
  return toSession(newUser)
}

export async function requestPasswordReset(email) {
  await delay()
  const users = loadUsers()
  const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase())
  // Always resolve without revealing whether the email exists.
  return { sent: true, exists }
}

export async function resetPassword(email, newPassword) {
  await delay()
  const users = loadUsers()
  const idx = users.findIndex((u) => u.email.toLowerCase() === email.toLowerCase())
  if (idx === -1) {
    throw new ApiError('No account found for this email', 404)
  }
  users[idx] = { ...users[idx], password: newPassword }
  saveUsers(users)
  return { success: true }
}
