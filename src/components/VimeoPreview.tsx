import { useState } from 'react'
import type { ReactNode } from 'react'

function vimeoEmbedUrl(videoId: string, autoplay: boolean): string {
  const params = new URLSearchParams({
    background: '1',
    autoplay: autoplay ? '1' : '0',
    loop: '1',
    muted: '1',
    playsinline: '1',
    title: '0',
    byline: '0',
    portrait: '0',
    dnt: '1',
  })
  return `https://player.vimeo.com/video/${videoId}?${params.toString()}`
}

interface VimeoEmbedProps {
  videoId: string
  className?: string
  /** Start playback immediately (case-study hero). */
  autoplay?: boolean
}

/** Chromeless Vimeo iframe — autoplay, muted, loop. */
export function VimeoEmbed({
  videoId,
  className = '',
  autoplay = true,
}: VimeoEmbedProps) {
  return (
    <iframe
      src={vimeoEmbedUrl(videoId, autoplay)}
      title="Project preview"
      className={`pointer-events-none absolute inset-0 h-full w-full scale-[1.02] border-0 ${className}`}
      allow="autoplay; fullscreen; picture-in-picture"
      referrerPolicy="strict-origin-when-cross-origin"
    />
  )
}

interface VimeoHoverPreviewProps {
  videoId: string
  /** Image path under /public (preferred). */
  posterSrc?: string
  /** Custom poster node (fallback). */
  poster?: ReactNode
  className?: string
}

/**
 * Shows a real screenshot by default; plays a muted Vimeo loop on hover — the
 * site-walkthrough preview for NovaFrame.
 */
export function VimeoHoverPreview({
  videoId,
  posterSrc,
  poster,
  className = '',
}: VimeoHoverPreviewProps) {
  const [hovering, setHovering] = useState(false)

  const posterNode = posterSrc ? (
    <img
      src={posterSrc}
      alt=""
      className="h-full w-full object-cover object-top"
      loading="lazy"
    />
  ) : (
    poster
  )

  return (
    <div
      className={`relative h-full w-full overflow-hidden ${className}`}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${
          hovering ? 'pointer-events-none opacity-0' : 'opacity-100'
        }`}
      >
        {posterNode}
      </div>
      {hovering && <VimeoEmbed videoId={videoId} autoplay />}
    </div>
  )
}
