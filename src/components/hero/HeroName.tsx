import { cn } from '@/lib/utils'

type HeroNameProps = { name: string; className?: string }

/**
 * Nome em dot-matrix, uma palavra por linha. O `h1` expõe o nome real; as
 * linhas visuais ficam fora da árvore de acessibilidade. O tamanho é
 * `clamp(2.25rem, 12.5vw, 8rem)`: a palavra mais longa (10 caracteres de
 * ~0,6em) cabe em 320 px de largura.
 */
export function HeroName({ name, className }: HeroNameProps) {
  const words = name.split(' ')

  return (
    <h1
      aria-label={name}
      className={cn(
        'mt-8 text-[clamp(2.25rem,12.5vw,8rem)] font-bold uppercase leading-[0.92] tracking-[0.02em] sm:mt-12',
        className,
      )}
    >
      {words.map((word) => (
        <span key={word} aria-hidden className="dotmatrix ignite block w-fit">
          {word}
        </span>
      ))}
    </h1>
  )
}
