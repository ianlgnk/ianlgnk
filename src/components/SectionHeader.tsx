import { motion } from 'framer-motion'

import { ScrambleText } from '@/components/ScrambleText'
import { cn } from '@/lib/utils'

const easeOut = [0.22, 1, 0.36, 1] as const

const view = { once: true, margin: '-80px' as const }

type SectionHeaderProps = {
  title: string
  titleStaggerMs?: number
  subtitle?: string
  subtitleStaggerMs?: number
  /**
   * `true` quando o cabeçalho não está dentro de um container que já faz o
   * reveal (fade + y); evita animar duas vezes o mesmo texto.
   */
  reveal?: boolean
  className?: string
}

/** Eyebrow mono + linha que "desenha" + subtítulo opcional, igual em todas as seções. */
export function SectionHeader({
  title,
  titleStaggerMs,
  subtitle,
  subtitleStaggerMs,
  reveal = false,
  className,
}: SectionHeaderProps) {
  return (
    <div className={className}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
        <motion.h2
          initial={reveal ? { opacity: 0, y: 16 } : false}
          whileInView={reveal ? { opacity: 1, y: 0 } : undefined}
          viewport={view}
          transition={{ duration: 0.4, ease: easeOut }}
          className="shrink-0 font-mono text-sm font-semibold uppercase tracking-[0.2em] text-primary-text"
        >
          <ScrambleText text={title} staggerMs={titleStaggerMs} />
        </motion.h2>
        <motion.div
          className="h-px flex-1 origin-left bg-primary sm:max-w-xl"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={view}
          transition={{ duration: 0.75, ease: easeOut, delay: 0.12 }}
          aria-hidden
        />
      </div>
      {subtitle ? (
        <p className={cn('mt-3 max-w-2xl text-muted-foreground')}>
          <ScrambleText text={subtitle} staggerMs={subtitleStaggerMs} />
        </p>
      ) : null}
    </div>
  )
}
