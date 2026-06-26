import { useLanguage } from '../hooks/useLanguage'
import { LOCALES } from '../i18n'
import type { Locale } from '../i18n'

export function LanguageToggle({ className = '' }: { className?: string }) {
  const { locale, setLocale, t } = useLanguage()

  return (
    <div
      className={`flex items-center rounded-full border border-gray-200 p-0.5 dark:border-white/10 ${className}`}
      role="group"
      aria-label={t.a11y.selectLanguage}
    >
      {LOCALES.map((item) => {
        const active = locale === item.code
        return (
          <button
            key={item.code}
            type="button"
            onClick={() => setLocale(item.code as Locale)}
            aria-pressed={active}
            className={`min-w-[2.25rem] rounded-full px-2 py-1 text-[11px] font-semibold tracking-wide transition-colors sm:text-[12px] ${
              active
                ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
            }`}
          >
            {item.label}
          </button>
        )
      })}
    </div>
  )
}
