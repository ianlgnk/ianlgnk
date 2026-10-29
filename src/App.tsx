import { lazy, Suspense, useEffect, useLayoutEffect } from 'react'

import { useMessages } from '@/locales/use-messages'

import { Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'
import { Navbar } from '@/components/Navbar'

import { DocumentMetaSync } from '@/components/DocumentMetaSync'

/** Seções abaixo da dobra: chunks separados, pré-carregados logo após o primeiro paint. */
const sectionImports = {
  about: () => import('@/components/About'),
  experience: () => import('@/components/Experience'),
  projects: () => import('@/components/Projects'),
  skills: () => import('@/components/Skills'),
  contact: () => import('@/components/Contact'),
}

const About = lazy(() => sectionImports.about().then((m) => ({ default: m.About })))
const Experience = lazy(() =>
  sectionImports.experience().then((m) => ({ default: m.Experience })),
)
const Projects = lazy(() =>
  sectionImports.projects().then((m) => ({ default: m.Projects })),
)
const Skills = lazy(() => sectionImports.skills().then((m) => ({ default: m.Skills })))
const Contact = lazy(() =>
  sectionImports.contact().then((m) => ({ default: m.Contact })),
)

/** Mantém o `id` (scroll spy / âncoras) e reserva altura enquanto o chunk carrega. */
function SectionFallback({ id }: { id: string }) {
  return <section id={id} className="min-h-[60vh]" aria-hidden />
}

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
    const preload = () => {
      void Promise.all(Object.values(sectionImports).map((load) => load())).then(
        () => {
          // Se a URL abriu numa âncora, reposiciona depois do layout final.
          if (window.location.hash) requestAnimationFrame(scrollToHashElement)
        },
      )
    }
    // Safari não tem requestIdleCallback.
    const hasIdle = 'requestIdleCallback' in window
    const handle = hasIdle
      ? window.requestIdleCallback(preload, { timeout: 1500 })
      : window.setTimeout(preload, 400)
    return () => {
      if (hasIdle) window.cancelIdleCallback(handle)
      else window.clearTimeout(handle)
    }
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
        <Suspense fallback={<SectionFallback id="sobre" />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionFallback id="experiencia" />}>
          <Experience />
        </Suspense>
        <Suspense fallback={<SectionFallback id="projetos" />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<SectionFallback id="habilidades" />}>
          <Skills />
        </Suspense>
        <Suspense fallback={<SectionFallback id="contato" />}>
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

export default App
