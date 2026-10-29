import { useEffect, useRef } from 'react'

import type { Project } from '@/data/projects'
import { useInView } from '@/lib/use-in-view'
import { useReducedMotion } from '@/lib/use-reduced-motion'

type VideoMedia = Extract<NonNullable<Project['media']>, { type: 'video' }>

/** Toca só enquanto visível e nunca com movimento reduzido (mostra o poster). */
function ProjectVideo({ media }: { media: VideoMedia }) {
  const reduced = useReducedMotion()
  const { ref, inView } = useInView<HTMLVideoElement>({ once: false })
  const playing = useRef(false)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    if (inView && !reduced) {
      playing.current = true
      void video.play().catch(() => {})
    } else if (playing.current) {
      video.pause()
      playing.current = false
    }
  }, [inView, reduced, ref])

  return (
    <video
      ref={ref}
      src={media.src}
      poster={media.poster}
      muted
      loop
      playsInline
      preload="none"
      className="size-full object-cover"
    />
  )
}

/**
 * Slot de mídia do projeto, proporção fixa 16:10 (sem layout shift).
 * Sem `media` real mostra o bloco de pontos com `▶` (mock).
 */
export function ProjectMedia({ project }: { project: Project }) {
  const { media } = project

  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden border border-border">
      {media?.type === 'image' ? (
        <img src={media.src} alt={media.alt} loading="lazy" className="size-full object-cover" />
      ) : media?.type === 'video' ? (
        <ProjectVideo media={media} />
      ) : (
        <div aria-hidden className="dots-fill absolute inset-0 grid place-items-center">
          <span className="bg-background px-3 py-2 text-xl text-accent">▶</span>
        </div>
      )}
    </div>
  )
}
