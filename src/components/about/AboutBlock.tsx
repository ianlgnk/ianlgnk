import { useLocale } from '@/components/locale-provider'
import { withBase } from '@/lib/base-url'
import { cvFileFor } from '@/lib/cv-file'
import { useMessages } from '@/locales/use-messages'

/** Resumo, formação, download do CV (por idioma) e volta para a Home. */
export function AboutBlock() {
  const { locale } = useLocale()
  const m = useMessages()
  const cvFile = cvFileFor(locale)

  return (
    <section aria-labelledby="bio-title">
      <h2 id="bio-title" className="text-xs font-medium uppercase tracking-[0.18em] text-accent sm:text-sm">
        {m.about.bioTitle}
      </h2>

      <p className="mt-5 text-sm font-bold uppercase tracking-[0.08em]">{m.about.sinceLine}</p>
      <p className="mt-3 max-w-prose text-sm leading-relaxed text-foreground/90">{m.about.summary}</p>

      <ul className="mt-6">
        {m.about.education.map((item) => (
          <li key={item.title} className="border-t border-border py-2.5 text-xs sm:text-sm">
            <p className="font-medium">{item.title}</p>
            <p className="text-muted-foreground">
              {item.institution} · {item.period}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <a
          href={withBase(`cv/${cvFile}`)}
          download={cvFile}
          className="bg-accent px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-accent-foreground transition-opacity hover:opacity-90"
        >
          {m.about.downloadCv}
        </a>
        <a
          href={withBase('')}
          className="border border-border px-4 py-2.5 text-xs font-medium uppercase tracking-[0.14em] transition-colors hover:border-accent hover:text-accent"
        >
          <span aria-hidden>← </span>
          {m.about.backHome}
        </a>
      </div>
    </section>
  )
}
