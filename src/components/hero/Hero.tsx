import { HeroLog } from '@/components/hero/HeroLog'
import { HeroName } from '@/components/hero/HeroName'
import { personal } from '@/data/personal'
import { withBase } from '@/lib/base-url'
import { cn, sectionShell } from '@/lib/utils'
import { useMessages } from '@/locales/use-messages'

export function Hero() {
  const m = useMessages()

  return (
    <section className={cn('pb-16 pt-8 sm:pb-24 sm:pt-12', sectionShell)}>
      <div className="flex items-center justify-between gap-4 text-[10px] uppercase tracking-[0.14em] text-muted-foreground sm:text-xs">
        <span>{m.hero.tag}</span>
        <span className="text-accent">
          <span aria-hidden>● </span>
          {m.hero.online}
        </span>
      </div>

      <HeroName name={personal.name} />
      <HeroLog />

      <a
        href={withBase('sobre/')}
        className="mt-10 inline-flex items-center gap-3 bg-accent px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-accent-foreground transition-opacity hover:opacity-90 sm:text-sm"
      >
        {m.hero.cta}
        <span aria-hidden className="cursor" style={{ background: 'var(--accent-foreground)' }} />
      </a>
    </section>
  )
}
