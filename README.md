# Axion Studio

A single-page landing site for the fictional design agency **Axion Studio**, built with React, Vite, TypeScript and Tailwind CSS. The hero uses an animated WebGL shader stack from the [`shaders`](https://www.npmjs.com/package/shaders) package and icons from [`lucide-react`](https://www.npmjs.com/package/lucide-react).

## Sections

1. **Hero** — Full-viewport hero on a light gray canvas with a layered shader background (`Swirl` + `ChromaFlow` + `FlutedGlass` + `FilmGrain`), a pill navbar with hover text-roll CTAs, a live London clock, and a slide-up mobile menu.
2. **About** — White section introducing the studio, with responsive desktop/mobile layouts and two showcase images.
3. **Case Studies** — Light gray section with two autoplaying video project cards and expanding hover buttons.

## Tech stack

- React 18 + TypeScript
- Vite 6
- Tailwind CSS 3.4 (default config)
- `shaders` (`shaders/react`) for the hero background
- `lucide-react` for icons

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # type-check + production build
npm run lint     # lint the project
npm run preview  # preview the production build
```

The dev server runs at http://localhost:5173 by default.
