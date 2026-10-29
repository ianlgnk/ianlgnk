// Composição do vídeo do app da Beerpass Club. Cada cena entra e sai numa linha do tempo do `motion`;
// a linha do tempo fica pausada e é posicionada por `window.__seek(t)` (render quadro a quadro).
// As telas são do app rodando no simulador (iPhone 18 Pro); `descobrir` e `servir` são gravações.
import { animate } from 'motion'

const COPY = {
  'pt-BR': {
    find: 'Descubra',
    taps: 'Na unidade',
    pour: 'Servir',
    wallet: 'Carteira',
    intro: 'Chope self-service, <em>pago pelo app.</em>',
    nearby: 'Unidades perto de você, <em>em todo o Brasil.</em>',
    menu: 'Cada torneira com estilo, IBU e <em>preço por 100 ml.</em>',
    serve: 'Toque, puxe a alavanca e <em>pague só o que servir.</em>',
    receipt: 'Recibo na hora e <em>extrato de tudo.</em>',
    outro: 'Na App Store e <em>no Google Play.</em>',
  },
  'en-US': {
    find: 'Discover',
    taps: 'At the bar',
    pour: 'Pour',
    wallet: 'Wallet',
    intro: 'Self-serve draft beer, <em>paid in the app.</em>',
    nearby: 'Bars near you, <em>all over Brazil.</em>',
    menu: 'Every tap with style, IBU and <em>price per 100 ml.</em>',
    serve: 'Tap, pull the lever and <em>pay only for what you pour.</em>',
    receipt: 'Instant receipts and <em>a full statement.</em>',
    outro: 'On the App Store and <em>Google Play.</em>',
  },
}

const lang = new URLSearchParams(location.search).get('lang') === 'en-US' ? 'en-US' : 'pt-BR'
const t = COPY[lang]
document.documentElement.lang = lang

const phone = (name) => `<div class="phone"><img src="./screens/${name}.jpg" alt="" /></div>`
/** Gravação do simulador: começa a tocar `delay` segundos depois de a cena entrar. */
const clip = (name, delay = 0.5) =>
  `<div class="phone"><video src="./screens/${name}.mp4" data-delay="${delay}" muted playsinline preload="auto"></video></div>`
const copy = (kicker, title) =>
  `<div class="copy"><p class="kicker">${kicker}</p><h1 class="title">${title}</h1></div>`

/** [id, html, início (s), fim (s)] */
const SCENES = [
  ['intro', `<div class="center"><img class="logo" src="./logo.svg" alt="" /><h1 class="title">${t.intro}</h1></div>`, 0, 2.8],
  ['find', copy(t.find, t.nearby) + `<div class="phones">${clip('descobrir')}${phone('mapa')}</div>`, 2.8, 8.9],
  ['taps', copy(t.taps, t.menu) + `<div class="phones">${phone('unidade')}${phone('ficha')}</div>`, 8.9, 12.9],
  ['pour', copy(t.pour, t.serve) + `<div class="phones solo">${clip('servir', 0.4)}</div>`, 12.9, 20.5],
  ['wallet', copy(t.wallet, t.receipt) + `<div class="phones">${phone('recibo')}${phone('carteira')}</div>`, 20.5, 24.5],
  [
    'outro',
    `<div class="center"><img class="wordmark" src="./wordmark.svg" alt="" /><h1 class="title">${t.outro}</h1><p class="url">beerpassclub.com</p></div>`,
    24.5,
    27.9,
  ],
]

const stage = document.getElementById('stage')
stage.innerHTML = SCENES.map(([id, html]) => `<section class="scene" id="${id}">${html}</section>`).join('')

const ease = [0.22, 1, 0.36, 1]
const sequence = []

for (const [id, , start, end] of SCENES) {
  const root = `#${id}`
  const last = id === 'outro'
  sequence.push([root, { opacity: [0, 1] }, { at: start, duration: 0.45 }])
  sequence.push([`${root} .kicker`, { opacity: [0, 1], x: [-24, 0] }, { at: start + 0.1, duration: 0.5, ease }])
  sequence.push([`${root} .title`, { opacity: [0, 1], y: [28, 0] }, { at: start + 0.2, duration: 0.6, ease }])

  if (document.querySelector(`${root} .phone`)) {
    document.querySelectorAll(`${root} .phone`).forEach((_, i) => {
      sequence.push([
        `${root} .phone:nth-child(${i + 1})`,
        { opacity: [0, 1], y: [90, i === 0 ? 0 : 36], rotate: [i === 0 ? -4 : 4, 0] },
        { at: start + 0.25 + i * 0.18, duration: 0.8, ease },
      ])
    })
    // Deriva lenta enquanto a cena está parada
    sequence.push([`${root} .phones`, { x: [0, -18] }, { at: start, duration: end - start, ease: 'linear' }])
  }

  if (id === 'intro') {
    sequence.push([`${root} .logo`, { opacity: [0, 1], scale: [0.6, 1] }, { at: start + 0.05, duration: 0.7, ease }])
  }

  if (id === 'outro') {
    sequence.push([`${root} .wordmark`, { opacity: [0, 1], scale: [0.85, 1] }, { at: start + 0.05, duration: 0.7, ease }])
    sequence.push([`${root} .url`, { opacity: [0, 1] }, { at: start + 0.7, duration: 0.5 }])
  }

  if (!last) sequence.push([root, { opacity: [1, 0] }, { at: end - 0.4, duration: 0.4 }])
}

const controls = animate(sequence)
controls.pause()

// Cada gravação segue a linha do tempo: o quadro dela é o do instante da cena.
const clips = [...document.querySelectorAll('video')].map((video) => {
  const start = SCENES.find(([id]) => id === video.closest('.scene').id)[2]
  return { video, at: start + Number(video.dataset.delay) }
})

const seekClip = ({ video, at }, time) => {
  const target = Math.min(Math.max(time - at, 0), video.duration - 0.001)
  if (Math.abs(video.currentTime - target) < 0.001) return Promise.resolve()
  return new Promise((resolve) => {
    video.addEventListener('seeked', resolve, { once: true })
    video.currentTime = target
  })
}

window.__duration = SCENES.at(-1)[3]
// Capa: o copo enchendo, na cena de servir.
window.__poster = 17.6
window.__seek = (time) => {
  controls.time = time
  return Promise.all(clips.map((c) => seekClip(c, time)))
}
window.__ready = Promise.all([
  document.fonts.ready,
  ...[...document.images].map((img) => img.decode().catch(() => {})),
  ...clips.map(
    ({ video }) =>
      new Promise((resolve) => {
        if (video.readyState >= 2) resolve()
        else video.addEventListener('loadeddata', resolve, { once: true })
      }),
  ),
])

// Pré-visualização no navegador: ?play toca em tempo real, com as gravações acompanhando.
if (new URLSearchParams(location.search).has('play')) {
  controls.play()
  const tick = () => {
    for (const c of clips) {
      const local = controls.time - c.at
      if (local < 0 || local >= c.video.duration) {
        if (!c.video.paused) c.video.pause()
      } else if (c.video.paused) {
        c.video.currentTime = local
        c.video.play()
      }
    }
    if (controls.time < window.__duration) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}
