import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

/** Pílula "disponível" com ponto pulsante (Hero e Contato). */
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
        'inline-flex items-center gap-2.5 rounded-full border border-primary/35 bg-primary/10 px-3 py-1.5 text-sm font-medium text-foreground',
        className,
      )}
    >
      <span className="relative flex size-3 shrink-0 items-center justify-center">
        <span
          className="absolute -inset-1 rounded-full border border-primary/55 bg-primary/10 animate-pulse"
          aria-hidden
        />
        <span
          className="relative size-2.5 rounded-full border-2 border-primary bg-background shadow-[0_0_10px_hsl(var(--primary)_/_0.45)]"
          aria-hidden
        />
      </span>
      {children}
    </div>
  )
}
