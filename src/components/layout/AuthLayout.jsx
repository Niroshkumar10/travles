import { Link, Outlet } from 'react-router-dom'
import { Compass } from 'lucide-react'

import { ScrollToTop } from '@/components/common/ScrollToTop'
import { ROUTES } from '@/constants/routes'

export function AuthLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <ScrollToTop />
      <div className="w-full max-w-md">
        <Link to={ROUTES.home} className="mb-8 flex items-center justify-center gap-2 font-display text-xl font-bold text-text">
          <Compass className="size-7 text-primary-600" aria-hidden="true" />
          Wayfarer
        </Link>
        <div className="rounded-card border border-border bg-surface p-6 shadow-card sm:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
