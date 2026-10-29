import { describe, expect, it } from 'vitest'

import { collegeRepos, otherWorks } from './other-works'

describe('otherWorks', () => {
  it('lists Bastianetto Alessi (freelance, 2021) and the thesis', () => {
    expect(otherWorks.map((w) => w.id)).toEqual(['bastianetto', 'tcc-ecommerce'])
    const b = otherWorks.find((w) => w.id === 'bastianetto')
    expect(b?.year).toBe('2021')
    expect(b?.links).toContainEqual({ label: 'bastianettoalessi.com.br', href: 'https://www.bastianettoalessi.com.br/' })
  })

  it('links the thesis to the published monograph and its two repositories', () => {
    const hrefs = otherWorks.find((w) => w.id === 'tcc-ecommerce')?.links.map((l) => l.href)
    expect(hrefs).toEqual([
      'https://monografias.ufop.br/handle/35400000/7416',
      'https://github.com/ianlgnk/tcc',
      'https://github.com/ianlgnk/tcc-cloudfunctions',
    ])
  })
})

describe('collegeRepos', () => {
  it('has the 13 repositories, all on github.com/ianlgnk with https demos', () => {
    expect(collegeRepos).toHaveLength(13)
    for (const r of collegeRepos) {
      expect(r.href).toBe(`https://github.com/ianlgnk/${r.id}`)
      if (r.demo) expect(r.demo.startsWith('https://')).toBe(true)
    }
    expect(new Set(collegeRepos.map((r) => r.id)).size).toBe(13)
  })
})
