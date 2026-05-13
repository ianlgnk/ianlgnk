import { AnimatePresence, motion } from "framer-motion";
import { Code2, Kanban, LayoutGrid, Server, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { getSkillVisual } from "@/data/skillBadges";
import {
  isCategoryVisible,
  skillCategories,
  skillFilterOptions,
  type SkillCategory,
  type SkillEntry,
  type SkillFilterId,
} from "@/data/skills";
import { cn } from "@/lib/utils";
import { useState } from "react";

const easeOut = [0.22, 1, 0.36, 1] as const;

/**
 * Intersection root: só encolhe verticalmente (não nas laterais).
 * Com `margin: "-50px"` em todos os lados, no mobile a coluna esquerda do grid
 * ficava fora do root e `whileInView` não disparava nas barras de proficiência.
 */
const view = {
  once: true,
  margin: "-80px 0px -80px 0px" as const,
  amount: 0.08 as const,
};

/** Card entra primeiro; ícone e barra animam logo depois (sequência). */
const CARD_LEAD_S = 0.14;
const ICON_STAGGER_S = 0.04;
/** Atraso da barra depois do lead do card + ícone; stagger entre células do grid */
const BAR_AFTER_ICON_S = 0.22;
const BAR_STAGGER_S = 0.05;

const CATEGORY_HEADER_ICON: Record<string, LucideIcon> = {
  languages: Code2,
  frontend: LayoutGrid,
  backend: Server,
  tools: Wrench,
  methodologies: Kanban,
};

function CategoryHeaderIcon({ categoryId }: { categoryId: string }) {
  const Icon = CATEGORY_HEADER_ICON[categoryId] ?? Code2;
  return (
    <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-muted text-primary">
      <Icon className="size-5" strokeWidth={1.75} aria-hidden />
    </span>
  );
}

function cdnSimpleIconUrl(skill: SkillEntry): string | null {
  if (!skill.simpleIconSlug?.trim()) return null;
  const slug = skill.simpleIconSlug.trim();
  const hex = skill.simpleIconHex?.trim();
  if (hex) return `https://cdn.simpleicons.org/${slug}/${hex}`;
  return `https://cdn.simpleicons.org/${slug}`;
}

function SkillIcon({ skill }: { skill: SkillEntry }) {
  const [broken, setBroken] = useState(false);
  const visual = getSkillVisual(skill.name);
  const Icon = visual.Icon;
  const cdnUrl = cdnSimpleIconUrl(skill);

  if (!cdnUrl || broken) {
    return (
      <Icon
        className={cn(
          "size-7 shrink-0 transition-transform duration-200 ease-out",
          "group-hover/skill:scale-105",
          visual.iconClass,
        )}
        aria-hidden
      />
    );
  }

  return (
    <img
      src={cdnUrl}
      alt=""
      width={28}
      height={28}
      className="block size-7 shrink-0 object-contain transition-transform duration-200 ease-out group-hover/skill:scale-105"
      loading="lazy"
      decoding="async"
      onError={() => setBroken(true)}
    />
  );
}

function ProficiencyBar({
  proficiency,
  baseDelay,
}: {
  proficiency: number;
  /** Momento em que a barra começa a preencher (s), depois do card e do ícone */
  baseDelay: number;
}) {
  const scale = Math.min(1, Math.max(0, proficiency / 100));

  return (
    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
      <motion.div
        className="h-full w-full origin-left rounded-full bg-gradient-to-r from-primary/85 via-primary to-primary/75"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: scale }}
        viewport={{
          once: true,
          amount: 0.05,
          margin: "-80px 0px -80px 0px",
        }}
        transition={{
          duration: 0.8,
          delay: baseDelay,
          ease: easeOut,
        }}
      />
    </div>
  );
}

function SkillCell({
  skill,
  skillIndex,
}: {
  skill: SkillEntry;
  skillIndex: number;
}) {
  const barDelay =
    CARD_LEAD_S + BAR_AFTER_ICON_S + skillIndex * BAR_STAGGER_S;

  return (
    <motion.div
      layout={false}
      className={cn(
        "group/skill relative min-w-0 rounded-lg border border-border/90 bg-muted/35 p-3 sm:p-3.5",
        "transition-[border-color,background-color] duration-200 ease-out",
        "hover:border-primary/40 hover:bg-muted/60",
      )}
      initial={{ opacity: 0, y: 8, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={view}
      transition={{ duration: 0.22, ease: easeOut }}
    >
      <div className="relative">
        <motion.div
          className="flex items-center gap-2.5"
          initial={{ opacity: 0, scale: 0.88 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={view}
          transition={{
            duration: 0.32,
            delay: CARD_LEAD_S + skillIndex * ICON_STAGGER_S,
            ease: easeOut,
          }}
        >
          <span className="shrink-0">
            <SkillIcon skill={skill} />
          </span>
          <span
            className="min-w-0 flex-1 truncate font-mono text-xs font-medium text-card-foreground sm:text-sm"
            title={skill.name}
          >
            {skill.name}
          </span>
        </motion.div>

        <div
          className={cn(
            "pointer-events-none absolute left-1/2 top-full z-20 mt-1.5 -translate-x-1/2",
            "w-max min-w-0 max-w-[min(18rem,calc(100vw-2rem))]",
            "opacity-0 transition-opacity duration-150 ease-out",
            "group-hover/skill:opacity-100",
            "motion-reduce:hidden",
          )}
          role="tooltip"
        >
          <span
            className={cn(
              "block whitespace-normal break-words rounded-md border border-border",
              "bg-popover px-2.5 py-1.5 text-center text-xs font-medium text-popover-foreground shadow-md",
            )}
          >
            {skill.name}
          </span>
        </div>
      </div>
      <ProficiencyBar
        proficiency={skill.proficiency}
        baseDelay={barDelay}
      />
    </motion.div>
  );
}

function CategoryCardContent({ category }: { category: SkillCategory }) {
  return (
    <>
      <div className="flex items-start gap-3 border-b border-border px-5 py-4 sm:px-6 sm:py-5">
        <CategoryHeaderIcon categoryId={category.id} />
        <div className="min-w-0 pt-0.5">
          <h3 className="font-mono text-sm font-semibold text-card-foreground sm:text-base">
            {category.title}
          </h3>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {category.skills.length}{" "}
            {category.skills.length === 1 ? "habilidade" : "habilidades"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-3 sm:gap-4 sm:p-5 xl:grid-cols-4">
        {category.skills.map((skill, skillIndex) => (
          <SkillCell key={skill.name} skill={skill} skillIndex={skillIndex} />
        ))}
      </div>
    </>
  );
}

export function Skills() {
  const [filter, setFilter] = useState<SkillFilterId>("all");

  const visible = skillCategories.filter((c) => isCategoryVisible(c, filter));

  return (
    <section
      id="habilidades"
      className="scroll-mt-4 border-b border-border/60 px-4 py-20 sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={view}
          transition={{ duration: 0.45, ease: easeOut }}
        >
          <h2 className="font-mono text-sm font-semibold uppercase tracking-widest text-primary">
            Habilidades
          </h2>
          <p className="mt-2 text-muted-foreground">
            Stack, ferramentas e níveis de proficiência — filtre por área.
          </p>

          <div
            className="mt-8 flex flex-wrap gap-2"
            role="toolbar"
            aria-label="Filtrar habilidades por categoria"
          >
            {skillFilterOptions.map((opt) => {
              const active = filter === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setFilter(opt.id)}
                  className={cn(
                    "rounded-lg border px-3.5 py-2 text-sm font-medium transition-colors duration-200 ease-out",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/45",
                    active
                      ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/25"
                      : "border-border bg-muted text-muted-foreground hover:border-border hover:bg-muted/80 hover:text-foreground",
                  )}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>

          <motion.div
            layout
            className={cn(
              "mt-10 grid gap-6 sm:grid-cols-2",
              visible.length === 1 && "sm:mx-auto sm:max-w-2xl sm:grid-cols-1",
            )}
            transition={{ layout: { duration: 0.35, ease: easeOut } }}
          >
            <AnimatePresence mode="popLayout">
              {visible.map((category, idx) => (
                <motion.article
                  key={category.id}
                  layout
                  initial={{ opacity: 0, y: 32, scale: 0.96 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      duration: 0.42,
                      delay: idx * 0.08,
                      ease: easeOut,
                    },
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.88,
                    y: 12,
                    transition: { duration: 0.24, ease: easeOut },
                  }}
                  viewport={view}
                  transition={{ layout: { duration: 0.32, ease: easeOut } }}
                  className={cn(
                    "flex flex-col overflow-hidden rounded-xl border border-border bg-card",
                    "shadow-sm",
                  )}
                >
                  <CategoryCardContent category={category} />
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
