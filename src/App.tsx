import { Hero } from './components/Hero'
import { About } from './components/About'
import { CaseStudies } from './components/CaseStudies'
import { Services } from './components/Services'
import { Process } from './components/Process'
import { Testimonials } from './components/Testimonials'
import { CallToAction } from './components/CallToAction'
import { Footer } from './components/Footer'

function App() {
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
    </main>
  )
}

export default App
