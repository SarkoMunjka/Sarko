import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import BlurText from './BlurText'
import { FadeIn } from './FadeIn'
import { ScrollPreview } from './ScrollPreview'
import { VimeoHoverPreview } from './VimeoPreview'

export function CaseStudies() {
  return (
    <section
      id="work"
      className="bg-[#F5F5F5] pb-16 pt-16 transition-colors duration-300 dark:bg-[#121212] sm:pb-20 sm:pt-20 lg:pb-28 lg:pt-28"
    >
      <div className="mx-auto w-full max-w-[1440px]">
        {/* Badge row */}
        <div className="mb-6 flex items-center gap-3 px-5 sm:mb-8 sm:px-8 lg:px-12">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-[11px] font-semibold text-white dark:bg-white dark:text-gray-900 sm:h-7 sm:w-7 sm:text-[12px]">
            2
          </div>
          <span className="rounded-full border border-gray-300 px-3 py-1 text-[12px] font-medium text-gray-900 dark:border-white/15 dark:text-gray-200 sm:px-4 sm:py-1.5 sm:text-[13px]">
            Featured client work
          </span>
        </div>

        {/* Heading */}
        <BlurText
          as="h2"
          animateBy="words"
          delay={80}
          text="Our projects"
          className="mb-10 px-5 font-medium leading-[1.08] tracking-[-0.03em] text-gray-900 dark:text-white text-[clamp(1.75rem,7vw,4.2rem)] sm:mb-14 sm:px-8 sm:text-[clamp(2.5rem,5vw,4.2rem)] lg:mb-16 lg:px-12"
        />

        {/* Cards */}
        <div className="grid grid-cols-1 gap-5 px-5 sm:gap-6 sm:px-8 md:grid-cols-2 lg:gap-7 lg:px-12">
          {/* Card 1 — Socks & Co. (full case study) */}
          <div>
            <Link
              to="/projects/socks-co"
              className="group relative block aspect-[329/246] cursor-pointer overflow-hidden rounded-2xl bg-[#9181D6]"
            >
              <ScrollPreview src="/socks-home.png" alt="Socks & Co. homepage" />
              <div className="absolute bottom-4 left-4 z-10 flex h-9 w-9 items-center overflow-hidden rounded-full bg-gray-900 transition-all duration-300 ease-in-out group-hover:w-[168px]">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center text-white">
                  <ArrowRight
                    size={14}
                    className="-rotate-45 transition-transform duration-300 group-hover:rotate-0"
                  />
                </span>
                <span className="whitespace-nowrap pr-3 text-[13px] font-medium text-white opacity-0 transition-opacity delay-100 duration-300 group-hover:opacity-100">
                  View case study
                </span>
              </div>
            </Link>
            <FadeIn
              as="p"
              className="mt-4 text-[13px] leading-relaxed text-gray-600 dark:text-gray-400 sm:text-[14px]"
            >
              A bold direct-to-consumer sock brand — identity, a high-converting
              storefront and a Nike collaboration drop
            </FadeIn>
            <h3 className="mt-1 text-[14px] font-semibold text-gray-900 dark:text-white sm:text-[15px]">
              Socks &amp; Co.
            </h3>
          </div>

          {/* Card 2 — NovaFrame (full case study) */}
          <div>
            <Link
              to="/projects/novaframe"
              className="group relative block aspect-[329/246] cursor-pointer overflow-hidden rounded-2xl bg-[#15110D]"
            >
              <VimeoHoverPreview
                videoId="1204433136"
                posterSrc="/nova-home.jpg"
              />
              <div className="absolute bottom-4 left-4 z-10 flex h-9 w-9 items-center overflow-hidden rounded-full bg-white transition-all duration-300 ease-in-out group-hover:w-[168px]">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center text-gray-900">
                  <ArrowRight
                    size={14}
                    className="-rotate-45 transition-transform duration-300 group-hover:rotate-0"
                  />
                </span>
                <span className="whitespace-nowrap pr-3 text-[13px] font-medium text-gray-900 opacity-0 transition-opacity delay-100 duration-300 group-hover:opacity-100">
                  View case study
                </span>
              </div>
            </Link>
            <FadeIn
              as="p"
              className="mt-4 text-[13px] leading-relaxed text-gray-600 dark:text-gray-400 sm:text-[14px]"
            >
              A cinematic portfolio and booking site for a Belgrade wedding film
              studio shooting love stories worldwide
            </FadeIn>
            <h3 className="mt-1 text-[14px] font-semibold text-gray-900 dark:text-white sm:text-[15px]">
              NovaFrame
            </h3>
          </div>
        </div>
      </div>
    </section>
  )
}
