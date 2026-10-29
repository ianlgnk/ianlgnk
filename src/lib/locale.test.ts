import { describe, expect, it } from 'vitest'

import { DEFAULT_LOCALE, resolveLocale } from './locale'

describe('resolveLocale', () => {
  it('defaults to en-US when nothing is stored', () => {
    expect(DEFAULT_LOCALE).toBe('en-US')
    expect(resolveLocale(null)).toBe('en-US')
  })

  it('keeps a valid stored locale', () => {
    expect(resolveLocale('pt-BR')).toBe('pt-BR')
    expect(resolveLocale('en-US')).toBe('en-US')
  })

  it('falls back to en-US for invalid values', () => {
    expect(resolveLocale('xx')).toBe('en-US')
    expect(resolveLocale('')).toBe('en-US')
  })
})
