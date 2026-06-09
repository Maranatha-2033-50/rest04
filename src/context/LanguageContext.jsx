import { createContext, useContext, useState, useCallback } from 'react'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      const saved = localStorage.getItem('lang')
      return saved === 'en' ? 'en' : 'ko'
    } catch {
      return 'ko'
    }
  })

  const toggleLang = useCallback(() => {
    setLang((prev) => {
      const next = prev === 'ko' ? 'en' : 'ko'
      try { localStorage.setItem('lang', next) } catch {}
      return next
    })
  }, [])

  // t(obj): {ko, en} 객체면 현재 lang 값 반환, 일반 문자열이면 그대로 반환
  const t = useCallback(
    (obj) => {
      if (!obj) return ''
      if (typeof obj === 'string') return obj
      return obj[lang] ?? obj.ko ?? ''
    },
    [lang],
  )

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used within <LanguageProvider>')
  return ctx
}
