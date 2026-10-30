import type { Locale } from '@/lib/locale'

export type ProjectSlug =
  | 'avance-trainer'
  | 'pedro-porto-design'
  | 'beerpass-club'
  | 'inkaboxe'

export type ProjectLink = {
  kind: 'site' | 'play-store' | 'app-store'
  href: string
}

/** Caminhos relativos a `public/` (a UI aplica `withBase`). */
export type VideoFiles = { webm: string; mp4: string; poster: string }

export type ProjectMediaSource =
  | { type: 'image'; src: string; alt: string }
  /** Uma versão por idioma: os textos estão dentro do vídeo. */
  | { type: 'video'; sources: Record<Locale, VideoFiles> }

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
    // Gerado por `node scripts/render-video.mjs avance` a partir de video/avance/.
    media: {
      type: 'video',
      sources: {
        'pt-BR': {
          webm: 'projects/avance/video-pt.webm',
          mp4: 'projects/avance/video-pt.mp4',
          poster: 'projects/avance/poster-pt.jpg',
        },
        'en-US': {
          webm: 'projects/avance/video-en.webm',
          mp4: 'projects/avance/video-en.mp4',
          poster: 'projects/avance/poster-en.jpg',
        },
      },
    },
  },
  {
    slug: 'pedro-porto-design',
    name: 'Pedro Porto Studios',
    tags: ['React 19', 'TypeScript', 'Tailwind', 'Firebase', 'Mercado Pago'],
    links: [{ kind: 'site', href: 'https://pedroportodesign.online' }],
    // Gerado por `node scripts/render-video.mjs pedro-porto` a partir de video/pedro-porto/.
    media: {
      type: 'video',
      sources: {
        'pt-BR': {
          webm: 'projects/pedro-porto/video-pt.webm',
          mp4: 'projects/pedro-porto/video-pt.mp4',
          poster: 'projects/pedro-porto/poster-pt.jpg',
        },
        'en-US': {
          webm: 'projects/pedro-porto/video-en.webm',
          mp4: 'projects/pedro-porto/video-en.mp4',
          poster: 'projects/pedro-porto/poster-en.jpg',
        },
      },
    },
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
    // Gerado por `node scripts/render-video.mjs beerpass` a partir de video/beerpass/.
    media: {
      type: 'video',
      sources: {
        'pt-BR': {
          webm: 'projects/beerpass/video-pt.webm',
          mp4: 'projects/beerpass/video-pt.mp4',
          poster: 'projects/beerpass/poster-pt.jpg',
        },
        'en-US': {
          webm: 'projects/beerpass/video-en.webm',
          mp4: 'projects/beerpass/video-en.mp4',
          poster: 'projects/beerpass/poster-en.jpg',
        },
      },
    },
  },
  {
    slug: 'inkaboxe',
    name: 'InkaBoxe',
    tags: ['Python', 'FastAPI', 'DeepFace', 'React', 'PWA', 'Firebase'],
    links: [],
    isPrivate: true,
    // Gerado por `node scripts/render-video.mjs inkaboxe` a partir de video/inkaboxe/.
    media: {
      type: 'video',
      sources: {
        'pt-BR': {
          webm: 'projects/inkaboxe/video-pt.webm',
          mp4: 'projects/inkaboxe/video-pt.mp4',
          poster: 'projects/inkaboxe/poster-pt.jpg',
        },
        'en-US': {
          webm: 'projects/inkaboxe/video-en.webm',
          mp4: 'projects/inkaboxe/video-en.mp4',
          poster: 'projects/inkaboxe/poster-en.jpg',
        },
      },
    },
  },
]
