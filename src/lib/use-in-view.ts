import { useEffect, useRef, useState, type RefObject } from 'react'

import { initialRevealed } from '@/lib/reveal'
import { useReducedMotion } from '@/lib/use-reduced-motion'

type Options = { once?: boolean; rootMargin?: string }

/**
 * `inView` fica `true` quando o elemento entra na viewport. Sem
 * `IntersectionObserver` ou com movimento reduzido já nasce `true`
 * (o conteúdo nunca fica preso invisível).
 */
export function useInView<T extends Element>({
  once = true,
  rootMargin = '0px',
}: Options = {}): { ref: RefObject<T | null>; inView: boolean } {
  const ref = useRef<T | null>(null)
  const reduced = useReducedMotion()
  const alwaysRevealed = initialRevealed(reduced, typeof IntersectionObserver !== 'undefined')
  const [observed, setObserved] = useState(false)

  useEffect(() => {
    if (alwaysRevealed) return
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setObserved(true)
          if (once) io.disconnect()
        } else if (!once) {
          setObserved(false)
        }
      },
      { rootMargin },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [alwaysRevealed, once, rootMargin])

  return { ref, inView: alwaysRevealed || observed }
}
