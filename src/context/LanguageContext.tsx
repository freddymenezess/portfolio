import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import ptTranslations from '@/i18n/pt.json'
import enTranslations from '@/i18n/en.json'

type Language = 'pt' | 'en'

type Translations = typeof ptTranslations

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations: Record<Language, Translations> = {
  pt: ptTranslations,
  en: enTranslations,
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('language') as Language
      if (saved && (saved === 'pt' || saved === 'en')) {
        return saved
      }
      const browserLang = navigator.language.split('-')[0]
      return browserLang === 'pt' ? 'pt' : 'en'
    }
    return 'pt'
  })

  useEffect(() => {
    localStorage.setItem('language', language)
    document.documentElement.lang = language
  }, [language])

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language],
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
