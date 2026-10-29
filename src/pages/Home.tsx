import { DocumentMetaSync } from '@/components/DocumentMetaSync'
import { Contact } from '@/components/Contact'
import { Header } from '@/components/Header'
import { Hero } from '@/components/hero/Hero'
import { ProjectLog } from '@/components/projects/ProjectLog'
import { TerminalFooter } from '@/components/TerminalFooter'

export function Home() {
  return (
    <>
      <DocumentMetaSync page="home" />
      <Header current="home" />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <Hero />
        <ProjectLog />
        <Contact />
      </main>
      <TerminalFooter />
    </>
  )
}
