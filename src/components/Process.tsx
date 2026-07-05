import { useLayoutEffect, useState } from 'react'
import { SectionBadge } from './SectionBadge'
import BlurText from './BlurText'
import ScrollStack, { ScrollStackItem } from '@/components/ui/ScrollStack'
import { useLanguage } from '../hooks/useLanguage'

interface Step {
  number: string
  title: string
  description: string
}

const DESKTOP_STACK_QUERY = '(min-width: 1024px)'

function useDesktopStack() {
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(DESKTOP_STACK_QUERY).matches,
  )

  useLayoutEffect(() => {
    const media = window.matchMedia(DESKTOP_STACK_QUERY)
    const onChange = () => setIsDesktop(media.matches)

    onChange()
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  return isDesktop
}

function ProcessStepCard({ step, stepLabel }: { step: Step; stepLabel: string }) {
  return (
    <div className="grid grid-cols-1 items-start gap-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-8 lg:gap-12">
      <div className="min-w-0">
        <span className="text-[12px] font-medium uppercase tracking-[0.12em] text-gray-500 dark:text-gray-400 sm:text-[13px]">
          {stepLabel} {step.number}
        </span>
        <h3 className="mt-3 text-[clamp(1.35rem,2.5vw,2rem)] font-semibold leading-tight tracking-[-0.02em] text-[#F26522]">
          {step.title}
        </h3>
        <p className="mt-3 max-w-2xl text-[15px] leading-[1.65] text-gray-600 dark:text-gray-400 sm:text-[16px]">
          {step.description}
        </p>
      </div>
      <span
        className="text-[clamp(2.75rem,8vw,5.5rem)] font-medium leading-none tracking-tight text-gray-200 dark:text-white/10 sm:text-right"
        aria-hidden="true"
      >
        {step.number}
      </span>
    </div>
  )
}

const cardClassName =
  'rounded-2xl border border-gray-200 bg-white p-6 transition-colors duration-300 hover:border-gray-900 dark:border-white/10 dark:bg-[#1a1a1a] dark:hover:border-white sm:p-8 lg:p-10'

function MobileStickyStack({
  steps,
  stepLabel,
}: {
  steps: Step[]
  stepLabel: string
}) {
  return (
    <div className="mx-auto w-full max-w-[1100px] px-5 sm:px-8 lg:px-12">
      {steps.map((step, index) => (
        <article
          key={step.number}
          className={`${cardClassName} sticky mb-5 last:mb-0`}
          style={{
            top: `calc(4.75rem + ${index * 1.25}rem)`,
            zIndex: index + 1,
          }}
        >
          <ProcessStepCard step={step} stepLabel={stepLabel} />
        </article>
      ))}
      <div className="h-16" aria-hidden="true" />
    </div>
  )
}

function DesktopScrollStack({
  steps,
  stepLabel,
}: {
  steps: Step[]
  stepLabel: string
}) {
  return (
    <ScrollStack
      useWindowScroll
      itemDistance={72}
      itemStackDistance={28}
      stackPosition="22%"
      scaleEndPosition="12%"
      baseScale={0.92}
      itemScale={0.02}
      className="mx-auto w-full max-w-[1440px]"
    >
      {steps.map((step) => (
        <ScrollStackItem key={step.number} itemClassName={cardClassName}>
          <ProcessStepCard step={step} stepLabel={stepLabel} />
        </ScrollStackItem>
      ))}
    </ScrollStack>
  )
}

export function Process() {
  const isDesktop = useDesktopStack()
  const { t } = useLanguage()

  const steps: Step[] = t.process.steps.map((step, index) => ({
    number: `0${index + 1}`,
    title: step.title,
    description: step.description,
  }))

  return (
    <section className="section-tone-muted-up relative pb-16 pt-16 transition-colors duration-300 sm:pb-20 sm:pt-20 lg:pb-28 lg:pt-28">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center px-5 text-center sm:px-8 lg:px-12">
        <SectionBadge number="4" label={t.process.badge} borderClass="border-gray-300" />
        <BlurText
          as="h2"
          animateBy="words"
          delay={60}
          text={t.process.headline}
          className="mx-auto mb-12 max-w-3xl font-medium leading-[1.12] tracking-[-0.02em] text-gray-900 dark:text-white text-[clamp(1.5rem,4vw,3.2rem)] sm:mb-14 lg:mb-16"
        />
      </div>

      {isDesktop ? (
        <DesktopScrollStack steps={steps} stepLabel={t.process.stepLabel} />
      ) : (
        <MobileStickyStack steps={steps} stepLabel={t.process.stepLabel} />
      )}
    </section>
  )
}
