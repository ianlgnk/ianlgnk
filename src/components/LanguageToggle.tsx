import { useLocale, type Locale } from '@/components/locale-provider'
import { cn } from '@/lib/utils'
import { useMessages } from '@/locales/use-messages'

/** Dois botões PT | EN; o idioma atual fica em `aria-pressed`. */
export function LanguageToggle() {
  const { locale, setLocale } = useLocale()
  const m = useMessages()
  const options: readonly (readonly [Locale, string])[] = [
    ['pt-BR', m.localeMenu.ptBr],
    ['en-US', m.localeMenu.enUs],
  ]

  return (
    <div role="group" aria-label={m.nav.localeLabel} className="flex items-center gap-1">
      {options.map(([value, label]) => (
        <button
          key={value}
          type="button"
          aria-pressed={locale === value}
          onClick={() => setLocale(value)}
          className={cn(
            'border px-2 py-1 text-xs font-medium uppercase tracking-[0.14em] transition-colors',
            locale === value
              ? 'border-accent bg-accent text-accent-foreground'
              : 'border-border text-muted-foreground hover:text-foreground',
          )}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
