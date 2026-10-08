import { useState } from 'react'
import { Plus } from 'lucide-react'

export default function FaqList({ items }) {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <div className="divide-y divide-gray-200 border-y border-gray-200">
      {items.map((item, i) => {
        const isOpen = openIndex === i
        return (
          <div key={item.q}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-4 py-5 text-left"
            >
              <span className="font-bold text-nexus">{item.q}</span>
              <Plus
                className={`w-5 h-5 text-impact shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
              />
            </button>
            <div
              className="grid transition-all duration-300"
              style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
            >
              <div className="overflow-hidden">
                <p className="pb-5 text-slateText leading-relaxed">{item.a}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}