import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { CheckCircle2, Mail, MapPin, Phone } from 'lucide-react'

import { Seo } from '@/components/common/Seo'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { contactFormSchema } from '@/lib/validators/bookingSchemas'

export default function ContactPage() {
  const [sent, setSent] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(contactFormSchema) })

  async function onSubmit() {
    await new Promise((resolve) => setTimeout(resolve, 600))
    setSent(true)
    reset()
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
      <Seo title="Contact Us" description="Get in touch with the Wayfarer team." />
      <h1 className="font-display text-3xl font-bold text-text">Contact Us</h1>
      <p className="mt-2 text-text-muted">Have a question about a booking or need travel advice? Send us a message.</p>

      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
        <Card className="p-6 sm:p-8">
          {sent ? (
            <div className="py-8 text-center">
              <CheckCircle2 className="mx-auto size-10 text-secondary-600" />
              <h2 className="mt-3 font-semibold text-text">Message sent!</h2>
              <p className="mt-1 text-sm text-text-muted">Our support team will get back to you within 24 hours.</p>
              <Button variant="outline" className="mt-5" onClick={() => setSent(false)}>
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-text">Name</label>
                  <Input {...register('name')} error={Boolean(errors.name)} />
                  {errors.name && <p className="mt-1 text-xs text-error">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-text">Email</label>
                  <Input type="email" {...register('email')} error={Boolean(errors.email)} />
                  {errors.email && <p className="mt-1 text-xs text-error">{errors.email.message}</p>}
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-text">Subject</label>
                <Input {...register('subject')} error={Boolean(errors.subject)} />
                {errors.subject && <p className="mt-1 text-xs text-error">{errors.subject.message}</p>}
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-text">Booking ID (optional)</label>
                <Input {...register('bookingId')} placeholder="e.g. booking-172839" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-text">Message</label>
                <Textarea rows={5} {...register('message')} error={Boolean(errors.message)} />
                {errors.message && <p className="mt-1 text-xs text-error">{errors.message.message}</p>}
              </div>
              <Button type="submit" loading={isSubmitting}>
                Send Message
              </Button>
            </form>
          )}
        </Card>

        <div className="space-y-4">
          <Card className="flex items-start gap-3 p-5">
            <Mail className="size-5 text-primary-600" />
            <div>
              <p className="text-sm font-semibold text-text">Email</p>
              <p className="text-sm text-text-muted">support@wayfarer.test</p>
            </div>
          </Card>
          <Card className="flex items-start gap-3 p-5">
            <Phone className="size-5 text-primary-600" />
            <div>
              <p className="text-sm font-semibold text-text">Phone</p>
              <p className="text-sm text-text-muted">+91 1800-000-000</p>
            </div>
          </Card>
          <Card className="flex items-start gap-3 p-5">
            <MapPin className="size-5 text-primary-600" />
            <div>
              <p className="text-sm font-semibold text-text">Office</p>
              <p className="text-sm text-text-muted">Wayfarer Travel HQ, Bengaluru, India</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
