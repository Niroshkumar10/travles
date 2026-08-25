import { ShieldCheck, BadgePercent, Headset, BadgeCheck, CalendarClock, RefreshCw } from 'lucide-react'

const REASONS = [
  { icon: ShieldCheck, label: 'Secure Payments' },
  { icon: BadgePercent, label: 'Best Price Promise' },
  { icon: Headset, label: '24/7 Customer Support' },
  { icon: BadgeCheck, label: 'Verified Travel Partners' },
  { icon: CalendarClock, label: 'Flexible Booking Options' },
  { icon: RefreshCw, label: 'Easy Cancellation' },
]

export function WhyChooseUs() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <h2 className="font-display text-2xl font-bold text-text sm:text-3xl">Why Choose Wayfarer</h2>
      <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
        {REASONS.map(({ icon: Icon, label }) => (
          <div key={label} className="flex flex-col items-center gap-2 text-center">
            <span className="flex size-12 items-center justify-center rounded-full bg-secondary-50 text-secondary-600">
              <Icon className="size-6" />
            </span>
            <span className="text-sm font-medium text-text">{label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
