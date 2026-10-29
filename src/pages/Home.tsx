import { DocumentMetaSync } from '@/components/DocumentMetaSync'
import { Header } from '@/components/Header'
import { Hero } from '@/components/hero/Hero'

export function Home() {
  return (
    <>
      <DocumentMetaSync page="home" />
      <Header current="home" />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <Hero />
      </main>
    </>
  )
}
