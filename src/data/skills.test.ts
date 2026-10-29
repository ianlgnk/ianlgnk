import { describe, expect, it } from 'vitest'

import { skillCategories } from './skills'

describe('skillCategories', () => {
  it('keeps every proficiency between 0 and 100', () => {
    for (const c of skillCategories) {
      for (const s of c.skills) {
        expect(s.proficiency).toBeGreaterThanOrEqual(0)
        expect(s.proficiency).toBeLessThanOrEqual(100)
      }
    }
  })

  it('has no duplicate skill names', () => {
    const names = skillCategories.flatMap((c) => c.skills.map((s) => s.name))
    expect(new Set(names).size).toBe(names.length)
  })

  it('has the five categories, without icon fields', () => {
    expect(skillCategories.map((c) => c.id)).toEqual([
      'languages',
      'frontend',
      'backend',
      'tools',
      'methodologies',
    ])
    expect(JSON.stringify(skillCategories)).not.toContain('simpleIcon')
  })
})
