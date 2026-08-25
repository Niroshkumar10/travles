import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Bot, MessageCircle, Send, X } from 'lucide-react'

import { Button } from '@/components/ui/Button'
import { ROUTES } from '@/constants/routes'

const QUICK_ACTIONS = [
  { label: 'Plan a Trip', reply: "Tell me a destination or vibe (beach, mountains, honeymoon) and I'll suggest packages once this is connected to live trip data." },
  { label: 'Find Destinations', reply: 'You can browse all destinations with filters for budget, interests, and travel type on the Destinations page.' },
  { label: 'Find Travel Deals', reply: 'Check the Packages page and filter by "Price: Low to High" to see our best current deals.' },
  { label: 'Help With Booking', reply: 'Open any package and select "Book Now" — I\'ll walk alongside you through dates, travelers, and payment.' },
  { label: 'Manage My Booking', reply: 'Head to My Trips to view, manage, or cancel an existing booking.' },
  { label: 'Talk to Support', reply: 'You can reach our human support team any time from the Support page.' },
]

export function AiAssistantWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { id: 'welcome', from: 'ai', text: "Hi! I'm the Wayfarer assistant. Ask me something or pick a quick action below." },
  ])
  const [input, setInput] = useState('')
  const [thinking, setThinking] = useState(false)

  function respond(userText, scriptedReply) {
    setMessages((prev) => [...prev, { id: Date.now(), from: 'user', text: userText }])
    setThinking(true)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          from: 'ai',
          text:
            scriptedReply ??
            "This is a scripted demo assistant for v1 — it isn't connected to a real AI model yet. Try one of the quick actions below.",
        },
      ])
      setThinking(false)
    }, 700)
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open travel assistant"
        className="fixed bottom-5 right-5 z-40 flex size-14 items-center justify-center rounded-full bg-primary-600 text-white shadow-modal hover:bg-primary-700"
      >
        <MessageCircle className="size-6" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-end sm:items-end sm:p-5">
          <div className="absolute inset-0 bg-slate-900/30 sm:hidden" onClick={() => setOpen(false)} />
          <div className="relative flex h-[min(32rem,85vh)] w-full flex-col rounded-t-card border border-border bg-surface shadow-modal sm:h-[32rem] sm:w-96 sm:rounded-card">
            <div className="flex items-center justify-between border-b border-border p-4">
              <div className="flex items-center gap-2">
                <Bot className="size-5 text-primary-600" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-text">Wayfarer Assistant</p>
                  <p className="text-xs text-text-subtle">Scripted demo — not a live AI</p>
                </div>
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close assistant" className="rounded-control p-1.5 hover:bg-slate-100">
                <X className="size-4" />
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={
                    m.from === 'ai'
                      ? 'max-w-[85%] rounded-card rounded-tl-none bg-slate-100 px-3.5 py-2.5 text-sm text-text'
                      : 'ml-auto max-w-[85%] rounded-card rounded-tr-none bg-primary-600 px-3.5 py-2.5 text-sm text-white'
                  }
                >
                  {m.text}
                </div>
              ))}
              {thinking && <div className="text-xs text-text-subtle">Assistant is typing…</div>}
            </div>

            <div className="flex flex-wrap gap-1.5 border-t border-border p-3">
              {QUICK_ACTIONS.map((action) => (
                <button
                  key={action.label}
                  type="button"
                  onClick={() => respond(action.label, action.reply)}
                  className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-text-muted hover:border-primary-300 hover:text-primary-700"
                >
                  {action.label}
                </button>
              ))}
            </div>

            <form
              className="flex items-center gap-2 border-t border-border p-3"
              onSubmit={(e) => {
                e.preventDefault()
                if (!input.trim()) return
                respond(input)
                setInput('')
              }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about a destination..."
                aria-label="Message the assistant"
                className="h-10 flex-1 rounded-control border border-border bg-surface px-3 text-sm focus-visible:border-primary-500 focus-visible:outline-none"
              />
              <Button type="submit" size="sm" aria-label="Send message">
                <Send className="size-4" />
              </Button>
            </form>
            <p className="border-t border-border px-4 py-2 text-center text-[11px] text-text-subtle">
              Need a person instead? <Link to={ROUTES.support} onClick={() => setOpen(false)} className="text-primary-700 underline">Contact support</Link>
            </p>
          </div>
        </div>
      )}
    </>
  )
}
