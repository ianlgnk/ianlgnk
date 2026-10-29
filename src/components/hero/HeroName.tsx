import { useEffect, useRef, type CSSProperties } from 'react'

import { useReducedMotion } from '@/lib/use-reduced-motion'
import { cn } from '@/lib/utils'

type HeroNameProps = { name: string; className?: string }

/**
 * Liga as partículas que fogem do cursor no primeiro movimento do mouse sobre o Hero
 * (só com mouse e sem movimento reduzido). O módulo é carregado sob demanda e só entra
 * depois da animação de entrada, para não cortá-la.
 */
function useNameParticles(h1: React.RefObject<HTMLHeadingElement | null>) {
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = h1.current
    const area = el?.closest('section')
    if (!el || !area || reduced || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    let unmount: (() => void) | undefined
    let cancelled = false

    const start = async () => {
      area.removeEventListener('pointermove', start)
      const [{ mountNameParticles }] = await Promise.all([
        import('@/components/hero/name-particles'),
        document.fonts.ready,
        ...el.getAnimations({ subtree: true })
          .filter((a) => (a as CSSAnimation).animationName === 'ignite')
          .map((a) => a.finished.catch(() => {})),
      ])
      if (!cancelled) unmount = mountNameParticles(el, area)
    }

    area.addEventListener('pointermove', start)
    return () => {
      cancelled = true
      area.removeEventListener('pointermove', start)
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
