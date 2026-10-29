import { ScrambleText } from '@/components/ScrambleText'
import { requestOpen } from '@/components/projects/open-bus'
import { projects } from '@/data/projects'
import { useMessages } from '@/locales/use-messages'

/** Os 4 projetos como linhas de log numeradas; cada uma leva ao projeto (hash = slug). */
export function HeroLog() {
  const m = useMessages()

  return (
    <ul className="mt-8 text-xs uppercase tracking-[0.12em] sm:mt-12 sm:text-sm">
      {projects.map((project, i) => (
        <li
          key={project.slug}
          className="type-in border-t border-border"
          style={{ animationDelay: `${0.9 + i * 0.18}s` }}
        >
          <a
            href={`#${project.slug}`}
            onClick={() => requestOpen(project.slug)}
            className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 py-2.5 transition-colors hover:text-accent sm:flex-nowrap sm:gap-5"
          >
            <span className="w-6 shrink-0 text-muted-foreground">{String(i + 1).padStart(2, '0')}</span>
            <span className="min-w-0 flex-1">{project.name}</span>
            <span className="basis-full pl-9 text-accent sm:shrink-0 sm:basis-auto sm:pl-0"><ScrambleText text={m.projects.items[project.slug].short} /></span>
          </a>
        </li>
      ))}
    </ul>
  )
}
