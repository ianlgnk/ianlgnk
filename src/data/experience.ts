import appsaudeagoraLogo from "@/assets/appsaudeagora_logo.jpeg";
import beerpassClubLogo from "@/assets/beerpass_club_logo.jpeg";
import visaoTecnologiaLogo from "@/assets/viso_tecnologia_e_sistemas_jr_logo.jpeg";

export type ExperienceId =
  | "beerpass-senior"
  | "beerpass-pleno"
  | "saude-pleno"
  | "saude-junior"
  | "visao-junior";

/** Dados estáveis (logos, URLs, stack). Textos por locale: `messages.experience.items`. */
export type ExperienceCore = {
  id: ExperienceId;
  company: string;
  /** URL resolvida (ex.: import de `@/assets/...`) */
  logoSrc: string;
  /** Site oficial da empresa */
  websiteUrl: string;
  technologies: readonly string[];
  /** Cargo atual — badge e dot com destaque verde */
  current: boolean;
};

export const experienceCore: readonly ExperienceCore[] = [
  {
    id: "beerpass-senior",
    company: "Beerpass Club",
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
    current: true,
  },
  {
    id: "beerpass-pleno",
    company: "Beerpass Club",
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
    current: false,
  },
  {
    id: "saude-pleno",
    company: "Saúde Agora",
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
    current: false,
  },
  {
    id: "saude-junior",
    company: "Saúde Agora",
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
    current: false,
  },
  {
    id: "visao-junior",
    company: "Visão Tecnologia e Sistemas",
    logoSrc: visaoTecnologiaLogo,
    websiteUrl: "https://www.visaojunior.com.br/",
    technologies: ["HTML", "CSS", "JavaScript", "React", "TypeScript"],
    current: false,
  },
] as const;

/** Cartão na UI = core + cópia localizada (ver `useExperienceItems`). */
export type ExperienceItem = ExperienceCore & {
  role: string;
  period: string;
  duration: string;
  responsibilities: string;
};
