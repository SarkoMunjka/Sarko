import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import BlurText from '../components/BlurText'
import { FadeIn } from '../components/FadeIn'
import { ScrollPreview } from '../components/ScrollPreview'
import { NovaVisual } from '../components/NovaVisual'
import { VimeoHoverPreview } from '../components/VimeoPreview'
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
          {PROJECTS.map((project, index) => {
            const Card = (
              <>
                <div
                  className="relative aspect-[16/11] overflow-hidden rounded-2xl sm:rounded-3xl"
                  style={{ backgroundColor: project.accent }}
                >
                  {project.vimeoId ? (
                    <VimeoHoverPreview
                      videoId={project.vimeoId}
                      poster={<NovaVisual variant="cover" />}
                    />
                  ) : project.video ? (
                    <video
                      src={project.video}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="h-full w-full object-cover"
                    />
                  ) : project.cover ? (
                    <ScrollPreview src={project.cover} alt={project.name} />
                  ) : project.visual === 'nova' ? (
                    <NovaVisual variant="cover" />
                  ) : (
                    <div className="h-full w-full" style={{ backgroundColor: project.accent }} />
                  )}
                  {project.caseStudy && (
                    <span className="absolute right-4 top-4 z-10 flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-[12px] font-semibold text-gray-900 backdrop-blur-sm">
                      Case study
                      <ArrowUpRight size={13} />
                    </span>
                  )}
                </div>
                <div className="mt-4 flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-[18px] font-semibold text-gray-900 dark:text-white sm:text-[20px]">
                      {project.name}
                    </h2>
                    <p className="mt-1 max-w-md text-[13px] leading-relaxed text-gray-600 dark:text-gray-400 sm:text-[14px]">
                      {project.blurb}
                    </p>
                  </div>
                  <span className="shrink-0 text-[12px] font-medium text-gray-500 dark:text-gray-500 sm:text-[13px]">
                    {project.year}
                  </span>
                </div>
                <p className="mt-2 text-[12px] uppercase tracking-wide text-gray-500 dark:text-gray-500">
                  {project.category}
                </p>
              </>
            )

            return (
              <FadeIn key={project.slug} delay={(index % 2) * 0.08}>
                {project.caseStudy ? (
                  <Link
                    to={`/projects/${project.slug}`}
                    className="group block transition-opacity hover:opacity-95"
                  >
                    {Card}
                  </Link>
                ) : (
                  <div className="group block cursor-default">{Card}</div>
                )}
              </FadeIn>
            )
          })}
        </div>
      </section>

      <Footer />
    </div>
  )
}
