// Composição do vídeo do Avance. Cada cena entra e sai numa linha do tempo do `motion`;
// a linha do tempo fica pausada e é posicionada por `window.__seek(t)` (render quadro a quadro).
import { animate } from 'motion'

const COPY = {
  'pt-BR': {
    student: 'App do aluno',
    coach: 'Painel do treinador',
    intro: 'O app que seu aluno <em>quer usar.</em>',
    daily: 'Treino do dia, séries e cargas <em>num toque.</em>',
    wins: 'Cada treino vira <em>uma conquista.</em>',
    bond: 'Toda semana, um resumo e <em>um recado seu.</em>',
    club: 'Desafios com amigos fazem o aluno <em>voltar.</em>',
    turn: 'Aluno engajado é <em>aluno que fica.</em>',
    outro: 'Retenção do aluno é <em>bom pra você.</em>',
  },
  'en-US': {
    student: 'Client app',
    coach: 'Coach dashboard',
    intro: 'The app your clients <em>actually want to use.</em>',
    daily: "Today's workout, sets and loads <em>in one tap.</em>",
    wins: 'Every workout becomes <em>a win.</em>',
    bond: 'Every week, a recap and <em>a note from you.</em>',
    club: 'Challenges with friends keep them <em>coming back.</em>',
    turn: 'Engaged clients <em>stay.</em>',
    outro: 'Client retention is <em>good for you.</em>',
  },
}

const lang = new URLSearchParams(location.search).get('lang') === 'en-US' ? 'en-US' : 'pt-BR'
const t = COPY[lang]
document.documentElement.lang = lang

const phone = (name) => `<div class="phone"><img src="./screens/${name}.jpg" alt="" /></div>`
const copy = (kicker, title) =>
  `<div class="copy"><p class="kicker">${kicker}</p><h1 class="title">${title}</h1></div>`

/** [id, html, início (s), fim (s)] */
const SCENES = [
  ['intro', `<div class="center"><img class="logo" src="./logo.svg" alt="" /><h1 class="title">${t.intro}</h1></div>`, 0, 2.8],
  ['daily', copy(t.student, t.daily) + `<div class="phones">${phone('inicio')}${phone('treino')}</div>`, 2.8, 6.6],
  ['wins', copy(t.student, t.wins) + `<div class="phones">${phone('sequencia')}${phone('carga')}</div>`, 6.6, 10.4],
  ['bond', copy(t.student, t.bond) + `<div class="phones">${phone('semana')}${phone('recado')}</div>`, 10.4, 14.2],
  ['club', copy(t.student, t.club) + `<div class="phones">${phone('clube')}${phone('evolucao')}</div>`, 14.2, 17.8],
  [
    'turn',
    copy(t.coach, t.turn) +
      `<div class="browser"><div class="browser-bar"><i></i><i></i><i></i><span>app.avancetrainer.com</span></div>` +
      `<div class="browser-view"><img src="./screens/painel.jpg" alt="" /></div></div>`,
    17.8,
    22,
  ],
  ['outro', `<div class="center"><img class="logo" src="./logo.svg" alt="" /><h1 class="title">${t.outro}</h1><p class="url">avancetrainer.com</p></div>`, 22, 25.4],
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

  if (id === 'intro' || id === 'outro') {
    sequence.push([`${root} .logo`, { opacity: [0, 1], scale: [0.6, 1] }, { at: start + 0.05, duration: 0.7, ease }])
    sequence.push([`${root} .url`, { opacity: [0, 1] }, { at: start + 0.7, duration: 0.5 }])
  }

  if (id === 'turn') {
    sequence.push([`${root} .browser`, { opacity: [0, 1], x: [80, 0] }, { at: start + 0.2, duration: 0.8, ease }])
    sequence.push([`${root} .browser-view img`, { scale: [1, 2.4] }, { at: start + 1.2, duration: 2.2, ease }])
  }

  if (!last) sequence.push([root, { opacity: [1, 0] }, { at: end - 0.4, duration: 0.4 }])
}

const controls = animate(sequence)
controls.pause()

window.__duration = SCENES.at(-1)[3]
window.__seek = (time) => {
  controls.time = time
}
window.__ready = Promise.all([
  document.fonts.ready,
  ...[...document.images].map((img) => img.decode().catch(() => {})),
])

// Pré-visualização no navegador: ?play toca em tempo real.
if (new URLSearchParams(location.search).has('play')) controls.play()
