/// <reference types="node" />
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

import { messages } from './messages'

const root = path.resolve(import.meta.dirname, '../..')
const read = (file: string) => readFileSync(path.join(root, file), 'utf8')
const decode = (s: string) => s.replace(/&amp;/g, '&')

const pages = [
  { file: 'index.html', key: 'home' },
  { file: 'sobre/index.html', key: 'about' },
] as const

describe('HTML head stays in sync with messages', () => {
  for (const { file, key } of pages) {
    it(`${file}: en-US title, description and og:description`, () => {
      const html = read(file)
      const en = messages['en-US'].document[key]
      expect(decode(html.match(/<title>([^<]*)<\/title>/)![1])).toBe(en.title)
      expect(decode(html.match(/<meta name="description" content="([^"]*)"/)![1])).toBe(en.description)
      expect(decode(html.match(/<meta property="og:description" content="([^"]*)"/)![1])).toBe(en.description)
    })

    it(`${file}: pt-BR title and description in the inline script`, () => {
      const html = read(file)
      const pt = messages['pt-BR'].document[key]
      expect(html.match(/document\.title = "([^"]*)"/)![1]).toBe(pt.title)
      expect(html.match(/setAttribute\("content", "([^"]*)"\)/)![1]).toBe(pt.description)
    })
  }
})
