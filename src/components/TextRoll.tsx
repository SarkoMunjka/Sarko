import type { ReactNode } from 'react'

interface TextRollProps {
  children: ReactNode
}

/**
 * Text that rolls vertically on group-hover: the label is duplicated inside an
 * overflow-hidden window and the inner column shifts up by one line height.
 */
export function TextRoll({ children }: TextRollProps) {
  return (
    <span className="block h-[20px] overflow-hidden">
      <span className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-translate-y-1/2">
        <span className="flex h-[20px] items-center">{children}</span>
        <span className="flex h-[20px] items-center">{children}</span>
      </span>
    </span>
  )
}
