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
  /** Show on the home page featured grid (default true). */
  showOnHome?: boolean
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
    slug: 'novaframe',
    name: 'NovaFrame',
    category: 'Wedding film · Web',
    year: '2025',
    blurb:
      'A cinematic portfolio and booking site for a Belgrade wedding film studio shooting love stories across Europe and the world.',
    accent: '#B79268',
    caseStudy: true,
    poster: '/nova-hero.png',
    vimeoId: '1204433136',
    showOnHome: false,
  },
  {
    slug: 'kosmaj-zomes',
    name: 'Kosmaj Zomes',
    category: 'Hospitality · Web',
    year: '2025',
    blurb:
      'A serene booking site for luxury geodesic domes on Kosmaj mountain — nature-first storytelling and a frictionless reservation flow.',
    accent: '#2F4F3E',
    caseStudy: true,
    cover: '/kosmaj-zomes-home.png',
  },
  {
    slug: 'deluks-padel',
    name: 'Deluks Padel',
    category: 'Sports · Web',
    year: '2025',
    blurb:
      'A bold, high-energy site for Obrenovac\'s premier padel center — driving court bookings and building a local sports community.',
    accent: '#1A1A1A',
    caseStudy: true,
    cover: '/deluks-padel-home.png',
  },
  {
    slug: 'mm-studio',
    name: 'MM Studio',
    category: 'Architecture · Web',
    year: '2025',
    blurb:
      'A refined portfolio for an architecture and interiors studio — letting residential and commercial work speak through immersive project storytelling.',
    accent: '#2A2A2A',
    caseStudy: true,
    cover: '/mm-studio-home.png',
  },
]

export const getProject = (slug: string): Project | undefined =>
  PROJECTS.find((p) => p.slug === slug)
