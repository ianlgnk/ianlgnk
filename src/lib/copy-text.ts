/** Copia para a área de transferência; `false` se a API não existir ou for negada. */
export async function copyText(text: string): Promise<boolean> {
  const clipboard = typeof navigator === 'undefined' ? undefined : navigator.clipboard
  if (!clipboard?.writeText) return false
  try {
    await clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}
