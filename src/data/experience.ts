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
}

/** Mais recente primeiro. */
export const experience: readonly ExperienceEntry[] = [
  {
    id: 'beerpass-senior',
    company: 'Beerpass Club',
    technologies: ['React Native', 'Angular', 'React', 'Next', 'Node.js', 'TypeScript', 'Kotlin', 'Firebase', 'AWS'],
    current: true,
  },
  {
    id: 'beerpass-pleno',
    company: 'Beerpass Club',
    technologies: ['React Native', 'Angular', 'React', 'Next', 'Node.js', 'TypeScript', 'Kotlin', 'Firebase', 'AWS'],
    current: false,
  },
  {
    id: 'saude-pleno',
    company: 'Saúde Agora',
    technologies: ['Vue', 'Hibernate', 'Node.js', 'JavaScript', 'TypeScript', 'Java', 'PostgreSQL'],
    current: false,
  },
  {
    id: 'saude-junior',
    company: 'Saúde Agora',
    technologies: ['Vue', 'Hibernate', 'Node.js', 'JavaScript', 'TypeScript', 'Java', 'PostgreSQL'],
    current: false,
  },
  {
    id: 'visao-junior',
    company: 'Visão Tecnologia e Sistemas',
    technologies: ['HTML', 'CSS', 'JavaScript', 'React', 'TypeScript'],
    current: false,
  },
]
