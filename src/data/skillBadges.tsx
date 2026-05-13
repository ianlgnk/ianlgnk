import type { IconType } from "react-icons";
import { FaAws } from "react-icons/fa";
import {
  SiAngular,
  SiDocker,
  SiExpo,
  SiFigma,
  SiFirebase,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiGitlab,
  SiJavascript,
  SiKotlin,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiTypescript,
  SiVuedotjs,
} from "react-icons/si";
import { Code2, Kanban, Workflow } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type SkillVisual = {
  Icon: IconType | LucideIcon;
  /** Classes da badge (borda + fundo + texto) */
  badgeClass: string;
  /** Cor do ícone (marca) */
  iconClass: string;
};

const meta = (
  Icon: SkillVisual["Icon"],
  badgeClass: string,
  iconClass: string,
): SkillVisual => ({ Icon, badgeClass, iconClass });

/** Cores próximas à identidade de cada marca; fundo/borda suaves para claro e escuro. */
export const skillVisualByName: Record<string, SkillVisual> = {
  JavaScript: meta(
    SiJavascript,
    "border-[#E8D44D]/50 bg-[#F7DF1E]/12 text-foreground",
    "text-[#ca8a04] dark:text-[#F7DF1E]",
  ),
  TypeScript: meta(
    SiTypescript,
    "border-[#3178C6]/45 bg-[#3178C6]/12 text-foreground",
    "text-[#3178C6]",
  ),
  Kotlin: meta(
    SiKotlin,
    "border-[#7F52FF]/45 bg-[#7F52FF]/12 text-foreground",
    "text-[#7F52FF]",
  ),
  Python: meta(
    SiPython,
    "border-[#3776AB]/45 bg-[#3776AB]/12 text-foreground",
    "text-[#306998] dark:text-[#FFD43B]",
  ),
  React: meta(
    SiReact,
    "border-[#61DAFB]/40 bg-[#61DAFB]/10 text-foreground",
    "text-[#149ECA] dark:text-[#61DAFB]",
  ),
  Vue: meta(
    SiVuedotjs,
    "border-[#42B883]/45 bg-[#42B883]/10 text-foreground",
    "text-[#42B883]",
  ),
  "React Native": meta(
    SiReact,
    "border-[#61DAFB]/40 bg-[#61DAFB]/10 text-foreground",
    "text-[#149ECA] dark:text-[#61DAFB]",
  ),
  Angular: meta(
    SiAngular,
    "border-[#DD0031]/45 bg-[#DD0031]/10 text-foreground",
    "text-[#DD0031]",
  ),
  Expo: meta(
    SiExpo,
    "border-violet-500/35 bg-violet-500/10 text-foreground",
    "text-[#4630EB] dark:text-[#9d8cff]",
  ),
  "Node.js": meta(
    SiNodedotjs,
    "border-[#339933]/45 bg-[#339933]/10 text-foreground",
    "text-[#339933]",
  ),
  PostgreSQL: meta(
    SiPostgresql,
    "border-[#4169E1]/45 bg-[#4169E1]/10 text-foreground",
    "text-[#4169E1]",
  ),
  Firebase: meta(
    SiFirebase,
    "border-[#FFCA28]/50 bg-[#FFCA28]/12 text-foreground",
    "text-[#F57C00] dark:text-[#FFCA28]",
  ),
  Docker: meta(
    SiDocker,
    "border-[#2496ED]/45 bg-[#2496ED]/10 text-foreground",
    "text-[#2496ED]",
  ),
  AWS: meta(
    FaAws,
    "border-[#FF9900]/50 bg-[#FF9900]/12 text-foreground",
    "text-[#FF9900]",
  ),
  "CI/CD": meta(
    SiGithubactions,
    "border-[#2088FF]/40 bg-[#2088FF]/10 text-foreground",
    "text-[#2088FF]",
  ),
  Git: meta(
    SiGit,
    "border-[#F05032]/45 bg-[#F05032]/10 text-foreground",
    "text-[#F05032]",
  ),
  GitHub: meta(
    SiGithub,
    "border-foreground/25 bg-muted/50 text-foreground",
    "text-foreground",
  ),
  GitLab: meta(
    SiGitlab,
    "border-[#FC6D26]/45 bg-[#FC6D26]/10 text-foreground",
    "text-[#FC6D26]",
  ),
  Figma: meta(
    SiFigma,
    "border-[#F24E1E]/40 bg-[#F24E1E]/10 text-foreground",
    "text-[#F24E1E]",
  ),
  Scrum: meta(
    Kanban,
    "border-primary/35 bg-primary/10 text-foreground",
    "text-primary",
  ),
  Agile: meta(
    Workflow,
    "border-primary/35 bg-primary/10 text-foreground",
    "text-primary",
  ),
};

const fallback: SkillVisual = {
  Icon: Code2,
  badgeClass: "border-border bg-muted/40 text-muted-foreground",
  iconClass: "text-muted-foreground",
};

export function getSkillVisual(name: string): SkillVisual {
  return skillVisualByName[name] ?? fallback;
}
