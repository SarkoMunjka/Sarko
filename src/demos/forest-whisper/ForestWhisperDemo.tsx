import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { TornPaperDivider } from './TornPaperDivider'
import { TORN_CARD_CLIP } from './tornPaper'
import './forest-whisper.css'

const HERO_IMG = '/work-demos/forest-whisper/img/hero-bg.png'

/** Matches nav logo horizontal padding — card inner content aligns here */
const PAD_X = 'px-6 md:px-10 lg:px-14'

const NAV_LINKS = [
  { href: '#about', label: 'about us' },
  { href: '#houses', label: 'houses' },
  { href: '#services', label: 'additional services' },
  { href: '#gallery', label: 'gallery' },
  { href: '#reviews', label: 'reviews' },
]

const EASE = [0.22, 0.61, 0.36, 1] as const

function LeafIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden>
      <path d="M24 4C14 14 8 24 10 36c8-2 14-8 18-16 2 10 8 18 16 22-4-14-12-26-20-38z" strokeLinejoin="round" />
      <path d="M24 20v20" strokeLinecap="round" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function TelegramIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  )
}

export function ForestWhisperDemo() {
  const reduce = useReducedMotion()
  const [menuOpen, setMenuOpen] = useState(false)
  const embed = typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('embed')

  useEffect(() => {
    document.title = 'Forest Whisper — Tree Houses & Forest Retreats'
    document.documentElement.classList.add('forest-whisper-demo')
    if (embed) document.documentElement.classList.add('forest-whisper-embed')

    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href =
      'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Pinyon+Script&display=swap'
    document.head.appendChild(link)

    return () => {
      document.documentElement.classList.remove('forest-whisper-demo', 'forest-whisper-embed')
      document.head.removeChild(link)
    }
  }, [embed])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const fadeUp = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 1.1, delay, ease: EASE },
        }

  const headlineClass =
    'fw-headline font-serif font-light uppercase text-cream leading-[0.86] tracking-[0.055em] [text-shadow:0_2px_28px_rgba(0,0,0,0.38)]'

  return (
    <div className="bg-cream font-sans text-ink antialiased">
      <header className="relative min-h-[100svh] overflow-hidden bg-forest-deep text-cream">
        {/* Cinematic forest + cabin (right ~45%) */}
        <motion.div
          className="fw-hero-bg absolute inset-0 bg-cover bg-no-repeat"
          style={{ backgroundImage: `url(${HERO_IMG})`, backgroundPosition: '72% 55%' }}
          initial={reduce ? false : { scale: 1.07 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease: EASE }}
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#0d1b12]/94 via-[#0d1b12]/80 to-[#0d1b12]/30"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#0d1b12]/60 via-transparent to-[#0d1b12]/45"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_8%_95%,rgba(18,32,14,0.85)_0%,transparent_52%),radial-gradient(90%_70%_at_92%_88%,rgba(14,26,12,0.7)_0%,transparent_48%)]"
          aria-hidden
        />

        {/* Transparent nav — 32px top */}
        <motion.nav
          {...fadeUp(0.08)}
          className={`absolute inset-x-0 top-0 z-30 grid grid-cols-[1fr_auto_1fr] items-center gap-4 pt-8 ${PAD_X}`}
        >
          <a href="#" className="inline-flex items-baseline gap-1.5 text-cream no-underline">
            <span className="font-script text-[clamp(2rem,3.5vw,2.75rem)] leading-none">Forest</span>
            <span className="text-[10px] uppercase tracking-[0.34em] md:text-[11px]">Whisper</span>
          </a>

          <ul className="hidden items-center lg:flex">
            {NAV_LINKS.map((item, i) => (
              <li key={item.href} className="flex items-center">
                {i > 0 && <span className="mx-3.5 h-1 w-1 rounded-full bg-cream/50" />}
                <a
                  href={item.href}
                  className="text-[12.5px] lowercase tracking-wide text-cream/90 transition-opacity duration-300 hover:opacity-70"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-end gap-4">
            <a href="tel:+445553454665" className="hidden text-[12.5px] text-cream/90 md:block">
              +44 555 345 46 65
            </a>
            <div className="hidden items-center gap-2.5 sm:flex">
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/50 text-cream transition-all duration-300 hover:border-cream hover:bg-cream/10"
              >
                <InstagramIcon />
              </a>
              <a
                href="#"
                aria-label="Telegram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/50 text-cream transition-all duration-300 hover:border-cream hover:bg-cream/10"
              >
                <TelegramIcon />
              </a>
            </div>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/45 text-cream lg:hidden"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </motion.nav>

        {/* Hero — ~65px below header, type stays left of cabin */}
        <div className="fw-hero-content relative z-10 flex min-h-[100svh] flex-col pb-[clamp(100px,12vh,130px)]">
          <motion.div {...fadeUp(0.28)} className="w-full">
            <h1
              className="fw-hero-grid grid w-full min-w-0 items-start gap-x-[clamp(12px,2vw,28px)]"
              style={{
                gridTemplateColumns: 'minmax(220px, clamp(220px, 26vw, 300px)) minmax(0, 1fr)',
                gridTemplateRows: 'auto auto auto auto auto',
              }}
            >
              <span className={`fw-full-line ${headlineClass} col-span-2 ${PAD_X}`}>Try a new</span>
              <span className={`fw-full-line ${headlineClass} col-span-2 ${PAD_X}`}>level of</span>

              {/* Card flush left; relaxation + in tree houses stacked right */}
              <motion.aside
                initial={reduce ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: EASE }}
                className="fw-card relative self-stretch bg-[rgba(72,88,68,0.82)] py-8 shadow-[0_18px_48px_rgba(0,0,0,0.32)] backdrop-blur-[4px]"
                style={{ gridColumn: '1', gridRow: '3 / 6', clipPath: TORN_CARD_CLIP }}
              >
                <div className={`text-cream/90 ${PAD_X}`}>
                  <LeafIcon />
                  <p className="mt-5 max-w-[200px] text-[14px] leading-[1.55] text-cream/88">
                    Where comfort meets the magic of nature
                  </p>
                  <a
                    href="#houses"
                    className="mt-6 inline-flex items-center justify-center rounded-full bg-gradient-to-b from-[#ebe2d0] via-[#d4c4a8] to-[#b8a078] px-7 py-3.5 font-serif text-[11px] font-medium uppercase tracking-[0.2em] text-ink shadow-[0_8px_24px_rgba(0,0,0,0.22)] transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(169,120,66,0.4)]"
                  >
                    Book now
                  </a>
                </div>
              </motion.aside>

              <span
                className={`fw-beside ${headlineClass}`}
                style={{ gridColumn: '2', gridRow: '3' }}
              >
                relaxation
              </span>

              <span
                className={`fw-beside ${headlineClass}`}
                style={{ gridColumn: '2', gridRow: '4' }}
              >
                in tree
              </span>

              <span
                className={`fw-beside ${headlineClass}`}
                style={{ gridColumn: '2', gridRow: '5' }}
              >
                houses
              </span>
            </h1>
          </motion.div>
        </div>

        {!embed && <TornPaperDivider />}
      </header>

      {!embed && <section id="about" className="min-h-[40vh] bg-cream" aria-hidden />}

      {menuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-7 bg-[#0d1b12]/97 backdrop-blur-md lg:hidden">
          <button
            type="button"
            className="absolute right-6 top-8 flex h-10 w-10 items-center justify-center rounded-full border border-cream/40 text-cream"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-lg lowercase tracking-wide text-cream"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a href="tel:+445553454665" className="text-cream/80">
            +44 555 345 46 65
          </a>
        </div>
      )}
    </div>
  )
}
