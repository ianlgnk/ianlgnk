/* eslint-disable react-refresh/only-export-components -- Provider + useTheme hook */
import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { flushSync } from 'react-dom'

type Theme = 'light' | 'dark'

type ThemeContextValue = {
  theme: Theme
  toggleTheme: (event?: MouseEvent) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

const STORAGE_KEY = 'ianlgnk-theme'
const LEGACY_THEME_KEY = 'portfolio-theme'

function readStoredTheme(): Theme {
  try {
    let raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      raw = localStorage.getItem(LEGACY_THEME_KEY)
      if (raw === 'light' || raw === 'dark') {
        localStorage.setItem(STORAGE_KEY, raw)
      }
    }
    if (raw === 'light' || raw === 'dark') return raw
  } catch {
    /* ignore */
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

function applyDomTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
}

function getRevealCoordinates(event?: MouseEvent) {
  if (
    event &&
    (event.clientX !== 0 || event.clientY !== 0)
  ) {
    return { x: event.clientX, y: event.clientY }
  }
  return {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  }
}

/** Sincroniza classe `dark` no `<html>` e persiste preferência. */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'dark'
    return readStoredTheme()
  })
  useLayoutEffect(() => {
    applyDomTheme(theme)
  }, [theme])

  const toggleTheme = useCallback((event?: MouseEvent) => {
    const { x, y } = getRevealCoordinates(event)
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    const commit = () => {
      flushSync(() => {
        setTheme((prev) => {
          const next: Theme = prev === 'dark' ? 'light' : 'dark'
          try {
            localStorage.setItem(STORAGE_KEY, next)
          } catch {
            /* ignore */
          }
          return next
        })
      })
    }

    const startVT = document.startViewTransition
    if (typeof startVT === 'function') {
      document.documentElement.style.setProperty('--click-x', `${x}px`)
      document.documentElement.style.setProperty('--click-y', `${y}px`)
      startVT.call(document, commit)
      return
    }

    if (!reducedMotion) {
      document.documentElement.classList.add('theme-fallback-transitioning')
    }
    commit()
    if (!reducedMotion) {
      window.setTimeout(() => {
        document.documentElement.classList.remove(
          'theme-fallback-transitioning',
        )
      }, 320)
    }
  }, [])

  const value = useMemo(
    () => ({ theme, toggleTheme }),
    [theme, toggleTheme],
  )

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return ctx
}
