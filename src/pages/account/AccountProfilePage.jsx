import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Seo } from '@/components/common/Seo'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { toast } from '@/lib/toastStore'
import { profileSchema } from '@/lib/validators/bookingSchemas'
import { useAuthStore } from '@/stores/useAuthStore'

export default function AccountProfilePage() {
  const user = useAuthStore((s) => s.session?.user)
  const updateProfile = useAuthStore((s) => s.updateProfile)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user?.firstName ?? '',
      lastName: user?.lastName ?? '',
      email: user?.email ?? '',
      phone: user?.phone ?? '',
    },
  })

  async function onSubmit(values) {
    await new Promise((resolve) => setTimeout(resolve, 400))
    updateProfile(values)
    toast({ variant: 'success', title: 'Profile updated' })
  }

  return (
    <div>
      <Seo title="My Account" />
      <div className="flex items-center gap-4">
        {user?.avatarUrl && <img src={user.avatarUrl} alt="" className="size-16 rounded-full object-cover" />}
        <div>
          <h1 className="font-display text-2xl font-bold text-text">
            {user?.firstName} {user?.lastName}
          </h1>
          <p className="text-sm text-text-muted">{user?.email}</p>
        </div>
      </div>

      <Card className="mt-8 p-6 sm:p-8">
        <h2 className="font-semibold text-text">Profile Details</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4" noValidate>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
            <Input type="email" {...register('email')} error={Boolean(errors.email)} />
            {errors.email && <p className="mt-1 text-xs text-error">{errors.email.message}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-text">Phone</label>
            <Input type="tel" {...register('phone')} />
          </div>
          <Button type="submit" loading={isSubmitting}>
            Save Changes
          </Button>
        </form>
      </Card>
    </div>
  )
}
