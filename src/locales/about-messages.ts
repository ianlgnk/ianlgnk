export type AboutEducationCopy = {
  title: string
  institution: string
  period: string
}

export type AboutMessages = {
  title: string
  /** Rótulo em rosa no topo da página (`$ git log --experience`). */
  logLabel: string
  /** Rótulo do commit mais recente. */
  headLabel: string
  bioTitle: string
  skillsTitle: string
  summary: string
  sinceLine: string
  education: readonly [AboutEducationCopy, AboutEducationCopy, AboutEducationCopy]
  downloadCv: string
  backHome: string
}

export const aboutMessagesPtBR: AboutMessages = {
  title: 'Sobre',
  logLabel: '$ git log --experience',
  headLabel: 'HEAD → atual',
  bioTitle: 'Sobre',
  skillsTitle: 'Skills',
  summary:
    'Engenheiro de Software e Arquiteto Sênior com mais de 5 anos de experiência construindo produtos mobile, web e embarcados em terminais POS de ponta a ponta, da arquitetura e do código ao deploy e ao monitoramento. Forte em React Native, TypeScript e Node.js, com experiência nativa em Kotlin, Java e Swift.',
  sinceLine: 'Programo desde os 15 anos.',
  education: [
    {
      title: 'Bacharelado em Sistemas de Informação',
      institution: 'UFOP',
      period: '2020–2025',
    },
    {
      title: 'Técnico em Informática para Internet',
      institution: 'IFNMG, Campus Teófilo Otoni',
      period: '2017–2019',
    },
    {
      title: 'Inglês Avançado',
      institution: 'Cambridge B2',
      period: '2020',
    },
  ],
  downloadCv: 'Baixar CV',
  backHome: 'Voltar ao início',
}

export const aboutMessagesEnUS: AboutMessages = {
  title: 'About',
  logLabel: '$ git log --experience',
  headLabel: 'HEAD → current',
  bioTitle: 'About',
  skillsTitle: 'Skills',
  summary:
    'Senior Software Engineer and Architect with 5+ years of experience building mobile, web and embedded-POS products end to end, from architecture and code to deployment and monitoring. Strong in React Native, TypeScript and Node.js, with native Kotlin, Java and Swift experience.',
  sinceLine: 'Programming since age 15.',
  education: [
    {
      title: "Bachelor's in Information Systems",
      institution: 'Federal University of Ouro Preto (UFOP)',
      period: '2020–2025',
    },
    {
      title: 'Technical Degree in Web Development (integrated with high school)',
      institution: 'Federal Institute of Northern Minas Gerais (IFNMG)',
      period: '2017–2019',
    },
    {
      title: 'Advanced English',
      institution: 'Cambridge B2',
      period: '2020',
    },
  ],
  downloadCv: 'Download CV',
  backHome: 'Back home',
}
