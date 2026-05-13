import { useEffect, useState, type MouseEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  BriefcaseBusiness,
  FolderKanban,
  Home,
  Layers,
  Mail,
  Menu,
  UserRound,
  X,
  type LucideIcon,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ThemeToggle'
import { personal } from '@/data/personal'
import { cn, sectionPaddingX, sectionShell } from '@/lib/utils'

const links: readonly {
  href: string
  label: string
  icon: LucideIcon
}[] = [
  { href: '#hero', label: 'Início', icon: Home },
  { href: '#sobre', label: 'Sobre', icon: UserRound },
  { href: '#experiencia', label: 'Experiência', icon: BriefcaseBusiness },
  { href: '#projetos', label: 'Projetos', icon: FolderKanban },
  { href: '#habilidades', label: 'Habilidades', icon: Layers },
  { href: '#contato', label: 'Contato', icon: Mail },
]

/** Section `id`s matching `links` order — used for scroll spy. */
const navSectionIds = links.map((l) => l.href.slice(1))

/** ~fixed header (h-16) + small buffer so the line sits just below the bar. */
const SCROLL_SPY_TOP_PX = 72

function useActiveSectionId() {
  const [activeId, setActiveId] = useState(() => navSectionIds[0] ?? 'hero')

  useEffect(() => {
    const pickFromScroll = () => {
      let next = navSectionIds[0] ?? 'hero'
      for (const id of navSectionIds) {
        const el = document.getElementById(id)
        if (!el) continue
        if (el.getBoundingClientRect().top <= SCROLL_SPY_TOP_PX) next = id
      }
      setActiveId((prev) => (prev === next ? prev : next))
    }

    const onHashChange = () => {
      const raw = window.location.hash.slice(1)
      if (raw && navSectionIds.includes(raw)) setActiveId(raw)
    }

    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(pickFromScroll)
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(pickFromScroll)
    })

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    window.addEventListener('hashchange', onHashChange)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      window.removeEventListener('hashchange', onHashChange)
    }
  }, [])

  return activeId
}

const panelTransition = {
  duration: 0.28,
  ease: [0.22, 1, 0.36, 1] as const,
}

const listVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.055, delayChildren: 0.07 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -14 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] as const },
  },
}

function scrollToSectionId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  window.history.replaceState(null, '', `#${id}`)
}

export function Navbar() {
  const [open, setOpen] = useState(false)
  const activeSectionId = useActiveSectionId()

  const handleMobileNavClick =
    (href: string) => (e: MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault()
      const id = href.startsWith('#') ? href.slice(1) : href
      setOpen(false)
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          scrollToSectionId(id)
        })
      })
    }

  return (
    <header className="fixed inset-x-0 top-0 z-50 max-md:overflow-hidden border-b border-border/80 bg-background/80 backdrop-blur-md md:overflow-visible">
      <div
        className={cn(
          'flex h-16 items-center justify-between gap-4',
          sectionShell,
        )}
      >
        <a
          href="#hero"
          className={cn(
            'font-mono text-sm font-semibold tracking-tight transition-colors hover:text-primary sm:text-base',
            activeSectionId === 'hero'
              ? 'text-foreground'
              : 'text-muted-foreground',
          )}
          aria-current={activeSectionId === 'hero' ? 'true' : undefined}
          onClick={() => {
            queueMicrotask(() => setOpen(false))
          }}
        >
          {personal.handle}
          <span className="text-primary">.</span>
        </a>

        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Principal"
        >
          {links.map(({ href, label, icon: Icon }) => {
            const id = href.slice(1)
            const active = activeSectionId === id
            return (
              <a
                key={href}
                href={href}
                aria-current={active ? 'true' : undefined}
                className={cn(
                  'group inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors',
                  active
                    ? 'bg-muted text-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                )}
              >
                <Icon
                  className={cn(
                    'size-4 shrink-0 transition-colors',
                    active
                      ? 'text-primary'
                      : 'text-muted-foreground group-hover:text-primary',
                  )}
                  aria-hidden
                />
                {label}
              </a>
            )
          })}
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-expanded={open}
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            key="mobile-nav"
            id="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: panelTransition,
              opacity: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
            }}
            className="md:hidden overflow-hidden border-b border-border bg-background"
          >
            <motion.nav
              className={cn('flex flex-col pb-4 pt-1', sectionPaddingX)}
              aria-label="Mobile"
              variants={listVariants}
              initial="hidden"
              animate="visible"
            >
              {links.map(({ href, label, icon: Icon }) => {
                const id = href.slice(1)
                const active = activeSectionId === id
                return (
                  <a
                    key={href}
                    href={href}
                    aria-current={active ? 'true' : undefined}
                    onClick={handleMobileNavClick(href)}
                    className={cn(
                      'group text-sm transition-colors',
                      active
                        ? 'text-foreground'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                    )}
                  >
                    <motion.span
                      variants={itemVariants}
                      className={cn(
                        'inline-flex w-full items-center gap-3 rounded-md px-3 py-3',
                        active && 'bg-muted',
                      )}
                    >
                      <Icon
                        className={cn(
                          'size-5 shrink-0 transition-colors',
                          active
                            ? 'text-primary'
                            : 'text-muted-foreground group-hover:text-primary',
                        )}
                        aria-hidden
                      />
                      {label}
                    </motion.span>
                  </a>
                )
              })}
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
