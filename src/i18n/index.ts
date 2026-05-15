import sr from './sr'
import en from './en'
import type { Language } from '../types'

const translations = { sr, en }

export function t(key: string, lang: Language): string {
  return translations[lang][key] ?? translations['sr'][key] ?? key
}
