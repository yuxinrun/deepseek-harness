import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Logo } from '../Logo'
import { Icon } from '../Icon'
import { nav, ui } from '../../content/site'
import { useLang } from '../../i18n/LanguageContext'
import { useTheme } from '../../theme/ThemeContext'

const links = [
  { to: '/', label: nav.home },
  { to: '/chapters', label: nav.chapters },
  { to: '/lab', label: nav.lab },
  { to: '/toolkit', label: nav.toolkit },
  { to: '/gates', label: nav.gates },
  { to: '/errors', label: nav.errors },
  { to: '/about', label: nav.about },
]

const themeIcon = { light: 'sun', dark: 'moon', system: 'monitor' } as const
const themeLabel = { light: ui.themeLight, dark: ui.themeDark, system: ui.themeSystem } as const

export function Header({ onToggleMenu }: { onToggleMenu: () => void }) {
  const { lang, t, setLang } = useLang()
  const { mode, cycle } = useTheme()
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(document.documentElement.scrollTop > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isActive = (to: string) => (to === '/' ? pathname === '/' : pathname.startsWith(to))

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="header-inner">
        <Logo />

        <nav className="main-nav" aria-label={t(ui.sidebarLabel)}>
          {links.slice(0, 6).map((link) => (
            <Link key={link.to} to={link.to} className={isActive(link.to) ? 'is-active' : ''}>
              {t(link.label)}
            </Link>
          ))}

          <Link to="/about" className={isActive('/about') ? 'is-active' : ''}>
            {t(nav.about)}
          </Link>
        </nav>

        <div className="header-actions">
          <div className="lang-switch" role="group" aria-label={t(ui.language)}>
            <button
              type="button"
              className={lang === 'zh' ? 'is-active' : ''}
              aria-pressed={lang === 'zh'}
              onClick={() => setLang('zh')}
            >
              中
            </button>
            <button
              type="button"
              className={lang === 'en' ? 'is-active' : ''}
              aria-pressed={lang === 'en'}
              onClick={() => setLang('en')}
            >
              EN
            </button>
          </div>

          <button
            type="button"
            className="icon-btn"
            onClick={cycle}
            aria-label={t(themeLabel[mode])}
            title={t(themeLabel[mode])}
          >
            <Icon name={themeIcon[mode]} size={16} />
          </button>

          <button
            type="button"
            className="icon-btn menu-btn"
            onClick={onToggleMenu}
            aria-label={t(ui.openMenu)}
          >
            <Icon name="menu" size={17} />
          </button>
        </div>
      </div>
    </header>
  )
}
