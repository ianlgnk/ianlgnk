import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Check, Globe } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  SUPPORTED_LOCALES,
  useLocale,
  type Locale,
} from '@/components/locale-provider'
import { useMessages } from '@/locales/use-messages'
import { cn } from '@/lib/utils'

const LOCALE_FLAGS: Record<Locale, string> = {
  'pt-BR': '🇧🇷',
  'en-US': '🇺🇸',
}

const menuEase = [0.22, 1, 0.36, 1] as const

function subscribeHoverCapability(onStoreChange: () => void) {
  const mq = window.matchMedia('(hover: hover)')
  mq.addEventListener('change', onStoreChange)
  return () => mq.removeEventListener('change', onStoreChange)
}

function getHoverCapabilitySnapshot() {
  return window.matchMedia('(hover: hover)').matches
}

function getHoverCapabilityServerSnapshot() {
  return false
}

function usePrefersHover() {
  return useSyncExternalStore(
    subscribeHoverCapability,
    getHoverCapabilitySnapshot,
    getHoverCapabilityServerSnapshot,
  )
}

export function LanguageToggle() {
  const { locale, setLocale } = useLocale()
  const m = useMessages()
  const prefersHover = usePrefersHover()
  const reduced = useReducedMotion()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }

    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }

    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointerDown, true)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointerDown, true)
    }
  }, [open])

  const pick = (next: Locale) => {
    setLocale(next)
    setOpen(false)
  }

  const menuTransition = reduced
    ? { duration: 0.01 }
    : { duration: 0.22, ease: menuEase }

  return (
    <div
      ref={rootRef}
      className="relative"
      onMouseEnter={() => {
        if (prefersHover) setOpen(true)
      }}
      onMouseLeave={() => {
        if (prefersHover) setOpen(false)
      }}
      onBlur={(e) => {
        const next = e.relatedTarget as Node | null
        if (next && e.currentTarget.contains(next)) return
        setOpen(false)
      }}
    >
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={m.localeMenu.ariaButton}
        className="text-foreground"
        onFocus={() => {
          if (prefersHover) setOpen(true)
        }}
        onClick={() => {
          if (!prefersHover) setOpen((v) => !v)
        }}
      >
        <Globe className="size-5" />
      </Button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            key="locale-menu-panel"
            role="menu"
            aria-label={m.localeMenu.ariaButton}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={menuTransition}
            className={cn(
              'absolute right-0 z-[200] min-w-[220px] origin-top-right rounded-md border border-border bg-popover p-1 pt-1.5 text-popover-foreground shadow-md',
              'md:top-full md:mt-0',
              'max-md:bottom-full max-md:mb-0 max-md:origin-bottom-right',
            )}
          >
            {SUPPORTED_LOCALES.map((code) => (
              <button
                key={code}
                type="button"
                role="menuitemradio"
                aria-checked={locale === code}
                className={cn(
                  'flex w-full items-center gap-2.5 rounded-sm px-2.5 py-2 text-left text-sm transition-colors',
                  locale === code
                    ? 'bg-muted text-foreground'
                    : 'text-muted-foreground hover:bg-muted/80 hover:text-foreground',
                )}
                onClick={() => pick(code)}
              >
                <span className="text-base leading-none" aria-hidden>
                  {LOCALE_FLAGS[code]}
                </span>
                <span className="min-w-0 flex-1">
                  {code === 'pt-BR' ? m.localeMenu.ptBr : m.localeMenu.enUs}
                </span>
                {locale === code ? (
                  <Check className="size-4 shrink-0 text-primary" aria-hidden />
                ) : null}
              </button>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
