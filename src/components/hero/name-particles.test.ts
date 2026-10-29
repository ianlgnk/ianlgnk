import { describe, expect, it } from 'vitest'

import {
  assembleDots,
  createDots,
  createRing,
  msUntilScan,
  sampleDots,
  scanCenter,
  scanTint,
  scatterStarts,
  stepDots,
  type Dot,
} from './name-particles'

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

describe('heat', () => {
  it('warms dots pushed by the pointer and cools them back to zero once they settle', () => {
    const dots = createDots([{ x: 100, y: 100 }])
    for (let i = 0; i < 5; i++) stepDots(dots, { x: 105, y: 100 })
    expect(dots[0].heat).toBeGreaterThan(0.5)

    let frames = 0
    while (stepDots(dots, null) && frames < 600) frames++
    expect(dots[0].heat).toBe(0)
  })
})

describe('shock rings', () => {
  it('pushes a dot outward when the expanding ring reaches it', () => {
    const dots = createDots([{ x: 160, y: 100 }])
    const rings = [createRing(100, 100, 500)]
    let maxX = 160
    for (let i = 0; i < 20; i++) {
      stepDots(dots, null, rings)
      maxX = Math.max(maxX, dots[0].x)
    }
    expect(maxX).toBeGreaterThan(163)
  })

  it('keeps the loop awake while a ring expands and drops the ring once it fades out', () => {
    const rings = [createRing(0, 0, 300)]
    expect(stepDots([], null, rings)).toBe(true)
    let frames = 0
    while (rings.length > 0 && frames < 1000) {
      stepDots([], null, rings)
      frames++
    }
    expect(rings).toHaveLength(0)
  })
})

describe('entrance (scattered dots come together)', () => {
  const home = { x: 100, y: 50 }
  const start = { x: 400, y: 300, delay: 0, phase: 0 }

  it('scatters starts over the whole area, each departing inside the stagger window', () => {
    const seq = [0.5, 0.25, 0.75, 0.1]
    let i = 0
    const [s] = scatterStarts(1, 200, 100, () => seq[i++])
    expect(s.x).toBe(100)
    expect(s.y).toBe(25)
    expect(s.delay).toBe(525)
    expect(s.phase).toBeCloseTo(0.628, 3)
  })

  it('holds dots near their scattered start at the beginning', () => {
    const dots = createDots([home])
    expect(assembleDots(dots, [start], 0)).toBe(true)
    expect(dist(dots[0], 400, 300)).toBeLessThanOrEqual(6.01)
  })

  it('has a dot halfway home and glowing pink in the middle of its flight', () => {
    const dots = createDots([home])
    assembleDots(dots, [start], 700 + 800)
    expect(dots[0].x).toBeGreaterThan(247)
    expect(dots[0].x).toBeLessThan(253)
    expect(dots[0].heat).toBeGreaterThan(0.9)
  })

  it('lands every dot exactly home and cream when the entrance ends, even the last to leave', () => {
    const dots = createDots([home, { x: 10, y: 10 }])
    const starts = [start, { x: 0, y: 0, delay: 700, phase: 1 }]
    expect(assembleDots(dots, starts, 3000)).toBe(false)
    expect(dots.map((d) => [d.x, d.y, d.heat])).toEqual([
      [100, 50, 0],
      [10, 10, 0],
    ])
  })
})

describe('pink sweep over the dots', () => {
  const word = { left: 0, width: 100 }

  it('waits for the name to come together before the first sweep', () => {
    expect(scanCenter(3399, 0, word)).toBeNull()
  })

  it('sweeps a word from half a word before it to half a word past it', () => {
    expect(scanCenter(3400, 0, word)).toBe(-50)
    expect(scanCenter(3400 + 1125, 0, word)).toBeCloseTo(50)
    expect(scanCenter(3400 + 2250, 0, word)).toBe(150)
  })

  it('rests between sweeps and repeats every 5 s', () => {
    expect(scanCenter(3400 + 3000, 0, word)).toBeNull()
    expect(scanCenter(3400 + 5000, 0, word)).toBe(-50)
  })

  it('starts the second word a quarter of a second after the first', () => {
    expect(scanCenter(3400, 1, word)).toBeNull()
    expect(scanCenter(3650, 1, word)).toBe(-50)
  })

  it('tints dots fully in the band core and fades them to nothing at its edges', () => {
    expect(scanTint(50, 50, 100)).toBe(1)
    expect(scanTint(56, 50, 100)).toBe(1)
    expect(scanTint(65, 50, 100)).toBeCloseTo(0.5)
    expect(scanTint(74, 50, 100)).toBe(0)
    expect(scanTint(200, 50, 100)).toBe(0)
  })

  it('says how long the loop can sleep until any word sweeps again', () => {
    expect(msUntilScan(1000, 2)).toBe(2400)
    expect(msUntilScan(3500, 2)).toBe(0)
    expect(msUntilScan(3400 + 2400, 2)).toBe(0)
    expect(msUntilScan(3400 + 3000, 2)).toBe(2000)
  })
})
