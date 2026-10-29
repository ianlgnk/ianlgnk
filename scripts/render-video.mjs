// Renderiza a composição de video/<nome>/ quadro a quadro no Chrome headless e codifica com ffmpeg.
// Requisitos: `yarn dev` rodando (porta 2000), Google Chrome e ffmpeg.
// Uso: node scripts/render-video.mjs [nome=avance] [--fps=30] [--frames-only] [--at=1.5,4,9]
import { spawn, spawnSync } from 'node:child_process'
import { mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'

const args = process.argv.slice(2)
const name = args.find((a) => !a.startsWith('--')) ?? 'avance'
const flag = (key) => args.find((a) => a.startsWith(`--${key}`))?.split('=')[1]
const FPS = Number(flag('fps') ?? 30)
const framesOnly = args.includes('--frames-only')
const stills = flag('at')?.split(',').map(Number)
const LOCALES = ['pt-BR', 'en-US']
const W = 1280
const H = 800
const PORT = 9338
const OUT_DIR = path.resolve(import.meta.dirname, `../public/projects/${name}`)
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const chrome = spawn(
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  ['--headless=new', '--disable-gpu', '--hide-scrollbars', `--remote-debugging-port=${PORT}`,
   `--window-size=${W},${H}`, `--user-data-dir=${path.join(tmpdir(), 'render-video-chrome')}`, 'about:blank'],
  { stdio: 'ignore' },
)

let wsUrl
for (let i = 0; i < 120 && !wsUrl; i++) {
  try {
    wsUrl = (await (await fetch(`http://127.0.0.1:${PORT}/json`)).json()).find((t) => t.type === 'page')?.webSocketDebuggerUrl
  } catch {}
  if (!wsUrl) await sleep(250)
}
const ws = new WebSocket(wsUrl)
await new Promise((r) => (ws.onopen = r))
let id = 0
const pending = new Map()
ws.onmessage = (e) => {
  const m = JSON.parse(e.data)
  if (m.id && pending.has(m.id)) pending.get(m.id)(m.result ?? m)
}
const send = (method, params = {}) =>
  new Promise((res) => {
    const i = ++id
    pending.set(i, res)
    ws.send(JSON.stringify({ id: i, method, params }))
  })
const evaluate = async (expression) =>
  (await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true })).result?.value

await send('Page.enable')
await send('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: 1, mobile: false })

const shoot = async (file) => {
  const { data } = await send('Page.captureScreenshot', { format: 'png', clip: { x: 0, y: 0, width: W, height: H, scale: 1 } })
  writeFileSync(file, Buffer.from(data, 'base64'))
}
// `__seek` pode devolver uma promessa (composições com <video> esperam o `seeked` de cada clipe).
const seek = async (time) => {
  await evaluate(
    `Promise.resolve(window.__seek(${time})).then(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))))`,
  )
}

mkdirSync(OUT_DIR, { recursive: true })
const hasFfmpeg = spawnSync('ffmpeg', ['-version']).status === 0

for (const locale of LOCALES) {
  await send('Page.navigate', { url: `http://localhost:2000/video/${name}/?lang=${locale}` })
  await sleep(1500)
  await evaluate('window.__ready')
  const duration = await evaluate('window.__duration')
  const posterAt = (await evaluate('window.__poster')) ?? 4.6
  const tag = locale === 'pt-BR' ? 'pt' : 'en'

  if (stills) {
    for (const s of stills) {
      await seek(s)
      await shoot(path.join(tmpdir(), `${name}-${tag}-${s}.png`))
    }
    console.log(`${locale}: stills em ${tmpdir()}/${name}-${tag}-*.png`)
    continue
  }

  const framesDir = path.join(tmpdir(), `${name}-${tag}-frames`)
  rmSync(framesDir, { recursive: true, force: true })
  mkdirSync(framesDir, { recursive: true })
  const total = Math.round(duration * FPS)
  for (let f = 0; f < total; f++) {
    await seek(f / FPS)
    await shoot(path.join(framesDir, `${String(f).padStart(5, '0')}.png`))
  }
  console.log(`${locale}: ${total} quadros em ${framesDir}`)

  if (framesOnly || !hasFfmpeg) {
    if (!hasFfmpeg) console.log('ffmpeg não encontrado: pulei a codificação.')
    continue
  }
  const input = ['-y', '-framerate', String(FPS), '-i', path.join(framesDir, '%05d.png')]
  const run = (extra) => {
    const r = spawnSync('ffmpeg', [...input, ...extra], { stdio: 'inherit' })
    if (r.status !== 0) throw new Error(`ffmpeg falhou: ${extra.at(-1)}`)
  }
  run(['-c:v', 'libx264', '-preset', 'slow', '-crf', '24', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an', path.join(OUT_DIR, `video-${tag}.mp4`)])
  run(['-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', '38', '-row-mt', '1', '-pix_fmt', 'yuv420p', '-an', path.join(OUT_DIR, `video-${tag}.webm`)])
  // Capa (imagem parada para movimento reduzido e antes do play): `window.__poster` ou, sem ele,
  // 4,6s (a cena do app do aluno no Avance).
  const posterFrame = String(Math.round(posterAt * FPS)).padStart(5, '0')
  spawnSync('ffmpeg', ['-y', '-i', path.join(framesDir, `${posterFrame}.png`), '-q:v', '4', path.join(OUT_DIR, `poster-${tag}.jpg`)], { stdio: 'inherit' })
}

ws.close()
chrome.kill()
process.exit(0)
