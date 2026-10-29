export type WorkLink = { label: string; href: string }

export type OtherWork = {
  id: 'bastianetto' | 'tcc-ecommerce'
  /** Nome próprio: não é traduzido. */
  name: string
  year: string
  tags: readonly string[]
  links: readonly WorkLink[]
}

/** Trabalhos fora do currículo principal. Textos por locale: `messages.about.otherWorks.items`. */
export const otherWorks: readonly OtherWork[] = [
  {
    id: 'bastianetto',
    name: 'Bastianetto Alessi',
    year: '2021',
    tags: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
    links: [{ label: 'bastianettoalessi.com.br', href: 'https://www.bastianettoalessi.com.br/' }],
  },
  {
    id: 'tcc-ecommerce',
    name: 'TCC · UFOP',
    year: '2024–2025',
    tags: ['Vite', 'TypeScript', 'Firebase', 'Cloud Functions'],
    links: [
      { label: 'tcc', href: 'https://github.com/ianlgnk/tcc' },
      { label: 'tcc-cloudfunctions', href: 'https://github.com/ianlgnk/tcc-cloudfunctions' },
    ],
  },
]

export type CollegeRepo = { id: string; href: string; demo?: string }

const repo = (id: string, demo?: string): CollegeRepo => ({
  id,
  href: `https://github.com/ianlgnk/${id}`,
  ...(demo ? { demo } : {}),
})

/** Repositórios da graduação (descrições em `messages.about.otherWorks.college`). */
export const collegeRepos = [
  repo('atelie-da-gisa'),
  repo('pandafilmes-frontend'),
  repo('social4devs-frontend'),
  repo('github-profile-explorer', 'https://githubexplorer-ianlgk.netlify.app/'),
  repo('clt-pj-converter', 'https://converter-clt-pj.netlify.app/'),
  repo('cassandra-project'),
  repo('shot_in_fly'),
  repo('guess-the-number', 'https://guess-the-number-ianlgk.netlify.app/'),
  repo('todo-list', 'https://todo-list-ianlgk.netlify.app/'),
  repo('insertion-sort_assembly'),
  repo('snake-fila'),
  repo('tcc'),
  repo('tcc-cloudfunctions'),
] as const satisfies readonly CollegeRepo[]
