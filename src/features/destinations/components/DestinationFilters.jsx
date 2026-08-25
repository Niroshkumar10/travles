import { X } from 'lucide-react'

import { Badge } from '@/components/ui/Badge'
import { Checkbox } from '@/components/ui/Checkbox'
import { Select } from '@/components/ui/Select'
import { BUDGET_OPTIONS, INTEREST_OPTIONS } from '@/constants/filters'
import { cn } from '@/lib/cn'

export function DestinationFilters({ filters, onChange, onClearAll, className }) {
  const activeCount =
    (filters.budget ? 1 : 0) + filters.interests.length + (filters.domestic !== '' ? 1 : 0) + (filters.minRating ? 1 : 0)

  function toggleInterest(interest) {
    const next = filters.interests.includes(interest)
      ? filters.interests.filter((i) => i !== interest)
      : [...filters.interests, interest]
    onChange({ interests: next })
  }

  return (
    <div className={cn('space-y-6', className)}>
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-text">Filters</h2>
        {activeCount > 0 && (
          <button type="button" onClick={onClearAll} className="text-xs font-medium text-primary-700 hover:underline">
            Clear All
          </button>
        )}
      </div>

      {activeCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.budget && (
            <Badge variant="default" className="gap-1.5">
              {BUDGET_OPTIONS.find((b) => b.value === filters.budget)?.label}
              <button type="button" onClick={() => onChange({ budget: '' })} aria-label="Remove budget filter">
                <X className="size-3" />
              </button>
            </Badge>
          )}
          {filters.interests.map((i) => (
            <Badge key={i} variant="default" className="gap-1.5 capitalize">
              {i}
              <button type="button" onClick={() => toggleInterest(i)} aria-label={`Remove ${i} filter`}>
                <X className="size-3" />
              </button>
            </Badge>
          ))}
          {filters.domestic !== '' && (
            <Badge variant="default" className="gap-1.5">
              {filters.domestic === 'true' ? 'Domestic' : 'International'}
              <button type="button" onClick={() => onChange({ domestic: '' })} aria-label="Remove domestic filter">
                <X className="size-3" />
              </button>
            </Badge>
          )}
        </div>
      )}

      <div>
        <h3 className="mb-2 text-sm font-medium text-text">Budget</h3>
        <Select value={filters.budget} onChange={(e) => onChange({ budget: e.target.value })}>
          <option value="">Any budget</option>
          {BUDGET_OPTIONS.map((b) => (
            <option key={b.value} value={b.value}>
              {b.label}
            </option>
          ))}
        </Select>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-medium text-text">Domestic / International</h3>
        <Select value={filters.domestic} onChange={(e) => onChange({ domestic: e.target.value })}>
          <option value="">Both</option>
          <option value="true">Domestic</option>
          <option value="false">International</option>
        </Select>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-medium text-text">Interests</h3>
        <div className="space-y-2">
          {INTEREST_OPTIONS.map((interest) => (
            <Checkbox
              key={interest}
              id={`interest-${interest}`}
              label={<span className="capitalize">{interest}</span>}
              checked={filters.interests.includes(interest)}
              onChange={() => toggleInterest(interest)}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-medium text-text">Minimum Rating</h3>
        <Select value={filters.minRating} onChange={(e) => onChange({ minRating: e.target.value })}>
          <option value="">Any rating</option>
          <option value="4.5">4.5+</option>
          <option value="4">4.0+</option>
          <option value="3.5">3.5+</option>
        </Select>
      </div>
    </div>
  )
}
