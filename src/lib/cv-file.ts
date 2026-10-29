import type { Locale } from '@/lib/locale'

/** Nome do PDF em `public/cv/` para cada idioma. */
export function cvFileFor(locale: Locale): string {
  return locale === 'pt-BR'
    ? 'Curriculo_Ian_Langkammer_Batista_PT.pdf'
    : 'Curriculo_Ian_Langkammer_Batista_US.pdf'
}
