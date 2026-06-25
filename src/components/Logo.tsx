interface LogoProps {
  className?: string
}

export function Logo({ className = 'h-9 w-auto' }: LogoProps) {
  return (
    <img
      src="/mark-studio-logo.png"
      alt="Mark Studio"
      className={`block object-contain ${className}`}
      width={120}
      height={36}
    />
  )
}
