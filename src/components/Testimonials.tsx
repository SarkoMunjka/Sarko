import { motion } from 'motion/react'
import { SectionBadge } from './SectionBadge'
import BlurText from './BlurText'
import { FadeIn } from './FadeIn'
import {
  TestimonialsColumn,
  type TestimonialItem,
} from '@/components/ui/testimonials-columns-1'
import { useLanguage } from '../hooks/useLanguage'

const TESTIMONIAL_PEOPLE = [
  {
    image:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face',
    name: 'Maya Chen',
  },
  {
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    name: 'Daniel Roy',
  },
  {
    image:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face',
    name: 'Priya Anand',
  },
  {
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    name: 'James Okonkwo',
  },
  {
    image:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    name: 'Elena Vasquez',
  },
  {
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    name: 'Marcus Webb',
  },
  {
    image:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    name: 'Sofia Lindström',
  },
  {
    image:
      'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face',
    name: 'David Park',
  },
  {
    image:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    name: 'Amara Okafor',
  },
]

export function Testimonials() {
  const { t } = useLanguage()

  const testimonials: TestimonialItem[] = t.testimonials.items.map((item, index) => ({
    ...TESTIMONIAL_PEOPLE[index],
    text: item.text,
    role: item.role,
  }))

  const firstColumn = testimonials.slice(0, 5)
  const secondColumn = testimonials.slice(5, 9)

  return (
    <section className="section-tone-surface-down relative overflow-hidden pb-16 pt-16 transition-colors duration-300 sm:pb-20 sm:pt-20 lg:pb-28 lg:pt-28">
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-start lg:gap-10 xl:gap-16">
          <div className="lg:sticky lg:top-28 lg:pt-2">
            <SectionBadge number="5" label={t.testimonials.badge} />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
            >
              <BlurText
                as="h2"
                animateBy="words"
                delay={60}
                text={t.testimonials.headline}
                className="max-w-xl font-medium leading-[1.12] tracking-[-0.02em] text-gray-900 dark:text-white text-[clamp(1.5rem,4vw,3.2rem)]"
              />
              <FadeIn
                as="p"
                className="mt-5 max-w-md text-[15px] leading-[1.6] text-gray-600 dark:text-gray-400 sm:text-[17px]"
              >
                {t.testimonials.subcopy}
              </FadeIn>
            </motion.div>
          </div>

          <div className="mt-10 flex justify-end gap-4 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[640px] sm:mt-12 sm:gap-5 sm:max-h-[700px] lg:mt-0 lg:max-h-[740px] lg:gap-6">
            <TestimonialsColumn testimonials={firstColumn} duration={15} />
            <TestimonialsColumn
              testimonials={secondColumn}
              className="hidden sm:block"
              duration={19}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
