import { AboutBlock } from '@/components/about/AboutBlock'
import { GitLog } from '@/components/about/GitLog'
import { SkillBars } from '@/components/about/SkillBars'
import { DocumentMetaSync } from '@/components/DocumentMetaSync'
import { Header } from '@/components/Header'
import { TerminalFooter } from '@/components/TerminalFooter'
import { cn, sectionShell } from '@/lib/utils'
import { useMessages } from '@/locales/use-messages'

export function About() {
  const m = useMessages()

  return (
    <>
      <DocumentMetaSync page="about" />
      <Header current="about" />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <div className={cn('pb-20 pt-10 sm:pt-16', sectionShell)}>
          <h1 className="text-4xl font-bold uppercase tracking-[0.04em] sm:text-6xl">{m.about.title}</h1>
          <div className="mt-10 grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
            <GitLog />
            <div className="space-y-14">
              <AboutBlock />
              <SkillBars />
            </div>
          </div>
        </div>
      </main>
      <TerminalFooter />
    </>
  )
}
