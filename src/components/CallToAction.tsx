import { useLayoutEffect, useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { RollButton } from './RollButton'
import BlurText from './BlurText'
import { FadeIn } from './FadeIn'
import { useLanguage } from '../hooks/useLanguage'

const MOBILE_QUERY = '(max-width: 767px)'

export function CallToAction() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const isMobileRef = useRef(false)
  const prefersReducedMotion = useReducedMotion()

  useLayoutEffect(() => {
    const media = window.matchMedia(MOBILE_QUERY)
    const onChange = () => {
      isMobileRef.current = media.matches
    }

    onChange()
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.95', 'start 0.22'],
  })

  const scale = useTransform(scrollYProgress, (progress) => {
    if (prefersReducedMotion) return 1
    const min = isMobileRef.current ? 0.92 : 0.84
    return min + progress * (1 - min)
  })

  const borderRadius = useTransform(scrollYProgress, (progress) => {
    if (prefersReducedMotion) return 24
    const start = isMobileRef.current ? 36 : 52
    return start + progress * (24 - start)
  })

  const opacity = useTransform(scrollYProgress, (progress) => {
    if (prefersReducedMotion) return 1
    const min = isMobileRef.current ? 0.9 : 0.82
    return min + progress * (1 - min)
  })

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section-tone-muted-footer relative pb-16 pt-16 transition-colors duration-300 sm:pb-20 sm:pt-20 lg:pb-28 lg:pt-28"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <motion.div
          style={{
            scale,
            borderRadius,
            opacity,
            transformOrigin: 'center center',
          }}
          className="border border-white/15 bg-[#F26522] px-6 py-14 shadow-[0_20px_60px_rgba(242,101,34,0.28)] will-change-transform sm:px-10 sm:py-20 lg:px-16 lg:py-24"
        >
          <FadeIn
            as="p"
            y={10}
            className="mb-5 text-[13px] tracking-wide text-white/80 sm:mb-7 sm:text-[14px]"
          >
            {t.cta.eyebrow}
          </FadeIn>
          <BlurText
            as="h2"
            responsiveBreak
            animateBy="words"
            delay={60}
            text={t.cta.headline}
            className="font-medium leading-[1.08] tracking-[-0.03em] text-white text-[clamp(1.75rem,7vw,4.2rem)] sm:text-[clamp(2.5rem,5vw,4.2rem)]"
          />
          <FadeIn
            as="p"
            className="mt-6 max-w-xl text-[15px] leading-[1.6] text-white/85 sm:text-[17px]"
          >
            {t.cta.body}
          </FadeIn>

          <div className="mt-8 flex flex-col gap-4 sm:mt-10 sm:flex-row sm:items-center sm:gap-5">
            <RollButton label={t.nav.startProject} variant="light" />
            <a
              href="mailto:hello@mark.studio"
              className="text-[14px] font-medium text-white/85 transition-colors duration-300 hover:text-white"
            >
              hello@mark.studio
            </a>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-8 border-t border-white/20 pt-10 sm:mt-16 lg:grid-cols-4">
            {t.cta.stats.map((stat, index) => (
              <FadeIn key={stat.label} delay={index * 0.08}>
                <div className="text-[28px] font-medium tracking-tight text-white sm:text-[36px]">
                  {stat.value}
                </div>
                <div className="mt-1 text-[13px] text-white/75 sm:text-[14px]">
                  {stat.label}
                </div>
              </FadeIn>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
