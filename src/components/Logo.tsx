interface LogoProps {
  className?: string
  /** `light` inverts for pale surfaces; `dark` keeps the light mark on dark backgrounds */
  tone?: 'light' | 'dark'
}

export function Logo({
  className = 'h-10 w-auto',
  tone = 'dark',
}: LogoProps) {
  const toneClass = tone === 'light' ? 'invert dark:invert-0' : ''

  return (
    <img
      src="/mark-studio-logo.png"
      alt="Mark Studio"
      className={`block object-contain ${toneClass} ${className}`}
      width={140}
      height={44}
    />
  )
}
