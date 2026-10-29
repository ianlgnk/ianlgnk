import { useEffect, useRef } from 'react'

import { useLocale } from '@/components/locale-provider'
import type { Project, VideoFiles } from '@/data/projects'
import { withBase } from '@/lib/base-url'
import { useInView } from '@/lib/use-in-view'
import { useReducedMotion } from '@/lib/use-reduced-motion'
import { useMessages } from '@/locales/use-messages'

type WebkitVideo = HTMLVideoElement & { webkitEnterFullscreen?: () => void }

/** Tela cheia no próprio `<video>`; no iPhone só existe a API `webkit` do player nativo. */
function enterFullscreen(video: WebkitVideo) {
  void video.play().catch(() => {})
  if (video.requestFullscreen) void video.requestFullscreen().catch(() => {})
  else video.webkitEnterFullscreen?.()
}

type ProjectVideoProps = { files: VideoFiles; label: string; fullscreenLabel: string; fullscreenHint: string }

/**
 * Toca só enquanto visível e nunca com movimento reduzido (fica a capa). Um clique
 * abre em tela cheia, com controles nativos só lá dentro.
 */
function ProjectVideo({ files, label, fullscreenLabel, fullscreenHint }: ProjectVideoProps) {
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

  useEffect(() => {
    const video = ref.current
    if (!video) return
    const sync = () => {
      const full = document.fullscreenElement === video
      video.controls = full
      if (!full && reduced) video.pause()
    }
    video.addEventListener('fullscreenchange', sync)
    video.addEventListener('webkitendfullscreen', sync)
    return () => {
      video.removeEventListener('fullscreenchange', sync)
      video.removeEventListener('webkitendfullscreen', sync)
    }
  }, [reduced, ref])

  return (
    <>
      <video
        ref={ref}
        poster={withBase(files.poster)}
        aria-label={label}
        muted
        loop
        playsInline
        preload="none"
        className="size-full object-cover [&:fullscreen]:object-contain"
      >
        <source src={withBase(files.webm)} type="video/webm" />
        <source src={withBase(files.mp4)} type="video/mp4" />
      </video>
      <button
        type="button"
        aria-label={fullscreenLabel}
        onClick={() => ref.current && enterFullscreen(ref.current)}
        className="group absolute inset-0 flex cursor-zoom-in items-end justify-end p-2.5 focus-visible:outline-offset-[-3px]"
      >
        <span
          aria-hidden
          className="bg-background/90 px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-accent opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 [@media(hover:none)]:opacity-100"
        >
          ⤢ {fullscreenHint}
        </span>
      </button>
    </>
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
          fullscreenLabel={m.projects.videoFullscreen.replace('{name}', project.name)}
          fullscreenHint={m.projects.fullscreen}
        />
      ) : (
        <div aria-hidden className="dots-fill absolute inset-0 grid place-items-center">
          <span className="bg-background px-3 py-2 text-xl text-accent">▶</span>
        </div>
      )}
    </div>
  )
}
