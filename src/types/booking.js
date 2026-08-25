/**
 * @typedef {Object} Traveler
 * @property {string} id
 * @property {string} firstName
 * @property {string} lastName
 * @property {number} age
 * @property {string} [gender]
 * @property {string} [documentId]
 * @property {boolean} [isPrimary]
 *
 * @typedef {Object} PricingBreakdown
 * @property {number} base
 * @property {number} addOns
 * @property {number} taxes
 * @property {number} discount
 * @property {number} total
 *
 * @typedef {Object} Booking
 * @property {string} id
 * @property {string} userId
 * @property {string} packageId
 * @property {'pending'|'confirmed'|'cancelled'|'completed'} status
 * @property {string} startDate
 * @property {string} endDate
 * @property {Traveler[]} travelers
 * @property {string[]} selectedAddOnIds
 * @property {{email: string, phone: string}} contactInfo
 * @property {PricingBreakdown} pricing
 * @property {{method: 'upi'|'card'|'netbanking'|'wallet', status: 'pending'|'success'|'failed', transactionId?: string, paidAt?: string}} payment
 * @property {string} createdAt
 * @property {string} updatedAt
 */

export {}
