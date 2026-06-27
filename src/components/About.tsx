import { ArrowRight } from 'lucide-react'
import { TextRoll } from './TextRoll'
import BlurText from './BlurText'
import { FadeIn } from './FadeIn'
import { useLanguage } from '../hooks/useLanguage'

const SMALL_IMAGE =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260516_090123_74be96d4-9c1b-40cf-932a-96f4f4babed3.png&w=1280&q=85'
const LARGE_IMAGE =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260516_090133_c157d30b-a99a-4477-bec1-a446149ec3f2.png&w=1280&q=85'

function StudioButton() {
  const { t } = useLanguage()
  return (
    <a
      href="#"
      className="group inline-flex items-center gap-2 self-start rounded-full bg-[#F26522] py-2 pl-5 pr-2 text-[13px] font-medium text-white transition-colors hover:bg-[#e05a1a] sm:pl-6 sm:text-[14px]"
    >
      <TextRoll>{t.about.cta}</TextRoll>
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45 sm:h-8 sm:w-8">
        <ArrowRight size={16} className="text-[#F26522]" />
      </span>
    </a>
  )
}

export function About() {
  const { t } = useLanguage()

  return (
    <section
      id="about"
      className="section-tone-surface-down relative overflow-hidden pb-12 pt-16 transition-colors duration-300 sm:pb-16 sm:pt-20 lg:pb-24 lg:pt-32"
    >
      <div className="mx-auto w-full max-w-[1440px]">
        {/* Badge row */}
        <div className="mb-6 flex items-center gap-3 px-5 sm:mb-8 sm:px-8 lg:px-12">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-[11px] font-semibold text-white dark:bg-white dark:text-gray-900 sm:h-7 sm:w-7 sm:text-[12px]">
            1
          </div>
          <span className="rounded-full border border-gray-200 px-3 py-1 text-[12px] font-medium text-gray-900 dark:border-white/15 dark:text-gray-200 sm:px-4 sm:py-1.5 sm:text-[13px]">
            {t.about.badge}
          </span>
        </div>

        {/* Heading */}
        <BlurText
          as="h2"
          animateBy="words"
          delay={60}
          text={t.about.headline}
          className="mb-12 px-5 font-medium leading-[1.12] tracking-[-0.02em] text-gray-900 dark:text-white text-[clamp(1.5rem,4vw,3.2rem)] sm:mb-16 sm:px-8 lg:mb-28 lg:px-12"
        />

        {/* Mobile / tablet layout */}
        <div className="px-5 sm:px-8 lg:hidden">
          <FadeIn
            as="p"
            className="text-[15px] font-medium leading-[1.6] text-gray-900 dark:text-gray-200 sm:text-[17px]"
          >
            {t.about.body}
          </FadeIn>
          <div className="mt-6">
            <StudioButton />
          </div>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:gap-5">
            <img
              src={SMALL_IMAGE}
              alt={t.about.imageWork}
              className="aspect-[438/346] w-full rounded-xl object-cover sm:w-[45%] sm:rounded-2xl"
              loading="lazy"
            />
            <img
              src={LARGE_IMAGE}
              alt={t.about.imageProject}
              className="aspect-[900/600] w-full rounded-xl object-cover sm:w-[55%] sm:rounded-2xl"
              loading="lazy"
            />
          </div>
        </div>

        {/* Desktop layout */}
        <div className="hidden grid-cols-[26%_1fr_48%] items-end gap-6 px-5 sm:px-8 lg:grid lg:px-12 xl:gap-8">
          <div className="self-end">
            <img
              src={SMALL_IMAGE}
              alt={t.about.imageWork}
              className="aspect-[438/346] w-full rounded-2xl object-cover"
              loading="lazy"
            />
          </div>
          <div className="flex justify-end self-start">
            <div className="flex flex-col">
              <FadeIn
                as="p"
                className="whitespace-nowrap text-[16px] font-medium leading-[1.65] text-gray-900 dark:text-gray-200 sm:text-[18px]"
              >
                {t.about.bodyLines[0]}
                <br />
                {t.about.bodyLines[1]}
                <br />
                {t.about.bodyLines[2]}
              </FadeIn>
              <div className="mt-6">
                <StudioButton />
              </div>
            </div>
          </div>
          <div className="self-end">
            <img
              src={LARGE_IMAGE}
              alt={t.about.imageProject}
              className="aspect-[3/2] w-full rounded-2xl object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
