// Static fixture data for v1 (no backend). Demo-only credentials, NOT for production auth.
// Shape: see src/types/user.js. Password is plain text here purely because this is a
// mock/local-only auth layer with no server — do not carry this pattern into a real backend.
export const seedUsers = [
  {
    id: 'user-demo-1',
    email: 'demo@wayfarer.test',
    password: 'password123',
    firstName: 'Aisha',
    lastName: 'Khan',
    phone: '+91 98765 43210',
    avatarUrl: 'https://picsum.photos/seed/user-demo-1/200/200',
    createdAt: '2025-03-10T00:00:00.000Z',
  },
]
