import { Link } from 'react-router-dom'
import { Icon } from '../Icon'
import { nav, site, sisters, sisterUrl, ui } from '../../content/site'
import { partGroups } from '../../content/chapters'
import { useLang } from '../../i18n/LanguageContext'

export function Footer() {
  const { t } = useLang()
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <strong style={{ fontSize: '0.95rem', letterSpacing: '-0.02em' }}>{t(site.name)}</strong>
            <p>{t(ui.brandLine)}</p>
            <p className="footer-motto">{site.slogan.zh} · {site.slogan.en}</p>
            <div className="footer-contact">
              <a href={`https://github.com/yuxinrun/deepseek-harness`} target="_blank" rel="noreferrer noopener">
                <Icon name="box" size={12} /> GitHub
              </a>
              <a href={site.homepage} target="_blank" rel="noreferrer noopener">
                <Icon name="globe" size={12} /> www.yuxin.run
              </a>
              <a href={`mailto:${site.email}`}>
                <Icon name="messages" size={12} /> {site.email}
              </a>
              <a href={site.upstream} target="_blank" rel="noreferrer noopener">
                <Icon name="external" size={12} /> {t(ui.sources)}
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h3>{t(ui.footerHandbook)}</h3>
            {partGroups.map((group) => (
              <Link key={group.part.id} to={`/chapter/${group.items[0].slug}`}>
                {group.part.num} · {t(group.part.title)}
              </Link>
            ))}
            <Link to="/chapters">{t(ui.allChapters)}</Link>
          </div>

          <div className="footer-col">
            <h3>{t(ui.footerTools)}</h3>
            <Link to="/lab">{t(nav.lab)}</Link>
            <Link to="/toolkit">{t(nav.toolkit)}</Link>
            <Link to="/gates">{t(nav.gates)}</Link>
            <Link to="/errors">{t(nav.errors)}</Link>
            <Link to="/about">{t(nav.about)}</Link>
          </div>

          <div className="footer-col">
            <h3>{t(ui.footerSisters)}</h3>
            {sisters.map((sister) => {
              const current = sister.slug === 'deepseek-harness'
              return (
                <a
                  key={sister.slug}
                  href={sisterUrl(sister.slug)}
                  {...(current ? {} : { target: '_blank', rel: 'noreferrer noopener' })}
                  className="sister"
                >
                  <span>{t(sister.title)}</span>
                  {current ? <em className="sister-current">{t(ui.current)}</em> : null}
                </a>
              )
            })}
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            {t(ui.copyright)} · {site.author} / {site.brand}
          </span>
          <span>
            {t(ui.builtWith)}{' '}
            <a href="https://www.huasheng.ai/orange-books/deepseek-harness/read/" target="_blank" rel="noreferrer noopener">
              {t(ui.source)}
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}
