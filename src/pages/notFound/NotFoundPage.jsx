import { Link } from 'react-router-dom'
import { Compass } from 'lucide-react'

import { Seo } from '@/components/common/Seo'
import { Button } from '@/components/ui/Button'
import { ROUTES } from '@/constants/routes'

export default function NotFoundPage() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
      <Seo title="Page Not Found" />
      <Compass className="size-12 text-primary-300" aria-hidden="true" />
      <h1 className="mt-4 font-display text-3xl font-bold text-text">404 — Lost your way?</h1>
      <p className="mt-2 text-text-muted">The page you're looking for doesn't exist or may have moved.</p>
      <Link to={ROUTES.home} className="mt-6">
        <Button>Back to Home</Button>
      </Link>
    </div>
  )
}
