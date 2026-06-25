import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import BlurText from '../components/BlurText'
import { FadeIn } from '../components/FadeIn'
import { ProjectCard } from '../components/ProjectCard'
import { PROJECTS } from '../data/projects'

export function Projects() {
  return (
    <div className="min-h-screen bg-[#EFEFEF] transition-colors duration-300 dark:bg-[#0a0a0a]">
      <Navbar />

      <header className="mx-auto w-full max-w-[1440px] px-5 pb-10 pt-10 sm:px-8 sm:pb-14 sm:pt-16 lg:px-12 lg:pt-20">
        <FadeIn
          as="p"
          y={10}
          className="mb-5 text-[13px] tracking-wide text-gray-600 dark:text-gray-400 sm:mb-7 sm:text-[14px]"
        >
          Selected work
        </FadeIn>
        <BlurText
          as="h1"
          animateBy="words"
          delay={60}
          text={'Projects we are proud\nto put our name on.'}
          className="font-medium leading-[1.08] tracking-[-0.03em] text-gray-900 dark:text-white text-[clamp(1.75rem,7vw,4.2rem)] sm:text-[clamp(2.5rem,5vw,4.2rem)]"
        />
        <FadeIn
          as="p"
          className="mt-6 max-w-xl text-[15px] leading-[1.6] text-gray-600 dark:text-gray-400 sm:text-[17px]"
        >
          A selection of brands we have helped define, design and ship — from
          identity systems to high-converting digital experiences.
        </FadeIn>
      </header>

      <section className="mx-auto w-full max-w-[1440px] px-5 pb-20 sm:px-8 sm:pb-24 lg:px-12 lg:pb-32">
        <div className="grid grid-cols-1 gap-6 sm:gap-7 md:grid-cols-2 lg:gap-8">
          {PROJECTS.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={index}
              variant="projects"
            />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
