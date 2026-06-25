import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Clock, Menu, Moon, Sun, X } from 'lucide-react'
import { Logo } from './Logo'
import { TextRoll } from './TextRoll'
import { useLondonTime } from '../hooks/useLondonTime'
import { useTheme } from '../hooks/useTheme'
import type { Theme } from '../hooks/useTheme'

type NavLink =
  | { label: string; to: string; kind: 'route' }
  | { label: string; href: string; kind: 'anchor' }

const NAV_LINKS: NavLink[] = [
  { label: 'Projects', to: '/projects', kind: 'route' },
  { label: 'Studio', href: '/#about', kind: 'anchor' },
  { label: 'Journal', href: '/#services', kind: 'anchor' },
  { label: 'Connect', href: '/#contact', kind: 'anchor' },
]

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

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const londonTime = useLondonTime()
  const { theme, toggleTheme } = useTheme()

  const renderLink = (link: NavLink, className: string, onClick?: () => void) =>
    link.kind === 'route' ? (
      <Link key={link.label} to={link.to} className={className} onClick={onClick}>
        {link.label}
      </Link>
    ) : (
      <a key={link.label} href={link.href} className={className} onClick={onClick}>
        {link.label}
      </a>
    )

  return (
    <nav
      className={`relative mx-auto w-full max-w-[1440px] p-2 sm:p-3 ${
        menuOpen ? 'z-[1100]' : 'z-50'
      }`}
    >
      <div className="flex items-center justify-between rounded-full bg-white p-[5px] transition-colors duration-300 dark:bg-[#1a1a1a]">
        {/* Left: logo + links */}
        <div className="flex items-center gap-5 sm:gap-6">
          <Link
            to="/"
            className="flex shrink-0 items-center rounded-lg pl-1.5 transition-opacity duration-300 hover:opacity-90 sm:pl-2"
            aria-label="Mark Studio home"
          >
            <Logo tone="light" className="h-8 w-auto sm:h-9" />
          </Link>
          <div className="hidden items-center gap-6 md:flex">
            {NAV_LINKS.map((link) =>
              renderLink(
                link,
                'text-[14px] text-gray-900 transition-colors duration-300 hover:text-gray-500 dark:text-gray-200 dark:hover:text-white',
              ),
            )}
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
            href="/#contact"
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

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-[1200] md:hidden ${
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
            {NAV_LINKS.map((link) =>
              renderLink(
                link,
                'text-[28px] font-medium leading-[32px] text-gray-900 dark:text-white',
                () => setMenuOpen(false),
              ),
            )}
          </div>
          <a
            href="/#contact"
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
    </nav>
  )
}
