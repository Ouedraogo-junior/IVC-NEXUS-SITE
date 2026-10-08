import { Plus } from 'lucide-react'

export default function FaqAccordion({ items }) {
  return (
    <div className="flex flex-col divide-y divide-gray-200 border-t border-b border-gray-200">
      {items.map((item) => (
        <details key={item.q} className="group py-4">
          <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-semibold text-nexus text-sm marker:content-none">
            <span>{item.q}</span>
            <Plus className="w-4 h-4 shrink-0 text-impact transition-transform duration-200 group-open:rotate-45" />
          </summary>
          <p className="text-sm text-slateText mt-3 leading-relaxed">{item.a}</p>
        </details>
      ))}
    </div>
  )
}