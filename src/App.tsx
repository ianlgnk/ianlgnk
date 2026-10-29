import { useEffect, useLayoutEffect } from 'react'

import { useMessages } from '@/locales/use-messages'

import { About } from '@/components/About'
import { Contact } from '@/components/Contact'
import { Experience } from '@/components/Experience'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'
import { Navbar } from '@/components/Navbar'
import { Projects } from '@/components/Projects'
import { Skills } from '@/components/Skills'

import { DocumentMetaSync } from '@/components/DocumentMetaSync'

function scrollToHashElement() {
  const raw = window.location.hash.slice(1)
  if (!raw) return
  const id = decodeURIComponent(raw)
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function App() {
  const m = useMessages()

  useLayoutEffect(() => {
    scrollToHashElement()
  }, [])

  useEffect(() => {
    const onHashChange = () => scrollToHashElement()
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return (
    <div className="min-h-dvh bg-background">
      <DocumentMetaSync />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground focus:shadow-lg focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
      >
        {m.nav.skipToContent}
      </a>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="outline-hidden">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
