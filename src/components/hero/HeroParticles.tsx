import { useReducedMotion } from 'framer-motion'
import { useCallback, useEffect, useRef } from 'react'

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
}

function isDarkTheme() {
  return document.documentElement.classList.contains('dark')
}

/** Rede leve de pontos + linhas, canvas puro; reage ao rato dentro da hero. */
export function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()
  const mouseRef = useRef({ x: -9999, y: -9999, active: false })
  const particlesRef = useRef<Particle[]>([])
  const rafRef = useRef(0)

  const initParticles = useCallback((w: number, h: number) => {
    const n = Math.min(56, Math.max(32, Math.floor((w * h) / 22000)))
    const arr: Particle[] = []
    for (let i = 0; i < n; i++) {
      arr.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
      })
    }
    particlesRef.current = arr
  }, [])

  useEffect(() => {
    if (reduced) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio ?? 1, 2)

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      const { width, height } = parent.getBoundingClientRect()
      canvas.width = Math.max(1, width * dpr)
      canvas.height = Math.max(1, height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      initParticles(width, height)
    }

    const onMove = (e: MouseEvent) => {
      const parent = canvas.parentElement
      if (!parent) return
      const r = parent.getBoundingClientRect()
      if (
        e.clientX >= r.left &&
        e.clientX <= r.right &&
        e.clientY >= r.top &&
        e.clientY <= r.bottom
      ) {
        mouseRef.current = {
          x: e.clientX - r.left,
          y: e.clientY - r.top,
          active: true,
        }
      } else {
        mouseRef.current.active = false
      }
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas.parentElement ?? canvas)
    window.addEventListener('mousemove', onMove)

    const linkDist = 118
    const linkDistSq = linkDist * linkDist

    const loop = () => {
      const parent = canvas.parentElement
      const w = parent?.clientWidth ?? 1
      const h = parent?.clientHeight ?? 1
      const dark = isDarkTheme()
      const dot = dark ? 'rgba(34,197,94,0.35)' : 'rgba(22,163,74,0.28)'
      const line = dark ? 'rgba(148,163,184,0.12)' : 'rgba(100,116,139,0.14)'
      const lineNear = dark ? 'rgba(34,197,94,0.18)' : 'rgba(22,163,74,0.16)'

      ctx.clearRect(0, 0, w, h)

      const parts = particlesRef.current
      const mx = mouseRef.current.x
      const my = mouseRef.current.y
      const mouseOn = mouseRef.current.active

      for (const p of parts) {
        if (mouseOn) {
          const dx = p.x - mx
          const dy = p.y - my
          const d2 = dx * dx + dy * dy
          const pull = 140 * 140
          if (d2 > 1 && d2 < pull) {
            const d = Math.sqrt(d2)
            const f = ((pull - d2) / pull) * 0.08
            p.vx += (dx / d) * f
            p.vy += (dy / d) * f
          }
        }

        p.x += p.vx
        p.y += p.vy
        p.vx *= 0.992
        p.vy *= 0.992

        if (p.x < 0 || p.x > w) {
          p.vx *= -1
          p.x = Math.max(0, Math.min(w, p.x))
        }
        if (p.y < 0 || p.y > h) {
          p.vy *= -1
          p.y = Math.max(0, Math.min(h, p.y))
        }
      }

      for (let i = 0; i < parts.length; i++) {
        for (let j = i + 1; j < parts.length; j++) {
          const a = parts[i]
          const b = parts[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d2 = dx * dx + dy * dy
          if (d2 < linkDistSq) {
            const alpha = 1 - d2 / linkDistSq
            ctx.strokeStyle = alpha > 0.55 ? lineNear : line
            ctx.globalAlpha = alpha * 0.85
            ctx.lineWidth = 0.6
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
            ctx.globalAlpha = 1
          }
        }
      }

      for (const p of parts) {
        ctx.fillStyle = dot
        ctx.beginPath()
        ctx.arc(p.x, p.y, 1.15, 0, Math.PI * 2)
        ctx.fill()
      }

      rafRef.current = requestAnimationFrame(loop)
    }

    rafRef.current = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
      window.removeEventListener('mousemove', onMove)
    }
  }, [reduced, initParticles])

  if (reduced) {
    return null
  }

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      aria-hidden
    />
  )
}
