import { useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState, type ElementType } from 'react'

import { randomGlyph } from '@/lib/scramble-glyphs'
import { cn } from '@/lib/utils'
import { SCRAMBLE_DURATION_MS } from '@/locales/scramble-stagger'

type ScrambleTextProps = {
  text: string
  className?: string
  /** Delay before scramble starts when `text` updates (locale wave). */
  staggerMs?: number
  durationMs?: number
  as?: ElementType
}

/**
 * On first paint shows `text` immediately. When `text` changes (e.g. locale),
 * runs the same left-to-right reveal as `HeroName`.
 *
 * Re-runs of this effect with the same `text` (e.g. parent state updates, Strict Mode,
 * or `durationMs` / `staggerMs` changes) do not re-trigger the scramble — only a new
 * string does.
 */
export function ScrambleText({
  text,
  className,
  staggerMs = 0,
  durationMs = SCRAMBLE_DURATION_MS,
  as: Component = 'span',
}: ScrambleTextProps) {
  const reduced = useReducedMotion()
  const first = useRef(true)
  /** Last `text` we committed to display or animated from (avoids spurious re-scrambles). */
  const prevTextRef = useRef<string | null>(null)
  const [display, setDisplay] = useState(text)

  useEffect(() => {
    if (reduced) {
      prevTextRef.current = text
      queueMicrotask(() => {
        setDisplay(text)
      })
      return
    }

    if (first.current) {
      first.current = false
      prevTextRef.current = text
      queueMicrotask(() => {
        setDisplay(text)
      })
      return
    }

    if (prevTextRef.current === text) {
      queueMicrotask(() => {
        setDisplay(text)
      })
      return
    }

    prevTextRef.current = text

    const chars = Array.from(text)
    let raf = 0

    const startTick = () => {
      if (chars.length === 0) {
        queueMicrotask(() => {
          setDisplay('')
        })
        return
      }

      const start = performance.now()

      const tick = () => {
        const elapsed = performance.now() - start
        const t = Math.min(1, elapsed / durationMs)
        const reveal = Math.floor(t * chars.length)

        const out = chars.map((c, i) => {
          if (c === ' ') return ' '
          return i < reveal ? c : randomGlyph()
        })
        setDisplay(out.join(''))

        if (t < 1) {
          raf = requestAnimationFrame(tick)
        } else {
          setDisplay(text)
        }
      }

      raf = requestAnimationFrame(tick)
    }

    const timeout = setTimeout(startTick, staggerMs)

    return () => {
      clearTimeout(timeout)
      cancelAnimationFrame(raf)
    }
  }, [text, reduced, staggerMs, durationMs])

  return <Component className={cn(className)}>{display}</Component>
}
