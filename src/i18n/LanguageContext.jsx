import { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext(null)

function detectInitialLang() {
  try {
    const saved = localStorage.getItem('lang')
    if (saved === 'ar' || saved === 'en') return saved
  } catch {}
  const browser = (navigator.language || navigator.languages?.[0] || 'en').slice(0, 2)
  return browser === 'ar' ? 'ar' : 'en'
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(detectInitialLang)

  useEffect(() => {
    const html = document.documentElement
    html.lang = lang
    html.dir = lang === 'ar' ? 'rtl' : 'ltr'
    try { localStorage.setItem('lang', lang) } catch {}
  }, [lang])

  const toggle = () => setLang((l) => (l === 'en' ? 'ar' : 'en'))

  return (
    <LanguageContext.Provider value={{ lang, toggle }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  const t = (en, ar) => (ctx.lang === 'ar' ? ar : en)
  return { lang: ctx.lang, toggle: ctx.toggle, isRtl: ctx.lang === 'ar', t }
}
