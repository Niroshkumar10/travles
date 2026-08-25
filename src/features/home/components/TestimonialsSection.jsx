import { useState } from 'react'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'

import { testimonials } from '@/data/testimonials'
import { Rating } from '@/components/ui/Rating'

export function TestimonialsSection() {
  const [index, setIndex] = useState(0)
  const testimonial = testimonials[index]

  function go(delta) {
    setIndex((i) => (i + delta + testimonials.length) % testimonials.length)
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <h2 className="text-center font-display text-2xl font-bold text-text sm:text-3xl">What Our Travelers Say</h2>

      <div className="mx-auto mt-8 max-w-2xl rounded-card border border-border bg-surface p-8 text-center shadow-card">
        <Quote className="mx-auto size-8 text-primary-200" aria-hidden="true" />
        <p className="mt-4 text-lg text-text">&ldquo;{testimonial.review}&rdquo;</p>
        <div className="mt-5 flex items-center justify-center gap-3">
          <img src={testimonial.avatar} alt="" className="size-11 rounded-full object-cover" />
          <div className="text-left">
            <p className="text-sm font-semibold text-text">{testimonial.name}</p>
            <p className="text-xs text-text-muted">{testimonial.destination}</p>
          </div>
        </div>
        <Rating value={testimonial.rating} className="mt-3 justify-center" />
      </div>

      <div className="mt-6 flex items-center justify-center gap-3" role="group" aria-label="Testimonial navigation">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous testimonial"
          className="flex size-9 items-center justify-center rounded-full border border-border text-text-muted hover:bg-primary-50"
        >
          <ChevronLeft className="size-4" />
        </button>
        <div className="flex gap-1.5" aria-hidden="true">
          {testimonials.map((t, i) => (
            <span key={t.id} className={`h-1.5 w-1.5 rounded-full ${i === index ? 'bg-primary-600' : 'bg-slate-300'}`} />
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next testimonial"
          className="flex size-9 items-center justify-center rounded-full border border-border text-text-muted hover:bg-primary-50"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </section>
  )
}
