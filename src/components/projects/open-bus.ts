import type { ProjectSlug } from '@/data/projects'

const bus = new EventTarget()

/** Pede para abrir um projeto no log (não depende de o hash da URL mudar). */
export function requestOpen(slug: ProjectSlug): void {
  bus.dispatchEvent(new CustomEvent<ProjectSlug>('open', { detail: slug }))
}

/** Escuta pedidos de abertura; devolve a função que cancela a inscrição. */
export function onOpenRequest(handler: (slug: ProjectSlug) => void): () => void {
  const listener = (event: Event) => handler((event as CustomEvent<ProjectSlug>).detail)
  bus.addEventListener('open', listener)
  return () => bus.removeEventListener('open', listener)
}
