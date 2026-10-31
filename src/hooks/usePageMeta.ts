import { useEffect } from 'react'
import { useLang } from '../i18n/LanguageContext'
import { site } from '../content/site'

function setMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

export function usePageMeta({ title, description }: { title?: string; description?: string }) {
  const { lang } = useLang()
  const baseTitle = site.name[lang]

  useEffect(() => {
    document.title = title ? `${title} · ${baseTitle}` : baseTitle
    if (description) {
      setMeta('meta[name="description"]', 'name', 'description', description)
      setMeta('meta[property="og:description"]', 'property', 'og:description', description)
    }
    if (title) {
      setMeta('meta[property="og:title"]', 'property', 'og:title', `${title} · ${baseTitle}`)
    }
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en'
  }, [title, description, lang, baseTitle])
}
