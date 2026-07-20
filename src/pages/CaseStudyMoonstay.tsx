import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import BlurText from '../components/BlurText'
import { FadeIn } from '../components/FadeIn'
import { BrowserFrame } from '../components/BrowserFrame'

const ACCENT = '#4A5D52'
const DEMO_URL = '/work-demos/moonstay/'

const IMG = {
  hero: '/work-demos/moonstay/hero-poster.jpg',
  stay: '/work-demos/moonstay/img/stay-01.jpg',
  mood: '/work-demos/moonstay/img/mood.jpg',
}

const META = [
  { label: 'Role', value: 'Identity · Web · Build' },
  { label: 'Timeline', value: '2026 · 5 weeks' },
  { label: 'Services', value: 'Strategy, Design, Dev' },
  { label: 'Platform', value: 'Custom static site' },
]

const APPROACH = [
  {
    no: '01',
    title: 'Mir kao proizvod',
    body: 'Minimalistički vizuelni jezik, prirodne fotografije i tipografija koja diše — pozicioniranje Moonstay-a kao kuratora autentičnih boravaka, ne još jednog booking portala.',
  },
  {
    no: '02',
    title: 'Scroll-scrub hero',
    body: 'Zaključan hero koji kroz skrol otkriva planinsku vilu kadar po kadar — isti cinematic pristup kao kod premium hospitality brendova, prilagođen performansama.',
  },
  {
    no: '03',
    title: 'Pill navigacija',
    body: 'Centrirana staklena navigacija i CTA „Započni pobeg“ — UI inspirisan high-end rental referencama, ali sa system-ui fontom i animacijama iz našeg barber stacka.',
  },
  {
    no: '04',
    title: 'Boravci koji prodaju atmosferu',
    body: 'Grid vila, kuća i vikendica sa dual marquee utiscima i blur-to-focus reveal animacijama — svaki detalj vodi ka osećaju tišine pre rezervacije.',
  },
]

const PALETTE = [
  { name: 'Forest', hex: '#4A5D52' },
  { name: 'Sage', hex: '#5C7265' },
  { name: 'Ink', hex: '#1A1A1A' },
  { name: 'Charcoal', hex: '#141414' },
  { name: 'Cream', hex: '#F7F5F2' },
  { name: 'White', hex: '#FFFFFF' },
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

export function CaseStudyMoonstay() {
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
          Hospitality · Web · 2026
        </FadeIn>
        <BlurText
          as="h1"
          animateBy="words"
          delay={70}
          text="Moonstay"
          className="font-medium leading-[1.05] tracking-[-0.03em] text-gray-900 dark:text-white text-[clamp(2.5rem,10vw,6rem)]"
        />
        <FadeIn
          as="p"
          className="mt-6 max-w-2xl text-[16px] leading-[1.6] text-gray-600 dark:text-gray-300 sm:text-[19px]"
        >
          Kurirani boravci za odmor — vile, kuće, apartmani i vikendice. Demo
          sajt sa scroll-scrub heroom, pill navigacijom i premium hospitality
          UX-om inspirisanim high-end rental brendovima.
        </FadeIn>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href={DEMO_URL}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-full py-2 pl-5 pr-2 text-[13px] font-medium text-white transition-opacity hover:opacity-90 sm:text-[14px]"
            style={{ backgroundColor: ACCENT }}
          >
            Poseti demo sajt
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
        <FadeIn className="aspect-[16/10] overflow-hidden rounded-3xl bg-[#141414] sm:aspect-[16/8]">
          <img
            src={IMG.hero}
            alt="Moonstay homepage"
            className="h-full w-full object-cover object-center"
            loading="lazy"
          />
        </FadeIn>
      </div>

      <section className="bg-white transition-colors duration-300 dark:bg-[#0a0a0a]">
        <div className="mx-auto grid w-full max-w-[1440px] gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1fr_1.6fr] lg:gap-16 lg:px-12 lg:py-28">
          <div>
            <SectionLabel>Pregled</SectionLabel>
            <BlurText
              as="h2"
              animateBy="words"
              delay={55}
              text={'Tišina kao\nluksuz.'}
              className="mt-5 font-medium leading-[1.12] tracking-[-0.02em] text-gray-900 dark:text-white text-[clamp(1.5rem,4vw,2.6rem)]"
            />
          </div>
          <div className="space-y-5">
            <FadeIn
              as="p"
              className="text-[16px] leading-[1.7] text-gray-700 dark:text-gray-300 sm:text-[18px]"
            >
              Moonstay kurira vile, kuće i vikendice za ljude koji žele da
              uspore — ali većina rental sajtova izgleda generički i pretrpano.
              Trebalo nam je iskustvo koje odmah komunicira mir, prostor i
              pažljiv odabir.
            </FadeIn>
            <FadeIn
              as="p"
              className="text-[15px] leading-[1.7] text-gray-600 dark:text-gray-400 sm:text-[16px]"
            >
              Demo koristi isti animation stack kao Lukić Barber: scroll-scrub
              hero, marquee, blur-to-focus reveal i progress bar — uz system-ui
              tipografiju i Moonstay-inspirisan pill UI.
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="bg-[#F5F5F5] transition-colors duration-300 dark:bg-[#121212]">
        <div className="mx-auto w-full max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-28">
          <SectionLabel>Pristup</SectionLabel>
          <BlurText
            as="h2"
            animateBy="words"
            delay={50}
            text="Od heroja do boravka"
            className="mt-5 max-w-xl font-medium leading-[1.12] tracking-[-0.02em] text-gray-900 dark:text-white text-[clamp(1.5rem,4vw,2.4rem)]"
          />
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:gap-10">
            {APPROACH.map((item) => (
              <FadeIn key={item.no} className="rounded-2xl border border-gray-200 bg-white p-7 dark:border-white/10 dark:bg-[#0a0a0a] sm:p-8">
                <span className="text-[12px] font-semibold tracking-wide text-gray-400">{item.no}</span>
                <h3 className="mt-3 text-[18px] font-semibold text-gray-900 dark:text-white sm:text-[20px]">
                  {item.title}
                </h3>
                <p className="mt-3 text-[14px] leading-[1.65] text-gray-600 dark:text-gray-400 sm:text-[15px]">
                  {item.body}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white transition-colors duration-300 dark:bg-[#0a0a0a]">
        <div className="mx-auto w-full max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-28">
          <SectionLabel>Live demo</SectionLabel>
          <BrowserFrame url="moonstay.rs" className="mt-8">
            <img src={IMG.stay} alt="Moonstay boravci" className="w-full" loading="lazy" />
          </BrowserFrame>
        </div>
      </section>

      <section className="bg-[#F5F5F5] transition-colors duration-300 dark:bg-[#121212]">
        <div className="mx-auto w-full max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-28">
          <SectionLabel>Paleta</SectionLabel>
          <div className="mt-8 flex flex-wrap gap-4">
            {PALETTE.map((c) => (
              <div key={c.hex} className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 dark:border-white/10 dark:bg-[#0a0a0a]">
                <span className="h-10 w-10 rounded-lg border border-black/5" style={{ backgroundColor: c.hex }} />
                <div>
                  <p className="text-[13px] font-semibold text-gray-900 dark:text-white">{c.name}</p>
                  <p className="text-[12px] text-gray-500">{c.hex}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white transition-colors duration-300 dark:bg-[#0a0a0a]">
        <div className="mx-auto w-full max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-28">
          <FadeIn className="overflow-hidden rounded-3xl">
            <img src={IMG.mood} alt="Moonstay atmosfera" className="w-full object-cover" loading="lazy" />
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  )
}
