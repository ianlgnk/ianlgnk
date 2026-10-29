/// <reference types="node" />
import { existsSync } from 'node:fs'
import path from 'node:path'
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

  it('uses https links; only Avance Trainer, Pedro Porto and Beerpass have real media for now', () => {
    for (const p of projects) {
      for (const l of p.links) expect(l.href.startsWith('https://')).toBe(true)
    }
    expect(projects.filter((p) => p.media).map((p) => p.slug)).toEqual([
      'avance-trainer',
      'pedro-porto-design',
      'beerpass-club',
    ])
  })

  it.each([
    ['avance-trainer', 'avance'],
    ['pedro-porto-design', 'pedro-porto'],
    ['beerpass-club', 'beerpass'],
  ])('gives %s a presentation video per locale, with files in public/', (slug, dir) => {
    const media = bySlug(slug)?.media
    expect(media?.type).toBe('video')
    if (media?.type !== 'video') return
    expect(media.sources['pt-BR']).toEqual({
      webm: `projects/${dir}/video-pt.webm`,
      mp4: `projects/${dir}/video-pt.mp4`,
      poster: `projects/${dir}/poster-pt.jpg`,
    })
    expect(media.sources['en-US']).toEqual({
      webm: `projects/${dir}/video-en.webm`,
      mp4: `projects/${dir}/video-en.mp4`,
      poster: `projects/${dir}/poster-en.jpg`,
    })
    for (const locale of ['pt-BR', 'en-US'] as const) {
      for (const file of Object.values(media.sources[locale])) {
        expect(existsSync(path.resolve(import.meta.dirname, '../../public', file)), file).toBe(true)
      }
    }
  })
})

describe('projects (names as in the résumé)', () => {
  it('calls the Pedro Porto project "Pedro Porto Studios"', () => {
    expect(bySlug('pedro-porto-design')?.name).toBe('Pedro Porto Studios')
  })
})
