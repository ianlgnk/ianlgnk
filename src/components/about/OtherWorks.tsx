import { collegeRepos, otherWorks, type WorkLink } from '@/data/other-works'
import { useMessages } from '@/locales/use-messages'

const linkClass = 'underline-offset-4 transition-colors hover:text-accent hover:underline'

function ExternalLink({ link }: { link: WorkLink }) {
  return (
    <a href={link.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
      {link.label} ↗
    </a>
  )
}

/** Trabalhos fora do currículo principal: só texto e links, sem mídia. */
export function OtherWorks() {
  const t = useMessages().about.otherWorks

  return (
    <section aria-labelledby="other-title" className="mt-20 border-t border-border pt-10">
      <h2 id="other-title" className="text-xs font-medium uppercase tracking-[0.18em] text-accent sm:text-sm">
        {t.title}
      </h2>

      <ul className="mt-5 grid gap-6 md:grid-cols-2">
        {otherWorks.map((work) => (
          <li key={work.id} className="border border-border p-4">
            <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground sm:text-xs">
              {work.id === 'bastianetto' ? `${t.freelance} · ` : ''}
              {work.year}
            </p>
            <h3 className="mt-1 text-sm font-bold uppercase tracking-[0.06em]">{work.name}</h3>
            <p className="mt-2 max-w-prose text-xs leading-relaxed text-foreground/80 sm:text-sm">{t.items[work.id]}</p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {work.tags.map((tag) => (
                <li key={tag} className="border border-border px-1.5 py-0.5 text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
                  {tag}
                </li>
              ))}
            </ul>
            <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs uppercase tracking-[0.1em]">
              {work.links.map((link) => (
                <ExternalLink key={link.href} link={link} />
              ))}
            </p>
          </li>
        ))}
      </ul>

      <details className="group mt-6 border border-border">
        <summary className="flex cursor-pointer list-none items-baseline justify-between gap-3 p-4 text-xs font-medium uppercase tracking-[0.14em] hover:text-accent">
          <span>
            {t.collegeTitle} · {collegeRepos.length}
          </span>
          <span aria-hidden className="text-accent group-open:rotate-90">▸</span>
        </summary>
        <div className="border-t border-border px-4 pb-4 pt-3">
          <p className="text-xs text-muted-foreground">{t.collegeIntro}</p>
          <ul className="mt-3">
            {collegeRepos.map((repo) => (
              <li key={repo.id} className="grid gap-1 border-t border-border py-2 text-xs sm:grid-cols-[14rem_1fr] sm:gap-4">
                <span className="flex flex-wrap gap-x-3">
                  <ExternalLink link={{ label: repo.id, href: repo.href }} />
                  {'demo' in repo && repo.demo ? <ExternalLink link={{ label: t.demo, href: repo.demo }} /> : null}
                </span>
                <span className="text-muted-foreground">{t.college[repo.id]}</span>
              </li>
            ))}
          </ul>
        </div>
      </details>
    </section>
  )
}
