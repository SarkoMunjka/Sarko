import { useLanguage } from '../hooks/useLanguage'

interface LogoProps {
  className?: string
  /** `light` inverts for pale surfaces; `dark` keeps the light mark on dark backgrounds */
  tone?: 'light' | 'dark'
}

export function Logo({
  className = 'h-9 w-auto',
  tone = 'dark',
}: LogoProps) {
  const { t } = useLanguage()
  const toneClass = tone === 'light' ? 'invert dark:invert-0' : ''

  return (
    <img
      src="/mark-studio-logo.png"
      alt={t.meta.title}
      className={`block shrink-0 object-contain object-left ${toneClass} ${className}`}
      width={200}
      height={52}
    />
  )
}
