import { m as motion } from 'framer-motion'

import { personal } from '@/data/personal'
import { useMessages } from '@/locales/use-messages'

const ease = [0.22, 1, 0.36, 1] as const

const STACK = 'React · Node.js · TypeScript · React Native'

/**
 * Card decorativo estilo terminal (só no desktop). Todo o conteúdo já existe
 * em outras seções, por isso fica fora da árvore de acessibilidade.
 */
export function HeroTerminal() {
  const m = useMessages()

  const lines = [
    { cmd: 'whoami', out: `${personal.handle} — ${m.hero.roleTitle}` },
    { cmd: 'stack --list', out: STACK },
    { cmd: 'pwd', out: personal.location },
    { cmd: 'status', out: m.contact.badge, ok: true },
  ] as const

  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease, delay: 0.3 }}
      className="w-full overflow-hidden rounded-xl border border-border bg-card/70 shadow-lg shadow-black/10 backdrop-blur-sm"
    >
      <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-red-400/80" />
        <span className="size-2.5 rounded-full bg-amber-400/80" />
        <span className="size-2.5 rounded-full bg-primary/80" />
        <span className="ml-2 font-mono text-xs text-muted-foreground">
          {personal.handle}@portfolio:~
        </span>
      </div>

      <div className="space-y-4 p-5 font-mono text-xs leading-relaxed sm:text-sm">
        {lines.map((line, i) => (
          <motion.div
            key={line.cmd}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, ease, delay: 0.9 + i * 0.5 }}
          >
            <p className="text-muted-foreground">
              <span className="text-primary-text">$</span> {line.cmd}
            </p>
            <p
              className={
                'ok' in line && line.ok
                  ? 'mt-1 flex items-center gap-2 text-foreground'
                  : 'mt-1 text-foreground'
              }
            >
              {'ok' in line && line.ok ? (
                <span className="size-2 shrink-0 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary)_/_0.6)]" />
              ) : null}
              {line.out}
            </p>
          </motion.div>
        ))}

        <motion.p
          className="text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 + lines.length * 0.5 }}
        >
          <span className="text-primary-text">$</span>{' '}
          <span className="inline-block w-[0.55ch] animate-hero-cursor align-middle text-primary-text">
            ▌
          </span>
        </motion.p>
      </div>
    </motion.div>
  )
}
