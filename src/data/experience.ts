export type ExperienceId =
  | 'beerpass-senior'
  | 'beerpass-pleno'
  | 'saude-pleno'
  | 'saude-junior'
  | 'visao-junior'

/** Dados estáveis (empresa, stack). Textos por locale: `messages.experience.items`. */
export type ExperienceEntry = {
  id: ExperienceId
  company: string
  technologies: readonly string[]
  /** Cargo atual (vira `HEAD` no git log). */
  current: boolean
  /** Mês de início do cargo atual: a duração é calculada, não digitada. */
  since?: { year: number; month: number }
}

/** Mais recente primeiro. */
export const experience: readonly ExperienceEntry[] = [
  {
    id: 'beerpass-senior',
    company: 'Beerpass Club',
    technologies: ['React Native', 'TypeScript', 'Kotlin', 'Java', 'Node.js', 'Firebase', 'Expo/EAS'],
    current: true,
    since: { year: 2026, month: 1 },
  },
  {
    id: 'beerpass-pleno',
    company: 'Beerpass Club',
    technologies: ['React Native', 'React', 'TypeScript', 'Node.js', 'Firebase', 'Kotlin', 'Swift'],
    current: false,
  },
  {
    id: 'saude-pleno',
    company: 'Saúde Agora',
    technologies: ['Java', 'Hibernate', 'PostgreSQL', 'Vue.js', 'JavaScript'],
    current: false,
  },
  {
    id: 'saude-junior',
    company: 'Saúde Agora',
    technologies: ['Java', 'Hibernate', 'PostgreSQL', 'Vue.js', 'JavaScript'],
    current: false,
  },
  {
    id: 'visao-junior',
    company: 'Visão Tecnologia e Sistemas',
    technologies: ['HTML', 'CSS', 'JavaScript', 'React', 'TypeScript'],
    current: false,
  },
]
