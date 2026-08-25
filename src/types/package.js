/**
 * @typedef {Object} ItineraryDay
 * @property {number} day
 * @property {string} title
 * @property {string} description
 * @property {string[]} activities
 *
 * @typedef {Object} AddOn
 * @property {string} id
 * @property {string} name
 * @property {number} price
 * @property {string} [description]
 *
 * @typedef {Object} TravelPackage
 * @property {string} id
 * @property {string} slug
 * @property {string} destinationId
 * @property {string} title
 * @property {string} summary
 * @property {string} description
 * @property {string[]} images
 * @property {number} durationDays
 * @property {number} durationNights
 * @property {number} price
 * @property {number} [discountPrice]
 * @property {string} currency
 * @property {'adventure'|'luxury'|'family'|'honeymoon'|'weekend'|'budget'|'cultural'} category
 * @property {ItineraryDay[]} itinerary
 * @property {string[]} inclusions
 * @property {string[]} exclusions
 * @property {number} maxTravelers
 * @property {number} minTravelers
 * @property {number} rating
 * @property {number} reviewCount
 * @property {string[]} availableDates ISO dates
 * @property {AddOn[]} addOns
 * @property {string} cancellationPolicy
 * @property {boolean} [featured]
 */

export {}
