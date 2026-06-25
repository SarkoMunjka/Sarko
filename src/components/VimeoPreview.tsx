import { useState } from 'react'
import type { ReactNode } from 'react'

function vimeoEmbedUrl(videoId: string, autoplay: boolean): string {
  const params = new URLSearchParams({
    background: '1',
    autoplay: autoplay ? '1' : '0',
    loop: '1',
    muted: '1',
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
      loading="lazy"
    />
  )
}

interface VimeoHoverPreviewProps {
  videoId: string
  /** Shown before hover / while the iframe is loading. */
  poster: ReactNode
  className?: string
}

/**
 * Shows a static poster by default; loads and plays a muted Vimeo loop when the
 * parent `.group` is hovered (same idea as ScrollPreview for Socks).
 */
export function VimeoHoverPreview({
  videoId,
  poster,
  className = '',
}: VimeoHoverPreviewProps) {
  const [hovering, setHovering] = useState(false)

  return (
    <div
      className={`relative h-full w-full ${className}`}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${
          hovering ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {poster}
      </div>
      {hovering && <VimeoEmbed videoId={videoId} autoplay />}
    </div>
  )
}
