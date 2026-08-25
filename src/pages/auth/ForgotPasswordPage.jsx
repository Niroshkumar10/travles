import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { MailCheck } from 'lucide-react'

import { Seo } from '@/components/common/Seo'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { ROUTES } from '@/constants/routes'
import { requestPasswordReset } from '@/services/auth/api'
import { forgotPasswordSchema } from '@/lib/validators/authSchemas'

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(forgotPasswordSchema) })

  async function onSubmit(values) {
    await requestPasswordReset(values.email)
    setSent(true)
  }

  if (sent) {
    return (
      <div className="text-center">
        <Seo title="Check Your Email" />
        <MailCheck className="mx-auto size-10 text-secondary-600" />
        <h1 className="mt-3 font-display text-xl font-semibold text-text">Check your email</h1>
        <p className="mt-1 text-sm text-text-muted">
          If an account exists for that email, we've sent instructions to reset your password.
        </p>
        <Link to={ROUTES.login} className="mt-6 inline-block text-sm font-medium text-primary-700 hover:underline">
          Back to Log In
        </Link>
      </div>
    )
  }

  return (
    <div>
      <Seo title="Forgot Password" />
      <h1 className="font-display text-2xl font-bold text-text">Forgot your password?</h1>
      <p className="mt-1 text-sm text-text-muted">Enter your email and we'll send you reset instructions.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4" noValidate>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-text">Email</label>
          <Input type="email" {...register('email')} error={Boolean(errors.email)} />
          {errors.email && <p className="mt-1 text-xs text-error">{errors.email.message}</p>}
        </div>
        <Button type="submit" className="w-full" loading={isSubmitting}>
          Send Reset Instructions
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-text-muted">
        <Link to={ROUTES.login} className="font-medium text-primary-700 hover:underline">
          Back to Log In
        </Link>
      </p>
    </div>
  )
}
