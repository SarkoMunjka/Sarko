import { SectionBadge } from './SectionBadge'
import BlurText from './BlurText'
import { FadeIn } from './FadeIn'

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
          className="mb-12 font-medium leading-[1.12] tracking-[-0.02em] text-gray-900 dark:text-white text-[clamp(1.5rem,4vw,3.2rem)] sm:mb-16 lg:mb-20"
        />

        <div className="grid grid-cols-1 gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <FadeIn
              key={step.number}
              delay={index * 0.08}
              className="border-t border-gray-300 pt-5 dark:border-white/15"
            >
              <span className="text-[34px] font-medium tracking-tight text-[#F26522] sm:text-[40px]">
                {step.number}
              </span>
              <h3 className="mt-4 text-[18px] font-semibold text-gray-900 dark:text-white sm:text-[20px]">
                {step.title}
              </h3>
              <p className="mt-2 text-[14px] leading-[1.6] text-gray-600 dark:text-gray-400 sm:text-[15px]">
                {step.description}
              </p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
