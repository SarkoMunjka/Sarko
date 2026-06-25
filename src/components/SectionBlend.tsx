type BlendTone = 'surface' | 'muted' | 'hero' | 'footer'

const BLEND_FROM: Record<BlendTone, string> = {
  surface: 'from-white dark:from-[#0a0a0a]',
  muted: 'from-[#F5F5F5] dark:from-[#121212]',
  hero: 'from-[#EFEFEF] dark:from-[#0a0a0a]',
  footer: 'from-gray-900 dark:from-black',
}

interface SectionBlendProps {
  fadeTop?: BlendTone
  fadeBottom?: BlendTone
}

/**
 * Soft gradient overlays that blend a section into the tone of its neighbor.
 */
export function SectionBlend({ fadeTop, fadeBottom }: SectionBlendProps) {
  const height = 'h-20 sm:h-28 lg:h-36'

  return (
    <>
      {fadeTop ? (
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-0 top-0 z-[1] ${height} bg-gradient-to-b ${BLEND_FROM[fadeTop]} to-transparent`}
        />
      ) : null}
      {fadeBottom ? (
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-0 bottom-0 z-[1] ${height} bg-gradient-to-t ${BLEND_FROM[fadeBottom]} to-transparent`}
        />
      ) : null}
    </>
  )
}
