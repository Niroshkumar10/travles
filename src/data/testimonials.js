const avatar = (seed) => `https://picsum.photos/seed/${seed}/120/120`

export const testimonials = [
  {
    id: 'test-1',
    name: 'Ananya Sharma',
    avatar: avatar('testimonial-1'),
    destination: 'Bali, Indonesia',
    rating: 5,
    review: 'Every detail was taken care of — from the villa to the sunset cruise. Best trip we\'ve ever booked.',
  },
  {
    id: 'test-2',
    name: 'Vikram Singh',
    avatar: avatar('testimonial-2'),
    destination: 'Rajasthan, India',
    rating: 5,
    review: 'The heritage tour was seamless. Our guide brought every fort and palace to life.',
  },
  {
    id: 'test-3',
    name: 'Priya Nair',
    avatar: avatar('testimonial-3'),
    destination: 'Santorini, Greece',
    rating: 5,
    review: 'Booking was effortless and the caldera-view suite was even better than the photos.',
  },
  {
    id: 'test-4',
    name: 'Karan Malhotra',
    avatar: avatar('testimonial-4'),
    destination: 'Manali, India',
    rating: 4,
    review: 'Great adventure package — paragliding and rafting in one trip kept the whole group happy.',
  },
  {
    id: 'test-5',
    name: 'Divya Iyer',
    avatar: avatar('testimonial-5'),
    destination: 'Kerala Backwaters, India',
    rating: 5,
    review: 'The houseboat stay was pure magic. Customer support helped us customize everything perfectly.',
  },
]
