import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

import { Seo } from '@/components/common/Seo'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { toast } from '@/lib/toastStore'
import { ROUTES } from '@/constants/routes'
import { registerSchema } from '@/lib/validators/authSchemas'
import { useAuthStore } from '@/stores/useAuthStore'

export default function RegisterPage() {
  const registerUser = useAuthStore((s) => s.register)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(registerSchema) })

  async function onSubmit(values) {
    try {
      await registerUser(values)
      toast({ variant: 'success', title: 'Account created', description: 'Welcome to Wayfarer!' })
      navigate(ROUTES.home)
    } catch (err) {
      setError('root', { message: err.message })
    }
  }

  return (
    <div>
      <Seo title="Create Account" />
      <h1 className="font-display text-2xl font-bold text-text">Create your account</h1>
      <p className="mt-1 text-sm text-text-muted">Start planning your next journey.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4" noValidate>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-text">First Name</label>
            <Input {...register('firstName')} error={Boolean(errors.firstName)} />
            {errors.firstName && <p className="mt-1 text-xs text-error">{errors.firstName.message}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-text">Last Name</label>
            <Input {...register('lastName')} error={Boolean(errors.lastName)} />
            {errors.lastName && <p className="mt-1 text-xs text-error">{errors.lastName.message}</p>}
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-text">Email</label>
          <Input type="email" autoComplete="email" {...register('email')} error={Boolean(errors.email)} />
          {errors.email && <p className="mt-1 text-xs text-error">{errors.email.message}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-text">Phone (optional)</label>
          <Input type="tel" {...register('phone')} />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-text">Password</label>
          <Input type="password" autoComplete="new-password" {...register('password')} error={Boolean(errors.password)} />
          {errors.password && <p className="mt-1 text-xs text-error">{errors.password.message}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-text">Confirm Password</label>
          <Input type="password" autoComplete="new-password" {...register('confirmPassword')} error={Boolean(errors.confirmPassword)} />
          {errors.confirmPassword && <p className="mt-1 text-xs text-error">{errors.confirmPassword.message}</p>}
        </div>

        {errors.root && <p className="text-sm text-error">{errors.root.message}</p>}

        <Button type="submit" className="w-full" loading={isSubmitting}>
          Create Account
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-text-muted">
        Already have an account?{' '}
        <Link to={ROUTES.login} className="font-medium text-primary-700 hover:underline">
          Log in
        </Link>
      </p>
    </div>
  )
}
