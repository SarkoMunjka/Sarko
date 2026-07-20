import { en } from './locales/en'
import { sr } from './locales/sr'
import type { Locale, Translations } from './types'

export const translations: Record<Locale, Translations> = {
  en,
  sr,
}

export function getTranslations(locale: Locale): Translations {
  return translations[locale]
}

export type { Locale, Translations } from './types'
export { LOCALES } from './types'
