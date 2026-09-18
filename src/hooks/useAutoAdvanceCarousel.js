import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Carrousel "un slide à la fois" : avance automatiquement toutes les
 * `interval` ms vers le slide suivant (scroll-snap), tout en laissant
 * l'utilisateur swiper à la main à tout moment. Le défilement auto se met
 * en pause dès qu'il touche l'écran, et reprend après `resumeDelay` ms
 * d'inactivité, en repartant du slide où il s'est arrêté.
 *
 *   const { ref, index, goTo } = useAutoAdvanceCarousel(items.length)
 *   <div ref={ref} className="overflow-x-auto snap-x snap-mandatory flex">
 *     {items.map((item) => <div className="w-full shrink-0 snap-center">...)}
 *   </div>
 */
export function useAutoAdvanceCarousel(itemCount, { interval = 4000, resumeDelay = 3000 } = {}) {
  const ref = useRef(null)
  const [index, setIndex] = useState(0)
  const pausedRef = useRef(false)
  const resumeTimeout = useRef(null)

  // Avance automatique
  useEffect(() => {
    if (itemCount <= 1) return
    const timer = setInterval(() => {
      if (!pausedRef.current) setIndex((i) => (i + 1) % itemCount)
    }, interval)
    return () => clearInterval(timer)
  }, [itemCount, interval])

  // Scrolle vers le slide courant à chaque changement d'index
  useEffect(() => {
    const node = ref.current
    if (!node) return
    node.scrollTo({ left: index * node.clientWidth, behavior: 'smooth' })
  }, [index])

  // Pause au toucher, reprise après inactivité (synchronisée sur la position réelle)
  useEffect(() => {
    const node = ref.current
    if (!node) return

    const pause = () => {
      pausedRef.current = true
      clearTimeout(resumeTimeout.current)
    }
    const scheduleResume = () => {
      clearTimeout(resumeTimeout.current)
      resumeTimeout.current = setTimeout(() => {
        const current = ref.current
        if (current && current.clientWidth > 0) {
          setIndex(Math.round(current.scrollLeft / current.clientWidth))
        }
        pausedRef.current = false
      }, resumeDelay)
    }

    node.addEventListener('pointerdown', pause)
    node.addEventListener('touchstart', pause, { passive: true })
    node.addEventListener('pointerup', scheduleResume)
    node.addEventListener('touchend', scheduleResume)
    node.addEventListener('scroll', scheduleResume, { passive: true })

    return () => {
      clearTimeout(resumeTimeout.current)
      node.removeEventListener('pointerdown', pause)
      node.removeEventListener('touchstart', pause)
      node.removeEventListener('pointerup', scheduleResume)
      node.removeEventListener('touchend', scheduleResume)
      node.removeEventListener('scroll', scheduleResume)
    }
  }, [resumeDelay])

  const goTo = useCallback((i) => setIndex(((i % itemCount) + itemCount) % itemCount), [itemCount])

  return { ref, index, goTo }
}