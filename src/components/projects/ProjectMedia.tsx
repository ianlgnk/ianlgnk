import { useEffect, useRef } from 'react'

import { useLocale } from '@/components/locale-provider'
import type { Project, VideoFiles } from '@/data/projects'
import { withBase } from '@/lib/base-url'
import { useInView } from '@/lib/use-in-view'
import { useReducedMotion } from '@/lib/use-reduced-motion'
import { useMessages } from '@/locales/use-messages'

/** Toca só enquanto visível e nunca com movimento reduzido (fica a capa). */
function ProjectVideo({ files, label }: { files: VideoFiles; label: string }) {
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
      poster={withBase(files.poster)}
      aria-label={label}
      muted
      loop
      playsInline
      preload="none"
      className="size-full object-cover"
    >
      <source src={withBase(files.webm)} type="video/webm" />
      <source src={withBase(files.mp4)} type="video/mp4" />
    </video>
  )
}

/**
 * Slot de mídia do projeto, proporção fixa 16:10 (sem layout shift).
 * Sem `media` real mostra o bloco de pontos com `▶` (mock).
 */
export function ProjectMedia({ project }: { project: Project }) {
  const { media } = project
  const { locale } = useLocale()
  const m = useMessages()

  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden border border-border">
      {media?.type === 'image' ? (
        <img src={withBase(media.src)} alt={media.alt} loading="lazy" className="size-full object-cover" />
      ) : media?.type === 'video' ? (
        <ProjectVideo
          key={locale}
          files={media.sources[locale]}
          label={m.projects.videoLabel.replace('{name}', project.name)}
        />
      ) : (
        <div aria-hidden className="dots-fill absolute inset-0 grid place-items-center">
          <span className="bg-background px-3 py-2 text-xl text-accent">▶</span>
        </div>
      )}
    </div>
  )
}
