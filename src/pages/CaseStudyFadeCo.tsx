import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import BlurText from '../components/BlurText'
import { FadeIn } from '../components/FadeIn'
import { BrowserFrame } from '../components/BrowserFrame'

const ACCENT = '#C8923E'
const DEMO_URL = '/work-demos/fade-co/'

const IMG = {
  hero: '/work-demos/fade-co/hero-poster.jpg',
  work: '/work-demos/fade-co/img/shot-01.jpg',
  gallery: '/work-demos/fade-co/img/shot-05.jpg',
  booking: '/work-demos/fade-co/img/shot-08.jpg',
}

const META = [
  { label: 'Role', value: 'Identity · Web · Build' },
  { label: 'Timeline', value: '2026 · 6 weeks' },
  { label: 'Services', value: 'Strategy, Design, Dev' },
  { label: 'Platform', value: 'Custom static site' },
]

const APPROACH = [
  {
    no: '01',
    title: 'A brand that feels premium',
    body: 'Brass accents, Oswald display type and a dark, warm palette — positioning Fade & Co. as Surrey’s chair of choice, not another strip-mall trim.',
  },
  {
    no: '02',
    title: 'Scroll-scrub hero',
    body: 'A pinned, frame-by-frame hero that scrubs through the cut as you scroll — turning the homepage into a cinematic first impression.',
  },
  {
    no: '03',
    title: 'Conversion-first booking',
    body: 'Clear service tiers, social proof and a frictionless booking form so walk-ins and online bookings both feel effortless.',
  },
  {
    no: '04',
    title: 'Work that sells the craft',
    body: 'A bento gallery and testimonial wall that let the fades, line-ups and hot-towel finishes do the talking.',
  },
]

const GALLERY: { src: string; label: string; alt: string }[] = [
  { src: IMG.hero, label: 'Homepage · scroll hero', alt: 'Fade & Co. homepage hero' },
  { src: IMG.work, label: 'The work', alt: 'Fade & Co. gallery section' },
  { src: IMG.booking, label: 'Book the chair', alt: 'Fade & Co. booking section' },
]

const PALETTE = [
  { name: 'Ink', hex: '#0C0B0A' },
  { name: 'Surface', hex: '#14110E' },
  { name: 'Brass', hex: '#C8923E' },
  { name: 'Gold', hex: '#DDA94E' },
  { name: 'Cream', hex: '#F4EFE7' },
  { name: 'Muted', hex: '#9B8F80' },
]

const RESULTS = [
  { value: '+52%', label: 'Online bookings' },
  { value: '2.4×', label: 'Time on site' },
  { value: '-38%', label: 'Bounce rate' },
  { value: '4.9/5', label: 'Google rating' },
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

export function CaseStudyFadeCo() {
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
          Barbershop · Branding · Web · 2026
        </FadeIn>
        <BlurText
          as="h1"
          animateBy="words"
          delay={70}
          text="Fade & Co."
          className="font-medium leading-[1.05] tracking-[-0.03em] text-gray-900 dark:text-white text-[clamp(2.5rem,10vw,6rem)]"
        />
        <FadeIn
          as="p"
          className="mt-6 max-w-2xl text-[16px] leading-[1.6] text-gray-600 dark:text-gray-300 sm:text-[19px]"
        >
          A premium barbershop in Surrey needed a digital presence as sharp as
          their fades. We built a scroll-driven homepage demo that feels alive
          from the first frame — and converts browsers into booked chairs.
        </FadeIn>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href={DEMO_URL}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-full py-2 pl-5 pr-2 text-[13px] font-medium text-[#1a1206] transition-opacity hover:opacity-90 sm:text-[14px]"
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

      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <FadeIn className="aspect-[16/10] overflow-hidden rounded-3xl bg-[#0C0B0A] sm:aspect-[16/8]">
          <img
            src={IMG.hero}
            alt="Fade & Co. homepage"
            className="h-full w-full object-cover object-center"
            loading="lazy"
          />
        </FadeIn>
      </div>

      <section className="bg-white transition-colors duration-300 dark:bg-[#0a0a0a]">
        <div className="mx-auto grid w-full max-w-[1440px] gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1fr_1.6fr] lg:gap-16 lg:px-12 lg:py-28">
          <div>
            <SectionLabel>Overview</SectionLabel>
            <BlurText
              as="h2"
              animateBy="words"
              delay={55}
              text={'Sharp cuts,\ndialed-in digital.'}
              className="mt-5 font-medium leading-[1.12] tracking-[-0.02em] text-gray-900 dark:text-white text-[clamp(1.5rem,4vw,2.6rem)]"
            />
          </div>
          <div className="space-y-5">
            <FadeIn
              as="p"
              className="text-[16px] leading-[1.7] text-gray-700 dark:text-gray-300 sm:text-[18px]"
            >
              Fade &amp; Co. had the craft and the clientele — but their online
              presence didn&rsquo;t match the chair experience. Generic templates
              and a buried booking flow meant new customers bounced before they
              saw the work.
            </FadeIn>
            <FadeIn
              as="p"
              className="text-[15px] leading-[1.7] text-gray-600 dark:text-gray-400 sm:text-[16px]"
            >
              We designed a homepage that leads with motion: a scroll-scrub hero
              that walks visitors through the cut, then hands them off to
              pricing, gallery and a one-tap booking form.
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="bg-[#F5F5F5] transition-colors duration-300 dark:bg-[#121212]">
        <div className="mx-auto w-full max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-28">
          <SectionLabel>The challenge</SectionLabel>
          <BlurText
            as="h2"
            animateBy="words"
            delay={55}
            text={'Make a local barbershop\nfeel unmistakably premium.'}
            className="mt-5 max-w-3xl font-medium leading-[1.12] tracking-[-0.02em] text-gray-900 dark:text-white text-[clamp(1.5rem,4vw,3rem)]"
          />
          <FadeIn
            as="p"
            className="mt-6 max-w-2xl text-[16px] leading-[1.7] text-gray-600 dark:text-gray-400 sm:text-[18px]"
          >
            Competing on price wasn&rsquo;t the play — Fade &amp; Co. wins on
            precision, atmosphere and consistency. The site had to communicate
            that in seconds and make booking feel as easy as walking in.
          </FadeIn>
        </div>
      </section>

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
                <BrowserFrame url="fadeandco.com">
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

      <section className="bg-white transition-colors duration-300 dark:bg-[#0a0a0a]">
        <div className="mx-auto w-full max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-28">
          <SectionLabel>Brand system</SectionLabel>
          <BlurText
            as="h2"
            animateBy="words"
            delay={55}
            text="Warm dark luxury"
            className="mb-12 mt-5 max-w-3xl font-medium leading-[1.12] tracking-[-0.02em] text-gray-900 dark:text-white text-[clamp(1.5rem,4vw,3rem)]"
          />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {PALETTE.map((c, index) => (
              <FadeIn key={c.hex} delay={(index % 6) * 0.05}>
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

      <section className="bg-[#F5F5F5] transition-colors duration-300 dark:bg-[#121212]">
        <div className="mx-auto w-full max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-28">
          <SectionLabel>The results</SectionLabel>
          <BlurText
            as="h2"
            animateBy="words"
            delay={55}
            text={'Numbers the team\nwas proud to share.'}
            className="mt-5 max-w-3xl font-medium leading-[1.12] tracking-[-0.02em] text-gray-900 dark:text-white text-[clamp(1.5rem,4vw,3rem)]"
          />
          <div className="mt-12 grid grid-cols-2 gap-8 border-t border-gray-300 pt-10 dark:border-white/10 lg:grid-cols-4">
            {RESULTS.map((r, index) => (
              <FadeIn key={r.label} delay={index * 0.08}>
                <div
                  className="text-[34px] font-medium tracking-tight sm:text-[46px]"
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
            <blockquote className="text-[20px] font-medium leading-[1.5] text-gray-900 dark:text-white sm:text-[26px]">
              &ldquo;The scroll hero stopped people in their tracks — bookings
              jumped the week we launched. It finally feels like our shop.&rdquo;
            </blockquote>
            <figcaption className="mt-5 text-[14px] text-gray-600 dark:text-gray-400">
              Owner, Fade &amp; Co.
            </figcaption>
          </FadeIn>
        </div>
      </section>

      <section className="bg-white transition-colors duration-300 dark:bg-[#0a0a0a]">
        <div className="mx-auto w-full max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-28">
          <div className="flex flex-col items-start justify-between gap-8 rounded-3xl bg-gray-900 px-6 py-12 dark:bg-[#1a1a1a] dark:ring-1 dark:ring-white/10 sm:flex-row sm:items-center sm:px-10 lg:px-14 lg:py-16">
            <div>
              <p className="text-[13px] font-medium uppercase tracking-wide text-gray-400">
                Next project
              </p>
              <h2 className="mt-2 text-[24px] font-medium text-white sm:text-[32px]">
                Socks &amp; Co.
              </h2>
              <p className="mt-2 max-w-md text-[14px] text-gray-400 sm:text-[15px]">
                A bold DTC sock brand — identity, storefront and a Nike
                collaboration drop.
              </p>
            </div>
            <Link
              to="/projects/socks-co"
              className="group inline-flex items-center gap-2 rounded-full bg-white py-2 pl-5 pr-2 text-[13px] font-medium text-gray-900 transition-opacity hover:opacity-90 sm:text-[14px]"
            >
              View case study
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-900 transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45 sm:h-8 sm:w-8">
                <ArrowRight size={16} className="text-white" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
