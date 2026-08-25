// Static fixture data for v1 (no backend). Shape: see src/types/review.js
const avatar = (seed) => `https://picsum.photos/seed/${seed}/100/100`

const names = [
  'Ananya Sharma', 'Rohit Verma', 'Priya Nair', 'Arjun Mehta', 'Sneha Patil',
  'Karan Malhotra', 'Divya Iyer', 'Vikram Singh', 'Neha Gupta', 'Aditya Rao',
  'Ishita Kapoor', 'Rahul Desai',
]

function makeReviews(targetType, targetId, seed, count, comments) {
  const reviews = []
  for (let i = 0; i < count; i++) {
    const name = names[(seed + i) % names.length]
    reviews.push({
      id: `rev-${targetId}-${i}`,
      targetType,
      targetId,
      userId: `user-seed-${seed}-${i}`,
      userName: name,
      userAvatar: avatar(`${targetId}-${i}`),
      rating: [5, 5, 4, 5, 4, 3][i % 6],
      title: comments[i % comments.length].title,
      comment: comments[i % comments.length].body,
      createdAt: new Date(Date.now() - i * 12 * 24 * 60 * 60 * 1000).toISOString(),
      helpfulCount: (i * 7) % 40,
      verified: i % 3 !== 0,
    })
  }
  return reviews
}

/** @type {import('@/types/review').Review[]} */
export const reviews = [
  ...makeReviews('destination', 'dest-bali', 1, 5, [
    { title: 'Absolutely magical', body: 'Bali exceeded every expectation — Ubud alone is worth the trip. Our guide was fantastic.' },
    { title: 'Perfect honeymoon spot', body: 'Quiet villas, great food, and the sunset at Uluwatu was unforgettable.' },
    { title: 'Would go again', body: 'Traffic can be intense but the island itself is stunning. Highly recommend Nusa Penida.' },
    { title: 'Great for families too', body: 'We travelled with kids and it worked out beautifully, lots of easy activities.' },
    { title: 'Loved the culture', body: 'Temples, dance shows, and the food scene were all incredible.' },
  ]),
  ...makeReviews('destination', 'dest-goa', 2, 4, [
    { title: 'Fun weekend trip', body: 'Great beaches and nightlife, exactly what we needed for a short break.' },
    { title: 'Beautiful but crowded', body: 'North Goa gets busy in peak season, but South Goa was calm and lovely.' },
    { title: 'Water sports were a blast', body: 'Parasailing and jet-skiing were the highlight of our trip.' },
    { title: 'Good value', body: 'Affordable and easy to get around, great for a quick escape.' },
  ]),
  ...makeReviews('package', 'pkg-bali-honeymoon', 3, 4, [
    { title: 'Worth every rupee', body: 'The sunset cruise and private dinner made our honeymoon unforgettable.' },
    { title: 'Seamless planning', body: 'Every transfer was on time and the villa was even better than the photos.' },
    { title: 'Romantic and relaxing', body: 'Loved the pace of the itinerary — never felt rushed.' },
    { title: 'Great concierge support', body: 'Had a small hiccup with a booking and it was resolved within the hour.' },
  ]),
  ...makeReviews('package', 'pkg-manali-adventure', 4, 3, [
    { title: 'Adrenaline-packed', body: 'Paragliding and rafting in one trip — couldn\'t ask for more.' },
    { title: 'Great for groups', body: 'We went with 6 friends and the itinerary kept everyone entertained.' },
    { title: 'Camping night was the best part', body: 'Bonfire, stars, and good company. Loved it.' },
  ]),
  ...makeReviews('destination', 'dest-santorini', 5, 3, [
    { title: 'Dream destination', body: 'The caldera views are even better in person. Worth saving up for.' },
    { title: 'Best sunset ever', body: 'Oia sunset lived up to the hype completely.' },
    { title: 'Pricey but memorable', body: 'A splurge, but one of our best trips ever.' },
  ]),
  ...makeReviews('package', 'pkg-rajasthan-heritage', 6, 3, [
    { title: 'Rich in history', body: 'The forts and palaces were breathtaking, guide was very knowledgeable.' },
    { title: 'Well organized', body: 'Transfers between cities were smooth and on schedule.' },
    { title: 'Loved Udaipur', body: 'The lake palace views were the highlight of the whole trip.' },
  ]),
]

export function getReviewsFor(targetType, targetId) {
  return reviews.filter((r) => r.targetType === targetType && r.targetId === targetId)
}
