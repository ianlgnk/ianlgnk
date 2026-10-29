import { afterEach, describe, expect, it, vi } from 'vitest'

import { copyText } from './copy-text'

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('copyText', () => {
  it('writes to the clipboard and resolves true', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    vi.stubGlobal('navigator', { clipboard: { writeText } })

    await expect(copyText('ianlgnk@gmail.com')).resolves.toBe(true)
    expect(writeText).toHaveBeenCalledWith('ianlgnk@gmail.com')
  })

  it('resolves false when writeText rejects', async () => {
    const writeText = vi.fn().mockRejectedValue(new Error('denied'))
    vi.stubGlobal('navigator', { clipboard: { writeText } })

    await expect(copyText('x')).resolves.toBe(false)
  })

  it('resolves false when the clipboard API is missing', async () => {
    vi.stubGlobal('navigator', {})

    await expect(copyText('x')).resolves.toBe(false)
  })
})
