import type { ReactNode } from 'react'

interface BrowserFrameProps {
  children: ReactNode
  url?: string
  className?: string
}

/**
 * A lightweight browser-window frame (traffic-light dots + URL bar) used to
 * present project screenshots in a premium way.
 */
export function BrowserFrame({
  children,
  url = 'socksandco.com',
  className = '',
}: BrowserFrameProps) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.10)] dark:border-white/10 dark:bg-[#161616] dark:shadow-[0_10px_40px_rgba(0,0,0,0.45)] ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-black/5 bg-gray-50 px-4 py-2.5 dark:border-white/10 dark:bg-[#1f1f1f]">
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </span>
        <span className="mx-auto rounded-md bg-black/5 px-3 py-0.5 text-[11px] text-gray-500 dark:bg-white/10 dark:text-gray-400">
          {url}
        </span>
      </div>
      {children}
    </div>
  )
}
