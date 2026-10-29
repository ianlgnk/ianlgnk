import { MotionConfig } from 'framer-motion'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from '@/App.tsx'
import { LocaleProvider } from '@/components/locale-provider.tsx'
import { ThemeProvider } from '@/components/theme-provider.tsx'
import '@/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <LocaleProvider>
        <MotionConfig reducedMotion="user">
          <App />
        </MotionConfig>
      </LocaleProvider>
    </ThemeProvider>
  </StrictMode>,
)
