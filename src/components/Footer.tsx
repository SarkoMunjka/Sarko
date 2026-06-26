import { Clock } from 'lucide-react'
import { Logo } from './Logo'
import { useLondonTime } from '../hooks/useLondonTime'

const FOOTER_COLUMNS: { heading: string; links: string[] }[] = [
  {
    heading: 'Studio',
    links: ['About', 'Services', 'Process', 'Careers'],
  },
  {
    heading: 'Work',
    links: ['Projects', 'Case studies', 'Journal', 'Awards'],
  },
  {
    heading: 'Connect',
    links: ['Instagram', 'LinkedIn', 'Dribbble', 'X / Twitter'],
  },
]

export function Footer() {
  const londonTime = useLondonTime()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#F26522] pb-10 pt-16 text-white/80 transition-colors duration-300 dark:bg-black dark:text-gray-400 sm:pt-20">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Logo className="h-12 w-auto min-w-[168px] sm:h-14 sm:min-w-[196px]" />
            </div>
            <p className="mt-5 max-w-xs text-[14px] leading-[1.6] text-white/85 dark:text-inherit">
              Mark Studio — a strategy-led design studio helping ambitious brands
              dominate their category online.
            </p>
            <div className="mt-5 flex items-center gap-1.5 text-[13px] text-white/80 dark:text-inherit">
              <Clock size={14} />
              <span>{londonTime} in London</span>
            </div>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <div key={col.heading}>
              <h3 className="text-[13px] font-semibold uppercase tracking-wide text-white">
                {col.heading}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-[14px] text-white/85 transition-colors duration-300 hover:text-white dark:text-inherit dark:hover:text-white"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/20 pt-6 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] text-white/75 dark:text-inherit">
            &copy; {year} Mark Studio. All rights reserved.
          </p>
          <div className="flex gap-6 text-[13px]">
            <a
              href="#"
              className="text-white/75 transition-colors duration-300 hover:text-white dark:text-inherit dark:hover:text-white"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-white/75 transition-colors duration-300 hover:text-white dark:text-inherit dark:hover:text-white"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
