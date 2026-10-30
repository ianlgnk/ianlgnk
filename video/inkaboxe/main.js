// Composição do vídeo da InkaBoxe. Cada cena entra e sai numa linha do tempo do `motion`;
// a linha do tempo fica pausada e é posicionada por `window.__seek(t)` (render quadro a quadro).
// As telas da gestão são capturas do sistema com dados fictícios; a verificação no tablet é montada
// aqui (avatar neutro, sem rosto de ninguém), com as mensagens da tela de reconhecimento do sistema.
import { animate } from 'motion'

const COPY = {
  'pt-BR': {
    manage: 'Gestão',
    students: 'Alunos',
    recognition: 'Reconhecimento',
    attendance: 'Presenças',
    intro: 'Gestão da academia com <em>reconhecimento facial.</em>',
    dashboard: 'Toda a academia <em>num painel só.</em>',
    fees: 'Matrículas, planos e <em>mensalidades do mês.</em>',
    verify: 'Cadastro e verificação <em>no próprio tablet.</em>',
    local: 'API local em Python (FastAPI + DeepFace), sem depender de cloud. A gestão é um PWA instalado no tablet.',
    rhythm: 'O ritmo das aulas e <em>os horários mais cheios.</em>',
    outro: 'Rosto reconhecido, <em>presença registrada.</em>',
  },
  'en-US': {
    manage: 'Management',
    students: 'Students',
    recognition: 'Recognition',
    attendance: 'Attendance',
    intro: 'Gym management with <em>face recognition.</em>',
    dashboard: 'The whole gym, <em>one dashboard.</em>',
    fees: 'Enrollments, plans and <em>monthly fees.</em>',
    verify: 'Enrollment and verification <em>on the tablet itself.</em>',
    local: 'A local Python API (FastAPI + DeepFace), no cloud needed. The management app is a PWA installed on the tablet.',
    rhythm: 'Class rhythm and <em>the busiest hours.</em>',
    outro: 'Face recognized, <em>attendance logged.</em>',
  },
}

const lang = new URLSearchParams(location.search).get('lang') === 'en-US' ? 'en-US' : 'pt-BR'
const t = COPY[lang]
document.documentElement.lang = lang

// Ícones no traço do lucide, como no sistema
const icon = (paths, size = 24, stroke = 2) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round">${paths
    .map((d) => `<path d="${d}"/>`)
    .join('')}</svg>`
const SCAN_FACE = ['M3 7V5a2 2 0 0 1 2-2h2', 'M17 3h2a2 2 0 0 1 2 2v2', 'M21 17v2a2 2 0 0 1-2 2h-2', 'M7 21H5a2 2 0 0 1-2-2v-2', 'M8 14s1.5 2 4 2 4-2 4-2', 'M9 9h.01', 'M15 9h.01']
const CHECK = ['M21.801 10A10 10 0 1 1 17 3.335', 'm9 11 3 3L22 4']
const MENU = ['M4 12h16', 'M4 18h16', 'M4 6h16']

const copy = (kicker, title, note = '') =>
  `<div class="copy"><p class="kicker">${kicker}</p><h1 class="title">${title}</h1>${note && `<p class="note">${note}</p>`}</div>`
const browser = (inner) =>
  `<div class="browser"><div class="browser-bar"><i></i><i></i><i></i><span>Inka Boxe</span></div><div class="browser-view">${inner}</div></div>`
const shot = (name, cls = '') => `<img${cls && ` class="${cls}"`} src="./screens/${name}.jpg" alt="" />`

// Câmera do tablet: fundo de academia desfocado e uma silhueta neutra no lugar da pessoa.
const camera = `<svg class="cam" viewBox="0 0 640 432" width="640" height="432">
  <defs>
    <radialGradient id="room" cx="52%" cy="38%" r="75%">
      <stop offset="0" stop-color="#3b2e26"/><stop offset="0.55" stop-color="#1d1613"/><stop offset="1" stop-color="#0c0908"/>
    </radialGradient>
    <linearGradient id="skin" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#6a5a50"/><stop offset="1" stop-color="#3a2f29"/>
    </linearGradient>
    <linearGradient id="shirt" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#2f2723"/><stop offset="1" stop-color="#16110f"/>
    </linearGradient>
    <filter id="soft"><feGaussianBlur stdDeviation="5"/></filter>
  </defs>
  <rect width="640" height="432" fill="url(#room)"/>
  <g filter="url(#soft)" opacity="0.8">
    <rect x="70" y="-10" width="70" height="250" rx="30" fill="#5a2a1c"/>
    <rect x="102" y="-10" width="5" height="40" fill="#2a2420"/>
    <rect x="520" y="40" width="90" height="150" rx="6" fill="#2b2420"/>
    <rect x="0" y="330" width="640" height="102" fill="#0f0c0b"/>
  </g>
  <path d="M150 432 C160 350 222 312 274 300 L366 300 C418 312 480 350 490 432 Z" fill="url(#shirt)"/>
  <rect x="294" y="236" width="52" height="72" rx="20" fill="url(#skin)"/>
  <ellipse cx="320" cy="172" rx="58" ry="72" fill="url(#skin)"/>
  <ellipse cx="320" cy="172" rx="58" ry="72" fill="none" stroke="#e88e24" stroke-opacity="0.18" stroke-width="2"/>
</svg>`

// Pontos de referência do rosto que aparecem durante a análise (ilustrativos, sobre a silhueta)
const MARKS = [[290, 160], [350, 160], [320, 188], [304, 212], [320, 216], [336, 212], [272, 140], [368, 140], [278, 200], [362, 200], [296, 236], [344, 236], [320, 244], [320, 120]]
const marks = `<svg class="marks" viewBox="0 0 640 432" width="640" height="432">
  <path d="M272 140 L290 160 L320 188 L350 160 L368 140 M278 200 L304 212 L320 216 L336 212 L362 200 M296 236 L320 244 L344 236 M290 160 L320 120 L350 160 M320 188 L320 216" fill="none" stroke="#e88e24" stroke-opacity="0.45" stroke-width="1"/>
  ${MARKS.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.6" fill="#ffd8a8"/>`).join('')}
</svg>`

const corners = (cls) =>
  `<svg class="${cls}" viewBox="0 0 184 222" width="184" height="222" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"><path d="M2 32V14A12 12 0 0 1 14 2h18M152 2h18a12 12 0 0 1 12 12v18M182 190v18a12 12 0 0 1-12 12h-18M32 220H14A12 12 0 0 1 2 208v-18"/></svg>`

const tablet = `<div class="tablet"><div class="screen">
  ${camera}${marks}
  <div class="guide">${corners('base')}${corners('hold')}${corners('ok')}</div>
  <div class="scanline"></div>
  <div class="cam-menu">${icon(MENU, 18)}</div>
  <div class="status">
    <p class="s1">Centralize o rosto</p>
    <p class="s2">Fique parado</p>
    <p class="s3"><span class="spin"></span>Analisando rosto...</p>
    <p class="s4 found">${icon(CHECK, 17)}Aluno identificado</p>
  </div>
  <div class="sheet">
    <div class="handle"></div>
    <h3 class="sheet-title">${icon(CHECK, 19)}Aluno identificado</h3>
    <p class="sheet-sub">Confira os dados do aluno identificado.</p>
    <div class="student">
      <div class="avatar">RD</div>
      <div><b>Rafael Duarte</b><small>Matrícula: 4821</small></div>
      <span class="fee">${icon(CHECK, 15)}Mensalidade em dia</span>
    </div>
    <p class="pick">Selecione a modalidade disponível e depois o horário.</p>
    <div class="chips"><span class="chip on">🥊 Boxe</span><span class="chip">🇹🇭 Muay thai</span><span class="chip on">19:00</span><span class="chip">20:00</span></div>
    <div class="mark">Marcar presença</div>
  </div>
  <div class="toasts"><div class="toast">${icon(CHECK, 16)}Ponto registrado.</div></div>
</div></div>`

const center = (top, title, extra = '') => `<div class="center">${top}<h1 class="title">${title}</h1>${extra}</div>`
const logo = `<div class="logo">${icon(SCAN_FACE, 112, 1.6)}</div>`

/** [id, html, início (s), fim (s)] */
const SCENES = [
  ['intro', center(logo, t.intro), 0, 2.8],
  ['painel', copy(t.manage, t.dashboard) + browser(shot('painel')), 2.8, 6.4],
  ['alunos', copy(t.students, t.fees) + browser(shot('alunos') + shot('mensalidades', 'over')), 6.4, 10.8],
  ['verificar', copy(t.recognition, t.verify, t.local) + tablet, 10.8, 18.6],
  ['presencas', copy(t.attendance, t.rhythm) + browser(shot('presencas') + '<div class="pin side"></div><div class="pin head"></div>'), 18.6, 23],
  [
    'outro',
    center('<p class="wordmark">Inka<span>Boxe</span></p>', t.outro, '<p class="stack">Python · FastAPI · DeepFace · React PWA · Firebase</p>'),
    23,
    26.8,
  ],
]

const stage = document.getElementById('stage')
stage.innerHTML = SCENES.map(([id, html]) => `<section class="scene" id="${id}">${html}</section>`).join('')

const ease = [0.22, 1, 0.36, 1]
const inOut = [0.65, 0, 0.35, 1]
const sequence = []

for (const [id, , start, end] of SCENES) {
  const root = `#${id}`
  const last = id === 'outro'
  sequence.push([root, { opacity: [0, 1] }, { at: start, duration: 0.45 }])
  sequence.push([`${root} .kicker`, { opacity: [0, 1], x: [-24, 0] }, { at: start + 0.1, duration: 0.5, ease }])
  sequence.push([`${root} .title`, { opacity: [0, 1], y: [28, 0] }, { at: start + 0.2, duration: 0.6, ease }])
  if (document.querySelector(`${root} .note`)) {
    sequence.push([`${root} .note`, { opacity: [0, 1], y: [16, 0] }, { at: start + 0.5, duration: 0.6, ease }])
  }

  if (document.querySelector(`${root} .browser`)) {
    sequence.push([`${root} .browser`, { opacity: [0, 1], x: [80, 0] }, { at: start + 0.2, duration: 0.8, ease }])
    // Deriva lenta enquanto a cena está parada
    sequence.push([`${root} .browser`, { x: [0, -14] }, { at: start + 1, duration: end - start - 1, ease: 'linear' }])
  }

  if (id === 'intro') {
    sequence.push([`${root} .logo`, { opacity: [0, 1], scale: [0.6, 1] }, { at: start + 0.05, duration: 0.7, ease }])
  }

  if (id === 'outro') {
    sequence.push([`${root} .wordmark`, { opacity: [0, 1], scale: [0.85, 1] }, { at: start + 0.05, duration: 0.7, ease }])
    sequence.push([`${root} .stack`, { opacity: [0, 1] }, { at: start + 0.7, duration: 0.5 }])
  }

  if (!last) sequence.push([root, { opacity: [1, 0] }, { at: end - 0.4, duration: 0.4 }])
}

// Painel: aproxima os atalhos. Alunos: aproxima a lista e a mensalidade do mês entra por cima.
sequence.push(['#painel .browser-view img', { scale: [1, 1.32] }, { at: 3.9, duration: 2.2, ease }])
sequence.push(['#alunos .browser-view img:not(.over)', { scale: [1, 1.22] }, { at: 7.3, duration: 1.9, ease }])
sequence.push(['#alunos .browser-view .over', { opacity: [0, 1] }, { at: 8.8, duration: 0.5 }])

// Verificação no tablet (S = início da cena)
const S = 10.8
sequence.push(['#verificar .tablet', { opacity: [0, 1], y: [70, 0], rotate: [3, 0] }, { at: S + 0.25, duration: 0.8, ease }])
sequence.push(['#verificar .tablet', { x: [0, -16] }, { at: S + 1, duration: 6.8, ease: 'linear' }])
const pill = (n, from, to) => {
  sequence.push([`#verificar .s${n}`, { opacity: [0, 1], y: [10, 0] }, { at: S + from, duration: 0.3, ease }])
  if (to) sequence.push([`#verificar .s${n}`, { opacity: [1, 0] }, { at: S + to, duration: 0.2 }])
}
sequence.push(['#verificar .guide .base', { opacity: [0, 1], scale: [1.12, 1] }, { at: S + 0.9, duration: 0.5, ease }])
pill(1, 1.0, 2.2)
// Fique parado: o quadro fecha e fica laranja
pill(2, 2.3, 3.0)
sequence.push(['#verificar .guide', { scale: [1, 0.96] }, { at: S + 2.3, duration: 0.4, ease }])
sequence.push(['#verificar .guide .hold', { opacity: [0, 1] }, { at: S + 2.3, duration: 0.25 }])
// Analisando: varredura e pontos de referência
pill(3, 3.1, 4.3)
sequence.push(['#verificar .spin', { rotate: [0, 540] }, { at: S + 3.1, duration: 1.2, ease: 'linear' }])
sequence.push(['#verificar .scanline', { opacity: [0, 1] }, { at: S + 3.1, duration: 0.2 }])
sequence.push(['#verificar .scanline', { y: [0, 196, 0] }, { at: S + 3.1, duration: 1.2, ease: inOut }])
sequence.push(['#verificar .scanline', { opacity: [1, 0] }, { at: S + 4.2, duration: 0.2 }])
sequence.push(['#verificar .marks', { opacity: [0, 1] }, { at: S + 3.3, duration: 0.5 }])
sequence.push(['#verificar .marks', { opacity: [1, 0] }, { at: S + 4.5, duration: 0.4 }])
// Identificado: o quadro fica verde e a gaveta com o aluno sobe
pill(4, 4.4)
sequence.push(['#verificar .guide .ok', { opacity: [0, 1] }, { at: S + 4.4, duration: 0.25 }])
sequence.push(['#verificar .guide', { scale: [0.96, 1] }, { at: S + 4.4, duration: 0.4, ease }])
sequence.push(['#verificar .sheet', { y: [340, 0] }, { at: S + 4.9, duration: 0.7, ease }])
sequence.push(['#verificar .mark', { scale: [1, 0.95, 1] }, { at: S + 6.4, duration: 0.3 }])
sequence.push(['#verificar .toast', { opacity: [0, 1], y: [-16, 0] }, { at: S + 6.65, duration: 0.4, ease }])

let controls
window.__duration = SCENES.at(-1)[3]
// Capa: o aluno identificado na gaveta do tablet.
window.__poster = 16.4
window.__seek = (time) => {
  controls.time = time
}
// A rolagem das presenças depende da altura da captura, então a linha do tempo só fecha com as imagens decodificadas.
window.__ready = Promise.all([document.fonts.ready, ...[...document.images].map((i) => i.decode().catch(() => {}))]).then(() => {
  const img = document.querySelector('#presencas .browser-view img')
  const scroll = 704 * (img.naturalHeight / img.naturalWidth) - 440
  sequence.push(['#presencas .browser-view img', { y: [0, -scroll] }, { at: 19.8, duration: 2.6, ease: inOut }])

  controls = animate(sequence)
  controls.pause()
  // Pré-visualização no navegador: ?play toca em tempo real.
  if (new URLSearchParams(location.search).has('play')) controls.play()
})
