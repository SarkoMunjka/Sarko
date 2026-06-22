import { Clock } from 'lucide-react'
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
    <footer className="bg-gray-900 pb-10 pt-16 text-gray-400 transition-colors duration-300 dark:bg-black sm:pt-20">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
                <span className="text-[11px] font-bold tracking-tight text-gray-900">
                  AX
                </span>
              </div>
              <span className="text-[15px] font-semibold text-white">
                Axion Studio
              </span>
            </div>
            <p className="mt-5 max-w-xs text-[14px] leading-[1.6]">
              A strategy-led design studio helping ambitious brands dominate
              their category online.
            </p>
            <div className="mt-5 flex items-center gap-1.5 text-[13px]">
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
                      className="text-[14px] transition-colors duration-300 hover:text-white"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px]">
            &copy; {year} Axion Studio. All rights reserved.
          </p>
          <div className="flex gap-6 text-[13px]">
            <a href="#" className="transition-colors duration-300 hover:text-white">
              Privacy
            </a>
            <a href="#" className="transition-colors duration-300 hover:text-white">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
