import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ChevronLeft, ChevronRight, Tag, Users, Maximize2 } from 'lucide-react'

const IMG = '/work-demos/forest-whisper/img'
const EASE = [0.22, 0.61, 0.36, 1] as const
const SECTION_BG = '#d4cfb3'
const HERO_IMG = `${IMG}/hero-bg.png`

type House = {
  id: string
  name: string
  subtitle: string
  people: number
  price: number
  size: number
  slides: { src: string; position: string }[]
}

const CABIN_SLIDES = {
  wild: [
    { src: HERO_IMG, position: '68% 52%' },
    { src: HERO_IMG, position: '78% 48%' },
    { src: HERO_IMG, position: '55% 58%' },
    { src: HERO_IMG, position: '82% 55%' },
  ],
  nymph: [
    { src: HERO_IMG, position: '62% 50%' },
    { src: HERO_IMG, position: '70% 60%' },
    { src: HERO_IMG, position: '48% 55%' },
    { src: HERO_IMG, position: '75% 45%' },
  ],
  hiding: [
    { src: HERO_IMG, position: '72% 55%' },
    { src: HERO_IMG, position: '58% 62%' },
    { src: HERO_IMG, position: '85% 50%' },
    { src: HERO_IMG, position: '65% 48%' },
  ],
}

const HOUSES: House[] = [
  {
    id: 'wild-hut',
    name: 'Wild Hut',
    subtitle: 'A cozy retreat tucked deep in the whispering woods.',
    people: 2,
    price: 75,
    size: 40,
    slides: CABIN_SLIDES.wild,
  },
  {
    id: 'forest-nymph',
    name: 'Forest Nymph',
    subtitle: 'Soft light, warm timber and silence between the pines.',
    people: 4,
    price: 95,
    size: 55,
    slides: CABIN_SLIDES.nymph,
  },
  {
    id: 'forest-hiding',
    name: 'Forest Hiding Place',
    subtitle: 'Your private A-frame escape above the forest floor.',
    people: 6,
    price: 120,
    size: 72,
    slides: CABIN_SLIDES.hiding,
  },
]

function HouseIcon() {
  return (
    <svg width="52" height="40" viewBox="0 0 52 40" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
      <path d="M4 18 26 4l22 14v16H4V18z" strokeLinejoin="round" />
      <path d="M18 38V24h16v14" strokeLinejoin="round" />
      <path d="M26 4v6" strokeLinecap="round" />
    </svg>
  )
}

function HouseCarousel({ slides, alt }: { slides: House['slides']; alt: string }) {
  const [index, setIndex] = useState(0)
  const count = slides.length
  const slide = slides[index]

  return (
    <div className="w-full overflow-hidden rounded-[20px] bg-cream p-4 shadow-[0_16px_48px_rgba(0,0,0,0.14)] md:p-5">
      <div className="aspect-[4/3] w-full overflow-hidden rounded-[14px] bg-[#2a3426] md:min-h-[280px] lg:min-h-[320px]">
        <img
          src={slide.src}
          alt={alt}
          className="h-full w-full object-cover transition-opacity duration-500"
          style={{ objectPosition: slide.position }}
          loading="lazy"
        />
      </div>
      <div className="mt-5 flex items-center justify-center gap-6 px-2">
        <button
          type="button"
          onClick={() => setIndex((i) => (i - 1 + count) % count)}
          aria-label="Previous image"
          className="flex h-9 w-9 items-center justify-center text-ink/50 transition-colors hover:text-ink"
        >
          <ChevronLeft size={20} strokeWidth={1.5} />
        </button>
        <div className="flex items-center gap-2.5">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to image ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2.5 w-2.5 rounded-full transition-colors ${i === index ? 'bg-ink' : 'bg-ink/25'}`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => setIndex((i) => (i + 1) % count)}
          aria-label="Next image"
          className="flex h-9 w-9 items-center justify-center text-ink/50 transition-colors hover:text-ink"
        >
          <ChevronRight size={20} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  )
}

function HouseDetails({ house, index }: { house: House; index: number }) {
  return (
    <div className={`py-7 lg:py-8 ${index > 0 ? 'border-t border-dashed border-ink/15' : ''}`}>
      <h3 className="font-sans text-[clamp(1.15rem,1.8vw,1.45rem)] font-semibold uppercase tracking-[0.14em] text-ink">
        {house.name}
      </h3>
      <p className="mt-2.5 text-[13.5px] leading-[1.6] text-ink/65">{house.subtitle}</p>

      <ul className="mt-5 space-y-3">
        <li className="flex items-center gap-3 text-[13px] text-ink/80">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink/20 text-ink/70">
            <Users size={14} strokeWidth={1.5} />
          </span>
          Up to {house.people} people
        </li>
        <li className="flex items-center gap-3 text-[13px] text-ink/80">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink/20 text-ink/70">
            <Tag size={14} strokeWidth={1.5} />
          </span>
          {house.price} USD / day
        </li>
        <li className="flex items-center gap-3 text-[13px] text-ink/80">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink/20 text-ink/70">
            <Maximize2 size={14} strokeWidth={1.5} />
          </span>
          {house.size}m²
        </li>
      </ul>

      <a
        href="#houses"
        className="mt-6 inline-flex items-center justify-center rounded-full bg-forest-deep px-8 py-3 font-serif text-[10.5px] font-medium uppercase tracking-[0.22em] text-cream shadow-[0_10px_28px_rgba(0,0,0,0.22)] transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(0,0,0,0.3)]"
      >
        Book now
      </a>
    </div>
  )
}

export function HousesSection() {
  const reduce = useReducedMotion()

  const lineLg = 'font-serif font-light uppercase tracking-[0.04em] text-ink/26'
  const lineMd = 'font-serif font-light uppercase tracking-[0.04em] text-ink/26'

  return (
    <section id="houses" className="relative py-[clamp(72px,10vw,110px)]" style={{ backgroundColor: SECTION_BG }}>
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-10">
        {/* Editorial headline — starts at center, like about section */}
        <motion.div
          className="mb-14 pl-0 md:mb-20 md:pl-[50%]"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.1, ease: EASE }}
        >
          <h2 className="fw-houses-headline inline-grid gap-x-[clamp(12px,2vw,28px)]">
            <span className={`${lineLg} col-span-2 text-left text-[clamp(2.2rem,5.5vw,4.8rem)] leading-[0.9]`}>
              Are you going
            </span>
            <span className={`${lineMd} whitespace-nowrap text-left text-[clamp(1.7rem,3.8vw,3.6rem)] leading-[0.92]`}>
              together or with
            </span>
            <span className={`${lineMd} text-left text-[clamp(1.7rem,3.8vw,3.6rem)] leading-[0.92]`}>
              the whole
            </span>
            <div className="col-start-1 row-start-3 mt-2">
              <div className="rounded-[20px] bg-cream px-6 py-4 text-[#576a4f] shadow-[0_10px_32px_rgba(0,0,0,0.1)]">
                <HouseIcon />
                <p className="mt-2.5 font-script text-[clamp(1.35rem,2.4vw,1.85rem)] leading-none">
                  Choose your own house!
                </p>
              </div>
            </div>
            <span className={`${lineLg} col-start-2 row-start-3 self-end text-left text-[clamp(2.2rem,5.5vw,4.8rem)] leading-[0.9]`}>
              company?
            </span>
          </h2>
        </motion.div>

        {/* 60% carousel / 40% details */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[60%_40%] lg:gap-8 xl:gap-10">
          {/* Left — large cabin carousels */}
          <div className="flex flex-col gap-12 lg:gap-14">
            {HOUSES.map((house, i) => (
              <motion.div
                key={house.id}
                initial={reduce ? false : { opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.9, delay: i * 0.08, ease: EASE }}
              >
                <HouseCarousel slides={house.slides} alt={house.name} />
              </motion.div>
            ))}
          </div>

          {/* Right — house details panel */}
          <motion.div
            className="rounded-[20px] px-6 py-4 shadow-[0_8px_28px_rgba(0,0,0,0.08)] md:px-8 lg:sticky lg:top-8 lg:self-start"
            style={{ backgroundColor: SECTION_BG }}
            initial={reduce ? false : { opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 1, ease: EASE }}
          >
            {HOUSES.map((house, i) => (
              <HouseDetails key={house.id} house={house} index={i} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
