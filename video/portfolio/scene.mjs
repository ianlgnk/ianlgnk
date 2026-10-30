// Roteiro do vídeo do portfólio: um passeio pelo site real com cursor e legendas, em 4:5 para o LinkedIn.
// Executado por scripts/render-site-video.mjs; `d` é o diretor (cursor, rolagem, cliques e legendas).

export const COPY = {
  'pt-BR': {
    particles: 'Transformei meu nome em<br /><em>partículas.</em>',
    cursor: 'Elas fogem do <em>cursor.</em>',
    click: 'Um clique vira <em>onda de choque.</em>',
    videos: 'Cada projeto ganhou um<br /><em>vídeo feito em código.</em>',
    range: 'App nas lojas, e-commerce e<br /><em>reconhecimento facial.</em>',
    career: 'Minha carreira virou<br /><em>um git log.</em>',
    outro: 'Entra lá e<br /><em>brinca com o nome.</em><small>ianlgnk.github.io/ianlgnk</small>',
    toAbout: '$ cd sobre/',
    toHome: '$ cd ..',
  },
  'en-US': {
    particles: 'I turned my name into<br /><em>particles.</em>',
    cursor: 'They run from your <em>cursor.</em>',
    click: 'One click, <em>a shockwave.</em>',
    videos: 'Every project got a<br /><em>video made in code.</em>',
    range: 'Store apps, e-commerce and<br /><em>face recognition.</em>',
    career: 'My career became<br /><em>a git log.</em>',
    outro: 'Go there and<br /><em>play with the name.</em><small>ianlgnk.github.io/ianlgnk</small>',
    toAbout: '$ cd sobre/',
    toHome: '$ cd ..',
  },
}

/** Capa: o nome já formado, com a primeira legenda. */
export const POSTER_AT = 2

/** Segundo de cada vídeo em que a cena abre: o trecho que melhor mostra o projeto. */
const VIDEO_OFFSETS = { avance: 6.85, 'pedro-porto': 3.8, beerpass: 3.8, inkaboxe: 13.6 }

const HEADER = 64

/** Rola até a linha do projeto ficar à vista, clica nela e acompanha a sanfona abrindo. */
async function openProject(d, slug, hold) {
  await d.scroll(`#${slug}`, 0.7, 330)
  d.move([300, 352], 0.7)
  await d.wait(0.75)
  await d.click()
  d.follow(`#${slug}`, HEADER)
  await d.wait(hold)
}

export async function scene(d, t) {
  await d.open('', '.particles-live', VIDEO_OFFSETS)

  // Os pontos espalhados se juntam no nome
  await d.say(t.particles)
  await d.wait(2.1)

  // O cursor atravessa o nome
  const word = await d.rect('h1 span:last-child')
  const first = await d.rect('h1 span:first-child')
  const bottom = word.top + word.height / 2
  const top = first.top + first.height / 2
  await d.say(t.cursor)
  d.path(
    [
      [word.right + 40, bottom + 150],
      [word.right - 34, bottom + 8],
      [word.left + word.width * 0.62, bottom - 6],
      [word.left + word.width * 0.3, bottom + 8],
      [first.left + 36, top + 4],
      [first.left + first.width * 0.72, top - 6],
      [word.left + word.width * 0.52, (top + bottom) / 2 + 22],
    ],
    2.7,
  )
  await d.wait(2.75)

  // Dois cliques: a onda de choque atravessa os pontos
  await d.say(t.click)
  await d.wait(0.2)
  await d.click()
  await d.wait(0.8)
  d.move([word.left + word.width * 0.84, bottom], 0.28)
  await d.wait(0.3)
  await d.click()
  await d.wait(1.05)

  // Projetos: a Avance já vem aberta
  await d.say(null)
  await d.scroll('#projetos', 1, HEADER - 8)
  d.move([430, 330], 1)
  await d.wait(1.05)
  await d.say(t.videos)
  await d.wait(1.9)

  await openProject(d, 'pedro-porto-design', 1.5)
  await d.say(t.range)
  await d.wait(0.5)
  await openProject(d, 'beerpass-club', 1.6)
  await openProject(d, 'inkaboxe', 2.2)

  // Sobre: o clique é só visual, a navegação de verdade acontece na troca de cena
  await d.say(null)
  await d.unfollow()
  d.move([394, 28], 0.6)
  await d.wait(0.65)
  await d.tap()
  await d.wipe(true, t.toAbout)

  await d.open('sobre/', 'h1')
  await d.scroll(150, 0.1)
  await d.wait(0.12)
  await d.wipe(false, t.toAbout)
  await d.say(t.career)
  d.move([486, 250], 0.1)
  await d.scroll(760, 3.4)
  await d.wait(3.6)
  await d.say(null)
  await d.wait(0.15)
  await d.wipe(true, t.toHome)

  // Contato: fecha com o convite e o endereço
  await d.open('', '.particles-live', VIDEO_OFFSETS)
  await d.scroll('#contato', 0.1, 96)
  d.move([430, 420], 0.1)
  await d.wait(0.12)
  await d.wipe(false, t.toHome)
  await d.say(t.outro)
  d.move(await d.center('#contato a[href*="linkedin"]'), 1.2)
  await d.wait(3.2)
}
