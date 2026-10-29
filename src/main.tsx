import { LazyMotion, MotionConfig } from 'framer-motion'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from '@/App.tsx'
import { LocaleProvider } from '@/components/locale-provider.tsx'
import { ThemeProvider } from '@/components/theme-provider.tsx'
import '@/index.css'

const loadMotionFeatures = () =>
  import('@/lib/motion-features').then((mod) => mod.default)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <LocaleProvider>
        <MotionConfig reducedMotion="user">
          <LazyMotion features={loadMotionFeatures} strict>
            <App />
          </LazyMotion>
        </MotionConfig>
      </LocaleProvider>
    </ThemeProvider>
  </StrictMode>,
)
