import { describe, expect, it, vi } from 'vitest'

import { onOpenRequest, requestOpen } from './open-bus'

describe('open-bus', () => {
  it('delivers an open request even when the same project was requested before', () => {
    const handler = vi.fn()
    const off = onOpenRequest(handler)

    requestOpen('avance-trainer')
    requestOpen('avance-trainer')

    expect(handler).toHaveBeenCalledTimes(2)
    expect(handler).toHaveBeenLastCalledWith('avance-trainer')
    off()
  })

  it('stops delivering after unsubscribe', () => {
    const handler = vi.fn()
    const off = onOpenRequest(handler)
    off()

    requestOpen('inkaboxe')

    expect(handler).not.toHaveBeenCalled()
  })
})
