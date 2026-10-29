import { useLayoutEffect } from 'react'

import { useLocale } from '@/components/locale-provider'
import { useMessages } from '@/locales/use-messages'

/** Mantém `<title>` e `meta[name=description]` da página alinhados ao idioma. */
export function DocumentMetaSync({ page }: { page: 'home' | 'about' }) {
  const { locale } = useLocale()
  const { title, description } = useMessages().document[page]

  useLayoutEffect(() => {
    document.title = title
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', description)
  }, [locale, title, description])

  return null
}
