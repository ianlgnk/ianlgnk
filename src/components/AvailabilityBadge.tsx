import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

/** Pílula "disponível" com ponto que pulsa (só sem movimento reduzido). */
export function AvailabilityBadge({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2.5 border border-accent/40 bg-accent/10 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.14em] text-foreground',
        className,
      )}
    >
      <span className="relative flex size-2.5 shrink-0 items-center justify-center" aria-hidden>
        <span className="absolute inset-0 bg-accent/60 motion-safe:animate-ping" />
        <span className="relative size-2 bg-accent" />
      </span>
      {children}
    </div>
  )
}
