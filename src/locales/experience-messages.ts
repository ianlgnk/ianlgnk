import type { ExperienceId } from '@/data/experience'

export type ExperienceItemCopy = {
  role: string
  period: string
  duration: string
  responsibilities: string
}

export type ExperienceMessages = {
  sectionTitle: string
  sectionSubtitle: string
  /** Use `{company}` placeholder. */
  visitSiteAria: string
  badgeCurrent: string
  badgePast: string
  responsibilitiesToggle: string
  responsibilitiesPlaceholder: string
  items: Record<ExperienceId, ExperienceItemCopy>
}

export const experienceMessagesPtBR: ExperienceMessages = {
  sectionTitle: 'Experiência',
  sectionSubtitle:
    'Trajetória profissional em ordem cronológica (mais recente primeiro).',
  visitSiteAria: 'Visitar site de {company} (abre em nova aba)',
  badgeCurrent: 'Atual',
  badgePast: 'Anterior',
  responsibilitiesToggle: 'Responsabilidades',
  responsibilitiesPlaceholder: 'Descrição das responsabilidades em breve.',
  items: {
    'beerpass-senior': {
      role: 'Engenheiro de Software Full Stack Sênior',
      period: 'Jan/2026 – atual',
      duration: '5 meses',
      responsibilities: '',
    },
    'beerpass-pleno': {
      role: 'Engenheiro de Software Full Stack Pleno',
      period: 'Mai/2023 – Jan/2026',
      duration: '2 anos e 9 meses',
      responsibilities: '',
    },
    'saude-pleno': {
      role: 'Desenvolvedor Full Stack Pleno',
      period: 'Out/2022 – Abr/2023',
      duration: '7 meses',
      responsibilities: '',
    },
    'saude-junior': {
      role: 'Desenvolvedor Full Stack Júnior',
      period: 'Out/2021 – Out/2022',
      duration: '1 ano',
      responsibilities: '',
    },
    'visao-junior': {
      role: 'Desenvolvedor Web',
      period: 'Jun/2021 – Dez/2021',
      duration: '7 meses',
      responsibilities:
        'Desenvolvimento web com HTML, CSS e JavaScript, além de interfaces com React e TypeScript.',
    },
  },
}

export const experienceMessagesEnUS: ExperienceMessages = {
  sectionTitle: 'Experience',
  sectionSubtitle:
    'Professional path in chronological order (most recent first).',
  visitSiteAria: 'Visit {company} website (opens in a new tab)',
  badgeCurrent: 'Current',
  badgePast: 'Past',
  responsibilitiesToggle: 'Responsibilities',
  responsibilitiesPlaceholder: 'Responsibilities description coming soon.',
  items: {
    'beerpass-senior': {
      role: 'Senior Full Stack Software Engineer',
      period: 'Jan/2026 – present',
      duration: '5 months',
      responsibilities: '',
    },
    'beerpass-pleno': {
      role: 'Mid-level Full Stack Software Engineer',
      period: 'May/2023 – Jan/2026',
      duration: '2 years 9 months',
      responsibilities: '',
    },
    'saude-pleno': {
      role: 'Mid-level Full Stack Developer',
      period: 'Oct/2022 – Apr/2023',
      duration: '7 months',
      responsibilities: '',
    },
    'saude-junior': {
      role: 'Junior Full Stack Developer',
      period: 'Oct/2021 – Oct/2022',
      duration: '1 year',
      responsibilities: '',
    },
    'visao-junior': {
      role: 'Web Developer',
      period: 'Jun/2021 – Dec/2021',
      duration: '7 months',
      responsibilities:
        'Web development with HTML, CSS, and JavaScript, plus interfaces with React and TypeScript.',
    },
  },
}
