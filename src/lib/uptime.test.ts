import { describe, expect, it } from 'vitest'

import { formatUptime } from './uptime'

describe('formatUptime', () => {
  it('formats seconds as HH:MM:SS', () => {
    expect(formatUptime(0)).toBe('00:00:00')
    expect(formatUptime(207)).toBe('00:03:27')
    expect(formatUptime(3661)).toBe('01:01:01')
  })

  it('truncates decimals', () => {
    expect(formatUptime(12.9)).toBe('00:00:12')
  })

  it('returns zero for negative or NaN input', () => {
    expect(formatUptime(-4)).toBe('00:00:00')
    expect(formatUptime(Number.NaN)).toBe('00:00:00')
  })
})
