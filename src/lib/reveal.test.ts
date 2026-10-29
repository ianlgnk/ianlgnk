import { describe, expect, it } from 'vitest'

import { initialRevealed } from './reveal'

describe('initialRevealed', () => {
  it('shows content immediately under reduced motion', () => {
    expect(initialRevealed(true, true)).toBe(true)
  })

  it('shows content immediately when IntersectionObserver is missing', () => {
    expect(initialRevealed(false, false)).toBe(true)
  })

  it('waits for the observer otherwise', () => {
    expect(initialRevealed(false, true)).toBe(false)
  })
})
