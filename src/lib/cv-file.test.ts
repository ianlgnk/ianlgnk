/// <reference types="node" />
import { existsSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

import { cvFileFor } from './cv-file'

describe('cvFileFor', () => {
  it('picks the CV by locale', () => {
    expect(cvFileFor('pt-BR')).toBe('Curriculo_Ian_Langkammer_Batista_PT.pdf')
    expect(cvFileFor('en-US')).toBe('Curriculo_Ian_Langkammer_Batista_US.pdf')
  })

  it('points at files that exist in public/cv', () => {
    for (const locale of ['pt-BR', 'en-US'] as const) {
      expect(existsSync(path.resolve(import.meta.dirname, '../../public/cv', cvFileFor(locale)))).toBe(true)
    }
  })
})
