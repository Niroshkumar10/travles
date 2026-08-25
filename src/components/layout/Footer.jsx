import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Compass, Globe, Camera, Mail, MessageCircle } from 'lucide-react'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { toast } from '@/lib/toastStore'
import { FOOTER_LINKS } from '@/constants/nav'

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function FooterColumn({ title, links }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-text">{title}</h3>
      <ul className="mt-3 space-y-2">
        {links.map((link) => (
          <li key={link.to}>
            <Link to={link.to} className="text-sm text-text-muted hover:text-primary-700">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Footer() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  function handleSubscribe(e) {
    e.preventDefault()
    if (!isValidEmail(email)) {
      setError('Enter a valid email address.')
      return
    }
    setError('')
    setEmail('')
    toast({ variant: 'success', title: 'Subscribed!', description: "You're on the list for deals and travel tips." })
  }

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 font-display text-lg font-bold text-text">
              <Compass className="size-6 text-primary-600" aria-hidden="true" />
              Wayfarer
            </div>
            <p className="mt-3 max-w-xs text-sm text-text-muted">
              Discover, compare, and book unforgettable trips — from weekend escapes to once-in-a-lifetime
              journeys.
            </p>
            <div className="mt-4 flex gap-3">
              {[Globe, Camera, MessageCircle].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="rounded-full bg-slate-100 p-2 text-text-muted hover:bg-primary-50 hover:text-primary-700"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <FooterColumn title="Company" links={FOOTER_LINKS.company} />
          <FooterColumn title="Explore" links={FOOTER_LINKS.explore} />
          <FooterColumn title="Account" links={FOOTER_LINKS.account} />
        </div>

        <div className="mt-12 rounded-card bg-primary-50 p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="flex items-center gap-2 font-display text-base font-semibold text-text">
                <Mail className="size-4 text-primary-600" /> Get travel deals in your inbox
              </h3>
              <p className="mt-1 text-sm text-text-muted">Deals, destination ideas, and seasonal offers — no spam.</p>
            </div>
            <form onSubmit={handleSubscribe} className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                error={Boolean(error)}
                aria-label="Email address"
                className="sm:w-64"
              />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
          {error && <p className="mt-2 text-sm text-error">{error}</p>}
        </div>

        <p className="mt-10 text-center text-xs text-text-subtle">
          &copy; {new Date().getFullYear()} Wayfarer Travel. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
