import { useLayoutEffect } from 'react'

import { useLocale } from '@/components/locale-provider'
import { useMessages } from '@/locales/use-messages'

/** Mantém `<title>` e `meta[name=description]` alinhados ao locale (SPA). */
export function DocumentMetaSync() {
  const { locale } = useLocale()
  const m = useMessages()

  useLayoutEffect(() => {
    document.title = m.document.title
    const meta = document.querySelector('meta[name="description"]')
    if (meta) {
      meta.setAttribute('content', m.document.description)
    }
  }, [locale, m.document.title, m.document.description])

  return null
}
