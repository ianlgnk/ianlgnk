import { useEffect, useLayoutEffect } from 'react'

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
      <Navbar />
      <main>
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
