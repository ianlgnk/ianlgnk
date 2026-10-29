import type { CSSProperties } from 'react'

import { skillCategories } from '@/data/skills'
import { levelSquares } from '@/lib/skill-level'
import { useMessages } from '@/locales/use-messages'

type SkillBarsProps = { className?: string }

/**
 * Skills por categoria, cada uma com barra de 10 quadrados (sem filtros). As
 * categorias correm em colunas (1/2/3) para a seção não virar uma coluna longa.
 */
export function SkillBars({ className }: SkillBarsProps) {
  const m = useMessages()

  return (
    <section aria-labelledby="skills-title" className={className}>
      <h2 id="skills-title" className="text-xs font-medium uppercase tracking-[0.18em] text-accent sm:text-sm">
        {m.about.skillsTitle}
      </h2>

      <div className="mt-5 gap-x-12 sm:columns-2 lg:columns-3">
        {skillCategories.map((category) => (
          <div key={category.id} className="break-inside-avoid pb-6">
            <h3 className="mb-1 text-[10px] uppercase tracking-[0.16em] text-muted-foreground sm:text-xs">
              {m.skills.categories[category.id]}
            </h3>
            <ul>
              {category.skills.map((skill) => {
                const level = levelSquares(skill.proficiency)
                return (
                  <li
                    key={skill.name}
                    className="flex items-center justify-between gap-3 border-t border-border py-1.5 text-xs uppercase tracking-[0.1em]"
                  >
                    <span>{skill.name}</span>
                    <span
                      role="img"
                      aria-label={`${skill.name}: ${level}/10`}
                      className="px-bar shrink-0"
                      style={{ '--level': level } as CSSProperties}
                    />
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
