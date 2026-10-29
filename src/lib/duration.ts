import type { Locale } from '@/lib/locale'

type YearMonth = { year: number; month: number }

/** Meses corridos do mês de início até `now`, contando os dois meses (inclusivo); nunca negativo. */
export function monthsSince(since: YearMonth, now: Date): number {
  const months = (now.getFullYear() - since.year) * 12 + (now.getMonth() + 1 - since.month) + 1
  return Math.max(0, months)
}

/** `33` → "2 years 9 months" / "2 anos e 9 meses". */
export function formatDuration(totalMonths: number, locale: Locale): string {
  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12
  const pt = locale === 'pt-BR'
  const y = pt ? (years === 1 ? 'ano' : 'anos') : years === 1 ? 'year' : 'years'
  const m = pt ? (months === 1 ? 'mês' : 'meses') : months === 1 ? 'month' : 'months'

  if (years === 0) return `${months} ${m}`
  if (months === 0) return `${years} ${y}`
  return `${years} ${y}${pt ? ' e ' : ' '}${months} ${m}`
}
