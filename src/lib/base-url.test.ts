import { describe, expect, it } from 'vitest'

import { withBase } from './base-url'

describe('withBase', () => {
  it('prefixes the site base without duplicating slashes', () => {
    expect(withBase('sobre/', '/')).toBe('/sobre/')
    expect(withBase('sobre/', '/ianlgnk/')).toBe('/ianlgnk/sobre/')
    expect(withBase('/sobre/', '/ianlgnk/')).toBe('/ianlgnk/sobre/')
  })

  it('handles the root and hash links', () => {
    expect(withBase('', '/ianlgnk/')).toBe('/ianlgnk/')
    expect(withBase('#projetos', '/ianlgnk/')).toBe('/ianlgnk/#projetos')
  })
})
