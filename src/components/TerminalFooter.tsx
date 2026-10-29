import { useEffect, useState } from 'react'

import { formatUptime } from '@/lib/uptime'
import { useInView } from '@/lib/use-in-view'
import { cn, sectionShell } from '@/lib/utils'
import { useMessages } from '@/locales/use-messages'

const secondsSincePageLoad = () => Math.floor(performance.now() / 1000)

/**
 * Footer em "prompt de terminal": whoami / uptime / exit. As linhas digitam
 * ao entrar na viewport; o contador de uptime só roda enquanto o footer está
 * visível (inclusive com movimento reduzido: o relógio é informação, não animação).
 */
export function TerminalFooter() {
  const m = useMessages()
  const { ref, inView } = useInView<HTMLElement>({ once: false })
  const [seconds, setSeconds] = useState(secondsSincePageLoad)
  // `inView` nasce `true` com movimento reduzido (só para revelar o conteúdo); o relógio precisa
  // da visibilidade real, senão ficaria parado em 00:00:00 ou rodaria fora da tela.
  const [visible, setVisible] = useState(() => typeof IntersectionObserver === 'undefined')

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting))
    io.observe(el)
    return () => io.disconnect()
  }, [ref])

  useEffect(() => {
    if (!visible) return
    const tick = () => setSeconds(secondsSincePageLoad())
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [visible])

  const line = (index: number) => ({
    className: inView ? 'type-in' : 'opacity-0',
    style: { animationDelay: `${index * 0.45}s` },
  })

  return (
    <footer ref={ref} className={cn('pb-10', sectionShell)}>
      <div className="border border-border p-4 text-xs leading-7 sm:p-6 sm:text-sm">
        <p {...line(0)}>
          <span className="text-accent">$</span> whoami
        </p>
        <p {...line(1)} className={cn(line(1).className, 'text-muted-foreground')}>
          {m.footer.whoamiOut}
        </p>
        <p {...line(2)} className={cn(line(2).className, 'mt-2')}>
          <span className="text-accent">$</span> uptime
        </p>
        <p {...line(3)} className={cn(line(3).className, 'text-muted-foreground')}>
          {m.footer.uptimePrefix} <span className="text-foreground">{formatUptime(seconds)}</span> · build{' '}
          {__BUILD_VERSION__}
        </p>
        <p {...line(4)} className={cn(line(4).className, 'mt-2')}>
          <span className="text-accent">$</span> exit
        </p>
        <p {...line(5)} className={cn(line(5).className, 'text-accent')}>
          {m.footer.exit} <span aria-hidden className="cursor" />
        </p>
      </div>
    </footer>
  )
}
