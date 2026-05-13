import { useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

import { randomGlyph } from '@/lib/scramble-glyphs'
import { cn } from '@/lib/utils'

type HeroNameProps = {
  name: string
  className?: string
}

/** Scramble ~1s no mount + gradiente animado no texto final. */
export function HeroName({ name, className }: HeroNameProps) {
  const reduced = useReducedMotion()
  const [text, setText] = useState(() =>
    reduced
      ? name
      : Array.from(name)
          .map((c) => (c === ' ' ? ' ' : randomGlyph()))
          .join(''),
  )

  useEffect(() => {
    if (reduced) {
      queueMicrotask(() => {
        setText(name)
      })
      return
    }

    const chars = Array.from(name)
    if (chars.length === 0) {
      queueMicrotask(() => {
        setText('')
      })
      return
    }

    let raf = 0
    const duration = 1000
    const start = performance.now()

    const tick = () => {
      const elapsed = performance.now() - start
      const t = Math.min(1, elapsed / duration)
      const reveal = Math.floor(t * chars.length)

      const out = chars.map((c, i) => {
        if (c === ' ') return ' '
        return i < reveal ? c : randomGlyph()
      })
      setText(out.join(''))

      if (t < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setText(name)
      }
    }

    raf = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(raf)
  }, [reduced, name])

  return (
    <h1
      className={cn(
        'font-mono text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl',
        className,
      )}
    >
      <span
        className="inline-block bg-gradient-to-r from-primary via-foreground to-primary bg-[length:200%_auto] bg-clip-text text-transparent animate-hero-name-gradient"
        aria-label={name}
      >
        {text}
      </span>
    </h1>
  )
}
