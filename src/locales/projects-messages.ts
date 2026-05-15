import type { CollegeGithubRepoSlug } from "@/data/college-github-repos";
import type { ProjectSlug, ProjectStatus } from "@/data/projects";

export type ProjectsMessages = {
  sectionTitle: string;
  sectionSubtitle: string;
  /** Display title per project (locale-specific; slugs in `data/projects`). */
  titles: Record<ProjectSlug, string>;
  featuredLabel: string;
  academicSectionTitle: string;
  academicToggleShow: string;
  academicToggleHide: string;
  academicTechnicalSectionTitle: string;
  academicTechnicalIntro: string;
  collegeGithubSectionTitle: string;
  collegeGithubIntro: string;
  collegeGithubTitles: Record<CollegeGithubRepoSlug, string>;
  collegeGithubDescriptions: Record<CollegeGithubRepoSlug, string>;
  status: Record<ProjectStatus, string>;
  ariaGithub: string;
  ariaDemoPdf: string;
  ariaDemoSite: string;
  descriptions: Record<ProjectSlug, string>;
};

export const projectsMessagesPtBR: ProjectsMessages = {
  sectionTitle: "Projetos",
  sectionSubtitle:
    "Seleção de trabalhos e experimentos — destaque para produto em construção.",
  titles: {
    netracker: "Netracker",
    pyfaces: "PyFaces",
    "tcc-ecommerce": "TCC – E-commerce marca autoral",
    bastianetto: "Bastianetto Alessi",
    "academic-cnpq": "Pesquisa CNPq – Atendimento aos discentes",
    "academic-irrigation": "Extensão – Irrigação automática",
  },
  featuredLabel: "Destaque",
  academicSectionTitle: "Outros projetos acadêmicos",
  academicToggleShow: "Ver projetos acadêmicos",
  academicToggleHide: "Ocultar projetos acadêmicos",
  academicTechnicalSectionTitle: "Ensino médio técnico (IFNMG)",
  academicTechnicalIntro:
    "Pesquisa com bolsa CNPq e projeto de extensão durante o curso técnico em informática — menos centrais no percurso profissional atual, mas parte da formação.",
  collegeGithubSectionTitle: "Repositórios no GitHub (faculdade)",
  collegeGithubIntro:
    "Referência a trabalhos versionados no GitHub durante a graduação (UFOP) — laboratórios, TCC e exercícios.",
  collegeGithubTitles: {
    "atelie-da-gisa": "Ateliê da Gisa",
    "ufop-tcc-frontend": "TCC — front-end (Vite)",
    "ufop-tcc-cloudfunctions": "TCC — Cloud Functions",
    "pandafilmes-frontend": "Panda Filmes",
    "shot-in-fly": "Shot in Fly",
    "cassandra-project": "Cassandra (NoSQL)",
    "social4devs-frontend": "Social4Devs",
    "clt-pj-converter": "Conversor CLT → PJ",
    "insertion-sort-assembly": "Insertion sort em Assembly",
    "github-profile-explorer": "GitHub Profile Explorer",
    "guess-the-number": "Guess the Number",
    "todo-list": "To-do List",
    "snake-fila": "Snake com fila",
  },
  collegeGithubDescriptions: {
    "atelie-da-gisa":
      "SPA de vendas de peças em macramê (cliente real): Next.js, Firebase e interface com shadcn/ui.",
    "ufop-tcc-frontend":
      "Front-end do Trabalho de Conclusão de Curso: Vite, TypeScript e integração com Firebase.",
    "ufop-tcc-cloudfunctions":
      "Backend serverless em Firebase Cloud Functions (TypeScript) ligado ao TCC.",
    "pandafilmes-frontend":
      "Catálogo de filmes com Vue, Vuetify, Vue Router e Vuex.",
    "shot-in-fly":
      "Jogo em rede em Java (JDK 8) com sockets e threads — um processo servidor e vários clientes.",
    "cassandra-project":
      "Projeto académico sobre Cassandra (NoSQL) com front em Vue e API em Node.",
    "social4devs-frontend":
      "Front-end de rede social para programadores com Vue 3, TypeScript e Naive UI.",
    "clt-pj-converter":
      "Calculadora de salário PJ a partir do salário CLT (Vue 3 + TypeScript), publicada na Netlify.",
    "insertion-sort-assembly":
      "Algoritmo insertion sort em Assembly — disciplina de Organização de Computadores (UFOP).",
    "github-profile-explorer":
      "Explorador de perfis GitHub com React, TypeScript e a API REST do GitHub.",
    "guess-the-number": "Jogo de adivinhar número com React; demo na Netlify.",
    "todo-list":
      "Lista de tarefas com Vue e persistência em localStorage; demo na Netlify.",
    "snake-fila":
      "Variante do jogo Snake em C usando fila — trabalho de Algoritmos e Estruturas de Dados (UFOP).",
  },
  status: {
    in_progress: "Em desenvolvimento",
    completed: "Concluído",
    archived: "Arquivado",
  },
  ariaGithub: "GitHub: {name}",
  ariaDemoPdf: "Documento PDF: {name}",
  ariaDemoSite: "Demo ou site: {name}",
  descriptions: {
    netracker:
      "Plataforma SaaS de raspagem e interpretação de dados sobre perfis nas redes sociais para influenciadores, agentes e criadores de conteúdo.",
    pyfaces:
      "API de reconhecimento facial em Python rodando em ambiente Termux/Debian via proot. Possível rodar em qualquer ambiente.",
    "tcc-ecommerce":
      "Trabalho de Conclusão de Curso (UFOP): desenvolvimento de um e-commerce para uma marca autoral de roupas.",
    bastianetto:
      "Site institucional em freelance: páginas estáticas com HTML, CSS e JavaScript, interface com Bootstrap e animações com Motion.",
    "academic-cnpq":
      "Projeto de pesquisa / bolsista CNPq: desenvolvimento de um sistema de informação para gerenciar os atendimentos aos discentes utilizando o paradigma orientado a objetos.",
    "academic-irrigation":
      "Projeto de extensão: controle automático de irrigação para pequenos e médios produtores rurais e agricultura familiar.",
  },
};

export const projectsMessagesEnUS: ProjectsMessages = {
  sectionTitle: "Projects",
  sectionSubtitle:
    "Selected work and experiments — featuring a product still in active development.",
  titles: {
    netracker: "Netracker",
    pyfaces: "PyFaces",
    "tcc-ecommerce": "Thesis – Author brand e-commerce",
    bastianetto: "Bastianetto Alessi",
    "academic-cnpq": "CNPq research – Student support system",
    "academic-irrigation": "Outreach – Automatic irrigation",
  },
  featuredLabel: "Featured",
  academicSectionTitle: "Other academic projects",
  academicToggleShow: "Show academic projects",
  academicToggleHide: "Hide academic projects",
  academicTechnicalSectionTitle: "Technical high school (IFNMG)",
  academicTechnicalIntro:
    "CNPq research scholarship and an outreach project from the IT technical program — earlier in my path, less central to my current work, but part of how I got started.",
  collegeGithubSectionTitle: "GitHub repositories (college)",
  collegeGithubIntro:
    "Versioned coursework from my degree — labs, thesis stack, and side experiments on GitHub.",
  collegeGithubTitles: {
    "atelie-da-gisa": "Ateliê da Gisa",
    "ufop-tcc-frontend": "Thesis — front-end (Vite)",
    "ufop-tcc-cloudfunctions": "Thesis — Cloud Functions",
    "pandafilmes-frontend": "Panda Filmes",
    "shot-in-fly": "Shot in Fly",
    "cassandra-project": "Cassandra (NoSQL)",
    "social4devs-frontend": "Social4Devs",
    "clt-pj-converter": "CLT → PJ salary converter",
    "insertion-sort-assembly": "Insertion sort in Assembly",
    "github-profile-explorer": "GitHub Profile Explorer",
    "guess-the-number": "Guess the Number",
    "todo-list": "To-do List",
    "snake-fila": "Snake with a queue",
  },
  collegeGithubDescriptions: {
    "atelie-da-gisa":
      "Sales SPA for macramé pieces (real client): Next.js, Firebase, and shadcn/ui.",
    "ufop-tcc-frontend":
      "Front-end for my undergraduate thesis: Vite, TypeScript, and Firebase integration.",
    "ufop-tcc-cloudfunctions":
      "Serverless Firebase Cloud Functions (TypeScript) backing the thesis project.",
    "pandafilmes-frontend":
      "Movie catalog with Vue, Vuetify, Vue Router, and Vuex.",
    "shot-in-fly":
      "Networked game in Java (JDK 8) with sockets and threads — one server, many clients.",
    "cassandra-project":
      "College exploration of Cassandra (NoSQL) with a Vue front end and Node API.",
    "social4devs-frontend":
      "Developer-social front end with Vue 3, TypeScript, and Naive UI.",
    "clt-pj-converter":
      "Brazilian CLT-to-PJ salary estimator (Vue 3 + TypeScript), deployed on Netlify.",
    "insertion-sort-assembly":
      "Insertion sort written in Assembly for Computer Organization (UFOP).",
    "github-profile-explorer":
      "GitHub profile explorer with React, TypeScript, and the GitHub REST API.",
    "guess-the-number": "Number-guessing game in React; live demo on Netlify.",
    "todo-list":
      "Task list with Vue and localStorage persistence; demo on Netlify.",
    "snake-fila":
      "Snake variant in C using a queue — Algorithms & Data Structures coursework (UFOP).",
  },
  status: {
    in_progress: "In progress",
    completed: "Completed",
    archived: "Archived",
  },
  ariaGithub: "GitHub: {name}",
  ariaDemoPdf: "PDF document: {name}",
  ariaDemoSite: "Live demo or site: {name}",
  descriptions: {
    netracker:
      "SaaS platform to scrape and interpret social profile data for influencers, agents, and content creators.",
    pyfaces:
      "Facial recognition API in Python running on Termux/Debian via proot — portable across environments.",
    "tcc-ecommerce":
      "Undergraduate thesis (UFOP): building an e-commerce site for an independent clothing brand.",
    bastianetto:
      "Freelance institutional site: static pages with HTML, CSS, and JavaScript, Bootstrap UI, and Motion-based animations.",
    "academic-cnpq":
      "CNPq-funded research: information system to manage student support workflows using an object-oriented approach.",
    "academic-irrigation":
      "Outreach project: automatic irrigation control for small and medium rural producers and family farming.",
  },
};
