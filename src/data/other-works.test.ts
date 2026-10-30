import { describe, expect, it } from 'vitest'

import { collegeRepos, otherWorks } from './other-works'

describe('otherWorks', () => {
  it('lists the react-native-mesmart library first, then Bastianetto Alessi (freelance, 2021) and the thesis', () => {
    expect(otherWorks.map((w) => w.id)).toEqual(['react-native-mesmart', 'bastianetto', 'tcc-ecommerce'])
    const b = otherWorks.find((w) => w.id === 'bastianetto')
    expect(b?.year).toBe('2021')
    expect(b?.links).toContainEqual({ label: 'bastianettoalessi.com.br', href: 'https://www.bastianettoalessi.com.br/' })
  })

  it('links the react-native-mesmart library to its public repository and npm package', () => {
    expect(otherWorks.find((w) => w.id === 'react-native-mesmart')?.links).toEqual([
      { label: 'github', href: 'https://github.com/ianlgnk/react-native-mesmart' },
      { label: 'npm', href: 'https://www.npmjs.com/package/react-native-mesmart' },
    ])
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
