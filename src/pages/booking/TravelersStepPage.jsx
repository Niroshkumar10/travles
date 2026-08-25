import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { z } from 'zod'

import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { useBookingStore } from '@/features/booking/store/useBookingStore'
import { contactInfoSchema, travelerSchema } from '@/lib/validators/bookingSchemas'
import { useAuthStore } from '@/stores/useAuthStore'

const formSchema = z.object({
  travelers: z.array(travelerSchema).min(1),
  contact: contactInfoSchema,
})

export default function TravelersStepPage() {
  const { pkg } = useOutletContext()
  const navigate = useNavigate()
  const dates = useBookingStore((s) => s.dates)
  const travelers = useBookingStore((s) => s.travelers)
  const contactInfo = useBookingStore((s) => s.contactInfo)
  const setTravelers = useBookingStore((s) => s.setTravelers)
  const setContactInfo = useBookingStore((s) => s.setContactInfo)
  const user = useAuthStore((s) => s.session?.user)

  const travelerCount = dates.adults + dates.children

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      travelers:
        travelers.length === travelerCount
          ? travelers
          : Array.from({ length: travelerCount }, (_, i) => ({
              firstName: i === 0 ? (user?.firstName ?? '') : '',
              lastName: i === 0 ? (user?.lastName ?? '') : '',
              age: '',
              gender: '',
            })),
      contact: contactInfo ?? { email: user?.email ?? '', phone: user?.phone ?? '' },
    },
  })

  const { fields } = useFieldArray({ control, name: 'travelers' })

  function onSubmit(values) {
    setTravelers(values.travelers.map((t, i) => ({ id: `trav-${i}`, isPrimary: i === 0, ...t })))
    setContactInfo(values.contact)
    navigate(`/booking/${pkg.id}/review`)
  }

  return (
    <Card as="form" onSubmit={handleSubmit(onSubmit)} className="p-6 sm:p-8" noValidate>
      <h1 className="font-display text-xl font-semibold text-text">Traveler Details</h1>
      <p className="mt-1 text-sm text-text-muted">Enter details for all {travelerCount} traveler(s).</p>

      <div className="mt-6 space-y-6">
        {fields.map((field, index) => (
          <fieldset key={field.id} className="rounded-control border border-border p-4">
            <legend className="px-1 text-sm font-semibold text-text">
              Traveler {index + 1}{index === 0 ? ' (Primary)' : ''}
            </legend>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-text">First Name</label>
                <Input {...register(`travelers.${index}.firstName`)} error={Boolean(errors.travelers?.[index]?.firstName)} />
                {errors.travelers?.[index]?.firstName && (
                  <p className="mt-1 text-xs text-error">{errors.travelers[index].firstName.message}</p>
                )}
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-text">Last Name</label>
                <Input {...register(`travelers.${index}.lastName`)} error={Boolean(errors.travelers?.[index]?.lastName)} />
                {errors.travelers?.[index]?.lastName && (
                  <p className="mt-1 text-xs text-error">{errors.travelers[index].lastName.message}</p>
                )}
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-text">Age</label>
                <Input type="number" {...register(`travelers.${index}.age`)} error={Boolean(errors.travelers?.[index]?.age)} />
                {errors.travelers?.[index]?.age && (
                  <p className="mt-1 text-xs text-error">{errors.travelers[index].age.message}</p>
                )}
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-text">Gender (optional)</label>
                <Input {...register(`travelers.${index}.gender`)} />
              </div>
            </div>
          </fieldset>
        ))}

        <fieldset className="rounded-control border border-border p-4">
          <legend className="px-1 text-sm font-semibold text-text">Contact Information</legend>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-text">Email</label>
              <Input type="email" {...register('contact.email')} error={Boolean(errors.contact?.email)} />
              {errors.contact?.email && <p className="mt-1 text-xs text-error">{errors.contact.email.message}</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-text">Phone</label>
              <Input type="tel" {...register('contact.phone')} error={Boolean(errors.contact?.phone)} />
              {errors.contact?.phone && <p className="mt-1 text-xs text-error">{errors.contact.phone.message}</p>}
            </div>
          </div>
        </fieldset>
      </div>

      <div className="mt-8 flex justify-between">
        <Button type="button" variant="outline" onClick={() => navigate(`/booking/${pkg.id}/customize`)}>
          Back
        </Button>
        <Button type="submit">Continue to Review</Button>
      </div>
    </Card>
  )
}
