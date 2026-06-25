import { useEffect, useMemo, useState } from 'react'
import { Hero } from '../components/Hero'
import { About } from '../components/About'
import { CaseStudies } from '../components/CaseStudies'
import { Services } from '../components/Services'
import { Process } from '../components/Process'
import { Testimonials } from '../components/Testimonials'
import { CallToAction } from '../components/CallToAction'
import { Footer } from '../components/Footer'
import GradualBlur from '../components/GradualBlur'

const BOTTOM_FADE_THRESHOLD = 150

export function Home() {
  const [pastHero, setPastHero] = useState(false)
  const [atBottom, setAtBottom] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY
      const viewport = window.innerHeight
      const docHeight = document.documentElement.scrollHeight

      setPastHero(scrollY > viewport * 0.6)

      const distanceFromBottom = docHeight - (scrollY + viewport)
      setAtBottom(distanceFromBottom < BOTTOM_FADE_THRESHOLD)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const blurStyle = useMemo(
    () => ({ opacity: atBottom ? 0 : 1, transition: 'opacity 0.35s ease' }),
    [atBottom],
  )

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

      {pastHero && (
        <GradualBlur
          target="page"
          position="bottom"
          height="6rem"
          strength={2}
          divCount={5}
          curve="bezier"
          exponential
          opacity={1}
          style={blurStyle}
        />
      )}
    </>
  )
}
