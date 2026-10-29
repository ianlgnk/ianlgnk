/** Conteúdo já visível quando não há animação de entrada possível ou desejada. */
export function initialRevealed(reduced: boolean, hasIntersectionObserver: boolean): boolean {
  return reduced || !hasIntersectionObserver
}
