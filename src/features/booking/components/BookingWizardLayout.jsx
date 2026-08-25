import { useEffect } from 'react'
import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom'

import { PageSpinner } from '@/components/ui/LoadingSpinner'
import { ROUTES } from '@/constants/routes'
import { usePackage } from '@/features/packages/api/usePackages'
import { packages } from '@/data/packages'
import { BookingStepper } from '@/features/booking/components/BookingStepper'
import { useBookingStore } from '@/features/booking/store/useBookingStore'

export function BookingWizardLayout() {
  const { packageId } = useParams()
  const location = useLocation()
  const startBooking = useBookingStore((s) => s.startBooking)
  const canAccessStep = useBookingStore((s) => s.canAccessStep)
  const furthestValidStep = useBookingStore((s) => s.furthestValidStep)
  const storePackageId = useBookingStore((s) => s.packageId)

  // The mock service keys packages by slug in routes elsewhere, but the wizard is
  // keyed by package id (stable across a booking session) — resolve by id here.
  const pkg = packages.find((p) => p.id === packageId)
  const packageQuery = usePackage(pkg?.slug)

  useEffect(() => {
    if (pkg) startBooking(pkg.id)
  }, [pkg, startBooking])

  if (!pkg) {
    return <Navigate to={ROUTES.packages} replace />
  }

  const currentStep = location.pathname.split('/').filter(Boolean).at(-1)
  const normalizedStep = currentStep === packageId ? 'dates' : currentStep

  if (storePackageId !== pkg.id) {
    return <PageSpinner />
  }

  if (!canAccessStep(normalizedStep)) {
    const target = furthestValidStep()
    return <Navigate to={`/booking/${packageId}/${target}`} replace />
  }

  if (packageQuery.isLoading) {
    return <PageSpinner />
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <BookingStepper currentStep={normalizedStep} />
      </div>
      <Outlet context={{ pkg: packageQuery.data ?? pkg }} />
    </div>
  )
}
