export const BUDGET_OPTIONS = [
  { value: 'under-10000', label: 'Under ₹10,000' },
  { value: '10000-25000', label: '₹10,000 – ₹25,000' },
  { value: '25000-50000', label: '₹25,000 – ₹50,000' },
  { value: '50000-plus', label: '₹50,000+' },
]

export const DURATION_OPTIONS = [
  { value: 'weekend', label: 'Weekend', min: 1, max: 2 },
  { value: 'short', label: '3–5 Days', min: 3, max: 5 },
  { value: 'medium', label: '6–10 Days', min: 6, max: 10 },
  { value: 'long', label: '10+ Days', min: 11, max: 999 },
]

export const TRAVEL_TYPE_OPTIONS = ['Solo', 'Couple', 'Family', 'Friends', 'Group']

export const INTEREST_OPTIONS = ['beach', 'adventure', 'nature', 'culture', 'food', 'luxury', 'mountains', 'honeymoon', 'shopping', 'sustainable']

export const PACKAGE_CATEGORIES = [
  { value: 'all', label: 'All' },
  { value: 'family', label: 'Family' },
  { value: 'honeymoon', label: 'Honeymoon' },
  { value: 'adventure', label: 'Adventure' },
  { value: 'weekend', label: 'Weekend' },
  { value: 'luxury', label: 'Luxury' },
  { value: 'cultural', label: 'Cultural' },
]

export const SORT_OPTIONS = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'popular', label: 'Most Popular' },
]

export const PAYMENT_METHODS = [
  { value: 'upi', label: 'UPI' },
  { value: 'card', label: 'Credit / Debit Card' },
  { value: 'netbanking', label: 'Net Banking' },
  { value: 'wallet', label: 'Wallet' },
]
