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
