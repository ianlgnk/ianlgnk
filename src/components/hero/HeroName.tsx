import { useEffect, useRef, type CSSProperties } from 'react'

import { useReducedMotion } from '@/lib/use-reduced-motion'
import { cn } from '@/lib/utils'

type HeroNameProps = { name: string; className?: string }

/** Se o módulo ou a fonte demorarem mais que isso, o nome em CSS aparece no lugar. */
const PARTICLES_FALLBACK_MS = 2500

/**
 * Liga as partículas do nome (sem movimento reduzido). Módulo e fonte carregam em
 * paralelo com os pontos em CSS escondidos, para a entrada começar dos pontos
 * espalhados. Se passar de `PARTICLES_FALLBACK_MS`, o nome em CSS aparece e as
 * partículas assumem depois, sem entrada.
 */
function useNameParticles(h1: React.RefObject<HTMLHeadingElement | null>) {
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = h1.current
    const area = el?.closest('section')
    if (!el || !area || reduced) return

    let unmount: (() => void) | undefined
    let cancelled = false
    el.classList.add('particles-pending')
    const fallback = window.setTimeout(() => el.classList.remove('particles-pending'), PARTICLES_FALLBACK_MS)

    void Promise.all([
      import('@/components/hero/name-particles'),
      document.fonts.load(`700 1em ${getComputedStyle(el).fontFamily}`).catch(() => []),
    ])
      .then(([{ mountNameParticles }]) => {
        if (cancelled) return
        window.clearTimeout(fallback)
        unmount = mountNameParticles(el, area, { entrance: el.classList.contains('particles-pending') })
      })
      .catch(() => {})
      .finally(() => el.classList.remove('particles-pending'))

    return () => {
      cancelled = true
      window.clearTimeout(fallback)
      el.classList.remove('particles-pending')
      unmount?.()
    }
  }, [h1, reduced])
}

/**
 * Nome em dot-matrix, uma palavra por linha. O `h1` expõe o nome real; as
 * linhas visuais ficam fora da árvore de acessibilidade. O tamanho é
 * `clamp(2.25rem, 12.5vw, 8rem)`: a palavra mais longa (10 caracteres de
 * ~0,6em) cabe em 320 px de largura.
 */
export function HeroName({ name, className }: HeroNameProps) {
  const words = name.split(' ')
  const ref = useRef<HTMLHeadingElement>(null)
  useNameParticles(ref)

  return (
    <h1
      ref={ref}
      aria-label={name}
      className={cn(
        'mt-8 cursor-default select-none text-[clamp(2.25rem,12.5vw,8rem)] font-bold uppercase leading-[0.92] tracking-[0.02em] sm:mt-12',
        className,
      )}
    >
      {words.map((word, i) => (
        <span
          key={word}
          aria-hidden
          data-text={word}
          className="dotmatrix ignite scan block w-fit"
          style={{ '--word-delay': `${i * 0.25}s` } as CSSProperties}
        >
          {word}
        </span>
      ))}
    </h1>
  )
}
