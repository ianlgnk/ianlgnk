import { describe, expect, it } from 'vitest'

import { messages } from './messages'

/** Caminhos de todas as strings de um objeto aninhado (ex.: `projects.items.inkaboxe.short`). */
function flatten(value: unknown, prefix = ''): Record<string, string> {
  if (typeof value === 'string') return { [prefix]: value }
  if (Array.isArray(value)) {
    return value.reduce<Record<string, string>>(
      (acc, item, i) => ({ ...acc, ...flatten(item, `${prefix}[${i}]`) }),
      {},
    )
  }
  if (value && typeof value === 'object') {
    return Object.entries(value).reduce<Record<string, string>>(
      (acc, [key, v]) => ({ ...acc, ...flatten(v, prefix ? `${prefix}.${key}` : key) }),
      {},
    )
  }
  return {}
}

describe('messages', () => {
  const pt = flatten(messages['pt-BR'])
  const en = flatten(messages['en-US'])

  it('has the same keys in both languages', () => {
    expect(Object.keys(pt).sort()).toEqual(Object.keys(en).sort())
  })

  it('has no empty strings (except experience responsibilities, which may be blank)', () => {
    for (const [key, value] of [...Object.entries(pt), ...Object.entries(en)]) {
      if (key.endsWith('.responsibilities')) continue
      expect(value.trim(), key).not.toBe('')
    }
  })

  it('describes Beerpass Club in both languages', () => {
    expect(messages['en-US'].projects.items['beerpass-club'].description).toContain('Beerpass Club')
    expect(messages['pt-BR'].projects.items['beerpass-club'].description).toContain('Beerpass Club')
  })

  it('gives each page its own document title', () => {
    for (const locale of ['pt-BR', 'en-US'] as const) {
      const { home, about } = messages[locale].document
      expect(home.title).not.toBe(about.title)
    }
  })

  it('has copy for all four projects', () => {
    expect(Object.keys(messages['en-US'].projects.items).sort()).toEqual([
      'avance-trainer',
      'beerpass-club',
      'inkaboxe',
      'pedro-porto-design',
    ])
  })
})
