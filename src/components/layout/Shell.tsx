import { useEffect, useState, type ReactNode } from 'react'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { Outline, type OutlineItem } from './Outline'
import { Footer } from './Footer'
import { Icon } from '../Icon'
import { ui } from '../../content/site'
import { useLang } from '../../i18n/LanguageContext'

export function Shell({
  children,
  outline = [],
  wide = false,
  sidebar = true,
}: {
  children: ReactNode
  outline?: OutlineItem[]
  wide?: boolean
  sidebar?: boolean
}) {
  const { t } = useLang()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement
      setScrolled(doc.scrollTop > 8)
      const max = doc.scrollHeight - doc.clientHeight
      setProgress(max > 0 ? Math.min(100, (doc.scrollTop / max) * 100) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <a className="skip-link" href="#main">
        {t(ui.skip)}
      </a>
      <div className="reading-progress" aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </div>
      <Header onToggleMenu={() => setMenuOpen((value) => !value)} />

      <div className={`site-grid${outline.length > 0 ? ' with-outline' : ''}${sidebar ? '' : ' no-sidebar'}`}>
        <Sidebar open={menuOpen} onNavigate={closeMenu} />
        <main id="main" className="site-main">
          {wide ? children : <div className="site-main-narrow">{children}</div>}
        </main>
        {outline.length > 0 ? <Outline items={outline} /> : null}
      </div>

      <div
        className={`sidebar-backdrop${menuOpen ? ' is-open' : ''}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      <Footer />

      <BackToTop visible={scrolled} />
    </>
  )
}

function BackToTop({ visible }: { visible: boolean }) {
  const { t } = useLang()
  return (
    <button
      type="button"
      aria-label={t(ui.backTop)}
      title={t(ui.backTop)}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="icon-btn"
      style={{
        position: 'fixed',
        right: 20,
        bottom: 20,
        zIndex: 90,
        width: 40,
        height: 40,
        background: 'var(--panel)',
        boxShadow: 'var(--shadow)',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transform: visible ? 'none' : 'translateY(10px)',
        transition: 'opacity .25s, transform .25s',
      }}
    >
      <Icon name="arrowUp" size={17} />
    </button>
  )
}
