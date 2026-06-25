interface ScrollPreviewProps {
  src: string
  alt: string
  className?: string
}

/**
 * A full-page screenshot that slowly pans from top to bottom on group-hover —
 * like a quick video scroll through the whole site. Snaps back quickly on
 * mouse-out. Requires a parent with the `group` class.
 */
export function ScrollPreview({ src, alt, className = '' }: ScrollPreviewProps) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={`h-full w-full object-cover object-top transition-[object-position] duration-700 ease-linear group-hover:object-bottom group-hover:duration-[5000ms] ${className}`}
    />
  )
}
