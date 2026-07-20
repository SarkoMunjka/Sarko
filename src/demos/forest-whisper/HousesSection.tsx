import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ChevronLeft, ChevronRight, Tag, Users, Maximize2 } from 'lucide-react'

const IMG = '/work-demos/forest-whisper/img'
const EASE = [0.22, 0.61, 0.36, 1] as const
const SECTION_BG = '#d4cfb3'

type House = {
  id: string
  name: string
  subtitle: string
  people: number
  price: number
  size: number
  images: string[]
}

const HOUSES: House[] = [
  {
    id: 'wild-hut',
    name: 'Wild Hut',
    subtitle: 'A cozy retreat tucked deep in the whispering woods.',
    people: 2,
    price: 75,
    size: 40,
    images: [`${IMG}/house-01.jpg`, `${IMG}/polaroid-01.jpg`, `${IMG}/hero-bg.jpg`, `${IMG}/house-02.jpg`],
  },
  {
    id: 'forest-nymph',
    name: 'Forest Nymph',
    subtitle: 'Soft light, warm timber and silence between the pines.',
    people: 4,
    price: 95,
    size: 55,
    images: [`${IMG}/house-02.jpg`, `${IMG}/polaroid-02.jpg`, `${IMG}/house-03.jpg`, `${IMG}/house-01.jpg`],
  },
  {
    id: 'forest-hiding',
    name: 'Forest Hiding Place',
    subtitle: 'Your private A-frame escape above the forest floor.',
    people: 6,
    price: 120,
    size: 72,
    images: [`${IMG}/house-03.jpg`, `${IMG}/polaroid-03.jpg`, `${IMG}/house-02.jpg`, `${IMG}/house-01.jpg`],
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

function HouseCarousel({ images, alt }: { images: string[]; alt: string }) {
  const [index, setIndex] = useState(0)
  const count = images.length

  return (
    <div className="overflow-hidden rounded-[18px] bg-cream p-3 shadow-[0_14px_40px_rgba(0,0,0,0.18)]">
      <div className="aspect-[16/11] overflow-hidden rounded-[12px] bg-[#d8d0c4]">
        <img src={images[index]} alt={alt} className="h-full w-full object-cover" loading="lazy" />
      </div>
      <div className="mt-4 flex items-center justify-center gap-5 px-2">
        <button
          type="button"
          onClick={() => setIndex((i) => (i - 1 + count) % count)}
          aria-label="Previous image"
          className="flex h-8 w-8 items-center justify-center text-ink/50 transition-colors hover:text-ink"
        >
          <ChevronLeft size={18} strokeWidth={1.5} />
        </button>
        <div className="flex items-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to image ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2 w-2 rounded-full transition-colors ${i === index ? 'bg-ink' : 'bg-ink/25'}`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => setIndex((i) => (i + 1) % count)}
          aria-label="Next image"
          className="flex h-8 w-8 items-center justify-center text-ink/50 transition-colors hover:text-ink"
        >
          <ChevronRight size={18} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  )
}

function HouseDetails({ house, index }: { house: House; index: number }) {
  return (
    <div className={`py-8 ${index > 0 ? 'border-t border-dashed border-ink/15' : ''}`}>
      <h3 className="font-sans text-[clamp(1.2rem,2vw,1.5rem)] font-semibold uppercase tracking-[0.14em] text-ink">
        {house.name}
      </h3>
      <p className="mt-3 max-w-sm text-[14px] leading-[1.6] text-ink/65">{house.subtitle}</p>

      <ul className="mt-6 space-y-3.5">
        <li className="flex items-center gap-3 text-[13.5px] text-ink/80">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/20 text-ink/70">
            <Users size={14} strokeWidth={1.5} />
          </span>
          Up to {house.people} people
        </li>
        <li className="flex items-center gap-3 text-[13.5px] text-ink/80">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/20 text-ink/70">
            <Tag size={14} strokeWidth={1.5} />
          </span>
          {house.price} USD / day
        </li>
        <li className="flex items-center gap-3 text-[13.5px] text-ink/80">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/20 text-ink/70">
            <Maximize2 size={14} strokeWidth={1.5} />
          </span>
          {house.size}m²
        </li>
      </ul>

      <a
        href="#houses"
        className="mt-8 inline-flex items-center justify-center rounded-full bg-forest-deep px-9 py-3.5 font-serif text-[11px] font-medium uppercase tracking-[0.22em] text-cream shadow-[0_10px_28px_rgba(0,0,0,0.22)] transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(0,0,0,0.3)]"
      >
        Book now
      </a>
    </div>
  )
}

export function HousesSection() {
  const reduce = useReducedMotion()

  return (
    <section id="houses" className="relative py-[clamp(72px,10vw,110px)]" style={{ backgroundColor: SECTION_BG }}>
      <div className="mx-auto max-w-[1180px] px-6 md:px-10">
        {/* Header */}
        <div className="mb-14 flex flex-col items-end gap-8 md:mb-16">
          <motion.h2
            className="max-w-[min(100%,640px)] text-right font-serif text-[clamp(2rem,4.8vw,3.75rem)] font-light uppercase leading-[0.95] tracking-[0.04em] text-ink"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1, ease: EASE }}
          >
            Are you going together
            <br />
            or with the whole company?
          </motion.h2>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
            className="rounded-[20px] bg-cream px-7 py-5 text-[#576a4f] shadow-[0_10px_32px_rgba(0,0,0,0.1)]"
          >
            <HouseIcon />
            <p className="mt-3 font-script text-[clamp(1.5rem,2.8vw,2rem)] leading-none">
              Choose your own house!
            </p>
          </motion.div>
        </div>

        {/* Mobile — carousel + details per house */}
        <div className="space-y-12 lg:hidden">
          {HOUSES.map((house, i) => (
            <motion.div
              key={house.id}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, delay: i * 0.08, ease: EASE }}
            >
              <HouseCarousel images={house.images} alt={house.name} />
              <div className="mt-6 rounded-[20px] px-6 py-2 shadow-[0_8px_28px_rgba(0,0,0,0.08)]" style={{ backgroundColor: SECTION_BG }}>
                <HouseDetails house={house} index={0} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Desktop — carousels left, shared torn panel right */}
        <div className="hidden grid-cols-2 grid-rows-3 gap-x-12 gap-y-14 lg:grid">
          {HOUSES.map((house, i) => (
            <motion.div
              key={house.id}
              className={`lg:col-start-1 ${i === 0 ? 'lg:row-start-1' : i === 1 ? 'lg:row-start-2' : 'lg:row-start-3'}`}
              initial={reduce ? false : { opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, delay: i * 0.1, ease: EASE }}
            >
              <HouseCarousel images={house.images} alt={house.name} />
            </motion.div>
          ))}

          <motion.div
            className="rounded-[20px] px-8 py-4 shadow-[0_8px_28px_rgba(0,0,0,0.08)] md:px-12 md:py-6 lg:col-start-2 lg:row-span-3 lg:row-start-1"
            style={{ backgroundColor: SECTION_BG }}
            initial={reduce ? false : { opacity: 0, x: 20 }}
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
