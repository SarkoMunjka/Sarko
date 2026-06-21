import { useEffect, useState } from 'react'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { CaseStudies } from './components/CaseStudies'
import { Services } from './components/Services'
import { Process } from './components/Process'
import { Testimonials } from './components/Testimonials'
import { CallToAction } from './components/CallToAction'
import { Footer } from './components/Footer'
import GradualBlur from './components/GradualBlur'

function App() {
  const [pastHero, setPastHero] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setPastHero(window.scrollY > window.innerHeight * 0.6)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <main>
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
          animated
          duration="0.4s"
        />
      )}
    </main>
  )
}

export default App
