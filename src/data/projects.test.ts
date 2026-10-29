import { describe, expect, it } from 'vitest'

import { projects } from './projects'

const bySlug = (slug: string) => projects.find((p) => p.slug === slug)

describe('projects', () => {
  it('lists the four projects in the order Ian chose, without Netracker', () => {
    expect(projects.map((p) => p.slug)).toEqual([
      'avance-trainer',
      'pedro-porto-design',
      'beerpass-club',
      'inkaboxe',
    ])
    expect(projects.some((p) => (p.slug as string) === 'netracker')).toBe(false)
  })

  it('links Avance Trainer and Pedro Porto Design to their sites', () => {
    expect(bySlug('avance-trainer')?.links).toContainEqual({
      kind: 'site',
      href: 'https://avancetrainer.com',
    })
    expect(bySlug('pedro-porto-design')?.links).toContainEqual({
      kind: 'site',
      href: 'https://pedroportodesign.online',
    })
  })

  it('links Beerpass Club to both stores', () => {
    const links = bySlug('beerpass-club')?.links
    expect(links).toContainEqual({
      kind: 'play-store',
      href: 'https://play.google.com/store/apps/details?id=com.beerpass.clientapp&hl=pt_BR',
    })
    expect(links).toContainEqual({
      kind: 'app-store',
      href: 'https://apps.apple.com/br/app/beerpass-club/id1605400165',
    })
  })

  it('marks InkaBoxe as private with no links', () => {
    const inkaboxe = bySlug('inkaboxe')
    expect(inkaboxe?.isPrivate).toBe(true)
    expect(inkaboxe?.links).toEqual([])
  })

  it('uses https links and has no real media yet (mock)', () => {
    for (const p of projects) {
      for (const l of p.links) expect(l.href.startsWith('https://')).toBe(true)
      expect(p.media).toBeUndefined()
    }
  })
})
