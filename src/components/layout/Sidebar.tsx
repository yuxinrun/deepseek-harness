import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Icon } from '../Icon'
import { levelLabel, parts } from '../../content/types'
import { chaptersOfPart } from '../../content/chapters'
import { nav, site, ui } from '../../content/site'
import { useLang } from '../../i18n/LanguageContext'

const toolLinks = [
  { to: '/lab', label: nav.lab, icon: 'flask' },
  { to: '/toolkit', label: nav.toolkit, icon: 'wrench' },
  { to: '/gates', label: nav.gates, icon: 'shieldCheck' },
  { to: '/errors', label: nav.errors, icon: 'bug' },
  { to: '/about', label: nav.about, icon: 'book' },
] as const

export function Sidebar({ open, onNavigate }: { open: boolean; onNavigate: () => void }) {
  const { t } = useLang()
  const { pathname } = useLocation()
  const currentSlug = pathname.split('/').pop() ?? ''
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})

  // Auto-expand the group that owns the chapter being read.
  useEffect(() => {
    const owner = parts.find((part) => chaptersOfPart(part.id).some((chapter) => chapter.slug === currentSlug))
    if (!owner) return
    setCollapsed((previous) => (previous[owner.id] ? { ...previous, [owner.id]: false } : previous))
  }, [currentSlug])

  return (
    <aside className={`left-sidebar${open ? ' is-open' : ''}`} aria-label={t(ui.sidebarLabel)}>
      <p className="sidebar-heading">{t(ui.allChapters)}</p>

      {parts.map((part) => {
        const items = chaptersOfPart(part.id)
        if (items.length === 0) return null
        const expanded = !collapsed[part.id]
        return (
          <div className="sidebar-group" key={part.id}>
            <button
              type="button"
              className="sidebar-group-title"
              aria-expanded={expanded}
              onClick={() => setCollapsed((previous) => ({ ...previous, [part.id]: expanded }))}
            >
              <span className="idx">{part.num}</span>
              {t(part.title)}
              <Icon name="chevronDown" size={13} className="chev" />
            </button>
            {expanded ? (
              <div className="sidebar-items">
                {items.map((chapter) => (
                  <Link
                    key={chapter.slug}
                    to={`/chapter/${chapter.slug}`}
                    className={`sidebar-item${chapter.slug === currentSlug ? ' is-active' : ''}`}
                    onClick={onNavigate}
                  >
                    <span className="num">{chapter.num}</span>
                    <span>{t(chapter.title)}</span>
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        )
      })}

      <div className="sidebar-items" style={{ marginTop: 18, marginLeft: 0, paddingLeft: 0, borderLeft: 0 }}>
        <p className="sidebar-heading" style={{ padding: '0 8px 6px' }}>
          {t(ui.footerTools)}
        </p>
        {toolLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`sidebar-item${pathname === link.to ? ' is-active' : ''}`}
            onClick={onNavigate}
          >
            <Icon name={link.icon} size={13} style={{ marginTop: 2, flex: 'none', color: 'var(--faint)' }} />
            <span>{t(link.label)}</span>
          </Link>
        ))}
      </div>

      <p className="sidebar-foot">
        {t(site.name)} · {t(levelLabel.reference)}
        <br />
        <Link to="/chapters" onClick={onNavigate}>
          {t(ui.browseChapters)}
        </Link>
        {' · '}
        <a href={`${import.meta.env.BASE_URL}#/lab`} onClick={onNavigate}>
          {t(ui.openLab)}
        </a>
        <br />
        {site.author} · {t(site.slogan)}
      </p>
    </aside>
  )
}
