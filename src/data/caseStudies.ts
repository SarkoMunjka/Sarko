export interface CaseStudyContent {
  slug: string
  name: string
  accent: string
  tagline: string
  intro: string
  liveUrl?: string
  meta: { label: string; value: string }[]
  overview: { heading: string; paragraphs: string[] }
  challenge: { heading: string; body: string }
  approach: { no: string; title: string; body: string }[]
  gallery: { src: string; label: string; alt: string; fullPage?: boolean }[]
  gallerySiteUrl?: string
  galleryVimeoId?: string
  palette: { name: string; hex: string }[]
  paletteHeading: string
  results?: {
    sectionLabel: string
    heading: string
    items: { value: string; label: string }[]
    quote?: { text: string; attribution: string; serif?: boolean }
  }
  coverImage: string
  /** Show the full-page screenshot on the cover (no crop). */
  coverFullPage?: boolean
  /** NovaFrame only — autoplay Vimeo over the cover hero image. */
  coverVimeoId?: string
  ctaHeading: string
  ctaSubtext: string
}

export const CASE_STUDIES: CaseStudyContent[] = [
  {
    slug: 'socks-co',
    name: 'Socks & Co.',
    accent: '#9181D6',
    tagline: 'E-commerce · Branding · 2024',
    intro:
      'We helped a direct-to-consumer sock brand find its voice — building a playful identity and a high-converting storefront that turned everyday basics into a brand people brag about.',
    meta: [
      { label: 'Role', value: 'Identity · Web · Build' },
      { label: 'Timeline', value: '2024 · 8 weeks' },
      { label: 'Services', value: 'Strategy, Design, Dev' },
      { label: 'Platform', value: 'Headless e-commerce' },
    ],
    overview: {
      heading: 'Everyday socks,\nbrought to life.',
      paragraphs: [
        'Socks & Co. had a great product and zero brand recognition. Their old site looked like every other Shopify template — and conversion suffered.',
        'We rebuilt from the ground up: a distinctive identity, a storefront engineered to convert, and a limited Nike collaboration drop that turned a product launch into an event.',
      ],
    },
    challenge: {
      heading: 'Turn a commodity into a brand\npeople actually talk about.',
      body: 'The old site buried the product in generic templates, the checkout leaked sales, and the brand had no personality to rally a community around. Our job was to fix all three at once.',
    },
    approach: [
      {
        no: '01',
        title: 'An identity with personality',
        body: 'A hand-drawn wordmark, a punchy primary palette and expressive display type that lets the brand feel as fun as the product itself.',
      },
      {
        no: '02',
        title: 'A storefront built to convert',
        body: 'Clear product hierarchy, a sticky cart, free-shipping nudges and social proof — every screen engineered to move shoppers toward checkout.',
      },
      {
        no: '03',
        title: 'The Nike collaboration drop',
        body: 'A limited-edition landing experience with a live countdown and dedicated collaboration store to turn the launch into an event.',
      },
      {
        no: '04',
        title: 'Friction-free checkout',
        body: 'A three-step delivery → shipping → payment flow with guest checkout and a persistent order summary that keeps cart abandonment low.',
      },
    ],
    gallery: [
      { src: '/socks-home.png', label: 'Homepage', alt: 'Socks & Co. homepage', fullPage: true },
      { src: '/socks-collab.png', label: 'Limited edition · Nike collaboration', alt: 'Socks & Co. x Nike collaboration store', fullPage: true },
      { src: '/socks-cart.png', label: 'Cart & checkout', alt: 'Socks & Co. cart and checkout', fullPage: true },
    ],
    gallerySiteUrl: 'socksandco.com',
    palette: [
      { name: 'Grape', hex: '#9181D6' },
      { name: 'Sunshine', hex: '#FFD23F' },
      { name: 'Blossom', hex: '#F4B7C7' },
      { name: 'Sky', hex: '#BFD9F2' },
      { name: 'Cream', hex: '#FBF4E6' },
      { name: 'Ink', hex: '#1B1B1F' },
    ],
    paletteHeading: 'A palette with personality',
    results: {
      sectionLabel: 'The results',
      heading: 'Numbers the team\nwas proud to share.',
      items: [
        { value: '+38%', label: 'Conversion rate' },
        { value: '2.1×', label: 'Average order value' },
        { value: '-45%', label: 'Bounce rate' },
        { value: '4.9/5', label: 'Customer rating' },
      ],
      quote: {
        text: 'Axion gave us a brand we are genuinely excited to show off — and the numbers followed. Best decision we made this year.',
        attribution: 'Founder, Socks & Co.',
      },
    },
    coverImage: '/socks-home.png',
    coverFullPage: true,
    ctaHeading: 'Have a brand worth bragging about?',
    ctaSubtext: "Let's build the experience that gets you there.",
  },
  {
    slug: 'novaframe',
    name: 'NovaFrame',
    accent: '#B79268',
    tagline: 'Wedding film · Web · 2025',
    intro:
      'NovaFrame FVS is the vision of Dušan Jovanović — a Belgrade wedding film studio capturing love stories across Europe and the world. We built a portfolio site as cinematic and timeless as their films.',
    liveUrl: 'https://novaframefvs.com/',
    meta: [
      { label: 'Role', value: 'Web design · Build' },
      { label: 'Client', value: 'NovaFrame FVS' },
      { label: 'Services', value: 'Art direction, Web, Motion' },
      { label: 'Based', value: 'Belgrade, Serbia' },
    ],
    overview: {
      heading: 'A site as cinematic\nas the films.',
      paragraphs: [
        'NovaFrame shoots in a documentary style with a cinematic touch — real, genuine moments, beautifully framed. Their old presence didn\'t do the work justice, and couples needed a clearer path to booking.',
        'We crafted a dark, filmic interface that puts the films first, tells each couple\'s story, and guides visitors toward a quote — all while feeling effortless and timeless.',
      ],
    },
    challenge: {
      heading: 'Make the films the hero —\nand turn viewers into couples.',
      body: 'Wedding films are emotional and immersive, but a website can flatten them. The site had to preserve that cinematic feeling, build instant trust, and make booking effortless for couples planning months ahead.',
    },
    approach: [
      {
        no: '01',
        title: 'Cinematic art direction',
        body: 'Full-bleed film, restrained type and a warm, filmic palette — a site that feels as cinematic as the work it showcases.',
      },
      {
        no: '02',
        title: 'A story-first portfolio',
        body: 'Each couple gets their own chapter, letting real love stories lead the experience.',
      },
      {
        no: '03',
        title: 'A frictionless quote flow',
        body: 'A clear "Get a quote" path turns inspired visitors into booked couples, with packages and process explained up front.',
      },
      {
        no: '04',
        title: 'Answers that build trust',
        body: 'A thoughtful FAQ covers style, delivery times and travel — removing doubt before couples ever reach out.',
      },
    ],
    gallery: [
      { src: '/nova-hero.png', label: 'Homepage', alt: 'NovaFrame homepage hero' },
      {
        src: '/nova-couples.jpg',
        label: 'Couples portfolio',
        alt: 'NovaFrame couples portfolio',
      },
    ],
    gallerySiteUrl: 'novaframefvs.com',
    galleryVimeoId: '1204433136',
    palette: [
      { name: 'Ink', hex: '#15110D' },
      { name: 'Charcoal', hex: '#221C16' },
      { name: 'Gold', hex: '#B79268' },
      { name: 'Taupe', hex: '#8C7F6E' },
      { name: 'Cream', hex: '#EFE7DA' },
    ],
    paletteHeading: 'A warm, filmic palette',
    results: {
      sectionLabel: 'By the numbers',
      heading: 'What couples can\nexpect.',
      items: [
        { value: '4–6 min', label: 'Cinematic highlight film' },
        { value: '40–90 min', label: 'Documentary film' },
        { value: '2,000', label: 'Edited photos (up to)' },
        { value: '8–10 wks', label: 'Film delivery' },
      ],
      quote: {
        text: 'Every story, every emotion, captured cinematically.',
        attribution: 'NovaFrame FVS',
        serif: true,
      },
    },
    coverImage: '/nova-hero.png',
    coverVimeoId: '1204433136',
    ctaHeading: 'Have a story worth telling?',
    ctaSubtext: "Let's build the experience that brings it to life.",
  },
  {
    slug: 'kosmaj-zomes',
    name: 'Kosmaj Zomes',
    accent: '#2F4F3E',
    tagline: 'Hospitality · Web · 2025',
    intro:
      'Kosmaj Zomes offers luxury geodesic domes on Kosmaj mountain — a perfect escape in the heart of nature. We designed a site as serene and inviting as the stay itself.',
    meta: [
      { label: 'Role', value: 'Web design · Build' },
      { label: 'Client', value: 'Kosmaj Zomes' },
      { label: 'Services', value: 'Design, Development' },
      { label: 'Location', value: 'Kosmaj, Serbia' },
    ],
    overview: {
      heading: 'Nature-first\nhospitality.',
      paragraphs: [
        'Geodesic domes on a mountain deserve a digital experience that feels just as special — warm, calm and unmistakably premium.',
        'We built a site that leads with photography, surfaces Airbnb social proof, and makes checking availability feel effortless.',
      ],
    },
    challenge: {
      heading: 'Sell the feeling of escape\nbefore guests ever arrive.',
      body: 'Travelers book with their eyes first. The site had to communicate luxury, nature and comfort in seconds — then guide guests smoothly from inspiration to reservation.',
    },
    approach: [
      {
        no: '01',
        title: 'An earthy, elegant palette',
        body: 'Deep forest greens, warm peach accents and cream typography create a calm, premium atmosphere that mirrors the domes themselves.',
      },
      {
        no: '02',
        title: 'Gallery-led storytelling',
        body: 'A rich photo gallery and amenity highlights let guests explore the experience — hot tub, mountain views, kitchen and more — before they book.',
      },
      {
        no: '03',
        title: 'Trust through reviews',
        body: 'Airbnb ratings and guest testimonials are woven throughout the page to build confidence at every scroll.',
      },
      {
        no: '04',
        title: 'Booking made simple',
        body: 'An inline availability form with clear date and guest fields turns browsing into a reservation in just a few taps.',
      },
    ],
    gallery: [
      {
        src: '/kosmaj-zomes-home.png',
        label: 'Full site experience',
        alt: 'Kosmaj Zomes website',
      },
    ],
    gallerySiteUrl: 'kosmajzomes.rs',
    palette: [
      { name: 'Forest', hex: '#2F4F3E' },
      { name: 'Moss', hex: '#3D5C4A' },
      { name: 'Peach', hex: '#E8A87C' },
      { name: 'Cream', hex: '#F5F0E8' },
      { name: 'Sage', hex: '#8BA888' },
    ],
    paletteHeading: 'An earthy, inviting palette',
    results: {
      sectionLabel: 'Highlights',
      heading: 'What guests\nlove most.',
      items: [
        { value: '5★', label: 'Airbnb rating' },
        { value: '6', label: 'Premium amenities' },
        { value: '24/7', label: 'Nature access' },
        { value: '1-click', label: 'Availability check' },
      ],
      quote: {
        text: 'There\'s no place like Kosmaj Zomes — the site finally captures that feeling.',
        attribution: 'Kosmaj Zomes',
      },
    },
    coverImage: '/kosmaj-zomes-home.png',
    ctaHeading: 'Ready to welcome more guests?',
    ctaSubtext: "Let's craft the experience that fills your calendar.",
  },
  {
    slug: 'deluks-padel',
    name: 'Deluks Padel',
    accent: '#B8F55A',
    tagline: 'Sports · Web · 2025',
    intro:
      'Deluks Padel Centar is Obrenovac\'s home for padel — professional courts, night lighting and a growing community of players. We built a site with the same energy as the sport.',
    meta: [
      { label: 'Role', value: 'Web design · Build' },
      { label: 'Client', value: 'Deluks Padel Centar' },
      { label: 'Services', value: 'Design, Development' },
      { label: 'Location', value: 'Obrenovac, Serbia' },
    ],
    overview: {
      heading: 'Sport meets\nnight energy.',
      paragraphs: [
        'Padel is fast, social and addictive — the website needed to feel the same. Dark backgrounds, neon accents and bold photography set the tone from the first scroll.',
        'We structured the experience around court bookings, community proof and the story behind the center — turning casual visitors into regular players.',
      ],
    },
    challenge: {
      heading: 'Fill courts and build\na local sports community.',
      body: 'A new sports facility needs more than a schedule — it needs atmosphere, credibility and a dead-simple path to booking a court. Every section had to drive action.',
    },
    approach: [
      {
        no: '01',
        title: 'High-contrast art direction',
        body: 'A dark canvas with neon green accents mirrors the courts at night — energetic, modern and impossible to ignore.',
      },
      {
        no: '02',
        title: 'Social proof up front',
        body: 'Player counts, hours played and star ratings build instant trust before visitors ever reach the booking flow.',
      },
      {
        no: '03',
        title: 'Story and location',
        body: 'A masonry gallery and embedded map connect the sport to the place — Obrenovac as an oasis for recreation.',
      },
      {
        no: '04',
        title: 'Reservation-first UX',
        body: 'A persistent "Rezervišite" CTA and clear feature grid guide players straight to booking a court.',
      },
    ],
    gallery: [
      {
        src: '/deluks-padel-home.png',
        label: 'Homepage & key sections',
        alt: 'Deluks Padel Centar website',
      },
    ],
    gallerySiteUrl: 'delukspadel.rs',
    palette: [
      { name: 'Black', hex: '#0A0A0A' },
      { name: 'Carbon', hex: '#1A1A1A' },
      { name: 'Neon', hex: '#B8F55A' },
      { name: 'Court', hex: '#1E4D8C' },
      { name: 'White', hex: '#F5F5F5' },
    ],
    paletteHeading: 'A bold, athletic palette',
    results: {
      sectionLabel: 'By the numbers',
      heading: 'A growing\ncommunity.',
      items: [
        { value: '200+', label: 'Active players' },
        { value: '300+', label: 'Hours played' },
        { value: '4.9★', label: 'Average rating' },
        { value: '100%', label: 'Satisfaction' },
      ],
      quote: {
        text: 'Doživite padel u Obrenovcu — the site brings that promise to life.',
        attribution: 'Deluks Padel Centar',
      },
    },
    coverImage: '/deluks-padel-home.png',
    ctaHeading: 'Building a sports brand?',
    ctaSubtext: "Let's create the digital home your community deserves.",
  },
  {
    slug: 'mm-studio',
    name: 'MM Studio',
    accent: '#C4A574',
    tagline: 'Architecture · Web · 2025',
    intro:
      'MM Studio is a Belgrade architecture and interiors practice shaping residential and commercial spaces across Serbia. We built a portfolio site as refined and confident as their work.',
    meta: [
      { label: 'Role', value: 'Web design · Build' },
      { label: 'Client', value: 'MM Studio' },
      { label: 'Services', value: 'Art direction, Web' },
      { label: 'Based', value: 'Belgrade, Serbia' },
    ],
    overview: {
      heading: 'Architecture that\nspeaks for itself.',
      paragraphs: [
        'Great architecture needs space to breathe. We designed a dark, minimal interface that lets project photography and case details do the talking.',
        'From featured residences to commercial builds, every project gets room to shine — with clear paths to explore the full portfolio and get in touch.',
      ],
    },
    challenge: {
      heading: 'Showcase complex work\nwithout overwhelming visitors.',
      body: 'Architecture portfolios walk a fine line — too little detail and projects feel generic; too much and the experience becomes cluttered. The site had to feel curated and effortless.',
    },
    approach: [
      {
        no: '01',
        title: 'Dark, gallery-first layout',
        body: 'A near-black canvas and generous whitespace let high-resolution project imagery command attention.',
      },
      {
        no: '02',
        title: 'Project storytelling',
        body: 'Featured case studies — J House, Queens Residence and more — pair hero imagery with location, scope and year at a glance.',
      },
      {
        no: '03',
        title: 'A masonry portfolio grid',
        body: 'An irregular project grid mirrors the variety of work across architecture, interiors and exteriors.',
      },
      {
        no: '04',
        title: 'Effortless contact',
        body: 'A clean inquiry form and scrolling marquee keep the studio approachable without breaking the refined tone.',
      },
    ],
    gallery: [
      {
        src: '/mm-studio-home.png',
        label: 'Full site experience',
        alt: 'MM Studio website',
      },
    ],
    gallerySiteUrl: 'mmstudio.rs',
    palette: [
      { name: 'Ink', hex: '#0D0D0D' },
      { name: 'Charcoal', hex: '#2A2A2A' },
      { name: 'Stone', hex: '#6B6B6B' },
      { name: 'Gold', hex: '#C4A574' },
      { name: 'White', hex: '#F0F0F0' },
    ],
    paletteHeading: 'A refined, monochromatic palette',
    results: {
      sectionLabel: 'Scope',
      heading: 'What the studio\ndelivers.',
      items: [
        { value: '450m²', label: 'Largest residence' },
        { value: '3', label: 'Disciplines' },
        { value: '12+', label: 'Featured projects' },
        { value: '2022+', label: 'Active since' },
      ],
      quote: {
        text: 'Arhitektura i enterijeri — captured with the restraint the work deserves.',
        attribution: 'MM Studio',
        serif: true,
      },
    },
    coverImage: '/mm-studio-home.png',
    ctaHeading: 'Have work worth showcasing?',
    ctaSubtext: "Let's build the portfolio that wins your next client.",
  },
]

export const getCaseStudy = (slug: string): CaseStudyContent | undefined =>
  CASE_STUDIES.find((c) => c.slug === slug)
