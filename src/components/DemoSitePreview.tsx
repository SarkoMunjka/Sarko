import { useEffect, useRef, useState } from 'react'

interface DemoSitePreviewProps {
  src: string
  alt: string
  className?: string
}

const VIEWPORT_WIDTH = 1440
const VIEWPORT_HEIGHT = 900

/**
 * Embeds a live demo page scaled to the card — nav, hero and site chrome
 * visible as if you're on the actual site (not a cropped screenshot).
 */
export function DemoSitePreview({ src, alt, className = '' }: DemoSitePreviewProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.25)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return

    const update = () => setScale(el.clientWidth / VIEWPORT_WIDTH)
    update()

    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <div ref={wrapRef} className={`absolute inset-0 overflow-hidden bg-[#1F1F1F] ${className}`}>
      <iframe
        src={src}
        title={alt}
        loading="lazy"
        tabIndex={-1}
        className="pointer-events-none absolute left-0 top-0 origin-top-left border-0"
        style={{
          width: VIEWPORT_WIDTH,
          height: VIEWPORT_HEIGHT,
          transform: `scale(${scale})`,
        }}
      />
    </div>
  )
}
