import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

import { Seo } from '@/components/common/Seo'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { toast } from '@/lib/toastStore'
import { ROUTES } from '@/constants/routes'
import { resetPasswordSchema } from '@/lib/validators/authSchemas'
import { resetPassword } from '@/services/auth/api'
import { z } from 'zod'

const formSchema = resetPasswordSchema.and(z.object({ email: z.string().email('Enter a valid email address') }))

export default function ResetPasswordPage() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(formSchema) })

  async function onSubmit(values) {
    try {
      await resetPassword(values.email, values.password)
      toast({ variant: 'success', title: 'Password updated', description: 'You can now log in with your new password.' })
      navigate(ROUTES.login)
    } catch (err) {
      setError('root', { message: err.message })
    }
  }

  return (
    <div>
      <Seo title="Reset Password" />
      <h1 className="font-display text-2xl font-bold text-text">Reset your password</h1>
      <p className="mt-1 text-sm text-text-muted">
        In this demo build, confirm your account email and choose a new password (no email link required).
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4" noValidate>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-text">Email</label>
          <Input type="email" {...register('email')} error={Boolean(errors.email)} />
          {errors.email && <p className="mt-1 text-xs text-error">{errors.email.message}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-text">New Password</label>
          <Input type="password" {...register('password')} error={Boolean(errors.password)} />
          {errors.password && <p className="mt-1 text-xs text-error">{errors.password.message}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-text">Confirm New Password</label>
          <Input type="password" {...register('confirmPassword')} error={Boolean(errors.confirmPassword)} />
          {errors.confirmPassword && <p className="mt-1 text-xs text-error">{errors.confirmPassword.message}</p>}
        </div>

        {errors.root && <p className="text-sm text-error">{errors.root.message}</p>}

        <Button type="submit" className="w-full" loading={isSubmitting}>
          Reset Password
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
