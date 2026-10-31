import { Link } from 'react-router-dom'
import { Shell } from '../components/layout/Shell'
import { Icon } from '../components/Icon'
import { nav, site, ui } from '../content/site'
import { useLang } from '../i18n/LanguageContext'
import { usePageMeta } from '../hooks/usePageMeta'

export function NotFound() {
  const { t, zh } = useLang()
  usePageMeta({ title: zh ? '这一页没有记录' : 'No log for this page', description: t(site.description) })
  return (
    <Shell>
      <div className="page-head">
        <p className="eyebrow">
          <Icon name="triangle" size={12} />
          404
        </p>
        <h1 className="display">{zh ? '这个地址不在日志里' : 'This path is not in the log'}</h1>
        <p>
          {zh
            ? '和会话日志一样，这本书只认存在的条目。可能是章节改版了，从目录里重新挑一章。'
            : 'Like the session log, this book only knows entries that exist. The chapter may have moved — pick one from the index.'}
        </p>
      </div>
      <div className="hero-actions">
        <Link className="btn btn-primary" to="/chapters">
          <Icon name="library" size={15} />
          {t(ui.allChapters)}
        </Link>
        <Link className="btn btn-ghost" to="/">
          {t(nav.home)}
        </Link>
        <Link className="btn btn-ghost" to="/lab">
          {t(nav.lab)}
        </Link>
      </div>
    </Shell>
  )
}
