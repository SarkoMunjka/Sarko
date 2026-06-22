import { useState } from 'react'
import { ArrowRight, Clock, Menu, Moon, Sun, X } from 'lucide-react'
import {
  Shader,
  Swirl,
  ChromaFlow,
  FlutedGlass,
  FilmGrain,
} from 'shaders/react'
import { TextRoll } from './TextRoll'
import { PartnerIcon } from './PartnerIcon'
import BlurText from './BlurText'
import { FadeIn } from './FadeIn'
import { useLondonTime } from '../hooks/useLondonTime'
import { useTheme } from '../hooks/useTheme'
import type { Theme } from '../hooks/useTheme'

const NAV_LINKS: { label: string; href: string }[] = [
  { label: 'Projects', href: '#work' },
  { label: 'Studio', href: '#about' },
  { label: 'Journal', href: '#services' },
  { label: 'Connect', href: '#contact' },
]

const SHADER_COLORS = {
  light: { colorA: '#ffffff', colorB: '#f0f0f0', base: '#ffffff' },
  dark: { colorA: '#1a1a1a', colorB: '#0d0d0d', base: '#0a0a0a' },
}

function ThemeToggle({
  theme,
  onToggle,
  className = '',
}: {
  theme: Theme
  onToggle: () => void
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`flex h-9 w-9 items-center justify-center rounded-full text-gray-900 transition-colors hover:bg-gray-100 dark:text-white dark:hover:bg-white/10 ${className}`}
    >
      {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  )
}

export function Hero() {
  const [menuOpen, setMenuOpen] = useState(false)
  const londonTime = useLondonTime()
  const { theme, toggleTheme } = useTheme()

  const shader = SHADER_COLORS[theme]

  return (
    <section className="relative flex min-h-screen flex-col bg-[#EFEFEF] transition-colors duration-300 dark:bg-[#0a0a0a]">
      {/* Animated shader background */}
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

      {/* Navigation */}
      <nav className="relative z-20 mx-auto w-full max-w-[1440px] p-2 sm:p-3">
        <div className="flex items-center justify-between rounded-full bg-white p-[5px] transition-colors duration-300 dark:bg-[#1a1a1a]">
          {/* Left: logo + links */}
          <div className="flex items-center gap-6">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 transition-colors duration-300 dark:bg-white sm:h-10 sm:w-10">
              <span className="text-[10px] font-bold tracking-tight text-white dark:text-gray-900 sm:text-[11px]">
                AX
              </span>
            </div>
            <div className="hidden items-center gap-6 md:flex">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-[14px] text-gray-900 transition-colors duration-300 hover:text-gray-500 dark:text-gray-200 dark:hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right: status + clock + CTA */}
          <div className="hidden items-center gap-4 md:flex">
            <span className="hidden text-[13px] text-gray-600 dark:text-gray-400 lg:inline">
              Taking on projects for Q1 2026
            </span>
            <div className="flex items-center gap-1.5 text-[13px] text-gray-600 dark:text-gray-400">
              <Clock size={14} />
              <span>{londonTime} in London</span>
            </div>
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
            <a
              href="#contact"
              className="group flex items-center gap-2 rounded-full bg-gray-900 py-2 pl-5 pr-2 text-[13px] font-medium text-white transition-colors duration-300 dark:bg-white dark:text-gray-900"
            >
              <TextRoll>Book a strategy call</TextRoll>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45 dark:bg-gray-900">
                <ArrowRight size={14} className="text-gray-900 dark:text-white" />
              </span>
            </a>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-white transition-colors duration-300 dark:bg-white dark:text-gray-900"
              aria-label="Open menu"
            >
              <Menu size={18} />
              <span className="sr-only">Menu</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-50 md:hidden ${
          menuOpen ? '' : 'pointer-events-none'
        }`}
        aria-hidden={!menuOpen}
      >
        <div
          className={`absolute inset-0 bg-black/60 transition-opacity duration-500 ${
            menuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={`absolute inset-x-0 bottom-0 mx-3 mb-3 rounded-2xl bg-white p-5 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] dark:bg-[#1a1a1a] ${
            menuOpen ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-1.5 rounded-full border border-gray-200 px-3 py-1.5 text-[13px] text-gray-600 dark:border-white/10 dark:text-gray-400">
              <Clock size={14} />
              <span>{londonTime} in London</span>
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-white dark:bg-white dark:text-gray-900"
              aria-label="Close menu"
            >
              <X size={18} />
              <span className="sr-only">Close</span>
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-[28px] font-medium leading-[32px] text-gray-900 dark:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="group mt-6 flex items-center justify-between rounded-full bg-[#F26522] py-2 pl-6 pr-2 text-[14px] font-medium text-white"
          >
            <span>Start a project</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:-rotate-45">
              <ArrowRight size={16} className="text-[#F26522]" />
            </span>
          </a>
        </div>
      </div>

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
