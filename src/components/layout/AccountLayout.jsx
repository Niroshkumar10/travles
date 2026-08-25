import { NavLink, Outlet } from 'react-router-dom'
import { Heart, MapPin, User } from 'lucide-react'

import { ScrollToTop } from '@/components/common/ScrollToTop'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { MobileNav } from '@/components/layout/MobileNav'
import { ROUTES } from '@/constants/routes'
import { cn } from '@/lib/cn'

const SIDEBAR_LINKS = [
  { label: 'Profile', to: ROUTES.account, icon: User },
  { label: 'My Trips', to: ROUTES.myTrips, icon: MapPin },
  { label: 'Favorites', to: ROUTES.favorites, icon: Heart },
]

export function AccountLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <ScrollToTop />
      <Header />
      <MobileNav />
      <main className="flex-1">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-10 sm:px-6 md:grid-cols-[220px_1fr] lg:px-8">
          <aside>
            <nav className="flex gap-2 overflow-x-auto md:flex-col md:overflow-visible" aria-label="Account navigation">
              {SIDEBAR_LINKS.map(({ label, to, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  end
                  className={({ isActive }) =>
                    cn(
                      'flex shrink-0 items-center gap-2.5 rounded-control px-3.5 py-2.5 text-sm font-medium',
                      isActive ? 'bg-primary-50 text-primary-700' : 'text-text-muted hover:bg-slate-100 hover:text-text',
                    )
                  }
                >
                  <Icon className="size-4" />
                  {label}
                </NavLink>
              ))}
            </nav>
          </aside>
          <div className="min-w-0">
            <Outlet />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
