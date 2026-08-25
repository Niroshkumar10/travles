import { Component } from 'react'

import { Button } from '@/components/ui/Button'
import { ErrorState } from '@/components/ui/ErrorState'

// React only supports error boundaries as class components — no hooks-based equivalent exists.
export class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error) {
    console.error(error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="mx-auto max-w-lg px-4 py-24">
          <ErrorState
            title="Something went wrong"
            description="An unexpected error occurred. Try reloading the page."
          />
          <div className="mt-4 flex justify-center">
            <Button onClick={() => window.location.reload()}>Reload Page</Button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
