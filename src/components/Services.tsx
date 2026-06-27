import {
  Compass,
  LayoutGrid,
  Code2,
  Sparkles,
  Palette,
  TrendingUp,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { SectionBadge } from './SectionBadge'
import BlurText from './BlurText'
import { FadeIn } from './FadeIn'
import { useLanguage } from '../hooks/useLanguage'

const SERVICE_ICONS: LucideIcon[] = [
  Compass,
  LayoutGrid,
  Code2,
  Sparkles,
  Palette,
  TrendingUp,
]

export function Services() {
  const { t } = useLanguage()

  return (
    <section
      id="services"
      className="section-tone-surface-down relative pb-16 pt-16 transition-colors duration-300 sm:pb-20 sm:pt-20 lg:pb-28 lg:pt-28"
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <SectionBadge number="3" label={t.services.badge} />
        <BlurText
          as="h2"
          animateBy="words"
          delay={60}
          text={t.services.headline}
          className="mb-12 font-medium leading-[1.12] tracking-[-0.02em] text-gray-900 dark:text-white text-[clamp(1.5rem,4vw,3.2rem)] sm:mb-16"
        />

        <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {t.services.items.map(({ title, description }, index) => {
            const Icon = SERVICE_ICONS[index]
            return (
              <FadeIn
                key={title}
                delay={(index % 3) * 0.08}
                className="group rounded-2xl border border-gray-200 p-6 transition-colors duration-300 hover:border-gray-900 dark:border-white/10 dark:hover:border-white sm:p-8"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F5F5F5] text-gray-900 transition-colors duration-300 group-hover:bg-[#F26522] group-hover:text-white dark:bg-white/10 dark:text-white sm:h-12 sm:w-12">
                  <Icon size={20} />
                </div>
                <h3 className="mt-5 text-[17px] font-semibold text-gray-900 dark:text-white sm:mt-6 sm:text-[19px]">
                  {title}
                </h3>
                <p className="mt-2 text-[14px] leading-[1.6] text-gray-600 dark:text-gray-400 sm:text-[15px]">
                  {description}
                </p>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
