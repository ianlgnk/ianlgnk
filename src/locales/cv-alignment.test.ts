import { describe, expect, it } from 'vitest'

import { experience } from '@/data/experience'

import { messages } from './messages'

const en = messages['en-US']
const pt = messages['pt-BR']

describe('experience copy matches the English résumé', () => {
  it('uses the résumé roles', () => {
    const roles = Object.fromEntries(Object.entries(en.experience.items).map(([id, i]) => [id, i.role]))
    expect(roles).toEqual({
      'beerpass-senior': 'Senior Software Engineer & Architect',
      'beerpass-pleno': 'Software Engineer & Architect',
      'saude-pleno': 'Software Engineer',
      'saude-junior': 'Junior Software Engineer',
      'visao-junior': 'Web Developer',
    })
  })

  it('uses the résumé periods and durations', () => {
    const periods = Object.fromEntries(Object.entries(en.experience.items).map(([id, i]) => [id, i.period]))
    expect(periods).toEqual({
      'beerpass-senior': 'Jan/2026 – present',
      'beerpass-pleno': 'May/2023 – Jan/2026',
      'saude-pleno': 'Oct/2022 – Apr/2023',
      'saude-junior': 'Oct/2021 – Sep/2022',
      'visao-junior': 'Jun/2021 – Oct/2021',
    })
    expect(en.experience.items['visao-junior'].duration).toBe('5 months')
    expect(pt.experience.items['visao-junior'].duration).toBe('5 meses')
    expect(pt.experience.items['visao-junior'].period).toBe('Jun/2021 – Out/2021')
    expect(pt.experience.items['saude-junior'].period).toBe('Out/2021 – Set/2022')
  })

  it('lists the résumé stacks for Beerpass Club and Saúde Agora', () => {
    const tech = (id: string) => experience.find((e) => e.id === id)?.technologies
    expect(tech('beerpass-senior')).toEqual(['React Native', 'TypeScript', 'Kotlin', 'Java', 'Node.js', 'Firebase', 'Expo/EAS'])
    expect(tech('beerpass-pleno')).toEqual(['React Native', 'React', 'TypeScript', 'Node.js', 'Firebase', 'Kotlin', 'Swift'])
    expect(tech('saude-pleno')).toEqual(['Java', 'Hibernate', 'PostgreSQL', 'Vue.js', 'JavaScript'])
    expect(tech('saude-junior')).toEqual(['Java', 'Hibernate', 'PostgreSQL', 'Vue.js', 'JavaScript'])
  })

  it('introduces Ian as a Senior Software Engineer and Architect everywhere', () => {
    expect(en.about.summary.startsWith('Senior Software Engineer and Architect')).toBe(true)
    expect(pt.about.summary.startsWith('Engenheiro de Software e Arquiteto Sênior')).toBe(true)
    expect(en.document.home.description).toContain('Senior Software Engineer & Architect')
    expect(en.footer.whoamiOut).toContain('senior software engineer & architect')
    for (const text of [en.about.summary, pt.about.summary, en.document.home.description, pt.document.home.description]) {
      expect(text).not.toMatch(/full stack/i)
    }
  })

  it('names the technical degree as in the résumé (en-US)', () => {
    expect(en.about.education[1]).toEqual({
      title: 'Technical Degree in Web Development (integrated with high school)',
      institution: 'Federal Institute of Northern Minas Gerais (IFNMG)',
      period: '2017–2019',
    })
  })
})
