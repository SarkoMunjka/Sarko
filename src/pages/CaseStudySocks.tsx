import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import BlurText from '../components/BlurText'
import { FadeIn } from '../components/FadeIn'
import { BrowserFrame } from '../components/BrowserFrame'

const ACCENT = '#9181D6'

const IMG = {
  home: '/socks-home.png',
  collab: '/socks-collab.png',
  cart: '/socks-cart.png',
}

const META = [
  { label: 'Role', value: 'Identity · Web · Build' },
  { label: 'Timeline', value: '2024 · 8 weeks' },
  { label: 'Services', value: 'Strategy, Design, Dev' },
  { label: 'Platform', value: 'Headless e-commerce' },
]

const APPROACH = [
  {
    no: '01',
    title: 'An identity with personality',
    body: 'A hand-drawn wordmark, a punchy primary palette and expressive display type that lets the brand feel as fun as the product itself.',
  },
  {
    no: '02',
    title: 'A storefront built to convert',
    body: 'Clear product hierarchy, a sticky cart, free-shipping nudges and social proof — every screen engineered to move shoppers toward checkout.',
  },
  {
    no: '03',
    title: 'The Nike collaboration drop',
    body: 'A limited-edition landing experience with a live countdown and dedicated collaboration store to turn the launch into an event.',
  },
  {
    no: '04',
    title: 'Friction-free checkout',
    body: 'A three-step delivery → shipping → payment flow with guest checkout and a persistent order summary that keeps cart abandonment low.',
  },
]

const GALLERY: { src: string; label: string; alt: string }[] = [
  { src: IMG.home, label: 'Homepage', alt: 'Socks & Co. homepage' },
  {
    src: IMG.collab,
    label: 'Limited edition · Nike collaboration',
    alt: 'Socks & Co. x Nike collaboration store',
  },
  { src: IMG.cart, label: 'Cart & checkout', alt: 'Socks & Co. cart and checkout' },
]

const PALETTE = [
  { name: 'Grape', hex: '#9181D6' },
  { name: 'Sunshine', hex: '#FFD23F' },
  { name: 'Blossom', hex: '#F4B7C7' },
  { name: 'Sky', hex: '#BFD9F2' },
  { name: 'Cream', hex: '#FBF4E6' },
  { name: 'Ink', hex: '#1B1B1F' },
]

const RESULTS = [
  { value: '+38%', label: 'Conversion rate' },
  { value: '2.1×', label: 'Average order value' },
  { value: '-45%', label: 'Bounce rate' },
  { value: '4.9/5', label: 'Customer rating' },
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

export function CaseStudySocks() {
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
          E-commerce · Branding · 2024
        </FadeIn>
        <BlurText
          as="h1"
          animateBy="words"
          delay={70}
          text="Socks & Co."
          className="font-medium leading-[1.05] tracking-[-0.03em] text-gray-900 dark:text-white text-[clamp(2.5rem,10vw,6rem)]"
        />
        <FadeIn
          as="p"
          className="mt-6 max-w-2xl text-[16px] leading-[1.6] text-gray-600 dark:text-gray-300 sm:text-[19px]"
        >
          We helped a direct-to-consumer sock brand find its voice — building a
          playful identity and a high-converting storefront that turned everyday
          basics into a brand people brag about.
        </FadeIn>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href="/#contact"
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

      {/* Cover visual */}
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <FadeIn className="aspect-[16/10] overflow-hidden rounded-3xl sm:aspect-[16/8]">
          <img
            src={IMG.home}
            alt="Socks & Co. homepage"
            className="h-full w-full object-cover object-top"
            loading="lazy"
          />
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
              text={'Everyday socks,\nbrought to life.'}
              className="mt-5 font-medium leading-[1.12] tracking-[-0.02em] text-gray-900 dark:text-white text-[clamp(1.5rem,4vw,2.6rem)]"
            />
          </div>
          <div className="space-y-5">
            <FadeIn
              as="p"
              className="text-[16px] leading-[1.7] text-gray-700 dark:text-gray-300 sm:text-[18px]"
            >
              Socks &amp; Co. had a great product but a flat online presence that
              looked like every other commodity store. They wanted to stand out,
              tell a story and sell more — without losing the warmth that made
              customers love them.
            </FadeIn>
            <FadeIn
              as="p"
              className="text-[15px] leading-[1.7] text-gray-600 dark:text-gray-400 sm:text-[16px]"
            >
              We rebuilt the brand from the ground up: a distinctive identity, an
              expressive art direction and a storefront engineered for
              conversion — then capped it off with a headline-grabbing Nike
              collaboration drop.
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
            text={'Turn a commodity into a brand\npeople actually talk about.'}
            className="mt-5 max-w-3xl font-medium leading-[1.12] tracking-[-0.02em] text-gray-900 dark:text-white text-[clamp(1.5rem,4vw,3rem)]"
          />
          <FadeIn
            as="p"
            className="mt-6 max-w-2xl text-[16px] leading-[1.7] text-gray-600 dark:text-gray-400 sm:text-[18px]"
          >
            The old site buried the product in generic templates, the checkout
            leaked sales, and the brand had no personality to rally a community
            around. Our job was to fix all three at once.
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
                <BrowserFrame>
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
            text="A palette with personality"
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

      {/* Results */}
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

          <FadeIn
            as="figure"
            className="mt-16 max-w-3xl"
          >
            <blockquote className="text-[20px] font-medium leading-[1.5] text-gray-900 dark:text-white sm:text-[26px]">
              &ldquo;Axion gave us a brand we are genuinely excited to show off —
              and the numbers followed. Best decision we made this year.&rdquo;
            </blockquote>
            <figcaption className="mt-5 text-[14px] text-gray-600 dark:text-gray-400">
              Founder, Socks &amp; Co.
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
                Have a brand worth bragging about?
              </h2>
              <p className="mt-3 max-w-md text-[15px] text-gray-400 sm:text-[16px]">
                Let&rsquo;s build the experience that gets you there.
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
