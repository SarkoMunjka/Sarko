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
  fit = 'fill',
}: VimeoEmbedProps & { fit?: 'fill' | 'cover' | 'contain' }) {
  const coverClass =
    'left-1/2 top-1/2 h-[56.25vw] min-h-full min-w-full w-[177.78vh] -translate-x-1/2 -translate-y-1/2'
  const fillClass = 'inset-0 h-full w-full scale-[1.02]'
  const containClass = 'relative w-full aspect-[3420/1870]'

  const fitClass =
    fit === 'cover' ? coverClass : fit === 'contain' ? containClass : fillClass

  return (
    <iframe
      src={vimeoEmbedUrl(videoId, autoplay)}
      title="Project preview"
      className={`pointer-events-none border-0 ${
        fit === 'contain' ? '' : 'absolute'
      } ${fitClass} ${className}`}
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
      className="h-full w-full object-contain object-top"
      loading="lazy"
    />
  ) : (
    poster
  )

  return (
    <div
      className={`absolute inset-0 overflow-hidden bg-[#15110D] ${className}`}
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
      {hovering && (
        <div className="absolute inset-0 flex items-start justify-center">
          <VimeoEmbed videoId={videoId} autoplay fit="contain" />
        </div>
      )}
    </div>
  )
}
