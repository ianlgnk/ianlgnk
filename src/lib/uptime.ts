const pad = (n: number) => String(n).padStart(2, '0')

/** Segundos → `HH:MM:SS`; negativo ou NaN vira `00:00:00`. */
export function formatUptime(totalSeconds: number): string {
  const total = Number.isFinite(totalSeconds) ? Math.max(0, Math.floor(totalSeconds)) : 0
  const h = Math.floor(total / 3600)
  const m = Math.floor((total % 3600) / 60)
  const s = total % 60
  return `${pad(h)}:${pad(m)}:${pad(s)}`
}
