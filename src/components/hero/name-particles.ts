/**
 * Pontos do nome no Hero como partículas que fogem do cursor ("ímãs de mesmo polo")
 * e voltam como molas. Carregado só no primeiro movimento do mouse sobre o Hero;
 * o loop de animação para quando tudo assenta (nada roda com a página parada).
 */

export type Dot = { hx: number; hy: number; x: number; y: number; vx: number; vy: number }
type Point = { x: number; y: number }

const CELL = 5
const RADIUS = 90
const STRENGTH = 6
const SPRING = 0.06
const DAMPING = 0.86

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
  return points.map(({ x, y }) => ({ hx: x, hy: y, x, y, vx: 0, vy: 0 }))
}

/** Um quadro de física (~60 fps). Devolve `true` enquanto algum ponto ainda se move. */
export function stepDots(dots: Dot[], pointer: Point | null): boolean {
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
    d.vx = (d.vx + (d.hx - d.x) * SPRING) * DAMPING
    d.vy = (d.vy + (d.hy - d.y) * SPRING) * DAMPING
    d.x += d.vx
    d.y += d.vy

    if (Math.abs(d.vx) + Math.abs(d.vy) > 0.01 || Math.abs(d.x - d.hx) + Math.abs(d.y - d.hy) > 0.05) {
      moving = true
    } else {
      d.x = d.hx
      d.y = d.hy
      d.vx = 0
      d.vy = 0
    }
  }
  return moving
}

/** Margem do canvas além do `h1`, para os pontos poderem sair da caixa do nome. */
const BLEED = RADIUS

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

/**
 * Liga as partículas sobre o `h1` do nome. `area` é a região que acompanha o cursor.
 * Devolve a função que desliga e restaura os pontos em CSS.
 */
export function mountNameParticles(h1: HTMLElement, area: HTMLElement): () => void {
  const canvas = document.createElement('canvas')
  canvas.setAttribute('aria-hidden', 'true')
  Object.assign(canvas.style, {
    position: 'absolute',
    left: `${-BLEED}px`,
    top: `${-BLEED}px`,
    pointerEvents: 'none',
  })
  const ctx = canvas.getContext('2d')
  if (!ctx) return () => {}

  let dots: Dot[] = []
  let pointer: Point | null = null
  let raf = 0
  const color = getComputedStyle(h1).getPropertyValue('--foreground').trim() || '#eadfcd'

  const layout = () => {
    const box = h1.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1
    const w = box.width + BLEED * 2
    const h = box.height + BLEED * 2
    canvas.width = Math.round(w * dpr)
    canvas.height = Math.round(h * dpr)
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    dots = []
    for (const word of h1.querySelectorAll<HTMLElement>('.dotmatrix')) {
      const offset = word.getBoundingClientRect()
      const ox = offset.left - box.left + BLEED
      const oy = offset.top - box.top + BLEED
      dots.push(...createDots(wordPoints(word).map((p) => ({ x: p.x + ox, y: p.y + oy }))))
    }
    draw()
  }

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = color
    ctx.beginPath()
    for (const d of dots) {
      ctx.moveTo(d.x + 1.7, d.y)
      ctx.arc(d.x, d.y, 1.7, 0, Math.PI * 2)
    }
    ctx.fill()
  }

  const frame = () => {
    const moving = stepDots(dots, pointer)
    draw()
    raf = moving ? requestAnimationFrame(frame) : 0
  }
  const wake = () => {
    if (!raf) raf = requestAnimationFrame(frame)
  }

  const onMove = (event: PointerEvent) => {
    const box = canvas.getBoundingClientRect()
    pointer = { x: event.clientX - box.left, y: event.clientY - box.top }
    wake()
  }
  const onLeave = () => {
    pointer = null
    wake()
  }

  h1.style.position = 'relative'
  h1.prepend(canvas)
  h1.classList.add('particles-live')
  layout()

  const resize = new ResizeObserver(() => layout())
  resize.observe(h1)
  area.addEventListener('pointermove', onMove)
  area.addEventListener('pointerleave', onLeave)

  return () => {
    cancelAnimationFrame(raf)
    resize.disconnect()
    area.removeEventListener('pointermove', onMove)
    area.removeEventListener('pointerleave', onLeave)
    h1.classList.remove('particles-live')
    canvas.remove()
  }
}
