import { SectionBadge } from './SectionBadge'

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
    <section className="bg-[#F5F5F5] pb-16 pt-16 sm:pb-20 sm:pt-20 lg:pb-28 lg:pt-28">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <SectionBadge number="4" label="How we work" borderClass="border-gray-300" />
        <h2 className="mb-12 font-medium leading-[1.12] tracking-[-0.02em] text-gray-900 text-[clamp(1.5rem,4vw,3.2rem)] sm:mb-16 lg:mb-20">
          A clear path from first
          <br />
          idea to final launch.
        </h2>

        <div className="grid grid-cols-1 gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => (
            <div key={step.number} className="border-t border-gray-300 pt-5">
              <span className="text-[34px] font-medium tracking-tight text-[#F26522] sm:text-[40px]">
                {step.number}
              </span>
              <h3 className="mt-4 text-[18px] font-semibold text-gray-900 sm:text-[20px]">
                {step.title}
              </h3>
              <p className="mt-2 text-[14px] leading-[1.6] text-gray-600 sm:text-[15px]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
