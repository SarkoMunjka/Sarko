import { SectionBadge } from './SectionBadge'
import BlurText from './BlurText'
import { FadeIn } from './FadeIn'

interface Testimonial {
  quote: string
  name: string
  role: string
  initials: string
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'Axion translated a vague vision into a brand that finally feels like us. The launch doubled our demo requests in a single month.',
    name: 'Maya Chen',
    role: 'CEO, Northwind',
    initials: 'MC',
  },
  {
    quote:
      'The most collaborative studio we have worked with. Sharp thinking, beautiful execution and zero drama from kickoff to launch.',
    name: 'Daniel Roy',
    role: 'Head of Product, Lumen',
    initials: 'DR',
  },
  {
    quote:
      'They sweat every pixel and every millisecond. Our new site is the fastest and best-looking in our entire category.',
    name: 'Priya Anand',
    role: 'CMO, Vertex',
    initials: 'PA',
  },
]

export function Testimonials() {
  return (
    <section className="bg-white pb-16 pt-16 sm:pb-20 sm:pt-20 lg:pb-28 lg:pt-28">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <SectionBadge number="5" label="Kind words" />
        <BlurText
          as="h2"
          animateBy="words"
          delay={60}
          text={'Teams keep coming back\nfor the details.'}
          className="mb-12 font-medium leading-[1.12] tracking-[-0.02em] text-gray-900 text-[clamp(1.5rem,4vw,3.2rem)] sm:mb-16"
        />

        <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-3 lg:gap-7">
          {TESTIMONIALS.map((t, index) => (
            <FadeIn
              as="figure"
              key={t.name}
              delay={index * 0.1}
              className="flex flex-col justify-between rounded-2xl border border-gray-200 p-6 sm:p-8"
            >
              <blockquote className="text-[16px] font-medium leading-[1.5] text-gray-900 sm:text-[18px]">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 sm:mt-8">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-[12px] font-semibold text-white">
                  {t.initials}
                </div>
                <div>
                  <div className="text-[14px] font-semibold text-gray-900">
                    {t.name}
                  </div>
                  <div className="text-[13px] text-gray-600">{t.role}</div>
                </div>
              </figcaption>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
