export interface Project {
  slug: string
  name: string
  category: string
  year: string
  blurb: string
  /** Brand accent color used in cards/placeholders. */
  accent: string
  /** Whether a full case-study page exists at /projects/[slug]. */
  caseStudy: boolean
  /** Optional looping video used as the card media. */
  video?: string
  /** Optional cover image (path under /public) used as the card media. */
  cover?: string
  /** Static poster image shown before Vimeo hover playback. */
  poster?: string
  /** Vimeo video ID for hover preview / case-study hero. */
  vimeoId?: string
  /** Live demo URL embedded in project cards (shows real site chrome + hero). */
  demoUrl?: string
}

export const PROJECTS: Project[] = [
  {
    slug: 'socks-co',
    name: 'Socks & Co.',
    category: 'E-commerce · Branding',
    year: '2024',
    blurb:
      'A bold, playful e-commerce experience for a direct-to-consumer sock brand — from identity to a high-converting storefront and a Nike collaboration drop.',
    accent: '#9181D6',
    caseStudy: true,
    cover: '/socks-home.png',
  },
  {
    slug: 'fade-co',
    name: 'Fade & Co.',
    category: 'Barbershop · Web',
    year: '2026',
    blurb:
      'A premium Surrey barbershop — scroll-scrub hero, service menu and booking flow built to feel as sharp as the cuts.',
    accent: '#C8923E',
    caseStudy: true,
    cover: '/work-demos/fade-co/hero-poster.jpg',
  },
  {
    slug: 'moonstay',
    name: 'Moonstay',
    category: 'Hospitality · Web',
    year: '2026',
    blurb:
      'Kurirani boravci za odmor — vile, kuće i vikendice sa scroll-scrub heroom i premium iskustvom rezervacije.',
    accent: '#4A5D52',
    caseStudy: true,
    demoUrl: '/work-demos/moonstay/?embed=1',
    cover: '/work-demos/moonstay/hero-poster.jpg',
  },
  {
    slug: 'novaframe',
    name: 'NovaFrame',
    category: 'Wedding film · Web',
    year: '2025',
    blurb:
      'A cinematic portfolio and booking site for a Belgrade wedding film studio shooting love stories across Europe and the world.',
    accent: '#B79268',
    caseStudy: true,
    poster: '/nova-home.jpg',
    vimeoId: '1204433136',
  },
  {
    slug: 'narrativ',
    name: 'Narrativ',
    category: 'Interactive · 3D',
    year: '2025',
    blurb:
      'Winner of Site of the Month 2025 — an interactive 3D showcase driving record engagement.',
    accent: '#1a1d2e',
    caseStudy: false,
    video:
      'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260516_122702_390f5305-8719-41d5-ae80-d23ab3796c28.mp4',
  },
  {
    slug: 'luminar',
    name: 'Luminar',
    category: 'Web · Rebrand',
    year: '2025',
    blurb:
      'Transforming a dated platform into a conversion-focused brand experience.',
    accent: '#6b6b6b',
    caseStudy: false,
    video:
      'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260516_123323_f909c2b8-ff6c-4edf-882b-8ebcdbe389b5.mp4',
  },
]

export const getProject = (slug: string): Project | undefined =>
  PROJECTS.find((p) => p.slug === slug)
