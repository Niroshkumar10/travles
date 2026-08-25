import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'

import { Button } from '@/components/ui/Button'
import { DatePicker } from '@/components/ui/DatePicker'
import { Select } from '@/components/ui/Select'

export function HeroSearch() {
  const navigate = useNavigate()
  const [destination, setDestination] = useState('')
  const [date, setDate] = useState(null)
  const [travelers, setTravelers] = useState('2')

  function handleSearch(e) {
    e.preventDefault()
    const params = new URLSearchParams()
    if (destination) params.set('search', destination)
    navigate(`/destinations?${params.toString()}`)
  }

  return (
    <form
      onSubmit={handleSearch}
      className="grid grid-cols-1 gap-3 rounded-card bg-white/95 p-4 shadow-modal backdrop-blur sm:grid-cols-2 lg:grid-cols-[2fr_1.4fr_1fr_auto] lg:p-3"
    >
      <div className="lg:border-r lg:border-border lg:pr-3">
        <label htmlFor="hero-destination" className="mb-1 block px-1 text-xs font-medium text-text-muted">
          Where do you want to go?
        </label>
        <input
          id="hero-destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Search destinations..."
          className="h-10 w-full rounded-control px-2 text-sm text-text focus-visible:outline-none"
        />
      </div>
      <div className="lg:border-r lg:border-border lg:pr-3">
        <label className="mb-1 block px-1 text-xs font-medium text-text-muted">Select Dates</label>
        <DatePicker value={date} onChange={setDate} placeholder="Add dates" />
      </div>
      <div className="lg:border-r lg:border-border lg:pr-3">
        <label htmlFor="hero-travelers" className="mb-1 block px-1 text-xs font-medium text-text-muted">
          Travelers
        </label>
        <Select id="hero-travelers" value={travelers} onChange={(e) => setTravelers(e.target.value)} className="border-0 px-2">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <option key={n} value={n}>
              {n} {n === 1 ? 'Traveler' : 'Travelers'}
            </option>
          ))}
        </Select>
      </div>
      <Button type="submit" size="lg" className="w-full lg:w-auto">
        <Search className="size-4" /> Search Trips
      </Button>
    </form>
  )
}
