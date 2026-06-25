import { SectionBadge } from './SectionBadge'
import BlurText from './BlurText'
import ScrollStack, { ScrollStackItem } from '@/components/ui/ScrollStack'

interface Step {
  number: string
  title: string
  description: string
}

const STEPS: Step[] = [
  {
    number: '01',
    title: 'Discovery',
    description:
      'We dig into your goals, audience and market to find the real opportunity worth chasing.',
  },
  {
    number: '02',
    title: 'Strategy',
    description:
      'We shape a focused plan and creative direction the whole team can rally behind.',
  },
  {
    number: '03',
    title: 'Design & Build',
    description:
      'We design, prototype and engineer in tight, collaborative loops — no surprises.',
  },
  {
    number: '04',
    title: 'Launch & Grow',
    description:
      'We ship, measure and keep refining long after go-live to compound the results.',
  },
]

export function Process() {
  return (
    <section className="bg-[#F5F5F5] pb-16 pt-16 transition-colors duration-300 dark:bg-[#121212] sm:pb-20 sm:pt-20 lg:pb-28 lg:pt-28">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <SectionBadge number="4" label="How we work" borderClass="border-gray-300" />
        <BlurText
          as="h2"
          animateBy="words"
          delay={60}
          text={'A clear path from first\nidea to final launch.'}
          className="mb-10 font-medium leading-[1.12] tracking-[-0.02em] text-gray-900 dark:text-white text-[clamp(1.5rem,4vw,3.2rem)] sm:mb-12 lg:mb-14"
        />
      </div>

      <ScrollStack
        useWindowScroll
        itemDistance={72}
        itemStackDistance={28}
        stackPosition="22%"
        scaleEndPosition="12%"
        baseScale={0.9}
        itemScale={0.025}
        className="mx-auto w-full max-w-[1440px]"
      >
        {STEPS.map((step) => (
          <ScrollStackItem
            key={step.number}
            itemClassName="rounded-3xl border border-gray-200 bg-white p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-colors duration-300 dark:border-white/10 dark:bg-[#1a1a1a] dark:shadow-[0_8px_30px_rgba(0,0,0,0.35)] sm:p-10"
          >
            <div className="flex items-start justify-between gap-6">
              <div className="min-w-0 flex-1">
                <span className="text-[13px] font-semibold uppercase tracking-wide text-[#F26522]">
                  Step {step.number}
                </span>
                <h3 className="mt-3 text-[clamp(1.35rem,3vw,1.75rem)] font-semibold leading-tight tracking-[-0.02em] text-gray-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-lg text-[15px] leading-[1.65] text-gray-600 dark:text-gray-400 sm:text-[16px]">
                  {step.description}
                </p>
              </div>
              <span
                className="hidden shrink-0 text-[clamp(3rem,8vw,4.5rem)] font-medium leading-none tracking-tight text-[#F26522]/20 sm:block"
                aria-hidden="true"
              >
                {step.number}
              </span>
            </div>
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </section>
  )
}
