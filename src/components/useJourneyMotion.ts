import { useEffect, useRef } from 'react'

// Entrance feedback is optional; every element is readable before observation.
export function useJourneyMotion() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root || !('IntersectionObserver' in window)) return
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let entranceObserver: IntersectionObserver | undefined

    const observeEntrances = () => {
      entranceObserver?.disconnect()
      if (reducedMotion.matches) return
      entranceObserver = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          ;(entry.target as HTMLElement).dataset.entered = 'true'
          entranceObserver?.unobserve(entry.target)
        }
      }, { threshold: 0.12 })
      root.querySelectorAll('[data-journey-reveal]:not([data-entered]), [data-home-scene]:not([data-entered])').forEach((element) => entranceObserver?.observe(element))
    }

    observeEntrances()
    reducedMotion.addEventListener('change', observeEntrances)
    return () => {
      entranceObserver?.disconnect()
      reducedMotion.removeEventListener('change', observeEntrances)
    }
  }, [])

  return { rootRef }
}
