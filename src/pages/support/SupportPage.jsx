import { Link } from 'react-router-dom'
import { HelpCircle, MessageSquare, Phone, Mail } from 'lucide-react'

import { Seo } from '@/components/common/Seo'
import { Card } from '@/components/ui/Card'
import { ROUTES } from '@/constants/routes'

const OPTIONS = [
  { icon: HelpCircle, title: 'FAQ', description: 'Find quick answers to common questions.', to: ROUTES.faq },
  { icon: MessageSquare, title: 'Contact Us', description: 'Send us a message and we\'ll get back to you.', to: ROUTES.contact },
  { icon: Phone, title: 'Request a Callback', description: 'Leave your number for a support agent to reach you.', to: ROUTES.contact },
  { icon: Mail, title: 'Email Support', description: 'Reach us directly at support@wayfarer.test', to: ROUTES.contact },
]

export default function SupportPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
      <Seo title="Support" description="Get help with your booking, account, or trip planning." />
      <h1 className="text-center font-display text-3xl font-bold text-text">How can we help?</h1>
      <p className="mt-2 text-center text-text-muted">Booking assistance, account questions, or trip changes — we're here for it all.</p>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {OPTIONS.map(({ icon: Icon, title, description, to }) => (
          <Link key={title} to={to}>
            <Card className="flex h-full items-start gap-4 p-5 transition-shadow hover:shadow-modal">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-600">
                <Icon className="size-5" />
              </span>
              <div>
                <h2 className="font-semibold text-text">{title}</h2>
                <p className="mt-1 text-sm text-text-muted">{description}</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
