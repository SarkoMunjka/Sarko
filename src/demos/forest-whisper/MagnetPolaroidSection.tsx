import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'

const IMG = '/work-demos/forest-whisper/img'

const EASE = [0.22, 0.61, 0.36, 1] as const
const HEADLINE_INSET = 'clamp(10%, 16vw, 20%)'

const CARD_W = 360
const IMAGE_H = 360
const CAPTION_H = 108
const CARD_H = CARD_W + 24 + CAPTION_H
/** Extra shift so left card clears the center polaroid */
const LEFT_CARD_SHIFT = 130

type PolaroidVariant = 'brand' | 'review'

interface PolaroidProps {
  image: string
  alt: string
  rotate: number
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
  delay = 0,
  variant,
  quote,
  name,
  avatar,
}: PolaroidProps) {
  const reduce = useReducedMotion()

  return (
    <motion.article
      className="fw-polaroid shrink-0"
      style={{ width: CARD_W, height: CARD_H, rotate: `${rotate}deg` }}
      initial={reduce ? false : { opacity: 0, y: 36, rotate: rotate - 6 }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 1, delay, ease: EASE }}
    >
      <FridgeMagnet />
      <div className="flex h-full flex-col bg-white px-4 pb-4 pt-4 shadow-[0_20px_52px_rgba(16,16,16,0.18),0_6px_18px_rgba(16,16,16,0.08)]">
        <div
          className="mx-auto shrink-0 overflow-hidden bg-[#e8e2d8]"
          style={{ width: CARD_W - 32, height: IMAGE_H }}
        >
          <img src={image} alt={alt} className="h-full w-full object-cover" loading="lazy" />
        </div>

        <div className="flex flex-col justify-center px-1 pt-4" style={{ height: CAPTION_H }}>
          {variant === 'brand' ? (
            <div className="flex flex-col items-center gap-2 text-[#576a4f]">
              <HeartIcon />
              <p className="font-script text-[1.5rem] leading-none tracking-wide">Forest Whisper</p>
            </div>
          ) : (
            <>
              <p className="font-serif text-[1.75rem] leading-none text-[#a97842]/80" aria-hidden>
                „
              </p>
              <p className="mt-1 line-clamp-3 text-[12.5px] leading-[1.5] text-[#3a3a3a]">{quote}</p>
              <div className="mt-2 flex items-center gap-2.5">
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
  const stageRef = useRef<HTMLDivElement>(null)
  const theRef = useRef<HTMLSpanElement>(null)
  const [leftAnchor, setLeftAnchor] = useState(80)

  const lineClass =
    'font-serif font-light uppercase tracking-[0.04em] text-[#101010]/24'

  useEffect(() => {
    const measure = () => {
      if (!theRef.current || !stageRef.current) return
      const theRect = theRef.current.getBoundingClientRect()
      const stageRect = stageRef.current.getBoundingClientRect()
      const theCenter = theRect.left + Math.min(theRect.width * 0.22, 52)
      const anchor = theCenter - stageRect.left - LEFT_CARD_SHIFT
      setLeftAnchor(Math.max(anchor, 12))
    }

    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-cream pb-[clamp(110px,15vw,180px)] pt-[clamp(64px,8vw,96px)]"
    >
      <div ref={stageRef} className="fw-about-stage relative mx-auto w-full max-w-[1360px] px-6 md:px-10">
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
              ref={theRef}
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

        <div className="fw-polaroid-board relative mt-8 flex flex-col items-center gap-12 md:mt-6 md:h-[560px] md:gap-0">
          {/* Left — center of image under THE */}
          <div
            className="relative z-10 md:absolute md:top-0"
            style={{ left: leftAnchor, transform: 'translateX(-50%)' }}
          >
            <PolaroidCard
              variant="brand"
              image={`${IMG}/polaroid-01.jpg`}
              alt="Child on a wooden deck looking toward a lit A-frame cabin at night"
              rotate={9}
              delay={0.12}
            />
          </div>

          {/* Center — highest z, lower row, nothing on top */}
          <div className="relative z-30 md:absolute md:left-1/2 md:top-[22%] md:-translate-x-1/2">
            <PolaroidCard
              variant="review"
              image={`${IMG}/polaroid-02.jpg`}
              alt="Guest facing an A-frame cabin in the forest with arms raised"
              rotate={-6}
              delay={0.28}
              quote="I posted 2 photos from here, and already 150+ likes and a bunch of questions about where this paradise is"
              name="Den"
              avatar={`${IMG}/avatar-den.jpg`}
            />
          </div>

          {/* Right — flush right, lower z, no overlap on center */}
          <div className="relative z-10 md:absolute md:right-0 md:top-0">
            <PolaroidCard
              variant="review"
              image={`${IMG}/polaroid-03.jpg`}
              alt="Forest view from a wooden balcony with two chairs"
              rotate={8}
              delay={0.42}
              quote="I felt something similar in Bali... A complete union with nature..."
              name="Maria"
              avatar={`${IMG}/avatar-maria.jpg`}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
