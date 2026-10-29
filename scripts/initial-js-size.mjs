// Mede o JS inicial de uma página do build (script + modulepreload) em gzip.
// Uso: node scripts/initial-js-size.mjs dist/index.html   (falha se passar de 106000 B)
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { gzipSync } from 'node:zlib'

const LIMIT_BYTES = 106_000

const htmlPath = process.argv[2]
if (!htmlPath) {
  console.error('uso: node scripts/initial-js-size.mjs <dist/index.html>')
  process.exit(2)
}

const html = readFileSync(htmlPath, 'utf8')
const distDir = path.resolve(path.dirname(htmlPath), htmlPath.includes('sobre') ? '..' : '.')
const refs = [
  ...html.matchAll(/<script[^>]*type="module"[^>]*src="([^"]+)"/g),
  ...html.matchAll(/<link[^>]*rel="modulepreload"[^>]*href="([^"]+)"/g),
].map((m) => m[1])

let total = 0
for (const ref of new Set(refs)) {
  const file = path.join(distDir, ref.replace(/^.*?\/assets\//, 'assets/'))
  const size = gzipSync(readFileSync(file), { level: 9 }).length
  console.log(`${String(size).padStart(7)} B  ${path.basename(file)}`)
  total += size
}

console.log(`initial JS: ${total} B gzip (limit ${LIMIT_BYTES})`)
process.exit(total <= LIMIT_BYTES ? 0 : 1)
