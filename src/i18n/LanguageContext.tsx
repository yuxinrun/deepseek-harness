import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Pair } from '../content/types'

type Lang = 'zh' | 'en'

type LanguageValue = {
  lang: Lang
  zh: boolean
  setLang: (lang: Lang) => void
  toggle: () => void
  t: (pair: Pair) => string
}

const LanguageContext = createContext<LanguageValue | null>(null)

function readLang(): Lang {
  try {
    const stored = localStorage.getItem('dsh-lang')
    if (stored === 'zh' || stored === 'en') return stored
  } catch {
    /* ignore */
  }
  if (typeof navigator !== 'undefined' && /^en\b/i.test(navigator.language)) return 'en'
  return 'zh'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readLang)

  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en'
  }, [lang])

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    try {
      localStorage.setItem('dsh-lang', next)
    } catch {
      /* ignore */
    }
  }, [])

  const toggle = useCallback(() => setLang(lang === 'zh' ? 'en' : 'zh'), [lang, setLang])

  const value = useMemo<LanguageValue>(
    () => ({
      lang,
      zh: lang === 'zh',
      setLang,
      toggle,
      t: (pair: Pair) => pair[lang],
    }),
    [lang, setLang, toggle],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used inside LanguageProvider')
  return ctx
}
