import appsaudeagoraLogo from "@/assets/appsaudeagora_logo.jpeg";
import beerpassClubLogo from "@/assets/beerpass_club_logo.jpeg";
import visaoTecnologiaLogo from "@/assets/viso_tecnologia_e_sistemas_jr_logo.jpeg";

export type ExperienceItem = {
  id: string;
  role: string;
  company: string;
  period: string;
  duration: string;
  /** Cargo atual — badge e dot com destaque verde */
  current: boolean;
  /** URL resolvida (ex.: import de `@/assets/...`) */
  logoSrc: string;
  /** Site oficial da empresa */
  websiteUrl: string;
  technologies: readonly string[];
  /** Responsabilidades; vazio = acordeão só com slot */
  responsibilities: string;
};

export const experience: ExperienceItem[] = [
  {
    id: "beerpass-senior",
    role: "Engenheiro de Software Full Stack Sênior",
    company: "Beerpass Club",
    period: "Jan/2026 – atual",
    duration: "5 meses",
    current: true,
    logoSrc: beerpassClubLogo,
    websiteUrl: "https://www.beerpassclub.com/",
    technologies: [
      "React Native",
      "Angular",
      "React",
      "Next",
      "Node.js",
      "TypeScript",
      "Kotlin",
      "Firebase",
      "AWS",
    ],
    responsibilities: "",
  },
  {
    id: "beerpass-pleno",
    role: "Engenheiro de Software Full Stack Pleno",
    company: "Beerpass Club",
    period: "Mai/2023 – Jan/2026",
    duration: "2 anos e 9 meses",
    current: false,
    logoSrc: beerpassClubLogo,
    websiteUrl: "https://www.beerpassclub.com/",
    technologies: [
      "React Native",
      "Angular",
      "React",
      "Next",
      "Node.js",
      "TypeScript",
      "Kotlin",
      "Firebase",
      "AWS",
    ],
    responsibilities: "",
  },
  {
    id: "saude-pleno",
    role: "Desenvolvedor Full Stack Pleno",
    company: "Saúde Agora",
    period: "Out/2022 – Abr/2023",
    duration: "7 meses",
    current: false,
    logoSrc: appsaudeagoraLogo,
    websiteUrl: "https://www.saudeagora.com.vc/",
    technologies: [
      "Vue",
      "Hibernate",
      "Node.js",
      "JavaScript",
      "TypeScript",
      "Java",
      "PostgreSQL",
    ],
    responsibilities: "",
  },
  {
    id: "saude-junior",
    role: "Desenvolvedor Full Stack Júnior",
    company: "Saúde Agora",
    period: "Out/2021 – Out/2022",
    duration: "1 ano",
    current: false,
    logoSrc: appsaudeagoraLogo,
    websiteUrl: "https://www.saudeagora.com.vc/",
    technologies: [
      "Vue",
      "Hibernate",
      "Node.js",
      "JavaScript",
      "TypeScript",
      "Java",
      "PostgreSQL",
    ],
    responsibilities: "",
  },
  {
    id: "visao-junior",
    role: "Desenvolvedor Web",
    company: "Visão Tecnologia e Sistemas",
    period: "Jun/2021 – Dez/2021",
    duration: "7 meses",
    current: false,
    logoSrc: visaoTecnologiaLogo,
    websiteUrl: "https://www.visaojunior.com.br/",
    technologies: ["HTML", "CSS", "JavaScript", "React", "TypeScript"],
    responsibilities:
      "Desenvolvimento web com HTML, CSS e JavaScript, além de interfaces com React e TypeScript.",
  },
];
