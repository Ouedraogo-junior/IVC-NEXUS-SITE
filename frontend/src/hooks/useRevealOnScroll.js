import { useEffect, useRef, useState } from 'react'

/**
 * Observe un élément et bascule `inView` à true dès qu'il entre dans le
 * viewport (une seule fois). À combiner avec les classes CSS .reveal,
 * .reveal-left ou .reveal-scale définies dans index.css :
 *
 *   const [ref, inView] = useRevealOnScroll()
 *   <div ref={ref} className={`reveal ${inView ? 'in-view' : ''}`}>...
 */
export function useRevealOnScroll(threshold = 0.15) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.unobserve(node)
        }
      },
      { threshold }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, inView]
}
