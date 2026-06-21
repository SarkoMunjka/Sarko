import { motion } from 'motion/react'
import type { ReactNode } from 'react'

type FadeTag = 'div' | 'p' | 'span' | 'li' | 'figure'

const MOTION_TAGS = {
  div: motion.div,
  p: motion.p,
  span: motion.span,
  li: motion.li,
  figure: motion.figure,
} as const

interface FadeInProps {
  children: ReactNode
  className?: string
  delay?: number
  /** Vertical offset (px) the element rises from. */
  y?: number
  as?: FadeTag
}

/**
 * Subtle fade-and-rise that plays once when the element scrolls into view.
 */
export function FadeIn({
  children,
  className,
  delay = 0,
  y = 14,
  as = 'div',
}: FadeInProps) {
  const MotionTag = MOTION_TAGS[as]
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay }}
    >
      {children}
    </MotionTag>
  )
}
