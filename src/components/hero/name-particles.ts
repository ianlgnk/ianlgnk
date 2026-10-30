/**
 * Pontos do nome no Hero como partículas: entram espalhados pelo Hero e se juntam
 * formando o nome, fogem do cursor/dedo ("ímãs de mesmo polo") e voltam como molas,
 * ficam rosa enquanto se mexem, recebem a varredura rosa periódica e uma onda de
 * choque no clique/toque. Carregado sob demanda; o loop dorme quando nada se mexe e
 * acorda só para a próxima varredura (e nunca fora da tela).
 */

export type Dot = { hx: number; hy: number; x: number; y: number; vx: number; vy: number; heat: number }
type Point = { x: number; y: number }
/** Faixa horizontal de uma palavra (coordenadas do canvas). */
type Span = { left: number; width: number }

const CELL = 5
const RADIUS = 90
const STRENGTH = 6
const SPRING = 0.06
const DAMPING = 0.86
/** Quanto o "calor" (rosa) cai por quadro depois que o ponto para. */
const HEAT_DECAY = 0.955

/** Centros das células `cell`×`cell` cujo pixel central está dentro do glifo (alfa ≥ 128). */
export function sampleDots(rgba: Uint8ClampedArray, width: number, height: number, cell = CELL): Point[] {
  const dots: Point[] = []
  for (let y = cell / 2; y < height; y += cell) {
    for (let x = cell / 2; x < width; x += cell) {
      if (rgba[(Math.floor(y) * width + Math.floor(x)) * 4 + 3] >= 128) dots.push({ x, y })
    }
  }
  return dots
}

export function createDots(points: Point[]): Dot[] {
  return points.map(({ x, y }) => ({ hx: x, hy: y, x, y, vx: 0, vy: 0, heat: 0 }))
}

/** Onda de choque: um anel que cresce a partir do clique e empurra os pontos por onde passa. */
export type Ring = { x: number; y: number; r: number; max: number }

const RING_SPEED = 11
const RING_BAND = 24
const RING_POWER = 3.4

export function createRing(x: number, y: number, max: number): Ring {
  return { x, y, r: 0, max }
}

/**
 * Um quadro de física (~60 fps). Devolve `true` enquanto algum ponto ainda se move,
 * ainda está quente (rosa) ou algum anel ainda cresce. Anéis esgotados saem de `rings`.
 */
export function stepDots(dots: Dot[], pointer: Point | null, rings: Ring[] = []): boolean {
  for (const ring of rings) ring.r += RING_SPEED

  let moving = false
  for (const d of dots) {
    if (pointer) {
      const dx = d.x - pointer.x
      const dy = d.y - pointer.y
      const dist = Math.hypot(dx, dy)
      if (dist < RADIUS && dist > 0.001) {
        const force = (1 - dist / RADIUS) ** 2 * STRENGTH
        d.vx += (dx / dist) * force
        d.vy += (dy / dist) * force
      }
    }
    for (const ring of rings) {
      const dx = d.x - ring.x
      const dy = d.y - ring.y
      const dist = Math.hypot(dx, dy) || 1
      const band = Math.abs(dist - ring.r)
      if (band < RING_BAND) {
        const push = (1 - band / RING_BAND) * RING_POWER * Math.max(0, 1 - ring.r / ring.max)
        d.vx += (dx / dist) * push
        d.vy += (dy / dist) * push
      }
    }
    d.vx = (d.vx + (d.hx - d.x) * SPRING) * DAMPING
    d.vy = (d.vy + (d.hy - d.y) * SPRING) * DAMPING
    d.x += d.vx
    d.y += d.vy

    const speed = Math.abs(d.vx) + Math.abs(d.vy)
    d.heat = Math.min(1, Math.max(d.heat * HEAT_DECAY, speed / 6))

    if (speed > 0.01 || Math.abs(d.x - d.hx) + Math.abs(d.y - d.hy) > 0.05 || d.heat > 0.02) {
      moving = true
    } else {
      d.x = d.hx
      d.y = d.hy
      d.vx = 0
      d.vy = 0
      d.heat = 0
    }
  }

  for (let i = rings.length - 1; i >= 0; i--) if (rings[i].r >= rings[i].max) rings.splice(i, 1)
  return moving || rings.length > 0
}

/* Entrada: os pontos começam espalhados pelo Hero, flutuam e depois voam até o nome. */

export type Start = { x: number; y: number; delay: number; phase: number }

const HOLD_MS = 150
const STAGGER_MS = 500
const FLIGHT_MS = 1300
export const ENTRANCE_MS = HOLD_MS + STAGGER_MS + FLIGHT_MS
/** Amplitude (px) da flutuação enquanto o ponto espera para partir. */
const FLOAT = 6

export function scatterStarts(count: number, width: number, height: number, random = Math.random): Start[] {
  return Array.from({ length: count }, () => ({
    x: random() * width,
    y: random() * height,
    delay: random() * STAGGER_MS,
    phase: random() * Math.PI * 2,
  }))
}

/** Sai rápido e freia ao chegar: o nome começa a se formar logo que os pontos aparecem. */
const easeOutCubic = (p: number) => 1 - (1 - p) ** 3

/**
 * Posiciona os pontos no instante `elapsed` (ms) da entrada: rosados flutuando no
 * começo, rosa forte ao partir, creme ao chegar. Devolve `true` enquanto algum
 * ponto ainda não chegou.
 */
export function assembleDots(dots: Dot[], starts: Start[], elapsed: number): boolean {
  let assembling = false
  for (let i = 0; i < dots.length; i++) {
    const d = dots[i]
    const s = starts[i]
    const p = Math.min(1, Math.max(0, (elapsed - HOLD_MS - s.delay) / FLIGHT_MS))
    if (p >= 1) {
      d.x = d.hx
      d.y = d.hy
      d.vx = 0
      d.vy = 0
      d.heat = 0
      continue
    }
    assembling = true
    const e = easeOutCubic(p)
    const fx = s.x + Math.sin(elapsed * 0.0021 + s.phase) * FLOAT
    const fy = s.y + Math.cos(elapsed * 0.0017 + s.phase) * FLOAT
    d.x = fx + (d.hx - fx) * e
    d.y = fy + (d.hy - fy) * e
    d.heat = e < 0.5 ? 0.55 + 0.9 * e : 2 * (1 - e)
  }
  return assembling
}

/* Varredura rosa: uma faixa cruza cada palavra a cada 5 s, logo depois da entrada. */

export const SCAN_START_MS = ENTRANCE_MS + 400
const SCAN_PERIOD_MS = 5000
const SCAN_ACTIVE_MS = 2250
const SCAN_WORD_DELAY_MS = 250

const easeInOutQuad = (p: number) => (p < 0.5 ? 2 * p * p : 1 - 2 * (1 - p) ** 2)

/** Tempo (ms) dentro do ciclo da palavra, ou `null` antes da primeira varredura. */
function scanCycle(elapsed: number, wordIndex: number): number | null {
  const local = elapsed - SCAN_START_MS - wordIndex * SCAN_WORD_DELAY_MS
  return local < 0 ? null : local % SCAN_PERIOD_MS
}

/** Centro da faixa sobre a palavra (de meia palavra antes até meia depois), ou `null` em repouso. */
export function scanCenter(elapsed: number, wordIndex: number, word: Span): number | null {
  const cycle = scanCycle(elapsed, wordIndex)
  if (cycle === null || cycle > SCAN_ACTIVE_MS) return null
  return word.left + word.width * (-0.5 + 2 * easeInOutQuad(cycle / SCAN_ACTIVE_MS))
}

/** Intensidade do rosa em `x`: cheia no miolo da faixa (6% da palavra) e some em 18% para cada lado. */
export function scanTint(x: number, center: number, wordWidth: number): number {
  const d = Math.abs(x - center)
  const core = wordWidth * 0.06
  return d <= core ? 1 : Math.max(0, 1 - (d - core) / (wordWidth * 0.18))
}

/** Quanto o loop pode dormir até alguma palavra voltar a ser varrida (0 = varrendo agora). */
export function msUntilScan(elapsed: number, wordCount: number): number {
  let wait = Infinity
  for (let i = 0; i < wordCount; i++) {
    const local = elapsed - SCAN_START_MS - i * SCAN_WORD_DELAY_MS
    if (local < 0) wait = Math.min(wait, -local)
    else {
      const cycle = local % SCAN_PERIOD_MS
      wait = Math.min(wait, cycle <= SCAN_ACTIVE_MS ? 0 : SCAN_PERIOD_MS - cycle)
    }
  }
  return wait
}

/* Montagem no DOM. */

const DOT_RADIUS = 1.7
/** Tons entre creme (0) e rosa (1); cada um vira um sprite pré-desenhado. */
const SHADES = 10

/** Rasteriza uma palavra com a mesma fonte do CSS e devolve os pontos (coordenadas da palavra). */
function wordPoints(el: HTMLElement): Point[] {
  const style = getComputedStyle(el)
  const width = Math.ceil(el.offsetWidth)
  const height = Math.ceil(el.offsetHeight)
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  if (!ctx || !width || !height) return []
  ctx.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`
  if ('letterSpacing' in ctx) ctx.letterSpacing = style.letterSpacing === 'normal' ? '0px' : style.letterSpacing
  // O canvas ignora `text-transform`: aplica aqui para bater com o CSS.
  const raw = el.textContent ?? ''
  const text = style.textTransform === 'uppercase' ? raw.toUpperCase() : raw
  const metrics = ctx.measureText(text)
  const ascent = metrics.fontBoundingBoxAscent
  const descent = metrics.fontBoundingBoxDescent
  // Mesmo modelo do CSS: a caixa da fonte centralizada na altura da linha.
  const baseline = (height - (ascent + descent)) / 2 + ascent
  ctx.fillText(text, 0, baseline)
  return sampleDots(ctx.getImageData(0, 0, width, height).data, width, height)
}

function hexToRgb(hex: string, fallback: [number, number, number]): [number, number, number] {
  const m = /^#([0-9a-f]{6})$/i.exec(hex.trim())
  if (!m) return fallback
  const n = parseInt(m[1], 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

/** Um sprite por tom (creme → rosa, um pouco maior quanto mais rosa), desenhado uma vez. */
function makeSprites(ink: [number, number, number], accent: [number, number, number], dpr: number) {
  return Array.from({ length: SHADES }, (_, b) => {
    const t = b / (SHADES - 1)
    const r = DOT_RADIUS * (1 + t * 0.35)
    const size = Math.ceil(r * 2 + 2)
    const sprite = document.createElement('canvas')
    sprite.width = sprite.height = Math.ceil(size * dpr)
    const g = sprite.getContext('2d')
    if (g) {
      g.scale(dpr, dpr)
      g.fillStyle = `rgb(${ink.map((v, i) => Math.round(v + (accent[i] - v) * t)).join(',')})`
      g.beginPath()
      g.arc(size / 2, size / 2, r, 0, Math.PI * 2)
      g.fill()
    }
    return { sprite, size }
  })
}

/**
 * Liga as partículas sobre o `h1` do nome, num canvas que cobre `area` (o Hero).
 * Com `entrance`, os pontos começam espalhados e se juntam; sem, assumem o lugar
 * dos pontos em CSS sem transição. Devolve a função que desliga e restaura o CSS.
 */
export function mountNameParticles(h1: HTMLElement, area: HTMLElement, { entrance = true } = {}): () => void {
  const canvas = document.createElement('canvas')
  canvas.setAttribute('aria-hidden', 'true')
  Object.assign(canvas.style, { position: 'absolute', left: '0', top: '0', pointerEvents: 'none' })
  const ctx = canvas.getContext('2d')
  if (!ctx) return () => {}

  const style = getComputedStyle(h1)
  const ink = hexToRgb(style.getPropertyValue('--foreground'), [234, 223, 205])
  const accent = hexToRgb(style.getPropertyValue('--accent'), [255, 61, 127])

  let dots: Dot[] = []
  let dotWord = new Uint8Array(0)
  let words: Span[] = []
  let starts: Start[] | null = null
  let sprites: ReturnType<typeof makeSprites> = []
  let pointer: Point | null = null
  const rings: Ring[] = []
  const t0 = performance.now()
  let raf = 0
  let sleep = 0
  let visible = true
  let width = 0
  let height = 0

  const layout = (scatter: boolean) => {
    const box = area.getBoundingClientRect()
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    width = box.width
    height = box.height
    canvas.width = Math.round(width * dpr)
    canvas.height = Math.round(height * dpr)
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    sprites = makeSprites(ink, accent, dpr)

    dots = []
    words = []
    const owner: number[] = []
    h1.querySelectorAll<HTMLElement>('.dotmatrix').forEach((word, wi) => {
      const offset = word.getBoundingClientRect()
      const ox = offset.left - box.left
      const oy = offset.top - box.top
      const points = wordPoints(word)
      words.push({ left: ox, width: offset.width })
      owner.push(...points.map(() => wi))
      dots.push(...createDots(points.map((p) => ({ x: p.x + ox, y: p.y + oy }))))
    })
    dotWord = Uint8Array.from(owner)
    starts = scatter ? scatterStarts(dots.length, width, height) : null
  }

  const draw = (elapsed: number) => {
    ctx.clearRect(0, 0, width, height)
    const centers = words.map((word, i) => scanCenter(elapsed, i, word))
    for (let i = 0; i < dots.length; i++) {
      const d = dots[i]
      const wi = dotWord[i]
      const center = centers[wi]
      const tint = center === null ? d.heat : Math.max(d.heat, scanTint(d.hx, center, words[wi].width))
      const { sprite, size } = sprites[Math.round(tint * (SHADES - 1))]
      ctx.drawImage(sprite, d.x - size / 2, d.y - size / 2, size, size)
    }
  }

  const frame = (now: number) => {
    raf = 0
    if (!visible) return
    const elapsed = now - t0
    let busy: boolean
    if (starts) {
      busy = assembleDots(dots, starts, elapsed)
      if (!busy) starts = null
    } else {
      busy = stepDots(dots, pointer, rings)
    }
    draw(elapsed)

    const wait = msUntilScan(elapsed, words.length)
    if (busy || wait === 0) raf = requestAnimationFrame(frame)
    else sleep = window.setTimeout(wake, wait)
  }
  function wake() {
    window.clearTimeout(sleep)
    if (!raf && visible) raf = requestAnimationFrame(frame)
  }

  const local = (event: PointerEvent): Point => {
    const box = canvas.getBoundingClientRect()
    return { x: event.clientX - box.left, y: event.clientY - box.top }
  }
  const onMove = (event: PointerEvent) => {
    pointer = local(event)
    wake()
  }
  const onLeave = () => {
    pointer = null
    wake()
  }
  const onDown = (event: PointerEvent) => {
    if (starts || (event.target as Element).closest('a, button')) return
    const { x, y } = local(event)
    rings.push(createRing(x, y, Math.max(width, height) * 0.7))
    wake()
  }

  const restore = { areaPosition: area.style.position, touchAction: h1.style.touchAction }
  if (getComputedStyle(area).position === 'static') area.style.position = 'relative'
  // Arrastar o dedo de lado sobre o nome mexe nos pontos; a rolagem vertical continua.
  h1.style.touchAction = 'pan-y'
  area.prepend(canvas)
  h1.classList.add('particles-live')
  layout(entrance)
  wake()

  let firstResize = true
  const resize = new ResizeObserver(() => {
    if (firstResize) return void (firstResize = false)
    // Mudou de tamanho no meio da entrada: recomeça espalhando, em vez de pular para o nome pronto.
    layout(starts !== null)
    wake()
  })
  resize.observe(area)
  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting
    if (visible) wake()
    else {
      cancelAnimationFrame(raf)
      raf = 0
      window.clearTimeout(sleep)
    }
  })
  io.observe(area)
  area.addEventListener('pointermove', onMove)
  area.addEventListener('pointerleave', onLeave)
  area.addEventListener('pointercancel', onLeave)
  area.addEventListener('pointerdown', onDown)

  return () => {
    cancelAnimationFrame(raf)
    window.clearTimeout(sleep)
    resize.disconnect()
    io.disconnect()
    area.removeEventListener('pointermove', onMove)
    area.removeEventListener('pointerleave', onLeave)
    area.removeEventListener('pointercancel', onLeave)
    area.removeEventListener('pointerdown', onDown)
    h1.classList.remove('particles-live')
    area.style.position = restore.areaPosition
    h1.style.touchAction = restore.touchAction
    canvas.remove()
  }
}
