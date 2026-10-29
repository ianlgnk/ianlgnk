export type Locale = 'pt-BR' | 'en-US'

export const DEFAULT_LOCALE: Locale = 'en-US'

export function isLocale(value: unknown): value is Locale {
  return value === 'pt-BR' || value === 'en-US'
}

/** Valor salvo (ou ausente/inválido) → locale válido. */
export function resolveLocale(raw: string | null): Locale {
  return isLocale(raw) ? raw : DEFAULT_LOCALE
}
