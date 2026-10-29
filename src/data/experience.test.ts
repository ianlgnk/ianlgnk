import { describe, expect, it } from 'vitest'

import { experience } from './experience'

describe('experience', () => {
  it('is ordered most recent first', () => {
    expect(experience.map((e) => e.id)).toEqual([
      'beerpass-senior',
      'beerpass-pleno',
      'saude-pleno',
      'saude-junior',
      'visao-junior',
    ])
  })

  it('marks only the first entry as current', () => {
    expect(experience.filter((e) => e.current).map((e) => e.id)).toEqual(['beerpass-senior'])
  })
})

describe('experience (current role)', () => {
  it('records the start month of the current role so its duration is computed, not typed', () => {
    expect(experience[0].since).toEqual({ year: 2026, month: 1 })
    expect(experience.slice(1).every((e) => e.since === undefined)).toBe(true)
  })
})
