// Composição do vídeo da Pedro Porto Studios. Cada cena entra e sai numa linha do tempo do
// `motion`; a linha do tempo fica pausada e é posicionada por `window.__seek(t)` (render quadro a quadro).
import { animate } from 'motion'

const COPY = {
  'pt-BR': {
    portfolio: 'Portfólio',
    shop: 'Loja',
    checkout: 'Checkout',
    payment: 'Pagamento',
    intro: 'O trabalho do Pedro, <em>do portfólio à loja.</em>',
    archive: 'Um arquivo visual <em>reconstruído em código.</em>',
    project: 'Cada projeto com <em>sua própria página.</em>',
    collection: 'A coleção inteira, <em>do grid ao carrinho.</em>',
    product: 'Modelo, tamanho e <em>tabela de medidas.</em>',
    mobile: 'Checkout pensado <em>para o celular.</em>',
    pay: 'Pix ou cartão, <em>via Mercado Pago.</em>',
    outro: 'Design autoral, <em>agora à venda.</em>',
  },
  'en-US': {
    portfolio: 'Portfolio',
    shop: 'Shop',
    checkout: 'Checkout',
    payment: 'Payment',
    intro: "Pedro's work, <em>from portfolio to shop.</em>",
    archive: 'A visual archive, <em>rebuilt in code.</em>',
    project: 'Every project gets <em>its own page.</em>',
    collection: 'The whole collection, <em>from grid to cart.</em>',
    product: 'Model, size and <em>size chart.</em>',
    mobile: 'A checkout built <em>for the phone.</em>',
    pay: 'Pix or card, <em>through Mercado Pago.</em>',
    outro: 'Original design, <em>now for sale.</em>',
  },
}

const lang = new URLSearchParams(location.search).get('lang') === 'en-US' ? 'en-US' : 'pt-BR'
const t = COPY[lang]
document.documentElement.lang = lang

const phone = (name) => `<div class="phone"><img src="./screens/${name}.jpg" alt="" /></div>`
const copy = (kicker, title) =>
  `<div class="copy"><p class="kicker">${kicker}</p><h1 class="title">${title}</h1></div>`
const browser = (url, ...screens) =>
  `<div class="browser"><div class="browser-bar"><i></i><i></i><i></i><span>${url}</span></div>` +
  `<div class="browser-view">${screens.map((s, i) => `<img${i ? ' class="over"' : ''} src="./screens/${s}.jpg" alt="" />`).join('')}</div></div>`
const center = (title, url = '') =>
  `<div class="center"><img class="logo" src="./logo.png" alt="" /><h1 class="title">${title}</h1>${url && `<p class="url">${url}</p>`}</div>`

/** [id, html, início (s), fim (s)] */
const SCENES = [
  ['intro', center(t.intro), 0, 2.8],
  ['arquivo', copy(t.portfolio, t.archive) + browser('pedroportodesign.online', 'portfolio'), 2.8, 6.8],
  ['projeto', copy(t.portfolio, t.project) + browser('pedroportodesign.online/projects/graphic-shirt-collection', 'projeto'), 6.8, 10.4],
  ['colecao', copy(t.shop, t.collection) + browser('shop.pedroportodesign.online', 'colecao', 'carrinho'), 10.4, 14.8],
  ['produto', copy(t.shop, t.product) + `<div class="phones">${phone('produto')}${phone('tamanho')}</div>`, 14.8, 18.4],
  ['celular', copy(t.checkout, t.mobile) + `<div class="phones">${phone('entrega')}${phone('pagamento')}</div>`, 18.4, 22],
  ['pagar', copy(t.payment, t.pay) + `<div class="phones">${phone('cartao')}${phone('pedido')}</div>`, 22, 25.8],
  ['outro', center(t.outro, 'pedroportodesign.online'), 25.8, 29.2],
]

const stage = document.getElementById('stage')
stage.innerHTML = SCENES.map(([id, html]) => `<section class="scene" id="${id}">${html}</section>`).join('')

const ease = [0.22, 1, 0.36, 1]
const inOut = [0.65, 0, 0.35, 1]
const sequence = []

// Capturas de desktop: 1400 px de largura na janela de 704 px.
const scrollBy = (img) => 704 * (img.naturalHeight / img.naturalWidth) - 440

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

  if (document.querySelector(`${root} .browser`)) {
    sequence.push([`${root} .browser`, { opacity: [0, 1], x: [80, 0] }, { at: start + 0.2, duration: 0.8, ease }])
    // Deriva lenta, como a dos celulares
    sequence.push([`${root} .browser`, { x: [0, -14] }, { at: start + 1, duration: end - start - 1, ease: 'linear' }])
  }

  if (id === 'intro' || id === 'outro') {
    sequence.push([`${root} .logo`, { opacity: [0, 1], scale: [0.6, 1], rotate: [-12, 0] }, { at: start + 0.05, duration: 0.7, ease }])
    sequence.push([`${root} .url`, { opacity: [0, 1] }, { at: start + 0.7, duration: 0.5 }])
  }

  if (!last) sequence.push([root, { opacity: [1, 0] }, { at: end - 0.4, duration: 0.4 }])
}

let controls
window.__duration = SCENES.at(-1)[3]
window.__seek = (time) => {
  controls.time = time
}
// A rolagem depende da altura das capturas, então a linha do tempo só fecha com as imagens decodificadas.
window.__ready = Promise.all([document.fonts.ready, ...[...document.images].map((i) => i.decode().catch(() => {}))]).then(() => {
  // Rola o portfólio, aproxima a grade de camisetas, rola a coleção e abre o carrinho.
  const img = (selector) => document.querySelector(selector)
  sequence.push(['#arquivo .browser-view img', { y: [0, -scrollBy(img('#arquivo .browser-view img')) * 0.8] }, { at: 3.8, duration: 2.8, ease: inOut }])
  sequence.push(['#projeto .browser-view img', { scale: [1, 1.9] }, { at: 7.9, duration: 2.2, ease }])
  sequence.push(['#colecao .browser-view img:not(.over)', { y: [0, -Math.min(300, scrollBy(img('#colecao .browser-view img')))] }, { at: 11.3, duration: 1.6, ease: inOut }])
  sequence.push(['#colecao .browser-view .over', { opacity: [0, 1] }, { at: 12.9, duration: 0.5 }])

  controls = animate(sequence)
  controls.pause()
  // Pré-visualização no navegador: ?play toca em tempo real.
  if (new URLSearchParams(location.search).has('play')) controls.play()
})
