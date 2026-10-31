import { useEffect, useState } from 'react'
import type { Pair } from '../../content/types'
import { ui } from '../../content/site'
import { useLang } from '../../i18n/LanguageContext'

export type OutlineItem = { id: string; title: Pair }

export function Outline({ items }: { items: OutlineItem[] }) {
  const { t } = useLang()
  const [active, setActive] = useState(items[0]?.id ?? '')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      setProgress(max > 0 ? Math.min(100, Math.max(0, (doc.scrollTop / max) * 100)) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => Boolean(element))
    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-88px 0px -60% 0px', threshold: [0, 0.4, 1] },
    )
    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [items])

  const jump = (id: string) => {
    const target = document.getElementById(id)
    if (!target) return
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setActive(id)
  }

  if (items.length === 0) return null

  return (
    <aside className="outline-sidebar" aria-label={t(ui.onThisPage)}>
      <p className="outline-label">{t(ui.onThisPage)}</p>
      <nav className="outline-nav">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            className={active === item.id ? 'is-active' : ''}
            onClick={() => jump(item.id)}
          >
            {t(item.title)}
          </button>
        ))}
      </nav>
      <div className="outline-progress">
        {Math.round(progress)}%
        <div className="bar">
          <i style={{ width: `${progress}%` }} />
        </div>
      </div>
    </aside>
  )
}
