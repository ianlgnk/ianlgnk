import { motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useTheme } from '@/components/theme-provider'
import { useMessages } from '@/locales/use-messages'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const m = useMessages()
  const isDark = theme === 'dark'

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={(e) => toggleTheme(e.nativeEvent)}
      aria-label={
        isDark ? m.theme.ariaUseLight : m.theme.ariaUseDark
      }
      className="text-foreground transition-colors hover:text-primary"
    >
      <motion.span
        key={isDark ? 'sun' : 'moon'}
        initial={{ rotate: -180, scale: 0 }}
        animate={{ rotate: 0, scale: 1 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="inline-flex"
      >
        {isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
      </motion.span>
    </Button>
  )
}
