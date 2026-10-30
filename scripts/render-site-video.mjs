// Grava o site real quadro a quadro no Chrome headless, com cursor e legendas (vídeo 4:5 para o LinkedIn).
// Requisitos: `yarn dev` rodando (porta 2000), Google Chrome e ffmpeg.
// Uso: node scripts/render-site-video.mjs [--lang=pt-BR] [--fps=30] [--at=1.5,4,9]
// Saída: video/portfolio/out/portfolio-{pt,en}.mp4 e poster-{pt,en}.jpg (fora do Git).
import { spawn, spawnSync } from 'node:child_process'
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'

import { COPY, POSTER_AT, scene } from '../video/portfolio/scene.mjs'

const args = process.argv.slice(2)
const flag = (key) => args.find((a) => a.startsWith(`--${key}`))?.split('=')[1]
const FPS = Number(flag('fps') ?? 30)
const stills = flag('at')?.split(',').map(Number)
const LOCALES = flag('lang') ? [flag('lang')] : ['pt-BR', 'en-US']
const W = 540
const H = 675
const SCALE = 2
const PORT = 9339
const ROOT = 'http://localhost:2000/'
const VIDEO_DIR = path.resolve(import.meta.dirname, '../video/portfolio')
const OUT_DIR = path.join(VIDEO_DIR, 'out')
const RUNTIME = readFileSync(path.join(VIDEO_DIR, 'runtime.js'), 'utf8')
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const chrome = spawn(
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  ['--headless=new', '--disable-gpu', '--hide-scrollbars', `--remote-debugging-port=${PORT}`,
   `--window-size=${W},${H}`, `--user-data-dir=${path.join(tmpdir(), 'render-site-video-chrome')}`, 'about:blank'],
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
const evaluate = async (expression) => {
  const { result, exceptionDetails } = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true })
  if (exceptionDetails) throw new Error(`${expression.slice(0, 60)}: ${exceptionDetails.exception?.description ?? exceptionDetails.text}`)
  return result?.value
}

const easeInOut = (p) => (p < 0.5 ? 4 * p ** 3 : 1 - (-2 * p + 2) ** 3 / 2)
const lerp = (a, b, p) => a + (b - a) * p

/** Catmull-Rom: curva suave que passa por todos os pontos. */
function along(points, p) {
  const segments = points.length - 1
  const i = Math.min(segments - 1, Math.floor(p * segments))
  const u = p * segments - i
  const at = (k) => points[Math.max(0, Math.min(segments, k))]
  const [p0, p1, p2, p3] = [at(i - 1), at(i), at(i + 1), at(i + 2)]
  const curve = (a) =>
    0.5 * (2 * p1[a] + (p2[a] - p0[a]) * u + (2 * p0[a] - 5 * p1[a] + 4 * p2[a] - p3[a]) * u ** 2 +
      (3 * p1[a] - p0[a] - 3 * p2[a] + p3[a]) * u ** 3)
  return { x: curve(0), y: curve(1) }
}

/** O diretor: `scene` pede movimentos e `wait` grava os quadros enquanto eles acontecem. */
function director(onFrame) {
  const cursor = { x: W + 40, y: H * 0.8 }
  const view = { scrollY: null, follow: null, wipe: { progress: 0, leaving: true, label: '' } }
  const ticks = Math.round(60 / FPS)
  let tweens = []
  let frame = 0

  const tween = (seconds, apply, ease = easeInOut) => {
    tweens = tweens.filter((t) => t.apply.owner !== apply.owner || !apply.owner)
    tweens.push({ start: frame, frames: Math.max(1, Math.round(seconds * FPS)), apply, ease })
  }
  const owned = (owner, fn) => Object.assign(fn, { owner })

  const step = async () => {
    for (const t of tweens) t.apply(t.ease(Math.min(1, (frame - t.start + 1) / t.frames)))
    tweens = tweens.filter((t) => frame - t.start + 1 < t.frames)
    await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: cursor.x, y: cursor.y })
    await evaluate(`__frame(${JSON.stringify({ ticks, cursor, ...view })})`)
    await onFrame(frame)
    frame++
  }

  const center = async (selector) => {
    const r = await d.rect(selector)
    return [r.left + r.width / 2, r.top + r.height / 2]
  }

  const d = {
    async open(page, ready, offsets = {}) {
      // A marca fica na página antiga: enquanto ela existir, a nova ainda não carregou.
      await evaluate('window.__leaving = true')
      await send('Page.navigate', { url: `${ROOT}${page}` })
      const check = `!window.__leaving && document.readyState === 'complete' && document.fonts.status === 'loaded' &&
        !!document.getElementById('__stage') && !!document.querySelector(${JSON.stringify(ready)})`
      for (let i = 0; i < 200 && !(await evaluate(check).catch(() => false)); i++) await sleep(100)
      await evaluate(`window.__videoOffsets = ${JSON.stringify(offsets)}`)
      view.scrollY = 0
      view.follow = null
    },
    rect: (selector) =>
      evaluate(`(() => { const r = document.querySelector(${JSON.stringify(selector)}).getBoundingClientRect()
        return { left: r.left, top: r.top, right: r.right, bottom: r.bottom, width: r.width, height: r.height } })()`),
    say: (html) => evaluate(`__say(${JSON.stringify(html)})`),
    async wait(seconds) {
      const end = frame + Math.round(seconds * FPS)
      while (frame < end) await step()
    },
    move([x, y], seconds) {
      const from = { ...cursor }
      tween(seconds, owned('cursor', (p) => {
        cursor.x = lerp(from.x, x, p)
        cursor.y = lerp(from.y, y, p)
      }))
    },
    path(points, seconds) {
      tween(seconds, owned('cursor', (p) => Object.assign(cursor, along(points, p))), (p) => p)
    },
    /** `target`: posição em px ou seletor, que para `offset` px abaixo do topo. */
    async scroll(target, seconds, offset = 0) {
      const y = await evaluate('window.scrollY')
      const to =
        typeof target === 'number'
          ? target
          : (await evaluate(`document.querySelector(${JSON.stringify(target)}).getBoundingClientRect().top`)) + y - offset
      view.follow = null
      tween(seconds, owned('scroll', (p) => (view.scrollY = lerp(y, to, p))))
    },
    follow(selector, offset) {
      view.follow = { selector, offset }
    },
    async unfollow() {
      view.scrollY = await evaluate('window.scrollY')
      view.follow = null
    },
    tap: () => evaluate('__pulse()'),
    async click() {
      await d.tap()
      const at = { x: cursor.x, y: cursor.y, button: 'left', clickCount: 1 }
      await send('Input.dispatchMouseEvent', { type: 'mousePressed', ...at })
      await send('Input.dispatchMouseEvent', { type: 'mouseReleased', ...at })
    },
    async wipe(leaving, label) {
      view.wipe = { progress: 0, leaving, label }
      tween(0.32, owned('wipe', (p) => (view.wipe.progress = p)), (p) => p)
      await d.wait(0.34)
      if (leaving) await d.wait(0.34)
      else view.wipe = { progress: 0, leaving: true, label: '' }
    },
    center,
  }
  return d
}

await send('Page.enable')
await send('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: SCALE, mobile: false })
await send('Page.addScriptToEvaluateOnNewDocument', { source: RUNTIME })

const shoot = async (file) => {
  // Sem `clip`: ele é relativo ao documento, e aqui o quadro é sempre a janela, mesmo com a página rolada.
  const { data } = await send('Page.captureScreenshot', { format: 'png' })
  writeFileSync(file, Buffer.from(data, 'base64'))
}

mkdirSync(OUT_DIR, { recursive: true })

for (const locale of LOCALES) {
  const tag = locale === 'pt-BR' ? 'pt' : 'en'
  const { identifier } = await send('Page.addScriptToEvaluateOnNewDocument', {
    source: `try { localStorage.setItem('ianlgnk-locale', '${locale}') } catch {}`,
  })
  const framesDir = path.join(tmpdir(), `portfolio-${tag}-frames`)
  rmSync(framesDir, { recursive: true, force: true })
  mkdirSync(framesDir, { recursive: true })

  let total = 0
  await scene(
    director(async (frame) => {
      total = frame + 1
      const time = frame / FPS
      if (stills?.some((s) => Math.abs(s - time) < 0.5 / FPS)) await shoot(path.join(OUT_DIR, `still-${tag}-${time.toFixed(2)}.png`))
      else if (!stills) await shoot(path.join(framesDir, `${String(frame).padStart(5, '0')}.png`))
    }),
    COPY[locale],
  )
  console.log(`${locale}: ${total} quadros, ${(total / FPS).toFixed(1)} s`)
  await send('Page.removeScriptToEvaluateOnNewDocument', { identifier })
  if (stills) continue

  const encoded = spawnSync(
    'ffmpeg',
    ['-y', '-framerate', String(FPS), '-i', path.join(framesDir, '%05d.png'), '-c:v', 'libx264', '-preset', 'slow',
     '-crf', '18', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an', path.join(OUT_DIR, `portfolio-${tag}.mp4`)],
    { stdio: 'inherit' },
  )
  if (encoded.status !== 0) throw new Error('ffmpeg falhou')
  const poster = path.join(framesDir, `${String(Math.round(POSTER_AT * FPS)).padStart(5, '0')}.png`)
  spawnSync('ffmpeg', ['-y', '-i', poster, '-frames:v', '1', '-update', '1', '-q:v', '3', path.join(OUT_DIR, `poster-${tag}.jpg`)], { stdio: 'inherit' })
  rmSync(framesDir, { recursive: true, force: true })
}

ws.close()
chrome.kill()
process.exit(0)
