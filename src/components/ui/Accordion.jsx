import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

import { cn } from '@/lib/cn'

/** items: { id, title, content }[] */
export function Accordion({ items, defaultOpenId, allowMultiple = false, className }) {
  const [openIds, setOpenIds] = useState(() => new Set(defaultOpenId ? [defaultOpenId] : []))

  function toggle(id) {
    setOpenIds((prev) => {
      const next = allowMultiple ? new Set(prev) : new Set()
      if (prev.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  return (
    <div className={cn('divide-y divide-border rounded-card border border-border', className)}>
      {items.map((item) => {
        const isOpen = openIds.has(item.id)
        return (
          <div key={item.id}>
            <h3>
              <button
                type="button"
                onClick={() => toggle(item.id)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left text-sm font-medium text-text hover:bg-primary-50/50"
              >
                {item.title}
                <ChevronDown
                  className={cn('size-4 shrink-0 text-text-subtle transition-transform', isOpen && 'rotate-180')}
                  aria-hidden="true"
                />
              </button>
            </h3>
            {isOpen && <div className="px-4 pb-4 text-sm text-text-muted">{item.content}</div>}
          </div>
        )
      })}
    </div>
  )
}
