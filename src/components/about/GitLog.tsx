import { experience } from '@/data/experience'
import { useInView } from '@/lib/use-in-view'
import { cn } from '@/lib/utils'
import { useMessages } from '@/locales/use-messages'

/** Experiência como histórico de commits; o cargo atual é o `HEAD`. */
export function GitLog() {
  const m = useMessages()
  const { ref, inView } = useInView<HTMLOListElement>()

  return (
    <section aria-labelledby="gitlog-title">
      <h2 id="gitlog-title" className="text-xs font-medium tracking-[0.12em] text-accent sm:text-sm">
        {m.about.logLabel}
      </h2>

      <ol ref={ref} className="mt-6 ml-1 border-l border-border pl-6">
        {experience.map((entry, i) => {
          const copy = m.experience.items[entry.id]
          return (
            <li
              key={entry.id}
              className={cn('relative pb-8 last:pb-0', inView ? 'type-in' : 'opacity-0')}
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              <span
                aria-hidden
                className={cn(
                  'absolute -left-[30px] top-1 size-2.5 border',
                  entry.current ? 'border-accent bg-accent' : 'border-foreground bg-background',
                )}
              />
              <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground sm:text-xs">
                {entry.current ? <span className="text-accent">{m.about.headLabel} · </span> : null}
                {copy.period} · {copy.duration}
              </p>
              <h3 className="mt-1 text-sm font-bold uppercase tracking-[0.06em] sm:text-base">{copy.role}</h3>
              <p className="text-xs text-muted-foreground sm:text-sm">{entry.company}</p>
              {copy.responsibilities ? (
                <p className="mt-2 max-w-prose text-xs leading-relaxed text-foreground/80 sm:text-sm">
                  {copy.responsibilities}
                </p>
              ) : null}
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {entry.technologies.map((tech) => (
                  <li
                    key={tech}
                    className="border border-border px-1.5 py-0.5 text-[10px] uppercase tracking-[0.1em] text-muted-foreground"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
