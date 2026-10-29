import { describe, expect, it } from 'vitest'

import { toggleOpen } from './toggle-open'

describe('toggleOpen', () => {
  it('opens a project when none is open', () => {
    expect(toggleOpen(null, 'inkaboxe')).toBe('inkaboxe')
  })

  it('closes the project when the open one is clicked again', () => {
    expect(toggleOpen('inkaboxe', 'inkaboxe')).toBeNull()
  })

  it('switches to another project (only one open at a time)', () => {
    expect(toggleOpen('avance-trainer', 'beerpass-club')).toBe('beerpass-club')
  })
})
