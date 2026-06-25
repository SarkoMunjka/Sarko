import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import BlurText from '../components/BlurText'
import { FadeIn } from '../components/FadeIn'
import { BrowserFrame } from '../components/BrowserFrame'
import { VimeoEmbed } from '../components/VimeoPreview'
import { getCaseStudy } from '../data/caseStudies'

function SectionLabel({
  children,
  accent,
}: {
  children: string
  accent: string
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: accent }} />
      <span className="text-[12px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
        {children}
      </span>
    </div>
  )
}

function LiveSiteButton({ href, accent }: { href?: string; accent: string }) {
  const className =
    'group inline-flex items-center gap-2 rounded-full py-2 pl-5 pr-2 text-[13px] font-medium text-white sm:text-[14px]'
  const icon = (
    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45 sm:h-8 sm:w-8">
      <ArrowUpRight size={16} style={{ color: accent }} />
    </span>
  )

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={`${className} transition-opacity hover:opacity-90`}
        style={{ backgroundColor: accent }}
      >
        Visit live site
        {icon}
      </a>
    )
  }

  return (
    <span
      className={`${className} cursor-default opacity-80`}
      style={{ backgroundColor: accent }}
      aria-disabled="true"
    >
      Visit live site
      {icon}
    </span>
  )
}

export function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>()
  const study = slug ? getCaseStudy(slug) : undefined

  if (!study) {
    return <Navigate to="/projects" replace />
  }

  const { accent } = study
  const paletteCols = study.palette.length >= 6 ? 'lg:grid-cols-6' : 'lg:grid-cols-5'

  return (
    <div className="bg-[#EFEFEF] transition-colors duration-300 dark:bg-[#0a0a0a]">
      <Navbar />

      <header className="mx-auto w-full max-w-[1440px] px-5 pb-10 pt-8 sm:px-8 sm:pb-14 lg:px-12 lg:pb-16">
        <FadeIn as="div" y={8}>
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <ArrowLeft size={15} />
            All projects
          </Link>
        </FadeIn>

        <FadeIn
          as="p"
          y={10}
          className="mb-4 mt-8 text-[13px] font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400 sm:text-[14px]"
        >
          {study.tagline}
        </FadeIn>
        <BlurText
          as="h1"
          animateBy="words"
          delay={70}
          text={study.name}
          className="font-medium leading-[1.05] tracking-[-0.03em] text-gray-900 dark:text-white text-[clamp(2.5rem,10vw,6rem)]"
        />
        <FadeIn
          as="p"
          className="mt-6 max-w-2xl text-[16px] leading-[1.6] text-gray-600 dark:text-gray-300 sm:text-[19px]"
        >
          {study.intro}
        </FadeIn>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <LiveSiteButton href={study.liveUrl} accent={accent} />
        </div>

        <dl className="mt-12 grid grid-cols-2 gap-6 border-t border-gray-300 pt-8 dark:border-white/10 lg:grid-cols-4">
          {study.meta.map((m) => (
            <div key={m.label}>
              <dt className="text-[12px] uppercase tracking-wide text-gray-500 dark:text-gray-500">
                {m.label}
              </dt>
              <dd className="mt-1.5 text-[14px] font-medium text-gray-900 dark:text-white sm:text-[15px]">
                {m.value}
              </dd>
            </div>
          ))}
        </dl>
      </header>

      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <FadeIn
          className={`relative aspect-[16/10] overflow-hidden rounded-3xl sm:aspect-[16/8] ${
            study.coverVimeoId ? 'bg-[#15110D]' : 'bg-white'
          }`}
        >
          <img
            src={study.coverImage}
            alt={`${study.name} homepage`}
            className="absolute inset-0 h-full w-full object-cover object-top"
            loading="eager"
          />
          {study.coverVimeoId && <VimeoEmbed videoId={study.coverVimeoId} />}
        </FadeIn>
      </div>

      <section className="bg-white transition-colors duration-300 dark:bg-[#0a0a0a]">
        <div className="mx-auto grid w-full max-w-[1440px] gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1fr_1.6fr] lg:gap-16 lg:px-12 lg:py-28">
          <div>
            <SectionLabel accent={accent}>Overview</SectionLabel>
            <BlurText
              as="h2"
              animateBy="words"
              delay={55}
              text={study.overview.heading}
              className="mt-5 font-medium leading-[1.12] tracking-[-0.02em] text-gray-900 dark:text-white text-[clamp(1.5rem,4vw,2.6rem)]"
            />
          </div>
          <div className="space-y-5">
            {study.overview.paragraphs.map((p) => (
              <FadeIn
                key={p.slice(0, 40)}
                as="p"
                className="text-[16px] leading-[1.7] text-gray-700 dark:text-gray-300 sm:text-[18px]"
              >
                {p}
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F5F5F5] transition-colors duration-300 dark:bg-[#121212]">
        <div className="mx-auto w-full max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-28">
          <SectionLabel accent={accent}>The challenge</SectionLabel>
          <BlurText
            as="h2"
            animateBy="words"
            delay={55}
            text={study.challenge.heading}
            className="mt-5 max-w-3xl font-medium leading-[1.12] tracking-[-0.02em] text-gray-900 dark:text-white text-[clamp(1.5rem,4vw,3rem)]"
          />
          <FadeIn
            as="p"
            className="mt-6 max-w-2xl text-[16px] leading-[1.7] text-gray-600 dark:text-gray-400 sm:text-[18px]"
          >
            {study.challenge.body}
          </FadeIn>
        </div>
      </section>

      <section className="bg-white transition-colors duration-300 dark:bg-[#0a0a0a]">
        <div className="mx-auto w-full max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-28">
          <SectionLabel accent={accent}>The approach</SectionLabel>
          <BlurText
            as="h2"
            animateBy="words"
            delay={55}
            text="What we did"
            className="mt-5 font-medium leading-[1.12] tracking-[-0.02em] text-gray-900 dark:text-white text-[clamp(1.5rem,4vw,3rem)]"
          />
          <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2">
            {study.approach.map((item, index) => (
              <FadeIn
                key={item.no}
                delay={(index % 2) * 0.08}
                className="border-t border-gray-200 pt-5 dark:border-white/10"
              >
                <span
                  className="text-[30px] font-medium tracking-tight sm:text-[36px]"
                  style={{ color: accent }}
                >
                  {item.no}
                </span>
                <h3 className="mt-3 text-[18px] font-semibold text-gray-900 dark:text-white sm:text-[20px]">
                  {item.title}
                </h3>
                <p className="mt-2 text-[14px] leading-[1.65] text-gray-600 dark:text-gray-400 sm:text-[15px]">
                  {item.body}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F5F5F5] transition-colors duration-300 dark:bg-[#121212]">
        <div className="mx-auto w-full max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-28">
          <SectionLabel accent={accent}>The work</SectionLabel>
          <BlurText
            as="h2"
            animateBy="words"
            delay={55}
            text="A look across the experience"
            className="mb-12 mt-5 max-w-3xl font-medium leading-[1.12] tracking-[-0.02em] text-gray-900 dark:text-white text-[clamp(1.5rem,4vw,3rem)]"
          />

          {study.galleryVimeoId && (
            <FadeIn className="mx-auto mb-12 max-w-[1000px] sm:mb-16">
              <div className="mb-4 flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: accent }} />
                <span className="text-[13px] font-medium text-gray-700 dark:text-gray-300">
                  Site walkthrough
                </span>
              </div>
              <BrowserFrame url={study.gallerySiteUrl}>
                <div className="relative aspect-[16/10] bg-black">
                  <VimeoEmbed videoId={study.galleryVimeoId} />
                </div>
              </BrowserFrame>
            </FadeIn>
          )}

          <div className="mx-auto flex max-w-[1000px] flex-col gap-12 sm:gap-16">
            {study.gallery.map((g, index) => (
              <FadeIn key={g.src} delay={(index % 2) * 0.06}>
                <div className="mb-4 flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: accent }} />
                  <span className="text-[13px] font-medium text-gray-700 dark:text-gray-300">
                    {g.label}
                  </span>
                </div>
                <BrowserFrame url={study.gallerySiteUrl}>
                  <div className="bg-white">
                    <img
                      src={g.src}
                      alt={g.alt}
                      className="block h-auto w-full"
                      loading="lazy"
                    />
                  </div>
                </BrowserFrame>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white transition-colors duration-300 dark:bg-[#0a0a0a]">
        <div className="mx-auto w-full max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-28">
          <SectionLabel accent={accent}>Brand system</SectionLabel>
          <BlurText
            as="h2"
            animateBy="words"
            delay={55}
            text={study.paletteHeading}
            className="mb-12 mt-5 max-w-3xl font-medium leading-[1.12] tracking-[-0.02em] text-gray-900 dark:text-white text-[clamp(1.5rem,4vw,3rem)]"
          />
          <div className={`grid grid-cols-2 gap-4 sm:grid-cols-3 ${paletteCols}`}>
            {study.palette.map((c, index) => (
              <FadeIn key={c.hex} delay={(index % study.palette.length) * 0.05}>
                <div
                  className="aspect-square rounded-2xl ring-1 ring-black/5 dark:ring-white/10"
                  style={{ backgroundColor: c.hex }}
                />
                <div className="mt-3 text-[13px] font-semibold text-gray-900 dark:text-white">
                  {c.name}
                </div>
                <div className="text-[12px] uppercase tracking-wide text-gray-500 dark:text-gray-500">
                  {c.hex}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {study.results && (
        <section className="bg-[#F5F5F5] transition-colors duration-300 dark:bg-[#121212]">
          <div className="mx-auto w-full max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-28">
            <SectionLabel accent={accent}>{study.results.sectionLabel}</SectionLabel>
            <BlurText
              as="h2"
              animateBy="words"
              delay={55}
              text={study.results.heading}
              className="mt-5 max-w-3xl font-medium leading-[1.12] tracking-[-0.02em] text-gray-900 dark:text-white text-[clamp(1.5rem,4vw,3rem)]"
            />
            <div className="mt-12 grid grid-cols-2 gap-8 border-t border-gray-300 pt-10 dark:border-white/10 lg:grid-cols-4">
              {study.results.items.map((r, index) => (
                <FadeIn key={r.label} delay={index * 0.08}>
                  <div
                    className="text-[30px] font-medium tracking-tight sm:text-[42px]"
                    style={{ color: accent }}
                  >
                    {r.value}
                  </div>
                  <div className="mt-1 text-[13px] text-gray-600 dark:text-gray-400 sm:text-[14px]">
                    {r.label}
                  </div>
                </FadeIn>
              ))}
            </div>

            {study.results.quote && (
              <FadeIn as="figure" className="mt-16 max-w-3xl">
                <blockquote
                  className={`leading-[1.5] text-gray-900 dark:text-white ${
                    study.results.quote.serif
                      ? 'font-serif text-[22px] sm:text-[28px]'
                      : 'text-[20px] font-medium sm:text-[26px]'
                  }`}
                >
                  &ldquo;{study.results.quote.text}&rdquo;
                </blockquote>
                <figcaption className="mt-5 text-[14px] text-gray-600 dark:text-gray-400">
                  {study.results.quote.attribution}
                </figcaption>
              </FadeIn>
            )}
          </div>
        </section>
      )}

      <section className="bg-white transition-colors duration-300 dark:bg-[#0a0a0a]">
        <div className="mx-auto w-full max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-28">
          <div className="flex flex-col items-start justify-between gap-8 rounded-3xl bg-gray-900 px-6 py-12 dark:bg-[#1a1a1a] dark:ring-1 dark:ring-white/10 sm:flex-row sm:items-center sm:px-10 lg:px-14 lg:py-16">
            <div>
              <h2 className="font-medium leading-[1.1] tracking-[-0.02em] text-white text-[clamp(1.5rem,4vw,2.6rem)]">
                {study.ctaHeading}
              </h2>
              <p className="mt-3 max-w-md text-[15px] text-gray-400 sm:text-[16px]">
                {study.ctaSubtext}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="/#contact"
                className="group inline-flex items-center gap-2 rounded-full bg-[#F26522] py-2 pl-5 pr-2 text-[13px] font-medium text-white transition-colors hover:bg-[#e05a1a] sm:text-[14px]"
              >
                Start a project
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45 sm:h-8 sm:w-8">
                  <ArrowRight size={16} className="text-[#F26522]" />
                </span>
              </a>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2 text-[13px] font-medium text-white transition-colors hover:bg-white/10 sm:text-[14px]"
              >
                All projects
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
