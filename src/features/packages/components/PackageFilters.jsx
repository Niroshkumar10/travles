import { X } from 'lucide-react'

import { Badge } from '@/components/ui/Badge'
import { Select } from '@/components/ui/Select'
import { BUDGET_OPTIONS, DURATION_OPTIONS } from '@/constants/filters'
import { cn } from '@/lib/cn'

export function PackageFilters({ filters, onChange, onClearAll, className }) {
  const activeCount = (filters.budget ? 1 : 0) + (filters.duration ? 1 : 0) + (filters.minRating ? 1 : 0)

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
            <Badge className="gap-1.5">
              {BUDGET_OPTIONS.find((b) => b.value === filters.budget)?.label}
              <button type="button" onClick={() => onChange({ budget: '' })} aria-label="Remove budget filter">
                <X className="size-3" />
              </button>
            </Badge>
          )}
          {filters.duration && (
            <Badge className="gap-1.5">
              {DURATION_OPTIONS.find((d) => d.value === filters.duration)?.label}
              <button type="button" onClick={() => onChange({ duration: '' })} aria-label="Remove duration filter">
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
        <h3 className="mb-2 text-sm font-medium text-text">Duration</h3>
        <Select value={filters.duration} onChange={(e) => onChange({ duration: e.target.value })}>
          <option value="">Any duration</option>
          {DURATION_OPTIONS.map((d) => (
            <option key={d.value} value={d.value}>
              {d.label}
            </option>
          ))}
        </Select>
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
