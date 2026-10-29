import type { ProjectSlug } from '@/data/projects'

/** Acordeão de um por vez: clicar no aberto fecha; clicar em outro troca. */
export function toggleOpen(current: ProjectSlug | null, clicked: ProjectSlug): ProjectSlug | null {
  return current === clicked ? null : clicked
}
