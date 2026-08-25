import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'

import { Seo } from '@/components/common/Seo'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { toast } from '@/lib/toastStore'
import { ROUTES } from '@/constants/routes'
import { loginSchema } from '@/lib/validators/authSchemas'
import { useAuthStore } from '@/stores/useAuthStore'

export default function LoginPage() {
  const login = useAuthStore((s) => s.login)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(loginSchema) })

  async function onSubmit(values) {
    try {
      await login(values.email, values.password)
      toast({ variant: 'success', title: 'Welcome back!' })
      navigate(searchParams.get('redirect') || ROUTES.home)
    } catch (err) {
      setError('root', { message: err.message })
    }
  }

  return (
    <div>
      <Seo title="Log In" />
      <h1 className="font-display text-2xl font-bold text-text">Welcome back</h1>
      <p className="mt-1 text-sm text-text-muted">Log in to manage your trips and bookings.</p>

      <div className="mt-4 rounded-control bg-primary-50 px-4 py-3 text-xs text-primary-700">
        Demo account: <span className="font-mono">demo@wayfarer.test</span> / <span className="font-mono">password123</span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4" noValidate>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-text">Email</label>
          <Input type="email" autoComplete="email" {...register('email')} error={Boolean(errors.email)} />
          {errors.email && <p className="mt-1 text-xs text-error">{errors.email.message}</p>}
        </div>
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label className="text-sm font-medium text-text">Password</label>
            <Link to={ROUTES.forgotPassword} className="text-xs text-primary-700 hover:underline">
              Forgot password?
            </Link>
          </div>
          <Input type="password" autoComplete="current-password" {...register('password')} error={Boolean(errors.password)} />
          {errors.password && <p className="mt-1 text-xs text-error">{errors.password.message}</p>}
        </div>

        {errors.root && <p className="text-sm text-error">{errors.root.message}</p>}

        <Button type="submit" className="w-full" loading={isSubmitting}>
          Log In
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-text-muted">
        Don't have an account?{' '}
        <Link to={ROUTES.register} className="font-medium text-primary-700 hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  )
}
