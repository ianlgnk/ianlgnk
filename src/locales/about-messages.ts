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
    'Engenheiro de Software Full Stack com sólida base em tecnologias web, mobile e experiência prática desde os 15 anos. Atua em projetos com foco em front-end e back-end, utilizando frameworks modernos e metodologias ágeis. Entusiasta de boas práticas de código, arquitetura limpa e aprendizado contínuo.',
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
    'Full Stack Software Engineer with a strong foundation in web and mobile technologies and hands-on experience since age 15. Works on projects focused on front-end and back-end, using modern frameworks and agile practices. Passionate about clean code, solid architecture, and continuous learning.',
  sinceLine: 'Programming since age 15.',
  education: [
    {
      title: "Bachelor's in Information Systems",
      institution: 'Federal University of Ouro Preto (UFOP)',
      period: '2020–2025',
    },
    {
      title: 'Technical degree in Internet Informatics',
      institution: 'IFNMG, Teófilo Otoni campus',
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
