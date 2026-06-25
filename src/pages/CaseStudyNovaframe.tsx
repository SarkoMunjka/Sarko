import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import BlurText from '../components/BlurText'
import { FadeIn } from '../components/FadeIn'
import { BrowserFrame } from '../components/BrowserFrame'
import { VimeoEmbed } from '../components/VimeoPreview'

const ACCENT = '#B79268'
const NOVA_VIMEO = '1204433136'

const IMG = {
  home: '/nova-home.jpg',
  couples: '/nova-couples.jpg',
}

const GALLERY: { src: string; label: string; alt: string }[] = [
  { src: IMG.home, label: 'Homepage', alt: 'NovaFrame homepage hero' },
  {
    src: IMG.couples,
    label: 'Couples portfolio',
    alt: 'NovaFrame couples portfolio',
  },
]

const META = [
  { label: 'Role', value: 'Web design · Build' },
  { label: 'Client', value: 'NovaFrame FVS' },
  { label: 'Services', value: 'Art direction, Web, Motion' },
  { label: 'Based', value: 'Belgrade, Serbia' },
]

const APPROACH = [
  {
    no: '01',
    title: 'Cinematic art direction',
    body: 'Full-bleed film, restrained type and a warm, filmic palette — a site that feels as cinematic as the work it showcases.',
  },
  {
    no: '02',
    title: 'A story-first portfolio',
    body: 'Each couple gets their own chapter, letting real love stories — Mila & Lyosha, Marina & Stefan and more — lead the experience.',
  },
  {
    no: '03',
    title: 'A frictionless quote flow',
    body: 'A clear “Get a quote” path turns inspired visitors into booked couples, with packages and process explained up front.',
  },
  {
    no: '04',
    title: 'Answers that build trust',
    body: 'A thoughtful FAQ covers style, delivery times and travel — removing doubt before couples ever reach out.',
  },
]

const PALETTE = [
  { name: 'Ink', hex: '#15110D' },
  { name: 'Charcoal', hex: '#221C16' },
  { name: 'Gold', hex: '#B79268' },
  { name: 'Taupe', hex: '#8C7F6E' },
  { name: 'Cream', hex: '#EFE7DA' },
]

const FACTS = [
  { value: '4–6 min', label: 'Cinematic highlight film' },
  { value: '40–90 min', label: 'Documentary film' },
  { value: '2,000', label: 'Edited photos (up to)' },
  { value: '8–10 wks', label: 'Film delivery' },
]

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: ACCENT }} />
      <span className="text-[12px] font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
        {children}
      </span>
    </div>
  )
}

export function CaseStudyNovaframe() {
  return (
    <div className="bg-[#EFEFEF] transition-colors duration-300 dark:bg-[#0a0a0a]">
      <Navbar />

      {/* Hero */}
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
          Wedding film · Web · 2025
        </FadeIn>
        <BlurText
          as="h1"
          animateBy="words"
          delay={70}
          text="NovaFrame"
          className="font-medium leading-[1.05] tracking-[-0.03em] text-gray-900 dark:text-white text-[clamp(2.5rem,10vw,6rem)]"
        />
        <FadeIn
          as="p"
          className="mt-6 max-w-2xl text-[16px] leading-[1.6] text-gray-600 dark:text-gray-300 sm:text-[19px]"
        >
          NovaFrame FVS is the vision of Dušan Jovanović — a Belgrade wedding
          film studio capturing love stories across Europe and the world. We
          built a portfolio site as cinematic and timeless as their films.
        </FadeIn>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href="https://novaframefvs.com/"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-full py-2 pl-5 pr-2 text-[13px] font-medium text-white transition-opacity hover:opacity-90 sm:text-[14px]"
            style={{ backgroundColor: ACCENT }}
          >
            Visit live site
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45 sm:h-8 sm:w-8">
              <ArrowUpRight size={16} style={{ color: ACCENT }} />
            </span>
          </a>
        </div>

        <dl className="mt-12 grid grid-cols-2 gap-6 border-t border-gray-300 pt-8 dark:border-white/10 lg:grid-cols-4">
          {META.map((m) => (
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

      {/* Cover visual — autoplay site walkthrough */}
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <FadeIn className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-[#15110D] sm:aspect-[16/8]">
          <img
            src={IMG.home}
            alt="NovaFrame homepage"
            className="absolute inset-0 h-full w-full object-cover object-top"
            loading="lazy"
          />
          <VimeoEmbed videoId={NOVA_VIMEO} />
        </FadeIn>
      </div>

      {/* Overview */}
      <section className="bg-white transition-colors duration-300 dark:bg-[#0a0a0a]">
        <div className="mx-auto grid w-full max-w-[1440px] gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1fr_1.6fr] lg:gap-16 lg:px-12 lg:py-28">
          <div>
            <SectionLabel>Overview</SectionLabel>
            <BlurText
              as="h2"
              animateBy="words"
              delay={55}
              text={'A site as cinematic\nas the films.'}
              className="mt-5 font-medium leading-[1.12] tracking-[-0.02em] text-gray-900 dark:text-white text-[clamp(1.5rem,4vw,2.6rem)]"
            />
          </div>
          <div className="space-y-5">
            <FadeIn
              as="p"
              className="text-[16px] leading-[1.7] text-gray-700 dark:text-gray-300 sm:text-[18px]"
            >
              NovaFrame shoots in a documentary style with a cinematic touch —
              real, genuine moments, beautifully framed. Their old presence
              didn&rsquo;t do the work justice, and couples needed a clearer path
              to booking.
            </FadeIn>
            <FadeIn
              as="p"
              className="text-[15px] leading-[1.7] text-gray-600 dark:text-gray-400 sm:text-[16px]"
            >
              We crafted a dark, filmic interface that puts the films first,
              tells each couple&rsquo;s story, and guides visitors toward a quote
              — all while feeling effortless and timeless.
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Challenge */}
      <section className="bg-[#F5F5F5] transition-colors duration-300 dark:bg-[#121212]">
        <div className="mx-auto w-full max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-28">
          <SectionLabel>The challenge</SectionLabel>
          <BlurText
            as="h2"
            animateBy="words"
            delay={55}
            text={'Make the films the hero —\nand turn viewers into couples.'}
            className="mt-5 max-w-3xl font-medium leading-[1.12] tracking-[-0.02em] text-gray-900 dark:text-white text-[clamp(1.5rem,4vw,3rem)]"
          />
          <FadeIn
            as="p"
            className="mt-6 max-w-2xl text-[16px] leading-[1.7] text-gray-600 dark:text-gray-400 sm:text-[18px]"
          >
            Wedding films are emotional and immersive, but a website can flatten
            them. The site had to preserve that cinematic feeling, build instant
            trust, and make booking effortless for couples planning months ahead.
          </FadeIn>
        </div>
      </section>

      {/* Approach */}
      <section className="bg-white transition-colors duration-300 dark:bg-[#0a0a0a]">
        <div className="mx-auto w-full max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-28">
          <SectionLabel>The approach</SectionLabel>
          <BlurText
            as="h2"
            animateBy="words"
            delay={55}
            text="What we did"
            className="mt-5 font-medium leading-[1.12] tracking-[-0.02em] text-gray-900 dark:text-white text-[clamp(1.5rem,4vw,3rem)]"
          />
          <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2">
            {APPROACH.map((item, index) => (
              <FadeIn
                key={item.no}
                delay={(index % 2) * 0.08}
                className="border-t border-gray-200 pt-5 dark:border-white/10"
              >
                <span
                  className="text-[30px] font-medium tracking-tight sm:text-[36px]"
                  style={{ color: ACCENT }}
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

      {/* Gallery */}
      <section className="bg-[#F5F5F5] transition-colors duration-300 dark:bg-[#121212]">
        <div className="mx-auto w-full max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-28">
          <SectionLabel>The work</SectionLabel>
          <BlurText
            as="h2"
            animateBy="words"
            delay={55}
            text="A look across the experience"
            className="mb-12 mt-5 max-w-3xl font-medium leading-[1.12] tracking-[-0.02em] text-gray-900 dark:text-white text-[clamp(1.5rem,4vw,3rem)]"
          />

          <FadeIn className="mx-auto mb-12 max-w-[1000px] sm:mb-16">
            <div className="mb-4 flex items-center gap-2.5">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: ACCENT }}
              />
              <span className="text-[13px] font-medium text-gray-700 dark:text-gray-300">
                Site walkthrough
              </span>
            </div>
            <BrowserFrame url="novaframefvs.com">
              <div className="relative aspect-[16/10] bg-[#15110D]">
                <VimeoEmbed videoId={NOVA_VIMEO} />
              </div>
            </BrowserFrame>
          </FadeIn>

          <div className="mx-auto flex max-w-[1000px] flex-col gap-12 sm:gap-16">
            {GALLERY.map((g, index) => (
              <FadeIn key={g.src} delay={(index % 2) * 0.06}>
                <div className="mb-4 flex items-center gap-2.5">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: ACCENT }}
                  />
                  <span className="text-[13px] font-medium text-gray-700 dark:text-gray-300">
                    {g.label}
                  </span>
                </div>
                <BrowserFrame url="novaframefvs.com">
                  <img
                    src={g.src}
                    alt={g.alt}
                    className="block h-auto w-full"
                    loading="lazy"
                  />
                </BrowserFrame>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Brand system */}
      <section className="bg-white transition-colors duration-300 dark:bg-[#0a0a0a]">
        <div className="mx-auto w-full max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-28">
          <SectionLabel>Brand system</SectionLabel>
          <BlurText
            as="h2"
            animateBy="words"
            delay={55}
            text="A warm, filmic palette"
            className="mb-12 mt-5 max-w-3xl font-medium leading-[1.12] tracking-[-0.02em] text-gray-900 dark:text-white text-[clamp(1.5rem,4vw,3rem)]"
          />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {PALETTE.map((c, index) => (
              <FadeIn key={c.hex} delay={(index % 5) * 0.05}>
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

      {/* Facts / results */}
      <section className="bg-[#F5F5F5] transition-colors duration-300 dark:bg-[#121212]">
        <div className="mx-auto w-full max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-28">
          <SectionLabel>By the numbers</SectionLabel>
          <BlurText
            as="h2"
            animateBy="words"
            delay={55}
            text={'What couples can\nexpect.'}
            className="mt-5 max-w-3xl font-medium leading-[1.12] tracking-[-0.02em] text-gray-900 dark:text-white text-[clamp(1.5rem,4vw,3rem)]"
          />
          <div className="mt-12 grid grid-cols-2 gap-8 border-t border-gray-300 pt-10 dark:border-white/10 lg:grid-cols-4">
            {FACTS.map((r, index) => (
              <FadeIn key={r.label} delay={index * 0.08}>
                <div
                  className="text-[30px] font-medium tracking-tight sm:text-[42px]"
                  style={{ color: ACCENT }}
                >
                  {r.value}
                </div>
                <div className="mt-1 text-[13px] text-gray-600 dark:text-gray-400 sm:text-[14px]">
                  {r.label}
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn as="figure" className="mt-16 max-w-3xl">
            <blockquote className="font-serif text-[22px] leading-[1.5] text-gray-900 dark:text-white sm:text-[28px]">
              &ldquo;Every story, every emotion, captured cinematically.&rdquo;
            </blockquote>
            <figcaption className="mt-5 text-[14px] text-gray-600 dark:text-gray-400">
              NovaFrame FVS
            </figcaption>
          </FadeIn>
        </div>
      </section>

      {/* Next / CTA */}
      <section className="bg-white transition-colors duration-300 dark:bg-[#0a0a0a]">
        <div className="mx-auto w-full max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-28">
          <div className="flex flex-col items-start justify-between gap-8 rounded-3xl bg-gray-900 px-6 py-12 dark:bg-[#1a1a1a] dark:ring-1 dark:ring-white/10 sm:flex-row sm:items-center sm:px-10 lg:px-14 lg:py-16">
            <div>
              <h2 className="font-medium leading-[1.1] tracking-[-0.02em] text-white text-[clamp(1.5rem,4vw,2.6rem)]">
                Have a story worth telling?
              </h2>
              <p className="mt-3 max-w-md text-[15px] text-gray-400 sm:text-[16px]">
                Let&rsquo;s build the experience that brings it to life.
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
