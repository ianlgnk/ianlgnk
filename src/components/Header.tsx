import { LanguageToggle } from '@/components/LanguageToggle'
import { personal } from '@/data/personal'
import { withBase } from '@/lib/base-url'
import { cn, sectionShell } from '@/lib/utils'
import { useMessages } from '@/locales/use-messages'

/** Cabeçalho mínimo: handle, link para Sobre e idioma. Inclui o skip link. */
export function Header({ current }: { current: 'home' | 'about' }) {
  const m = useMessages()

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-accent-foreground"
      >
        {m.nav.skipToContent}
      </a>
      <header className="sticky top-0 z-40 border-b border-border bg-background">
        <div className={cn('flex h-14 items-center justify-between gap-4', sectionShell)}>
          <a
            href={withBase('')}
            aria-current={current === 'home' ? 'page' : undefined}
            className="text-sm font-bold uppercase tracking-[0.18em]"
          >
            {personal.handle}
            <span className="text-accent">.</span>
          </a>
          <nav className="flex items-center gap-4">
            <a
              href={withBase('sobre/')}
              aria-current={current === 'about' ? 'page' : undefined}
              className={cn(
                'text-xs font-medium uppercase tracking-[0.16em] transition-colors hover:text-accent',
                current === 'about' ? 'text-accent' : 'text-foreground',
              )}
            >
              {m.nav.about}
            </a>
            <LanguageToggle />
          </nav>
        </div>
      </header>
    </>
  )
}
