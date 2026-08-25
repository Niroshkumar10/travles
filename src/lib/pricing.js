const TAX_RATE = 0.05

export function calculateBookingPricing({ pkg, travelerCount, selectedAddOnIds }) {
  const unitPrice = pkg.discountPrice ?? pkg.price
  const base = unitPrice * Math.max(travelerCount, 1)
  const addOns = (pkg.addOns ?? [])
    .filter((a) => selectedAddOnIds.includes(a.id))
    .reduce((sum, a) => sum + a.price, 0)
  const discount = pkg.discountPrice ? (pkg.price - pkg.discountPrice) * Math.max(travelerCount, 1) : 0
  const taxable = base + addOns
  const taxes = Math.round(taxable * TAX_RATE)
  const total = taxable + taxes

  return { base, addOns, taxes, discount, total }
}

export function formatCurrency(amount, currency = 'INR') {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount)
}
