export type ProjectStatus = "in_progress" | "completed" | "archived";

export type Project = {
  name: string;
  description: string;
  tags: string[];
  github?: string;
  demo?: string;
  /** Card em destaque (largura total, layout horizontal) */
  featured?: boolean;
  status: ProjectStatus;
  /** URL da imagem de preview; omitir para usar placeholder */
  image?: string;
};

const statusLabel: Record<ProjectStatus, string> = {
  in_progress: "Em desenvolvimento",
  completed: "Concluído",
  archived: "Arquivado",
};

export function getProjectStatusLabel(status: ProjectStatus): string {
  return statusLabel[status];
}

/** Projeto em destaque + listagem principal */
export const mainProjects: Project[] = [
  {
    name: "Netracker",
    description:
      "Plataforma SaaS de raspagem e interpretação de dados sobre perfis nas redes sociais para influenciadores, agentes e criadores de conteúdo.",
    tags: ["React", "Node.js", "SaaS"],
    status: "in_progress",
    featured: true,
    // Adicione `github`, `demo` e `image` quando estiverem disponíveis.
    github: "",
    demo: "",
    image: undefined,
  },
  {
    name: "PyFaces",
    description:
      "API de reconhecimento facial em Python rodando em ambiente Termux/Debian via proot. Possível rodar em qualquer ambiente.",
    tags: ["Python", "Flask", "DeepFace", "Android"],
    status: "completed",
    github: "",
    demo: "",
    image: undefined,
  },
  {
    name: "TCC – E-commerce marca autoral",
    description:
      "Trabalho de Conclusão de Curso (UFOP): desenvolvimento de um e-commerce para uma marca autoral de roupas.",
    tags: ["UFOP", "2024–2025", "TCC", "E-commerce"],
    status: "completed",
    github: "",
    demo:
      "https://www.monografias.ufop.br/bitstream/35400000/7416/3/MONOGRAFIA_DesenvolvimentoEcommerceMarca.pdf",
    image: undefined,
  },
  {
    name: "Bastianetto Alessi",
    description:
      "Site institucional em freelance: páginas estáticas com HTML, CSS e JavaScript, interface com Bootstrap e animações com Motion.",
    tags: ["HTML", "CSS", "JavaScript", "Bootstrap", "Motion", "Freelance"],
    status: "completed",
    github: "",
    demo: "https://www.bastianettoalessi.com.br/",
    image: undefined,
  },
];

/** Projetos acadêmicos (seção colapsável) */
export const academicProjects: Project[] = [
  {
    name: "Pesquisa CNPq – Atendimento aos discentes",
    description:
      "Projeto de pesquisa / bolsista CNPq: desenvolvimento de um sistema de informação para gerenciar os atendimentos aos discentes utilizando o paradigma orientado a objetos.",
    tags: ["IFNMG", "Teófilo Otoni", "2018–2019", "CNPq", "Pesquisa", "POO"],
    status: "completed",
    github: "",
    demo: "",
    image: undefined,
  },
  {
    name: "Extensão – Irrigação automática",
    description:
      "Projeto de extensão: controle automático de irrigação para pequenos e médios produtores rurais e agricultura familiar.",
    tags: ["IFNMG", "Teófilo Otoni", "2017–2018", "Extensão", "IoT"],
    status: "completed",
    github: "",
    demo: "",
    image: undefined,
  },
];
