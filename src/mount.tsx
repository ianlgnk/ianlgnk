import { StrictMode, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'

import { LocaleProvider } from '@/components/locale-provider'
import '@/index.css'

/** Ponto de montagem comum às duas páginas (cada HTML chama com a sua). */
export function mount(page: ReactNode) {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <LocaleProvider>{page}</LocaleProvider>
    </StrictMode>,
  )
}
