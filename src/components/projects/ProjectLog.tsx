import { useEffect, useState } from 'react'

import { ProjectMedia } from '@/components/projects/ProjectMedia'
import { toggleOpen } from '@/components/projects/toggle-open'
import { projects, type ProjectLink, type ProjectSlug } from '@/data/projects'
import { cn, sectionShell } from '@/lib/utils'
import { useMessages } from '@/locales/use-messages'

const LINK_LABEL_KEY = {
  site: 'site',
  'play-store': 'playStore',
  'app-store': 'appStore',
} as const satisfies Record<ProjectLink['kind'], 'site' | 'playStore' | 'appStore'>

function slugFromHash(): ProjectSlug | null {
  const hash = window.location.hash.slice(1)
  return projects.find((p) => p.slug === hash)?.slug ?? null
}

/** Seção de projetos: log expansível, um aberto por vez (o primeiro por padrão ou o do hash). */
export function ProjectLog() {
  const m = useMessages()
  const [open, setOpen] = useState<ProjectSlug | null>(() => slugFromHash() ?? projects[0].slug)

  useEffect(() => {
    const onHashChange = () => {
      const slug = slugFromHash()
      if (slug) setOpen(slug)
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return (
    <section id="projetos" aria-labelledby="projetos-title" className={cn('pb-16 sm:pb-24', sectionShell)}>
      <h2
        id="projetos-title"
        className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-accent sm:text-sm"
      >
        {m.projects.title}
      </h2>

      <ul>
        {projects.map((project, i) => {
          const isOpen = open === project.slug
          const copy = m.projects.items[project.slug]
          const buttonId = `${project.slug}-button`
          const panelId = `${project.slug}-panel`

          return (
            <li
              key={project.slug}
              id={project.slug}
              className={cn('scroll-mt-16 border-t', isOpen ? 'border-accent' : 'border-border')}
            >
              <h3>
                <button
                  type="button"
                  id={buttonId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(toggleOpen(open, project.slug))}
                  className="flex w-full items-baseline gap-3 py-3 text-left text-xs uppercase tracking-[0.12em] transition-colors hover:text-accent sm:gap-5 sm:text-sm"
                >
                  <span className="w-6 shrink-0 text-muted-foreground">{String(i + 1).padStart(2, '0')}</span>
                  <span className={cn('min-w-0 flex-1', isOpen && 'text-accent')}>{project.name}</span>
                  <span className="shrink-0 text-muted-foreground">{copy.short}</span>
                  <span aria-hidden className="shrink-0 text-accent">
                    {isOpen ? '▾' : '▸'}
                  </span>
                </button>
              </h3>

              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                inert={!isOpen}
                className={cn(
                  'grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none',
                  isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                )}
              >
                <div className="overflow-hidden">
                  <div className="grid gap-5 pb-6 pt-1 sm:grid-cols-[minmax(0,22rem)_1fr] sm:gap-8">
                    <ProjectMedia project={project} />
                    <div>
                      <p className="max-w-prose text-sm leading-relaxed text-foreground/90">
                        {copy.description}
                      </p>
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <li
                            key={tag}
                            className="border border-border px-2 py-0.5 text-[10px] uppercase tracking-[0.1em] text-muted-foreground"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-5 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.14em]">
                        {project.links.map((link) => (
                          <a
                            key={link.kind}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border border-accent px-3 py-1.5 text-accent transition-colors hover:bg-accent hover:text-accent-foreground"
                          >
                            {m.projects.links[LINK_LABEL_KEY[link.kind]]} ↗
                          </a>
                        ))}
                        {project.isPrivate ? (
                          <span className="text-muted-foreground">{m.projects.private}</span>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
