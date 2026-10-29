export type ProjectSlug =
  | 'avance-trainer'
  | 'pedro-porto-design'
  | 'beerpass-club'
  | 'inkaboxe'

export type ProjectLink = {
  kind: 'site' | 'play-store' | 'app-store'
  href: string
}

export type ProjectMediaSource =
  | { type: 'image'; src: string; alt: string }
  | { type: 'video'; src: string; poster: string }

export type Project = {
  slug: ProjectSlug
  /** Nome próprio: não é traduzido. */
  name: string
  tags: readonly string[]
  links: readonly ProjectLink[]
  /** Sem link público (repositórios privados). */
  isPrivate?: boolean
  /** Mídia real; enquanto ausente, a UI mostra o bloco de pontos (mock). */
  media?: ProjectMediaSource
}

/** Ordem de exibição definida pelo Ian. Textos por locale: `messages.projects.items`. */
export const projects: readonly Project[] = [
  {
    slug: 'avance-trainer',
    name: 'Avance Trainer',
    tags: ['Expo/React Native', 'React 19', 'Firebase', 'Gemini'],
    links: [{ kind: 'site', href: 'https://avancetrainer.com' }],
  },
  {
    slug: 'pedro-porto-design',
    name: 'Pedro Porto Design',
    tags: ['React 19', 'TypeScript', 'Tailwind', 'Firebase', 'Mercado Pago'],
    links: [{ kind: 'site', href: 'https://pedroportodesign.online' }],
  },
  {
    slug: 'beerpass-club',
    name: 'Beerpass Club',
    tags: ['React Native', 'Expo'],
    links: [
      {
        kind: 'play-store',
        href: 'https://play.google.com/store/apps/details?id=com.beerpass.clientapp&hl=pt_BR',
      },
      {
        kind: 'app-store',
        href: 'https://apps.apple.com/br/app/beerpass-club/id1605400165',
      },
    ],
  },
  {
    slug: 'inkaboxe',
    name: 'InkaBoxe',
    tags: ['Python', 'FastAPI', 'DeepFace', 'React', 'PWA', 'Firebase'],
    links: [],
    isPrivate: true,
  },
]
