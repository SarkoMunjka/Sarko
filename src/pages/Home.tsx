import { useEffect, useRef } from 'react'
import { Hero } from '../components/Hero'
import { About } from '../components/About'
import { CaseStudies } from '../components/CaseStudies'
import { Services } from '../components/Services'
import { Process } from '../components/Process'
import { Testimonials } from '../components/Testimonials'
import { CallToAction } from '../components/CallToAction'
import { Footer } from '../components/Footer'

const BOTTOM_FADE_THRESHOLD = 150
const PAST_HERO_RATIO = 0.6

function BottomPageFade() {
  const fadeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fade = fadeRef.current
    if (!fade) return

    let ticking = false

    const update = () => {
      const scrollY = window.scrollY
      const viewport = window.innerHeight
      const docHeight = document.documentElement.scrollHeight
      const pastHero = scrollY > viewport * PAST_HERO_RATIO
      const atBottom = docHeight - (scrollY + viewport) < BOTTOM_FADE_THRESHOLD

      fade.style.opacity = pastHero && !atBottom ? '1' : '0'
      ticking = false
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div
      ref={fadeRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[100] h-24 bg-gradient-to-t from-white via-white/75 to-transparent opacity-0 transition-opacity duration-300 dark:from-[#0a0a0a] dark:via-[#0a0a0a]/75"
    />
  )
}

export function Home() {
  return (
    <>
      <Hero />
      <About />
      <CaseStudies />
      <Services />
      <Process />
      <Testimonials />
      <CallToAction />
      <Footer />
      <BottomPageFade />
    </>
  )
}
