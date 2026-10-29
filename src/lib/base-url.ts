/** Prefixa o `base` do Vite (ex.: `/ianlgnk/` no GitHub Pages) a um caminho interno. */
export function withBase(path: string, base: string = import.meta.env.BASE_URL): string {
  const prefix = base.endsWith('/') ? base : `${base}/`
  return prefix + path.replace(/^\/+/, '')
}
