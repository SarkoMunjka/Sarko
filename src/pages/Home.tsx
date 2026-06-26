import { useEffect, useRef, useState } from 'react'
import { Hero } from '../components/Hero'
import { About } from '../components/About'
import { CaseStudies } from '../components/CaseStudies'
import { Services } from '../components/Services'
import { Process } from '../components/Process'
import { Testimonials } from '../components/Testimonials'
import { CallToAction } from '../components/CallToAction'
import { Footer } from '../components/Footer'

const BOTTOM_FADE_THRESHOLD = 150
const SECTION_3_ID = 'work'

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
      const atBottom = docHeight - (scrollY + viewport) < BOTTOM_FADE_THRESHOLD

      fade.style.opacity = atBottom ? '0' : '1'
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
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[100] h-24 bg-gradient-to-t from-white via-white/75 to-transparent dark:from-[#0a0a0a] dark:via-[#0a0a0a]/75"
    />
  )
}

function useBottomFadeFromSection3() {
  const [active, setActive] = useState(false)

  useEffect(() => {
    const section = document.getElementById(SECTION_3_ID)
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const { isIntersecting, boundingClientRect } = entry
        setActive(isIntersecting || boundingClientRect.top < 0)
      },
      { threshold: 0 },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return active
}

export function Home() {
  const bottomFadeActive = useBottomFadeFromSection3()

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
      {bottomFadeActive ? <BottomPageFade /> : null}
    </>
  )
}
