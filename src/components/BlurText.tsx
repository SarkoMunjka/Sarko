import { motion } from 'motion/react'
import type { Easing } from 'motion/react'
import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import type { ElementType } from 'react'

const DEFAULT_EASE: Easing = [0.25, 0.1, 0.25, 1]

type Direction = 'top' | 'bottom'
type AnimateBy = 'words' | 'letters'
type Keyframe = Record<string, string | number>

interface BlurTextProps {
  text?: string
  delay?: number
  className?: string
  animateBy?: AnimateBy
  direction?: Direction
  threshold?: number
  rootMargin?: string
  stepDuration?: number
  /** Render breaks as `hidden sm:block` with a space fallback on mobile. */
  responsiveBreak?: boolean
  as?: ElementType
  easing?: Easing | Easing[]
  onAnimationComplete?: () => void
}

const buildKeyframes = (from: Keyframe, steps: Keyframe[]) => {
  const keys = new Set<string>([
    ...Object.keys(from),
    ...steps.flatMap((s) => Object.keys(s)),
  ])

  const keyframes: Record<string, (string | number)[]> = {}
  keys.forEach((k) => {
    keyframes[k] = [from[k], ...steps.map((s) => s[k])]
  })
  return keyframes
}

/**
 * BlurText (React Bits) adapted to TypeScript. Animates words/letters in with a
 * blur-to-sharp reveal once scrolled into view. Supports `\n` line breaks and
 * polymorphic semantic tags (h1/h2/p) so headings stay accessible.
 */
export default function BlurText({
  text = '',
  delay = 200,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  stepDuration = 0.35,
  responsiveBreak = false,
  as: Tag = 'p',
  easing = DEFAULT_EASE,
  onAnimationComplete,
}: BlurTextProps) {
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.unobserve(el)
        }
      },
      { threshold, rootMargin },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  const defaultFrom = useMemo<Keyframe>(
    () =>
      direction === 'top'
        ? { filter: 'blur(10px)', opacity: 0, y: -50 }
        : { filter: 'blur(10px)', opacity: 0, y: 50 },
    [direction],
  )

  const defaultTo = useMemo<Keyframe[]>(
    () => [
      { filter: 'blur(5px)', opacity: 0.5, y: direction === 'top' ? 5 : -5 },
      { filter: 'blur(0px)', opacity: 1, y: 0 },
    ],
    [direction],
  )

  const stepCount = defaultTo.length + 1
  const totalDuration = stepDuration * (stepCount - 1)
  const times = Array.from({ length: stepCount }, (_, i) =>
    stepCount === 1 ? 0 : i / (stepCount - 1),
  )

  const lines = text.split('\n')
  const lineSegments = lines.map((line) =>
    animateBy === 'words' ? line.split(' ') : line.split(''),
  )
  const totalSegments = lineSegments.reduce((acc, l) => acc + l.length, 0)
  const animateKeyframes = buildKeyframes(defaultFrom, defaultTo)

  let runningIndex = -1

  return (
    <Tag ref={ref} className={className}>
      {lineSegments.map((segments, lineIndex) => (
        <Fragment key={lineIndex}>
          {segments.map((segment, segIndex) => {
            runningIndex += 1
            const globalIndex = runningIndex
            const isLastOverall = globalIndex === totalSegments - 1
            const isLastInLine = segIndex === segments.length - 1

            return (
              <motion.span
                key={segIndex}
                className="inline-block will-change-[transform,filter,opacity]"
                initial={defaultFrom}
                animate={inView ? animateKeyframes : defaultFrom}
                transition={{
                  duration: totalDuration,
                  times,
                  delay: (globalIndex * delay) / 1000,
                  ease: easing,
                }}
                onAnimationComplete={
                  isLastOverall ? onAnimationComplete : undefined
                }
              >
                {segment === ' ' ? '\u00A0' : segment}
                {animateBy === 'words' && !isLastInLine ? '\u00A0' : null}
              </motion.span>
            )
          })}
          {lineIndex < lines.length - 1 && (
            <>
              <br className={responsiveBreak ? 'hidden sm:block' : ''} />
              {responsiveBreak && <span className="sm:hidden">{'\u00A0'}</span>}
            </>
          )}
        </Fragment>
      ))}
    </Tag>
  )
}
