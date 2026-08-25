import { Link, NavLink } from 'react-router-dom'
import { X } from 'lucide-react'

import { Button } from '@/components/ui/Button'
import { MAIN_NAV } from '@/constants/nav'
import { ROUTES } from '@/constants/routes'
import { cn } from '@/lib/cn'
import { useAuthStore } from '@/stores/useAuthStore'
import { useUiStore } from '@/stores/useUiStore'

export function MobileNav() {
  const isOpen = useUiStore((s) => s.isMobileNavOpen)
  const close = useUiStore((s) => s.closeMobileNav)
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const logout = useAuthStore((s) => s.logout)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-slate-900/50" onClick={close} />
      <div className="absolute inset-y-0 right-0 flex w-72 max-w-[85%] flex-col bg-surface p-5 shadow-modal">
        <div className="mb-6 flex items-center justify-between">
          <span className="font-display text-lg font-bold text-text">Menu</span>
          <button type="button" onClick={close} aria-label="Close menu" className="rounded-control p-2 hover:bg-primary-50">
            <X className="size-5" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1" aria-label="Mobile navigation">
          {MAIN_NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === ROUTES.home}
              onClick={close}
              className={({ isActive }) =>
                cn(
                  'rounded-control px-3.5 py-3 text-sm font-medium',
                  isActive ? 'bg-primary-50 text-primary-700' : 'text-text hover:bg-slate-50',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
          <NavLink
            to={ROUTES.favorites}
            onClick={close}
            className={({ isActive }) =>
              cn('rounded-control px-3.5 py-3 text-sm font-medium', isActive ? 'bg-primary-50 text-primary-700' : 'text-text hover:bg-slate-50')
            }
          >
            Favorites
          </NavLink>
        </nav>

        <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4">
          {isAuthenticated ? (
            <Button
              variant="outline"
              onClick={() => {
                logout()
                close()
              }}
            >
              Log Out
            </Button>
          ) : (
            <Link to={ROUTES.login} onClick={close}>
              <Button variant="outline" className="w-full">
                Login
              </Button>
            </Link>
          )}
          <Link to={ROUTES.packages} onClick={close}>
            <Button className="w-full">Book Now</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
