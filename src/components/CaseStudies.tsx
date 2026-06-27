import BlurText from './BlurText'
import { ProjectCard } from './ProjectCard'
import { getProjects } from '../data/projects'
import { useLanguage } from '../hooks/useLanguage'

export function CaseStudies() {
  const { locale, t } = useLanguage()
  const projects = getProjects(locale)

  return (
    <section
      id="work"
      className="section-tone-muted-up relative pb-16 pt-16 transition-colors duration-300 sm:pb-20 sm:pt-20 lg:pb-28 lg:pt-28"
    >
      <div className="mx-auto w-full max-w-[1440px]">
        <div className="mb-6 flex items-center gap-3 px-5 sm:mb-8 sm:px-8 lg:px-12">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-900 text-[11px] font-semibold text-white dark:bg-white dark:text-gray-900 sm:h-7 sm:w-7 sm:text-[12px]">
            2
          </div>
          <span className="rounded-full border border-gray-300 px-3 py-1 text-[12px] font-medium text-gray-900 dark:border-white/15 dark:text-gray-200 sm:px-4 sm:py-1.5 sm:text-[13px]">
            {t.caseStudies.badge}
          </span>
        </div>

        <BlurText
          as="h2"
          animateBy="words"
          delay={80}
          text={t.caseStudies.headline}
          className="mb-10 px-5 font-medium leading-[1.08] tracking-[-0.03em] text-gray-900 dark:text-white text-[clamp(1.75rem,7vw,4.2rem)] sm:mb-14 sm:px-8 sm:text-[clamp(2.5rem,5vw,4.2rem)] lg:mb-16 lg:px-12"
        />

        <div className="grid grid-cols-1 gap-5 px-5 sm:gap-6 sm:px-8 md:grid-cols-2 lg:gap-7 lg:px-12">
          {projects
            .filter((p) => p.showOnHome !== false)
            .map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} variant="home" />
            ))}
        </div>
      </div>
    </section>
  )
}
