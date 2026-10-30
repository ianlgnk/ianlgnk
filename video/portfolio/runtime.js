// Injetado no site real antes de qualquer script (ver scripts/render-site-video.mjs). Troca o tempo
// da página por um relógio virtual: cada quadro avança um múltiplo de 1/60 s, então a gravação não
// depende da velocidade da máquina. Também desenha o cursor, as legendas e a transição entre páginas.
(() => {
  const clock = { t: 0 }
  const real = {
    raf: window.requestAnimationFrame.bind(window),
    setTimeout: window.setTimeout.bind(window),
  }

  const epoch = Date.now()
  performance.now = () => clock.t
  Date.now = () => epoch + clock.t

  let nextTimer = 1
  const timers = new Map()
  const schedule = (fn, ms = 0, repeat, args) => {
    const id = nextTimer++
    timers.set(id, { at: clock.t + ms, ms, fn, repeat, args })
    return id
  }
  window.setTimeout = (fn, ms, ...args) => schedule(fn, ms, false, args)
  window.setInterval = (fn, ms, ...args) => schedule(fn, ms, true, args)
  window.clearTimeout = window.clearInterval = (id) => timers.delete(id)

  let nextFrame = 1
  let frames = new Map()
  window.requestAnimationFrame = (fn) => {
    const id = nextFrame++
    frames.set(id, fn)
    return id
  }
  window.cancelAnimationFrame = (id) => frames.delete(id)

  const tick = (dt) => {
    clock.t += dt
    const due = [...timers].filter(([, timer]) => timer.at <= clock.t).sort((a, b) => a[1].at - b[1].at)
    for (const [id, timer] of due) {
      if (!timers.has(id)) continue
      if (timer.repeat) timer.at += Math.max(timer.ms, 1)
      else timers.delete(id)
      timer.fn(...timer.args)
    }
    const callbacks = frames
    frames = new Map()
    for (const fn of callbacks.values()) fn(clock.t)
  }

  /* Vídeos dos projetos: não tocam sozinhos, cada quadro busca o instante exato. */
  window.__videoOffsets = {}
  const offsetOf = (video) => {
    const src = video.querySelector('source')?.src ?? video.src
    const key = Object.keys(window.__videoOffsets).find((k) => src.includes(`/${k}/`))
    return key ? window.__videoOffsets[key] : 0
  }
  HTMLMediaElement.prototype.play = function () {
    this.__from = clock.t - offsetOf(this) * 1000
    return Promise.resolve()
  }
  const pause = HTMLMediaElement.prototype.pause
  HTMLMediaElement.prototype.pause = function () {
    this.__from = undefined
    pause.call(this)
  }
  const once = (target, event) =>
    new Promise((resolve) => {
      target.addEventListener(event, resolve, { once: true })
      real.setTimeout(resolve, 8000)
    })
  const syncVideos = () =>
    Promise.all(
      [...document.querySelectorAll('video')]
        .filter((video) => video.__from !== undefined)
        .map(async (video) => {
          if (video.readyState < 2) {
            video.preload = 'auto'
            video.load()
            await once(video, 'loadeddata')
          }
          const seeked = once(video, 'seeked')
          video.currentTime = ((clock.t - video.__from) / 1000) % video.duration
          await seeked
        }),
    )

  /* Animações e transições em CSS: pausadas e posicionadas pelo relógio virtual. */
  const seen = new WeakMap()
  const syncAnimations = () => {
    for (const animation of document.getAnimations()) {
      if (!seen.has(animation)) {
        seen.set(animation, clock.t)
        animation.pause()
      }
      const elapsed = clock.t - seen.get(animation)
      if (elapsed >= animation.effect.getComputedTiming().endTime) animation.finish()
      else animation.currentTime = elapsed
    }
  }

  /* Cursor, legenda e transição. */
  const CSS = `
    html { scroll-behavior: auto !important; }
    #__stage { position: fixed; inset: 0; z-index: 9999; overflow: hidden; pointer-events: none;
      font-family: 'JetBrains Mono', ui-monospace, monospace; }
    #__stage .cap { position: absolute; left: 16px; right: 16px; bottom: 40px; padding: 14px 16px 15px;
      min-height: 97px; display: flex; align-items: center; background: rgb(27 16 18 / 0.95);
      border: 1px solid rgb(255 61 127 / 0.45); border-left-width: 5px; border-left-color: #ff3d7f; opacity: 0; }
    #__stage .cap p { margin: 0; color: #eadfcd; font-size: 25px; font-weight: 700; line-height: 1.28; }
    #__stage .cap em { color: #ff3d7f; font-style: normal; }
    #__stage .cap small { display: block; margin-top: 8px; color: #ff3d7f; font-size: 17px; font-weight: 500; }
    #__stage .ch { visibility: hidden; }
    #__stage .ch.on { visibility: visible; }
    #__stage .arrow { position: absolute; left: 0; top: 0; width: 32px; height: 32px; margin: -3px 0 0 -5px;
      filter: drop-shadow(0 2px 3px rgb(0 0 0 / 0.6)); }
    #__stage .pulse { position: absolute; left: 0; top: 0; width: 56px; height: 56px; margin: -28px 0 0 -28px;
      border: 2px solid #ff3d7f; border-radius: 50%; opacity: 0; }
    #__stage .wipe { position: absolute; inset: 0; display: grid; place-items: center; background: #1b1012;
      transform: translateX(-112%); }
    #__stage .wipe::before, #__stage .wipe::after { content: ''; position: absolute; top: 0; bottom: 0;
      width: 12px; background: #ff3d7f; }
    #__stage .wipe::before { left: -12px; }
    #__stage .wipe::after { right: -12px; }
    #__stage .wipe span { color: #ff3d7f; font-size: 26px; font-weight: 700; }
  `
  const ARROW = `<svg class="arrow" viewBox="0 0 24 24"><path d="M4 2v18l5-4.6 3.6 7.6 3-1.3-3.5-7.5H19z"
    fill="#eadfcd" stroke="#1b1012" stroke-width="1.4" stroke-linejoin="round"/></svg>`

  let stage, cap, text, arrow, pulse, wipe
  const mount = () => {
    const style = document.createElement('style')
    style.textContent = CSS
    document.head.append(style)
    stage = document.createElement('div')
    stage.id = '__stage'
    stage.innerHTML = `<div class="cap"><p></p></div>${ARROW}<i class="pulse"></i><div class="wipe"><span></span></div>`
    document.body.append(stage)
    cap = stage.querySelector('.cap')
    text = cap.querySelector('p')
    arrow = stage.querySelector('.arrow')
    pulse = stage.querySelector('.pulse')
    wipe = stage.querySelector('.wipe')
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount)
  else mount()

  /** Quebra o texto em caracteres para a legenda ser digitada. */
  const typed = (node) => {
    for (const child of [...node.childNodes]) {
      if (child.nodeType === Node.TEXT_NODE) {
        const chars = [...child.textContent].map((c) => {
          const span = document.createElement('span')
          span.className = 'ch'
          span.textContent = c
          return span
        })
        child.replaceWith(...chars)
      } else typed(child)
    }
  }

  const CHAR_MS = 17
  const FADE_MS = 160
  let shownAt = Infinity
  let typedAt = Infinity
  let hiddenAt = Infinity
  let pulseAt = -Infinity

  window.__say = (html) => {
    if (html === null) {
      hiddenAt = clock.t
      return
    }
    text.innerHTML = html
    typed(text)
    // Trocar de frase com a caixa já na tela só redigita o texto, sem piscar.
    if (shownAt === Infinity || hiddenAt !== Infinity) shownAt = clock.t
    typedAt = clock.t
    hiddenAt = Infinity
  }
  window.__pulse = () => {
    pulseAt = clock.t
  }

  const clamp = (v) => Math.min(1, Math.max(0, v))
  const drawOverlay = ({ cursor, wipe: w }) => {
    const hide = clamp((clock.t - hiddenAt) / FADE_MS)
    const show = clamp((clock.t - shownAt) / FADE_MS)
    cap.style.opacity = String(show * (1 - hide))
    cap.style.transform = `translateY(${(1 - show) * 10}px)`
    const chars = text.querySelectorAll('.ch')
    const count = (clock.t - typedAt) / CHAR_MS
    chars.forEach((c, i) => c.classList.toggle('on', i < count))

    arrow.style.transform = `translate(${cursor.x}px, ${cursor.y}px)`
    const age = (clock.t - pulseAt) / 420
    pulse.style.opacity = age < 1 ? String(1 - age) : '0'
    pulse.style.transform = `translate(${cursor.x}px, ${cursor.y}px) scale(${0.35 + age * 1.1})`

    // Cobre da esquerda para a direita em passos, como pixels acendendo, e descobre seguindo em frente.
    const step = Math.round(w.progress * 16) / 16
    wipe.style.transform = `translateX(${w.leaving ? -112 + step * 112 : step * 112}%)`
    wipe.querySelector('span').textContent = w.label
  }

  const twoRealFrames = () => new Promise((resolve) => real.raf(() => real.raf(resolve)))

  /** Avança um quadro do vídeo. O cursor real já foi movido pelo gravador (CDP). */
  window.__frame = async ({ ticks, cursor, scrollY, follow, wipe: w }) => {
    for (let i = 0; i < ticks; i++) tick(1000 / 60)
    if (follow) {
      const target = document.querySelector(follow.selector)
      const y = target.getBoundingClientRect().top + window.scrollY - follow.offset
      window.scrollTo(0, window.scrollY + (y - window.scrollY) * (1 - 0.84 ** ticks))
    } else if (scrollY !== null) window.scrollTo(0, scrollY)
    drawOverlay({ cursor, wipe: w })
    syncAnimations()
    await syncVideos()
    await twoRealFrames()
  }
})()
