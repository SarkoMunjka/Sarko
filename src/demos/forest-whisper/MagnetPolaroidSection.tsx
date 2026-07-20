import { type CSSProperties } from 'react'
import { motion, useReducedMotion } from 'motion/react'

const IMG = '/work-demos/forest-whisper/img'

const EASE = [0.22, 0.61, 0.36, 1] as const

/** Shared inset — aligns headline + left polaroid under "THE" */
const HEADLINE_INSET = 'clamp(10%, 16vw, 20%)'

type PolaroidVariant = 'brand' | 'review'

interface PolaroidProps {
  image: string
  alt: string
  rotate: number
  className?: string
  style?: CSSProperties
  delay?: number
  variant: PolaroidVariant
  quote?: string
  name?: string
  avatar?: string
}

function FridgeMagnet() {
  return (
    <div
      className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-[42%]"
      aria-hidden
    >
      <div className="h-[14px] w-[34px] rounded-[3px] bg-gradient-to-b from-[#8fa383] via-[#576a4f] to-[#3f4d39] shadow-[0_3px_8px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.25)]" />
      <div className="mx-auto -mt-px h-[3px] w-[20px] rounded-full bg-[#2a3426]/60 blur-[1px]" />
    </div>
  )
}

function HeartIcon() {
  return (
    <svg width="22" height="20" viewBox="0 0 24 22" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <path
        d="M12 20s-8-5.2-8-11.2C4 5.6 6.8 3 10 3c1.8 0 3.4.9 4 2.3.6-1.4 2.2-2.3 4-2.3 3.2 0 6 2.6 6 5.8C24 14.8 12 20 12 20z"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function PolaroidCard({
  image,
  alt,
  rotate,
  className = '',
  style,
  delay = 0,
  variant,
  quote,
  name,
  avatar,
}: PolaroidProps) {
  const reduce = useReducedMotion()

  return (
    <motion.article
      className={`fw-polaroid w-[min(400px,92vw)] ${className}`}
      style={{ rotate: `${rotate}deg`, ...style }}
      initial={reduce ? false : { opacity: 0, y: 36, rotate: rotate - 6 }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 1, delay, ease: EASE }}
    >
      <FridgeMagnet />
      <div className="relative bg-white px-4 pb-6 pt-4 shadow-[0_20px_52px_rgba(16,16,16,0.18),0_6px_18px_rgba(16,16,16,0.08)]">
        <div className="aspect-[4/5] overflow-hidden bg-[#e8e2d8]">
          <img src={image} alt={alt} className="h-full w-full object-cover" loading="lazy" />
        </div>

        <div className="mt-5 min-h-[96px] px-1">
          {variant === 'brand' ? (
            <div className="flex flex-col items-center gap-2 text-[#576a4f]">
              <HeartIcon />
              <p className="font-script text-[clamp(1.35rem,2.4vw,1.75rem)] leading-none tracking-wide">
                Forest Whisper
              </p>
            </div>
          ) : (
            <>
              <p className="font-serif text-[2rem] leading-none text-[#a97842]/80" aria-hidden>
                „
              </p>
              <p className="mt-1 text-[13px] leading-[1.55] text-[#3a3a3a]">{quote}</p>
              <div className="mt-3 flex items-center gap-2.5">
                <img
                  src={avatar}
                  alt=""
                  className="h-7 w-7 rounded-full object-cover ring-1 ring-[#d8d0c4]"
                />
                <span className="text-[12px] font-medium text-[#101010]">{name}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </motion.article>
  )
}

export function MagnetPolaroidSection() {
  const reduce = useReducedMotion()

  const lineClass =
    'font-serif font-light uppercase tracking-[0.04em] text-[#101010]/24'

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-cream pb-[clamp(110px,15vw,180px)] pt-[clamp(64px,8vw,96px)]"
    >
      <div className="fw-about-stage relative mx-auto w-full max-w-[1320px] px-6 md:px-10">
        {/* Headline */}
        <motion.div
          className="relative z-20"
          style={{ paddingLeft: HEADLINE_INSET }}
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.1, ease: EASE }}
        >
          <h2 className="fw-about-headline inline-grid gap-x-0">
            <span className={`${lineClass} col-span-2 text-left text-[clamp(2.5rem,6vw,5.2rem)] leading-[0.9]`}>
              A vacation
            </span>
            <span
              id="fw-line-the"
              className={`${lineClass} whitespace-pre text-left text-[clamp(1.9rem,4.4vw,4rem)] leading-[0.95]`}
            >
              that will{' '}
            </span>
            <span className={`${lineClass} text-left text-[clamp(1.9rem,4.4vw,4rem)] leading-[0.95] md:whitespace-nowrap`}>
              be remembered
            </span>
            <span aria-hidden className="col-start-1" />
            <span className={`${lineClass} col-start-2 text-left text-[clamp(2.5rem,6vw,5.2rem)] leading-[0.9]`}>
              forever!
            </span>
          </h2>
        </motion.div>

        {/* Polaroids — aligned to headline grid */}
        <div className="fw-polaroid-board relative z-30 -mt-2 flex flex-col items-center gap-14 md:-mt-4 md:block md:h-[min(860px,112vw)] md:gap-0">
          {/* Left — directly under "THE" */}
          <PolaroidCard
            variant="brand"
            image={`${IMG}/polaroid-01.jpg`}
            alt="Child on a wooden deck looking toward a lit A-frame cabin at night"
            rotate={9}
            delay={0.12}
            className="relative md:absolute md:top-[2%]"
            style={{ left: HEADLINE_INSET }}
          />

          {/* Center */}
          <PolaroidCard
            variant="review"
            image={`${IMG}/polaroid-02.jpg`}
            alt="Guest facing an A-frame cabin in the forest with arms raised"
            rotate={-6}
            delay={0.28}
            quote="I posted 2 photos from here, and already 150+ likes and a bunch of questions about where this paradise is"
            name="Den"
            avatar={`${IMG}/avatar-den.jpg`}
            className="relative z-20 md:absolute md:left-1/2 md:top-[44%] md:-translate-x-1/2"
          />

          {/* Right — hugs right edge, slightly overlaps headline */}
          <PolaroidCard
            variant="review"
            image={`${IMG}/polaroid-03.jpg`}
            alt="Forest view from a wooden balcony with two chairs"
            rotate={8}
            delay={0.42}
            quote="I felt something similar in Bali... A complete union with nature..."
            name="Maria"
            avatar={`${IMG}/avatar-maria.jpg`}
            className="relative z-40 md:absolute md:-top-[6%] md:right-0 lg:-right-2"
          />
        </div>
      </div>
    </section>
  )
}
