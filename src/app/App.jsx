import { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'

import { AppProviders } from '@/app/providers/AppProviders'
import { router } from '@/app/router/router'
import { ErrorBoundary } from '@/components/common/ErrorBoundary'
import { PageSpinner } from '@/components/ui/LoadingSpinner'

export default function App() {
  return (
    <ErrorBoundary>
      <AppProviders>
        <Suspense fallback={<PageSpinner />}>
          <RouterProvider router={router} />
        </Suspense>
      </AppProviders>
    </ErrorBoundary>
  )
}
