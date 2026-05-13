import type { SkillFilterId } from '@/data/skills'

export type SkillsMessages = {
  sectionTitle: string
  sectionSubtitle: string
  filters: Record<SkillFilterId, string>
  categories: {
    languages: string
    frontend: string
    backend: string
    tools: string
    methodologies: string
  }
  skillCountOne: string
  skillCountOther: string
  filterToolbarAria: string
}

export const skillsMessagesPtBR: SkillsMessages = {
  sectionTitle: 'Habilidades',
  sectionSubtitle:
    'Stack, ferramentas e níveis de proficiência — filtre por área.',
  filters: {
    all: 'Todos',
    frontend: 'Front-end',
    backend: 'Back-end',
    tools: 'Ferramentas',
    methodologies: 'Metodologias',
  },
  categories: {
    languages: 'Linguagens',
    frontend: 'Front-end',
    backend: 'Back-end & DB',
    tools: 'Ferramentas',
    methodologies: 'Metodologias',
  },
  skillCountOne: 'habilidade',
  skillCountOther: 'habilidades',
  filterToolbarAria: 'Filtrar habilidades por categoria',
}

export const skillsMessagesEnUS: SkillsMessages = {
  sectionTitle: 'Skills',
  sectionSubtitle:
    'Stack, tools, and proficiency levels — filter by area.',
  filters: {
    all: 'All',
    frontend: 'Front-end',
    backend: 'Back-end',
    tools: 'Tools',
    methodologies: 'Methodologies',
  },
  categories: {
    languages: 'Languages',
    frontend: 'Front-end',
    backend: 'Back-end & DB',
    tools: 'Tools',
    methodologies: 'Methodologies',
  },
  skillCountOne: 'skill',
  skillCountOther: 'skills',
  filterToolbarAria: 'Filter skills by category',
}
