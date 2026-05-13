/* eslint-disable react-refresh/only-export-components -- Provider + useLocale hook */
import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type Locale = 'pt-BR' | 'en-US'

export const SUPPORTED_LOCALES: readonly Locale[] = ['pt-BR', 'en-US']

const STORAGE_KEY = 'ianlgnk-locale'

function isLocale(value: string | null): value is Locale {
  return value === 'pt-BR' || value === 'en-US'
}

function readStoredLocale(): Locale {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (isLocale(raw)) return raw
  } catch {
    /* ignore */
  }
  return 'pt-BR'
}

function applyDomLocale(locale: Locale) {
  document.documentElement.lang = locale
}

type LocaleContextValue = {
  locale: Locale
  setLocale: (next: Locale) => void
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

/** Sincroniza `lang` no `<html>` e persiste preferência (chaves BCP 47). */
export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window === 'undefined') return 'pt-BR'
    return readStoredLocale()
  })

  useLayoutEffect(() => {
    applyDomLocale(locale)
  }, [locale])

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* ignore */
    }
  }, [])

  const value = useMemo(
    () => ({ locale, setLocale }),
    [locale, setLocale],
  )

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  )
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) {
    throw new Error('useLocale must be used within LocaleProvider')
  }
  return ctx
}
