import { useLocale } from '@/components/locale-provider'

import { messages } from '@/locales/messages'

export function useMessages() {
  const { locale } = useLocale()
  return messages[locale]
}
