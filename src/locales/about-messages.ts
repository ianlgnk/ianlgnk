import type { collegeRepos } from '@/data/other-works'

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
  otherWorks: {
    title: string
    freelance: string
    collegeTitle: string
    collegeIntro: string
    demo: string
    items: Record<'react-native-mesmart' | 'bastianetto' | 'tcc-ecommerce', string>
    college: Record<(typeof collegeRepos)[number]['id'], string>
  }
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
  otherWorks: {
    title: 'Outros trabalhos',
    freelance: 'Freelance',
    collegeTitle: 'Projetos da faculdade',
    collegeIntro: 'Repositórios da graduação, para referência.',
    demo: 'demo',
    items: {
      'react-native-mesmart': "Biblioteca open source de módulos nativos Android para maquininhas POS: leitura RFID (Mifare), impressão térmica e pagamentos com Stone, PagBank e Paystore, em terminais Sunmi, Gertec, PAX e Tectoy. Criada e mantida por Ian, usada nas POS da Beerpass.",
      bastianetto: "Site institucional para o escritório Bastianetto Alessi, feito como freelance.",
      'tcc-ecommerce': "Trabalho de conclusão do curso: plataforma de e-commerce para uma marca independente de roupas.",
    },
    college: {
        'atelie-da-gisa': "SPA de vendas de macramê: Next.js, Firebase, shadcn.",
        'pandafilmes-frontend': "Catálogo de filmes com Vue, Vuetify, Vue Router e Vuex.",
        'social4devs-frontend': "Rede social para devs: Vue 3, TypeScript, Naive UI.",
        'github-profile-explorer': "Busca de usuários do GitHub (React, TypeScript e API).",
        'clt-pj-converter': "Conversor de salário CLT → PJ (Vue 3, TypeScript).",
        'cassandra-project': "Exploração do Cassandra (NoSQL): front Vue e API em Node.",
        'shot_in_fly': "Jogo em Java (JDK 8) com sockets e threads.",
        'guess-the-number': "Adivinha o número (React).",
        'todo-list': "To-do com Vue e localStorage.",
        'insertion-sort_assembly': "Insertion sort em Assembly (UFOP).",
        'snake-fila': "Snake em C com lógica de fila (UFOP).",
        'tcc': "Front-end do TCC (Vite, TypeScript), deploy no Firebase.",
        'tcc-cloudfunctions': "Cloud Functions (TypeScript) do TCC.",
    },
  },
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
  otherWorks: {
    title: 'Other work',
    freelance: 'Freelance',
    collegeTitle: 'College projects',
    collegeIntro: 'Repositories from my degree, for reference.',
    demo: 'demo',
    items: {
      'react-native-mesmart': "Open-source library of native Android modules for POS terminals: RFID (Mifare) reading, thermal printing and payments with Stone, PagBank and Paystore, on Sunmi, Gertec, PAX and Tectoy devices. Built and maintained by Ian, used on Beerpass's POS terminals.",
      bastianetto: "Institutional website for the Bastianetto Alessi firm, built as a freelance job.",
      'tcc-ecommerce': "Undergraduate thesis: e-commerce platform for an independent clothing brand.",
    },
    college: {
        'atelie-da-gisa': "Macramé sales SPA: Next.js, Firebase, shadcn.",
        'pandafilmes-frontend': "Movie catalog with Vue, Vuetify, Vue Router and Vuex.",
        'social4devs-frontend': "Social network for developers: Vue 3, TypeScript, Naive UI.",
        'github-profile-explorer': "GitHub user search (React, TypeScript and API).",
        'clt-pj-converter': "Brazilian CLT → PJ salary converter (Vue 3, TypeScript).",
        'cassandra-project': "Exploring Cassandra (NoSQL): Vue front end and Node API.",
        'shot_in_fly': "Java (JDK 8) game with sockets and threads.",
        'guess-the-number': "Guess-the-number game (React).",
        'todo-list': "To-do list with Vue and localStorage.",
        'insertion-sort_assembly': "Insertion sort in Assembly (UFOP).",
        'snake-fila': "Snake in C using queue logic (UFOP).",
        'tcc': "Thesis front end (Vite, TypeScript), Firebase deploy.",
        'tcc-cloudfunctions': "Cloud Functions (TypeScript) for the thesis.",
    },
  },
}
