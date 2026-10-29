import { describe, expect, it } from 'vitest'

import { formatDuration, monthsSince } from './duration'

describe('monthsSince', () => {
  it('counts months inclusively from the start month to now', () => {
    expect(monthsSince({ year: 2026, month: 1 }, new Date(2026, 9, 29))).toBe(10)
    expect(monthsSince({ year: 2026, month: 1 }, new Date(2026, 0, 15))).toBe(1)
  })

  it('never goes below zero for a start in the future', () => {
    expect(monthsSince({ year: 2030, month: 1 }, new Date(2026, 0, 1))).toBe(0)
  })
})

describe('formatDuration', () => {
  it('formats months and years in en-US', () => {
    expect(formatDuration(10, 'en-US')).toBe('10 months')
    expect(formatDuration(1, 'en-US')).toBe('1 month')
    expect(formatDuration(12, 'en-US')).toBe('1 year')
    expect(formatDuration(33, 'en-US')).toBe('2 years 9 months')
  })

  it('formats months and years in pt-BR', () => {
    expect(formatDuration(5, 'pt-BR')).toBe('5 meses')
    expect(formatDuration(13, 'pt-BR')).toBe('1 ano e 1 mês')
    expect(formatDuration(33, 'pt-BR')).toBe('2 anos e 9 meses')
  })
})
