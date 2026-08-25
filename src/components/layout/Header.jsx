import { Link, NavLink } from 'react-router-dom'
import { Compass, Heart, Menu, User } from 'lucide-react'

import { Button } from '@/components/ui/Button'
import { Dropdown, DropdownContent, DropdownItem, DropdownTrigger } from '@/components/ui/Dropdown'
import { MAIN_NAV } from '@/constants/nav'
import { ROUTES } from '@/constants/routes'
import { cn } from '@/lib/cn'
import { useAuthStore } from '@/stores/useAuthStore'
import { useUiStore } from '@/stores/useUiStore'

export function Header() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const user = useAuthStore((s) => s.session?.user)
  const logout = useAuthStore((s) => s.logout)
  const toggleMobileNav = useUiStore((s) => s.toggleMobileNav)

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link to={ROUTES.home} className="flex items-center gap-2 font-display text-lg font-bold text-text">
          <Compass className="size-6 text-primary-600" aria-hidden="true" />
          Wayfarer
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {MAIN_NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === ROUTES.home}
              className={({ isActive }) =>
                cn(
                  'rounded-control px-3.5 py-2 text-sm font-medium transition-colors',
                  isActive ? 'text-primary-700' : 'text-text-muted hover:text-text',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to={ROUTES.favorites}
            aria-label="Favorites"
            className="hidden rounded-full p-2 text-text-muted hover:bg-primary-50 hover:text-primary-700 sm:inline-flex"
          >
            <Heart className="size-5" />
          </Link>

          {isAuthenticated ? (
            <Dropdown>
              <DropdownTrigger asChild>
                <button className="flex items-center gap-2 rounded-full border border-border py-1 pl-1 pr-3 hover:bg-primary-50">
                  {user?.avatarUrl ? (
                    <img src={user.avatarUrl} alt="" className="size-7 rounded-full object-cover" />
                  ) : (
                    <User className="size-7 rounded-full bg-primary-50 p-1 text-primary-600" />
                  )}
                  <span className="hidden text-sm font-medium text-text sm:inline">{user?.firstName}</span>
                </button>
              </DropdownTrigger>
              <DropdownContent>
                <DropdownItem asChild>
                  <Link to={ROUTES.account}>My Account</Link>
                </DropdownItem>
                <DropdownItem asChild>
                  <Link to={ROUTES.myTrips}>My Trips</Link>
                </DropdownItem>
                <DropdownItem asChild>
                  <Link to={ROUTES.favorites}>Favorites</Link>
                </DropdownItem>
                <DropdownItem onSelect={logout}>Log Out</DropdownItem>
              </DropdownContent>
            </Dropdown>
          ) : (
            <Link to={ROUTES.login} className="hidden sm:block">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Link>
          )}

          <Link to={ROUTES.packages} className="hidden sm:block">
            <Button size="sm">Book Now</Button>
          </Link>

          <button
            type="button"
            onClick={toggleMobileNav}
            aria-label="Open menu"
            className="rounded-control p-2 text-text hover:bg-primary-50 lg:hidden"
          >
            <Menu className="size-6" />
          </button>
        </div>
      </div>
    </header>
  )
}
