import { z } from 'zod'

export const travelerSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  age: z.coerce.number().min(1, 'Enter a valid age').max(120, 'Enter a valid age'),
  gender: z.string().optional(),
})

export const contactInfoSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
  phone: z.string().min(7, 'Enter a valid phone number'),
})

export const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  bookingId: z.string().optional(),
})

export const profileSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
  phone: z.string().optional(),
})

export const reviewSchema = z.object({
  rating: z.coerce.number().min(1, 'Please select a rating').max(5),
  title: z.string().optional(),
  comment: z.string().min(10, 'Review must be at least 10 characters'),
})
