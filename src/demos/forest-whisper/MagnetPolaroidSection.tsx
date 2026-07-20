import { motion, useReducedMotion } from 'motion/react'

const IMG = '/work-demos/forest-whisper/img'

const EASE = [0.22, 0.61, 0.36, 1] as const

type PolaroidVariant = 'brand' | 'review'

interface PolaroidProps {
  image: string
  alt: string
  rotate: number
  className?: string
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
  delay = 0,
  variant,
  quote,
  name,
  avatar,
}: PolaroidProps) {
  const reduce = useReducedMotion()

  return (
    <motion.article
      className={`fw-polaroid w-[min(280px,78vw)] ${className}`}
      style={{ rotate: `${rotate}deg` }}
      initial={reduce ? false : { opacity: 0, y: 36, rotate: rotate - 6 }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 1, delay, ease: EASE }}
    >
      <FridgeMagnet />
      <div className="relative bg-white px-3 pb-5 pt-3 shadow-[0_16px_44px_rgba(16,16,16,0.16),0_4px_14px_rgba(16,16,16,0.08)]">
        <div className="aspect-[4/4.6] overflow-hidden bg-[#e8e2d8]">
          <img src={image} alt={alt} className="h-full w-full object-cover" loading="lazy" />
        </div>

        <div className="mt-4 min-h-[88px] px-1">
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
              <p className="mt-1 text-[12.5px] leading-[1.55] text-[#3a3a3a]">{quote}</p>
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

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-cream pb-[clamp(80px,12vw,140px)] pt-[clamp(72px,10vw,110px)]"
    >
      {/* Background heading — sits behind polaroids */}
      <motion.h2
        className="pointer-events-none relative z-0 mx-auto max-w-[min(92%,980px)] text-center font-serif text-[clamp(2.4rem,6.2vw,5.4rem)] font-light uppercase leading-[0.92] tracking-[0.04em] text-[#101010]/14"
        initial={reduce ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.1, ease: EASE }}
      >
        <span className="block">A vacation</span>
        <span className="block">that will be remembered</span>
        <span className="block">forever!</span>
      </motion.h2>

      {/* Polaroid board */}
      <div className="fw-polaroid-board relative z-10 mx-auto mt-0 flex w-full max-w-[1180px] flex-col items-center gap-10 px-6 pb-8 md:mt-[clamp(-48px,-4vw,-24px)] md:block md:h-[min(720px,118vw)] md:gap-0 md:px-10 md:pb-0">
        <PolaroidCard
          variant="brand"
          image={`${IMG}/polaroid-01.jpg`}
          alt="Child on a wooden deck looking toward a lit A-frame cabin at night"
          rotate={-9}
          delay={0.12}
          className="relative md:absolute md:left-[4%] md:top-[4%]"
        />
        <PolaroidCard
          variant="review"
          image={`${IMG}/polaroid-02.jpg`}
          alt="Guest facing an A-frame cabin in the forest with arms raised"
          rotate={-4}
          delay={0.28}
          quote="I posted 2 photos from here, and already 150+ likes and a bunch of questions about where this paradise is"
          name="Den"
          avatar={`${IMG}/avatar-den.jpg`}
          className="relative z-20 md:absolute md:left-1/2 md:top-[38%] md:-translate-x-1/2"
        />
        <PolaroidCard
          variant="review"
          image={`${IMG}/polaroid-03.jpg`}
          alt="Forest view from a wooden balcony with two chairs"
          rotate={14}
          delay={0.42}
          quote="I felt something similar in Bali... A complete union with nature..."
          name="Maria"
          avatar={`${IMG}/avatar-maria.jpg`}
          className="relative md:absolute md:right-[5%] md:top-[0%]"
        />
      </div>

      {/* Mossy branch — bottom right */}
      <div
        className="pointer-events-none absolute bottom-0 right-0 z-30 w-[min(52vw,420px)] translate-x-[12%] translate-y-[18%]"
        aria-hidden
      >
        <img
          src={`${IMG}/branch-moss.jpg`}
          alt=""
          className="h-auto w-full rotate-[8deg] object-cover opacity-95 [mask-image:linear-gradient(135deg,black_40%,transparent_88%)]"
        />
      </div>
    </section>
  )
}
