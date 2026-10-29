import { DocumentMetaSync } from '@/components/DocumentMetaSync'
import { Header } from '@/components/Header'
import { TerminalFooter } from '@/components/TerminalFooter'
import { cn, sectionShell } from '@/lib/utils'

export function About() {
  return (
    <>
      <DocumentMetaSync page="about" />
      <Header current="about" />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <div className={cn('py-16', sectionShell)}>About</div>
      </main>
      <TerminalFooter />
    </>
  )
}
