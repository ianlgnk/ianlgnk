import { useEffect, useState } from 'react'

import { AvailabilityBadge } from '@/components/AvailabilityBadge'
import { personal } from '@/data/personal'
import { copyText } from '@/lib/copy-text'
import { cn, sectionShell } from '@/lib/utils'
import { useMessages } from '@/locales/use-messages'

type CopyStatus = 'idle' | 'copied' | 'failed'

const outlineLink =
  'border border-border px-4 py-2.5 text-xs font-medium uppercase tracking-[0.14em] transition-colors hover:border-accent hover:text-accent'

/** Contato direto: copiar e-mail, LinkedIn e GitHub (sem formulário). */
export function Contact() {
  const m = useMessages()
  const [status, setStatus] = useState<CopyStatus>('idle')

  useEffect(() => {
    if (status !== 'copied') return
    const timer = window.setTimeout(() => setStatus('idle'), 2000)
    return () => window.clearTimeout(timer)
  }, [status])

  const onCopy = async () => {
    setStatus((await copyText(personal.email)) ? 'copied' : 'failed')
  }

  return (
    <section id="contato" aria-labelledby="contato-title" className={cn('scroll-mt-16 pb-16 sm:pb-24', sectionShell)}>
      <div className="border-t border-border pt-10">
        <AvailabilityBadge>{m.contact.badge}</AvailabilityBadge>

        <h2 id="contato-title" className="mt-6 text-2xl font-bold uppercase tracking-[0.06em] sm:text-4xl">
          {m.contact.title}
        </h2>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onCopy}
            className="bg-accent px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-accent-foreground transition-opacity hover:opacity-90 sm:text-sm"
          >
            {m.contact.copyEmail}
          </button>
          <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className={outlineLink}>
            {m.contact.linkedin} ↗
          </a>
          <a href={personal.github} target="_blank" rel="noopener noreferrer" className={outlineLink}>
            {m.contact.github} ↗
          </a>
        </div>

        <p className="mt-4 text-sm text-muted-foreground">
          <a href={`mailto:${personal.email}`} className="select-all underline-offset-4 hover:text-accent hover:underline">
            {personal.email}
          </a>
        </p>
        <p role="status" aria-live="polite" className="mt-2 min-h-5 text-xs uppercase tracking-[0.12em] text-accent">
          {status === 'copied' ? m.contact.copied : status === 'failed' ? m.contact.copyFailed : ''}
        </p>
      </div>
    </section>
  )
}
