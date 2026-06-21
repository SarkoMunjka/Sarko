import { ArrowRight } from 'lucide-react'
import { TextRoll } from './TextRoll'

interface RollButtonProps {
  label: string
  href?: string
  variant?: 'orange' | 'dark' | 'light'
}

/**
 * Shared CTA button with the duplicated text-roll hover and a rotating arrow
 * circle, matching the hero/about buttons.
 */
export function RollButton({
  label,
  href = '#',
  variant = 'orange',
}: RollButtonProps) {
  const surface =
    variant === 'orange'
      ? 'bg-[#F26522] hover:bg-[#e05a1a] text-white'
      : variant === 'dark'
        ? 'bg-gray-900 hover:bg-gray-800 text-white'
        : 'bg-white hover:bg-gray-100 text-gray-900'

  const arrowColor =
    variant === 'light' ? 'text-gray-900' : variant === 'dark' ? 'text-gray-900' : 'text-[#F26522]'
  const circleBg = variant === 'light' ? 'bg-[#F26522]' : 'bg-white'
  const circleArrow = variant === 'light' ? 'text-white' : arrowColor

  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-2 self-start rounded-full py-2 pl-5 pr-2 text-[13px] font-medium transition-colors sm:pl-6 sm:text-[14px] ${surface}`}
    >
      <TextRoll>{label}</TextRoll>
      <span
        className={`flex h-7 w-7 items-center justify-center rounded-full transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45 sm:h-8 sm:w-8 ${circleBg}`}
      >
        <ArrowRight size={16} className={circleArrow} />
      </span>
    </a>
  )
}
