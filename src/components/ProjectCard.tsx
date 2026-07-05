import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { FadeIn } from './FadeIn'
import { DemoSitePreview } from './DemoSitePreview'
import { ScrollPreview } from './ScrollPreview'
import { VimeoHoverPreview } from './VimeoPreview'
import type { Project } from '../data/projects'
import { useLanguage } from '../hooks/useLanguage'

interface ProjectCardProps {
  project: Project
  index?: number
  /** Home section uses a shorter aspect ratio; projects page is taller. */
  variant?: 'home' | 'projects'
  showCaseStudyBadge?: boolean
}

export function ProjectCard({
  project,
  index = 0,
  variant = 'home',
  showCaseStudyBadge = variant === 'projects',
}: ProjectCardProps) {
  const { t } = useLanguage()
  const aspectClass =
    variant === 'home' ? 'aspect-[329/246]' : 'aspect-[16/11] sm:rounded-3xl'
  const roundedClass = variant === 'home' ? 'rounded-2xl' : 'rounded-2xl'

  const media = (
    <div
      className={`relative ${aspectClass} overflow-hidden ${roundedClass}`}
      style={{ backgroundColor: project.accent }}
    >
      {project.vimeoId ? (
        <VimeoHoverPreview videoId={project.vimeoId} posterSrc={project.poster} />
      ) : project.demoUrl ? (
        <DemoSitePreview src={project.demoUrl} alt={project.name} />
      ) : project.cover ? (
        <ScrollPreview src={project.cover} alt={project.name} />
      ) : (
        <div className="h-full w-full" style={{ backgroundColor: project.accent }} />
      )}

      {variant === 'home' && project.caseStudy && (
        <div className="absolute bottom-4 left-4 z-10 flex h-9 w-9 items-center overflow-hidden rounded-full bg-white transition-all duration-300 ease-in-out group-hover:w-[168px] dark:bg-gray-900">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center text-gray-900 dark:text-white">
            <ArrowRight
              size={14}
              className="-rotate-45 transition-transform duration-300 group-hover:rotate-0"
            />
          </span>
          <span className="whitespace-nowrap pr-3 text-[13px] font-medium text-gray-900 opacity-0 transition-opacity delay-100 duration-300 group-hover:opacity-100 dark:text-white">
            {t.projectCard.viewCaseStudy}
          </span>
        </div>
      )}

      {showCaseStudyBadge && project.caseStudy && (
        <span className="absolute right-4 top-4 z-10 flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-[12px] font-semibold text-gray-900 backdrop-blur-sm">
          {t.projectCard.caseStudy}
          <ArrowUpRight size={13} />
        </span>
      )}
    </div>
  )

  const text = (
    <>
      {variant === 'home' ? (
        <>
          <FadeIn
            as="p"
            className="mt-4 text-[13px] leading-relaxed text-gray-600 dark:text-gray-400 sm:text-[14px]"
          >
            {project.blurb}
          </FadeIn>
          <h3 className="mt-1 text-[14px] font-semibold text-gray-900 dark:text-white sm:text-[15px]">
            {project.name}
          </h3>
        </>
      ) : (
        <>
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
      )}
    </>
  )

  const content = (
    <>
      {media}
      {text}
    </>
  )

  if (!project.caseStudy) {
    return (
      <FadeIn delay={(index % 2) * 0.08}>
        <div className="group block cursor-default">{content}</div>
      </FadeIn>
    )
  }

  return (
    <FadeIn delay={(index % 2) * 0.08}>
      <Link
        to={`/projects/${project.slug}`}
        className="group block transition-opacity hover:opacity-95"
      >
        {content}
      </Link>
    </FadeIn>
  )
}
