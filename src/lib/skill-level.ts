/** Proficiência 0–100 → quadrados preenchidos de 10 (arredonda; limita a 0–10). */
export function levelSquares(proficiency: number): number {
  if (Number.isNaN(proficiency)) return 0
  return Math.min(10, Math.max(0, Math.round(proficiency / 10)))
}
