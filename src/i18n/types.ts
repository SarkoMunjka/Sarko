import type { CaseStudyContent } from '../data/caseStudies'

export type Locale = 'en' | 'sr'

export const LOCALES: { code: Locale; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'sr', label: 'SR' },
]

export interface ProjectCopy {
  category: string
  blurb: string
}

export interface ServiceCopy {
  title: string
  description: string
}

export interface ProcessStepCopy {
  title: string
  description: string
}

export interface TestimonialCopy {
  text: string
  role: string
}

export interface Translations {
  meta: {
    title: string
  }
  a11y: {
    logoHome: string
    openMenu: string
    closeMenu: string
    menu: string
    close: string
    switchToLight: string
    switchToDark: string
    selectLanguage: string
  }
  nav: {
    projects: string
    studio: string
    journal: string
    connect: string
    status: string
    inLondon: string
    bookCall: string
    startProject: string
  }
  hero: {
    brand: string
    headline: string
    certifiedPartner: string
    featured: string
  }
  about: {
    badge: string
    headline: string
    body: string
    bodyLines: [string, string, string]
    cta: string
    imageWork: string
    imageProject: string
  }
  caseStudies: {
    badge: string
    headline: string
  }
  services: {
    badge: string
    headline: string
    items: ServiceCopy[]
  }
  process: {
    badge: string
    headline: string
    stepLabel: string
    steps: ProcessStepCopy[]
  }
  testimonials: {
    badge: string
    headline: string
    subcopy: string
    items: TestimonialCopy[]
  }
  cta: {
    eyebrow: string
    headline: string
    body: string
    stats: { value: string; label: string }[]
  }
  footer: {
    tagline: string
    copyright: string
    privacy: string
    terms: string
    columns: {
      studio: { heading: string; links: string[] }
      work: { heading: string; links: string[] }
      connect: { heading: string; links: string[] }
    }
  }
  projectsPage: {
    eyebrow: string
    headline: string
    body: string
  }
  projectCard: {
    viewCaseStudy: string
    caseStudy: string
  }
  caseStudyPage: {
    allProjects: string
    visitLiveSite: string
    overview: string
    challenge: string
    approach: string
    whatWeDid: string
    theWork: string
    galleryHeading: string
    siteWalkthrough: string
    brandSystem: string
    startProject: string
    homepageAlt: string
  }
  projects: Record<string, ProjectCopy>
}

export type CaseStudyResolver = (slug: string) => CaseStudyContent | undefined
