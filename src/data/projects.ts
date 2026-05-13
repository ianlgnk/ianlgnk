export type ProjectStatus = 'in_progress' | 'completed' | 'archived'

export type ProjectSlug =
  | 'netracker'
  | 'pyfaces'
  | 'tcc-ecommerce'
  | 'bastianetto'
  | 'academic-cnpq'
  | 'academic-irrigation'

export type Project = {
  slug: ProjectSlug
  tags: string[]
  github?: string
  demo?: string
  featured?: boolean
  status: ProjectStatus
  image?: string
}

/** Projeto em destaque + listagem principal — títulos em `messages.projects.titles`. */
export const mainProjects: Project[] = [
  {
    slug: 'netracker',
    tags: ['React', 'Node.js', 'SaaS'],
    status: 'in_progress',
    featured: true,
    github: '',
    demo: '',
    image: undefined,
  },
  {
    slug: 'pyfaces',
    tags: ['Python', 'Flask', 'DeepFace', 'Android'],
    status: 'completed',
    github: '',
    demo: '',
    image: undefined,
  },
  {
    slug: 'tcc-ecommerce',
    tags: ['UFOP', '2024–2025', 'TCC', 'E-commerce'],
    status: 'completed',
    github: '',
    demo:
      'https://www.monografias.ufop.br/bitstream/35400000/7416/3/MONOGRAFIA_DesenvolvimentoEcommerceMarca.pdf',
    image: undefined,
  },
  {
    slug: 'bastianetto',
    tags: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'Motion', 'Freelance'],
    status: 'completed',
    github: '',
    demo: 'https://www.bastianettoalessi.com.br/',
    image: undefined,
  },
]

/** Projetos acadêmicos (seção colapsável) */
export const academicProjects: Project[] = [
  {
    slug: 'academic-cnpq',
    tags: ['IFNMG', 'Teófilo Otoni', '2018–2019', 'CNPq', 'Pesquisa', 'POO'],
    status: 'completed',
    github: '',
    demo: '',
    image: undefined,
  },
  {
    slug: 'academic-irrigation',
    tags: ['IFNMG', 'Teófilo Otoni', '2017–2018', 'Extensão', 'IoT'],
    status: 'completed',
    github: '',
    demo: '',
    image: undefined,
  },
]
