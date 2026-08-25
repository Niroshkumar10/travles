import { Seo } from '@/components/common/Seo'
import { Accordion } from '@/components/ui/Accordion'

const FAQS = [
  { id: 'booking', title: 'How do I book a trip?', content: 'Browse Packages or Destinations, open the one you like, and select "Book Now." You\'ll walk through dates, travelers, add-ons, and payment in a few guided steps.' },
  { id: 'payment', title: 'What payment methods are supported?', content: 'This demo build supports UPI, credit/debit cards, net banking, and wallets as selectable methods in the checkout flow.' },
  { id: 'cancel', title: 'Can I cancel or modify my booking?', content: 'Yes — go to My Trips, open the booking, and use the cancel option. Each package lists its own cancellation policy on the package detail page.' },
  { id: 'account', title: 'Do I need an account to browse trips?', content: 'No — browsing destinations, packages, and experiences is open to everyone. You\'ll need an account to save favorites or complete a booking.' },
  { id: 'support', title: 'How do I contact support?', content: 'Use the Contact page to send a message, or open the assistant widget in the bottom-right corner of any page.' },
  { id: 'group', title: 'Can I book for a group?', content: 'Yes, most packages support multiple travelers — set the traveler count in the booking flow\'s first step.' },
]

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
      <Seo title="FAQ" description="Frequently asked questions about booking and traveling with Wayfarer." />
      <h1 className="font-display text-3xl font-bold text-text">Frequently Asked Questions</h1>
      <p className="mt-2 text-text-muted">Can't find what you're looking for? Reach out on the Contact page.</p>

      <div className="mt-8">
        <Accordion items={FAQS} allowMultiple />
      </div>
    </div>
  )
}
