/**
 * Repositórios públicos no GitHub desenvolvidos durante a graduação (UFOP / IFNMG).
 * Pré-visualizações opcionais: ficheiros em `public/college-projects/`.
 * `statusYear` = ano de referência ao lado do estado (última atividade relevante no repo).
 */
export type CollegeGithubRepoSlug =
  | 'atelie-da-gisa'
  | 'ufop-tcc-frontend'
  | 'ufop-tcc-cloudfunctions'
  | 'pandafilmes-frontend'
  | 'shot-in-fly'
  | 'cassandra-project'
  | 'social4devs-frontend'
  | 'clt-pj-converter'
  | 'insertion-sort-assembly'
  | 'github-profile-explorer'
  | 'guess-the-number'
  | 'todo-list'
  | 'snake-fila'

export type CollegeGithubRepo = {
  slug: CollegeGithubRepoSlug
  tags: readonly string[]
  github: string
  demo?: string
  previewFile?: string
  statusYear: number
}

export const collegeGithubRepos: readonly CollegeGithubRepo[] = [
  {
    slug: 'atelie-da-gisa',
    tags: ['Next.js', 'Firebase', 'TypeScript', 'shadcn/ui'],
    github: 'https://github.com/ianlgnk/atelie-da-gisa',
    statusYear: 2026,
  },
  {
    slug: 'ufop-tcc-frontend',
    tags: ['Vite', 'TypeScript', 'Firebase'],
    github: 'https://github.com/ianlgnk/tcc',
    statusYear: 2024,
  },
  {
    slug: 'ufop-tcc-cloudfunctions',
    tags: ['Firebase', 'Cloud Functions', 'TypeScript'],
    github: 'https://github.com/ianlgnk/tcc-cloudfunctions',
    statusYear: 2024,
  },
  {
    slug: 'pandafilmes-frontend',
    tags: ['Vue', 'Vuetify', 'Vue Router', 'Vuex'],
    github: 'https://github.com/ianlgnk/pandafilmes-frontend',
    statusYear: 2023,
  },
  {
    slug: 'shot-in-fly',
    tags: ['Java', 'JDK 8', 'Sockets', 'Threads'],
    github: 'https://github.com/ianlgnk/shot_in_fly',
    statusYear: 2022,
  },
  {
    slug: 'cassandra-project',
    tags: ['Cassandra', 'Vue', 'Node.js', 'NoSQL'],
    github: 'https://github.com/ianlgnk/cassandra-project',
    statusYear: 2023,
  },
  {
    slug: 'social4devs-frontend',
    tags: ['Vue 3', 'TypeScript', 'Naive UI'],
    github: 'https://github.com/ianlgnk/social4devs-frontend',
    statusYear: 2023,
  },
  {
    slug: 'clt-pj-converter',
    tags: ['Vue 3', 'TypeScript'],
    github: 'https://github.com/ianlgnk/clt-pj-converter',
    demo: 'https://converter-clt-pj.netlify.app/',
    previewFile: 'converter-clt-pj.png',
    statusYear: 2022,
  },
  {
    slug: 'insertion-sort-assembly',
    tags: ['Assembly', 'UFOP', 'COA'],
    github: 'https://github.com/ianlgnk/insertion-sort_assembly',
    statusYear: 2022,
  },
  {
    slug: 'github-profile-explorer',
    tags: ['React', 'TypeScript', 'GitHub API'],
    github: 'https://github.com/ianlgnk/github-profile-explorer',
    demo: 'https://githubexplorer-ianlgk.netlify.app/',
    previewFile: 'github-explorer.gif',
    statusYear: 2021,
  },
  {
    slug: 'guess-the-number',
    tags: ['React', 'JavaScript'],
    github: 'https://github.com/ianlgnk/guess-the-number',
    demo: 'https://guess-the-number-ianlgk.netlify.app/',
    previewFile: 'guess-the-number.gif',
    statusYear: 2022,
  },
  {
    slug: 'todo-list',
    tags: ['Vue', 'Vuex', 'localStorage'],
    github: 'https://github.com/ianlgnk/todo-list',
    demo: 'https://todo-list-ianlgk.netlify.app/',
    previewFile: 'ToDo-Gif.gif',
    statusYear: 2021,
  },
  {
    slug: 'snake-fila',
    tags: ['C', 'Fila', 'AEDS', 'UFOP'],
    github: 'https://github.com/ianlgnk/snake-fila',
    statusYear: 2021,
  },
]

export function collegeRepoPreviewUrl(previewFile: string) {
  const base = import.meta.env.BASE_URL
  return `${base}college-projects/${previewFile}`
}
