import { useEffect, useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import {
  Shader,
  Swirl,
  ChromaFlow,
  FlutedGlass,
  FilmGrain,
} from 'shaders/react'
import { Navbar } from './Navbar'
import { TextRoll } from './TextRoll'
import { PartnerIcon } from './PartnerIcon'
import BlurText from './BlurText'
import { FadeIn } from './FadeIn'
import { useTheme } from '../hooks/useTheme'

const SHADER_COLORS = {
  light: { colorA: '#ffffff', colorB: '#f0f0f0', base: '#ffffff' },
  dark: { colorA: '#1a1a1a', colorB: '#0d0d0d', base: '#0a0a0a' },
}

export function Hero() {
  const { theme } = useTheme()
  const shader = SHADER_COLORS[theme]
  const heroRef = useRef<HTMLElement>(null)
  const [shaderActive, setShaderActive] = useState(true)

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    const observer = new IntersectionObserver(
      ([entry]) => setShaderActive(entry.isIntersecting),
      { threshold: 0 },
    )

    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-screen flex-col bg-[#EFEFEF] transition-colors duration-300 dark:bg-[#0a0a0a]"
    >
      {/* Animated shader background — paused when hero leaves the viewport */}
      {shaderActive && (
        <div className="pointer-events-none absolute inset-0 z-10">
          <Shader key={theme} className="h-full w-full" style={{ width: '100%', height: '100%' }}>
          <Swirl colorA={shader.colorA} colorB={shader.colorB} detail={1.7} />
          <ChromaFlow
            baseColor={shader.base}
            downColor="#ff5f03"
            leftColor="#ff5f03"
            rightColor="#ff5f03"
            upColor="#ff5f03"
            momentum={13}
            radius={3.5}
          />
          <FlutedGlass
            aberration={0.61}
            angle={31}
            frequency={8}
            highlight={0.12}
            highlightSoftness={0}
            lightAngle={-90}
            refraction={4}
            shape="rounded"
            softness={1}
            speed={0.15}
          />
          <FilmGrain strength={0.05} />
        </Shader>
        </div>
      )}

      <Navbar />

      {/* Hero content pinned to bottom */}
      <div className="relative z-20 flex flex-1 flex-col">
        <div className="flex-1" />
        <div className="mx-auto w-full max-w-[1440px] px-5 pb-14 sm:px-8 sm:pb-16 lg:px-12 lg:pb-20">
          <FadeIn
            as="p"
            y={10}
            className="mb-5 text-[13px] tracking-wide text-gray-900 dark:text-gray-100 sm:mb-8 sm:text-[14px]"
          >
            Axion Studio
          </FadeIn>
          <BlurText
            as="h1"
            responsiveBreak
            animateBy="words"
            direction="top"
            delay={60}
            text={'We craft digital experiences\nfor brands ready to dominate\ntheir category online.'}
            className="font-medium leading-[1.08] tracking-[-0.03em] text-gray-900 dark:text-white text-[clamp(1.75rem,7vw,4.2rem)] sm:text-[clamp(2.5rem,5vw,4.2rem)]"
          />

          <div className="mt-8 flex flex-col gap-4 sm:mt-12 sm:flex-row sm:gap-5">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 self-start rounded-full bg-[#F26522] py-2 pl-5 pr-2 text-[13px] font-medium text-white transition-colors hover:bg-[#e05a1a] sm:pl-6 sm:text-[14px]"
            >
              <TextRoll>Start a project</TextRoll>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45 sm:h-8 sm:w-8">
                <ArrowRight size={16} className="text-[#F26522]" />
              </span>
            </a>

            <div className="group inline-flex items-center gap-2.5 self-start rounded-[4px] bg-white px-3 py-2 shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-shadow duration-300 hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] dark:bg-[#1a1a1a] dark:shadow-[0_2px_8px_rgba(0,0,0,0.4)] dark:hover:shadow-[0_4px_16px_rgba(0,0,0,0.55)]">
              <PartnerIcon className="h-5 w-5 fill-current text-[#E8704E] sm:h-6 sm:w-6" />
              <span className="text-[13px] font-medium text-gray-900 dark:text-white sm:text-[14px]">
                Certified Partner
              </span>
              <span className="rounded bg-gray-900 px-1.5 py-0.5 text-[10px] text-white dark:bg-white dark:text-gray-900 sm:px-2 sm:text-[11px]">
                Featured
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
