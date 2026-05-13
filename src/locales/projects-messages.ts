import type { ProjectSlug, ProjectStatus } from '@/data/projects'

export type ProjectsMessages = {
  sectionTitle: string
  sectionSubtitle: string
  /** Display title per project (locale-specific; slugs in `data/projects`). */
  titles: Record<ProjectSlug, string>
  featuredLabel: string
  academicSectionTitle: string
  academicToggleShow: string
  academicToggleHide: string
  academicIntro: string
  status: Record<ProjectStatus, string>
  ariaGithub: string
  ariaDemoPdf: string
  ariaDemoSite: string
  descriptions: Record<ProjectSlug, string>
}

export const projectsMessagesPtBR: ProjectsMessages = {
  sectionTitle: 'Projetos',
  sectionSubtitle:
    'Seleção de trabalhos e experimentos — destaque para produto em construção.',
  titles: {
    netracker: 'Netracker',
    pyfaces: 'PyFaces',
    'tcc-ecommerce': 'TCC – E-commerce marca autoral',
    bastianetto: 'Bastianetto Alessi',
    'academic-cnpq': 'Pesquisa CNPq – Atendimento aos discentes',
    'academic-irrigation': 'Extensão – Irrigação automática',
  },
  featuredLabel: 'Destaque',
  academicSectionTitle: 'Outros projetos acadêmicos',
  academicToggleShow: 'Ver projetos acadêmicos',
  academicToggleHide: 'Ocultar projetos acadêmicos',
  academicIntro:
    'Projetos de pesquisa e extensão durante o curso técnico em informática. Projetos desenvolvidos durante a graduação em Sistemas de Informação.',
  status: {
    in_progress: 'Em desenvolvimento',
    completed: 'Concluído',
    archived: 'Arquivado',
  },
  ariaGithub: 'GitHub: {name}',
  ariaDemoPdf: 'Documento PDF: {name}',
  ariaDemoSite: 'Demo ou site: {name}',
  descriptions: {
    netracker:
      'Plataforma SaaS de raspagem e interpretação de dados sobre perfis nas redes sociais para influenciadores, agentes e criadores de conteúdo.',
    pyfaces:
      'API de reconhecimento facial em Python rodando em ambiente Termux/Debian via proot. Possível rodar em qualquer ambiente.',
    'tcc-ecommerce':
      'Trabalho de Conclusão de Curso (UFOP): desenvolvimento de um e-commerce para uma marca autoral de roupas.',
    bastianetto:
      'Site institucional em freelance: páginas estáticas com HTML, CSS e JavaScript, interface com Bootstrap e animações com Motion.',
    'academic-cnpq':
      'Projeto de pesquisa / bolsista CNPq: desenvolvimento de um sistema de informação para gerenciar os atendimentos aos discentes utilizando o paradigma orientado a objetos.',
    'academic-irrigation':
      'Projeto de extensão: controle automático de irrigação para pequenos e médios produtores rurais e agricultura familiar.',
  },
}

export const projectsMessagesEnUS: ProjectsMessages = {
  sectionTitle: 'Projects',
  sectionSubtitle:
    'Selected work and experiments — featuring a product still in active development.',
  titles: {
    netracker: 'Netracker',
    pyfaces: 'PyFaces',
    'tcc-ecommerce': 'Thesis – Author brand e-commerce',
    bastianetto: 'Bastianetto Alessi',
    'academic-cnpq': 'CNPq research – Student support system',
    'academic-irrigation': 'Outreach – Automatic irrigation',
  },
  featuredLabel: 'Featured',
  academicSectionTitle: 'Other academic projects',
  academicToggleShow: 'Show academic projects',
  academicToggleHide: 'Hide academic projects',
  academicIntro:
    'Research and outreach projects during the technical program in IT, plus work from the Information Systems undergraduate degree.',
  status: {
    in_progress: 'In progress',
    completed: 'Completed',
    archived: 'Archived',
  },
  ariaGithub: 'GitHub: {name}',
  ariaDemoPdf: 'PDF document: {name}',
  ariaDemoSite: 'Live demo or site: {name}',
  descriptions: {
    netracker:
      'SaaS platform to scrape and interpret social profile data for influencers, agents, and content creators.',
    pyfaces:
      'Facial recognition API in Python running on Termux/Debian via proot — portable across environments.',
    'tcc-ecommerce':
      'Undergraduate thesis (UFOP): building an e-commerce site for an independent clothing brand.',
    bastianetto:
      'Freelance institutional site: static pages with HTML, CSS, and JavaScript, Bootstrap UI, and Motion-based animations.',
    'academic-cnpq':
      'CNPq-funded research: information system to manage student support workflows using an object-oriented approach.',
    'academic-irrigation':
      'Outreach project: automatic irrigation control for small and medium rural producers and family farming.',
  },
}
