import { describe, expect, it } from 'vitest'

import { createDots, sampleDots, stepDots, type Dot } from './name-particles'

/** Imagem RGBA `w`×`h` com alfa 255 dentro do retângulo [x0, x1) × [y0, y1). */
function rgbaWithRect(w: number, h: number, x0: number, y0: number, x1: number, y1: number) {
  const data = new Uint8ClampedArray(w * h * 4)
  for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) data[(y * w + x) * 4 + 3] = 255
  return data
}

const dist = (d: Dot, x: number, y: number) => Math.hypot(d.x - x, d.y - y)

describe('sampleDots', () => {
  it('puts one dot at the center of each 5px cell that is inside the glyph', () => {
    const data = rgbaWithRect(20, 10, 0, 0, 10, 5)
    expect(sampleDots(data, 20, 10, 5)).toEqual([
      { x: 2.5, y: 2.5 },
      { x: 7.5, y: 2.5 },
    ])
  })

  it('returns nothing for an empty image', () => {
    expect(sampleDots(new Uint8ClampedArray(10 * 10 * 4), 10, 10, 5)).toEqual([])
  })
})

describe('stepDots', () => {
  it('pushes dots near the pointer away from it (like same-pole magnets)', () => {
    const dots = createDots([{ x: 100, y: 100 }])
    const before = dist(dots[0], 110, 100)
    stepDots(dots, { x: 110, y: 100 })
    stepDots(dots, { x: 110, y: 100 })
    expect(dist(dots[0], 110, 100)).toBeGreaterThan(before)
    expect(dots[0].x).toBeLessThan(100)
  })

  it('leaves dots far from the pointer in place and reports nothing moving', () => {
    const dots = createDots([{ x: 0, y: 0 }])
    expect(stepDots(dots, { x: 500, y: 500 })).toBe(false)
    expect(dots[0]).toMatchObject({ x: 0, y: 0 })
  })

  it('springs displaced dots back home once the pointer leaves, then settles', () => {
    const dots = createDots([{ x: 100, y: 100 }])
    for (let i = 0; i < 10; i++) stepDots(dots, { x: 105, y: 100 })
    expect(dist(dots[0], 100, 100)).toBeGreaterThan(5)

    let moving = true
    let frames = 0
    while (moving && frames < 600) {
      moving = stepDots(dots, null)
      frames++
    }
    expect(moving).toBe(false)
    expect(dist(dots[0], 100, 100)).toBeLessThan(0.1)
  })
})
