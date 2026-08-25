/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} email
 * @property {string} password
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} [phone]
 * @property {string} [avatarUrl]
 * @property {string} createdAt
 *
 * @typedef {Object} AuthSession
 * @property {Omit<User, 'password'>} user
 * @property {string} token
 * @property {string} expiresAt
 */

export {}
