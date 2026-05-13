/** Filtros da UI (sem item separado para Linguagens — só em “Todos”) */
export type SkillFilterId =
  | "all"
  | "frontend"
  | "backend"
  | "tools"
  | "methodologies";

export type SkillEntry = {
  name: string;
  /** 0–100 */
  proficiency: number;
  /** Slug Simple Icons — `https://cdn.simpleicons.org/{slug}` ou com cor em `simpleIconHex` */
  simpleIconSlug?: string;
  /** Hex sem `#` — força cor no CDN (útil para contraste no dark) */
  simpleIconHex?: string;
};

export type SkillCategory = {
  id: string;
  title: string;
  /**
   * Categorias com tag entram nos filtros nomeados.
   * `undefined` = só visível em “Todos” (ex.: Linguagens).
   */
  filterTag?: Exclude<SkillFilterId, "all">;
  skills: SkillEntry[];
};

export const skillFilterOptions: { id: SkillFilterId; label: string }[] = [
  { id: "all", label: "Todos" },
  { id: "frontend", label: "Front-end" },
  { id: "backend", label: "Back-end" },
  { id: "tools", label: "Ferramentas" },
  { id: "methodologies", label: "Metodologias" },
];

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    title: "Linguagens",
    skills: [
      { name: "JavaScript", proficiency: 80, simpleIconSlug: "javascript" },
      { name: "TypeScript", proficiency: 95, simpleIconSlug: "typescript" },
      { name: "Kotlin", proficiency: 50, simpleIconSlug: "kotlin" },
    ],
  },
  {
    id: "frontend",
    title: "Front-end",
    filterTag: "frontend",
    skills: [
      { name: "React", proficiency: 95, simpleIconSlug: "react" },
      { name: "React Native", proficiency: 80, simpleIconSlug: "react" },
      {
        name: "Angular",
        proficiency: 60,
        simpleIconSlug: "angular",
        simpleIconHex: "DD0031",
      },
      {
        name: "Expo",
        proficiency: 75,
        simpleIconSlug: "expo",
        simpleIconHex: "4630EB",
      },
      { name: "Vue", proficiency: 50, simpleIconSlug: "vuedotjs" },
    ],
  },
  {
    id: "backend",
    title: "Back-end & DB",
    filterTag: "backend",
    skills: [
      { name: "Node.js", proficiency: 90, simpleIconSlug: "nodedotjs" },
      { name: "Firebase", proficiency: 90, simpleIconSlug: "firebase" },
      { name: "AWS", proficiency: 55, simpleIconSlug: "amazonaws" },
      { name: "Docker", proficiency: 60, simpleIconSlug: "docker" },
      {
        name: "CI/CD",
        proficiency: 82,
        simpleIconSlug: "githubactions",
        simpleIconHex: "2088FF",
      },
      { name: "PostgreSQL", proficiency: 70, simpleIconSlug: "postgresql" },
    ],
  },
  {
    id: "tools",
    title: "Ferramentas",
    filterTag: "tools",
    skills: [
      { name: "Git", proficiency: 95, simpleIconSlug: "git" },
      { name: "GitHub", proficiency: 90, simpleIconSlug: "github" },
      { name: "GitLab", proficiency: 80, simpleIconSlug: "gitlab" },
      { name: "Figma", proficiency: 50, simpleIconSlug: "figma" },
    ],
  },
  {
    id: "methodologies",
    title: "Metodologias",
    filterTag: "methodologies",
    skills: [
      { name: "Scrum", proficiency: 88 },
      { name: "Agile", proficiency: 85 },
    ],
  },
];

export function isCategoryVisible(
  category: SkillCategory,
  filter: SkillFilterId,
): boolean {
  if (filter === "all") return true;
  return category.filterTag === filter;
}
