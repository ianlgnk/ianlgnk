import { describe, expect, it } from 'vitest'

import { levelSquares } from './skill-level'

describe('levelSquares', () => {
  it('maps proficiency 0-100 to 0-10 squares, rounding to nearest', () => {
    expect(levelSquares(95)).toBe(10)
    expect(levelSquares(80)).toBe(8)
    expect(levelSquares(45)).toBe(5)
    expect(levelSquares(0)).toBe(0)
  })

  it('clamps out-of-range and NaN to 0-10', () => {
    expect(levelSquares(130)).toBe(10)
    expect(levelSquares(-5)).toBe(0)
    expect(levelSquares(Number.NaN)).toBe(0)
  })
})
